<div class="tldr">
<strong>TL;DR</strong>
8BitDo Zero 2またはmicroは2000～3000円台で買えるポケットサイズのコントローラーで、ハンズフリーAnkiに最適です。<strong>デスクトップAnki</strong>ではContankiアドオンで動作します。<strong>iPhone</strong>では注意点があります。AnkiMobileは小型モデルとペアリングできませんが、コントローラーのKeyboard Modeを使い、<a href="/ja/anki-remote">Guru Anki Remote</a>を介して接続することで回避できます。
</div>

## 8BitDoコントローラーがAnkiで人気の理由

その魅力はシンプル：スマホを持たず、キーボードに触れずに復習できること。いくつかのボタンに「Again / Hard / Good / Easy」と「答え表示」を割り当てれば、トレッドミルで、ソファで、寝転がりながらカードをこなせます。8BitDoの小型コントローラーは安価でポケットに入り、本物のタクタイルボタンを搭載しているため、医学部生のAnkiコミュニティで広まりました。

## モデル選び：Zero 2 vs micro

どちらも優れていますが、使い心地が異なります：

- **8BitDo Zero 2** — キーチェーンサイズで超携帯性抜群、やや窮屈。ポケット復習に最適。
- **8BitDo micro** — やや大型でボタンが快適、専用の**Keyboard Mode**スイッチがあり、後述のiPhoneルートで便利。

どちらもAnkiで使用可能です。スマホだけでの復習なら、microのKeyboard Modeが少し便利です。

## デスクトップAnki：Contankiを使う

デスクトップAnkiで復習する場合、最もクリーンな方法は**Contanki**アドオンです。AnkiWebからインストールし、8BitDoを有線またはBluetooth接続して、ボタンに復習アクションを割り当てます。これは完全に無料でオープンな方法で、スマホは一切必要ありません。

## 誰も言及しないiPhoneの問題

ここに多くの人がつまずく落とし穴があります。**AnkiMobile（公式iOSアプリ）は、ゲームパッドモードの小型8BitDoコントローラーを受け付けません。** AnkiMobileはAppleの`GCExtendedGamepad`プロファイルのみをリッスンし、Zero 2 / microはそれを公開しません。そのため、Anki用に購入した手頃なコントローラーがデスクトップでは完璧に動作する一方、AnkiMobileでは静かに何も機能しません。

## 対策：コントローラーをスマホ経由で接続する

回避策は、コントローラーを**Keyboard Mode**に切り替え、キーボードイベントをリッスンするアプリにキー入力を転送させることです。<a href="/ja/anki-remote">Guru Anki Remote</a>はまさにこれを行います。GuruはAppleの`GCExtendedGamepad`プロファイルと、8BitDoのKeyboard Modeが送信する`GCKeyboard`イベントの両方をリッスンし、対応する復習アクションをWi-Fi経由で**デスクトップAnki**に転送します。

結果：Zero 2 / microをKeyboard ModeでiPhoneに接続（有線またはBluetoothペアリング）すれば、AnkiMobileが拒否するコントローラーが突然あなたの復習を動かし始めます。なぜなら、スマホが間に入るデバイスになるからです。背景の詳細は<a href="/ja/blog/free-wireless-anki-remote/">無線Ankiリモートの比較記事</a>をご覧ください。

## ボタン割り当て

Keyboard Modeでは、デフォルトのマッピングがAnkiの復習キーにきれいに適合します：

- `1 / 2 / 3 / 4` → Again / Hard / Good / Easy
- `Space` → 答え表示
- `R` → 音声再生 · `Z` または `U` → 元に戻す

8BitDoのKeyboard ModeではなくMFiゲームパッドを使用している場合、Guruは標準的なフェイスボタンも割り当てます（A → Good、B → Again、X → Hard、Y → Easy、ショルダーボタン → 答え表示 / 音声再生）。

## エンドツーエンドの設定手順

1. 8BitDoをiPhoneとペアリングし、**Keyboard Mode**に切り替えます（お使いのモデルの8BitDoボタンコンビネーションを確認）。
2. デスクトップAnkiに**[Anki Remote](/ja/anki-remote)**アドオン（コード`1196082853`）をインストールし、QRコードをスキャンしてスマホとペアリングします。
3. デスクトップでデッキを開き、ボタンを押すとカードがめくられ、評価されます。完了です。


## 関連ガイド

- <a href="/ja/blog/free-wireless-anki-remote/">Ankiリモート設定（2026）：無料iPhone vs 8BitDo</a>
- <a href="/ja/blog/hands-free-anki-review/">ハンズフリーAnki復習</a>
- <a href="/ja/anki-remote">Ankiリモート設定手順</a>

## FAQ

**ContankiとGuruは両方必要ですか？**
いいえ。Contankiは、コンピューターに直接接続したコントローラーからデスクトップAnkiを*直接*操作するためのものです。Guruルートは、コントローラーが**スマホ**側にあり、デスクトップを操作したい場合に使います。コントローラーの設置場所に応じてどちらかを選んでください。

**8BitDoはAnkiMobileで直接動作しますか？**
小型モデル（Zero 2 / micro）は、`GCExtendedGamepad`の制限により一般的には動作しません。Guru経由の接続が回避策です。

**費用はかかりますか？**
コントローラー本体は約2000～3000円です。Anki Remoteアドオンとリモート機能は無料、Contankiも無料です。

<div class="cta-box">
<h3>8BitDoをiPhoneで使えるようにする</h3>
<p>Guru Anki Remote（無料）で格安コントローラーを接続 ― AnkiMobileがペアリングできないモデルも対応。</p>
<a class="cta" href="/ja/anki-remote">Anki Remoteを設定する</a>
</div>
