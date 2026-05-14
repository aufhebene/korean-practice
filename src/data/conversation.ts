// 회화 시나리오 데이터
import { Coffee, ShoppingCart, Building2, Users, Plane, Utensils, Car, Hotel, Hospital, Scissors, Phone, CreditCard, Train, MapPin, Gift, Mail, Bus, Dumbbell, Landmark, ShoppingBag, Briefcase, UserPlus, Pill } from "lucide-react";
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

  // ==========================================
  // 추가 시나리오 - 일상생활 (Daily Life) +3
  // ==========================================
  {
    id: "post-office",
    icon: Mail,
    title: "우체국에서 소포 보내기",
    description: "소포 발송, 우표 구매, 등기/일반 우편",
    category: "daily",
    level: 2,
    gradient: "from-red-500 to-pink-500",
    sentences: [
      {
        english: "I'd like to send this package.",
        korean: "이 소포를 보내고 싶어요",
        words: ["소포를", "이", "보내고", "싶어요"],
      },
      {
        english: "Where would you like to send it?",
        korean: "어디로 보내실 거예요",
        words: ["어디로", "보내실", "거예요"],
      },
      {
        english: "To Japan, please.",
        korean: "일본으로 보내 주세요",
        words: ["일본으로", "보내", "주세요"],
      },
      {
        english: "How long will it take?",
        korean: "얼마나 걸려요",
        words: ["얼마나", "걸려요"],
      },
      {
        english: "It takes about 5 days.",
        korean: "5일 정도 걸려요",
        words: ["5일", "정도", "걸려요"],
      },
      {
        english: "How much is the shipping?",
        korean: "배송비가 얼마예요",
        words: ["배송비가", "얼마예요"],
      },
      {
        english: "It's 25,000 won by EMS.",
        korean: "EMS로 이만오천 원이에요",
        words: ["EMS로", "이만오천", "원이에요"],
      },
      {
        english: "Please send it by registered mail.",
        korean: "등기로 보내 주세요",
        words: ["등기로", "보내", "주세요"],
      },
      {
        english: "Please write the address here.",
        korean: "여기에 주소를 써 주세요",
        words: ["여기에", "주소를", "써", "주세요"],
      },
      {
        english: "Thank you, here's your receipt.",
        korean: "감사합니다 영수증이에요",
        words: ["감사합니다", "영수증이에요"],
      },
    ],
    keyExpressions: [
      { korean: "~로 보내 주세요", english: "Please send to ~", usage: "발송지 명시" },
      { korean: "얼마나 걸려요?", english: "How long does it take?", usage: "소요 시간 묻기" },
    ],
    culturalNotes: "한국 우체국(우정사업본부)은 EMS, 등기, 일반 우편 등 다양한 옵션을 제공합니다.",
  },
  {
    id: "bus",
    icon: Bus,
    title: "버스 타기",
    description: "노선 묻기, 환승, 하차 알림",
    category: "daily",
    level: 2,
    gradient: "from-blue-500 to-indigo-500",
    sentences: [
      {
        english: "Excuse me, does this bus go to Hongdae?",
        korean: "저기요 이 버스 홍대 가요",
        words: ["저기요", "이", "버스", "홍대", "가요"],
      },
      {
        english: "Yes, it does.",
        korean: "네 가요",
        words: ["네", "가요"],
      },
      {
        english: "How many stops is it?",
        korean: "몇 정거장 가야 해요",
        words: ["몇", "정거장", "가야", "해요"],
      },
      {
        english: "About 7 stops.",
        korean: "일곱 정거장 정도예요",
        words: ["일곱", "정거장", "정도예요"],
      },
      {
        english: "Where do I transfer?",
        korean: "어디서 갈아타요",
        words: ["어디서", "갈아타요"],
      },
      {
        english: "Transfer at Sinchon Station.",
        korean: "신촌역에서 갈아타세요",
        words: ["신촌역에서", "갈아타세요"],
      },
      {
        english: "Could you tell me when to get off?",
        korean: "내릴 때 말씀해 주세요",
        words: ["내릴", "때", "말씀해", "주세요"],
      },
      {
        english: "Sure, I will.",
        korean: "네 알려 드릴게요",
        words: ["네", "알려", "드릴게요"],
      },
      {
        english: "We're here, get off now.",
        korean: "다 왔어요 여기서 내리세요",
        words: ["다", "왔어요", "여기서", "내리세요"],
      },
      {
        english: "Thank you so much!",
        korean: "정말 감사합니다",
        words: ["정말", "감사합니다"],
      },
    ],
    keyExpressions: [
      { korean: "~ 가요?", english: "Does it go to ~?", usage: "목적지 확인" },
      { korean: "~에서 갈아타세요", english: "Transfer at ~", usage: "환승 안내" },
    ],
    culturalNotes: "교통카드(T-money 등)로 환승하면 무료 또는 할인이 적용됩니다.",
  },
  {
    id: "gym",
    icon: Dumbbell,
    title: "헬스장 등록하기",
    description: "회원권 가입, PT 문의, 운동 예약",
    category: "daily",
    level: 2,
    gradient: "from-orange-500 to-red-500",
    sentences: [
      {
        english: "I'd like to sign up for a membership.",
        korean: "회원권을 등록하고 싶어요",
        words: ["회원권을", "등록하고", "싶어요"],
      },
      {
        english: "How long would you like?",
        korean: "얼마나 하실 거예요",
        words: ["얼마나", "하실", "거예요"],
      },
      {
        english: "Three months, please.",
        korean: "3개월로 할게요",
        words: ["3개월로", "할게요"],
      },
      {
        english: "It's 150,000 won for three months.",
        korean: "3개월에 십오만 원이에요",
        words: ["3개월에", "십오만", "원이에요"],
      },
      {
        english: "Do you offer personal training?",
        korean: "PT도 받을 수 있어요",
        words: ["PT도", "받을", "수", "있어요"],
      },
      {
        english: "Yes, you can book a session at the front desk.",
        korean: "네 프론트에서 예약하세요",
        words: ["네", "프론트에서", "예약하세요"],
      },
      {
        english: "What time is the gym open?",
        korean: "몇 시까지 운영해요",
        words: ["몇", "시까지", "운영해요"],
      },
      {
        english: "We're open from 6 AM to 11 PM.",
        korean: "오전 6시부터 밤 11시까지 해요",
        words: ["오전", "6시부터", "밤", "11시까지", "해요"],
      },
      {
        english: "Where are the locker rooms?",
        korean: "탈의실은 어디예요",
        words: ["탈의실은", "어디예요"],
      },
      {
        english: "Down the hall on the right.",
        korean: "복도 끝 오른쪽에 있어요",
        words: ["복도", "끝", "오른쪽에", "있어요"],
      },
    ],
    keyExpressions: [
      { korean: "~ 등록하고 싶어요", english: "I'd like to sign up for ~", usage: "가입 요청" },
      { korean: "몇 시까지 ~해요?", english: "Until what time ~?", usage: "운영 시간 확인" },
    ],
  },

  // ==========================================
  // 추가 시나리오 - 여행 (Travel) +2
  // ==========================================
  {
    id: "museum",
    icon: Landmark,
    title: "박물관 관람하기",
    description: "입장권, 가이드 투어, 사진 촬영 규정",
    category: "travel",
    level: 2,
    gradient: "from-stone-500 to-amber-700",
    sentences: [
      {
        english: "How much is the admission?",
        korean: "입장료가 얼마예요",
        words: ["입장료가", "얼마예요"],
      },
      {
        english: "It's 5,000 won for adults.",
        korean: "어른은 오천 원이에요",
        words: ["어른은", "오천", "원이에요"],
      },
      {
        english: "Two adults, please.",
        korean: "어른 두 명이요",
        words: ["어른", "두", "명이요"],
      },
      {
        english: "Is there a guide tour available?",
        korean: "가이드 투어가 있어요",
        words: ["가이드", "투어가", "있어요"],
      },
      {
        english: "Yes, it starts at 2 PM.",
        korean: "네 오후 2시에 시작해요",
        words: ["네", "오후", "2시에", "시작해요"],
      },
      {
        english: "Can I take photos inside?",
        korean: "안에서 사진 찍어도 돼요",
        words: ["안에서", "사진", "찍어도", "돼요"],
      },
      {
        english: "Photos are okay, but no flash.",
        korean: "사진은 괜찮은데 플래시는 안 돼요",
        words: ["사진은", "괜찮은데", "플래시는", "안", "돼요"],
      },
      {
        english: "Where is the gift shop?",
        korean: "기념품 가게는 어디예요",
        words: ["기념품", "가게는", "어디예요"],
      },
      {
        english: "It's on the first floor by the exit.",
        korean: "1층 출구 옆에 있어요",
        words: ["1층", "출구", "옆에", "있어요"],
      },
      {
        english: "When does the museum close?",
        korean: "박물관은 몇 시에 닫아요",
        words: ["박물관은", "몇", "시에", "닫아요"],
      },
    ],
    keyExpressions: [
      { korean: "~해도 돼요?", english: "Is it okay to ~?", usage: "허락 구하기" },
      { korean: "~는 어디예요?", english: "Where is ~?", usage: "위치 묻기" },
    ],
    culturalNotes: "한국의 국립박물관은 대부분 무료이며, 매주 월요일은 휴관일입니다.",
  },
  {
    id: "duty-free",
    icon: ShoppingBag,
    title: "면세점에서 쇼핑하기",
    description: "여권 제시, 화장품/주류 구매, 인도장 안내",
    category: "travel",
    level: 2,
    gradient: "from-violet-500 to-purple-500",
    sentences: [
      {
        english: "Could I see your passport, please?",
        korean: "여권 좀 보여 주시겠어요",
        words: ["여권", "좀", "보여", "주시겠어요"],
      },
      {
        english: "Here you go.",
        korean: "여기 있어요",
        words: ["여기", "있어요"],
      },
      {
        english: "I'm looking for cosmetics.",
        korean: "화장품을 보고 있어요",
        words: ["화장품을", "보고", "있어요"],
      },
      {
        english: "What brand do you prefer?",
        korean: "어떤 브랜드를 좋아하세요",
        words: ["어떤", "브랜드를", "좋아하세요"],
      },
      {
        english: "Can I get a sample?",
        korean: "샘플 받을 수 있어요",
        words: ["샘플", "받을", "수", "있어요"],
      },
      {
        english: "Of course, here you go.",
        korean: "물론이죠 여기 있어요",
        words: ["물론이죠", "여기", "있어요"],
      },
      {
        english: "Is this duty-free price?",
        korean: "이게 면세 가격인가요",
        words: ["이게", "면세", "가격인가요"],
      },
      {
        english: "Yes, it's 30% off the regular price.",
        korean: "네 정가에서 30퍼센트 할인이에요",
        words: ["네", "정가에서", "30퍼센트", "할인이에요"],
      },
      {
        english: "Where do I pick up my purchase?",
        korean: "물건은 어디서 받아요",
        words: ["물건은", "어디서", "받아요"],
      },
      {
        english: "At the duty-free counter near the gate.",
        korean: "탑승구 근처 인도장에서 받으세요",
        words: ["탑승구", "근처", "인도장에서", "받으세요"],
      },
    ],
    keyExpressions: [
      { korean: "~ 보여 주시겠어요?", english: "Could you show me ~?", usage: "공손한 요청" },
      { korean: "~ 받을 수 있어요?", english: "Can I get ~?", usage: "물건/서비스 요청" },
    ],
    culturalNotes: "면세점에서 산 물건은 출국장 인도장(pickup counter)에서 탑승 전에 받아야 합니다.",
  },

  // ==========================================
  // 추가 시나리오 - 비즈니스 (Business) +2
  // ==========================================
  {
    id: "meeting",
    icon: Briefcase,
    title: "회의에서 발표하기",
    description: "인사, 발표 시작/마무리, 질문 응답",
    category: "business",
    level: 3,
    gradient: "from-slate-600 to-gray-800",
    sentences: [
      {
        english: "Thank you all for coming today.",
        korean: "오늘 와 주셔서 감사합니다",
        words: ["오늘", "와", "주셔서", "감사합니다"],
      },
      {
        english: "Let me introduce myself first.",
        korean: "먼저 제 소개를 드리겠습니다",
        words: ["먼저", "제", "소개를", "드리겠습니다"],
      },
      {
        english: "Today I will present our Q3 results.",
        korean: "오늘은 3분기 실적을 발표하겠습니다",
        words: ["오늘은", "3분기", "실적을", "발표하겠습니다"],
      },
      {
        english: "Please look at this slide.",
        korean: "이 슬라이드를 봐 주세요",
        words: ["이", "슬라이드를", "봐", "주세요"],
      },
      {
        english: "Sales increased by 20% compared to last year.",
        korean: "매출이 작년 대비 20퍼센트 증가했습니다",
        words: ["매출이", "작년", "대비", "20퍼센트", "증가했습니다"],
      },
      {
        english: "Are there any questions?",
        korean: "질문 있으신가요",
        words: ["질문", "있으신가요"],
      },
      {
        english: "Yes, I have a question.",
        korean: "네 질문 있습니다",
        words: ["네", "질문", "있습니다"],
      },
      {
        english: "That's a good question.",
        korean: "좋은 질문입니다",
        words: ["좋은", "질문입니다"],
      },
      {
        english: "I'll send the materials by email later.",
        korean: "자료는 나중에 이메일로 보내 드리겠습니다",
        words: ["자료는", "나중에", "이메일로", "보내", "드리겠습니다"],
      },
      {
        english: "Thank you for listening.",
        korean: "들어 주셔서 감사합니다",
        words: ["들어", "주셔서", "감사합니다"],
      },
    ],
    keyExpressions: [
      { korean: "~하겠습니다", english: "I will ~ (formal)", usage: "공식 발표 어미" },
      { korean: "~ 있으신가요?", english: "Do you have ~?", usage: "공손한 질문" },
    ],
    culturalNotes: "한국 비즈니스 자리에서는 명함을 두 손으로 주고받으며 직급을 호칭에 붙여 부릅니다.",
  },
  {
    id: "phone-business",
    icon: Phone,
    title: "비즈니스 전화 응대",
    description: "전화 받기, 담당자 연결, 메모 남기기",
    category: "business",
    level: 3,
    gradient: "from-cyan-600 to-blue-600",
    sentences: [
      {
        english: "Hello, this is ABC Company.",
        korean: "여보세요 ABC 회사입니다",
        words: ["여보세요", "ABC", "회사입니다"],
      },
      {
        english: "May I speak with Mr. Kim?",
        korean: "김 부장님과 통화할 수 있을까요",
        words: ["김", "부장님과", "통화할", "수", "있을까요"],
      },
      {
        english: "May I ask who's calling?",
        korean: "어디시라고 전해 드릴까요",
        words: ["어디시라고", "전해", "드릴까요"],
      },
      {
        english: "This is Park from XYZ Company.",
        korean: "XYZ 회사의 박이라고 합니다",
        words: ["XYZ", "회사의", "박이라고", "합니다"],
      },
      {
        english: "One moment, please. I'll transfer you.",
        korean: "잠시만 기다려 주세요 연결해 드릴게요",
        words: ["잠시만", "기다려", "주세요", "연결해", "드릴게요"],
      },
      {
        english: "He's in a meeting right now.",
        korean: "지금 회의 중이세요",
        words: ["지금", "회의", "중이세요"],
      },
      {
        english: "Would you like to leave a message?",
        korean: "메모 남겨 드릴까요",
        words: ["메모", "남겨", "드릴까요"],
      },
      {
        english: "Please tell him to call me back.",
        korean: "전화 부탁한다고 전해 주세요",
        words: ["전화", "부탁한다고", "전해", "주세요"],
      },
      {
        english: "Could I have your phone number?",
        korean: "전화번호를 알려 주시겠어요",
        words: ["전화번호를", "알려", "주시겠어요"],
      },
      {
        english: "Thank you. Goodbye.",
        korean: "감사합니다 안녕히 계세요",
        words: ["감사합니다", "안녕히", "계세요"],
      },
    ],
    keyExpressions: [
      { korean: "~과 통화할 수 있을까요?", english: "May I speak with ~?", usage: "통화 요청" },
      { korean: "메모 남겨 드릴까요?", english: "Shall I take a message?", usage: "부재 응대" },
    ],
    culturalNotes: "회사 전화 응대 시 자기 회사명을 먼저 밝히는 것이 한국식 비즈니스 매너입니다.",
  },

  // ==========================================
  // 추가 시나리오 - 소셜 (Social) +2
  // ==========================================
  {
    id: "introduce",
    icon: UserPlus,
    title: "자기소개 하기",
    description: "이름, 직업, 취미, 출신 소개",
    category: "social",
    level: 1,
    gradient: "from-teal-500 to-emerald-500",
    sentences: [
      {
        english: "Hello, nice to meet you.",
        korean: "안녕하세요 만나서 반가워요",
        words: ["안녕하세요", "만나서", "반가워요"],
      },
      {
        english: "My name is Minjun Kim.",
        korean: "제 이름은 김민준이에요",
        words: ["제", "이름은", "김민준이에요"],
      },
      {
        english: "Where are you from?",
        korean: "어디에서 오셨어요",
        words: ["어디에서", "오셨어요"],
      },
      {
        english: "I'm from America.",
        korean: "미국에서 왔어요",
        words: ["미국에서", "왔어요"],
      },
      {
        english: "What do you do?",
        korean: "무슨 일 하세요",
        words: ["무슨", "일", "하세요"],
      },
      {
        english: "I'm a software engineer.",
        korean: "소프트웨어 엔지니어예요",
        words: ["소프트웨어", "엔지니어예요"],
      },
      {
        english: "What are your hobbies?",
        korean: "취미가 뭐예요",
        words: ["취미가", "뭐예요"],
      },
      {
        english: "I like watching movies and reading.",
        korean: "영화 보기랑 독서를 좋아해요",
        words: ["영화", "보기랑", "독서를", "좋아해요"],
      },
      {
        english: "How long have you been in Korea?",
        korean: "한국에 온 지 얼마나 됐어요",
        words: ["한국에", "온", "지", "얼마나", "됐어요"],
      },
      {
        english: "I've been here for 6 months.",
        korean: "6개월 됐어요",
        words: ["6개월", "됐어요"],
      },
    ],
    keyExpressions: [
      { korean: "~에서 왔어요", english: "I came from ~", usage: "출신 표현" },
      { korean: "~하는 거 좋아해요", english: "I like ~ing", usage: "취미 표현" },
    ],
    culturalNotes: "한국에서는 첫 만남에 나이와 직업을 묻는 경우가 많습니다.",
  },
  {
    id: "pharmacy",
    icon: Pill,
    title: "약국에서 약 사기",
    description: "증상 설명, 약 종류, 복용법 묻기",
    category: "social",
    level: 2,
    gradient: "from-green-500 to-lime-500",
    sentences: [
      {
        english: "How can I help you?",
        korean: "어떻게 오셨어요",
        words: ["어떻게", "오셨어요"],
      },
      {
        english: "I have a headache.",
        korean: "머리가 아파요",
        words: ["머리가", "아파요"],
      },
      {
        english: "Do you have any other symptoms?",
        korean: "다른 증상도 있어요",
        words: ["다른", "증상도", "있어요"],
      },
      {
        english: "I have a fever too.",
        korean: "열도 나요",
        words: ["열도", "나요"],
      },
      {
        english: "Since when?",
        korean: "언제부터 그러셨어요",
        words: ["언제부터", "그러셨어요"],
      },
      {
        english: "Since this morning.",
        korean: "오늘 아침부터요",
        words: ["오늘", "아침부터요"],
      },
      {
        english: "Take this medicine three times a day.",
        korean: "이 약을 하루에 세 번 드세요",
        words: ["이", "약을", "하루에", "세", "번", "드세요"],
      },
      {
        english: "Should I take it after meals?",
        korean: "식사 후에 먹어요",
        words: ["식사", "후에", "먹어요"],
      },
      {
        english: "Yes, take it 30 minutes after eating.",
        korean: "네 식후 30분에 드세요",
        words: ["네", "식후", "30분에", "드세요"],
      },
      {
        english: "How much is it?",
        korean: "얼마예요",
        words: ["얼마예요"],
      },
    ],
    keyExpressions: [
      { korean: "~가 아파요", english: "My ~ hurts", usage: "증상 설명" },
      { korean: "하루에 ~번 드세요", english: "Take ~ times a day", usage: "복용 안내" },
    ],
    culturalNotes: "한국에서는 처방전 없이 살 수 있는 일반의약품도 약사 상담 후 구매합니다.",
  },
];

// 카테고리 목록
export const conversationCategories = [
  { id: "daily", name: "일상생활", nameEn: "Daily Life", icon: "🏠", count: 9 },
  { id: "travel", name: "여행", nameEn: "Travel", icon: "✈️", count: 7 },
  { id: "business", name: "비즈니스", nameEn: "Business", icon: "💼", count: 4 },
  { id: "social", name: "소셜", nameEn: "Social", icon: "👥", count: 4 },
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
