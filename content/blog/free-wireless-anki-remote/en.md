<div class="tldr">
<strong>TL;DR</strong>
Buying a hardware Anki remote is fine, but you can get the same wireless review experience for free with an iPhone you already own. Pair it with Anki Desktop in about a minute, and — bonus — bridge a $25 8BitDo controller through your phone, including the cheap models <em>AnkiMobile refuses to pair with</em>.
</div>

## What people actually want when they search "anki remote"

If you've been doing serious Anki review for any length of time, the search is predictable: you want to keep your hands free. Maybe you're **walking on a treadmill**, lying on your back at night, riding a stationary bike, or just sick of holding your phone the entire review session. You don't want to look at the keyboard. You want to flip the card and rate it without breaking flow.

For a long time, the best answer was hardware. A small Bluetooth keypad sits in your hand, you press a button, the desktop Anki app sees the keypress, the card flips. Done. That hardware-as-keyboard pattern is what made <a href="https://studyremote.com/" rel="nofollow">StudyRemote</a> and the various <a href="https://www.theanking.com/controller" rel="nofollow">8BitDo</a> setups popular in the medical-student Anki community.

What's changed: most people already carry a perfectly capable wireless remote in their pocket — their phone. We just needed software that turns it into one.

## The existing options, briefly

### StudyRemote (the dedicated hardware)

Originally a Kickstarter (then-named "Anki Remote"), <a href="https://studyremote.com/" rel="nofollow">StudyRemote</a> is a small, wedge-shaped Bluetooth keypad with five chunky buttons. Plug it in, pair as a Bluetooth keyboard, and Anki sees its keystrokes (1, 2, 3, 4, space, undo). Around **$40-60**. They claim 30,000+ users; the product is real and works.

The case *for* hardware: tactile feedback, can't-miss-it dedicated buttons, no need to look at anything. For the strict "lying flat, lights off, no-look review" use case, dedicated hardware is honestly hard to beat.

The case *against*: it's another $60 device, another thing to lose, another battery to charge.

### The 8BitDo workaround

Tiny gaming controllers from 8BitDo — most famously the **Zero 2** and **micro** — have become a community favorite for Anki review. They're $20-30, fit in a pocket, and you can map face buttons to ease ratings. AnKing has <a href="https://www.theanking.com/controller" rel="nofollow">a recommended setup</a>; YouTube has a viral 80,000-view tutorial; <a href="https://ankiweb.net/shared/info/1898790263" rel="nofollow">Contanki</a> is the de-facto Anki Desktop addon for it.

There's one big iOS-side asterisk that almost nobody talks about: **AnkiMobile (the official iOS Anki app) won't accept those small 8BitDo controllers in gamepad mode.** AnkiMobile only listens to Apple's `GCExtendedGamepad` profile, which the Zero 2 and micro don't expose. So the cheap, popular controllers people buy specifically *for Anki* work great on the desktop and don't work on the iPhone.

### Contanki / Ankimote (Anki addons)

Both are excellent if you're staying inside the Anki Desktop ecosystem. Contanki especially is a polished addon — install it, plug in a controller, configure mappings. If you don't need an iPhone in the loop, this is a great free path.

## The phone-as-remote option

This is what we built. <a href="/anki-remote">Flashcard Guru Remote</a> is a small Anki Desktop add-on (open source, LGPL-3.0) that pairs over Wi-Fi with the <a href="/">Guru iOS app</a>. The iPhone becomes the remote: you press *Show Answer* on screen, the desktop card flips. Press *Good*, the card schedules, you move on.

Two things make this not redundant with the existing options:

1. **Free, with hardware you already own.** If you have an iPhone, you don't need a $60 keypad to try this. (Whether you ultimately prefer hardware is a separate question — see the honest comparison below.)
2. **You can bridge a cheap 8BitDo through the phone.** Plug a Zero 2 or micro into your iPhone via USB-C/Lightning or pair it via Bluetooth. The Guru iOS app listens for both Apple's `GCExtendedGamepad` profile *and* `GCKeyboard` events — which is what 8BitDo's "Keyboard Mode" produces. Press a button on the controller, the iPhone forwards the action to Anki Desktop. **The exact controllers AnkiMobile rejects suddenly work, because the Guru app is the one in the middle.**

## How to connect an Anki remote to your iPhone (60 seconds)

This is the whole setup for the phone-as-remote route. The full walkthrough with screenshots lives on the <a href="/anki-remote">Anki Remote setup page</a>; here's the short version:

1. **On your Mac:** open Anki, then `Tools → Add-ons → Get Add-ons…` and paste this code:
   <p><code style="font-size: 1.05em; padding: 4px 10px;">1196082853</code></p>
   Restart Anki. The first time the add-on starts, macOS asks *"Allow incoming connections?"* — click **Allow**.
2. **On your iPhone:** install <a href="https://apps.apple.com/app/flashcardguru/id6757980593">Guru</a> from the App Store.
3. **Pair:** in Anki Desktop, choose `Tools → Connect Phone (Flashcard Guru Remote)…`. A QR code shows up. Open Guru → `Settings → Anki Remote → Pair with Mac` and scan it. Done.

Open any deck on your Mac and the iPhone screen takes over. Show Answer, Again, Hard, Good, Easy, Replay audio, Undo — all of it. State updates flow back to the phone in real time, so the buttons that show up always match the card you're on. Both devices just need to be on the **same Wi-Fi network** — there's no cloud account and no cable.

