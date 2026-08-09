<div class="tldr">
<strong>TL;DR</strong>
An 8BitDo Zero 2 or micro is a $20-30 pocket controller that's perfect for hands-free Anki. On <strong>desktop Anki</strong> it works through the Contanki add-on. On <strong>iPhone</strong> there's a catch: AnkiMobile won't pair the small models — but you can bridge them through the <a href="/anki-remote">Guru Anki Remote</a> using the controller's Keyboard Mode.
</div>

## Why 8BitDo controllers are a favorite for Anki

The appeal is simple: review without holding your phone or touching a keyboard. Map a few buttons to *Again / Hard / Good / Easy* and *Show Answer*, and you can grind cards on a treadmill, on the couch, or lying down. 8BitDo's tiny controllers are cheap, fit in a pocket, and have real tactile buttons — which is why they took off in the medical-student Anki community.

## Which model: Zero 2 vs micro

Both are great; they differ in feel:

- **8BitDo Zero 2** — keychain-sized, ultra-portable, a bit cramped. Excellent for pocket review.
- **8BitDo micro** — slightly larger, more comfortable buttons, includes a dedicated **Keyboard Mode** switch that's handy for the iPhone route below.

Either works for Anki. If you only review on the phone, the micro's Keyboard Mode is a little more convenient.

## Desktop Anki: use Contanki

If you review on desktop Anki, the cleanest path is the **Contanki** add-on. Install it from AnkiWeb, plug in or pair your 8BitDo over Bluetooth, and map the buttons to review actions. This is a fully free, open path and doesn't involve a phone at all.

## The iPhone problem nobody mentions

Here's the catch that trips people up: **AnkiMobile (the official iOS app) won't accept the small 8BitDo controllers in gamepad mode.** AnkiMobile only listens to Apple's `GCExtendedGamepad` profile, and the Zero 2 / micro don't expose it. So the exact cheap controllers people buy *for Anki* work great on desktop and silently do nothing in AnkiMobile.

## The fix: bridge the controller through your phone

The workaround is to put the controller into **Keyboard Mode** and let an app that listens for keyboard events forward the presses. The <a href="/anki-remote">Guru Anki Remote</a> does exactly this: Guru listens for both Apple's `GCExtendedGamepad` profile *and* `GCKeyboard` events (which is what 8BitDo's Keyboard Mode sends), then forwards the matching review action to **desktop Anki** over Wi-Fi.

The result: plug the Zero 2 / micro into your iPhone (or pair over Bluetooth) in Keyboard Mode, and the controllers AnkiMobile rejects suddenly drive your reviews — because the phone is the device in the middle. Full background in the <a href="/blog/free-wireless-anki-remote/">free wireless Anki remote comparison</a>.

## Button mappings

In Keyboard Mode, the defaults map cleanly to Anki's review keys:

- `1 / 2 / 3 / 4` → Again / Hard / Good / Easy
- `Space` → Show Answer
- `R` → Replay audio · `Z` or `U` → Undo

If you're using an MFi gamepad instead of an 8BitDo in Keyboard Mode, Guru also maps the standard face buttons (A → Good, B → Again, X → Hard, Y → Easy, shoulder buttons → Show Answer / Replay).

## Setting it up, end to end

1. Pair the 8BitDo to your iPhone and switch it to **Keyboard Mode** (check 8BitDo's button combo for your model).
2. Install the **[Anki Remote](/anki-remote)** add-on on desktop Anki (code `1196082853`) and pair your phone by scanning the QR code.
3. Open a deck on the desktop and press a button — the card flips and rates. Done.


## Related guides

- <a href="/blog/free-wireless-anki-remote/">Anki remote setup (2026): free iPhone vs 8BitDo</a>
- <a href="/blog/hands-free-anki-review/">Hands-free Anki review: treadmill, bed & remote</a>
- <a href="/anki-remote">Anki Remote setup walkthrough</a>

## FAQ

**Do I need both Contanki and Guru?**
No. Contanki is for driving desktop Anki *directly* from a controller plugged into the computer. The Guru route is for when the controller is on your **phone** and you want it to drive the desktop. Pick whichever matches where your controller is.

**Will the 8BitDo work directly in AnkiMobile?**
The small models (Zero 2 / micro) generally won't, because of the `GCExtendedGamepad` limitation. Bridging through Guru is the way around it.

**Is there any cost?**
The controller is ~$20-30. The Anki Remote add-on and remote feature are free; Contanki is free.

<div class="cta-box">
<h3>Make your 8BitDo work on iPhone</h3>
<p>Bridge a cheap controller through the free Guru Anki Remote — including the models AnkiMobile won't pair with.</p>
<a class="cta" href="/anki-remote">Set up the Anki Remote</a>
</div>
