<div class="tldr">
<strong>요약</strong>
<code>.apkg</code>(또는 <code>.colpkg</code>) 파일을 파일 앱, AirDrop, iCloud Drive 또는 이메일을 통해 폰으로 가져온 후, 네이티브 Anki 앱에서 여세요. <a href="/ko/">Guru</a>에서는 Anki 자체 엔진을 사용하여 가져오기 때문에 카드, 미디어, 학습 일정이 정확히 그대로 유지됩니다. 또한 모든 것이 표준 <code>.apkg</code>로 내보내지므로 덱이 잠기지 않습니다.
</div>

## .apkg 안에는 실제로 무엇이 들어있나요

<code>.apkg</code>는 노트, 노트로 생성된 카드, 노트 유형/템플릿, 모든 미디어(이미지, 오디오), 그리고 결정적으로 **학습 일정**(마감일, 간격, 난이도, 해당 덱의 복습 기록)을 포함하는 압축 패키지입니다. <code>.colpkg</code>는 하나의 덱이 아닌 *전체* 컬렉션을 위한 동일한 개념입니다.

마지막 부분이 "가져오기"가 중요한 이유입니다: 제대로 하면 덱을 처음부터 다시 시작하지 않고, 진도가 카드와 함께 이동합니다.

## 1단계: 파일을 아이폰으로 가져오기

먼저 <code>.apkg</code> 파일을 폰에서 접근할 수 있어야 합니다. 다음 방법 중 하나를 사용하세요:

- **파일 앱 / iCloud Drive** — 컴퓨터의 iCloud Drive에 <code>.apkg</code>를 넣으면 폰의 파일 앱에 나타납니다.
- **AirDrop** — Mac에서 파일을 아이폰으로 바로 AirDrop하세요.
- **이메일 또는 메시지** — 자신에게 보내고 첨부 파일을 탭하세요.
- **직접 다운로드** — 공유 덱(AnKing 등)은 종종 Safari에서 파일 앱으로 바로 다운로드됩니다.


![파일 앱에서 .apkg 선택](/assets/screenshots/import-files-picker.webp)

## 2단계: 가져오기 (학습 일정 유지)

![학습 자료 추가 메뉴의 .apkg/.colpkg 가져오기](/assets/screenshots/import-add-menu.webp)


<a href="/ko/">Guru</a>에서 덱 목록을 열고 가져오기를 선택한 후, 파일에서 <code>.apkg</code>를 선택하세요. Anki 자체 엔진으로 가져오기 때문에 카드, 미디어, 학습 일정이 정확히 그대로 들어옵니다 — 다시 학습하거나 기록이 손실되지 않습니다.

동일한 파일은 **AnkiMobile**에서도 가져올 수 있습니다. 파일 앱에서 <code>.apkg</code>를 탭하고 "AnkiMobile로 복사"를 선택하세요. (어떤 앱을 사용해야 할지 모르겠다면 <a href="/ko/blog/anki-on-iphone-guide/">iPhone 및 iPad에서 Anki 사용법</a>을 참조하세요.)


![가져오기 준비가 된 Anki Import Wizard](/assets/screenshots/import-wizard.webp)

![아이폰 Anki .apkg 가져오기 완료 — 2,825장 추가](/assets/screenshots/import-success.webp)

## 3단계: 올바르게 가져왔는지 확인

가져오기 후, 빠른 확인을 해보세요:

- 덱의 **예정 카드 수**가 올바른지 (전부 "새 카드"가 아님).
- 이미지나 오디오가 있는 카드가 미디어를 제대로 표시하는지.
- Cloze(빈칸 채우기) 카드가 빈칸을 올바르게 표시하는지.

예정 카드 수가 "새 카드"로 초기화되었다면, 아마도 학습 일정이 제거된 *공유* 덱을 가져온 것입니다. 이는 가져오기 문제가 아니라 덱이 내보내진 방식의 속성입니다. 가능하다면 학습 일정을 포함하여 소스에서 다시 내보내세요.

## 내 연속 학습 기록과 복습 기록은 유지되나요?

**학습 일정**(간격, 난이도, 마감일)은 <code>.apkg</code> 내부에 포함되어 이동하므로, 복습은 중단된 지점부터 이어집니다. 전역 일일 *연속 학습 카운터*는 앱별로 새 앱에서 새로 시작되지만, 실제 간격 반복 일정(기억 유지에 중요한 요소)은 보존됩니다.

## 절대 잠기지 않습니다

반복할 가치가 있는 부분: 좋은 Anki 앱은 **다시 내보내기**를 허용합니다. Guru를 사용하면 언제든지 모든 덱을 표준 <code>.apkg</code>로 내보내 데스크탑 Anki, AnkiMobile 또는 다른 곳으로 가져갈 수 있습니다. 아이폰으로 가져오는 것은 이동일 뿐, 일방적인 함정이 아닙니다.



## 관련 가이드

- <a href="/ko/blog/anki-on-iphone-guide/">안키 아이폰 사용법 (2026)</a>
- <a href="/ko/blog/hands-free-anki-review/">핸즈프리 Anki 복습</a>
- <a href="/ko/blog/free-wireless-anki-remote/">Anki 리모컨 설정: 무료 아이폰 vs 8BitDo</a>

<div class="cta-box">
<h3>더 나은 아이폰 앱으로 덱을 가져오세요</h3>
<p><code>.apkg</code>를 온전히 가져오고, FSRS로 복습하며, 언제든지 내보낼 수 있습니다. 무료 3일 체험 제공.</p>
<a class="cta" href="/ko/">Guru 다운로드</a>
</div>
