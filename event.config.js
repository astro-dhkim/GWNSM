// 행사마다 고유한 eventId를 사용하세요. 같은 행사 중에는 변경하지 마세요.
globalThis.SANTA_EVENT = {
  eventId: "santa-science-demo",
  title: "산타의 비밀 수사 파일",
  intro: "전시실에 흩어진 여섯 개의 생명 신호를 찾아 크리스마스의 불빛을 되살려 주세요.",
  storyTitle: "사라진 크리스마스의 불빛",
  story: [
    "크리스마스 전날 밤, 산타의 썰매를 움직이는 여섯 개의 생명 신호가 사라졌어요. 신호가 마지막으로 감지된 곳은 과학관의 세 전시실이에요.",
    "확대 사진과 힌트를 보고 실제 전시물을 찾아보세요. 전시물 이름을 입력할 때마다 생명 신호 하나가 돌아옵니다.",
    "여섯 신호를 모두 되찾으면 마지막 화면을 행사 직원에게 보여 주세요."
  ],
  sampleNotice: "",
  cover: "./assets/cover.jpg",
  missions: [
    {
      id: "snow", zone: "자연의 무늬", title: "얼어붙은 별",
      image: "./assets/snow.jpg", alt: "얼어붙은 결정의 확대 사진",
      prompt: "차가운 공기에서 만들어진 이 결정의 이름은 무엇일까요?",
      hint: "하늘에서 내려오고, 결정에는 보통 여섯 방향으로 가지가 뻗어요.",
      answers: ["눈 결정", "눈송이", "눈꽃", "눈", "snowflake"],
      note: "눈 결정의 육각 대칭은 얼음 속 물 분자의 배열에서 비롯돼요."
    },
    {
      id: "hive", zone: "자연의 무늬", title: "여섯 변의 방",
      image: "./assets/hive.jpg", alt: "육각형 방들이 이어진 부분의 확대 사진",
      prompt: "곤충이 만든 이 구조물의 이름은 무엇일까요?",
      hint: "꿀벌은 밀랍으로 방을 짓고, 그 안에 꿀을 저장해요.",
      answers: ["벌집", "꿀벌집", "꿀벌의 집", "honeycomb"],
      note: "육각형은 빈틈없이 평면을 채울 수 있어요."
    },
    {
      id: "amethyst", zone: "지구의 기록", title: "보랏빛 봉우리",
      image: "./assets/amethyst.jpg", alt: "보라색 광물 결정의 확대 사진",
      prompt: "이 보라색 석영의 이름은 무엇일까요?",
      hint: "한자 이름에서 첫 글자 ‘자’는 보라색을 뜻해요.",
      answers: ["자수정", "아메시스트", "amethyst"],
      note: "자수정은 석영의 한 종류예요."
    },
    {
      id: "fossil", zone: "지구의 기록", title: "돌에 남은 소용돌이",
      image: "./assets/fossil.jpg", alt: "돌에 남은 나선형 껍데기의 확대 사진",
      prompt: "이 나선형 껍데기를 남긴 바다 생물의 이름은 무엇일까요?",
      hint: "이미 멸종한 두족류로, 이름은 ‘암’으로 시작해요.",
      answers: ["암모나이트", "암모나이트 화석", "ammonite"],
      note: "암모나이트는 단단한 껍데기 속에 여러 개의 방이 있었어요."
    },
    {
      id: "iris", zone: "몸과 기술", title: "빛의 문지기",
      image: "./assets/iris.jpg", alt: "중심의 원을 둘러싼 파란 조직의 확대 사진",
      prompt: "눈에서 동공을 둘러싼 색깔 있는 부분은 무엇일까요?",
      hint: "이 부분의 근육이 동공 크기를 바꿔 들어오는 빛의 양을 조절해요.",
      answers: ["홍채", "iris"],
      note: "눈의 색은 홍채에 있는 색소의 양과 분포 등에 따라 달라져요."
    },
    {
      id: "circuit", zone: "몸과 기술", title: "초록 도시의 길",
      image: "./assets/circuit.jpg", alt: "초록 바탕의 금속 배선과 작은 부품 확대 사진",
      prompt: "전자 부품을 붙이고 전기적으로 연결한 이 판은 무엇일까요?",
      hint: "전자 장치 안에서 부품 사이를 잇는 길이 판에 새겨 있어요.",
      answers: ["인쇄회로기판", "회로기판", "회로판", "기판", "PCB"],
      note: "인쇄회로기판의 도전성 배선은 전자 부품을 연결해요."
    }
  ]
};