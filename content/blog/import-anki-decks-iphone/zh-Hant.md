<div class="tldr">
<strong>重點摘要</strong>
將 <code>.apkg</code>（或 <code>.colpkg</code>）檔案放入您的手機 — 透過檔案 App、AirDrop、iCloud 雲碟或電子郵件 — 然後在原生的 Anki App 中打開。使用 <a href="/zh-Hant/">Guru</a> 匯入時，採用 Anki 自有引擎處理，因此卡片、多媒體檔案與排程狀態都能完整保留。此外，所有內容均可匯出為標準的 <code>.apkg</code> 檔案，您的牌組永遠不會被綁死。
</div>

## .apkg 裡面究竟有什麼？

一個 <code>.apkg</code> 是一個壓縮包，包含您的筆記、從筆記生成的卡片、卡片樣板、任何多媒體檔案（圖片、音訊），以及 — 最關鍵的 — **排程狀態**（到期日、間隔、難度、該牌組的複習歷史）。<code>.colpkg</code> 概念相同，但它涵蓋的是您的*整個*牌組集合，而非單一副牌組。

最後這一部分正是「匯入」之所以重要的原因：操作正確，您就不再需要從零開始複習 — 您的學習進度會隨著卡片一起轉移。

## 第一步：將檔案放入您的 iPhone

首先，您需要讓手機可以存取 <code>.apkg</code> 檔案。以下方法都可行：

- **檔案 App / iCloud 雲碟** — 在電腦上將 <code>.apkg</code> 放入 iCloud 雲碟；它就會出現在手機的檔案 App 中。
- **AirDrop** — 從 Mac 直接將檔案 AirDrop 到 iPhone。
- **電子郵件或即時通訊** — 將檔案寄給自己，然後點擊附件。
- **直接下載** — 分享的牌組（AnKing 等）通常會在 Safari 中直接下載到檔案 App。


![在檔案 App 中選擇 .apkg](/assets/screenshots/import-files-picker.webp)

## 第二步：匯入（保留排程狀態）

![新增學習教材選單中的「匯入 .apkg/.colpkg」](/assets/screenshots/import-add-menu.webp)


在 <a href="/zh-Hant/">Guru</a> 中，打開牌組列表並選擇匯入，然後從檔案 App 中選取 <code>.apkg</code>。由於匯入過程使用 Anki 自有引擎處理，因此卡片、多媒體檔案與排程都會完整保留 — 無需重新學習，也不會遺失歷史記錄。

同樣的檔案也可以匯入 **AnkiMobile**（如果您使用的是該 App）— 在檔案 App 中點擊 <code>.apkg</code>，然後選擇「複製到 AnkiMobile」。（不確定該用哪個 App？請參閱 <a href="/zh-Hant/blog/anki-on-iphone-guide/">如何在 iPhone 與 iPad 上使用 Anki</a>。）


![準備匯入的 Anki Import Wizard](/assets/screenshots/import-wizard.webp)

![iPhone 上 Anki .apkg 匯入完成 — 新增 2,825 張卡片](/assets/screenshots/import-success.webp)

## 第三步：確認匯入正確

匯入後，快速檢查以下項目：

- 牌組的**待複習數量**看起來正確（不是「全部卡片都是新卡片」）。
- 含有圖片或音訊的卡片能正常顯示多媒體檔案。
- 克漏字卡片的填空處能正確顯示。

如果待複習數量重置為「新卡片」，那麼您可能匯入了一個*被分享時已移除排程*的牌組 — 這是匯出時的設定問題，而非匯入的問題。如果您可以控制來源，請重新從來源匯出並勾選包含排程。

## 我的連續學習天數與複習歷史會保留嗎？

您的**排程狀態**（間隔、難度、到期日）會隨著 <code>.apkg</code> 一起轉移，因此您的複習進度可以無縫接軌。不過，全域的每日*連續學習天數計數器*是 App 專屬的功能，在新的 App 中會從頭開始 — 但真正影響記憶保留率的間隔重複排程則會被完整保留。

## 您永遠不會被綁死

這點值得重複強調：一個好的 Anki App 讓您可以**匯出備份**。使用 Guru，您可以隨時將任何牌組匯出為標準的 <code>.apkg</code> 檔案，然後帶到桌機版 Anki、AnkiMobile 或其他任何地方。將牌組匯入手機是一個「搬家」動作，而不是一條單向的不歸路。



## 相關指南

- <a href="/zh-Hant/blog/anki-on-iphone-guide/">Anki 在 iPhone 上怎麼用（2026）</a>
- <a href="/zh-Hant/blog/hands-free-anki-review/">免手持複習 Anki</a>
- <a href="/zh-Hant/blog/free-wireless-anki-remote/">Anki 遙控器設定：免費 iPhone vs 8BitDo</a>

<div class="cta-box">
<h3>將您的牌組帶到更好的 iPhone App</h3>
<p>完整匯入 <code>.apkg</code>，使用 FSRS 複習，隨時匯出。免費 3 天試用。</p>
<a class="cta" href="/zh-Hant/">下載 Guru</a>
</div>
