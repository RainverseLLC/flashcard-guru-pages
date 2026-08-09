<div class="tldr">
<strong>요약</strong>
8BitDo Zero 2 또는 micro는 약 2~3만 원대 주머니에 쏙 들어가는 컨트롤러로, Anki를 손 없이 사용하기에 완벽합니다. <strong>데스크톱 Anki</strong>에서는 Contanki 애드온을 통해 작동합니다. <strong>iPhone</strong>에서는 문제가 있습니다. AnkiMobile이 소형 모델과 페어링되지 않기 때문이죠. 하지만 컨트롤러의 키보드 모드를 사용해 <a href="/ko/anki-remote">Guru Anki Remote</a>로 연결하면 이 문제를 해결할 수 있습니다.
</div>

## 8BitDo 컨트롤러가 Anki에서 인기 있는 이유

간단합니다. 휴대폰을 들거나 키보드를 만지지 않고 복습할 수 있다는 점입니다. 몇 가지 버튼을 *Again / Hard / Good / Easy*와 *Show Answer*에 매핑하면 런닝머신 위에서, 소파에서, 또는 누워서도 카드를 학습할 수 있습니다. 8BitDo의 작은 컨트롤러는 저렴하고, 주머니에 들어가며, 실제 tactile 버튼을 갖추고 있어 의대생 Anki 커뮤니티에서 인기를 끌었습니다.

## 어떤 모델을 선택할까: Zero 2 vs micro

둘 다 훌륭하지만 느낌이 다릅니다:

- **8BitDo Zero 2** — 열쇠고리 크기, 초소형, 약간 좁습니다. 주머니 복습에 탁월합니다.
- **8BitDo micro** — 약간 더 크고, 더 편안한 버튼, 아래 iPhone 경로에 유용한 전용 **키보드 모드** 스위치가 포함되어 있습니다.

둘 다 Anki에서 작동합니다. 휴대폰에서만 복습한다면 micro의 키보드 모드가 조금 더 편리합니다.

## 데스크톱 Anki: Contanki 사용하기

데스크톱 Anki에서 복습한다면 가장 깔끔한 방법은 **Contanki** 애드온입니다. AnkiWeb에서 설치하고, 8BitDo를 유선 연결하거나 Bluetooth로 페어링한 후 버튼을 복습 동작에 매핑하세요. 완전히 무료이며 개방된 방식으로 휴대폰이 전혀 필요하지 않습니다.

## 아무도 이야기하지 않는 iPhone 문제

사용자들을 당황하게 하는 함정이 있습니다. **AnkiMobile(공식 iOS 앱)은 소형 8BitDo 컨트롤러를 게임패드 모드에서 인식하지 않습니다.** AnkiMobile은 Apple의 `GCExtendedGamepad` 프로필만 수신하며, Zero 2 / micro는 이를 지원하지 않습니다. 그래서 Anki를 위해 구매한 바로 그 저렴한 컨트롤러가 데스크톱에서는 잘 작동하지만 AnkiMobile에서는 조용히 아무것도 하지 않습니다.

## 해결 방법: 휴대폰을 통해 컨트롤러 연결하기

해결 방법은 컨트롤러를 **키보드 모드**로 전환하고 키보드 이벤트를 수신하는 앱이 입력을 전달하도록 하는 것입니다. <a href="/ko/anki-remote">Guru Anki Remote</a>가 정확히 이 역할을 합니다. Guru는 Apple의 `GCExtendedGamepad` 프로필과 `GCKeyboard` 이벤트(8BitDo의 키보드 모드가 보내는 것)를 모두 수신한 다음, 일치하는 복습 동작을 Wi-Fi를 통해 **데스크톱 Anki**로 전달합니다.

결과: Zero 2 / micro를 iPhone에 연결(또는 Bluetooth 페어링)하고 키보드 모드로 설정하면, AnkiMobile이 거부했던 컨트롤러가 갑자기 복습을 구동합니다. 휴대폰이 중간 장치 역할을 하기 때문입니다. 자세한 내용은 <a href="/ko/blog/free-wireless-anki-remote/">무선 Anki 리모컨 비교</a> 글을 참조하세요.

## 버튼 매핑

키보드 모드에서 기본값은 Anki의 복습 키에 깔끔하게 매핑됩니다:

- `1 / 2 / 3 / 4` → Again / Hard / Good / Easy
- `Space` → Show Answer
- `R` → 오디오 다시 듣기 · `Z` 또는 `U` → 실행 취소

키보드 모드의 8BitDo 대신 MFi 게임패드를 사용하는 경우, Guru는 표준 페이스 버튼도 매핑합니다(A → Good, B → Again, X → Hard, Y → Easy, 숄더 버튼 → Show Answer / Replay).

## 전체 설정 과정

1. 8BitDo를 iPhone에 페어링하고 **키보드 모드**로 전환하세요(모델에 맞는 8BitDo의 버튼 조합을 확인하세요).
2. 데스크톱 Anki에 **[Anki Remote](/ko/anki-remote)** 애드온(코드 `1196082853`)을 설치하고, QR 코드를 스캔하여 휴대폰을 연결하세요.
3. 데스크톱에서 덱을 열고 버튼을 누르세요. 카드가 뒤집히고 평가됩니다. 완료입니다.

## 자주 묻는 질문

**Contanki와 Guru가 모두 필요한가요?**
아닙니다. Contanki는 컴퓨터에 연결된 컨트롤러로 데스크톱 Anki를 *직접* 구동하기 위한 것입니다. Guru 경로는 컨트롤러가 **휴대폰**에 있고 데스크톱을 구동하려는 경우에 사용합니다. 컨트롤러가 있는 위치에 따라 선택하세요.

**8BitDo가 AnkiMobile에서 직접 작동하나요?**
소형 모델(Zero 2 / micro)은 일반적으로 작동하지 않습니다. `GCExtendedGamepad` 제한 때문입니다. Guru를 통한 연결이 이를 해결하는 방법입니다.

**비용이 드나요?**
컨트롤러는 약 2~3만 원입니다. Anki Remote 애드온과 리모컨 기능은 무료이며, Contanki도 무료입니다.


## 관련 가이드

- <a href="/ko/blog/free-wireless-anki-remote/">Anki 리모컨 설정 (2026): 무료 아이폰 vs 8BitDo</a>
- <a href="/ko/blog/hands-free-anki-review/">핸즈프리 Anki 복습</a>
- <a href="/ko/anki-remote">Anki 리모컨 설정 안내</a>

<div class="cta-box">
<h3>iPhone에서 8BitDo 작동시키기</h3>
<p>무료 Guru Anki Remote를 통해 저렴한 컨트롤러를 연결하세요 — AnkiMobile이 거부하는 모델도 포함됩니다.</p>
<a class="cta" href="/ko/anki-remote">Anki Remote 설정하기</a>
</div>
