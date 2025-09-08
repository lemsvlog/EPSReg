const WORDS_MASTER = [
  {
    "ko": "청소(하다)",
    "en": "to clean / maglinis",
    "present": { "ko": "청소해요", "en": "clean / naglilinis" },
    "past": { "ko": "청소했어요", "en": "cleaned / naglinis na" },
    "future": { "ko": "청소할 거예요", "en": "will clean / maglilinis" },
    "page": 104,
    "book": 1
  },
  {
    "ko": "덥다",
    "en": "to be hot / mainit",
    "present": { "ko": "더워요", "en": "is hot / mainit" },
    "past": { "ko": "더웠어요", "en": "was hot / naging mainit" },
    "future": { "ko": "더울 거예요", "en": "will be hot / magiging mainit" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "따뜻하다",
    "en": "to be warm / mainit-init",
    "present": { "ko": "따뜻해요", "en": "is warm / mainit-init" },
    "past": { "ko": "따뜻했어요", "en": "was warm / naging mainit-init" },
    "future": { "ko": "따뜻할 거예요", "en": "will be warm / magiging mainit-init" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "뜨겁다",
    "en": "to be hot (for objects) / mainit (para sa bagay)",
    "present": { "ko": "뜨거워요", "en": "is hot / mainit" },
    "past": { "ko": "뜨거웠어요", "en": "was hot / naging mainit" },
    "future": { "ko": "뜨거울 거예요", "en": "will be hot / magiging mainit" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "쉽다",
    "en": "to be easy / madali",
    "present": { "ko": "쉬워요", "en": "is easy / madali" },
    "past": { "ko": "쉬웠어요", "en": "was easy / naging madali" },
    "future": { "ko": "쉬울 거예요", "en": "will be easy / magiging madali" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "시원하다",
    "en": "to be cool / malamig",
    "present": { "ko": "시원해요", "en": "is cool / malamig" },
    "past": { "ko": "시원했어요", "en": "was cool / naging malamig" },
    "future": { "ko": "시원할 거예요", "en": "will be cool / magiging malamig" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "어렵다",
    "en": "to be difficult / mahirap",
    "present": { "ko": "어려워요", "en": "is difficult / mahirap" },
    "past": { "ko": "어려웠어요", "en": "was difficult / naging mahirap" },
    "future": { "ko": "어려울 거예요", "en": "will be difficult / magiging mahirap" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "차갑다",
    "en": "to be cold (for objects) / malamig (para sa bagay)",
    "present": { "ko": "차가워요", "en": "is cold / malamig" },
    "past": { "ko": "차가웠어요", "en": "was cold / naging malamig" },
    "future": { "ko": "차가울 거예요", "en": "will be cold / magiging malamig" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "춥다",
    "en": "to be cold / malamig",
    "present": { "ko": "추워요", "en": "is cold / malamig" },
    "past": { "ko": "추웠어요", "en": "was cold / naging malamig" },
    "future": { "ko": "추울 거예요", "en": "will be cold / magiging malamig" },
    "page": 111,
    "book": 1
  },
  {
    "ko": "나쁘다",
    "en": "to be bad / masama",
    "present": { "ko": "나빠요", "en": "is bad / masama" },
    "past": { "ko": "나빴어요", "en": "was bad / naging masama" },
    "future": { "ko": "나쁠 거예요", "en": "will be bad / magiging masama" },
    "page": 114,
    "book": 1
  },
  {
    "ko": "맑다",
    "en": "to be clear / malinaw",
    "present": { "ko": "맑아요", "en": "is clear / malinaw" },
    "past": { "ko": "맑았어요", "en": "was clear / naging malinaw" },
    "future": { "ko": "맑을 거예요", "en": "will be clear / magiging malinaw" },
    "page": 114,
    "book": 1
  },
  {
    "ko": "바람이 불다",
    "en": "to be windy / mahangin",
    "present": { "ko": "바람이 불어요", "en": "is windy / mahangin" },
    "past": { "ko": "바람이 불었어요", "en": "was windy / naging mahangin" },
    "future": { "ko": "바람이 불 거예요", "en": "will be windy / magiging mahangin" },
    "page": 114,
    "book": 1
  },
  {
    "ko": "좋다",
    "en": "to be good / mabuti",
    "present": { "ko": "좋아요", "en": "is good / mabuti" },
    "past": { "ko": "좋았어요", "en": "was good / naging mabuti" },
    "future": { "ko": "좋을 거예요", "en": "will be good / magiging mabuti" },
    "page": 114,
    "book": 1
  },
  {
    "ko": "흐리다",
    "en": "to be cloudy / maulap",
    "present": { "ko": "흐려요", "en": "is cloudy / maulap" },
    "past": { "ko": "흐렸어요", "en": "was cloudy / naging maulap" },
    "future": { "ko": "흐릴 거예요", "en": "will be cloudy / magiging maulap" },
    "page": 114,
    "book": 1
  },
  {
    "ko": "아프다",
    "en": "to be sick / may sakit",
    "present": { "ko": "아파요", "en": "is sick / may sakit" },
    "past": { "ko": "아팠어요", "en": "was sick / nagkasakit" },
    "future": { "ko": "아플 거예요", "en": "will be sick / magkakasakit" },
    "page": 121,
    "book": 1
  },
  {
    "ko": "편찮으시다",
    "en": "to be sick (honorific) / may sakit (magalang)",
    "present": { "ko": "편찮으세요", "en": "is sick (honorific) / may sakit (magalang)" },
    "past": { "ko": "편찮으셨어요", "en": "was sick (honorific) / nagkasakit (magalang)" },
    "future": { "ko": "편찮으실 거예요", "en": "will be sick (honorific) / magkakasakit (magalang)" },
    "page": 121,
    "book": 1
  },
  {
    "ko": "귀엽다",
    "en": "to be cute / cute",
    "present": { "ko": "귀여워요", "en": "is cute / cute" },
    "past": { "ko": "귀여웠어요", "en": "was cute / naging cute" },
    "future": { "ko": "귀여울 거예요", "en": "will be cute / magiging cute" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "길다",
    "en": "to be long / mahaba",
    "present": { "ko": "길어요", "en": "is long / mahaba" },
    "past": { "ko": "길었어요", "en": "was long / naging mahaba" },
    "future": { "ko": "길 거예요", "en": "will be long / magiging mahaba" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "똑똑하다",
    "en": "to be smart / matalino",
    "present": { "ko": "똑똑해요", "en": "is smart / matalino" },
    "past": { "ko": "똑똑했어요", "en": "was smart / naging matalino" },
    "future": { "ko": "똑똑할 거예요", "en": "will be smart / magiging matalino" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "멋있다",
    "en": "to be good-looking / guwapo",
    "present": { "ko": "멋있어요", "en": "is good-looking / guwapo" },
    "past": { "ko": "멋있었어요", "en": "was good-looking / naging guwapo" },
    "future": { "ko": "멋있을 거예요", "en": "will be good-looking / magiging guwapo" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "성격이 급하다",
    "en": "to be impatient / mainitin ang ulo",
    "present": { "ko": "성격이 급해요", "en": "is impatient / mainitin ang ulo" },
    "past": { "ko": "성격이 급했어요", "en": "was impatient / naging mainitin ang ulo" },
    "future": { "ko": "성격이 급할 거예요", "en": "will be impatient / magiging mainitin ang ulo" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "얌전하다",
    "en": "to be calm / mahinahon",
    "present": { "ko": "얌전해요", "en": "is calm / mahinahon" },
    "past": { "ko": "얌전했어요", "en": "was calm / naging mahinahon" },
    "future": { "ko": "얌전할 거예요", "en": "will be calm / magiging mahinahon" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "예쁘다",
    "en": "to be pretty / maganda",
    "present": { "ko": "예뻐요", "en": "is pretty / maganda" },
    "past": { "ko": "예뻤어요", "en": "was pretty / naging maganda" },
    "future": { "ko": "예쁠 거예요", "en": "will be pretty / magiging maganda" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "잘생기다",
    "en": "to be handsome / guwapo",
    "present": { "ko": "잘생겼어요", "en": "is handsome / guwapo" },
    "past": { "ko": "잘생겼어요", "en": "was handsome / naging guwapo" },
    "future": { "ko": "잘생길 거예요", "en": "will be handsome / magiging guwapo" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "재미있다",
    "en": "to be interesting / kawili-wili",
    "present": { "ko": "재미있어요", "en": "is interesting / kawili-wili" },
    "past": { "ko": "재미있었어요", "en": "was interesting / naging kawili-wili" },
    "future": { "ko": "재미있을 거예요", "en": "will be interesting / magiging kawili-wili" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "짧다",
    "en": "to be short / maikli",
    "present": { "ko": "짧아요", "en": "is short / maikli" },
    "past": { "ko": "짧았어요", "en": "was short / naging maikli" },
    "future": { "ko": "짧을 거예요", "en": "will be short / magiging maikli" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "착하다",
    "en": "to be nice / mabait",
    "present": { "ko": "착해요", "en": "is nice / mabait" },
    "past": { "ko": "착했어요", "en": "was nice / naging mabait" },
    "future": { "ko": "착할 거예요", "en": "will be nice / magiging mabait" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "친절하다",
    "en": "to be kind / mabuti",
    "present": { "ko": "친절해요", "en": "is kind / mabuti" },
    "past": { "ko": "친절했어요", "en": "was kind / naging mabuti" },
    "future": { "ko": "친절할 거예요", "en": "will be kind / magiging mabuti" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "키가 작다",
    "en": "to be short (height) / maliit (taas)",
    "present": { "ko": "키가 작아요", "en": "is short / maliit" },
    "past": { "ko": "키가 작았어요", "en": "was short / naging maliit" },
    "future": { "ko": "키가 작을 거예요", "en": "will be short / magiging maliit" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "키가 크다",
    "en": "to be tall / matangkad",
    "present": { "ko": "키가 커요", "en": "is tall / matangkad" },
    "past": { "ko": "키가 컸어요", "en": "was tall / naging matangkad" },
    "future": { "ko": "키가 클 거예요", "en": "will be tall / magiging matangkad" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "활발하다",
    "en": "to be active / masigla",
    "present": { "ko": "활발해요", "en": "is active / masigla" },
    "past": { "ko": "활발했어요", "en": "was active / naging masigla" },
    "future": { "ko": "활발할 거예요", "en": "will be active / magiging masigla" },
    "page": 124,
    "book": 1
  },
  {
    "ko": "맛없다",
    "en": "to be not delicious / hindi masarap",
    "present": { "ko": "맛없어요", "en": "is not delicious / hindi masarap" },
    "past": { "ko": "맛없었어요", "en": "was not delicious / hindi naging masarap" },
    "future": { "ko": "맛없을 거예요", "en": "will be not delicious / hindi magiging masarap" },
    "page": 131,
    "book": 1
  },
  {
    "ko": "맛있다",
    "en": "to be delicious / masarap",
    "present": { "ko": "맛있어요", "en": "is delicious / masarap" },
    "past": { "ko": "맛있었어요", "en": "was delicious / naging masarap" },
    "future": { "ko": "맛있을 거예요", "en": "will be delicious / magiging masarap" },
    "page": 131,
    "book": 1
  },
  {
    "ko": "가볍다",
    "en": "to be light / magaan",
    "present": { "ko": "가벼워요", "en": "is light / magaan" },
    "past": { "ko": "가벼웠어요", "en": "was light / naging magaan" },
    "future": { "ko": "가벼울 거예요", "en": "will be light / magiging magaan" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "많다",
    "en": "to be many/much / marami",
    "present": { "ko": "많아요", "en": "is many/much / marami" },
    "past": { "ko": "많았어요", "en": "was many/much / naging marami" },
    "future": { "ko": "많을 거예요", "en": "will be many/much / magiging marami" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "무겁다",
    "en": "to be heavy / mabigat",
    "present": { "ko": "무거워요", "en": "is heavy / mabigat" },
    "past": { "ko": "무거웠어요", "en": "was heavy / naging mabigat" },
    "future": { "ko": "무거울 거예요", "en": "will be heavy / magiging mabigat" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "비싸다",
    "en": "to be expensive / mahal",
    "present": { "ko": "비싸요", "en": "is expensive / mahal" },
    "past": { "ko": "비쌌어요", "en": "was expensive / naging mahal" },
    "future": { "ko": "비쌀 거예요", "en": "will be expensive / magiging mahal" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "상하다",
    "en": "to be spoiled / sira",
    "present": { "ko": "상해요", "en": "is spoiled / sira" },
    "past": { "ko": "상했어요", "en": "was spoiled / nasira" },
    "future": { "ko": "상할 거예요", "en": "will be spoiled / masisira" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "싱싱하다",
    "en": "to be fresh / sariwa",
    "present": { "ko": "싱싱해요", "en": "is fresh / sariwa" },
    "past": { "ko": "싱싱했어요", "en": "was fresh / naging sariwa" },
    "future": { "ko": "싱싱할 거예요", "en": "will be fresh / magiging sariwa" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "싸다",
    "en": "to be cheap / mura",
    "present": { "ko": "싸요", "en": "is cheap / mura" },
    "past": { "ko": "쌌어요", "en": "was cheap / naging mura" },
    "future": { "ko": "쌀 거예요", "en": "will be cheap / magiging mura" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "작다",
    "en": "to be small / maliit",
    "present": { "ko": "작아요", "en": "is small / maliit" },
    "past": { "ko": "작았어요", "en": "was small / naging maliit" },
    "future": { "ko": "작을 거예요", "en": "will be small / magiging maliit" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "적다",
    "en": "to be few / kaunti",
    "present": { "ko": "적어요", "en": "is few / kaunti" },
    "past": { "ko": "적었어요", "en": "was few / naging kaunti" },
    "future": { "ko": "적을 거예요", "en": "will be few / magiging kaunti" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "크다",
    "en": "to be big / malaki",
    "present": { "ko": "커요", "en": "is big / malaki" },
    "past": { "ko": "컸어요", "en": "was big / naging malaki" },
    "future": { "ko": "클 거예요", "en": "will be big / magiging malaki" },
    "page": 141,
    "book": 1
  },
  {
    "ko": "어지럽다",
    "en": "to be messy / magulo",
    "present": { "ko": "어지러워요", "en": "is messy / magulo" },
    "past": { "ko": "어지러웠어요", "en": "was messy / naging magulo" },
    "future": { "ko": "어지러울 거예요", "en": "will be messy / magiging magulo" },
    "page": 144,
    "book": 1
  },
  {
    "ko": "가깝다",
    "en": "to be close / malapit",
    "present": { "ko": "가까워요", "en": "is close / malapit" },
    "past": { "ko": "가까웠어요", "en": "was close / naging malapit" },
    "future": { "ko": "가까울 거예요", "en": "will be close / magiging malapit" },
    "page": 164,
    "book": 1
  },
  {
    "ko": "늦다",
    "en": "to be late / huli",
    "present": { "ko": "늦어요", "en": "is late / huli" },
    "past": { "ko": "늦었어요", "en": "was late / nahuli" },
    "future": { "ko": "늦을 거예요", "en": "will be late / mahuhuli" },
    "page": 164,
    "book": 1
  },
  {
    "ko": "멀다",
    "en": "to be far / malayo",
    "present": { "ko": "멀어요", "en": "is far / malayo" },
    "past": { "ko": "멀었어요", "en": "was far / naging malayo" },
    "future": { "ko": "멀 거예요", "en": "will be far / magiging malayo" },
    "page": 164,
    "book": 1
  },
  {
    "ko": "미안하다",
    "en": "to be sorry / pasensya na",
    "present": { "ko": "미안해요", "en": "is sorry / pasensya na" },
    "past": { "ko": "미안했어요", "en": "was sorry / nagpasensya" },
    "future": { "ko": "미안할 거예요", "en": "will be sorry / magpapasensya" },
    "page": 164,
    "book": 1
  },
  {
    "ko": "기쁘다",
    "en": "to be happy / masaya",
    "present": { "ko": "기뻐요", "en": "is happy / masaya" },
    "past": { "ko": "기뻤어요", "en": "was happy / naging masaya" },
    "future": { "ko": "기쁠 거예요", "en": "will be happy / magiging masaya" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "바쁘다",
    "en": "to be busy / abala",
    "present": { "ko": "바빠요", "en": "is busy / abala" },
    "past": { "ko": "바빴어요", "en": "was busy / naging abala" },
    "future": { "ko": "바쁠 거예요", "en": "will be busy / magiging abala" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "슬프다",
    "en": "to be sad / malungkot",
    "present": { "ko": "슬퍼요", "en": "is sad / malungkot" },
    "past": { "ko": "슬펐어요", "en": "was sad / naging malungkot" },
    "future": { "ko": "슬플 거예요", "en": "will be sad / magiging malungkot" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "심심하다",
    "en": "to be bored / nababato",
    "present": { "ko": "심심해요", "en": "is bored / nababato" },
    "past": { "ko": "심심했어요", "en": "was bored / nabato" },
    "future": { "ko": "심심할 거예요", "en": "will be bored / mababato" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "재미없다",
    "en": "to be uninteresting / hindi kawili-wili",
    "present": { "ko": "재미없어요", "en": "is uninteresting / hindi kawili-wili" },
    "past": { "ko": "재미없었어요", "en": "was uninteresting / hindi naging kawili-wili" },
    "future": { "ko": "재미없을 거예요", "en": "will be uninteresting / hindi magiging kawili-wili" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "즐겁다",
    "en": "to be enjoyable / kasiya-siya",
    "present": { "ko": "즐거워요", "en": "is enjoyable / kasiya-siya" },
    "past": { "ko": "즐거웠어요", "en": "was enjoyable / naging kasiya-siya" },
    "future": { "ko": "즐거울 거예요", "en": "will be enjoyable / magiging kasiya-siya" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "피곤하다",
    "en": "to be tired / pagod",
    "present": { "ko": "피곤해요", "en": "is tired / pagod" },
    "past": { "ko": "피곤했어요", "en": "was tired / napagod" },
    "future": { "ko": "피곤할 거예요", "en": "will be tired / mapapagod" },
    "page": 174,
    "book": 1
  },
  {
    "ko": "밝다",
    "en": "to be bright / maliwanag",
    "present": { "ko": "밝아요", "en": "is bright / maliwanag" },
    "past": { "ko": "밝았어요", "en": "was bright / naging maliwanag" },
    "future": { "ko": "밝을 거예요", "en": "will be bright / magiging maliwanag" },
    "page": 194,
    "book": 1
  },
  {
    "ko": "어둡다",
    "en": "to be dark / madilim",
    "present": { "ko": "어두워요", "en": "is dark / madilim" },
    "past": { "ko": "어두웠어요", "en": "was dark / naging madilim" },
    "future": { "ko": "어두울 거예요", "en": "will be dark / magiging madilim" },
    "page": 194,
    "book": 1
  },
  {
    "ko": "편하다",
    "en": "to be comfortable / kumportable",
    "present": { "ko": "편해요", "en": "is comfortable / kumportable" },
    "past": { "ko": "편했어요", "en": "was comfortable / naging kumportable" },
    "future": { "ko": "편할 거예요", "en": "will be comfortable / magiging kumportable" },
    "page": 201,
    "book": 1
  },
  {
    "ko": "깨끗하다",
    "en": "to be clean / malinis",
    "present": { "ko": "깨끗해요", "en": "is clean / malinis" },
    "past": { "ko": "깨끗했어요", "en": "was clean / naging malinis" },
    "future": { "ko": "깨끗할 거예요", "en": "will be clean / magiging malinis" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "넓다",
    "en": "to be spacious / maluwag",
    "present": { "ko": "넓어요", "en": "is spacious / maluwag" },
    "past": { "ko": "넓었어요", "en": "was spacious / naging maluwag" },
    "future": { "ko": "넓을 거예요", "en": "will be spacious / magiging maluwag" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "더럽다",
    "en": "to be dirty / marumi",
    "present": { "ko": "더러워요", "en": "is dirty / marumi" },
    "past": { "ko": "더러웠어요", "en": "was dirty / naging marumi" },
    "future": { "ko": "더러울 거예요", "en": "will be dirty / magiging marumi" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "부족하다",
    "en": "to be lacking / kulang",
    "present": { "ko": "부족해요", "en": "is lacking / kulang" },
    "past": { "ko": "부족했어요", "en": "was lacking / nagkulang" },
    "future": { "ko": "부족할 거예요", "en": "will be lacking / magkukulang" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "불편하다",
    "en": "to be inconvenient / hindi kumportable",
    "present": { "ko": "불편해요", "en": "is inconvenient / hindi kumportable" },
    "past": { "ko": "불편했어요", "en": "was inconvenient / naging hindi kumportable" },
    "future": { "ko": "불편할 거예요", "en": "will be inconvenient / magiging hindi kumportable" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "시끄럽다",
    "en": "to be noisy / maingay",
    "present": { "ko": "시끄러워요", "en": "is noisy / maingay" },
    "past": { "ko": "시끄러웠어요", "en": "was noisy / naging maingay" },
    "future": { "ko": "시끄러울 거예요", "en": "will be noisy / magiging maingay" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "조용하다",
    "en": "to be quiet / tahimik",
    "present": { "ko": "조용해요", "en": "is quiet / tahimik" },
    "past": { "ko": "조용했어요", "en": "was quiet / naging tahimik" },
    "future": { "ko": "조용할 거예요", "en": "will be quiet / magiging tahimik" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "좁다",
    "en": "to be narrow/small / makipot/maliit",
    "present": { "ko": "좁아요", "en": "is narrow/small / makipot/maliit" },
    "past": { "ko": "좁았어요", "en": "was narrow/small / naging makipot/maliit" },
    "future": { "ko": "좁을 거예요", "en": "will be narrow/small / magiging makipot/maliit" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "편리하다",
    "en": "to be convenient / maginhawa",
    "present": { "ko": "편리해요", "en": "is convenient / maginhawa" },
    "past": { "ko": "편리했어요", "en": "was convenient / naging maginhawa" },
    "future": { "ko": "편리할 거예요", "en": "will be convenient / magiging maginhawa" },
    "page": 204,
    "book": 1
  },
  {
    "ko": "경치가 좋다",
    "en": "to be scenic / magandang tanawin",
    "present": { "ko": "경치가 좋아요", "en": "is scenic / magandang tanawin" },
    "past": { "ko": "경치가 좋았어요", "en": "was scenic / naging magandang tanawin" },
    "future": { "ko": "경치가 좋을 거예요", "en": "will be scenic / magiging magandang tanawin" },
    "page": 214,
    "book": 1
  },
  {
    "ko": "아름답다",
    "en": "to be beautiful / maganda",
    "present": { "ko": "아름다워요", "en": "is beautiful / maganda" },
    "past": { "ko": "아름다웠어요", "en": "was beautiful / naging maganda" },
    "future": { "ko": "아름다울 거예요", "en": "will be beautiful / magiging maganda" },
    "page": 214,
    "book": 1
  },
  {
    "ko": "유명하다",
    "en": "to be famous / sikat",
    "present": { "ko": "유명해요", "en": "is famous / sikat" },
    "past": { "ko": "유명했어요", "en": "was famous / naging sikat" },
    "future": { "ko": "유명할 거예요", "en": "will be famous / magiging sikat" },
    "page": 214,
    "book": 1
  },
  {
    "ko": "힘들다",
    "en": "to be difficult / mahirap",
    "present": { "ko": "힘들어요", "en": "is difficult / mahirap" },
    "past": { "ko": "힘들었어요", "en": "was difficult / naging mahirap" },
    "future": { "ko": "힘들 거예요", "en": "will be difficult / magiging mahirap" },
    "page": 220,
    "book": 1
  },
  {
    "ko": "고소하다",
    "en": "to be nutty / malasa (parang mani)",
    "present": { "ko": "고소해요", "en": "is nutty / malasa (parang mani)" },
    "past": { "ko": "고소했어요", "en": "was nutty / naging malasa (parang mani)" },
    "future": { "ko": "고소할 거예요", "en": "will be nutty / magiging malasa (parang mani)" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "달다",
    "en": "to be sweet / matamis",
    "present": { "ko": "달아요", "en": "is sweet / matamis" },
    "past": { "ko": "달았어요", "en": "was sweet / naging matamis" },
    "future": { "ko": "달 거예요", "en": "will be sweet / magiging matamis" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "맛이 좋다",
    "en": "to be tasty / masarap",
    "present": { "ko": "맛이 좋아요", "en": "is tasty / masarap" },
    "past": { "ko": "맛이 좋았어요", "en": "was tasty / naging masarap" },
    "future": { "ko": "맛이 좋을 거예요", "en": "will be tasty / magiging masarap" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "맵다",
    "en": "to be spicy / maanghang",
    "present": { "ko": "매워요", "en": "is spicy / maanghang" },
    "past": { "ko": "매웠어요", "en": "was spicy / naging maanghang" },
    "future": { "ko": "매울 거예요", "en": "will be spicy / magiging maanghang" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "시다",
    "en": "to be sour / maasim",
    "present": { "ko": "셔요", "en": "is sour / maasim" },
    "past": { "ko": "셨어요", "en": "was sour / naging maasim" },
    "future": { "ko": "실 거예요", "en": "will be sour / magiging maasim" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "싱겁다",
    "en": "to be bland / matabang",
    "present": { "ko": "싱거워요", "en": "is bland / matabang" },
    "past": { "ko": "싱거웠어요", "en": "was bland / naging matabang" },
    "future": { "ko": "싱거울 거예요", "en": "will be bland / magiging matabang" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "쓰다",
    "en": "to be bitter / mapait",
    "present": { "ko": "써요", "en": "is bitter / mapait" },
    "past": { "ko": "썼어요", "en": "was bitter / naging mapait" },
    "future": { "ko": "쓸 거예요", "en": "will be bitter / magiging mapait" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "짜다",
    "en": "to be salty / maalat",
    "present": { "ko": "짜요", "en": "is salty / maalat" },
    "past": { "ko": "짰어요", "en": "was salty / naging maalat" },
    "future": { "ko": "짤 거예요", "en": "will be salty / magiging maalat" },
    "page": 231,
    "book": 1
  },
  {
    "ko": "차다",
    "en": "to be cold / malamig",
    "present": { "ko": "차요", "en": "is cold / malamig" },
    "past": { "ko": "찼어요", "en": "was cold / naging malamig" },
    "future": { "ko": "찰 거예요", "en": "will be cold / magiging malamig" },
    "page": 254,
    "book": 1
  },
  {
    "ko": "맞다",
    "en": "to be right/correct / tama",
    "present": { "ko": "맞아요", "en": "is right/correct / tama" },
    "past": { "ko": "맞았어요", "en": "was right/correct / naging tama" },
    "future": { "ko": "맞을 거예요", "en": "will be right/correct / magiging tama" },
    "page": 291,
    "book": 1
  },
  {
    "ko": "떨리다",
    "en": "to be nervous / kinakabahan",
    "present": { "ko": "떨려요", "en": "is nervous / kinakabahan" },
    "past": { "ko": "떨렸어요", "en": "was nervous / kinabahan" },
    "future": { "ko": "떨릴 거예요", "en": "will be nervous / kakabahan" },
    "page": 294,
    "book": 1
  },
  {
    "ko": "특별하다",
    "en": "to be special / espesyal",
    "present": { "ko": "특별해요", "en": "is special / espesyal" },
    "past": { "ko": "특별했어요", "en": "was special / naging espesyal" },
    "future": { "ko": "특별할 거예요", "en": "will be special / magiging espesyal" },
    "page": 304,
    "book": 1
  },
  {
    "ko": "어리다",
    "en": "to be young / bata",
    "present": { "ko": "어려요", "en": "is young / bata" },
    "past": { "ko": "어렸어요", "en": "was young / naging bata" },
    "future": { "ko": "어릴 거예요", "en": "will be young / magiging bata" },
    "page": 311,
    "book": 1
  },
  
  {
    "ko": "그렇다",
    "en": "to be like that / maging ganoon",
    "present": { "ko": "그래요", "en": "is like that / nagiging ganoon" },
    "past": { "ko": "그랬어요", "en": "was like that / naging ganoon" },
    "future": { "ko": "그럴 거예요", "en": "will be like that / magiging ganoon" },
    "page": 17,
    "book": 2
  },
  {
    "ko": "단정하다",
    "en": "to be neat / maging malinis",
    "present": { "ko": "단정해요", "en": "is neat / nagiging malinis" },
    "past": { "ko": "단정했어요", "en": "was neat / naging malinis" },
    "future": { "ko": "단정할 거예요", "en": "will be neat / magiging malinis" },
    "page": 17,
    "book": 2
  },
  {
    "ko": "안전하다",
    "en": "to be safe / maging ligtas",
    "present": { "ko": "안전해요", "en": "is safe / nagiging ligtas" },
    "past": { "ko": "안전했어요", "en": "was safe / naging ligtas" },
    "future": { "ko": "안전할 거예요", "en": "will be safe / magiging ligtas" },
    "page": 17,
    "book": 2
  },
  {
    "ko": "긍정적이다",
    "en": "to be positive / maging positibo",
    "present": { "ko": "긍정적이에요", "en": "is positive / nagiging positibo" },
    "past": { "ko": "긍정적이었어요", "en": "was positive / naging positibo" },
    "future": { "ko": "긍정적일 거예요", "en": "will be positive / magiging positibo" },
    "page": 20,
    "book": 2
  },
  {
    "ko": "부정적이다",
    "en": "to be negative / maging negatibo",
    "present": { "ko": "부정적이에요", "en": "is negative / nagiging negatibo" },
    "past": { "ko": "부정적이었어요", "en": "was negative / naging negatibo" },
    "future": { "ko": "부정적일 거예요", "en": "will be negative / magiging negatibo" },
    "page": 20,
    "book": 2
  },
  {
    "ko": "불쾌하다",
    "en": "to be displeased / hindi nalulugod",
    "present": { "ko": "불쾌해요", "en": "is displeased / hindi nalulugod" },
    "past": { "ko": "불쾌했어요", "en": "was displeased / hindi nalugod" },
    "future": { "ko": "불쾌할 거예요", "en": "will be displeased / hindi malulugod" },
    "page": 20,
    "book": 2
  },
  {
    "ko": "성실하다",
    "en": "to be diligent / maging masipag",
    "present": { "ko": "성실해요", "en": "is diligent / nagiging masipag" },
    "past": { "ko": "성실했어요", "en": "was diligent / naging masipag" },
    "future": { "ko": "성실할 거예요", "en": "will be diligent / magiging masipag" },
    "page": 20,
    "book": 2
  },
  {
    "ko": "다르다",
    "en": "other/different / iba",
    "present": { "ko": "달라요", "en": "is different / nagiging iba" },
    "past": { "ko": "달랐어요", "en": "was different / naging iba" },
    "future": { "ko": "다를 거예요", "en": "will be different / magiging iba" },
    "page": 27,
    "book": 2
  },
  {
    "ko": "할인되다",
    "en": "to be discounted / diskwentado",
    "present": { "ko": "할인돼요", "en": "is discounted / nadidiskwento" },
    "past": { "ko": "할인됐어요", "en": "was discounted / nadiskwento" },
    "future": { "ko": "할인될 거예요", "en": "will be discounted / madidiskwento" },
    "page": 30,
    "book": 2
  },
  {
    "ko": "엄격하다",
    "en": "to be strict / maging mahigpit",
    "present": { "ko": "엄격해요", "en": "is strict / nagiging mahigpit" },
    "past": { "ko": "엄격했어요", "en": "was strict / naging mahigpit" },
    "future": { "ko": "엄격할 거예요", "en": "will be strict / magiging mahigpit" },
    "page": 37,
    "book": 2
  },
  {
    "ko": "자유롭다",
    "en": "to be free/lenient / maging malaya/mapagparaya",
    "present": { "ko": "자유로워요", "en": "is free/lenient / nagiging malaya/mapagparaya" },
    "past": { "ko": "자유로웠어요", "en": "was free/lenient / naging malaya/mapagparaya" },
    "future": { "ko": "자유로울 거예요", "en": "will be free/lenient / magiging malaya/mapagparaya" },
    "page": 37,
    "book": 2
  },
  {
    "ko": "친하다",
    "en": "to be close (friends) / maging malapit (kaibigan)",
    "present": { "ko": "친해요", "en": "is close (friends) / nagiging malapit (kaibigan)" },
    "past": { "ko": "친했어요", "en": "was close (friends) / naging malapit (kaibigan)" },
    "future": { "ko": "친할 거예요", "en": "will be close (friends) / magiging malapit (kaibigan)" },
    "page": 37,
    "book": 2
  },
  {
    "ko": "무섭다",
    "en": "to be scary / nakakatakot",
    "present": { "ko": "무서워요", "en": "is scary / nakakatakot" },
    "past": { "ko": "무서웠어요", "en": "was scary / nakakatakot" },
    "future": { "ko": "무서울 거예요", "en": "will be scary / nakakatakot" },
    "page": 40,
    "book": 2
  },
  {
    "ko": "놀라다",
    "en": "to be shocked / magulat",
    "present": { "ko": "놀라요", "en": "is shocked / nagugulat" },
    "past": { "ko": "놀랐어요", "en": "was shocked / nagulat" },
    "future": { "ko": "놀랄 거예요", "en": "will be shocked / magugulat" },
    "page": 47,
    "book": 2
  },
  {
    "ko": "성차별적이다",
    "en": "sexist / seksista",
    "present": { "ko": "성차별적이에요", "en": "is sexist / nagiging seksista" },
    "past": { "ko": "성차별적이었어요", "en": "was sexist / naging seksista" },
    "future": { "ko": "성차별적일 거예요", "en": "will be sexist / magiging seksista" },
    "page": 47,
    "book": 2
  },
  {
    "ko": "심하다",
    "en": "to be severe / maging malala",
    "present": { "ko": "심해요", "en": "is severe / nagiging malala" },
    "past": { "ko": "심했어요", "en": "was severe / naging malala" },
    "future": { "ko": "심할 거예요", "en": "will be severe / magiging malala" },
    "page": 47,
    "book": 2
  },
  {
    "ko": "예민하다",
    "en": "to be sensitive / maging sensitibo",
    "present": { "ko": "예민해요", "en": "is sensitive / nagiging sensitibo" },
    "past": { "ko": "예민했어요", "en": "was sensitive / naging sensitibo" },
    "future": { "ko": "예민할 거예요", "en": "will be sensitive / magiging sensitibo" },
    "page": 47,
    "book": 2
  },
  {
    "ko": "분명하다",
    "en": "to be clear / maging malinaw",
    "present": { "ko": "분명해요", "en": "is clear / nagiging malinaw" },
    "past": { "ko": "분명했어요", "en": "was clear / naging malinaw" },
    "future": { "ko": "분명할 거예요", "en": "will be clear / magiging malinaw" },
    "page": 50,
    "book": 2
  },
  {
    "ko": "엉망이다",
    "en": "to be a mess / maging gulo",
    "present": { "ko": "엉망이에요", "en": "is a mess / nagiging gulo" },
    "past": { "ko": "엉망이었어요", "en": "was a mess / naging gulo" },
    "future": { "ko": "엉망일 거예요", "en": "will be a mess / magiging gulo" },
    "page": 57,
    "book": 2
  },
  {
    "ko": "쾌적하다",
    "en": "to be pleasant / maging kaaya-aya",
    "present": { "ko": "쾌적해요", "en": "is pleasant / nagiging kaaya-aya" },
    "past": { "ko": "쾌적했어요", "en": "was pleasant / naging kaaya-aya" },
    "future": { "ko": "쾌적할 거예요", "en": "will be pleasant / magiging kaaya-aya" },
    "page": 57,
    "book": 2
  },
  {
    "ko": "중요하다",
    "en": "to be important / maging mahalaga",
    "present": { "ko": "중요해요", "en": "is important / nagiging mahalaga" },
    "past": { "ko": "중요했어요", "en": "was important / naging mahalaga" },
    "future": { "ko": "중요할 거예요", "en": "will be important / magiging mahalaga" },
    "page": 60,
    "book": 2
  },
  {
    "ko": "깨지다",
    "en": "to be broken / masira",
    "present": { "ko": "깨져요", "en": "is broken / nasisira" },
    "past": { "ko": "깨졌어요", "en": "was broken / nasira" },
    "future": { "ko": "깨질 거예요", "en": "will be broken / masisira" },
    "page": 67,
    "book": 2
  },
  {
    "ko": "꼼꼼하다",
    "en": "to be meticulous / maging maselan",
    "present": { "ko": "꼼꼼해요", "en": "is meticulous / nagiging maselan" },
    "past": { "ko": "꼼꼼했어요", "en": "was meticulous / naging maselan" },
    "future": { "ko": "꼼꼼할 거예요", "en": "will be meticulous / magiging maselan" },
    "page": 67,
    "book": 2
  },
  {
    "ko": "밀리다",
    "en": "to be delayed / maantala",
    "present": { "ko": "밀려요", "en": "is delayed / naantala" },
    "past": { "ko": "밀렸어요", "en": "was delayed / naantala" },
    "future": { "ko": "밀릴 거예요", "en": "will be delayed / maantala" },
    "page": 77,
    "book": 2
  },
  {
    "ko": "낫다",
    "en": "to be better / maging mas mahusay",
    "present": { "ko": "나아요", "en": "is better / nagiging mas mahusay" },
    "past": { "ko": "나았어요", "en": "was better / naging mas mahusay" },
    "future": { "ko": "나을 거예요", "en": "will be better / magiging mas mahusay" },
    "page": 80,
    "book": 2
  },
  {
    "ko": "정확하다",
    "en": "to be accurate / maging tumpak",
    "present": { "ko": "정확해요", "en": "is accurate / nagiging tumpak" },
    "past": { "ko": "정확했어요", "en": "was accurate / naging tumpak" },
    "future": { "ko": "정확할 거예요", "en": "will be accurate / magiging tumpak" },
    "page": 80,
    "book": 2
  },
  {
    "ko": "느슨하다",
    "en": "to be loose / maluwag",
    "present": { "ko": "느슨해요", "en": "is loose / nagiging maluwag" },
    "past": { "ko": "느슨했어요", "en": "was loose / naging maluwag" },
    "future": { "ko": "느슨할 거예요", "en": "will be loose / magiging maluwag" },
    "page": 87,
    "book": 2
  },
  {
    "ko": "단단하다",
    "en": "to be solid / matigas",
    "present": { "ko": "단단해요", "en": "is solid / nagiging matigas" },
    "past": { "ko": "단단했어요", "en": "was solid / naging matigas" },
    "future": { "ko": "단단할 거예요", "en": "will be solid / magiging matigas" },
    "page": 87,
    "book": 2
  },
  {
    "ko": "파손되다",
    "en": "to be damaged / masira",
    "present": { "ko": "파손돼요", "en": "is damaged / nasisira" },
    "past": { "ko": "파손됐어요", "en": "was damaged / nasira" },
    "future": { "ko": "파손될 거예요", "en": "will be damaged / masisira" },
    "page": 87,
    "book": 2
  },
  {
    "ko": "마모되다",
    "en": "to be worn down / masira",
    "present": { "ko": "마모돼요", "en": "is worn down / nasisira" },
    "past": { "ko": "마모됐어요", "en": "was worn down / nasira" },
    "future": { "ko": "마모될 거예요", "en": "will be worn down / masisira" },
    "page": 90,
    "book": 2
  },
  {
    "ko": "생기다",
    "en": "to be formed / mabuo",
    "present": { "ko": "생겨요", "en": "is formed / nabubuo" },
    "past": { "ko": "생겼어요", "en": "was formed / nabuo" },
    "future": { "ko": "생길 거예요", "en": "will be formed / mabubuo" },
    "page": 90,
    "book": 2
  },
  {
    "ko": "평평하다",
    "en": "to be flat / patag",
    "present": { "ko": "평평해요", "en": "is flat / nagiging patag" },
    "past": { "ko": "평평했어요", "en": "was flat / naging patag" },
    "future": { "ko": "평평할 거예요", "en": "will be flat / magiging patag" },
    "page": 90,
    "book": 2
  },
  {
    "ko": "가늘다",
    "en": "to be thin (in diameter) / manipis (sa diameter)",
    "present": { "ko": "가늘어요", "en": "is thin (in diameter) / nagiging manipis (sa diameter)" },
    "past": { "ko": "가늘었어요", "en": "was thin (in diameter) / naging manipis (sa diameter)" },
    "future": { "ko": "가늘 거예요", "en": "will be thin (in diameter) / magiging manipis (sa diameter)" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "굵다",
    "en": "to be thick (in diameter) / makapal (sa diameter)",
    "present": { "ko": "굵어요", "en": "is thick (in diameter) / nagiging makapal (sa diameter)" },
    "past": { "ko": "굵었어요", "en": "was thick (in diameter) / naging makapal (sa diameter)" },
    "future": { "ko": "굵을 거예요", "en": "will be thick (in diameter) / magiging makapal (sa diameter)" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "느리다",
    "en": "to be slow / mabagal",
    "present": { "ko": "느려요", "en": "is slow / nagiging mabagal" },
    "past": { "ko": "느렸어요", "en": "was slow / naging mabagal" },
    "future": { "ko": "느릴 거예요", "en": "will be slow / magiging mabagal" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "두껍다",
    "en": "to be thick / makapal",
    "present": { "ko": "두꺼워요", "en": "is thick / nagiging makapal" },
    "past": { "ko": "두꺼웠어요", "en": "was thick / naging makapal" },
    "future": { "ko": "두꺼울 거예요", "en": "will be thick / magiging makapal" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "빠르다",
    "en": "to be fast / mabilis",
    "present": { "ko": "빨라요", "en": "is fast / nagiging mabilis" },
    "past": { "ko": "빨랐어요", "en": "was fast / naging mabilis" },
    "future": { "ko": "빠를 거예요", "en": "will be fast / magiging mabilis" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "세다",
    "en": "to be strong / malakas",
    "present": { "ko": "세요", "en": "is strong / nagiging malakas" },
    "past": { "ko": "셌어요", "en": "was strong / naging malakas" },
    "future": { "ko": "셀 거예요", "en": "will be strong / magiging malakas" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "약하다",
    "en": "to be weak / mahina",
    "present": { "ko": "약해요", "en": "is weak / nagiging mahina" },
    "past": { "ko": "약했어요", "en": "was weak / naging mahina" },
    "future": { "ko": "약할 거예요", "en": "will be weak / magiging mahina" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "얇다",
    "en": "to be thin / manipis",
    "present": { "ko": "얇아요", "en": "is thin / nagiging manipis" },
    "past": { "ko": "얇았어요", "en": "was thin / naging manipis" },
    "future": { "ko": "얇을 거예요", "en": "will be thin / magiging manipis" },
    "page": 100,
    "book": 2
  },
  {
    "ko": "검다",
    "en": "to be black / itim",
    "present": { "ko": "검어요", "en": "is black / nagiging itim" },
    "past": { "ko": "검었어요", "en": "was black / naging itim" },
    "future": { "ko": "검을 거예요", "en": "will be black / magiging itim" },
    "page": 110,
    "book": 2
  },
  {
    "ko": "민감하다",
    "en": "to be sensitive / maging sensitibo",
    "present": { "ko": "민감해요", "en": "is sensitive / nagiging sensitibo" },
    "past": { "ko": "민감했어요", "en": "was sensitive / naging sensitibo" },
    "future": { "ko": "민감할 거예요", "en": "will be sensitive / magiging sensitibo" },
    "page": 117,
    "book": 2
  },
  {
    "ko": "습하다",
    "en": "to be humid / mahalumigmig",
    "present": { "ko": "습해요", "en": "is humid / nagiging mahalumigmig" },
    "past": { "ko": "습했어요", "en": "was humid / naging mahalumigmig" },
    "future": { "ko": "습할 거예요", "en": "will be humid / magiging mahalumigmig" },
    "page": 117,
    "book": 2
  },
  {
    "ko": "오염되다",
    "en": "to be contaminated / kontaminado",
    "present": { "ko": "오염돼요", "en": "is contaminated / nakokontamina" },
    "past": { "ko": "오염됐어요", "en": "was contaminated / nakontamina" },
    "future": { "ko": "오염될 거예요", "en": "will be contaminated / makokontamina" },
    "page": 117,
    "book": 2
  },
  {
    "ko": "일정하다",
    "en": "to be consistent / maging pare-pareho",
    "present": { "ko": "일정해요", "en": "is consistent / nagiging pare-pareho" },
    "past": { "ko": "일정했어요", "en": "was consistent / naging pare-pareho" },
    "future": { "ko": "일정할 거예요", "en": "will be consistent / magiging pare-pareho" },
    "page": 117,
    "book": 2
  },
  {
    "ko": "통풍이 잘되다",
    "en": "to be well-ventilated / mahusay ang bentilasyon",
    "present": { "ko": "통풍이 잘돼요", "en": "is well-ventilated / nagiging mahusay ang bentilasyon" },
    "past": { "ko": "통풍이 잘됐어요", "en": "was well-ventilated / naging mahusay ang bentilasyon" },
    "future": { "ko": "통풍이 잘될 거예요", "en": "will be well-ventilated / magiging mahusay ang bentilasyon" },
    "page": 117,
    "book": 2
  },
  {
    "ko": "주기적이다",
    "en": "periodic / panaka-nakang",
    "present": { "ko": "주기적이에요", "en": "is periodic / nagiging panaka-nakang" },
    "past": { "ko": "주기적이었어요", "en": "was periodic / naging panaka-nakang" },
    "future": { "ko": "주기적일 거예요", "en": "will be periodic / magiging panaka-nakang" },
    "page": 117,
    "book": 2
  },
  {
    "ko": "고르다",
    "en": "to be smooth / makinis",
    "present": { "ko": "골라요", "en": "is smooth / nagiging makinis" },
    "past": { "ko": "골랐어요", "en": "was smooth / naging makinis" },
    "future": { "ko": "고를 거예요", "en": "will be smooth / magiging makinis" },
    "page": 120,
    "book": 2
  },
  {
    "ko": "하얗다",
    "en": "to be white / puti",
    "present": { "ko": "하얘요", "en": "is white / nagiging puti" },
    "past": { "ko": "하얬어요", "en": "was white / naging puti" },
    "future": { "ko": "하얄 거예요", "en": "will be white / magiging puti" },
    "page": 120,
    "book": 2
  },
  {
    "ko": "복잡하다",
    "en": "to be messy/complicated / maging magulo/komplikado",
    "present": { "ko": "복잡해요", "en": "is messy/complicated / nagiging magulo/komplikado" },
    "past": { "ko": "복잡했어요", "en": "was messy/complicated / naging magulo/komplikado" },
    "future": { "ko": "복잡할 거예요", "en": "will be messy/complicated / magiging magulo/komplikado" },
    "page": 137,
    "book": 2
  },
  {
    "ko": "필요하다",
    "en": "to be necessary / kailangan",
    "present": { "ko": "필요해요", "en": "is necessary / kinakailangan" },
    "past": { "ko": "필요했어요", "en": "was necessary / kinailangan" },
    "future": { "ko": "필요할 거예요", "en": "will be necessary / kakailanganin" },
    "page": 137,
    "book": 2
  },
  {
    "ko": "딱딱하다",
    "en": "to be hard / matigas",
    "present": { "ko": "딱딱해요", "en": "is hard / nagiging matigas" },
    "past": { "ko": "딱딱했어요", "en": "was hard / naging matigas" },
    "future": { "ko": "딱딱할 거예요", "en": "will be hard / magiging matigas" },
    "page": 147,
    "book": 2
  },
  {
    "ko": "부드럽다",
    "en": "to be soft / malambot",
    "present": { "ko": "부드러워요", "en": "is soft / nagiging malambot" },
    "past": { "ko": "부드러웠어요", "en": "was soft / naging malambot" },
    "future": { "ko": "부드러울 거예요", "en": "will be soft / magiging malambot" },
    "page": 147,
    "book": 2
  },
  {
    "ko": "파이다",
    "en": "to be dug / mahukay",
    "present": { "ko": "파여요", "en": "is dug / nahuhukay" },
    "past": { "ko": "파였어요", "en": "was dug / nahukay" },
    "future": { "ko": "파일 거예요", "en": "will be dug / mahuhukay" },
    "page": 157,
    "book": 2
  },
  {
    "ko": "찢어지다",
    "en": "to be torn / mapunit",
    "present": { "ko": "찢어져요", "en": "is torn / napupunit" },
    "past": { "ko": "찢어졌어요", "en": "was torn / napunit" },
    "future": { "ko": "찢어질 거예요", "en": "will be torn / mapupunit" },
    "page": 177,
    "book": 2
  },
  {
    "ko": "흔들리다",
    "en": "to be shaken / mayanig",
    "present": { "ko": "흔들려요", "en": "is shaken / nayayanig" },
    "past": { "ko": "흔들렸어요", "en": "was shaken / nayanig" },
    "future": { "ko": "흔들릴 거예요", "en": "will be shaken / mayayanig" },
    "page": 177,
    "book": 2
  },
  {
    "ko": "접히다",
    "en": "to be folded / matupi",
    "present": { "ko": "접혀요", "en": "is folded / natutupi" },
    "past": { "ko": "접혔어요", "en": "was folded / natupi" },
    "future": { "ko": "접힐 거예요", "en": "will be folded / matutupi" },
    "page": 180,
    "book": 2
  },
  {
    "ko": "매끄럽다",
    "en": "to be smooth / makinis",
    "present": { "ko": "매끄러워요", "en": "is smooth / nagiging makinis" },
    "past": { "ko": "매끄러웠어요", "en": "was smooth / naging makinis" },
    "future": { "ko": "매끄러울 거예요", "en": "will be smooth / magiging makinis" },
    "page": 187,
    "book": 2
  },
  {
    "ko": "정기적이다",
    "en": "regular / regular",
    "present": { "ko": "정기적이에요", "en": "is regular / nagiging regular" },
    "past": { "ko": "정기적이었어요", "en": "was regular / naging regular" },
    "future": { "ko": "정기적일 거예요", "en": "will be regular / magiging regular" },
    "page": 190,
    "book": 2
  },
  {
    "ko": "둥글다",
    "en": "to be round / bilog",
    "present": { "ko": "둥글어요", "en": "is round / nagiging bilog" },
    "past": { "ko": "둥글었어요", "en": "was round / naging bilog" },
    "future": { "ko": "둥글 거예요", "en": "will be round / magiging bilog" },
    "page": 207,
    "book": 2
  },
  {
    "ko": "미끄럽다",
    "en": "to be slippery / madulas",
    "present": { "ko": "미끄러워요", "en": "is slippery / nagiging madulas" },
    "past": { "ko": "미끄러웠어요", "en": "was slippery / naging madulas" },
    "future": { "ko": "미끄러울 거예요", "en": "will be slippery / magiging madulas" },
    "page": 237,
    "book": 2
  },
  {
    "ko": "위험하다",
    "en": "to be dangerous / maging mapanganib",
    "present": { "ko": "위험해요", "en": "is dangerous / nagiging mapanganib" },
    "past": { "ko": "위험했어요", "en": "was dangerous / naging mapanganib" },
    "future": { "ko": "위험할 거예요", "en": "will be dangerous / magiging mapanganib" },
    "page": 238,
    "book": 2
  },
  {
    "ko": "끼이다",
    "en": "to be trapped / maipit",
    "present": { "ko": "끼어요", "en": "is trapped / naiipit" },
    "past": { "ko": "끼었어요", "en": "was trapped / naipit" },
    "future": { "ko": "끼일 거예요", "en": "will be trapped / maiipit" },
    "page": 250,
    "book": 2
  },
  {
    "ko": "배치되다",
    "en": "to be assigned / maitalaga",
    "present": { "ko": "배치돼요", "en": "is assigned / naitatalaga" },
    "past": { "ko": "배치됐어요", "en": "was assigned / naitalaga" },
    "future": { "ko": "배치될 거예요", "en": "will be assigned / maitatalaga" },
    "page": 280,
    "book": 2
  },
  {
    "ko": "궁금하다",
    "en": "to be curious / maging mausisa",
    "present": { "ko": "궁금해요", "en": "is curious / nagiging mausisa" },
    "past": { "ko": "궁금했어요", "en": "was curious / naging mausisa" },
    "future": { "ko": "궁금할 거예요", "en": "will be curious / magiging mausisa" },
    "page": 287,
    "book": 2
  },
  {
    "ko": "차다",
    "en": "to be full / puno",
    "present": { "ko": "차요", "en": "is full / napupuno" },
    "past": { "ko": "찼어요", "en": "was full / napuno" },
    "future": { "ko": "찰 거예요", "en": "will be full / mapupuno" },
    "page": 300,
    "book": 2
  },
  {
    "ko": "부담없다",
    "en": "to be burden-free / walang pasanin",
    "present": { "ko": "부담없어요", "en": "is burden-free / nagiging walang pasanin" },
    "past": { "ko": "부담없었어요", "en": "was burden-free / naging walang pasanin" },
    "future": { "ko": "부담없을 거예요", "en": "will be burden-free / magiging walang pasanin" },
    "page": 310,
    "book": 2
  }

  
]
