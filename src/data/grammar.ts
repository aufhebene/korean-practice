// 문법 데이터 (20개, 카테고리별 정리)

export interface GrammarItem {
  id: string;
  pattern: string;
  name: string;
  category: "particle" | "ending" | "expression";
  level: 1 | 2 | 3;
  explanation: {
    ko: string;
    en: string;
  };
  examples: {
    sentence: string;
    translation: string;
  }[];
  quiz: {
    sentence: string;
    blank: string;
    hint: string;
    correctAnswer: string;
    options: string[];
  };
}

export const grammarData: GrammarItem[] = [
  // ==========================================
  // 조사 (Particles) - 10개
  // ==========================================
  {
    id: "g001",
    pattern: "은/는",
    name: "주제 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "문장의 주제나 대조를 나타내는 조사입니다. 받침이 있으면 '은', 없으면 '는'을 사용합니다.",
      en: "Topic marker particle. Use '은' after consonants, '는' after vowels.",
    },
    examples: [
      { sentence: "저는 학생이에요.", translation: "I am a student." },
      { sentence: "오늘은 날씨가 좋아요.", translation: "Today, the weather is nice." },
    ],
    quiz: {
      sentence: "나[blank] 한국어를 공부해요",
      blank: "[blank]",
      hint: "주제를 나타내는 조사",
      correctAnswer: "는",
      options: ["는", "를", "이", "에"],
    },
  },
  {
    id: "g002",
    pattern: "이/가",
    name: "주격 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "주어를 나타내는 조사입니다. 받침이 있으면 '이', 없으면 '가'를 사용합니다.",
      en: "Subject marker particle. Use '이' after consonants, '가' after vowels.",
    },
    examples: [
      { sentence: "비가 와요.", translation: "It's raining." },
      { sentence: "친구가 왔어요.", translation: "A friend came." },
    ],
    quiz: {
      sentence: "날씨[blank] 좋아요",
      blank: "[blank]",
      hint: "주어를 나타내는 조사",
      correctAnswer: "가",
      options: ["가", "를", "은", "에서"],
    },
  },
  {
    id: "g003",
    pattern: "을/를",
    name: "목적격 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "목적어를 나타내는 조사입니다. 받침이 있으면 '을', 없으면 '를'을 사용합니다.",
      en: "Object marker particle. Use '을' after consonants, '를' after vowels.",
    },
    examples: [
      { sentence: "밥을 먹어요.", translation: "I eat rice." },
      { sentence: "커피를 마셔요.", translation: "I drink coffee." },
    ],
    quiz: {
      sentence: "책[blank] 읽어요",
      blank: "[blank]",
      hint: "목적어를 나타내는 조사",
      correctAnswer: "을",
      options: ["을", "이", "는", "에"],
    },
  },
  {
    id: "g004",
    pattern: "에",
    name: "위치/시간/방향 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "장소, 시간, 방향을 나타내는 조사입니다. '~에 있다', '~에 가다' 형태로 자주 사용됩니다.",
      en: "Location/time/direction particle. Used with 있다 (to exist) and 가다 (to go).",
    },
    examples: [
      { sentence: "학교에 가요.", translation: "I go to school." },
      { sentence: "책상 위에 있어요.", translation: "It's on the desk." },
    ],
    quiz: {
      sentence: "내일 서울[blank] 가요",
      blank: "[blank]",
      hint: "방향/목적지를 나타내는 조사",
      correctAnswer: "에",
      options: ["에", "에서", "를", "은"],
    },
  },
  {
    id: "g005",
    pattern: "에서",
    name: "장소 조사 (행동)",
    category: "particle",
    level: 1,
    explanation: {
      ko: "행동이 일어나는 장소를 나타내는 조사입니다. '~에서 일하다', '~에서 공부하다' 형태로 사용됩니다.",
      en: "Location particle for actions. Used when an action takes place at a location.",
    },
    examples: [
      { sentence: "도서관에서 공부해요.", translation: "I study at the library." },
      { sentence: "회사에서 일해요.", translation: "I work at the company." },
    ],
    quiz: {
      sentence: "카페[blank] 커피를 마셔요",
      blank: "[blank]",
      hint: "행동이 일어나는 장소",
      correctAnswer: "에서",
      options: ["에서", "에", "를", "이"],
    },
  },
  {
    id: "g006",
    pattern: "와/과, 하고, (이)랑",
    name: "접속 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "'~와 함께', '~와 같이'의 의미로 사용됩니다. 격식체는 '와/과', 구어체는 '하고', '(이)랑'을 사용합니다.",
      en: "Connecting particle meaning 'and' or 'with'. 와/과 is formal, 하고/(이)랑 is casual.",
    },
    examples: [
      { sentence: "친구와 같이 갔어요.", translation: "I went with a friend." },
      { sentence: "빵하고 우유를 샀어요.", translation: "I bought bread and milk." },
    ],
    quiz: {
      sentence: "친구[blank] 영화를 봤어요",
      blank: "[blank]",
      hint: "함께를 나타내는 조사",
      correctAnswer: "와",
      options: ["와", "를", "에", "은"],
    },
  },
  {
    id: "g007",
    pattern: "의",
    name: "소유격 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "소유나 소속을 나타내는 조사입니다. 영어의 \"'s\" 또는 \"of\"에 해당합니다.",
      en: "Possessive particle, equivalent to \"'s\" or \"of\" in English.",
    },
    examples: [
      { sentence: "저의 가방이에요.", translation: "It's my bag." },
      { sentence: "한국의 음식이 맛있어요.", translation: "Korean food is delicious." },
    ],
    quiz: {
      sentence: "이것은 누구[blank] 책이에요?",
      blank: "[blank]",
      hint: "소유를 나타내는 조사",
      correctAnswer: "의",
      options: ["의", "가", "를", "은"],
    },
  },
  {
    id: "g008",
    pattern: "에게/한테",
    name: "대상 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "행동의 대상(사람/동물)을 나타내는 조사입니다. '에게'는 격식체, '한테'는 구어체입니다.",
      en: "Indirect object particle for people/animals. 에게 is formal, 한테 is casual.",
    },
    examples: [
      { sentence: "친구에게 선물을 줬어요.", translation: "I gave a gift to my friend." },
      { sentence: "동생한테 전화했어요.", translation: "I called my younger sibling." },
    ],
    quiz: {
      sentence: "선생님[blank] 질문했어요",
      blank: "[blank]",
      hint: "대상(사람)을 나타내는 조사",
      correctAnswer: "에게",
      options: ["에게", "를", "에서", "이"],
    },
  },
  {
    id: "g009",
    pattern: "(으)로",
    name: "방향/수단 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "방향, 수단, 재료를 나타내는 조사입니다. 받침이 없거나 'ㄹ' 받침이면 '로', 그 외는 '으로'를 사용합니다.",
      en: "Direction/means particle. Use '로' after vowels or ㄹ, '으로' after other consonants.",
    },
    examples: [
      { sentence: "버스로 가요.", translation: "I go by bus." },
      { sentence: "오른쪽으로 가세요.", translation: "Please go to the right." },
    ],
    quiz: {
      sentence: "지하철[blank] 출근해요",
      blank: "[blank]",
      hint: "수단을 나타내는 조사",
      correctAnswer: "로",
      options: ["로", "를", "에", "이"],
    },
  },
  {
    id: "g010",
    pattern: "부터 ~ 까지",
    name: "범위 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "시간이나 장소의 시작점과 끝점을 나타내는 조사입니다. '부터'는 시작, '까지'는 끝을 나타냅니다.",
      en: "Range particles. 부터 means 'from', 까지 means 'to/until'.",
    },
    examples: [
      { sentence: "9시부터 6시까지 일해요.", translation: "I work from 9 to 6." },
      { sentence: "서울부터 부산까지 3시간 걸려요.", translation: "It takes 3 hours from Seoul to Busan." },
    ],
    quiz: {
      sentence: "월요일[blank] 금요일까지 수업이 있어요",
      blank: "[blank]",
      hint: "시작점을 나타내는 조사",
      correctAnswer: "부터",
      options: ["부터", "까지", "에", "에서"],
    },
  },

  // ==========================================
  // 어미 (Endings) - 6개
  // ==========================================
  {
    id: "g011",
    pattern: "-아/어요",
    name: "해요체 (존댓말)",
    category: "ending",
    level: 1,
    explanation: {
      ko: "일상적인 존댓말 표현입니다. 어간의 마지막 모음이 'ㅏ, ㅗ'면 '-아요', 그 외는 '-어요'를 사용합니다.",
      en: "Polite informal ending. Use -아요 after ㅏ/ㅗ vowels, -어요 after others.",
    },
    examples: [
      { sentence: "밥을 먹어요.", translation: "I eat." },
      { sentence: "학교에 가요.", translation: "I go to school." },
    ],
    quiz: {
      sentence: "저는 커피를 마[blank]",
      blank: "[blank]",
      hint: "해요체 어미",
      correctAnswer: "셔요",
      options: ["셔요", "습니다", "자", "ㄹ게요"],
    },
  },
  {
    id: "g012",
    pattern: "-습니다/ㅂ니다",
    name: "합쇼체 (격식체)",
    category: "ending",
    level: 1,
    explanation: {
      ko: "격식적인 상황에서 사용하는 존댓말입니다. 받침이 있으면 '-습니다', 없으면 '-ㅂ니다'를 사용합니다.",
      en: "Formal polite ending. Use -습니다 after consonants, -ㅂ니다 after vowels.",
    },
    examples: [
      { sentence: "감사합니다.", translation: "Thank you." },
      { sentence: "만나서 반갑습니다.", translation: "Nice to meet you." },
    ],
    quiz: {
      sentence: "저는 학생입[blank]",
      blank: "[blank]",
      hint: "격식체 어미",
      correctAnswer: "니다",
      options: ["니다", "어요", "자", "을게요"],
    },
  },
  {
    id: "g013",
    pattern: "-았/었어요",
    name: "과거 시제",
    category: "ending",
    level: 1,
    explanation: {
      ko: "과거의 일을 나타내는 표현입니다. 어간의 마지막 모음이 'ㅏ, ㅗ'면 '-았어요', 그 외는 '-었어요'를 사용합니다.",
      en: "Past tense ending. Use -았어요 after ㅏ/ㅗ vowels, -었어요 after others.",
    },
    examples: [
      { sentence: "어제 영화를 봤어요.", translation: "I watched a movie yesterday." },
      { sentence: "밥을 먹었어요.", translation: "I ate." },
    ],
    quiz: {
      sentence: "어제 친구를 만[blank]",
      blank: "[blank]",
      hint: "과거 시제 어미",
      correctAnswer: "났어요",
      options: ["났어요", "나요", "날 거예요", "나세요"],
    },
  },
  {
    id: "g014",
    pattern: "-(으)ㄹ 거예요",
    name: "미래 시제",
    category: "ending",
    level: 1,
    explanation: {
      ko: "미래의 계획이나 의지를 나타내는 표현입니다. 받침이 없으면 '-ㄹ 거예요', 있으면 '-을 거예요'를 사용합니다.",
      en: "Future tense ending expressing plans or intentions.",
    },
    examples: [
      { sentence: "내일 한국에 갈 거예요.", translation: "I will go to Korea tomorrow." },
      { sentence: "주말에 쉴 거예요.", translation: "I will rest on the weekend." },
    ],
    quiz: {
      sentence: "다음 주에 여행[blank]",
      blank: "[blank]",
      hint: "미래 시제 표현",
      correctAnswer: "할 거예요",
      options: ["할 거예요", "했어요", "해요", "하세요"],
    },
  },
  {
    id: "g015",
    pattern: "-고 있다",
    name: "진행형",
    category: "ending",
    level: 1,
    explanation: {
      ko: "현재 진행 중인 동작을 나타내는 표현입니다. 영어의 '-ing'에 해당합니다.",
      en: "Progressive form indicating an ongoing action, like English '-ing'.",
    },
    examples: [
      { sentence: "지금 공부하고 있어요.", translation: "I am studying now." },
      { sentence: "친구를 기다리고 있어요.", translation: "I am waiting for a friend." },
    ],
    quiz: {
      sentence: "지금 밥을 먹[blank]",
      blank: "[blank]",
      hint: "진행형 표현",
      correctAnswer: "고 있어요",
      options: ["고 있어요", "었어요", "을 거예요", "어요"],
    },
  },
  {
    id: "g016",
    pattern: "-(으)세요",
    name: "명령/요청 (존댓말)",
    category: "ending",
    level: 1,
    explanation: {
      ko: "공손하게 명령하거나 요청할 때 사용하는 표현입니다.",
      en: "Polite imperative/request form.",
    },
    examples: [
      { sentence: "여기 앉으세요.", translation: "Please sit here." },
      { sentence: "천천히 말씀하세요.", translation: "Please speak slowly." },
    ],
    quiz: {
      sentence: "이쪽으로 오[blank]",
      blank: "[blank]",
      hint: "공손한 명령/요청",
      correctAnswer: "세요",
      options: ["세요", "자", "ㄹ게요", "았어요"],
    },
  },

  // ==========================================
  // 표현 (Expressions) - 4개
  // ==========================================
  {
    id: "g017",
    pattern: "-고 싶다",
    name: "희망 표현",
    category: "expression",
    level: 1,
    explanation: {
      ko: "하고 싶은 것을 나타내는 표현입니다. 영어의 'want to'에 해당합니다.",
      en: "Expression of desire, equivalent to 'want to' in English.",
    },
    examples: [
      { sentence: "한국에 가고 싶어요.", translation: "I want to go to Korea." },
      { sentence: "커피를 마시고 싶어요.", translation: "I want to drink coffee." },
    ],
    quiz: {
      sentence: "한국 음식을 먹[blank]",
      blank: "[blank]",
      hint: "희망을 나타내는 표현",
      correctAnswer: "고 싶어요",
      options: ["고 싶어요", "었어요", "을 거예요", "세요"],
    },
  },
  {
    id: "g018",
    pattern: "-(으)ㄹ 수 있다/없다",
    name: "가능/불가능 표현",
    category: "expression",
    level: 1,
    explanation: {
      ko: "능력이나 가능성을 나타내는 표현입니다. 영어의 'can/cannot'에 해당합니다.",
      en: "Expression of ability/possibility, equivalent to 'can/cannot' in English.",
    },
    examples: [
      { sentence: "한국어를 말할 수 있어요.", translation: "I can speak Korean." },
      { sentence: "오늘은 갈 수 없어요.", translation: "I cannot go today." },
    ],
    quiz: {
      sentence: "저는 운전[blank]",
      blank: "[blank]",
      hint: "가능을 나타내는 표현",
      correctAnswer: "할 수 있어요",
      options: ["할 수 있어요", "했어요", "해요", "하세요"],
    },
  },
  {
    id: "g019",
    pattern: "-아/어야 하다",
    name: "의무 표현",
    category: "expression",
    level: 1,
    explanation: {
      ko: "해야 하는 것을 나타내는 표현입니다. 영어의 'have to', 'must'에 해당합니다.",
      en: "Expression of obligation, equivalent to 'have to' or 'must' in English.",
    },
    examples: [
      { sentence: "숙제를 해야 해요.", translation: "I have to do homework." },
      { sentence: "내일 일찍 일어나야 해요.", translation: "I have to wake up early tomorrow." },
    ],
    quiz: {
      sentence: "지금 출발[blank]",
      blank: "[blank]",
      hint: "의무를 나타내는 표현",
      correctAnswer: "해야 해요",
      options: ["해야 해요", "했어요", "할 거예요", "하고 싶어요"],
    },
  },
  {
    id: "g020",
    pattern: "-지 마세요",
    name: "금지 표현",
    category: "expression",
    level: 1,
    explanation: {
      ko: "하지 말아야 하는 것을 나타내는 표현입니다. 영어의 'Don't'에 해당합니다.",
      en: "Negative imperative, equivalent to 'Don't' in English.",
    },
    examples: [
      { sentence: "여기서 담배 피우지 마세요.", translation: "Please don't smoke here." },
      { sentence: "걱정하지 마세요.", translation: "Please don't worry." },
    ],
    quiz: {
      sentence: "여기서 사진 찍[blank]",
      blank: "[blank]",
      hint: "금지를 나타내는 표현",
      correctAnswer: "지 마세요",
      options: ["지 마세요", "으세요", "었어요", "을 거예요"],
    },
  },
];

// 카테고리 목록
export const grammarCategories = [
  { id: "particle", name: "조사", nameEn: "Particles", icon: "🔗", count: 10 },
  { id: "ending", name: "어미", nameEn: "Endings", icon: "📝", count: 6 },
  { id: "expression", name: "표현", nameEn: "Expressions", icon: "💬", count: 4 },
];

// 카테고리별 문법 가져오기
export function getGrammarByCategory(categoryId: string): GrammarItem[] {
  return grammarData.filter((g) => g.category === categoryId);
}

// 레벨별 문법 가져오기
export function getGrammarByLevel(level: number): GrammarItem[] {
  return grammarData.filter((g) => g.level === level);
}

// 랜덤 문법 가져오기
export function getRandomGrammar(count: number): GrammarItem[] {
  const shuffled = [...grammarData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
