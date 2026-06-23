<div class="tldr">
<strong>重點摘要</strong>
8BitDo Zero 2 或 micro 是一款價格約 20-30 美元的口袋型控制器，非常適合免手持複習 Anki。在<strong>電腦版 Anki</strong>上，它可以透過 Contanki 插件運作。但在<strong>iPhone</strong>上有一個陷阱：AnkiMobile 不支援配對這些小型型號——不過你可以利用控制器的鍵盤模式，透過 <a href="/zh-Hant/anki-remote">Guru Anki Remote</a> 來橋接它們。
</div>

## 為什麼 8BitDo 控制器是 Anki 使用者的最愛

原因很簡單：讓你不用拿著手機或觸碰鍵盤就能複習。將幾個按鈕映射為 *Again / Hard / Good / Easy* 和 *Show Answer*，你就可以在跑步機上、沙發上或躺著時刷卡片。8BitDo 的小型控制器價格便宜、可放入口袋，並擁有真實觸感的按鈕——這正是它們在醫學系學生的 Anki 社群中爆紅的原因。

## 該選哪個型號：Zero 2 vs micro

兩者都很棒；差別在於手感：

- **8BitDo Zero 2** — 鑰匙圈大小、超便攜，但按鍵稍微擁擠。非常適合隨身複習。
- **8BitDo micro** — 稍大一些、按鈕更舒適，且配備一個專用的 **Keyboard Mode** 開關，對於下面提到的 iPhone 方案來說很方便。

兩款都適用於 Anki。如果你主要是在手機上複習，micro 的鍵盤模式會稍微方便一點。

## 電腦版 Anki：使用 Contanki

如果你在電腦版 Anki 上複習，最乾淨的途徑是使用 **Contanki** 插件。從 AnkiWeb 安裝它，透過藍牙連接或配對你的 8BitDo，然後將按鈕映射到複習操作。這是一個完全免費、開放的方案，完全不需要用到手機。

## 沒人提過的 iPhone 問題

以下是讓人頭痛的陷阱：**AnkiMobile（官方 iOS App）不接受小型 8BitDo 控制器以遊戲手把模式運作。** AnkiMobile 只聽從 Apple 的 `GCExtendedGamepad` 設定檔，而 Zero 2 / micro 並不支援這個設定檔。因此，人們特地為了 Anki 購買的便宜控制器在電腦上運作良好，但卻在 AnkiMobile 中毫無反應。

## 解決方案：透過你的手機橋接控制器

解決方法是將控制器切換到**鍵盤模式**，然後讓一個能監聽鍵盤事件的應用程式轉發按鍵訊號。<a href="/zh-Hant/anki-remote">Guru Anki Remote</a> 正是做這件事：Guru 同時監聽 Apple 的 `GCExtendedGamepad` 設定檔 *以及* `GCKeyboard` 事件（也就是 8BitDo 的鍵盤模式所發送的訊號），然後將對應的複習操作透過 Wi-Fi 轉發到**電腦版 Anki**。

結果是：將 Zero 2 / micro 以鍵盤模式插上你的 iPhone（或透過藍牙配對），那些被 AnkiMobile 拒絕的控制器就能驅動你的複習——因為你的手機成為了中間的橋接裝置。完整背景資訊請參考 <a href="/zh-Hant/blog/free-wireless-anki-remote/">免費無線 Anki 遙控器比較</a>。

## 按鍵映射

在鍵盤模式下，預設的按鍵能完美對應到 Anki 的複習按鍵：

- `1 / 2 / 3 / 4` → Again / Hard / Good / Easy
- `Space` → Show Answer
- `R` → Replay audio · `Z` 或 `U` → Undo

如果你使用的是 MFi 遊戲手把而非處於鍵盤模式的 8BitDo，Guru 也會映射標準的正面按鈕（A → Good, B → Again, X → Hard, Y → Easy，肩鍵 → Show Answer / Replay）。

## 完整設定步驟

1.  將 8BitDo 與你的 iPhone 配對，並切換到**鍵盤模式**（請查閱你的 8BitDo 型號的按鍵組合）。
2.  在電腦版 Anki 上安裝 **[Anki Remote](/zh-Hant/anki-remote)** 插件（代碼 `1196082853`），並透過掃描 QR 碼來配對你的手機。
3.  在電腦上打開一個牌組並按下控制器按鈕——卡片就會翻開並進行評分。完成。

## 常見問題

**我需要同時使用 Contanki 和 Guru 嗎？**
不需要。Contanki 是為了讓連接到電腦的控制器*直接*驅動電腦版 Anki。而 Guru 方案則適用於控制器在你的**手機**上，而你希望它驅動電腦版 Anki。請根據你的控制器所在位置選擇適合的方案。

**8BitDo 可以直接在 AnkiMobile 上使用嗎？**
小型型號（Zero 2 / micro）通常不行，這是因為 `GCExtendedGamepad` 的限制。透過 Guru 進行橋接是繞過這個限制的方法。

**需要任何費用嗎？**
控制器大約 20-30 美元。Anki Remote 插件和遠端功能是免費的；Contanki 也是免費的。

<div class="cta-box">
<h3>讓你的 8BitDo 在 iPhone 上順利運作</h3>
<p>透過免費的 Guru Anki Remote 橋接便宜的控制器——包括那些 AnkiMobile 拒絕配對的型號。</p>
<a class="cta" href="/zh-Hant/anki-remote">設定 Anki Remote</a>
</div>
