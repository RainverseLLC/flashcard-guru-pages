<div class="tldr">
<strong>TL;DR</strong>
花钱买硬体 Anki 遥控器当然可以，但你也能用已有的 iPhone 免费获得同样的无线复习体验。大约一分钟内与 Anki Desktop 配对，另外——还能透过手机桥接一款 25 美元的 8BitDo 控制器，包括那些 <em>AnkiMobile 拒绝配对</em>的廉价型号。
</div>

## 人们搜寻「anki remote」时真正想要的是什么

如果你深度使用 Anki 复习已有一段时间，搜寻方向可想而知：你希望双手能空出来。也许你正在 **跑步机上走路**、晚上仰躺、骑健身车，或者只是厌倦了整段复习时间都握著手机。你不想看著键盘。你只想翻牌、评分，而且不中断节奏。

长期以来，最好的答案是硬体。一个小蓝牙键盘握在手中，按下按钮，桌面版 Anki 侦测到按键，卡片翻面，结束。这种硬体模拟键盘的模式，正是 <a href="https://studyremote.com/" rel="nofollow">StudyRemote</a> 与各种 <a href="https://www.theanking.com/controller" rel="nofollow">8BitDo</a> 设定在医学生 Anki 社群中流行的原因。

现在情况变了：大部分人的口袋里已经带著一台功能完整的无线遥控器——他们的手机。我们只需要一套能将手机变成遥控器的软体。

## 现有方案简述

### StudyRemote（专用硬体）

最初在 Kickstarter 上募资（当时名为「Anki Remote」），<a href="https://studyremote.com/" rel="nofollow">StudyRemote</a> 是一款小巧的楔形蓝牙键盘，配备五个厚实按钮。插电、以蓝牙键盘配对，Anki 就能侦测到它的按键（1、2、3、4、空白键、复原）。价格约 **40-60 美元**。他们号称有 30,000 以上使用者；产品真实存在而且可用。

硬体的优点：触感回馈、专用按键绝不会按错、完全不需要看它。对于严格要求「平躺、关灯、不看萤幕复习」的使用情境，专用硬体确实难以取代。

硬体的缺点：又多一个 60 美元的装置、多一个可能弄丢的东西、多一个需要充电的电池。

### 8BitDo 绕道方案

8BitDo 的小型游戏控制器——最著名的 **Zero 2** 和 **micro**——已成为 Anki 复习的社群宠儿。价格 20-30 美元，可放进口袋，你能将正面按钮映射为评分等级。AnKing 有 <a href="https://www.theanking.com/controller" rel="nofollow">推荐设定方式</a>；YouTube 上有一支 80,000 次观看的爆红教学；<a href="https://ankiweb.net/shared/info/1898790263" rel="nofollow">Contanki</a> 是 Anki Desktop 的预设附加元件。

这里有一个几乎没人讨论的 iOS 端重大限制：**AnkiMobile（官方 iOS 版 Anki）不接受那些小型 8BitDo 控制器以游戏手把模式运作。** AnkiMobile 只听取 Apple 的 `GCExtendedGamepad` 设定档，而 Zero 2 和 micro 并未暴露此设定档。因此，大家特别为了 Anki 购买的这些便宜、热门控制器，在桌面上表现极佳，但在 iPhone 上却完全不能用。

### Contanki / Ankimote（Anki 附加元件）

如果你只待在 Anki Desktop 生态系内，两者都很优秀。Contanki 尤其是一款精致的附加元件——安装它、插上控制器、设定按键映射。如果你的流程中不需要 iPhone 参与，这是一条很棒的免费路径。

## 手机当作遥控器的方案

这就是我们打造的东西。<a href="/zh-Hans/anki-remote">Flashcard Guru Remote</a> 是一款小型的 Anki Desktop 附加元件（开放原始码，LGPL-3.0），透过 Wi-Fi 与 <a href="/zh-Hans/">Guru iOS App</a> 配对。iPhone 变成遥控器：你在萤幕上按下 *显示答案*，桌面卡片就翻面。按下 *良好*，卡片排程，继续前进。

有两点让这个方案并非现有选项的赘物：

