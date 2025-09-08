
    // ===== Data (SAMPLE from your message) =====
    // Each item: ko = keyword, en = English meaning, tl = Tagalog meaning, count = frequency in book,
    // koSentence/enSentence/tlSentence = example sentences.
    const ITEMS = [
      {
        ko: "있습니다", en: "There is/There are", tl: "Mayroon", count: 544,
        koSentence: "구두가 두 켤레 있습니다.",
        enSentence: "There are two pairs of shoes.",
        tlSentence: "May dalawang pares ng sapatos."
      },
      {
        ko: "합니다", en: "Do", tl: "Ginagawa", count: 262,
        koSentence: "차가 밀려서 교통이 복잡합니다.",
        enSentence: "Traffic is heavy because cars are backed up.",
        tlSentence: "Mabigat ang trapiko dahil nagsisiksikan ang mga sasakyan."
      },
      {
        ko: "다음", en: "Next", tl: "Susunod", count: 196,
        koSentence: "다음 그림을 보고 맞는 단어나 문장을 고르십시오.",
        enSentence: "Look at the next picture and choose the correct word or sentence.",
        tlSentence: "Tingnan ang susunod na larawan at piliin ang tamang salita o pangungusap."
      },
      {
        ko: "있는", en: "Existing", tl: "Mayroon", count: 172,
        koSentence: "이곳은 담배를 피울 수 있는 흡연실입니다.",
        enSentence: "This is a smoking room where you can smoke.",
        tlSentence: "Ito ay isang smoking room kung saan maaaring manigarilyo."
      },
      {
        ko: "고르십시오", en: "Please choose", tl: "Piliin po", count: 143,
        koSentence: "다음 그림을 보고 맞는 단어나 문장을 고르십시오.",
        enSentence: "Look at the next picture and choose the correct word or sentence.",
        tlSentence: "Tingnan ang susunod na larawan at piliin ang tamang salita o pangungusap."
      },
      {
        ko: "무엇입니까", en: "What is it?", tl: "Ano ito?", count: 128,
        koSentence: "다음 표지판이 있는 곳에서 반드시 지켜야 할 사항은 무엇입니까?",
        enSentence: "What must be observed where the following sign is located?",
        tlSentence: "Ano ang dapat sundin sa lugar na may sumusunod na karatula?"
      },
      {
        ko: "것을", en: "Thing (object marker)", tl: "Bagay", count: 124,
        koSentence: "빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
        enSentence: "Choose the most appropriate one to fill in the blank.",
        tlSentence: "Piliin ang pinakaangkop na bagay na ilalagay sa patlang."
      },
      {
        ko: "저는", en: "I am / I", tl: "Ako ay / Ako", count: 121,
        koSentence: "저는 구청에서 한국말을 배웠어요.",
        enSentence: "I learned Korean at the district office.",
        tlSentence: "Nag-aral ako ng Korean sa opisina ng distrito."
      },
      {
        ko: "많이", en: "A lot", tl: "Marami / Sobra", count: 106,
        koSentence: "괜찮아요 많이 아파 보여요?",
        enSentence: "Are you okay? Do you look like you're hurting a lot?",
        tlSentence: "Ayos ka lang ba? Mukha ka bang sobrang nasasaktan?"
      },
      {
        ko: "됩니다", en: "Becomes / turns into", tl: "Nagiging", count: 91,
        koSentence: "겨울이 되면 물이 얼음이 됩니다.",
        enSentence: "When winter comes, water becomes ice.",
        tlSentence: "Pagdating ng taglamig, ang tubig ay nagiging yelo."
      },
      {
        ko: "하고", en: "And (and do)", tl: "At / at gumagawa", count: 83,
        koSentence: "세 사람이 회의를 하고 있습니다.",
        enSentence: "Three people are holding a meeting.",
        tlSentence: "Tatlong tao ang nagpupulong."
      },
      {
        ko: "것은", en: "Thing (topic)", tl: "Bagay", count: 78,
        koSentence: "외국에 나가려면 이것이 반드시 있어야 해요.",
        enSentence: "You must have this to go abroad.",
        tlSentence: "Dapat mayroon ka nito para makapunta sa ibang bansa."
      },
      {
        ko: "지하철", en: "Subway", tl: "Subway", count: 41,
        koSentence: "저는 지하철을 타고 학교에 가요.",
        enSentence: "I take the subway to go to school.",
        tlSentence: "Sumasakay ako ng tren (subway) papuntang paaralan."
      },
	     {
    ko: "지금", en: "Now", tl: "Ngayon", count: 29,
    koSentence: "지금 바깥 날씨는 어때요?",
    enSentence: "How's the weather outside now?",
    tlSentence: "Kumusta ang panahon sa labas ngayon?"
  },
  {
    ko: "맞지 않는", en: "Not right", tl: "Hindi tama", count: 29,
    koSentence: "다음 사진에 대한 설명으로 맞지 않는것을 고르십시오.",
    enSentence: "Choose the explanation that is not correct for the following picture.",
    tlSentence: "Piliin ang paliwanag na hindi tama para sa sumusunod na larawan."
  },
  {
    ko: "여러", en: "Several", tl: "Ilang", count: 29,
    koSentence: "지금 인천행 이가 들어오고 있습니다.",
    enSentence: "The Incheon-bound train is currently arriving.",
    tlSentence: "Kasalukuyang dumarating ang tren papuntang Incheon."
  },
  {
    ko: "글과", en: "Text and", tl: "Teksto at", count: 29,
    koSentence: "다음 글과 관계 있는 표지판은 무엇입니까?",
    enSentence: "What sign is related to the following text?",
    tlSentence: "Anong karatula ang may kaugnayan sa sumusunod na teksto?"
  },
  {
    ko: "있습", en: "Is", tl: "Ay", count: 28,
    koSentence: "구두가 두 켤레 있습니다.",
    enSentence: "There are two pairs of shoes.",
    tlSentence: "May dalawang pares ng sapatos."
  },
  {
    ko: "자주", en: "Often", tl: "Madalas", count: 28,
    koSentence: "비가 자주 안 와서 반갑거든요?",
    enSentence: "I'm glad it doesn't rain often.",
    tlSentence: "Masaya ako na hindi madalas umulan."
  },
  {
    ko: "맞는", en: "Correct", tl: "Tama", count: 27,
    koSentence: "다음 그림을 보고 맞는 단어나 문장을 고르십시오.",
    enSentence: "Look at the next picture and choose the correct word or sentence.",
    tlSentence: "Tingnan ang susunod na larawan at piliin ang tamang salita o pangungusap."
  },
  {
    ko: "제가", en: "I", tl: "Ako", count: 27,
    koSentence: "제가 제일 좋아하는 것은 가을입니다.",
    enSentence: "My favorite season is autumn.",
    tlSentence: "Ang pinakapaborito kong panahon ay taglagas."
  },
  {
    ko: "오늘", en: "Today", tl: "Ngayon", count: 27,
    koSentence: "친구가 오늘 10시 비행기로 한국에 오기 때문에 마중 가요.",
    enSentence: "I'm going to pick up my friend because he's coming to Korea on a 10 o'clock flight today.",
    tlSentence: "Susunduin ko ang kaibigan ko dahil darating siya sa Korea sakay ng 10 o'clock flight ngayon."
  },
  {
    ko: "해요", en: "Do", tl: "Ginagawa", count: 27,
    koSentence: "오늘은 손으로 빨고 내일 수리 센터에 전화해요.",
    enSentence: "Wash it by hand today and call the repair center tomorrow.",
    tlSentence: "Labahan ito sa kamay ngayon at tawagan ang repair center bukas."
  },
  {
    ko: "사람", en: "Person", tl: "Tao", count: 27,
    koSentence: "세 사람이 회의를 하고 있습니다.",
    enSentence: "Three people are holding a meeting.",
    tlSentence: "Tatlong tao ang nagpupulong."
  },
  {
    ko: "만든", en: "Made", tl: "Ginawa", count: 27,
    koSentence: "사람들이 안전하게 지나다닐 수 있도록 만든 길입니다.",
    enSentence: "It is a road made for people to pass safely.",
    tlSentence: "Ito ay isang daan na ginawa para makadaan nang ligtas ang mga tao."
  },
  {
    ko: "다섯", en: "Five", tl: "Lima", count: 26,
    koSentence: "구두가 다섯 켤레 있습니다.",
    enSentence: "There are five pairs of shoes.",
    tlSentence: "May limang pares ng sapatos."
  },
  {
    ko: "쓰는", en: "Using", tl: "Gumagamit", count: 26,
    koSentence: "계산할 때 쓰는 계산기입니다.",
    enSentence: "It is a calculator used for calculations.",
    tlSentence: "Ito ay isang calculator na ginagamit sa pagkuwenta."
  },
  {
    ko: "가서", en: "Go and", tl: "Pumunta at", count: 26,
    koSentence: "시장에 가서 무엇을 샀어요?",
    enSentence: "What did you buy at the market?",
    tlSentence: "Ano ang binili mo sa palengke?"
  },
  {
    ko: "후에", en: "After", tl: "Pagkatapos", count: 26,
    koSentence: "하루 세 드세요 아침 점심 저녁 식사 후에 드시면 됩니다.",
    enSentence: "Take it three times a day. You can take it after breakfast, lunch, and dinner.",
    tlSentence: "Inumin ito tatlong beses sa isang araw. Maaari itong inumin pagkatapos ng almusal, tanghalian, at hapunan."
  },
  {
    ko: "먼저", en: "First", tl: "Una", count: 26,
    koSentence: "먼저 들어가세요.",
    enSentence: "Please go in first.",
    tlSentence: "Pumasok ka muna."
  },
  {
    ko: "설명한", en: "Explained", tl: "Ipinaliwanag", count: 26,
    koSentence: "다음 표지를 맞게 설명한 것을 고르십시오.",
    enSentence: "Choose the correct explanation for the following sign.",
    tlSentence: "Piliin ang tamang paliwanag para sa sumusunod na karatula."
  },
  {
    ko: "버스", en: "Bus", tl: "Bus", count: 25,
    koSentence: "고속버스",
    enSentence: "Express bus",
    tlSentence: "Express bus"
  },
  {
    ko: "동안", en: "During", tl: "Sa panahon ng", count: 25,
    koSentence: "삼 주 동안 공부했습니다.",
    enSentence: "I studied for three weeks.",
    tlSentence: "Nag-aral ako sa loob ng tatlong linggo."
  },
  {
    ko: "옷을", en: "Clothes", tl: "Damit", count: 25,
    koSentence: "사람들이 옷을 고르고 있습니다.",
    enSentence: "People are choosing clothes.",
    tlSentence: "Namimili ng damit ang mga tao."
  },
  {
    ko: "입니다", en: "Is", tl: "Ay", count: 25,
    koSentence: "냉장고입니다.",
    enSentence: "It is a refrigerator.",
    tlSentence: "Ito ay isang refrigerator."
  },
  {
    ko: "오늘은", en: "Today", tl: "Ngayon", count: 25,
    koSentence: "오늘은 9월 11일입니다.",
    enSentence: "Today is September 11th.",
    tlSentence: "Ngayon ay Setyembre 11."
  },
  {
    ko: "먹습니다", en: "Eat", tl: "Kumain", count: 25,
    koSentence: "한국 사람은 밥하고 김치, 고기, 생선, 나물 같은 것을 먹습니다.",
    enSentence: "Koreans eat things like rice, kimchi, meat, fish, and seasoned vegetables.",
    tlSentence: "Kumakain ang mga Koreano ng mga bagay tulad ng kanin, kimchi, karne, isda, at gulay."
  },
  {
    ko: "아침", en: "Morning", tl: "Umaga", count: 25,
    koSentence: "아침에 일어나니까 가 많이 아팠습니다.",
    enSentence: "When I woke up in the morning, I was very sick.",
    tlSentence: "Nang magising ako sa umaga, masakit ang aking katawan."
  },
  {
    ko: "표를", en: "Ticket", tl: "Tiket", count: 25,
    koSentence: "이곳은 버스표를 파는 매표소입니다.",
    enSentence: "This is a ticket office that sells bus tickets.",
    tlSentence: "Ito ay isang takilya na nagbebenta ng tiket ng bus."
  },
  {
    ko: "빨리", en: "Quickly", tl: "Mabilis", count: 25,
    koSentence: "빨리 분실물 센터에 가 보세요.",
    enSentence: "Go to the lost and found center quickly.",
    tlSentence: "Pumunta ka agad sa lost and found center."
  },
  {
    ko: "이번", en: "This time", tl: "Ngayong", count: 25,
    koSentence: "이번 역은 신설동, 신설동역입니다.",
    enSentence: "This stop is Sinseoldong, Sinseoldong Station.",
    tlSentence: "Ang istasyong ito ay Sinseoldong, Sinseoldong Station."
  },
  {
    ko: "운동을", en: "Exercise", tl: "Ehersisyo", count: 24,
    koSentence: "목을 돌리는 운동을 하고 있습니다.",
    enSentence: "I am doing neck rotation exercises.",
    tlSentence: "Ginagawa ko ang ehersisyo sa pag-ikot ng leeg."
  },
  {
    ko: "사람의", en: "Of a person", tl: "Ng isang tao", count: 24,
    koSentence: "추락 사고를 막고 지나다니는 사람의",
    enSentence: "Preventing falls and preventing people from passing by.",
    tlSentence: "Pinipigilan ang pagkahulog at pinipigilan ang pagdaan ng mga tao."
  },
  {
    ko: "한국에", en: "To Korea", tl: "Sa Korea", count: 24,
    koSentence: "친구가 오늘 10시 비행기로 한국에 오기 때문에 마중 가요.",
    enSentence: "I'm going to pick up my friend because he's coming to Korea on a 10 o'clock flight today.",
    tlSentence: "Susunduin ko ang kaibigan ko dahil darating siya sa Korea sakay ng 10 o'clock flight ngayon."
  },
  {
    ko: "언제", en: "When", tl: "Kailan", count: 24,
    koSentence: "한복은 언제 입어요?",
    enSentence: "When do you wear Hanbok?",
    tlSentence: "Kailan ka nagsusuot ng Hanbok?"
  },
  {
    ko: "가면", en: "If you go", tl: "Kung pupunta ka", count: 24,
    koSentence: "두 정거장만 가면 돼요.",
    enSentence: "You only need to go two stops.",
    tlSentence: "Dalawang istasyon lang ang kailangan mong puntahan."
  },
  {
    ko: "타고", en: "Riding", tl: "Nakasakay", count: 23,
    koSentence: "사람들이 강변에서 자전거를 타고 있습니다.",
    enSentence: "People are riding bicycles by the river.",
    tlSentence: "Ang mga tao ay nagbibisikleta sa tabi ng ilog."
  },
  {
    ko: "전화를", en: "Phone call", tl: "Tawag sa telepono", count: 23,
    koSentence: "벤치에 앉아서 전화를 걸고 있습니다.",
    enSentence: "I am sitting on a bench and making a phone call.",
    tlSentence: "Nakaupo ako sa bangko at tumatawag sa telepono."
  },
  {
    ko: "이것은", en: "This (topic)", tl: "Ito ay", count: 23,
    koSentence: "이곳은 짐을 맡기는 보관소입니다.",
    enSentence: "This is a storage area where you can store your luggage.",
    tlSentence: "Ito ay isang imbakan kung saan maaaring mag-imbak ng bagahe."
  },
  {
    ko: "함께", en: "Together", tl: "Sama-sama", count: 23,
    koSentence: "직장 동료들과 함께 회사 에서 살아요.",
    enSentence: "I live with my colleagues at the company.",
    tlSentence: "Nakikipag-ugnayan ako sa aking mga kasamahan sa trabaho sa kumpanya."
  },
  {
    ko: "곳입니다", en: "Place", tl: "Lugar", count: 23,
    koSentence: "구멍을 뚫을 수 있는 송곳입니다.",
    enSentence: "It is an awl that can make holes.",
    tlSentence: "Ito ay isang panusok na maaaring gumawa ng butas."
  },
  {
    ko: "그렇지만", en: "But", tl: "Ngunit", count: 23,
    koSentence: "그렇지만 소고기와 닭고기는 좋아해요.",
    enSentence: "But I like beef and chicken.",
    tlSentence: "Ngunit gusto ko ang baka at manok."
  },
  {
    ko: "오전", en: "Morning", tl: "Umaga", count: 23,
    koSentence: "이 서류를 오전 중으로 사무실에 보내야 하는데 어떻게 하지요?",
    enSentence: "I need to send this document to the office by noon. What should I do?",
    tlSentence: "Kailangan kong ipadala ang dokumentong ito sa opisina bago magtanghali. Ano ang gagawin ko?"
  },
  {
    ko: "해야", en: "Must do", tl: "Dapat gawin", count: 23,
    koSentence: "공공장소는깨끗이사용해야합니다.",
    enSentence: "Public places must be used cleanly.",
    tlSentence: "Dapat gamitin nang malinis ang mga pampublikong lugar."
  },
  {
    ko: "여기에서", en: "From here", tl: "Mula dito", count: 23,
    koSentence: "여기에서 담배를 안 됩니다.",
    enSentence: "You can't smoke here.",
    tlSentence: "Bawal manigarilyo dito."
  },
  {
    ko: "가지", en: "Eggplant", tl: "Talong", count: 23,
    koSentence: "바가지입니다.",
    enSentence: "It is a scoop.",
    tlSentence: "Ito ay isang panalok."
  },
  {
    ko: "안전", en: "Safety", tl: "Kaligtasan", count: 23,
    koSentence: "안전모입니다.",
    enSentence: "It is a safety helmet.",
    tlSentence: "Ito ay isang safety helmet."
  },
  {
    ko: "뜻입니까", en: "Meaning", tl: "Ibig sabihin", count: 23,
    koSentence: "이 표지는 무슨 뜻입니까?",
    enSentence: "What does this sign mean?",
    tlSentence: "Ano ang ibig sabihin ng karatula na ito?"
  },
  {
    ko: "물을", en: "Water", tl: "Tubig", count: 22,
    koSentence: "컵에 든 물을 마시고 있습니다.",
    enSentence: "I am drinking water from a cup.",
    tlSentence: "Umiinom ako ng tubig mula sa tasa."
  },
  {
    ko: "사람을", en: "Person", tl: "Tao", count: 22,
    koSentence: "소방관들이 다친 사람을 구해 내고 있습니다.",
    enSentence: "Firefighters are rescuing injured people.",
    tlSentence: "Nililigtas ng mga bumbero ang mga nasugatang tao."
  },
  {
    ko: "주는", en: "Giving", tl: "Nagbibigay", count: 22,
    koSentence: "켜 주는 안전대입니다.",
    enSentence: "It is a safety belt that turns on.",
    tlSentence: "Ito ay isang safety belt na umiilaw."
  },
  {
    ko: "위해", en: "For", tl: "Para sa", count: 22,
    koSentence: "하기 위해 입는 방열복입니다.",
    enSentence: "It is a heat-resistant suit worn for.",
    tlSentence: "Ito ay isang heat-resistant suit na isinusuot para sa."
  },
  {
    ko: "병원", en: "Hospital", tl: "Ospital", count: 22,
    koSentence: "약 병원 기침 감기",
    enSentence: "Medicine, hospital, cough, cold",
    tlSentence: "Gamot, ospital, ubo, sipon"
  },
  {
    ko: "돼요", en: "Becomes", tl: "Nagiging", count: 22,
    koSentence: "우산을 가지고 나가야 돼요.",
    enSentence: "I have to take an umbrella with me.",
    tlSentence: "Kailangan kong magdala ng payong."
  },
  {
    ko: "만드는", en: "Making", tl: "Gumagawa", count: 22,
    koSentence: "저는 공장에서 텔레비전을 만드는 일을 해요.",
    enSentence: "I work at a factory making televisions.",
    tlSentence: "Nagtatrabaho ako sa isang pabrika na gumagawa ng mga telebisyon."
  },
  {
    ko: "남자가", en: "Man", tl: "Lalaki", count: 21,
    koSentence: "다 남자가다섯명 여자가두명입니다.",
    enSentence: "There are five men and two women.",
    tlSentence: "Mayroong limang lalaki at dalawang babae."
  },
  {
    ko: "지폐가", en: "Banknote", tl: "Papel na pera", count: 21,
    koSentence: "만 원짜리 지폐가 한 장 있습니다.",
    enSentence: "There is one 10,000 won banknote.",
    tlSentence: "May isang 10,000 won na papel na pera."
  },
  {
    ko: "영화를", en: "Movie", tl: "Pelikula", count: 21,
    koSentence: "사람들이 영화를 보고 있습니다.",
    enSentence: "People are watching a movie.",
    tlSentence: "Nanood ng pelikula ang mga tao."
  },
  {
    ko: "집을", en: "House", tl: "Bahay", count: 21,
    koSentence: "물건을 집을 때 쓰는 집게입니다.",
    enSentence: "It is a tong used to pick up things.",
    tlSentence: "Ito ay isang sipit na ginagamit sa pagkuha ng mga bagay."
  },
  {
    ko: "알맞은", en: "Appropriate", tl: "Angkop", count: 21,
    koSentence: "빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
    enSentence: "Choose the most appropriate one to fill in the blank.",
    tlSentence: "Piliin ang pinakaangkop na bagay na ilalagay sa patlang."
  },
  {
    ko: "먹는", en: "Eating", tl: "Kumakain", count: 21,
    koSentence: "주로 여름철에 많이 먹는데 아주 달아요.",
    enSentence: "It is mostly eaten in summer and is very sweet.",
    tlSentence: "Karaniwan itong kinakain sa tag-araw at napakatamis."
  },
  {
    ko: "시에", en: "At [time]", tl: "Sa [oras]", count: 21,
    koSentence: "11시에 출발해요.",
    enSentence: "It departs at 11 o'clock.",
    tlSentence: "Aalis ito ng ika-11."
  },
  {
    ko: "일합니다", en: "Work", tl: "Nagtatrabaho", count: 21,
    koSentence: "저는 월요일부터 토요일까지 공장에서 일합니다.",
    enSentence: "I work at the factory from Monday to Saturday.",
    tlSentence: "Nagtatrabaho ako sa pabrika mula Lunes hanggang Sabado."
  },
  {
    ko: "오른쪽으로", en: "To the right", tl: "Pakanan", count: 21,
    koSentence: "저 앞 횡단보도에서 길을 오른쪽으로 가세요.",
    enSentence: "At the crosswalk ahead, turn right.",
    tlSentence: "Sa tawiran sa harap, lumiko pakanan."
  },
  {
    ko: "좋은", en: "Good", tl: "Mabuti", count: 21,
    koSentence: "지하철역 근처에 좋은 집이 하나 있어요.",
    enSentence: "There is a good house near the subway station.",
    tlSentence: "May isang magandang bahay malapit sa istasyon ng subway."
  },
  {
    ko: "있습니까", en: "Is there?", tl: "Mayroon ba?", count: 21,
    koSentence: "가방 안에 무엇이 들어 있습니까?",
    enSentence: "What is in the bag?",
    tlSentence: "Ano ang nasa loob ng bag?"
  },
  {
    ko: "일하는", en: "Working", tl: "Nagtatrabaho", count: 21,
    koSentence: "여기에서일하는사람이아니면들어갈수없습니다.",
    enSentence: "You cannot enter if you are not a person working here.",
    tlSentence: "Hindi ka maaaring pumasok kung hindi ka nagtatrabaho dito."
  },
  {
    ko: "갔습니다", en: "Went", tl: "Pumunta", count: 21,
    koSentence: "쪽으로 갔습니다.",
    enSentence: "I went to that direction.",
    tlSentence: "Pumunta ako sa direksyong iyon."
  },
  {
    ko: "불이", en: "Fire", tl: "Apoy", count: 20,
    koSentence: "불이 났습니다.",
    enSentence: "A fire broke out.",
    tlSentence: "Nagkaroon ng sunog."
  },
  {
    ko: "담배를", en: "Cigarette", tl: "Sigarilyo", count: 20,
    koSentence: "이곳은 담배를 피울 수 있는 흡연실입니다.",
    enSentence: "This is a smoking room where you can smoke.",
    tlSentence: "Ito ay isang smoking room kung saan maaaring manigarilyo."
  },
  {
    ko: "문제", en: "Problem", tl: "Problema", count: 20,
    koSentence: "시험에 어려운 문제가 많았어요.",
    enSentence: "There were many difficult questions on the exam.",
    tlSentence: "Maraming mahihirap na tanong sa pagsusulit."
  }


    ];

    // ===== Speech (Korean TTS via Web Speech API) =====
    let voices = [];
    function loadVoices(){
      voices = window.speechSynthesis.getVoices();
      if(!voices.length){
        // Some browsers load asynchronously
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
        };
      }
    }
    loadVoices();

    function getKoVoice(){
      if(!voices || !voices.length) voices = window.speechSynthesis.getVoices();
      // Prefer ko-KR voices
      const ko = voices.find(v => /ko/i.test(v.lang)) || voices.find(v => /ko/i.test(v.name || ""));
      return ko || voices[0] || null;
    }

    function speakKorean(text, {rate=1, pitch=1}={}){
      if(!text) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ko-KR';
      const v = getKoVoice();
      if(v) u.voice = v;
      u.rate = rate; u.pitch = pitch;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }

    // ===== Render =====
    const $list = document.getElementById('list');

    function itemTemplate(item, idx){
      const title = `${item.ko} (${item.en}/${item.tl})`;
      return `
        <article class="item" data-idx="${idx}">
          <div class="topline">
            <div class="ko" aria-label="Korean keyword">${item.ko}</div>
            <div class="mean">(${item.en} / ${item.tl})</div>
            <div class="count" title="Count in book">${item.count}</div>
          </div>

          <div class="row korean"><span class="lbl">Korean:</span> <span class="ko-sent">${item.koSentence}</span></div>
          <div class="row"><span class="lbl">English:</span> <span>${item.enSentence}</span></div>
          <div class="row"><span class="lbl">Tagalog:</span> <span>${item.tlSentence}</span></div>

          <div class="btns">
            <button class="play-word" type="button" aria-label="Play Korean word"><span aria-hidden="true">🔊</span> Play Word</button>
            <button class="play-sent" type="button" aria-label="Play Korean sentence"><span aria-hidden="true">🔊</span> Play Sentence</button>
            <button class="play-both" type="button" aria-label="Play word then sentence"><span aria-hidden="true">▶</span> Play Both</button>
          </div>
        </article>
      `;
    }

    function render(items=ITEMS){
      $list.innerHTML = items.map(itemTemplate).join('');
      $list.querySelectorAll('.item').forEach($it => {
        const idx = +$it.dataset.idx;
        const data = items[idx];
        $it.querySelector('.play-word').addEventListener('click', () => speakKorean(data.ko, {rate:1}));
        $it.querySelector('.play-sent').addEventListener('click', () => speakKorean(data.koSentence, {rate:0.95}));
        $it.querySelector('.play-both').addEventListener('click', async () => {
          speakKorean(data.ko, {rate:1});
          await waitMs(850);
          speakKorean(data.koSentence, {rate:0.95});
        });
      });
    }

    function waitMs(ms){ return new Promise(res => setTimeout(res, ms)); }

    render();
