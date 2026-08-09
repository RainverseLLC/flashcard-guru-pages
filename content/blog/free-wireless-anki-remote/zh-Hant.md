<div class="tldr">
<strong>TL;DR</strong>
花錢買硬體 Anki 遙控器當然可以，但你也能用已有的 iPhone 免費獲得同樣的無線複習體驗。大約一分鐘內與 Anki Desktop 配對，另外——還能透過手機橋接一款 25 美元的 8BitDo 控制器，包括那些 <em>AnkiMobile 拒絕配對</em>的廉價型號。
</div>

## 人們搜尋「anki remote」時真正想要的是什麼

如果你深度使用 Anki 複習已有一段時間，搜尋方向可想而知：你希望雙手能空出來。也許你正在 **跑步機上走路**、晚上仰躺、騎健身車，或者只是厭倦了整段複習時間都握著手機。你不想看著鍵盤。你只想翻牌、評分，而且不中斷節奏。

長期以來，最好的答案是硬體。一個小藍牙鍵盤握在手中，按下按鈕，桌面版 Anki 偵測到按鍵，卡片翻面，結束。這種硬體模擬鍵盤的模式，正是 <a href="https://studyremote.com/" rel="nofollow">StudyRemote</a> 與各種 <a href="https://www.theanking.com/controller" rel="nofollow">8BitDo</a> 設定在醫學生 Anki 社群中流行的原因。

現在情況變了：大部分人的口袋裡已經帶著一台功能完整的無線遙控器——他們的手機。我們只需要一套能將手機變成遙控器的軟體。

## 現有方案簡述

### StudyRemote（專用硬體）

最初在 Kickstarter 上募資（當時名為「Anki Remote」），<a href="https://studyremote.com/" rel="nofollow">StudyRemote</a> 是一款小巧的楔形藍牙鍵盤，配備五個厚實按鈕。插電、以藍牙鍵盤配對，Anki 就能偵測到它的按鍵（1、2、3、4、空白鍵、復原）。價格約 **40-60 美元**。他們號稱有 30,000 以上使用者；產品真實存在而且可用。

硬體的優點：觸感回饋、專用按鍵絕不會按錯、完全不需要看它。對於嚴格要求「平躺、關燈、不看螢幕複習」的使用情境，專用硬體確實難以取代。

硬體的缺點：又多一個 60 美元的裝置、多一個可能弄丟的東西、多一個需要充電的電池。

### 8BitDo 繞道方案

8BitDo 的小型遊戲控制器——最著名的 **Zero 2** 和 **micro**——已成為 Anki 複習的社群寵兒。價格 20-30 美元，可放進口袋，你能將正面按鈕映射為評分等級。AnKing 有 <a href="https://www.theanking.com/controller" rel="nofollow">推薦設定方式</a>；YouTube 上有一支 80,000 次觀看的爆紅教學；<a href="https://ankiweb.net/shared/info/1898790263" rel="nofollow">Contanki</a> 是 Anki Desktop 的預設附加元件。

這裡有一個幾乎沒人討論的 iOS 端重大限制：**AnkiMobile（官方 iOS 版 Anki）不接受那些小型 8BitDo 控制器以遊戲手把模式運作。** AnkiMobile 只聽取 Apple 的 `GCExtendedGamepad` 設定檔，而 Zero 2 和 micro 並未暴露此設定檔。因此，大家特別為了 Anki 購買的這些便宜、熱門控制器，在桌面上表現極佳，但在 iPhone 上卻完全不能用。

### Contanki / Ankimote（Anki 附加元件）

如果你只待在 Anki Desktop 生態系內，兩者都很優秀。Contanki 尤其是一款精緻的附加元件——安裝它、插上控制器、設定按鍵映射。如果你的流程中不需要 iPhone 參與，這是一條很棒的免費路徑。

## 手機當作遙控器的方案

這就是我們打造的東西。<a href="/zh-Hant/anki-remote">Flashcard Guru Remote</a> 是一款小型的 Anki Desktop 附加元件（開放原始碼，LGPL-3.0），透過 Wi-Fi 與 <a href="/zh-Hant/">Guru iOS App</a> 配對。iPhone 變成遙控器：你在螢幕上按下 *顯示答案*，桌面卡片就翻面。按下 *良好*，卡片排程，繼續前進。

有兩點讓這個方案並非現有選項的贅物：

