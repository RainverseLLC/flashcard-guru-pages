<div class="tldr">
<strong>TL;DR</strong>
在 iPhone 或 iPad 上使用 Anki 有三種真實可行的方法：官方 <strong>AnkiMobile</strong> App（$24.99，一次性購買）、瀏覽器版 <strong>AnkiWeb</strong>（免費，但在手機上操作較笨拙）、或是像 <a href="/zh-Hant/">Guru</a> 這類原生替代方案，能完整匯入你既有的 <code>.apkg</code> 牌組並以 FSRS 進行複習。AnkiDroid 僅限 Android，因此 iOS 無法使用。無論你選擇哪種方案，你的牌組都可以自由攜帶 — 它們皆可匯出回標準的 <code>.apkg</code> 格式。
</div>

## Anki 在 iPhone 上免費嗎？

短話長說：部分免費。Anki *專案*在桌機上是免費且開源的，<strong>AnkiWeb</strong>（瀏覽器版本）也是免費的。但官方的原生 iOS App <strong>AnkiMobile</strong> 是付費 App — <strong>$24.99</strong>，一次性購買。這個價格是有意為之：它用來資助整個免費 Anki 生態系統的開發。所以「Anki 在 iPhone 上免費嗎」通常指的是「有沒有可以在手機上免費複習牌組的方法」，而誠實的答案是：有（AnkiWeb），但要好的原生體驗就需要花錢。

以下是三條路徑，以及真正值得注意的取捨。

## 方案 1：AnkiMobile（官方 App）

AnkiMobile 由桌機版 Anki 的同一位作者開發，因此是最忠於「正宗」Anki 的選擇 — 相同的排程器、相同的筆記類型、相同地同步至 AnkiWeb。如果你想要經典的行為且不介意傳統的 Anki 介面，這是最安全的選擇。

- **費用：** $24.99 一次性購買。
- **最適合：** 已深入 Anki 生態系、需要在桌機與手機間同步的純粹主義者。
- **注意：** 介面功能強大但略顯老舊，而且僅支援暴露 Apple `GCExtendedGamepad` 規範的遊戲控制器 — 這意味著市面上便宜的 8BitDo 型號大多不適用（下面會詳細說明）。

## 方案 2：瀏覽器版 AnkiWeb

AnkiWeb 是免費的網頁客戶端。在 Safari 中登入 ankiweb.net，即可在任何裝置上複習到期的卡片，無需安裝。

- **費用：** 免費。
- **最適合：** 偶爾複習，或是在付費購買原生 App 前先試用 Anki。
- **注意：** 它是網頁而非 App — 無法離線複習、手勢功能有限、無法進行多媒體編輯，且需要依賴桌機來處理較重的工作。

## 方案 3：專為 iPhone 打造的原生替代方案（Guru）

<a href="/zh-Hant/">Guru: AI Flashcard Study</a> 是第三條路：一款原生 iOS App，沿用 Anki 的工作流程但針對手機重新打造。它使用 Anki 本身的引擎匯入任何 <code>.apkg</code> 或 <code>.colpkg</code>，因此卡片、多媒體檔案和排程狀態都會完整遷移 — 然後以 <strong>FSRS</strong>（現代間隔複習排程器）進行複習。

- **費用：** 免費 3 天試用，之後可選擇週繳／年繳方案或一次性 Lifetime 方案（目前早鳥價 $14.99）— 比 AnkiMobile 便宜。
- **最適合：** 想要快速、現代、以 iPhone 為首的 App、希望 AI 協助將筆記轉成卡片、考試前使用 Cram Mode，以及內建**免費無線 [Anki Remote](/zh-Hant/anki-remote)** 的使用者。
- **注意：** 這是獨立的 App，而非 AnkiMobile 的換皮 — 因此你需要將牌組匯入其中（請參閱 <a href="/zh-Hant/blog/import-anki-decks-iphone/">如何匯入你的 Anki 牌組</a>），而非透過 AnkiWeb 同步。

## 快速比較

| | AnkiMobile | AnkiWeb（瀏覽器） | Guru |
|---|---|---|---|
| 費用 | $24.99 一次性 | 免費 | 免費試用，之後從 $5.99/週 或 $14.99 終身 |
| 原生 iOS App | 是 | 否（網站） | 是 |
| 離線複習 | 是 | 否 | 是 |
| 匯入 `.apkg` / `.colpkg` | 是 | 需透過桌機 | 是（完整保留） |
| 排程器 | Anki / FSRS | Anki / FSRS | FSRS |
| AI 卡片生成 | 否 | 否 | 是 |
| 桌機 Anki 免費無線遙控 | 否 | 不適用 | 是 |
| 便宜 8BitDo 控制器 | 否（小型型號） | 不適用 | 是（透過手機） |

## 你真的需要在手機上使用 Anki — 還是只需要桌機的遙控器？

許多搜尋「anki on iphone」的人其實需求更微妙：他們是在**桌機版 Anki** 上複習，只想在沙發上操作時不必伸手去碰鍵盤。如果這說的是你，你根本不需要將整個工作流程搬到手機上 — 你可以將 iPhone 變成桌機版 Anki 的無線遙控器。詳情請見 <a href="/zh-Hant/anki-remote">免費 Anki Remote 設定</a> 以及 <a href="/zh-Hant/blog/free-wireless-anki-remote/">遙控方案完整比較</a>。

## 遷移你現有的牌組

無論你選擇哪個原生 App，第一步都一樣：將你的 <code>.apkg</code> 檔案傳入手機，並在保留排程的狀態下匯入。我們寫了一份逐步教學：<a href="/zh-Hant/blog/import-anki-decks-iphone/">如何在 iPhone 上匯入你的 Anki 牌組 (.apkg)</a>。重點是 — 你的學習進度永遠不會被鎖死；一切都可以匯出回標準的 <code>.apkg</code>。

## 常見問題

**我可以在 iPad 上使用 Anki 嗎？**
可以。AnkiMobile 和 Guru 都是通用版（iPhone + iPad）。AnkiWeb 則可在任何 iPad 瀏覽器上運作。

**AnkiDroid 可以在 iPhone 上使用嗎？**
不行。AnkiDroid 僅限 Android。在 iOS 上，你的原生選項是 AnkiMobile 或像 Guru 這類替代方案。

**我在桌機上的連續學習天數和排程會轉移嗎？**
會的，只要你匯入完整的 <code>.apkg</code>/<code>.colpkg</code> — 排程狀態會隨著卡片一同遷移。詳見 <a href="/zh-Hant/blog/import-anki-decks-iphone/">匯入教學</a>。

**哪個最適合醫學院校牌組（AnKing 等）？**
三者都能複習大型共享牌組。若你追求以手機為主的體驗、免手持複習和 FSRS，原生替代方案通常最舒適；若你追求與桌機版附加元件完全一致，則 AnkiMobile 更合適。

<div class="cta-box">
<h3>想要一款在 iPhone 上如魚得水的 Anki？</h3>
<p>數秒內匯入你的牌組、以 FSRS 複習、並使用免費的無線遙控器。免費 3 天試用。</p>
<a class="cta" href="/zh-Hant/">立即使用 Guru</a>
</div>