1. **免费，而且用的是你已有的硬体。** 如果你有 iPhone，不必为了试试看而买一个 60 美元的键盘。（你最终是否偏好硬体是另一个问题——请见下方的诚实比较。）
2. **你可以透过手机桥接一款便宜的 8BitDo。** 将 Zero 2 或 micro 透过 USB-C/Lightning 插入 iPhone，或透过蓝牙配对。Guru iOS App 会同时听取 Apple 的 `GCExtendedGamepad` 设定档 *和* `GCKeyboard` 事件——而后者正是 8BitDo 的「键盘模式」所产生的。按下控制器上的按钮，iPhone 就会将动作转发给 Anki Desktop。**那些 AnkiMobile 拒绝配对的控制器突然就能用了，因为 Guru App 在中间担任桥梁。**

## 如何将 Anki 遥控器连接到 iPhone（60 秒）

以下是手机当遥控器路线的完整设定方式。完整图文教学在 <a href="/zh-Hans/anki-remote">Anki Remote 设定页面</a>；这里是简短版：

1. **在你的 Mac 上：** 开启 Anki，然后 `工具 → 附加元件 → 获取附加元件…` 并贴上这串代码：
   <p><code style="font-size: 1.05em; padding: 4px 10px;">1196082853</code></p>
   重新启动 Anki。当附加元件首次启动时，macOS 会询问 *「允许传入连线？」*——按一下 **允许**。
2. **在你的 iPhone 上：** 从 App Store 安装 <a href="https://apps.apple.com/app/flashcardguru/id6757980593">Guru</a>。
3. **配对：** 在 Anki Desktop 中，选择 `工具 → 连接手机 (Flashcard Guru Remote)…`。会出现一个 QR 码。开启 Guru → `设定 → Anki Remote → 与 Mac 配对` 并扫描它。完成。

在你的 Mac 上开启任何牌组，iPhone 萤幕就会接管。显示答案、再次、困难、良好、简单、重播音讯、复原——全部都有。状态更新会即时回流到手机，因此显示的按钮永远对应你正在看的卡片。两台装置只需要在 **同一个 Wi-Fi 网路** 上——不需要云端帐号，也没有传输线。

## 在 iPad 上能用吗？

可以。Guru 是通用 App，所以同样的遥控器既可在 iPhone 上运行，也可在 iPad 上运行——如果你在 Mac 旁用支架放了一台 iPad，会很方便。配对流程完全相同：在桌面上安装附加元件、用 iPad 扫描 QR 码，然后平板就操控你的复习。（如果你正在搜寻如何在 iPad 上使用 Anki 遥控器，这就是答案——同样的 WebSocket 桥接，无需额外设定。）

## 免手持 Anki 复习：跑步机、躺著、黑暗中

「免手持 Anki」其实指两件不同的事，值得区分清楚：

- **瞄一眼再点击。** 你的手机架起来或握在一只手上；你看著大大的 *再次 / 困难 / 良好 / 简单* 按钮并点击。适合沙发、书桌或健身车这类你能看到萤幕的场景。
- **不看萤幕。** 闭上眼睛、关灯，或在跑步机上低头看很不方便。这时触觉按钮就赢了——而这正是下面 8BitDo 桥接方案适用的场景。

对于大部分书桌与沙发复习，用手机瞄一眼再点击就足够了。对于严格的不看萤幕复习，桥接一个控制器（下一节）你就能获得实体按钮，不需购买专用键盘。

## 使用便宜的 8BitDo（Zero 2 / micro）透过手机

这是其他任何地方都没有的功能。将 **8BitDo Zero 2** 或 **micro** 与你的 iPhone 配对——透过蓝牙，或有线 USB-C——然后将控制器切换到它的 **键盘模式**。Guru App 会读取那些 `GCKeyboard` 事件，并将对应的复习动作转发给 Anki Desktop：

- `1 / 2 / 3 / 4` → 再次 / 困难 / 良好 / 简单
- `空白键` → 显示答案 · `R` → 重播 · `Z` 或 `U` → 复原

因为 *手机* 是与 Anki 沟通的那个装置，所以那些 AnkiMobile 直接拒绝配对的控制器，在这里都能正常运作。你只要花大约 25 美元就能获得触觉、不看萤幕的按钮，不需要 60 美元的专用遥控器，而且当你没带控制器时，仍可只用手机来复习。