1. **免費，而且用的是你已有的硬體。** 如果你有 iPhone，不必為了試試看而買一個 60 美元的鍵盤。（你最終是否偏好硬體是另一個問題——請見下方的誠實比較。）
2. **你可以透過手機橋接一款便宜的 8BitDo。** 將 Zero 2 或 micro 透過 USB-C/Lightning 插入 iPhone，或透過藍牙配對。Guru iOS App 會同時聽取 Apple 的 `GCExtendedGamepad` 設定檔 *和* `GCKeyboard` 事件——而後者正是 8BitDo 的「鍵盤模式」所產生的。按下控制器上的按鈕，iPhone 就會將動作轉發給 Anki Desktop。**那些 AnkiMobile 拒絕配對的控制器突然就能用了，因為 Guru App 在中間擔任橋樑。**

## 如何將 Anki 遙控器連接到 iPhone（60 秒）

以下是手機當遙控器路線的完整設定方式。完整圖文教學在 <a href="/zh-Hant/anki-remote">Anki Remote 設定頁面</a>；這裡是簡短版：

1. **在你的 Mac 上：** 開啟 Anki，然後 `工具 → 附加元件 → 獲取附加元件…` 並貼上這串代碼：
   <p><code style="font-size: 1.05em; padding: 4px 10px;">1196082853</code></p>
   重新啟動 Anki。當附加元件首次啟動時，macOS 會詢問 *「允許傳入連線？」*——按一下 **允許**。
2. **在你的 iPhone 上：** 從 App Store 安裝 <a href="https://apps.apple.com/app/flashcardguru/id6757980593">Guru</a>。
3. **配對：** 在 Anki Desktop 中，選擇 `工具 → 連接手機 (Flashcard Guru Remote)…`。會出現一個 QR 碼。開啟 Guru → `設定 → Anki Remote → 與 Mac 配對` 並掃描它。完成。

在你的 Mac 上開啟任何牌組，iPhone 螢幕就會接管。顯示答案、再次、困難、良好、簡單、重播音訊、復原——全部都有。狀態更新會即時回流到手機，因此顯示的按鈕永遠對應你正在看的卡片。兩台裝置只需要在 **同一個 Wi-Fi 網路** 上——不需要雲端帳號，也沒有傳輸線。

## 在 iPad 上能用嗎？

可以。Guru 是通用 App，所以同樣的遙控器既可在 iPhone 上運行，也可在 iPad 上運行——如果你在 Mac 旁用支架放了一台 iPad，會很方便。配對流程完全相同：在桌面上安裝附加元件、用 iPad 掃描 QR 碼，然後平板就操控你的複習。（如果你正在搜尋如何在 iPad 上使用 Anki 遙控器，這就是答案——同樣的 WebSocket 橋接，無需額外設定。）

## 免手持 Anki 複習：跑步機、躺著、黑暗中

「免手持 Anki」其實指兩件不同的事，值得區分清楚：

- **瞄一眼再點擊。** 你的手機架起來或握在一隻手上；你看著大大的 *再次 / 困難 / 良好 / 簡單* 按鈕並點擊。適合沙發、書桌或健身車這類你能看到螢幕的場景。
- **不看螢幕。** 閉上眼睛、關燈，或在跑步機上低頭看很不方便。這時觸覺按鈕就贏了——而這正是下面 8BitDo 橋接方案適用的場景。

對於大部分書桌與沙發複習，用手機瞄一眼再點擊就足夠了。對於嚴格的不看螢幕複習，橋接一個控制器（下一節）你就能獲得實體按鈕，不需購買專用鍵盤。

## 使用便宜的 8BitDo（Zero 2 / micro）透過手機

這是其他任何地方都沒有的功能。將 **8BitDo Zero 2** 或 **micro** 與你的 iPhone 配對——透過藍牙，或有線 USB-C——然後將控制器切換到它的 **鍵盤模式**。Guru App 會讀取那些 `GCKeyboard` 事件，並將對應的複習動作轉發給 Anki Desktop：

- `1 / 2 / 3 / 4` → 再次 / 困難 / 良好 / 簡單
- `空白鍵` → 顯示答案 · `R` → 重播 · `Z` 或 `U` → 復原

