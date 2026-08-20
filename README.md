# Science Mission

과학관 현장용 모바일 미션 웹앱입니다.

## 게임 흐름

QR 접속 → START → STORY → LOCATION → QUIZ → 종이접기 STEP 공개 → 다음 미션

총 4개의 미션을 완료하면 종이접기 4단계를 모두 확인할 수 있습니다.

## GitHub Pages 배포

1. 이 저장소의 파일을 GitHub 저장소 최상위(root)에 업로드합니다.
2. GitHub 저장소에서 **Settings → Pages**로 이동합니다.
3. **Build and deployment**에서 `Deploy from a branch`를 선택합니다.
4. Branch는 `main`, Folder는 `/(root)`를 선택하고 저장합니다.
5. 생성된 GitHub Pages 주소를 QR 코드에 연결합니다.

일반적인 주소 형식:

`https://사용자명.github.io/저장소명/`

## 파일 구조

```text
/
├─ index.html
├─ README.md
├─ .nojekyll
└─ images/
   ├─ mission1-story.jpg
   ├─ mission1-location.jpg
   ├─ mission1-quiz.jpg
   ├─ fold-step1.png
   ├─ mission2-story.jpg
   ├─ mission2-location.jpg
   ├─ mission2-quiz.jpg
   ├─ fold-step2.png
   ├─ mission3-story.jpg
   ├─ mission3-location.jpg
   ├─ mission3-quiz.jpg
   ├─ fold-step3.png
   ├─ mission4-story.jpg
   ├─ mission4-location.jpg
   ├─ mission4-quiz.jpg
   └─ fold-step4.png
```

## 이미지 교체

실제 전시물 사진과 종이접기 도안을 기존 파일명과 동일하게 `images/` 폴더에 덮어쓰면 됩니다.

권장 비율:
- STORY / LOCATION / QUIZ: 약 1200×760 JPG
- 종이접기 STEP: 4:3 PNG 권장
- 스마트폰에서 잘 보이도록 접는 선과 화살표는 굵게 제작

## 중요

`index.html` 안의 이미지 경로는 `images/...` 형태의 상대경로를 사용합니다.
GitHub Pages 프로젝트 사이트에서도 정상적으로 동작하도록 `/images/...` 형태의 절대경로는 사용하지 않습니다.

현재 `fold-step1.png` ~ `fold-step4.png`는 구조 확인용 임시 이미지입니다.
실제 운영 전 최종 종이접기 안내 이미지로 교체해야 합니다.
