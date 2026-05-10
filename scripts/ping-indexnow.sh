#!/usr/bin/env bash
# Submit every URL in public/sitemap.xml to IndexNow so Bing / Yandex / Naver /
# Seznam / Mojeek pick up content changes without waiting on their crawlers.
#
# IndexNow is a public protocol — see https://www.indexnow.org/ — that lets
# site owners push URL updates. Microsoft Bing's automatic integration through
# Cloudflare also reads our public/<key>.txt; this script is the manual /
# CI-driven path for explicit control.
#
# Usage: scripts/ping-indexnow.sh
#   Reads .indexnow-key from the repo root and posts every <loc> in
#   public/sitemap.xml as a single batch.
#
# Idempotent — IndexNow accepts duplicate submissions.

set -euo pipefail

cd "$(dirname "$0")/.."

KEY_FILE=".indexnow-key"
SITEMAP="public/sitemap.xml"
HOST="flashcard-guru.flashify.app"

if [ ! -f "$KEY_FILE" ]; then
  echo "ERROR: $KEY_FILE missing — can't authenticate the submission." >&2
  exit 1
fi
KEY=$(tr -d '[:space:]' < "$KEY_FILE")
if [ -z "$KEY" ]; then
  echo "ERROR: $KEY_FILE is empty." >&2
  exit 1
fi

if [ ! -f "$SITEMAP" ]; then
  echo "ERROR: $SITEMAP not found — run 'npm run build' first." >&2
  exit 1
fi

# Verify the key file is reachable on the public site (IndexNow rejects keys
# that don't validate over HTTP). Soft-warn if unreachable, but submit anyway —
# could be a transient DNS/CDN issue.
KEY_URL="https://$HOST/$KEY.txt"
if curl -fsSL --max-time 5 "$KEY_URL" > /dev/null 2>&1; then
  echo "==> Key verified at $KEY_URL"
else
  echo "WARN: $KEY_URL didn't respond — IndexNow may reject. Continuing anyway."
fi

# Extract all <loc> URLs from the sitemap.
URLS=$(grep -oE '<loc>[^<]+</loc>' "$SITEMAP" | sed -E 's|</?loc>||g')
URL_COUNT=$(echo "$URLS" | wc -l | tr -d ' ')
if [ -z "$URLS" ] || [ "$URL_COUNT" -eq 0 ]; then
  echo "ERROR: no <loc> URLs found in $SITEMAP." >&2
  exit 1
fi
echo "==> Submitting $URL_COUNT URLs"

# Build the JSON payload. IndexNow accepts up to 10,000 URLs per request;
# we have well under that.
JSON=$(python3 - "$KEY" "$KEY_URL" "$HOST" <<'PY' "$URLS"
import json, sys
key, key_url, host = sys.argv[1], sys.argv[2], sys.argv[3]
urls = [u.strip() for u in sys.stdin.read().splitlines() if u.strip()]
payload = {
    "host": host,
    "key": key,
    "keyLocation": key_url,
    "urlList": urls,
}
print(json.dumps(payload))
PY
)

RESP=$(curl -sS -w "\n%{http_code}" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data "$JSON")

BODY=$(echo "$RESP" | sed '$d')
CODE=$(echo "$RESP" | tail -n1)

case "$CODE" in
  200|202)
    echo "==> OK ($CODE) — IndexNow accepted the batch."
    ;;
  400)
    echo "ERROR: 400 Bad request. Body: $BODY" >&2
    exit 1
    ;;
  403)
    echo "ERROR: 403 Forbidden — key did not validate. Verify $KEY_URL serves the key text." >&2
    exit 1
    ;;
  422)
    echo "ERROR: 422 Unprocessable — URLs don't match the host. Body: $BODY" >&2
    exit 1
    ;;
  429)
    echo "ERROR: 429 rate-limited. Try again later." >&2
    exit 1
    ;;
  *)
    echo "ERROR: HTTP $CODE. Body: $BODY" >&2
    exit 1
    ;;
esac
