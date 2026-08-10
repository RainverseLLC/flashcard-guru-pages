<div class="tldr">
<strong>TL;DR</strong>
<code>.apkg</code>（または<code>.colpkg</code>）ファイルをiPhoneに転送します — Filesアプリ、AirDrop、iCloud Drive、メール経由で — その後、ネイティブのAnkiアプリで開きます。<a href="/ja/">Guru</a>では、インポートにAnki純正のエンジンを使用しているため、カード、メディア、スケジュール状態が完全に引き継がれます。また、すべてを標準の<code>.apkg</code>に書き出せるため、デッキがロックされることはありません。
</div>

## .apkgの中身とは

<code>.apkg</code>は圧縮されたパッケージで、ノート、ノートから生成されたカード、ノートタイプ/テンプレート、メディアファイル（画像、音声）、そして — 重要なのは — **スケジュール状態**（そのデッキの期日、間隔、容易さ、復習履歴）が含まれています。<code>.colpkg</code>も同様の概念ですが、1つのデッキではなく*コレクション全体*を対象とします。

この最後の部分が「インポート」が重要な理由です。正しく行えば、デッキをゼロから再開する必要はなく、学習の連続性がカードとともに引き継がれます。

## ステップ 1: iPhoneにファイルを転送する

まず、<code>.apkg</code>ファイルをiPhoneでアクセスできるようにする必要があります。以下のいずれかの方法で可能です：

- **Filesアプリ / iCloud Drive** — パソコンで<code>.apkg</code>をiCloud Driveにドロップします。するとiPhoneのFilesアプリに表示されます。
- **AirDrop** — MacからAirDropで直接iPhoneにファイルを送信します。
- **メールまたはメッセージ** — 自分宛に送信し、添付ファイルをタップします。
- **直接ダウンロード** — 公開デッキ（AnKingなど）はSafariで直接Filesにダウンロードされることがよくあります。


![ファイルAppで.apkgを選択](/assets/screenshots/import-files-picker.webp)

## ステップ 2: インポートする（スケジュールをそのまま維持）

![教材追加メニューの「.apkg/.colpkgをインポート」](/assets/screenshots/import-add-menu.webp)


<a href="/ja/">Guru</a>でデッキ一覧を開き、インポートを選択してFilesから<code>.apkg</code>を選びます。インポートはAnki純正のエンジンで実行されるため、カード、メディア、スケジュールは元のまま正確に取り込まれます — 再学習は不要、履歴も失われません。

同じファイルは**AnkiMobile**にもインポートできます。Filesで<code>.apkg</code>をタップし、「AnkiMobileにコピー」を選択してください。（どのアプリを使うべきか迷っていますか？ <a href="/ja/blog/anki-on-iphone-guide/">iPhone/iPadでのAnkiの使い方</a>をご覧ください。）


![インポート準備完了のAnki Import Wizard](/assets/screenshots/import-wizard.webp)

![iPhoneでのAnki .apkgインポート完了 — 2,825枚のカードを追加](/assets/screenshots/import-success.webp)

## ステップ 3: 正しくインポートされたか確認する

インポート後、簡単なチェックを行いましょう：

- デッキの**予定復習数**が正しく表示されているか（「すべて新規カード」ではないこと）
- 画像や音声があるカードが正しくメディアを表示しているか
- 穴埋め問題（Cloze）カードが正しく表示されているか

予定復習数が「新規」にリセットされている場合、おそらく*公開用に*スケジュールが取り除かれたデッキをインポートした可能性があります。これはデッキのエクスポート方法に起因するもので、インポートの問題ではありません。可能であれば、元の環境からスケジュールを含めて再度エクスポートしてください。

## 学習の連続性と復習履歴は維持されますか？

**スケジュール状態**（間隔、容易さ、期日）は<code>.apkg</code>内に含まれて引き継がれるため、復習は中断したところから再開されます。グローバルな日次*連続学習記録（ストリーク）*はアプリ固有のもので、新しいアプリではリセットされますが、実際の記憶定着に重要な間隔反復スケジュールは維持されます。

## デッキがロックされることはありません

ここは繰り返し強調する価値があります：優れたAnkiアプリは**書き出し**を可能にします。Guruでは、いつでも任意のデッキを標準の<code>.apkg</code>に書き出し、デスクトップ版Anki、AnkiMobile、その他任意のアプリに移行できます。iPhoneへのインポートは「移動」であり、一方通行のワナではありません。



## 関連ガイド

- <a href="/ja/blog/anki-on-iphone-guide/">Ankiアプリ iPhone使い方（2026）</a>
- <a href="/ja/blog/hands-free-anki-review/">ハンズフリーAnki復習</a>
- <a href="/ja/blog/free-wireless-anki-remote/">Ankiリモート設定：無料iPhone vs 8BitDo</a>

<div class="cta-box">
<h3>あなたのデッキをより優れたiPhoneアプリへ</h3>
<p><code>.apkg</code>をそのままインポート、FSRSで復習、いつでも書き出し可能。3日間の無料トライアル実施中。</p>
<a class="cta" href="/ja/">Guruを入手</a>
</div>
