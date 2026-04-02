// 듣기 학습 데이터

export interface ListeningQuiz {
  id: string;
  transcript: string;
  translation: string;
  words: string[];
  correctOrder: string[];
  category: "daily" | "travel" | "business" | "social" | "weather" | "food";
  level: 1 | 2 | 3;
  hint?: string;
}

export const listeningData: ListeningQuiz[] = [
  // ==========================================
  // 초급 (Level 1) - 기본 문장
  // ==========================================
  // 일상 (daily)
  {
    id: "l001",
    transcript: "안녕하세요",
    translation: "Hello",
    words: ["안녕하세요"],
    correctOrder: ["안녕하세요"],
    category: "daily",
    level: 1,
  },
  {
    id: "l002",
    transcript: "감사합니다",
    translation: "Thank you",
    words: ["감사합니다"],
    correctOrder: ["감사합니다"],
    category: "daily",
    level: 1,
  },
  {
    id: "l003",
    transcript: "저는 학생이에요",
    translation: "I am a student",
    words: ["학생이에요", "저는"],
    correctOrder: ["저는", "학생이에요"],
    category: "daily",
    level: 1,
  },
  {
    id: "l004",
    transcript: "이름이 뭐예요",
    translation: "What is your name?",
    words: ["뭐예요", "이름이"],
    correctOrder: ["이름이", "뭐예요"],
    category: "daily",
    level: 1,
  },
  {
    id: "l005",
    transcript: "만나서 반가워요",
    translation: "Nice to meet you",
    words: ["반가워요", "만나서"],
    correctOrder: ["만나서", "반가워요"],
    category: "daily",
    level: 1,
  },
  {
    id: "l006",
    transcript: "내일 만나요",
    translation: "See you tomorrow",
    words: ["만나요", "내일"],
    correctOrder: ["내일", "만나요"],
    category: "daily",
    level: 1,
  },
  {
    id: "l007",
    transcript: "지금 몇 시예요",
    translation: "What time is it now?",
    words: ["몇", "지금", "시예요"],
    correctOrder: ["지금", "몇", "시예요"],
    category: "daily",
    level: 1,
  },
  {
    id: "l008",
    transcript: "오늘 뭐 해요",
    translation: "What are you doing today?",
    words: ["해요", "오늘", "뭐"],
    correctOrder: ["오늘", "뭐", "해요"],
    category: "daily",
    level: 1,
  },

  // 날씨 (weather)
  {
    id: "l009",
    transcript: "오늘 날씨가 좋아요",
    translation: "The weather is nice today",
    words: ["좋아요", "오늘", "날씨가"],
    correctOrder: ["오늘", "날씨가", "좋아요"],
    category: "weather",
    level: 1,
  },
  {
    id: "l010",
    transcript: "비가 와요",
    translation: "It's raining",
    words: ["와요", "비가"],
    correctOrder: ["비가", "와요"],
    category: "weather",
    level: 1,
  },
  {
    id: "l011",
    transcript: "오늘 너무 더워요",
    translation: "It's very hot today",
    words: ["더워요", "오늘", "너무"],
    correctOrder: ["오늘", "너무", "더워요"],
    category: "weather",
    level: 1,
  },
  {
    id: "l012",
    transcript: "바람이 불어요",
    translation: "It's windy",
    words: ["불어요", "바람이"],
    correctOrder: ["바람이", "불어요"],
    category: "weather",
    level: 1,
  },

  // 음식 (food)
  {
    id: "l013",
    transcript: "밥 먹었어요",
    translation: "Have you eaten?",
    words: ["먹었어요", "밥"],
    correctOrder: ["밥", "먹었어요"],
    category: "food",
    level: 1,
  },
  {
    id: "l014",
    transcript: "커피 한 잔 주세요",
    translation: "One cup of coffee, please",
    words: ["주세요", "커피", "잔", "한"],
    correctOrder: ["커피", "한", "잔", "주세요"],
    category: "food",
    level: 1,
  },
  {
    id: "l015",
    transcript: "이거 맛있어요",
    translation: "This is delicious",
    words: ["맛있어요", "이거"],
    correctOrder: ["이거", "맛있어요"],
    category: "food",
    level: 1,
  },
  {
    id: "l016",
    transcript: "물 좀 주세요",
    translation: "Please give me some water",
    words: ["주세요", "물", "좀"],
    correctOrder: ["물", "좀", "주세요"],
    category: "food",
    level: 1,
  },

  // 여행 (travel)
  {
    id: "l017",
    transcript: "이거 얼마예요",
    translation: "How much is this?",
    words: ["얼마예요", "이거"],
    correctOrder: ["이거", "얼마예요"],
    category: "travel",
    level: 1,
  },
  {
    id: "l018",
    transcript: "화장실 어디예요",
    translation: "Where is the bathroom?",
    words: ["어디예요", "화장실"],
    correctOrder: ["화장실", "어디예요"],
    category: "travel",
    level: 1,
  },
  {
    id: "l019",
    transcript: "여기서 가까워요",
    translation: "It's close from here",
    words: ["가까워요", "여기서"],
    correctOrder: ["여기서", "가까워요"],
    category: "travel",
    level: 1,
  },
  {
    id: "l020",
    transcript: "택시 타고 가요",
    translation: "Let's go by taxi",
    words: ["가요", "택시", "타고"],
    correctOrder: ["택시", "타고", "가요"],
    category: "travel",
    level: 1,
  },

  // ==========================================
  // 중급 (Level 2) - 복잡한 문장
  // ==========================================
  // 일상 (daily)
  {
    id: "l021",
    transcript: "한국어를 공부하고 있어요",
    translation: "I'm studying Korean",
    words: ["있어요", "한국어를", "공부하고"],
    correctOrder: ["한국어를", "공부하고", "있어요"],
    category: "daily",
    level: 2,
  },
  {
    id: "l022",
    transcript: "주말에 뭐 할 거예요",
    translation: "What will you do on the weekend?",
    words: ["할", "주말에", "거예요", "뭐"],
    correctOrder: ["주말에", "뭐", "할", "거예요"],
    category: "daily",
    level: 2,
  },
  {
    id: "l023",
    transcript: "요즘 바빠서 연락을 못 했어요",
    translation: "I was too busy to contact you lately",
    words: ["못", "요즘", "연락을", "바빠서", "했어요"],
    correctOrder: ["요즘", "바빠서", "연락을", "못", "했어요"],
    category: "daily",
    level: 2,
  },
  {
    id: "l024",
    transcript: "어제 친구를 만났어요",
    translation: "I met a friend yesterday",
    words: ["만났어요", "어제", "친구를"],
    correctOrder: ["어제", "친구를", "만났어요"],
    category: "daily",
    level: 2,
  },
  {
    id: "l025",
    transcript: "집에서 쉬고 싶어요",
    translation: "I want to rest at home",
    words: ["싶어요", "집에서", "쉬고"],
    correctOrder: ["집에서", "쉬고", "싶어요"],
    category: "daily",
    level: 2,
  },
  {
    id: "l026",
    transcript: "일찍 일어나야 해요",
    translation: "I have to wake up early",
    words: ["해요", "일찍", "일어나야"],
    correctOrder: ["일찍", "일어나야", "해요"],
    category: "daily",
    level: 2,
  },

  // 음식 (food)
  {
    id: "l027",
    transcript: "불고기가 제일 맛있어요",
    translation: "Bulgogi is the most delicious",
    words: ["맛있어요", "불고기가", "제일"],
    correctOrder: ["불고기가", "제일", "맛있어요"],
    category: "food",
    level: 2,
  },
  {
    id: "l028",
    transcript: "매운 음식을 잘 못 먹어요",
    translation: "I can't eat spicy food well",
    words: ["먹어요", "매운", "음식을", "못", "잘"],
    correctOrder: ["매운", "음식을", "잘", "못", "먹어요"],
    category: "food",
    level: 2,
  },
  {
    id: "l029",
    transcript: "계산서 주세요",
    translation: "Please give me the bill",
    words: ["주세요", "계산서"],
    correctOrder: ["계산서", "주세요"],
    category: "food",
    level: 2,
  },
  {
    id: "l030",
    transcript: "포장해 주세요",
    translation: "Please pack it to go",
    words: ["주세요", "포장해"],
    correctOrder: ["포장해", "주세요"],
    category: "food",
    level: 2,
  },

  // 여행 (travel)
  {
    id: "l031",
    transcript: "공항까지 어떻게 가요",
    translation: "How do I get to the airport?",
    words: ["가요", "공항까지", "어떻게"],
    correctOrder: ["공항까지", "어떻게", "가요"],
    category: "travel",
    level: 2,
  },
  {
    id: "l032",
    transcript: "여기서 얼마나 걸려요",
    translation: "How long does it take from here?",
    words: ["걸려요", "여기서", "얼마나"],
    correctOrder: ["여기서", "얼마나", "걸려요"],
    category: "travel",
    level: 2,
  },
  {
    id: "l033",
    transcript: "지하철로 세 정거장이에요",
    translation: "It's three stops by subway",
    words: ["정거장이에요", "지하철로", "세"],
    correctOrder: ["지하철로", "세", "정거장이에요"],
    category: "travel",
    level: 2,
  },
  {
    id: "l034",
    transcript: "표 두 장 주세요",
    translation: "Two tickets, please",
    words: ["주세요", "표", "장", "두"],
    correctOrder: ["표", "두", "장", "주세요"],
    category: "travel",
    level: 2,
  },
  {
    id: "l035",
    transcript: "여권을 보여 주세요",
    translation: "Please show me your passport",
    words: ["주세요", "여권을", "보여"],
    correctOrder: ["여권을", "보여", "주세요"],
    category: "travel",
    level: 2,
  },

  // 비즈니스 (business)
  {
    id: "l036",
    transcript: "회의가 몇 시에 있어요",
    translation: "What time is the meeting?",
    words: ["있어요", "회의가", "시에", "몇"],
    correctOrder: ["회의가", "몇", "시에", "있어요"],
    category: "business",
    level: 2,
  },
  {
    id: "l037",
    transcript: "이메일 보내 주세요",
    translation: "Please send me an email",
    words: ["주세요", "이메일", "보내"],
    correctOrder: ["이메일", "보내", "주세요"],
    category: "business",
    level: 2,
  },
  {
    id: "l038",
    transcript: "내일까지 끝내야 해요",
    translation: "I have to finish it by tomorrow",
    words: ["해요", "내일까지", "끝내야"],
    correctOrder: ["내일까지", "끝내야", "해요"],
    category: "business",
    level: 2,
  },

  // 소셜 (social)
  {
    id: "l039",
    transcript: "주말에 같이 영화 볼래요",
    translation: "Want to watch a movie together on the weekend?",
    words: ["볼래요", "주말에", "영화", "같이"],
    correctOrder: ["주말에", "같이", "영화", "볼래요"],
    category: "social",
    level: 2,
  },
  {
    id: "l040",
    transcript: "생일 축하해요",
    translation: "Happy birthday",
    words: ["축하해요", "생일"],
    correctOrder: ["생일", "축하해요"],
    category: "social",
    level: 2,
  },

  // ==========================================
  // 고급 (Level 3) - 긴 문장
  // ==========================================
  // 일상 (daily)
  {
    id: "l041",
    transcript: "한국에 온 지 1년이 됐어요",
    translation: "It's been a year since I came to Korea",
    words: ["됐어요", "한국에", "지", "1년이", "온"],
    correctOrder: ["한국에", "온", "지", "1년이", "됐어요"],
    category: "daily",
    level: 3,
  },
  {
    id: "l042",
    transcript: "시간이 있으면 같이 저녁 먹을까요",
    translation: "If you have time, shall we have dinner together?",
    words: ["먹을까요", "시간이", "같이", "있으면", "저녁"],
    correctOrder: ["시간이", "있으면", "같이", "저녁", "먹을까요"],
    category: "daily",
    level: 3,
  },
  {
    id: "l043",
    transcript: "한국어를 배운 지 얼마나 됐어요",
    translation: "How long have you been learning Korean?",
    words: ["됐어요", "한국어를", "얼마나", "지", "배운"],
    correctOrder: ["한국어를", "배운", "지", "얼마나", "됐어요"],
    category: "daily",
    level: 3,
  },
  {
    id: "l044",
    transcript: "아직 결정을 못 했어요",
    translation: "I haven't decided yet",
    words: ["했어요", "아직", "못", "결정을"],
    correctOrder: ["아직", "결정을", "못", "했어요"],
    category: "daily",
    level: 3,
  },

  // 비즈니스 (business)
  {
    id: "l045",
    transcript: "검토 후에 연락드리겠습니다",
    translation: "I will contact you after reviewing",
    words: ["연락드리겠습니다", "검토", "후에"],
    correctOrder: ["검토", "후에", "연락드리겠습니다"],
    category: "business",
    level: 3,
  },
  {
    id: "l046",
    transcript: "이번 프로젝트는 언제 끝나요",
    translation: "When does this project end?",
    words: ["끝나요", "이번", "언제", "프로젝트는"],
    correctOrder: ["이번", "프로젝트는", "언제", "끝나요"],
    category: "business",
    level: 3,
  },
  {
    id: "l047",
    transcript: "회의 일정을 조율해야 할 것 같아요",
    translation: "I think we need to coordinate the meeting schedule",
    words: ["같아요", "회의", "조율해야", "것", "일정을", "할"],
    correctOrder: ["회의", "일정을", "조율해야", "할", "것", "같아요"],
    category: "business",
    level: 3,
  },
  {
    id: "l048",
    transcript: "다음 주에 출장을 가야 해요",
    translation: "I have to go on a business trip next week",
    words: ["해요", "다음", "출장을", "주에", "가야"],
    correctOrder: ["다음", "주에", "출장을", "가야", "해요"],
    category: "business",
    level: 3,
  },

  // 여행 (travel)
  {
    id: "l049",
    transcript: "환전은 어디서 할 수 있어요",
    translation: "Where can I exchange currency?",
    words: ["있어요", "환전은", "수", "어디서", "할"],
    correctOrder: ["환전은", "어디서", "할", "수", "있어요"],
    category: "travel",
    level: 3,
  },
  {
    id: "l050",
    transcript: "방을 하나 예약하고 싶어요",
    translation: "I'd like to book a room",
    words: ["싶어요", "방을", "예약하고", "하나"],
    correctOrder: ["방을", "하나", "예약하고", "싶어요"],
    category: "travel",
    level: 3,
  },

  // 소셜 (social)
  {
    id: "l051",
    transcript: "오랜만에 만나서 반가워요",
    translation: "Nice to see you after a long time",
    words: ["반가워요", "오랜만에", "만나서"],
    correctOrder: ["오랜만에", "만나서", "반가워요"],
    category: "social",
    level: 3,
  },
  {
    id: "l052",
    transcript: "이번 주말에 파티가 있는데 올 수 있어요",
    translation: "There's a party this weekend, can you come?",
    words: ["있어요", "이번", "있는데", "수", "파티가", "주말에", "올"],
    correctOrder: ["이번", "주말에", "파티가", "있는데", "올", "수", "있어요"],
    category: "social",
    level: 3,
  },

  // 음식 (food)
  {
    id: "l053",
    transcript: "추천하는 메뉴가 있어요",
    translation: "Is there a menu you recommend?",
    words: ["있어요", "추천하는", "메뉴가"],
    correctOrder: ["추천하는", "메뉴가", "있어요"],
    category: "food",
    level: 3,
  },
  {
    id: "l054",
    transcript: "이 식당은 예약을 해야 해요",
    translation: "You need a reservation for this restaurant",
    words: ["해요", "이", "예약을", "식당은", "해야"],
    correctOrder: ["이", "식당은", "예약을", "해야", "해요"],
    category: "food",
    level: 3,
  },

  // 날씨 (weather)
  {
    id: "l055",
    transcript: "내일부터 날씨가 추워진대요",
    translation: "They say the weather will get cold from tomorrow",
    words: ["추워진대요", "내일부터", "날씨가"],
    correctOrder: ["내일부터", "날씨가", "추워진대요"],
    category: "weather",
    level: 3,
  },
  {
    id: "l056",
    transcript: "우산을 가져가는 게 좋겠어요",
    translation: "It would be good to take an umbrella",
    words: ["좋겠어요", "우산을", "게", "가져가는"],
    correctOrder: ["우산을", "가져가는", "게", "좋겠어요"],
    category: "weather",
    level: 3,
  },
];

// 카테고리 목록
export const listeningCategories = [
  { id: "all", name: "전체", icon: "🎧" },
  { id: "daily", name: "일상", icon: "🏠" },
  { id: "weather", name: "날씨", icon: "🌤️" },
  { id: "food", name: "음식", icon: "🍽️" },
  { id: "travel", name: "여행", icon: "✈️" },
  { id: "business", name: "비즈니스", icon: "💼" },
  { id: "social", name: "소셜", icon: "👥" },
];

// 난이도별 데이터 가져오기
export function getListeningByLevel(level: number): ListeningQuiz[] {
  return listeningData.filter((item) => item.level === level);
}

// 카테고리별 데이터 가져오기
export function getListeningByCategory(category: string): ListeningQuiz[] {
  if (category === "all") return listeningData;
  return listeningData.filter((item) => item.category === category);
}

// 랜덤 듣기 문제 가져오기 (레벨별)
export function getRandomListening(count: number, level?: number): ListeningQuiz[] {
  let data = level ? getListeningByLevel(level) : listeningData;
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 레벨 이름 가져오기
export function getLevelName(level: number): string {
  switch (level) {
    case 1:
      return "초급";
    case 2:
      return "중급";
    case 3:
      return "고급";
    default:
      return "초급";
  }
}
