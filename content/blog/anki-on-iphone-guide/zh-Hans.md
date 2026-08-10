<div class="tldr">
<strong>TL;DR</strong>
在 iPhone 或 iPad 上使用 Anki 有三种真实可行的方法：官方 <strong>AnkiMobile</strong> App（$24.99，一次性购买）、浏览器版 <strong>AnkiWeb</strong>（免费，但在手机上操作较笨拙）、或是像 <a href="/zh-Hans/">Guru</a> 这类原生替代方案，能完整汇入你既有的 <code>.apkg</code> 牌组并以 FSRS 进行复习。AnkiDroid 仅限 Android，因此 iOS 无法使用。无论你选择哪种方案，你的牌组都可以自由携带 — 它们皆可汇出回标准的 <code>.apkg</code> 格式。
</div>

## Anki 在 iPhone 上免费吗？

短话长说：部分免费。Anki *专案*在桌机上是免费且开源的，<strong>AnkiWeb</strong>（浏览器版本）也是免费的。但官方的原生 iOS App <strong>AnkiMobile</strong> 是付费 App — <strong>$24.99</strong>，一次性购买。这个价格是有意为之：它用来资助整个免费 Anki 生态系统的开发。所以「Anki 在 iPhone 上免费吗」通常指的是「有没有可以在手机上免费复习牌组的方法」，而诚实的答案是：有（AnkiWeb），但要好的原生体验就需要花钱。

以下是三条路径，以及真正值得注意的取舍。

## 方案 1：AnkiMobile（官方 App）

AnkiMobile 由桌机版 Anki 的同一位作者开发，因此是最忠于「正宗」Anki 的选择 — 相同的排程器、相同的笔记类型、相同地同步至 AnkiWeb。如果你想要经典的行为且不介意传统的 Anki 介面，这是最安全的选择。

- **费用：** $24.99 一次性购买。
- **最适合：** 已深入 Anki 生态系、需要在桌机与手机间同步的纯粹主义者。
- **注意：** 介面功能强大但略显老旧，而且仅支援暴露 Apple `GCExtendedGamepad` 规范的游戏控制器 — 这意味著市面上便宜的 8BitDo 型号大多不适用（下面会详细说明）。

## 方案 2：浏览器版 AnkiWeb

AnkiWeb 是免费的网页客户端。在 Safari 中登入 ankiweb.net，即可在任何装置上复习到期的卡片，无需安装。

- **费用：** 免费。
- **最适合：** 偶尔复习，或是在付费购买原生 App 前先试用 Anki。
- **注意：** 它是网页而非 App — 无法离线复习、手势功能有限、无法进行多媒体编辑，且需要依赖桌机来处理较重的工作。

## 方案 3：专为 iPhone 打造的原生替代方案（Guru）

<a href="/zh-Hans/">Guru: AI Flashcard Study</a> 是第三条路：一款原生 iOS App，沿用 Anki 的工作流程但针对手机重新打造。它使用 Anki 本身的引擎汇入任何 <code>.apkg</code> 或 <code>.colpkg</code>，因此卡片、多媒体档案和排程状态都会完整迁移 — 然后以 <strong>FSRS</strong>（现代间隔复习排程器）进行复习。

- **费用：** 免费 3 天试用，之后可选择周缴／年缴方案或一次性 Lifetime 方案（$59.99）。
- **最适合：** 想要快速、现代、以 iPhone 为首的 App、希望 AI 协助将笔记转成卡片、考试前使用 Cram Mode，以及内建**免费无线 [Anki Remote](/zh-Hans/anki-remote)** 的使用者。
- **注意：** 这是独立的 App，而非 AnkiMobile 的换皮 — 因此你需要将牌组汇入其中（请参阅 <a href="/zh-Hans/blog/import-anki-decks-iphone/">如何汇入你的 Anki 牌组</a>），而非透过 AnkiWeb 同步。


![iPhone 上的 GuruOwl 资料库 — 已导入的 JLPT、USMLE、西语与图片遮挡 Anki 牌组](/assets/screenshots/library-decks.webp)

![在 iPhone 上复习导入的 Anki 卡片,带 FSRS 间隔](/assets/screenshots/review-answer-fsrs.webp)

## 快速比较

| | AnkiMobile | AnkiWeb（浏览器） | Guru |
|---|---|---|---|
| 费用 | $24.99 一次性 | 免费 | 免费试用，之后从 $5.99/周 或 $59.99 终身 |
| 原生 iOS App | 是 | 否（网站） | 是 |
| 离线复习 | 是 | 否 | 是 |
| 汇入 `.apkg` / `.colpkg` | 是 | 需透过桌机 | 是（完整保留） |
| 排程器 | Anki / FSRS | Anki / FSRS | FSRS |
| AI 卡片生成 | 否 | 否 | 是 |
| 桌机 Anki 免费无线遥控 | 否 | 不适用 | 是 |
| 便宜 8BitDo 控制器 | 否（小型型号） | 不适用 | 是（透过手机） |

## 你真的需要在手机上使用 Anki — 还是只需要桌机的遥控器？

许多搜寻「anki on iphone」的人其实需求更微妙：他们是在**桌机版 Anki** 上复习，只想在沙发上操作时不必伸手去碰键盘。如果这说的是你，你根本不需要将整个工作流程搬到手机上 — 你可以将 iPhone 变成桌机版 Anki 的无线遥控器。详情请见 <a href="/zh-Hans/anki-remote">免费 Anki Remote 设定</a> 以及 <a href="/zh-Hans/blog/free-wireless-anki-remote/">遥控方案完整比较</a>。

## 迁移你现有的牌组

无论你选择哪个原生 App，第一步都一样：将你的 <code>.apkg</code> 档案传入手机，并在保留排程的状态下汇入。我们写了一份逐步教学：<a href="/zh-Hans/blog/import-anki-decks-iphone/">如何在 iPhone 上汇入你的 Anki 牌组 (.apkg)</a>。重点是 — 你的学习进度永远不会被锁死；一切都可以汇出回标准的 <code>.apkg</code>。



![iPhone 上 Anki .apkg 导入完成 — 新增 2,825 张卡片](/assets/screenshots/import-success.webp)

<div class="cta-box">
<h3>想要一款在 iPhone 上如鱼得水的 Anki？</h3>
<p>数秒内汇入你的牌组、以 FSRS 复习、并使用免费的无线遥控器。免费 3 天试用。</p>
<a class="cta" href="/zh-Hans/">立即使用 Guru</a>
</div>
