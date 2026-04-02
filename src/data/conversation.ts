// 회화 시나리오 데이터
import { Coffee, ShoppingCart, Building2, Users, Plane, Utensils, Car, Hotel, Hospital, Scissors, Phone, CreditCard, Train, MapPin, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ConversationSentence {
  english: string;
  korean: string;
  words: string[];
  notes?: string; // 문화적 설명이나 팁
}

export interface ConversationScenario {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: "daily" | "travel" | "business" | "social";
  level: 1 | 2 | 3;
  gradient: string;
  sentences: ConversationSentence[];
  keyExpressions?: {
    korean: string;
    english: string;
    usage: string;
  }[];
  culturalNotes?: string;
}

export const conversationScenarios: ConversationScenario[] = [
  // ==========================================
  // 일상생활 (Daily Life) - 6개
  // ==========================================
  {
    id: "cafe",
    icon: Coffee,
    title: "카페에서 주문하기",
    description: "음료 주문, 결제, 포장/매장 표현",
    category: "daily",
    level: 1,
    gradient: "from-amber-500 to-orange-500",
    sentences: [
      {
        english: "Hello, what would you like to order?",
        korean: "안녕하세요 주문하시겠어요",
        words: ["안녕하세요", "주문하시겠어요"],
      },
      {
        english: "I'd like an iced Americano, please.",
        korean: "아이스 아메리카노 주세요",
        words: ["주세요", "아이스", "아메리카노"],
      },
      {
        english: "What size would you like?",
        korean: "사이즈는 어떻게 하시겠어요",
        words: ["사이즈는", "어떻게", "하시겠어요"],
      },
      {
        english: "Large, please.",
        korean: "큰 걸로 주세요",
        words: ["주세요", "큰", "걸로"],
      },
      {
        english: "For here or to go?",
        korean: "매장에서 드시나요 테이크아웃이에요",
        words: ["매장에서", "드시나요", "테이크아웃이에요"],
      },
      {
        english: "For here, please.",
        korean: "여기서 먹을게요",
        words: ["먹을게요", "여기서"],
      },
      {
        english: "Would you like anything else?",
        korean: "다른 건 필요 없으세요",
        words: ["다른", "건", "필요", "없으세요"],
      },
      {
        english: "Can I also get a piece of cake?",
        korean: "케이크도 하나 주세요",
        words: ["케이크도", "하나", "주세요"],
      },
      {
        english: "That will be 7,500 won.",
        korean: "칠천오백 원입니다",
        words: ["칠천오백", "원입니다"],
      },
      {
        english: "Can I pay by card?",
        korean: "카드로 계산할게요",
        words: ["계산할게요", "카드로"],
      },
    ],
    keyExpressions: [
      { korean: "주세요", english: "please give me", usage: "요청할 때 사용" },
      { korean: "~로 할게요", english: "I'll have ~", usage: "선택할 때 사용" },
    ],
    culturalNotes: "한국 카페에서는 진동벨을 받아 음료가 준비되면 직접 가져가는 경우가 많습니다.",
  },
  {
    id: "shopping",
    icon: ShoppingCart,
    title: "마트에서 장보기",
    description: "가격 묻기, 계산, 봉투 요청",
    category: "daily",
    level: 1,
    gradient: "from-emerald-500 to-teal-500",
    sentences: [
      {
        english: "Excuse me, where is the milk?",
        korean: "저기요 우유 어디 있어요",
        words: ["저기요", "우유", "어디", "있어요"],
      },
      {
        english: "It's in aisle 3.",
        korean: "3번 통로에 있어요",
        words: ["3번", "통로에", "있어요"],
      },
      {
        english: "How much is this?",
        korean: "이거 얼마예요",
        words: ["얼마예요", "이거"],
      },
      {
        english: "It's 5,000 won.",
        korean: "오천 원이에요",
        words: ["원이에요", "오천"],
      },
      {
        english: "Is this on sale?",
        korean: "이거 할인 중이에요",
        words: ["이거", "할인", "중이에요"],
      },
      {
        english: "Yes, it's 20% off.",
        korean: "네 20퍼센트 할인이에요",
        words: ["네", "20퍼센트", "할인이에요"],
      },
      {
        english: "Do you need a bag?",
        korean: "봉투 필요하세요",
        words: ["필요하세요", "봉투"],
      },
      {
        english: "Yes, please.",
        korean: "네 주세요",
        words: ["주세요", "네"],
      },
      {
        english: "The total is 25,000 won.",
        korean: "전부 이만오천 원이에요",
        words: ["전부", "이만오천", "원이에요"],
      },
      {
        english: "Here's your receipt.",
        korean: "영수증 여기 있습니다",
        words: ["영수증", "여기", "있습니다"],
      },
    ],
    keyExpressions: [
      { korean: "얼마예요?", english: "How much is it?", usage: "가격을 물을 때" },
      { korean: "필요하세요?", english: "Do you need?", usage: "필요한지 물을 때" },
    ],
    culturalNotes: "한국에서는 비닐봉투가 유료입니다. 환경을 위해 장바구니를 가져가는 것이 좋습니다.",
  },
  {
    id: "restaurant",
    icon: Utensils,
    title: "식당에서 주문하기",
    description: "메뉴 주문, 추가 요청, 계산",
    category: "daily",
    level: 1,
    gradient: "from-red-500 to-pink-500",
    sentences: [
      {
        english: "How many people?",
        korean: "몇 분이세요",
        words: ["몇", "분이세요"],
      },
      {
        english: "Two people.",
        korean: "두 명이요",
        words: ["두", "명이요"],
      },
      {
        english: "What would you like to order?",
        korean: "주문하시겠어요",
        words: ["주문하시겠어요"],
      },
      {
        english: "I'll have bibimbap, please.",
        korean: "비빔밥 하나 주세요",
        words: ["비빔밥", "하나", "주세요"],
      },
      {
        english: "Would you like it spicy?",
        korean: "맵게 해드릴까요",
        words: ["맵게", "해드릴까요"],
      },
      {
        english: "Not too spicy, please.",
        korean: "조금만 맵게 해주세요",
        words: ["조금만", "맵게", "해주세요"],
      },
      {
        english: "Can I get some more water?",
        korean: "물 좀 더 주세요",
        words: ["물", "좀", "더", "주세요"],
      },
      {
        english: "The food is really delicious.",
        korean: "음식이 정말 맛있어요",
        words: ["음식이", "정말", "맛있어요"],
      },
      {
        english: "Can I have the bill, please?",
        korean: "계산서 주세요",
        words: ["계산서", "주세요"],
      },
      {
        english: "We'll pay together.",
        korean: "같이 계산할게요",
        words: ["같이", "계산할게요"],
      },
    ],
    keyExpressions: [
      { korean: "~주세요", english: "Please give me ~", usage: "요청할 때" },
      { korean: "~해드릴까요?", english: "Shall I do ~ for you?", usage: "제안할 때" },
    ],
    culturalNotes: "한국 식당에서는 반찬이 무료로 제공되며 리필도 가능합니다.",
  },
  {
    id: "hospital",
    icon: Hospital,
    title: "병원에서 진료받기",
    description: "증상 설명, 진료 예약, 처방",
    category: "daily",
    level: 2,
    gradient: "from-sky-500 to-blue-500",
    sentences: [
      {
        english: "I'd like to make an appointment.",
        korean: "예약하고 싶어요",
        words: ["예약하고", "싶어요"],
      },
      {
        english: "What seems to be the problem?",
        korean: "어디가 아프세요",
        words: ["어디가", "아프세요"],
      },
      {
        english: "I have a headache.",
        korean: "머리가 아파요",
        words: ["머리가", "아파요"],
      },
      {
        english: "Since when?",
        korean: "언제부터 아프셨어요",
        words: ["언제부터", "아프셨어요"],
      },
      {
        english: "Since yesterday.",
        korean: "어제부터요",
        words: ["어제부터요"],
      },
      {
        english: "Do you have any other symptoms?",
        korean: "다른 증상은 없으세요",
        words: ["다른", "증상은", "없으세요"],
      },
      {
        english: "I also have a fever.",
        korean: "열도 좀 있어요",
        words: ["열도", "좀", "있어요"],
      },
      {
        english: "I'll prescribe some medicine.",
        korean: "약을 처방해 드릴게요",
        words: ["약을", "처방해", "드릴게요"],
      },
      {
        english: "Take this medicine three times a day.",
        korean: "하루에 세 번 드세요",
        words: ["하루에", "세", "번", "드세요"],
      },
      {
        english: "Get some rest and come back if it doesn't get better.",
        korean: "푹 쉬시고 안 나으시면 다시 오세요",
        words: ["푹", "쉬시고", "안", "나으시면", "다시", "오세요"],
      },
    ],
    keyExpressions: [
      { korean: "~이/가 아파요", english: "~ hurts", usage: "통증 표현" },
      { korean: "~부터", english: "since ~", usage: "시작 시점 표현" },
    ],
    culturalNotes: "한국에서는 처방전을 받아 약국에서 약을 구매합니다. 병원과 약국이 분리되어 있습니다.",
  },
  {
    id: "hairsalon",
    icon: Scissors,
    title: "미용실에서",
    description: "스타일 설명, 요청사항",
    category: "daily",
    level: 2,
    gradient: "from-violet-500 to-purple-500",
    sentences: [
      {
        english: "Do you have an appointment?",
        korean: "예약하셨어요",
        words: ["예약하셨어요"],
      },
      {
        english: "Yes, I made a reservation for 2 o'clock.",
        korean: "네 2시에 예약했어요",
        words: ["네", "2시에", "예약했어요"],
      },
      {
        english: "How would you like your hair done?",
        korean: "어떻게 해드릴까요",
        words: ["어떻게", "해드릴까요"],
      },
      {
        english: "Just a trim, please.",
        korean: "다듬기만 해주세요",
        words: ["다듬기만", "해주세요"],
      },
      {
        english: "How much should I cut?",
        korean: "얼마나 자를까요",
        words: ["얼마나", "자를까요"],
      },
      {
        english: "About 2 centimeters.",
        korean: "2센티 정도요",
        words: ["2센티", "정도요"],
      },
      {
        english: "Would you like to dye your hair?",
        korean: "염색도 하시겠어요",
        words: ["염색도", "하시겠어요"],
      },
      {
        english: "No, just cutting is fine.",
        korean: "아니요 커트만 할게요",
        words: ["아니요", "커트만", "할게요"],
      },
      {
        english: "How do you like it?",
        korean: "마음에 드세요",
        words: ["마음에", "드세요"],
      },
      {
        english: "It looks great, thank you.",
        korean: "좋아요 감사합니다",
        words: ["좋아요", "감사합니다"],
      },
    ],
    keyExpressions: [
      { korean: "~해주세요", english: "Please do ~", usage: "요청할 때" },
      { korean: "마음에 드세요?", english: "Do you like it?", usage: "만족 확인" },
    ],
    culturalNotes: "한국 미용실에서는 커트 후 샴푸와 드라이 서비스가 포함되어 있는 경우가 많습니다.",
  },
  {
    id: "bank",
    icon: CreditCard,
    title: "은행에서",
    description: "계좌 개설, 송금, 환전",
    category: "daily",
    level: 2,
    gradient: "from-slate-500 to-gray-600",
    sentences: [
      {
        english: "I'd like to open an account.",
        korean: "계좌를 개설하고 싶어요",
        words: ["계좌를", "개설하고", "싶어요"],
      },
      {
        english: "Please fill out this form.",
        korean: "이 서류를 작성해 주세요",
        words: ["이", "서류를", "작성해", "주세요"],
      },
      {
        english: "I need your ID card.",
        korean: "신분증이 필요해요",
        words: ["신분증이", "필요해요"],
      },
      {
        english: "Here you go.",
        korean: "여기 있어요",
        words: ["여기", "있어요"],
      },
      {
        english: "I'd like to transfer money.",
        korean: "송금하고 싶어요",
        words: ["송금하고", "싶어요"],
      },
      {
        english: "How much would you like to send?",
        korean: "얼마 보내실 거예요",
        words: ["얼마", "보내실", "거예요"],
      },
      {
        english: "500,000 won.",
        korean: "오십만 원이요",
        words: ["오십만", "원이요"],
      },
      {
        english: "What's the recipient's account number?",
        korean: "받는 분 계좌번호가 어떻게 되세요",
        words: ["받는", "분", "계좌번호가", "어떻게", "되세요"],
      },
      {
        english: "The transfer is complete.",
        korean: "송금이 완료됐습니다",
        words: ["송금이", "완료됐습니다"],
      },
      {
        english: "Thank you for your help.",
        korean: "도와주셔서 감사합니다",
        words: ["도와주셔서", "감사합니다"],
      },
    ],
    keyExpressions: [
      { korean: "~하고 싶어요", english: "I want to ~", usage: "희망 표현" },
      { korean: "어떻게 되세요?", english: "What is your ~?", usage: "정보 요청" },
    ],
    culturalNotes: "한국에서 계좌 개설 시 외국인은 외국인등록증이 필요합니다.",
  },

  // ==========================================
  // 여행 (Travel) - 5개
  // ==========================================
  {
    id: "airport",
    icon: Plane,
    title: "공항에서",
    description: "체크인, 탑승, 입국심사",
    category: "travel",
    level: 2,
    gradient: "from-cyan-500 to-blue-500",
    sentences: [
      {
        english: "I'd like to check in.",
        korean: "체크인하고 싶어요",
        words: ["체크인하고", "싶어요"],
      },
      {
        english: "May I see your passport?",
        korean: "여권 보여주세요",
        words: ["여권", "보여주세요"],
      },
      {
        english: "Here's my passport.",
        korean: "여기 여권이요",
        words: ["여기", "여권이요"],
      },
      {
        english: "Would you like a window or aisle seat?",
        korean: "창가석과 복도석 중 어디가 좋으세요",
        words: ["창가석과", "복도석", "중", "어디가", "좋으세요"],
      },
      {
        english: "Window seat, please.",
        korean: "창가석으로 주세요",
        words: ["창가석으로", "주세요"],
      },
      {
        english: "How many bags are you checking?",
        korean: "수하물은 몇 개예요",
        words: ["수하물은", "몇", "개예요"],
      },
      {
        english: "Two bags.",
        korean: "두 개요",
        words: ["두", "개요"],
      },
      {
        english: "Your gate is B12.",
        korean: "탑승구는 B12입니다",
        words: ["탑승구는", "B12입니다"],
      },
      {
        english: "What is the purpose of your visit?",
        korean: "방문 목적이 뭐예요",
        words: ["뭐예요", "방문", "목적이"],
      },
      {
        english: "I'm here for sightseeing.",
        korean: "관광하러 왔어요",
        words: ["관광하러", "왔어요"],
      },
    ],
    keyExpressions: [
      { korean: "~으로 주세요", english: "~ please", usage: "선택할 때" },
      { korean: "~하러 왔어요", english: "I came to ~", usage: "목적 설명" },
    ],
    culturalNotes: "인천공항은 세계 최고의 공항 중 하나로 다양한 편의시설이 있습니다.",
  },
  {
    id: "hotel",
    icon: Hotel,
    title: "호텔 체크인",
    description: "예약 확인, 체크인/아웃, 요청",
    category: "travel",
    level: 2,
    gradient: "from-indigo-500 to-violet-500",
    sentences: [
      {
        english: "I have a reservation.",
        korean: "예약했어요",
        words: ["예약했어요"],
      },
      {
        english: "What name is the reservation under?",
        korean: "성함이 어떻게 되세요",
        words: ["성함이", "어떻게", "되세요"],
      },
      {
        english: "It's under Kim.",
        korean: "김이에요",
        words: ["김이에요"],
      },
      {
        english: "Your room is on the 10th floor.",
        korean: "방은 10층에 있습니다",
        words: ["방은", "10층에", "있습니다"],
      },
      {
        english: "Here's your room key.",
        korean: "방 열쇠 여기 있습니다",
        words: ["방", "열쇠", "여기", "있습니다"],
      },
      {
        english: "What time is check-out?",
        korean: "체크아웃 몇 시예요",
        words: ["체크아웃", "몇", "시예요"],
      },
      {
        english: "Check-out is at 11 AM.",
        korean: "오전 11시입니다",
        words: ["오전", "11시입니다"],
      },
      {
        english: "Is breakfast included?",
        korean: "아침 식사 포함이에요",
        words: ["아침", "식사", "포함이에요"],
      },
      {
        english: "Yes, it's served from 7 to 10 AM.",
        korean: "네 7시부터 10시까지예요",
        words: ["네", "7시부터", "10시까지예요"],
      },
      {
        english: "Can I have a late check-out?",
        korean: "늦게 체크아웃해도 될까요",
        words: ["늦게", "체크아웃해도", "될까요"],
      },
    ],
    keyExpressions: [
      { korean: "~해도 될까요?", english: "May I ~?", usage: "허락 구할 때" },
      { korean: "~부터 ~까지", english: "from ~ to ~", usage: "시간 범위" },
    ],
    culturalNotes: "한국 호텔에서는 대부분 슬리퍼와 칫솔 등 기본 어메니티가 제공됩니다.",
  },
  {
    id: "taxi",
    icon: Car,
    title: "택시 타기",
    description: "목적지 말하기, 요금, 결제",
    category: "travel",
    level: 1,
    gradient: "from-yellow-500 to-amber-500",
    sentences: [
      {
        english: "Where would you like to go?",
        korean: "어디로 가실 거예요",
        words: ["어디로", "가실", "거예요"],
      },
      {
        english: "Please take me to Seoul Station.",
        korean: "서울역으로 가주세요",
        words: ["서울역으로", "가주세요"],
      },
      {
        english: "How long will it take?",
        korean: "얼마나 걸려요",
        words: ["얼마나", "걸려요"],
      },
      {
        english: "About 20 minutes.",
        korean: "20분 정도요",
        words: ["20분", "정도요"],
      },
      {
        english: "Please go straight.",
        korean: "직진해 주세요",
        words: ["직진해", "주세요"],
      },
      {
        english: "Please turn right here.",
        korean: "여기서 우회전해 주세요",
        words: ["여기서", "우회전해", "주세요"],
      },
      {
        english: "Please stop here.",
        korean: "여기서 세워주세요",
        words: ["여기서", "세워주세요"],
      },
      {
        english: "How much is it?",
        korean: "얼마예요",
        words: ["얼마예요"],
      },
      {
        english: "It's 15,000 won.",
        korean: "만오천 원이요",
        words: ["만오천", "원이요"],
      },
      {
        english: "Can I pay by card?",
        korean: "카드로 결제돼요",
        words: ["카드로", "결제돼요"],
      },
    ],
    keyExpressions: [
      { korean: "~로 가주세요", english: "Please take me to ~", usage: "목적지 말할 때" },
      { korean: "여기서 ~해 주세요", english: "Please ~ here", usage: "위치 지정" },
    ],
    culturalNotes: "한국 택시는 대부분 카드 결제가 가능하며, 앱으로도 호출할 수 있습니다.",
  },
  {
    id: "train",
    icon: Train,
    title: "기차표 예매하기",
    description: "시간표 확인, 표 구매, 좌석 선택",
    category: "travel",
    level: 2,
    gradient: "from-teal-500 to-emerald-500",
    sentences: [
      {
        english: "I'd like to buy a train ticket.",
        korean: "기차표 사고 싶어요",
        words: ["기차표", "사고", "싶어요"],
      },
      {
        english: "Where are you going?",
        korean: "어디로 가세요",
        words: ["어디로", "가세요"],
      },
      {
        english: "I'm going to Busan.",
        korean: "부산으로 가요",
        words: ["부산으로", "가요"],
      },
      {
        english: "When would you like to leave?",
        korean: "언제 출발하실 거예요",
        words: ["언제", "출발하실", "거예요"],
      },
      {
        english: "Tomorrow morning.",
        korean: "내일 아침이요",
        words: ["내일", "아침이요"],
      },
      {
        english: "There's a train at 9 AM.",
        korean: "오전 9시에 있어요",
        words: ["오전", "9시에", "있어요"],
      },
      {
        english: "I'll take that one.",
        korean: "그걸로 할게요",
        words: ["그걸로", "할게요"],
      },
      {
        english: "Would you like a window seat?",
        korean: "창가석 드릴까요",
        words: ["창가석", "드릴까요"],
      },
      {
        english: "Yes, please.",
        korean: "네 부탁드려요",
        words: ["네", "부탁드려요"],
      },
      {
        english: "The total is 59,000 won.",
        korean: "오만구천 원입니다",
        words: ["오만구천", "원입니다"],
      },
    ],
    keyExpressions: [
      { korean: "~로 가요", english: "I'm going to ~", usage: "목적지 말할 때" },
      { korean: "그걸로 할게요", english: "I'll take that", usage: "선택할 때" },
    ],
    culturalNotes: "KTX는 한국의 고속철도로 서울에서 부산까지 약 2시간 30분이 걸립니다.",
  },
  {
    id: "directions",
    icon: MapPin,
    title: "길 묻기",
    description: "위치 확인, 방향 안내",
    category: "travel",
    level: 1,
    gradient: "from-rose-500 to-red-500",
    sentences: [
      {
        english: "Excuse me, where is the subway station?",
        korean: "저기요 지하철역 어디예요",
        words: ["저기요", "지하철역", "어디예요"],
      },
      {
        english: "Go straight for about 100 meters.",
        korean: "100미터 정도 직진하세요",
        words: ["100미터", "정도", "직진하세요"],
      },
      {
        english: "Then turn left.",
        korean: "그리고 왼쪽으로 가세요",
        words: ["그리고", "왼쪽으로", "가세요"],
      },
      {
        english: "Is it far from here?",
        korean: "여기서 멀어요",
        words: ["여기서", "멀어요"],
      },
      {
        english: "No, it's about 5 minutes on foot.",
        korean: "아니요 걸어서 5분 정도예요",
        words: ["아니요", "걸어서", "5분", "정도예요"],
      },
      {
        english: "Can you show me on the map?",
        korean: "지도에서 보여주실 수 있어요",
        words: ["지도에서", "보여주실", "수", "있어요"],
      },
      {
        english: "It's right next to the convenience store.",
        korean: "편의점 바로 옆이에요",
        words: ["편의점", "바로", "옆이에요"],
      },
      {
        english: "Thank you so much.",
        korean: "정말 감사합니다",
        words: ["정말", "감사합니다"],
      },
    ],
    keyExpressions: [
      { korean: "어디예요?", english: "Where is ~?", usage: "위치 물을 때" },
      { korean: "걸어서 ~", english: "~ on foot", usage: "도보 시간" },
    ],
    culturalNotes: "네이버 지도나 카카오맵 앱을 사용하면 한국에서 길 찾기가 편리합니다.",
  },

  // ==========================================
  // 비즈니스 (Business) - 2개
  // ==========================================
  {
    id: "office",
    icon: Building2,
    title: "회사에서 회의하기",
    description: "일정 조율, 의견 제시, 마무리",
    category: "business",
    level: 3,
    gradient: "from-blue-500 to-indigo-500",
    sentences: [
      {
        english: "Let's start the meeting.",
        korean: "회의를 시작하겠습니다",
        words: ["회의를", "시작하겠습니다"],
      },
      {
        english: "What's on the agenda today?",
        korean: "오늘 안건이 뭐예요",
        words: ["오늘", "안건이", "뭐예요"],
      },
      {
        english: "We need to adjust the schedule.",
        korean: "일정 조율이 필요합니다",
        words: ["필요합니다", "일정", "조율이"],
      },
      {
        english: "What do you think about this?",
        korean: "이것에 대해 어떻게 생각하세요",
        words: ["이것에", "대해", "어떻게", "생각하세요"],
      },
      {
        english: "I agree with that opinion.",
        korean: "그 의견에 동의합니다",
        words: ["그", "의견에", "동의합니다"],
      },
      {
        english: "I have a different opinion.",
        korean: "저는 다른 의견이 있습니다",
        words: ["저는", "다른", "의견이", "있습니다"],
      },
      {
        english: "Let me explain in more detail.",
        korean: "더 자세히 설명하겠습니다",
        words: ["더", "자세히", "설명하겠습니다"],
      },
      {
        english: "I'll review it and get back to you.",
        korean: "검토 후 말씀드리겠습니다",
        words: ["말씀드리겠습니다", "검토", "후"],
      },
      {
        english: "When is the deadline?",
        korean: "마감이 언제예요",
        words: ["마감이", "언제예요"],
      },
      {
        english: "Let's wrap up the meeting.",
        korean: "회의를 마무리하겠습니다",
        words: ["마무리하겠습니다", "회의를"],
      },
    ],
    keyExpressions: [
      { korean: "~겠습니다", english: "I will ~", usage: "의지/계획 표현 (격식체)" },
      { korean: "~에 대해", english: "about ~", usage: "주제 언급" },
    ],
    culturalNotes: "한국 회사에서는 상사에게 격식체(-습니다)를 사용하는 것이 일반적입니다.",
  },
  {
    id: "phonecall",
    icon: Phone,
    title: "전화 받기/걸기",
    description: "전화 응대, 메시지 남기기",
    category: "business",
    level: 2,
    gradient: "from-green-500 to-emerald-500",
    sentences: [
      {
        english: "Hello, this is ABC Company.",
        korean: "안녕하세요 ABC 회사입니다",
        words: ["안녕하세요", "ABC", "회사입니다"],
      },
      {
        english: "May I speak to Mr. Kim?",
        korean: "김 부장님 계세요",
        words: ["김", "부장님", "계세요"],
      },
      {
        english: "He's in a meeting right now.",
        korean: "지금 회의 중이세요",
        words: ["지금", "회의", "중이세요"],
      },
      {
        english: "Would you like to leave a message?",
        korean: "메시지 남기시겠어요",
        words: ["메시지", "남기시겠어요"],
      },
      {
        english: "Please ask him to call me back.",
        korean: "제게 전화 부탁드린다고 전해주세요",
        words: ["제게", "전화", "부탁드린다고", "전해주세요"],
      },
      {
        english: "What's your phone number?",
        korean: "전화번호가 어떻게 되세요",
        words: ["전화번호가", "어떻게", "되세요"],
      },
      {
        english: "My number is 010-1234-5678.",
        korean: "010-1234-5678이에요",
        words: ["010-1234-5678이에요"],
      },
      {
        english: "I'll make sure to pass on the message.",
        korean: "전달해 드리겠습니다",
        words: ["전달해", "드리겠습니다"],
      },
      {
        english: "Thank you for calling.",
        korean: "전화 감사합니다",
        words: ["전화", "감사합니다"],
      },
      {
        english: "Have a good day.",
        korean: "좋은 하루 되세요",
        words: ["좋은", "하루", "되세요"],
      },
    ],
    keyExpressions: [
      { korean: "~계세요?", english: "Is ~ there?", usage: "사람 찾을 때" },
      { korean: "전해주세요", english: "Please tell them", usage: "메시지 전달 요청" },
    ],
    culturalNotes: "한국에서 비즈니스 전화를 받을 때는 회사명을 먼저 말합니다.",
  },

  // ==========================================
  // 소셜 (Social) - 2개
  // ==========================================
  {
    id: "friends",
    icon: Users,
    title: "친구와 약속잡기",
    description: "시간 정하기, 장소 정하기, 확인",
    category: "social",
    level: 1,
    gradient: "from-pink-500 to-rose-500",
    sentences: [
      {
        english: "Are you free this weekend?",
        korean: "주말에 시간 있어",
        words: ["있어", "주말에", "시간"],
      },
      {
        english: "What day works for you?",
        korean: "무슨 요일이 좋아",
        words: ["무슨", "요일이", "좋아"],
      },
      {
        english: "Saturday works for me.",
        korean: "토요일이 좋아",
        words: ["토요일이", "좋아"],
      },
      {
        english: "What time should we meet?",
        korean: "몇 시에 만날까",
        words: ["몇", "시에", "만날까"],
      },
      {
        english: "How about 3 PM?",
        korean: "오후 3시 어때",
        words: ["오후", "3시", "어때"],
      },
      {
        english: "Sounds good!",
        korean: "좋아",
        words: ["좋아"],
      },
      {
        english: "Where should we meet?",
        korean: "어디서 만날까",
        words: ["만날까", "어디서"],
      },
      {
        english: "Let's meet at the station.",
        korean: "역에서 만나자",
        words: ["만나자", "역에서"],
      },
      {
        english: "Okay, see you then!",
        korean: "응 그때 보자",
        words: ["응", "그때", "보자"],
      },
      {
        english: "Don't be late!",
        korean: "늦지 마",
        words: ["늦지", "마"],
      },
    ],
    keyExpressions: [
      { korean: "~에 만나자", english: "Let's meet at ~", usage: "약속 제안" },
      { korean: "~어때?", english: "How about ~?", usage: "제안할 때" },
    ],
    culturalNotes: "한국에서는 친구 사이에 반말(casual speech)을 사용합니다.",
  },
  {
    id: "birthday",
    icon: Gift,
    title: "생일 파티",
    description: "축하 인사, 선물 주기",
    category: "social",
    level: 1,
    gradient: "from-purple-500 to-pink-500",
    sentences: [
      {
        english: "Happy birthday!",
        korean: "생일 축하해",
        words: ["생일", "축하해"],
      },
      {
        english: "Thank you for coming!",
        korean: "와줘서 고마워",
        words: ["와줘서", "고마워"],
      },
      {
        english: "This is for you.",
        korean: "이거 선물이야",
        words: ["이거", "선물이야"],
      },
      {
        english: "You didn't have to!",
        korean: "이럴 필요 없었는데",
        words: ["이럴", "필요", "없었는데"],
      },
      {
        english: "I hope you like it.",
        korean: "마음에 들었으면 좋겠다",
        words: ["마음에", "들었으면", "좋겠다"],
      },
      {
        english: "Make a wish!",
        korean: "소원 빌어",
        words: ["소원", "빌어"],
      },
      {
        english: "Now blow out the candles!",
        korean: "촛불 꺼",
        words: ["촛불", "꺼"],
      },
      {
        english: "Let's take a photo together.",
        korean: "같이 사진 찍자",
        words: ["같이", "사진", "찍자"],
      },
      {
        english: "It was so much fun!",
        korean: "너무 재밌었어",
        words: ["너무", "재밌었어"],
      },
      {
        english: "See you next time!",
        korean: "다음에 또 보자",
        words: ["다음에", "또", "보자"],
      },
    ],
    keyExpressions: [
      { korean: "~축하해", english: "Congratulations on ~", usage: "축하할 때" },
      { korean: "~줘서 고마워", english: "Thanks for ~ing", usage: "감사 표현" },
    ],
    culturalNotes: "한국에서는 생일에 미역국을 먹는 전통이 있습니다.",
  },
];

// 카테고리 목록
export const conversationCategories = [
  { id: "daily", name: "일상생활", nameEn: "Daily Life", icon: "🏠", count: 6 },
  { id: "travel", name: "여행", nameEn: "Travel", icon: "✈️", count: 5 },
  { id: "business", name: "비즈니스", nameEn: "Business", icon: "💼", count: 2 },
  { id: "social", name: "소셜", nameEn: "Social", icon: "👥", count: 2 },
];

// 카테고리별 시나리오 가져오기
export function getScenariosByCategory(categoryId: string): ConversationScenario[] {
  return conversationScenarios.filter((s) => s.category === categoryId);
}

// 레벨별 시나리오 가져오기
export function getScenariosByLevel(level: number): ConversationScenario[] {
  return conversationScenarios.filter((s) => s.level === level);
}

// ID로 시나리오 가져오기
export function getScenarioById(id: string): ConversationScenario | undefined {
  return conversationScenarios.find((s) => s.id === id);
}
