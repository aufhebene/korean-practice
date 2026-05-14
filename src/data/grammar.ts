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

  // ==========================================
  // 조사 추가 (Particles, Level 1-2) - 5개
  // ==========================================
  {
    id: "g021",
    pattern: "의",
    name: "소유격 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "소유나 소속을 나타내는 조사입니다. 영어의 's나 of에 해당합니다.",
      en: "Possessive marker, equivalent to 's or 'of' in English.",
    },
    examples: [
      { sentence: "친구의 책이에요.", translation: "It's my friend's book." },
      { sentence: "한국의 음식을 좋아해요.", translation: "I like Korean food." },
    ],
    quiz: {
      sentence: "선생님[blank] 가방이에요",
      blank: "[blank]",
      hint: "소유를 나타내는 조사",
      correctAnswer: "의",
      options: ["의", "이", "는", "에"],
    },
  },
  {
    id: "g022",
    pattern: "도",
    name: "역시 조사",
    category: "particle",
    level: 1,
    explanation: {
      ko: "'또한, 역시'의 의미를 나타내는 조사입니다. 영어의 'also/too'에 해당합니다.",
      en: "Particle meaning 'also/too', adds to the previous statement.",
    },
    examples: [
      { sentence: "저도 학생이에요.", translation: "I'm also a student." },
      { sentence: "커피도 마실래요?", translation: "Would you also like coffee?" },
    ],
    quiz: {
      sentence: "저[blank] 한국어를 배워요",
      blank: "[blank]",
      hint: "'역시'의 의미",
      correctAnswer: "도",
      options: ["도", "는", "이", "를"],
    },
  },
  {
    id: "g023",
    pattern: "만",
    name: "한정 조사",
    category: "particle",
    level: 2,
    explanation: {
      ko: "'오직, 단지'의 의미로 한정을 나타냅니다. 영어의 'only'에 해당합니다.",
      en: "Particle meaning 'only', limits to a single item.",
    },
    examples: [
      { sentence: "물만 주세요.", translation: "Just water, please." },
      { sentence: "한 명만 왔어요.", translation: "Only one person came." },
    ],
    quiz: {
      sentence: "오늘은 저[blank] 갈 거예요",
      blank: "[blank]",
      hint: "'오직'의 의미",
      correctAnswer: "만",
      options: ["만", "도", "는", "에"],
    },
  },
  {
    id: "g024",
    pattern: "부터",
    name: "시작점 조사",
    category: "particle",
    level: 2,
    explanation: {
      ko: "시간이나 순서의 시작점을 나타냅니다. 영어의 'from'에 해당합니다.",
      en: "Particle marking the starting point of time or order, equivalent to 'from'.",
    },
    examples: [
      { sentence: "9시부터 일해요.", translation: "I work from 9 o'clock." },
      { sentence: "처음부터 다시 해요.", translation: "Let's do it again from the start." },
    ],
    quiz: {
      sentence: "내일[blank] 휴가예요",
      blank: "[blank]",
      hint: "시작점을 나타내는 조사",
      correctAnswer: "부터",
      options: ["부터", "까지", "에서", "에"],
    },
  },
  {
    id: "g025",
    pattern: "까지",
    name: "도달점 조사",
    category: "particle",
    level: 2,
    explanation: {
      ko: "시간이나 장소의 끝점을 나타냅니다. 영어의 'until/to'에 해당합니다.",
      en: "Particle marking the ending point or destination, equivalent to 'until/to'.",
    },
    examples: [
      { sentence: "6시까지 일해요.", translation: "I work until 6 o'clock." },
      { sentence: "집까지 걸어가요.", translation: "I walk all the way home." },
    ],
    quiz: {
      sentence: "주말[blank] 끝내야 해요",
      blank: "[blank]",
      hint: "도달점을 나타내는 조사",
      correctAnswer: "까지",
      options: ["까지", "부터", "에서", "도"],
    },
  },

  // ==========================================
  // 어미 추가 (Endings, Level 2) - 8개
  // ==========================================
  {
    id: "g026",
    pattern: "-(으)면",
    name: "조건/가정 어미",
    category: "ending",
    level: 2,
    explanation: {
      ko: "조건이나 가정을 나타내는 연결 어미입니다. 영어의 'if'에 해당합니다.",
      en: "Connective ending expressing condition or hypothesis, equivalent to 'if'.",
    },
    examples: [
      { sentence: "비가 오면 집에 있어요.", translation: "If it rains, I stay home." },
      { sentence: "시간이 있으면 만나요.", translation: "If you have time, let's meet." },
    ],
    quiz: {
      sentence: "돈이 [blank] 여행 갈 거예요",
      blank: "[blank]",
      hint: "조건을 나타내는 어미",
      correctAnswer: "있으면",
      options: ["있으면", "있어서", "있고", "있지만"],
    },
  },
  {
    id: "g027",
    pattern: "-(으)니까",
    name: "이유 어미",
    category: "ending",
    level: 2,
    explanation: {
      ko: "이유나 원인을 나타내는 연결 어미로, 명령/제안과 함께 자주 쓰입니다.",
      en: "Connective ending expressing reason, often paired with commands or suggestions.",
    },
    examples: [
      { sentence: "비가 오니까 우산을 가져가세요.", translation: "Since it's raining, take an umbrella." },
      { sentence: "피곤하니까 일찍 자요.", translation: "I'm tired, so I'll sleep early." },
    ],
    quiz: {
      sentence: "시간이 없[blank] 빨리 가요",
      blank: "[blank]",
      hint: "이유를 나타내는 어미",
      correctAnswer: "으니까",
      options: ["으니까", "지만", "고", "어서"],
    },
  },
  {
    id: "g028",
    pattern: "-지만",
    name: "대조 어미",
    category: "ending",
    level: 2,
    explanation: {
      ko: "두 문장을 대조적으로 연결하는 어미입니다. 영어의 'but'에 해당합니다.",
      en: "Connective ending expressing contrast, equivalent to 'but'.",
    },
    examples: [
      { sentence: "비싸지만 맛있어요.", translation: "It's expensive but delicious." },
      { sentence: "가고 싶지만 시간이 없어요.", translation: "I want to go but don't have time." },
    ],
    quiz: {
      sentence: "한국어가 어렵[blank] 재미있어요",
      blank: "[blank]",
      hint: "대조를 나타내는 어미",
      correctAnswer: "지만",
      options: ["지만", "어서", "면", "고"],
    },
  },
  {
    id: "g029",
    pattern: "-고",
    name: "나열/순차 어미",
    category: "ending",
    level: 2,
    explanation: {
      ko: "두 가지 이상의 동작이나 상태를 나열하거나 순서대로 연결합니다.",
      en: "Connective ending listing actions or states in sequence, equivalent to 'and'.",
    },
    examples: [
      { sentence: "밥을 먹고 학교에 가요.", translation: "I eat and then go to school." },
      { sentence: "이 옷은 예쁘고 싸요.", translation: "These clothes are pretty and cheap." },
    ],
    quiz: {
      sentence: "샤워를 하[blank] 잤어요",
      blank: "[blank]",
      hint: "순서를 나타내는 어미",
      correctAnswer: "고",
      options: ["고", "면", "지만", "니까"],
    },
  },
  {
    id: "g030",
    pattern: "-아/어서",
    name: "이유/순서 어미",
    category: "ending",
    level: 2,
    explanation: {
      ko: "이유나 시간적 선행을 나타내는 연결 어미입니다. 명령/청유와 함께 쓰지 않습니다.",
      en: "Connective ending expressing reason or sequence; cannot be used with commands or suggestions.",
    },
    examples: [
      { sentence: "늦어서 죄송해요.", translation: "I'm sorry for being late." },
      { sentence: "친구를 만나서 영화를 봤어요.", translation: "I met a friend and watched a movie." },
    ],
    quiz: {
      sentence: "배가 고프[blank] 밥을 먹었어요",
      blank: "[blank]",
      hint: "이유를 나타내는 어미",
      correctAnswer: "아서",
      options: ["아서", "지만", "고", "면"],
    },
  },
  {
    id: "g031",
    pattern: "-(으)러 가다/오다",
    name: "목적 어미",
    category: "ending",
    level: 2,
    explanation: {
      ko: "이동의 목적을 나타냅니다. '~하러 가다/오다'의 형태로 씁니다.",
      en: "Expresses the purpose of movement, used with verbs of motion.",
    },
    examples: [
      { sentence: "밥을 먹으러 가요.", translation: "I'm going to eat." },
      { sentence: "친구를 만나러 왔어요.", translation: "I came to meet a friend." },
    ],
    quiz: {
      sentence: "책을 사[blank] 서점에 가요",
      blank: "[blank]",
      hint: "목적을 나타내는 어미",
      correctAnswer: "러",
      options: ["러", "면", "고", "어서"],
    },
  },
  {
    id: "g032",
    pattern: "-기 전에",
    name: "선행 시간 표현",
    category: "ending",
    level: 2,
    explanation: {
      ko: "어떤 동작 이전을 나타냅니다. 영어의 'before ~ing'에 해당합니다.",
      en: "Expresses time before an action, equivalent to 'before ~ing'.",
    },
    examples: [
      { sentence: "자기 전에 책을 읽어요.", translation: "I read a book before sleeping." },
      { sentence: "먹기 전에 손을 씻으세요.", translation: "Wash your hands before eating." },
    ],
    quiz: {
      sentence: "출발하[blank] 전화 주세요",
      blank: "[blank]",
      hint: "어떤 동작의 이전",
      correctAnswer: "기 전에",
      options: ["기 전에", "고 나서", "는 동안", "면서"],
    },
  },
  {
    id: "g033",
    pattern: "-(으)ㄴ 후에",
    name: "후행 시간 표현",
    category: "ending",
    level: 2,
    explanation: {
      ko: "어떤 동작 이후를 나타냅니다. 영어의 'after ~ing'에 해당합니다.",
      en: "Expresses time after an action, equivalent to 'after ~ing'.",
    },
    examples: [
      { sentence: "수업이 끝난 후에 만나요.", translation: "Let's meet after class ends." },
      { sentence: "밥을 먹은 후에 산책했어요.", translation: "I took a walk after eating." },
    ],
    quiz: {
      sentence: "샤워를 하[blank] 후에 잤어요",
      blank: "[blank]",
      hint: "어떤 동작의 이후",
      correctAnswer: "ㄴ",
      options: ["ㄴ", "는", "기", "면"],
    },
  },

  // ==========================================
  // 표현 추가 (Expressions, Level 2-3) - 12개
  // ==========================================
  {
    id: "g034",
    pattern: "-아/어 보다",
    name: "시도/경험 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "어떤 동작을 시도하거나 경험함을 나타냅니다. 영어의 'try ~ing'에 해당합니다.",
      en: "Expresses trying or experiencing an action, equivalent to 'try ~ing'.",
    },
    examples: [
      { sentence: "한국 음식을 먹어 봤어요.", translation: "I've tried Korean food." },
      { sentence: "이거 한번 입어 보세요.", translation: "Try this on once." },
    ],
    quiz: {
      sentence: "이 노래를 한번 들[blank]",
      blank: "[blank]",
      hint: "시도를 나타내는 표현",
      correctAnswer: "어 보세요",
      options: ["어 보세요", "었어요", "을 거예요", "고 싶어요"],
    },
  },
  {
    id: "g035",
    pattern: "-아/어 주다",
    name: "수혜 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "다른 사람을 위해 어떤 동작을 한다는 의미를 나타냅니다.",
      en: "Expresses doing an action for someone's benefit, equivalent to 'do ~ for someone'.",
    },
    examples: [
      { sentence: "사진 좀 찍어 주세요.", translation: "Please take a picture for me." },
      { sentence: "친구가 도와줬어요.", translation: "My friend helped me." },
    ],
    quiz: {
      sentence: "이거 좀 가르쳐 [blank]",
      blank: "[blank]",
      hint: "부탁하는 표현",
      correctAnswer: "주세요",
      options: ["주세요", "보세요", "있어요", "갔어요"],
    },
  },
  {
    id: "g036",
    pattern: "-(으)ㄴ 적이 있다/없다",
    name: "경험 유무 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "과거의 경험이 있는지 없는지를 나타냅니다. 영어의 'have/haven't ~ed'에 해당합니다.",
      en: "Expresses whether one has or hasn't experienced something, equivalent to 'have/haven't ~ed'.",
    },
    examples: [
      { sentence: "한국에 가 본 적이 있어요.", translation: "I've been to Korea." },
      { sentence: "그런 음식은 먹어 본 적이 없어요.", translation: "I've never eaten such food." },
    ],
    quiz: {
      sentence: "이 영화를 본 [blank] 있어요",
      blank: "[blank]",
      hint: "과거 경험을 나타내는 표현",
      correctAnswer: "적이",
      options: ["적이", "수가", "것이", "줄"],
    },
  },
  {
    id: "g037",
    pattern: "-(으)ㄹ 줄 알다/모르다",
    name: "능력 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "기술이나 방법을 알고 있는지 나타냅니다. '-(으)ㄹ 수 있다'와 비슷하지만 학습된 능력을 강조합니다.",
      en: "Expresses knowing how to do something, emphasizing learned skill rather than possibility.",
    },
    examples: [
      { sentence: "수영할 줄 알아요.", translation: "I know how to swim." },
      { sentence: "운전할 줄 몰라요.", translation: "I don't know how to drive." },
    ],
    quiz: {
      sentence: "한국어로 말[blank] 알아요",
      blank: "[blank]",
      hint: "할 수 있는 능력",
      correctAnswer: "할 줄",
      options: ["할 줄", "할 수", "하기", "할 적"],
    },
  },
  {
    id: "g038",
    pattern: "-(으)ㄹ 때",
    name: "시간 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "어떤 일이 일어나는 때를 나타냅니다. 영어의 'when'에 해당합니다.",
      en: "Expresses the time when an action occurs, equivalent to 'when'.",
    },
    examples: [
      { sentence: "밥을 먹을 때 텔레비전을 봐요.", translation: "When I eat, I watch TV." },
      { sentence: "어렸을 때 시골에서 살았어요.", translation: "When I was young, I lived in the countryside." },
    ],
    quiz: {
      sentence: "한국에 갔[blank] 김치를 먹었어요",
      blank: "[blank]",
      hint: "시간을 나타내는 표현",
      correctAnswer: "을 때",
      options: ["을 때", "으면", "어서", "고"],
    },
  },
  {
    id: "g039",
    pattern: "-(으)면 안 되다",
    name: "금지 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "어떤 행동이 허용되지 않음을 나타냅니다. 영어의 'must not'에 해당합니다.",
      en: "Expresses prohibition, equivalent to 'must not' or 'should not'.",
    },
    examples: [
      { sentence: "여기서 담배를 피우면 안 돼요.", translation: "You must not smoke here." },
      { sentence: "수업 시간에 늦으면 안 돼요.", translation: "You must not be late to class." },
    ],
    quiz: {
      sentence: "도서관에서 떠들[blank] 안 돼요",
      blank: "[blank]",
      hint: "금지를 나타내는 표현",
      correctAnswer: "면",
      options: ["면", "고", "어서", "지만"],
    },
  },
  {
    id: "g040",
    pattern: "-아/어도 되다",
    name: "허락 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "어떤 행동이 허락됨을 나타냅니다. 영어의 'may/can'에 해당합니다.",
      en: "Expresses permission, equivalent to 'may' or 'can'.",
    },
    examples: [
      { sentence: "여기 앉아도 돼요?", translation: "May I sit here?" },
      { sentence: "지금 가도 돼요.", translation: "You may go now." },
    ],
    quiz: {
      sentence: "사진을 찍[blank] 돼요",
      blank: "[blank]",
      hint: "허락을 구하는 표현",
      correctAnswer: "어도",
      options: ["어도", "으면", "어서", "고"],
    },
  },
  {
    id: "g041",
    pattern: "-(으)ㄹ까요?",
    name: "제안/추측 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "제안하거나 추측을 나타냅니다. 'Shall we ~?' 또는 'I wonder ~'와 비슷합니다.",
      en: "Expresses suggestion or speculation, equivalent to 'Shall we ~?' or 'I wonder ~'.",
    },
    examples: [
      { sentence: "같이 갈까요?", translation: "Shall we go together?" },
      { sentence: "비가 올까요?", translation: "I wonder if it will rain." },
    ],
    quiz: {
      sentence: "오늘 뭐 먹[blank]",
      blank: "[blank]",
      hint: "제안하는 표현",
      correctAnswer: "을까요",
      options: ["을까요", "었어요", "고 싶어요", "어요"],
    },
  },
  {
    id: "g042",
    pattern: "-지요?",
    name: "확인 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "이미 알고 있는 사실을 확인할 때 사용합니다. 영어의 부가 의문문(tag question)과 비슷합니다.",
      en: "Used to confirm something already known, similar to English tag questions.",
    },
    examples: [
      { sentence: "오늘 날씨가 좋지요?", translation: "The weather is nice today, isn't it?" },
      { sentence: "한국 사람이지요?", translation: "You're Korean, right?" },
    ],
    quiz: {
      sentence: "이거 맛있[blank]",
      blank: "[blank]",
      hint: "확인하는 표현",
      correctAnswer: "지요",
      options: ["지요", "어요", "을까요", "네요"],
    },
  },
  {
    id: "g043",
    pattern: "-(으)면서",
    name: "동시 동작 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "두 동작이 동시에 일어남을 나타냅니다. 영어의 'while ~ing'에 해당합니다.",
      en: "Expresses two actions occurring at the same time, equivalent to 'while ~ing'.",
    },
    examples: [
      { sentence: "음악을 들으면서 공부해요.", translation: "I study while listening to music." },
      { sentence: "걸으면서 전화해요.", translation: "I talk on the phone while walking." },
    ],
    quiz: {
      sentence: "텔레비전을 보[blank] 밥을 먹어요",
      blank: "[blank]",
      hint: "동시 동작을 나타내는 표현",
      correctAnswer: "면서",
      options: ["면서", "고 나서", "기 전에", "어서"],
    },
  },
  {
    id: "g044",
    pattern: "-네요",
    name: "감탄 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "새롭게 알게 된 사실에 대한 감탄이나 반응을 나타냅니다.",
      en: "Expresses surprise or reaction to newly discovered information.",
    },
    examples: [
      { sentence: "정말 예쁘네요!", translation: "It's really pretty!" },
      { sentence: "한국말을 잘하시네요.", translation: "You speak Korean well!" },
    ],
    quiz: {
      sentence: "음식이 정말 맛있[blank]",
      blank: "[blank]",
      hint: "감탄을 나타내는 표현",
      correctAnswer: "네요",
      options: ["네요", "지요", "을까요", "어요"],
    },
  },
  {
    id: "g045",
    pattern: "-(으)려고 하다",
    name: "의도 표현",
    category: "expression",
    level: 2,
    explanation: {
      ko: "어떤 행동을 할 의도를 나타냅니다. 영어의 'intend to', 'be going to'에 해당합니다.",
      en: "Expresses intention to do something, equivalent to 'intend to' or 'be going to'.",
    },
    examples: [
      { sentence: "내년에 한국에 가려고 해요.", translation: "I intend to go to Korea next year." },
      { sentence: "운동을 시작하려고 해요.", translation: "I'm planning to start exercising." },
    ],
    quiz: {
      sentence: "주말에 영화를 보[blank] 해요",
      blank: "[blank]",
      hint: "의도를 나타내는 표현",
      correctAnswer: "려고",
      options: ["려고", "어서", "면서", "지만"],
    },
  },
];

// 카테고리 목록
export const grammarCategories = [
  { id: "particle", name: "조사", nameEn: "Particles", icon: "🔗", count: 15 },
  { id: "ending", name: "어미", nameEn: "Endings", icon: "📝", count: 14 },
  { id: "expression", name: "표현", nameEn: "Expressions", icon: "💬", count: 16 },
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