## 诚实比较

| | StudyRemote | 8BitDo + Contanki | iPhone + Flashcard Guru Remote |
|---|---|---|---|
| 成本 | 40-60 美元硬体 | 20-30 美元硬体 | 免费（使用你的手机） |
| 不看萤幕的人体工学 | ★★★（触觉、专用） | ★★★（触觉、专用） | ★★（需看萤幕，除非桥接控制器） |
| 开放原始码 | 否 | 是（Contanki 附加元件） | 是（LGPL-3.0 附加元件） |
| 便宜的 8BitDo（Zero 2 / micro） | 不适用 | 是（仅限 Anki Desktop） | 是——包括透过 iPhone 用于桌面版 |
| 与 AnkiMobile 相容 | 是（HID 键盘） | 否（小型型号） | 需搭配独立的 iOS App |
| 隐私 | 本地蓝牙 | 本地 USB / 蓝牙 | 仅区域网路，令牌配对 |

诚实的结论：**如果你经常进行严格的不看萤幕复习**（跑步机、闭眼、黑暗中），专用硬体仍然胜出，因为没有什么比拇指下的触觉按钮更好。如果你 **大部分复习是在书桌或沙发上进行，且 iPhone 已在伸手可及之处**，那么手机当遥控器能以 0% 的价格涵盖 90% 的使用情境——而且如果你也有一台 Zero 2，你可以将它配对到手机，顺便拿回不看萤幕的人体工学优势。

## 为什么不让 iPhone 直接模拟成蓝牙键盘？

你可能会想：「如果 iPhone 直接模拟成 Mac 能看到的蓝牙键盘，不是更简洁吗？」答案在于平台层级：**iOS 不允许第三方 App 扮演蓝牙 HID 周边装置的角色。** 这不是任何一个 App 缺失的功能，而是 Apple 维持了十多年的限制。所以我们使用次佳的方案——透过你现有的 Wi-Fi 建立一个小型的 WebSocket 连线——它提供相同的使用者体验，并且额外支援结构化状态更新（iPhone 永远知道你正在哪个牌组、哪个伫列、哪个阶段）。

## 隐私说明

配对令牌绝不会离开你的本地网路。附加元件只接受来自 RFC-1918 / loopback / link-local IP 的连线作为安全检查，即使你不小心将埠暴露于公共网际网路，伺服器也会拒绝握手。没有分析工具、没有远端日志、没有「打电话回家」。你可以从 Anki 桌面对话框中撤销任何已配对的 iPhone，令牌会立即失效。


## 原始码

- Anki Desktop 附加元件，以 LGPL-3.0 开放原始码：<a href="https://github.com/jyehn/flashcard-guru-remote-addon">github.com/jyehn/flashcard-guru-remote-addon</a>
- AnkiWeb 页面：<a href="https://ankiweb.net/shared/info/1196082853">代码 1196082853</a>

iOS 端的桥接功能属于 Guru iOS App 的一部分，该 App 为封闭原始码。附加元件透过 WebSocket 沟通——传输的是有良好文件记录的 JSON 协定——所以如果你想自己撰写客户端也完全可行。

## 相关指南

- <a href="/zh-Hans/blog/8bitdo-anki-setup/">8BitDo for Anki：Zero 2 与 micro 设定（以及 iPhone 修正方案）</a>
- <a href="/zh-Hans/blog/hands-free-anki-review/">免手持 Anki 复习：跑步机、床上或闭眼模式</a>
- <a href="/zh-Hans/blog/anki-on-iphone-guide/">如何在 iPhone 与 iPad 上使用 Anki：所有方案比较</a>
- <a href="/zh-Hans/blog/import-anki-decks-iphone/">如何将你的 Anki 牌组 (.apkg) 汇入 iPhone</a>

<div class="cta-box">
<h3>准备好尝试了吗？</h3>
<p>设定大约需要一分钟，而且完全免费。查看附有萤幕截图的完整教学。</p>
<a class="cta" href="/zh-Hans/anki-remote">检视设定说明</a>
</div>