## Does it work on iPad?

Yes. Guru is a universal app, so the same remote runs on iPad as well as iPhone — handy if you keep an iPad on a stand next to your Mac. The pairing flow is identical: install the add-on on the desktop, scan the QR code from the iPad, and the tablet drives your reviews. (If you're searching for how to use an Anki remote on iPad specifically, that's the answer — it's the same WebSocket bridge, no extra setup.)

## Hands-free Anki review: treadmill, lying down, in the dark

"Hands-free Anki" really means two different things, and it's worth separating them:

- **Glance-and-tap.** Your phone is propped up or in one hand; you look at the big *Again / Hard / Good / Easy* buttons and tap. Great for a sofa, a desk, or a stationary bike where you can see the screen.
- **No-look.** Eyes closed, lights off, or on a treadmill where looking down is awkward. This is where tactile buttons win — and it's exactly the case the 8BitDo bridge below is for.

For most desk-and-sofa review, glance-and-tap on the phone covers it. For strict no-look review, bridge a controller (next section) and you get physical buttons without buying a dedicated keypad.

## Using a cheap 8BitDo (Zero 2 / micro) through your phone

This is the part that doesn't exist anywhere else. Pair an **8BitDo Zero 2** or **micro** to your iPhone — over Bluetooth, or wired via USB-C — and put the controller into its **Keyboard Mode**. The Guru app reads those `GCKeyboard` events and forwards the matching review action to Anki Desktop:

- `1 / 2 / 3 / 4` → Again / Hard / Good / Easy
- `Space` → Show Answer · `R` → Replay · `Z` or `U` → Undo

Because the *phone* is the device talking to Anki, the controllers that AnkiMobile flatly refuses to pair with work fine here. You get tactile, no-look buttons for ~$25, no $60 dedicated remote required, and you can still review with just the phone when you don't have the controller on you.

## Honest comparison

| | StudyRemote | 8BitDo + Contanki | iPhone + Flashcard Guru Remote |
|---|---|---|---|
| Cost | $40-60 hardware | $20-30 hardware | Free (uses your phone) |
| No-look ergonomics | ★★★ (tactile, dedicated) | ★★★ (tactile, dedicated) | ★★ (glance at screen, unless you bridge a controller) |
| Open source | No | Yes (Contanki addon) | Yes (LGPL-3.0 add-on) |
| Cheap 8BitDo (Zero 2 / micro) | n/a | Yes (Anki Desktop only) | Yes — including via the iPhone for desktop |
| Works with AnkiMobile | Yes (HID keyboard) | No, on small models | Companion to a separate iOS app |
| Privacy | Local Bluetooth | Local USB / BT | LAN only, token-paired |

The honest verdict: **if you do a lot of strict no-look review** (treadmill, eyes closed, in the dark), dedicated hardware still wins because nothing beats tactile buttons under your thumb. If you do **most of your review at a desk or sofa, with an iPhone within arm's reach already**, the phone-as-remote covers 90% of the use case for 0% of the price — and if you also own a Zero 2, you can pair it to the phone and get the no-look ergonomics back as a bonus.

## Why a phone instead of native Bluetooth keyboard emulation?

The obvious "wouldn't it be cleaner if the iPhone just *was* a Bluetooth keyboard the Mac saw?" question. The answer is platform-level: **iOS does not allow third-party apps to act as Bluetooth HID peripherals.** That's not a missing feature in any one app, it's a restriction Apple has held for a decade. So we use the next best thing — a small WebSocket connection over your existing Wi-Fi — which has the same end-user experience and the side benefit of supporting structured state updates (the iPhone always knows which deck you're in, which queue, which phase).

## Privacy, briefly

The pairing token never leaves your local network. The add-on only accepts connections from RFC-1918 / loopback / link-local IPs as a safety check, so even if you accidentally exposed the port to the public internet, the server would reject the handshake. There's no analytics, no remote logging, no "phone home". You can revoke any paired iPhone from the Anki desktop dialog and the token is dead instantly.


## Source code

- The Anki desktop add-on, open source under LGPL-3.0: <a href="https://github.com/jyehn/flashcard-guru-remote-addon">github.com/jyehn/flashcard-guru-remote-addon</a>
- The AnkiWeb listing: <a href="https://ankiweb.net/shared/info/1196082853">code 1196082853</a>

The iOS-side bridge is part of the Guru iOS app, which is closed source. The add-on talks WebSocket — well-documented JSON protocol on the wire — so you could write your own client if you wanted to.

## Related guides

- <a href="/blog/8bitdo-anki-setup/">8BitDo Micro vs Zero 2 for Anki: Setup (2026)</a>
- <a href="/blog/hands-free-anki-review/">Hands-Free Anki Review (2026): Treadmill & Remote</a>
- <a href="/blog/anki-on-iphone-guide/">Anki on iPhone (2026): Free Options & Full Comparison</a>
- <a href="/blog/import-anki-decks-iphone/">Open .apkg on iPhone: Import Anki Decks (2026)</a>

<div class="cta-box">
<h3>Ready to try it?</h3>
<p>Setup takes about a minute and costs nothing. See the full walkthrough with screenshots.</p>
<a class="cta" href="/anki-remote">View setup instructions</a>
</div>