因為 *手機* 是與 Anki 溝通的那個裝置，所以那些 AnkiMobile 直接拒絕配對的控制器，在這裡都能正常運作。你只要花大約 25 美元就能獲得觸覺、不看螢幕的按鈕，不需要 60 美元的專用遙控器，而且當你沒帶控制器時，仍可只用手機來複習。

## 誠實比較

| | StudyRemote | 8BitDo + Contanki | iPhone + Flashcard Guru Remote |
|---|---|---|---|
| 成本 | 40-60 美元硬體 | 20-30 美元硬體 | 免費（使用你的手機） |
| 不看螢幕的人體工學 | ★★★（觸覺、專用） | ★★★（觸覺、專用） | ★★（需看螢幕，除非橋接控制器） |
| 開放原始碼 | 否 | 是（Contanki 附加元件） | 是（LGPL-3.0 附加元件） |
| 便宜的 8BitDo（Zero 2 / micro） | 不適用 | 是（僅限 Anki Desktop） | 是——包括透過 iPhone 用於桌面版 |
| 與 AnkiMobile 相容 | 是（HID 鍵盤） | 否（小型型號） | 需搭配獨立的 iOS App |
| 隱私 | 本地藍牙 | 本地 USB / 藍牙 | 僅區域網路，令牌配對 |

誠實的結論：**如果你經常進行嚴格的不看螢幕複習**（跑步機、閉眼、黑暗中），專用硬體仍然勝出，因為沒有什麼比拇指下的觸覺按鈕更好。如果你 **大部分複習是在書桌或沙發上進行，且 iPhone 已在伸手可及之處**，那麼手機當遙控器能以 0% 的價格涵蓋 90% 的使用情境——而且如果你也有一台 Zero 2，你可以將它配對到手機，順便拿回不看螢幕的人體工學優勢。

## 為什麼不讓 iPhone 直接模擬成藍牙鍵盤？

你可能會想：「如果 iPhone 直接模擬成 Mac 能看到的藍牙鍵盤，不是更簡潔嗎？」答案在於平台層級：**iOS 不允許第三方 App 扮演藍牙 HID 周邊裝置的角色。** 這不是任何一個 App 缺失的功能，而是 Apple 維持了十多年的限制。所以我們使用次佳的方案——透過你現有的 Wi-Fi 建立一個小型的 WebSocket 連線——它提供相同的使用者體驗，並且額外支援結構化狀態更新（iPhone 永遠知道你正在哪個牌組、哪個佇列、哪個階段）。

## 隱私說明

配對令牌絕不會離開你的本地網路。附加元件只接受來自 RFC-1918 / loopback / link-local IP 的連線作為安全檢查，即使你不小心將埠暴露於公共網際網路，伺服器也會拒絕握手。沒有分析工具、沒有遠端日誌、沒有「打電話回家」。你可以從 Anki 桌面對話框中撤銷任何已配對的 iPhone，令牌會立即失效。


## 原始碼

- Anki Desktop 附加元件，以 LGPL-3.0 開放原始碼：<a href="https://github.com/jyehn/flashcard-guru-remote-addon">github.com/jyehn/flashcard-guru-remote-addon</a>
- AnkiWeb 頁面：<a href="https://ankiweb.net/shared/info/1196082853">代碼 1196082853</a>

iOS 端的橋接功能屬於 Guru iOS App 的一部分，該 App 為封閉原始碼。附加元件透過 WebSocket 溝通——傳輸的是有良好文件記錄的 JSON 協定——所以如果你想自己撰寫客戶端也完全可行。

## 相關指南

- <a href="/zh-Hant/blog/8bitdo-anki-setup/">8BitDo for Anki：Zero 2 與 micro 設定（以及 iPhone 修正方案）</a>
- <a href="/zh-Hant/blog/hands-free-anki-review/">免手持 Anki 複習：跑步機、床上或閉眼模式</a>
- <a href="/zh-Hant/blog/anki-on-iphone-guide/">如何在 iPhone 與 iPad 上使用 Anki：所有方案比較</a>
- <a href="/zh-Hant/blog/import-anki-decks-iphone/">如何將你的 Anki 牌組 (.apkg) 匯入 iPhone</a>

<div class="cta-box">
<h3>準備好嘗試了嗎？</h3>
<p>設定大約需要一分鐘，而且完全免費。查看附有螢幕截圖的完整教學。</p>
<a class="cta" href="/zh-Hant/anki-remote">檢視設定說明</a>
</div>
