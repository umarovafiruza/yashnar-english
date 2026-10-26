// Grammar Quiz Questions Database (110 questions across 15 topics and 5 CEFR levels)
window.QUIZ_GRAMMAR_TOPICS = [
  { id: "tenses", name: "Tenses — Present, Past & Future", uz: "Zamonlar — Hozirgi, O'tgan va Kelasi", desc: "Zamonlarning tuzilishi va ishlatilish qoidalari", levels: ["A1", "A2", "B1", "B2"] },
  { id: "present_simple_continuous", name: "Present Simple vs Continuous", uz: "Oddiy va Davomli Hozirgi Zamon", desc: "Doimiy odatlar va ayni paytda sodir bo'layotgan ish-harakatlar", levels: ["A1", "A2", "B1"] },
  { id: "past_simple_present_perfect", name: "Past Simple vs Present Perfect", uz: "O'tgan Zamon va Hozirgi Tugallangan", desc: "Tugallangan o'tmish va hozir bilan bog'liq tajribalar", levels: ["A2", "B1", "B2"] },
  { id: "future_forms", name: "Future Forms", uz: "Kelasi Zamon Shakllari", desc: "Will, Be Going To, Present Continuous va Future Continuous", levels: ["A2", "B1", "B2"] },
  { id: "modal_verbs", name: "Modal Verbs", uz: "Modal Fe'llar", desc: "Can, could, must, should, might, have to va ularning ma'nolari", levels: ["A2", "B1", "B2", "C1"] },
  { id: "articles", name: "Articles — a, an, the", uz: "Artikllar — a, an, the", desc: "Noaniq va aniq artikllar, nolinchi artikl qoidalari", levels: ["A1", "A2", "B1", "B2"] },
  { id: "prepositions", name: "Prepositions", uz: "Old qo'shimchalar (Predloglar)", desc: "Vaqt, o'rin-joy, yo'nalish va bog'liq predloglar", levels: ["A1", "A2", "B1", "B2"] },
  { id: "conditionals", name: "Conditionals", uz: "Shart Ergash Gaplar", desc: "Zero, First, Second, Third va Mixed Conditionals", levels: ["A2", "B1", "B2", "C1"] },
  { id: "passive_voice", name: "Passive Voice", uz: "Majhul Nisbat", desc: "Egalik va harakat qaratilgan ob'ektga urg'u berish", levels: ["B1", "B2", "C1"] },
  { id: "reported_speech", name: "Reported Speech", uz: "O'zlashtirma Gap", desc: "Birovning gapini yetkazish va zamonlar siljishi", levels: ["B1", "B2", "C1"] },
  { id: "relative_clauses", name: "Relative Clauses", uz: "Nisbiy Ergash Gaplar", desc: "Who, which, that, whose, where bilan gaplarni bog'lash", levels: ["B1", "B2"] },
  { id: "gerunds_infinitives", name: "Gerunds and Infinitives", uz: "Gerundiy va Infinitiv", desc: "-ing yoki to+verb qabul qiluvchi fe'llar qoidalari", levels: ["B1", "B2", "C1"] },
  { id: "subject_verb_agreement", name: "Subject–Verb Agreement", uz: "Ega va Kesim Moslashuvi", desc: "Birlik va ko'plikdagi egalar bilan to'g'ri fe'l shakli", levels: ["A2", "B1", "B2"] },
  { id: "comparatives_superlatives", name: "Comparatives & Superlatives", uz: "Sifat Darajalari", desc: "Qiyosiy va orttirma darajalar, as...as tuzilmalari", levels: ["A1", "A2", "B1"] },
  { id: "mixed_grammar", name: "Mixed Grammar Challenge", uz: "Aralash Grammatika", desc: "Barcha asosiy grammatik qoidalarni qamrab oluvchi sinov", levels: ["A2", "B1", "B2", "C1"] }
];

window.QUIZ_GRAMMAR = [
  // 1. Tenses (8 questions)
  {
    id: "g_ten_1",
    topicId: "tenses",
    level: "A1",
    type: "fill_in_the_blank",
    question: "She ______ to work by bus every morning.",
    options: ["go", "goes", "is going", "went"],
    answer: 1,
    explanation: "Uchinchi shaxs birlikda (She/He/It) Present Simple zamonida fe'lga -s yoki -es qo'shiladi (goes)."
  },
  {
    id: "g_ten_2",
    topicId: "tenses",
    level: "A2",
    type: "sentence_completion",
    question: "While I was studying in my room, my brother ______.",
    options: ["was playing guitar", "plays guitar", "is playing guitar", "has played guitar"],
    answer: 0,
    explanation: "O'tmishda bir vaqtning o'zida davom etayotgan ikki harakat 'while' orqali Past Continuous zamonida beriladi."
  },
  {
    id: "g_ten_3",
    topicId: "tenses",
    level: "B1",
    type: "fill_in_the_blank",
    question: "By next September, they ______ in this apartment for ten years.",
    options: ["will live", "will have lived", "have lived", "are living"],
    answer: 1,
    explanation: "'By next...' kelajakdagi ma'lum vaqtgacha davom etadigan ish-harakat uchun Future Perfect zamoni (will have lived) ishlatiladi."
  },
  {
    id: "g_ten_4",
    topicId: "tenses",
    level: "B1",
    type: "multiple_choice",
    question: "When we arrived at the cinema, the movie ______.",
    options: ["already started", "had already started", "has already started", "was started"],
    answer: 1,
    explanation: "O'tgan zamondagi boshqa bir harakatdan oldin ro'y bergan voqea uchun Past Perfect (had already started) qo'llaniladi."
  },
  {
    id: "g_ten_5",
    topicId: "tenses",
    level: "B2",
    type: "error_identification",
    question: "Identify the INCORRECT part: [A] By the time the doctor arrived, [B] the patient [C] is resting comfortably [D] for two hours.",
    options: ["[A] By the time", "[B] the patient", "[C] is resting comfortably", "[D] for two hours"],
    answer: 2,
    explanation: "'By the time arrived' o'tgan zamonda bo'lgani uchun 'is resting' o'rniga Past Perfect Continuous 'had been resting' bo'lishi shart."
  },
  {
    id: "g_ten_6",
    topicId: "tenses",
    level: "B2",
    type: "fill_in_the_blank",
    question: "How long ______ when the storm suddenly hit?",
    options: ["did you drive", "had you been driving", "have you driven", "were you driven"],
    answer: 1,
    explanation: "O'tmishdagi ma'lum nuqtagacha qancha vaqt davom etganini so'rashda Past Perfect Continuous (had you been driving) to'g'ri."
  },
  {
    id: "g_ten_7",
    topicId: "tenses",
    level: "A2",
    type: "word_selection",
    question: "Last summer, we ______ many historical monuments in Samarkand.",
    options: ["visited", "have visited", "visit", "were visited"],
    answer: 0,
    explanation: "'Last summer' aniq o'tgan vaqt ko'rsatkichi bo'lgani sababli Past Simple (visited) ishlatiladi."
  },
  {
    id: "g_ten_8",
    topicId: "tenses",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Look at those dark clouds! It ______ rain very soon.",
    options: ["will", "is going to", "must to", "would"],
    answer: 1,
    explanation: "Ko'z o'ngimizda dalil yoki belgi bo'lganda (dark clouds) kelajakdagi voqea uchun 'be going to' qo'llaniladi."
  },

  // 2. Present Simple vs Continuous (7 questions)
  {
    id: "g_psc_1",
    topicId: "present_simple_continuous",
    level: "A1",
    type: "fill_in_the_blank",
    question: "Please be quiet! The baby ______ in the next room.",
    options: ["sleeps", "is sleeping", "sleep", "was sleeping"],
    answer: 1,
    explanation: "'Please be quiet!' hozir sodir bo'layotgan jarayonni ko'rsatadi, shuning uchun Present Continuous (is sleeping)."
  },
  {
    id: "g_psc_2",
    topicId: "present_simple_continuous",
    level: "A2",
    type: "multiple_choice",
    question: "Water ______ at 100 degrees Celsius.",
    options: ["boils", "is boiling", "boil", "boiled"],
    answer: 0,
    explanation: "Ilmiy haqiqatlar va tabiat qonunlari har doim Present Simple zamonida beriladi (boils)."
  },
  {
    id: "g_psc_3",
    topicId: "present_simple_continuous",
    level: "B1",
    type: "word_selection",
    question: "I ______ what you mean, but I still disagree.",
    options: ["am understanding", "understand", "understands", "have been understanding"],
    answer: 1,
    explanation: "'Understand' aqliy faoliyat holat fe'li (stative verb) bo'lib, odatda Continuous zamonlarda qo'llanilmaydi."
  },
  {
    id: "g_psc_4",
    topicId: "present_simple_continuous",
    level: "A2",
    type: "sentence_completion",
    question: "My father usually drinks coffee, but today he ______ tea.",
    options: ["drinks", "is drinking", "drank", "has drunk"],
    answer: 1,
    explanation: "Doimiy odat (usually drinks) bilan vaqtinchalik holat (today he is drinking) taqqoslanganda Continuous ishlatiladi."
  },
  {
    id: "g_psc_5",
    topicId: "present_simple_continuous",
    level: "B1",
    type: "error_identification",
    question: "Find the error: [A] Listen! [B] Somebody is knocking [C] on the door, but [D] I am not knowing who it is.",
    options: ["[A] Listen!", "[B] is knocking", "[C] on the door", "[D] am not knowing"],
    answer: 3,
    explanation: "'Know' stative verb bo'lgani sababli 'I am not knowing' noto'g'ri, 'I do not know' bo'lishi kerak."
  },
  {
    id: "g_psc_6",
    topicId: "present_simple_continuous",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Why ______ so silly today? You are usually very sensible.",
    options: ["are you being", "do you be", "are you", "have you been"],
    answer: 0,
    explanation: "Inson odatdagidan boshqacha, vaqtinchalik o'zini tutayotganini bildirish uchun 'are you being' ishlatiladi."
  },
  {
    id: "g_psc_7",
    topicId: "present_simple_continuous",
    level: "A1",
    type: "fill_in_the_blank",
    question: "How often ______ to the gym each week?",
    options: ["are you going", "do you go", "you go", "does you go"],
    answer: 1,
    explanation: "Takrorlanuvchi harakatlar va odatlar uchun Present Simple savoli 'do you go' shaklida tuziladi."
  },

  // 3. Past Simple vs Present Perfect (7 questions)
  {
    id: "g_psp_1",
    topicId: "past_simple_present_perfect",
    level: "A2",
    type: "fill_in_the_blank",
    question: "I ______ to London two years ago.",
    options: ["have gone", "went", "have been", "was going"],
    answer: 1,
    explanation: "'Two years ago' aniq o'tgan vaqtni ifodalaydi, shuning uchun Past Simple (went) to'g'ri."
  },
  {
    id: "g_psp_2",
    topicId: "past_simple_present_perfect",
    level: "A2",
    type: "multiple_choice",
    question: "______ you ever eaten authentic sushi?",
    options: ["Did", "Have", "Were", "Had"],
    answer: 1,
    explanation: "Hayotiy tajribani ifodalashda 'Have you ever + V3' (Present Perfect) konstruksiyasi qo'llaniladi."
  },
  {
    id: "g_psp_3",
    topicId: "past_simple_present_perfect",
    level: "B1",
    type: "fill_in_the_blank",
    question: "She ______ her keys, so she cannot get into her house now.",
    options: ["lost", "has lost", "had lost", "was losing"],
    answer: 1,
    explanation: "O'tmishdagi ish-harakatning natijasi hozirgi paytga to'g'ridan-to'g'ri ta'sir qilsa, Present Perfect (has lost) olinadi."
  },
  {
    id: "g_psp_4",
    topicId: "past_simple_present_perfect",
    level: "B1",
    type: "sentence_completion",
    question: "He hasn't spoken to his manager ______ last Friday.",
    options: ["for", "since", "during", "from"],
    answer: 1,
    explanation: "Present Perfect zamonida aniq boshlanish nuqtasi oldidan 'since' qo'yiladi ('since last Friday')."
  },
  {
    id: "g_psp_5",
    topicId: "past_simple_present_perfect",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] William Shakespeare [B] has written [C] many famous plays [D] in the sixteenth century.",
    options: ["[A] William Shakespeare", "[B] has written", "[C] many famous plays", "[D] in the sixteenth century"],
    answer: 1,
    explanation: "Hayotdan ko'z yumgan shaxslarning o'tmishdagi ishlari Present Perfect emas, Past Simple (wrote) bilan yoziladi."
  },
  {
    id: "g_psp_6",
    topicId: "past_simple_present_perfect",
    level: "B1",
    type: "word_selection",
    question: "They have lived in Tashkent ______ more than fifteen years.",
    options: ["since", "for", "ago", "already"],
    answer: 1,
    explanation: "Vaqt davomiyligi (duration) ifodalanganda 'for' predlogi ishlatiladi ('for more than fifteen years')."
  },
  {
    id: "g_psp_7",
    topicId: "past_simple_present_perfect",
    level: "B2",
    type: "fill_in_the_blank",
    question: "This is the first time I ______ such a thrilling performance.",
    options: ["saw", "have seen", "had seen", "see"],
    answer: 1,
    explanation: "'This is the first/second time...' iborasidan keyin doim Present Perfect (have seen) keladi."
  },

  // 4. Future Forms (7 questions)
  {
    id: "g_ff_1",
    topicId: "future_forms",
    level: "A2",
    type: "fill_in_the_blank",
    question: "Don't carry that heavy box alone. I ______ you.",
    options: ["will help", "am helping", "am going to help", "helped"],
    answer: 0,
    explanation: "Gapirilayotgan paytda kutilmaganda qilingan qaror va yordam taklifi uchun 'will + verb' ishlatiladi."
  },
  {
    id: "g_ff_2",
    topicId: "future_forms",
    level: "B1",
    type: "multiple_choice",
    question: "The plane to Istanbul ______ at 08:30 tomorrow morning.",
    options: ["will leave", "is leaving", "leaves", "is going to leave"],
    answer: 2,
    explanation: "Rasmiy jadvallar, transport qatnovi va rejalashtirilgan dasturlar uchun Present Simple (leaves) qo'llaniladi."
  },
  {
    id: "g_ff_3",
    topicId: "future_forms",
    level: "B1",
    type: "sentence_completion",
    question: "This time tomorrow, we ______ over the Alps on our way to Rome.",
    options: ["will fly", "will be flying", "fly", "are flying"],
    answer: 1,
    explanation: "Kelajakda ma'lum bir aniq vaqtda davom etayotgan harakat Future Continuous (will be flying) bilan beriladi."
  },
  {
    id: "g_ff_4",
    topicId: "future_forms",
    level: "A2",
    type: "fill_in_the_blank",
    question: "We have already bought the tickets. We ______ to Dubai next Sunday.",
    options: ["are going", "will go", "go", "are gone"],
    answer: 0,
    explanation: "Oldindan kelishilgan va tayyorgarlik ko'rilgan aniq rejalar uchun Present Continuous (are going) ishlatiladi."
  },
  {
    id: "g_ff_5",
    topicId: "future_forms",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] As soon as [B] she will arrive at the office, [C] I will give her [D] your message.",
    options: ["[A] As soon as", "[B] she will arrive", "[C] I will give her", "[D] your message"],
    answer: 1,
    explanation: "Vaqt ergash gaplarda (as soon as, when, before, after) kelasi zamon o'rniga Present Simple (she arrives) ishlatiladi."
  },
  {
    id: "g_ff_6",
    topicId: "future_forms",
    level: "B2",
    type: "fill_in_the_blank",
    question: "By 2030, scientists hope that they ______ a cure for the illness.",
    options: ["will discover", "will have discovered", "are discovering", "have discovered"],
    answer: 1,
    explanation: "'By 2030' kelajakdagi ma'lum muddatgacha natijaga erishishni bildiradi: Future Perfect (will have discovered)."
  },
  {
    id: "g_ff_7",
    topicId: "future_forms",
    level: "B1",
    type: "word_selection",
    question: "I think people ______ more electric vehicles in the coming decade.",
    options: ["will drive", "are driving", "drive", "shall driving"],
    answer: 0,
    explanation: "'I think / I believe / I hope' kabi shaxsiy fikr va bashoratlardan keyin odatda 'will' ishlatiladi."
  },

  // 5. Modal Verbs (8 questions)
  {
    id: "g_mod_1",
    topicId: "modal_verbs",
    level: "A2",
    type: "fill_in_the_blank",
    question: "You ______ touch that wire! It is extremely dangerous.",
    options: ["mustn't", "don't have to", "couldn't", "needn't"],
    answer: 0,
    explanation: "Qat'iy taqiq (prohibition) bildirish uchun 'mustn't' ishlatiladi. 'Don't have to' esa faqat shart emasligini bildiradi."
  },
  {
    id: "g_mod_2",
    topicId: "modal_verbs",
    level: "B1",
    type: "multiple_choice",
    question: "Tomorrow is Sunday, so I ______ wake up early.",
    options: ["mustn't", "don't have to", "can't", "may not"],
    answer: 1,
    explanation: "Zarurat yo'qligini ('shart emas') bildirish uchun 'don't have to' ishlatiladi."
  },
  {
    id: "g_mod_3",
    topicId: "modal_verbs",
    level: "B1",
    type: "sentence_completion",
    question: "His light is still on in his study. He ______ working late.",
    options: ["can't be", "must be", "shouldn't be", "need to be"],
    answer: 1,
    explanation: "Mantiqiy kuchli xulosa (99% ishonch) bildirish uchun 'must be' (ishlayotgan bo'lsa kerak) qo'llaniladi."
  },
  {
    id: "g_mod_4",
    topicId: "modal_verbs",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The streets are totally wet. It ______ heavily during the night.",
    options: ["must rain", "must have rained", "should rain", "can rain"],
    answer: 1,
    explanation: "O'tmishdagi holat bo'yicha kuchli mantiqiy taxmin uchun 'must have + V3' (must have rained) ishlatiladi."
  },
  {
    id: "g_mod_5",
    topicId: "modal_verbs",
    level: "B2",
    type: "word_selection",
    question: "You ______ told him the secret! Now everybody in class knows.",
    options: ["shouldn't have", "mustn't have", "couldn't have", "needn't"],
    answer: 0,
    explanation: "O'tgan zamondagi qilingan xatodan afsuslanish yoki tanqid qilishda 'shouldn't have + V3' qo'llaniladi."
  },
  {
    id: "g_mod_6",
    topicId: "modal_verbs",
    level: "C1",
    type: "error_identification",
    question: "Find the error: [A] She can't have [B] committed the robbery [C] because she [D] must be in another city at that time.",
    options: ["[A] She can't have", "[B] committed the robbery", "[C] because she", "[D] must be in another city"],
    answer: 3,
    explanation: "O'tgan zamondagi aniq fakt bo'yicha 'must be' emas, 'was' yoki o'tgan zamon taxmini 'must have been' bo'lishi kerak."
  },
  {
    id: "g_mod_7",
    topicId: "modal_verbs",
    level: "A2",
    type: "fill_in_the_blank",
    question: "Excuse me, ______ you please open the window?",
    options: ["could", "should", "must", "might"],
    answer: 0,
    explanation: "Xushmuomalalik bilan iltimos qilish uchun 'could' yoki 'would' eng maqbul variantdir."
  },
  {
    id: "g_mod_8",
    topicId: "modal_verbs",
    level: "B2",
    type: "multiple_choice",
    question: "You ______ bought milk; we already had three bottles in the fridge.",
    options: ["mustn't have", "needn't have", "couldn't have", "oughtn't"],
    answer: 1,
    explanation: "Keraksiz bo'lgan harakat baribir qilinganini bildirish uchun 'needn't have + V3' ishlatiladi."
  },

  // 6. Articles — a, an, the, zero (7 questions)
  {
    id: "g_art_1",
    topicId: "articles",
    level: "A1",
    type: "fill_in_the_blank",
    question: "My sister wants to become ______ architect in the future.",
    options: ["a", "an", "the", "— (no article)"],
    answer: 1,
    explanation: "Unli tovush bilan boshlanadigan kasb nomlari oldidan noaniq artikl 'an' qo'yiladi."
  },
  {
    id: "g_art_2",
    topicId: "articles",
    level: "A2",
    type: "multiple_choice",
    question: "______ Nile is known as the longest river in the world.",
    options: ["A", "An", "The", "— (no article)"],
    answer: 2,
    explanation: "Daryolar, dengizlar va okean nomlari oldidan aniq artikl 'The' ishlatiladi."
  },
  {
    id: "g_art_3",
    topicId: "articles",
    level: "B1",
    type: "sentence_completion",
    question: "He plays ______ violin beautifully, but he doesn't play ______ basketball.",
    options: ["the / —", "a / the", "— / the", "the / the"],
    answer: 0,
    explanation: "Musiqa asboblari oldidan 'the' ishlatiladi, sport turlari oldidan esa artikl qo'yilmaydi."
  },
  {
    id: "g_art_4",
    topicId: "articles",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Did you read ______ article I sent you yesterday?",
    options: ["a", "an", "the", "— (no article)"],
    answer: 2,
    explanation: "Tinglovchiga qaysi maqola ekanligi aniq bo'lgani uchun ('I sent you yesterday') 'the' ishlatiladi."
  },
  {
    id: "g_art_5",
    topicId: "articles",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] The honesty [B] is considered [C] one of the greatest [D] human virtues.",
    options: ["[A] The honesty", "[B] is considered", "[C] one of the greatest", "[D] human virtues"],
    answer: 0,
    explanation: "Umumiy ma'noda kelgan mavhum otlar (honesty, love, patience) oldidan artikl ishlatilmaydi ('Honesty is...')."
  },
  {
    id: "g_art_6",
    topicId: "articles",
    level: "A2",
    type: "word_selection",
    question: "We usually have ______ breakfast at seven o'clock.",
    options: ["a", "the", "— (no article)", "an"],
    answer: 2,
    explanation: "Ovqatlanish vaqtlari (breakfast, lunch, dinner) oldidan odatda artikl ishlatilmaydi."
  },
  {
    id: "g_art_7",
    topicId: "articles",
    level: "B2",
    type: "fill_in_the_blank",
    question: "Mount Everest is situated in ______ Himalayas.",
    options: ["the", "a", "an", "— (no article)"],
    answer: 0,
    explanation: "Tog' tizmalari (Himalayas, Alps, Andes) ko'plikda bo'lgani sababli 'the' artikli bilan keladi."
  },

  // 7. Prepositions (7 questions)
  {
    id: "g_prep_1",
    topicId: "prepositions",
    level: "A1",
    type: "fill_in_the_blank",
    question: "Our English class begins ______ Monday morning ______ 9:00 AM.",
    options: ["at / on", "on / at", "in / at", "on / in"],
    answer: 1,
    explanation: "Hafta kunlari uchun 'on' ('on Monday morning'), aniq soat vaqtlari uchun 'at' ('at 9:00 AM') ishlatiladi."
  },
  {
    id: "g_prep_2",
    topicId: "prepositions",
    level: "A2",
    type: "multiple_choice",
    question: "She has been interested ______ graphic design for several years.",
    options: ["about", "in", "with", "at"],
    answer: 1,
    explanation: "'Interested' sifati har doim 'in' predlogi bilan bog'lanadi ('interested in something')."
  },
  {
    id: "g_prep_3",
    topicId: "prepositions",
    level: "B1",
    type: "sentence_completion",
    question: "He succeeded ______ passing the difficult entrance exam.",
    options: ["to", "in", "at", "for"],
    answer: 1,
    explanation: "'Succeed' fe'li 'in doing something' shaklida ishlatiladi."
  },
  {
    id: "g_prep_4",
    topicId: "prepositions",
    level: "B1",
    type: "word_selection",
    question: "The cat jumped ______ the kitchen table and ran away.",
    options: ["off", "out", "away", "over of"],
    answer: 0,
    explanation: "Biror yuza sathidan tushish yoki sakrash 'jump off' bilan ifodalanadi."
  },
  {
    id: "g_prep_5",
    topicId: "prepositions",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] Despite of [B] the heavy rain, [C] they decided to continue [D] their hike.",
    options: ["[A] Despite of", "[B] the heavy rain", "[C] they decided to continue", "[D] their hike"],
    answer: 0,
    explanation: "'Despite'dan keyin 'of' ishlatilmaydi ('Despite the rain'). 'In spite of' shaklida esa 'of' bo'ladi."
  },
  {
    id: "g_prep_6",
    topicId: "prepositions",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The manager was blamed ______ the sudden financial loss.",
    options: ["for", "about", "with", "on"],
    answer: 0,
    explanation: "'Be blamed for something' — biror narsada ayblanmoq ma'nosida 'for' predlogi bilan ishlatiladi."
  },
  {
    id: "g_prep_7",
    topicId: "prepositions",
    level: "A2",
    type: "fill_in_the_blank",
    question: "We usually go on vacation ______ August.",
    options: ["on", "at", "in", "by"],
    answer: 2,
    explanation: "Oylar va yillar oldidan 'in' predlogi qo'yiladi ('in August', 'in 2026')."
  },

  // 8. Conditionals (8 questions)
  {
    id: "g_cond_1",
    topicId: "conditionals",
    level: "A2",
    type: "fill_in_the_blank",
    question: "If it rains this afternoon, we ______ at home.",
    options: ["stay", "will stay", "would stay", "stayed"],
    answer: 1,
    explanation: "First Conditional: If + Present Simple, kelajak qismida will + verb (will stay) qo'llaniladi."
  },
  {
    id: "g_cond_2",
    topicId: "conditionals",
    level: "B1",
    type: "multiple_choice",
    question: "If I ______ a million dollars, I would build a modern school in my village.",
    options: ["have", "had", "will have", "would have"],
    answer: 1,
    explanation: "Second Conditional: hozirgi noaniq/xayoliy vaziyat uchun If qismida Past Simple (had) bo'ladi."
  },
  {
    id: "g_cond_3",
    topicId: "conditionals",
    level: "B2",
    type: "sentence_completion",
    question: "If she had set her alarm clock, she ______ the morning flight.",
    options: ["wouldn't miss", "wouldn't have missed", "won't miss", "didn't miss"],
    answer: 1,
    explanation: "Third Conditional: o'tmishdagi afsus ifodalanayotganda If + Past Perfect, natijada would have + V3 bo'ladi."
  },
  {
    id: "g_cond_4",
    topicId: "conditionals",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Water turns to ice if the temperature ______ below zero.",
    options: ["drops", "will drop", "dropped", "is dropping"],
    answer: 0,
    explanation: "Zero Conditional: doimiy tabiat qonuniyati ifodalanganda ikkala qismda ham Present Simple (drops) ishlatiladi."
  },
  {
    id: "g_cond_5",
    topicId: "conditionals",
    level: "B2",
    type: "word_selection",
    question: "I won't attend the meeting ______ they explicitly invite me.",
    options: ["if", "unless", "provided", "as long as"],
    answer: 1,
    explanation: "'Unless' = 'if not' (agar taklif qilmasalar). Gap mazmuniga ko'ra 'unless' to'g'ri keladi."
  },
  {
    id: "g_cond_6",
    topicId: "conditionals",
    level: "C1",
    type: "error_identification",
    question: "Find the error: [A] If I would have known [B] about the traffic jam, [C] I would have taken [D] the subway instead.",
    options: ["[A] If I would have known", "[B] about the traffic jam", "[C] I would have taken", "[D] the subway instead"],
    answer: 0,
    explanation: "Shart ergash gaplarning 'If' qismida 'would have' ishlatilmaydi; Past Perfect 'If I had known' bo'lishi shart."
  },
  {
    id: "g_cond_7",
    topicId: "conditionals",
    level: "C1",
    type: "fill_in_the_blank",
    question: "If I ______ English more diligently in school, I would speak fluently now.",
    options: ["studied", "had studied", "would study", "have studied"],
    answer: 1,
    explanation: "Mixed Conditional: o'tmishdagi harakat (had studied) va uning hozirgi natijasi (would speak now)."
  },
  {
    id: "g_cond_8",
    topicId: "conditionals",
    level: "B1",
    type: "sentence_completion",
    question: "You can borrow my laptop as long as you ______ it carefully.",
    options: ["treat", "will treat", "treated", "would treat"],
    answer: 0,
    explanation: "'As long as' shart bog'lovchisidan keyin kelasi zamon o'rniga Present Simple (treat) ishlatiladi."
  },

  // 9. Passive Voice (7 questions)
  {
    id: "g_pass_1",
    topicId: "passive_voice",
    level: "B1",
    type: "fill_in_the_blank",
    question: "The ancient bridge ______ in the seventeenth century.",
    options: ["built", "was built", "has built", "is built"],
    answer: 1,
    explanation: "Ko'prik o'tmishda qurilgan va harakat ob'ektga qaratilgan: Past Simple Passive (was built)."
  },
  {
    id: "g_pass_2",
    topicId: "passive_voice",
    level: "B1",
    type: "multiple_choice",
    question: "A new shopping mall ______ in our neighborhood at the moment.",
    options: ["is building", "is being built", "has been built", "was built"],
    answer: 1,
    explanation: "Ayni paytda davom etayotgan passiv harakat: Present Continuous Passive (is being built)."
  },
  {
    id: "g_pass_3",
    topicId: "passive_voice",
    level: "B2",
    type: "sentence_completion",
    question: "All applications must ______ before the end of the month.",
    options: ["submit", "be submitted", "have submitted", "being submitted"],
    answer: 1,
    explanation: "Modal fe'llardan keyin passiv shakl 'modal + be + V3' (must be submitted) bo'ladi."
  },
  {
    id: "g_pass_4",
    topicId: "passive_voice",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] The report [B] had already completed [C] by the team [D] before the manager arrived.",
    options: ["[A] The report", "[B] had already completed", "[C] by the team", "[D] before the manager arrived"],
    answer: 1,
    explanation: "Hisobotning o'zi bajarmaydi, u bajariladi: 'had already been completed' bo'lishi shart."
  },
  {
    id: "g_pass_5",
    topicId: "passive_voice",
    level: "B1",
    type: "word_selection",
    question: "English is ______ as an official language in dozens of countries.",
    options: ["spoke", "spoken", "speaking", "speaks"],
    answer: 1,
    explanation: "Passive Voice formulasi: to be + V3 (Past Participle) -> 'is spoken'."
  },
  {
    id: "g_pass_6",
    topicId: "passive_voice",
    level: "C1",
    type: "fill_in_the_blank",
    question: "He is believed ______ the country several weeks ago.",
    options: ["to leave", "to have left", "leaving", "having left"],
    answer: 1,
    explanation: "O'tgan zamonga tegishli mish-mish/xulosa: 'subject + is believed + perfect infinitive (to have left)'."
  },
  {
    id: "g_pass_7",
    topicId: "passive_voice",
    level: "B2",
    type: "sentence_completion",
    question: "Has the suspect ______ by the police yet?",
    options: ["questioned", "been questioned", "being questioned", "be questioned"],
    answer: 1,
    explanation: "Present Perfect Passive so'roq shakli: Has + subject + been + V3 (been questioned)."
  },

  // 10. Reported Speech (7 questions)
  {
    id: "g_rep_1",
    topicId: "reported_speech",
    level: "B1",
    type: "fill_in_the_blank",
    question: "She told me that she ______ very tired that evening.",
    options: ["is", "was", "will be", "has been"],
    answer: 1,
    explanation: "Bosh gap o'tgan zamonda bo'lsa (told me), ergash gapdagi 'is' zamonlar moslashuvi bo'yicha 'was'ga o'zgaradi."
  },
  {
    id: "g_rep_2",
    topicId: "reported_speech",
    level: "B1",
    type: "multiple_choice",
    question: "He asked me where ______.",
    options: ["did I live", "I lived", "do I live", "I do live"],
    answer: 1,
    explanation: "O'zlashtirma so'roq gaplarda so'roq tartibi yo'qolib, to'g'ri so'z tartibi (ega + kesim: I lived) qo'yiladi."
  },
  {
    id: "g_rep_3",
    topicId: "reported_speech",
    level: "B2",
    type: "sentence_completion",
    question: "The teacher instructed the students ______ during the examination.",
    options: ["not to talk", "don't talk", "to not talking", "not talk"],
    answer: 0,
    explanation: "Buyruq va taqiqlarni o'zlashtirishda 'not to + infinitive' (not to talk) qo'llaniladi."
  },
  {
    id: "g_rep_4",
    topicId: "reported_speech",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] Mark said that [B] he will call me [C] the following day [D] without fail.",
    options: ["[A] Mark said that", "[B] he will call me", "[C] the following day", "[D] without fail"],
    answer: 1,
    explanation: "'Said' o'tgan zamon bo'lgani sababli 'will' zamonlar moslashuviga binoan 'would'ga aylanadi ('he would call')."
  },
  {
    id: "g_rep_5",
    topicId: "reported_speech",
    level: "B1",
    type: "word_selection",
    question: "She ______ me whether I had enjoyed the conference.",
    options: ["said", "asked", "told", "spoke"],
    answer: 1,
    explanation: "Savol berilganda va 'whether/if' bog'lovchisi mavjud bo'lganda 'asked' ishlatiladi."
  },
  {
    id: "g_rep_6",
    topicId: "reported_speech",
    level: "C1",
    type: "fill_in_the_blank",
    question: "He denied ______ the confidential files from the archive.",
    options: ["to steal", "having stolen", "stole", "to have stolen"],
    answer: 1,
    explanation: "'Deny' fe'lidan keyin gerundiy yoki tugallangan gerundiy 'having stolen' (yoki 'stealing') ishlatiladi."
  },
  {
    id: "g_rep_7",
    topicId: "reported_speech",
    level: "B2",
    type: "sentence_completion",
    question: "They promised that they ______ us as soon as they landed.",
    options: ["contact", "would contact", "will contact", "had contacted"],
    answer: 1,
    explanation: "'Promised' o'tgan zamonda bo'lgani uchun kelasi zamon 'would contact' shaklini oladi."
  },

  // 11. Relative Clauses (7 questions)
  {
    id: "g_rel_1",
    topicId: "relative_clauses",
    level: "A2",
    type: "fill_in_the_blank",
    question: "The girl ______ won the national chess championship is my cousin.",
    options: ["which", "who", "whom", "whose"],
    answer: 1,
    explanation: "Shaxslarni bildiruvchi otlar uchun nisbiy olmosh 'who' ishlatiladi."
  },
  {
    id: "g_rel_2",
    topicId: "relative_clauses",
    level: "B1",
    type: "multiple_choice",
    question: "The laptop ______ I bought last week has already stopped working.",
    options: ["who", "which", "whose", "where"],
    answer: 1,
    explanation: "Narsa va buyumlar uchun 'which' yoki 'that' nisbiy olmoshi qo'llaniladi."
  },
  {
    id: "g_rel_3",
    topicId: "relative_clauses",
    level: "B1",
    type: "sentence_completion",
    question: "That is the talented student ______ essay won first prize.",
    options: ["who", "whom", "whose", "which"],
    answer: 2,
    explanation: "Tegishlilik (egalik) ifodalashda 'whose' (uning inshosi) nisbiy olmoshi ishlatiladi."
  },
  {
    id: "g_rel_4",
    topicId: "relative_clauses",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] My brother, [B] that lives in Chicago, [C] is coming to visit us [D] next month.",
    options: ["[A] My brother,", "[B] that lives in Chicago,", "[C] is coming to visit us", "[D] next month"],
    answer: 1,
    explanation: "Vergul bilan ajratilgan non-defining relative clauses'da 'that' ishlatilmaydi; 'who' bo'lishi kerak."
  },
  {
    id: "g_rel_5",
    topicId: "relative_clauses",
    level: "B1",
    type: "fill_in_the_blank",
    question: "This is the hospital ______ my sister was born.",
    options: ["which", "where", "that", "whose"],
    answer: 1,
    explanation: "O'rin-joyga nisbatan ma'no ifodalanganda 'where' (u yerda tug'ilgan) ishlatiladi."
  },
  {
    id: "g_rel_6",
    topicId: "relative_clauses",
    level: "B2",
    type: "word_selection",
    question: "He missed the last train, ______ made him extremely upset.",
    options: ["that", "which", "what", "who"],
    answer: 1,
    explanation: "Butun bir oldingi gap mazmuniga izoh berilganda faqat ', which' ishlatiladi."
  },
  {
    id: "g_rel_7",
    topicId: "relative_clauses",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The colleague with ______ I share an office is currently on leave.",
    options: ["who", "whom", "which", "whose"],
    answer: 1,
    explanation: "Predlogdan keyin shaxs kelganda ('with whom') ob'ekt kelishigidagi 'whom' qo'llaniladi."
  },

  // 12. Gerunds and Infinitives (7 questions)
  {
    id: "g_gi_1",
    topicId: "gerunds_infinitives",
    level: "A2",
    type: "fill_in_the_blank",
    question: "I really enjoy ______ to classical music while working.",
    options: ["listen", "to listen", "listening", "to listening"],
    answer: 2,
    explanation: "'Enjoy' fe'lidan keyin har doim gerundiy (-ing shakli) keladi: 'enjoy listening'."
  },
  {
    id: "g_gi_2",
    topicId: "gerunds_infinitives",
    level: "B1",
    type: "multiple_choice",
    question: "We decided ______ our vacation until next month.",
    options: ["postpone", "to postpone", "postponing", "to postponing"],
    answer: 1,
    explanation: "'Decide' fe'lidan keyin to-infinitive ishlatiladi: 'decided to postpone'."
  },
  {
    id: "g_gi_3",
    topicId: "gerunds_infinitives",
    level: "B2",
    type: "sentence_completion",
    question: "I will never forget ______ the magnificent Eiffel Tower for the very first time.",
    options: ["to see", "seeing", "see", "having seen to"],
    answer: 1,
    explanation: "'Forget + gerund' — o'tmishda sodir bo'lgan voqeani eslash/unutish ma'nosida ishlatiladi."
  },
  {
    id: "g_gi_4",
    topicId: "gerunds_infinitives",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Remember ______ the front door before you leave the house.",
    options: ["locking", "to lock", "lock", "locked"],
    answer: 1,
    explanation: "Kelgusida qilinishi kerak bo'lgan vazifani eslatganda 'remember + to-infinitive' bo'ladi."
  },
  {
    id: "g_gi_5",
    topicId: "gerunds_infinitives",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] I look forward [B] to meet you [C] in person at [D] the annual gala.",
    options: ["[A] I look forward", "[B] to meet you", "[C] in person at", "[D] the annual gala"],
    answer: 1,
    explanation: "'Look forward to' iborasidagi 'to' predlog bo'lgani sababli undan keyin gerundiy ('to meeting you') kelishi shart."
  },
  {
    id: "g_gi_6",
    topicId: "gerunds_infinitives",
    level: "B2",
    type: "word_selection",
    question: "It is no use ______ over spilt milk.",
    options: ["to cry", "crying", "cry", "cried"],
    answer: 1,
    explanation: "'It is no use' iborasidan so'ng qat'iy gerundiy ('crying') qo'llaniladi."
  },
  {
    id: "g_gi_7",
    topicId: "gerunds_infinitives",
    level: "C1",
    type: "fill_in_the_blank",
    question: "The suspect admitted ______ the confidential documents.",
    options: ["to take", "taking", "take", "to have taking"],
    answer: 1,
    explanation: "'Admit' fe'li o'zidan keyin gerundiy (-ing shakli: taking) talab qiladi."
  },

  // 13. Subject–Verb Agreement (7 questions)
  {
    id: "g_sva_1",
    topicId: "subject_verb_agreement",
    level: "A2",
    type: "fill_in_the_blank",
    question: "Neither of the candidates ______ qualified for the position.",
    options: ["are", "is", "were", "be"],
    answer: 1,
    explanation: "'Neither of + ko'plikdagi ot' grammatik qoidaga ko'ra birlikdagi fe'l ('is') bilan ishlatiladi."
  },
  {
    id: "g_sva_2",
    topicId: "subject_verb_agreement",
    level: "B1",
    type: "multiple_choice",
    question: "The news about the international economy ______ very surprising.",
    options: ["were", "are", "is", "have been"],
    answer: 2,
    explanation: "'News' sanalmaydigan ot bo'lib, har doim birlik fe'li ('is') bilan moslashadi."
  },
  {
    id: "g_sva_3",
    topicId: "subject_verb_agreement",
    level: "B1",
    type: "sentence_completion",
    question: "A large number of students ______ participating in the science competition.",
    options: ["is", "are", "was", "has been"],
    answer: 1,
    explanation: "'A number of + plural noun' ko'plik ma'nosini beradi va ko'plikdagi fe'l ('are') oladi."
  },
  {
    id: "g_sva_4",
    topicId: "subject_verb_agreement",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The manager, along with his assistants, ______ attending the conference.",
    options: ["are", "is", "were", "have been"],
    answer: 1,
    explanation: "'Along with / as well as / together with' asosiy egaga (The manager - birlik) ta'sir qilmaydi, shuning uchun 'is'."
  },
  {
    id: "g_sva_5",
    topicId: "subject_verb_agreement",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] Every one [B] of the participants [C] were given [D] a certificate of completion.",
    options: ["[A] Every one", "[B] of the participants", "[C] were given", "[D] a certificate"],
    answer: 2,
    explanation: "'Every one of...' har doim birlik fe'lini talab qiladi; 'were given' o'rniga 'was given' bo'lishi shart."
  },
  {
    id: "g_sva_6",
    topicId: "subject_verb_agreement",
    level: "A2",
    type: "word_selection",
    question: "Ten kilometers ______ a long distance to walk in this hot weather.",
    options: ["is", "are", "were", "have been"],
    answer: 0,
    explanation: "Masofa, vaqt va pul miqdorlari yaxlit bitta tushuncha deb qaralgani uchun birlik fe'li ('is') oladi."
  },
  {
    id: "g_sva_7",
    topicId: "subject_verb_agreement",
    level: "B2",
    type: "fill_in_the_blank",
    question: "Either my sisters or my brother ______ coming to pick you up.",
    options: ["are", "is", "were", "have been"],
    answer: 1,
    explanation: "'Either... or' qoidasida fe'l o'ziga eng yaqin turgan egaga moslashadi ('my brother' - birlik -> 'is')."
  },

  // 14. Comparatives and Superlatives (7 questions)
  {
    id: "g_cs_1",
    topicId: "comparatives_superlatives",
    level: "A1",
    type: "fill_in_the_blank",
    question: "This examination was ______ than the previous one.",
    options: ["more easier", "easier", "easyer", "most easy"],
    answer: 1,
    explanation: "Ikki bo'g'inli -y bilan tugaydigan sifatlar qiyosiy darajada -ier qo'shimchasini oladi ('easier')."
  },
  {
    id: "g_cs_2",
    topicId: "comparatives_superlatives",
    level: "A2",
    type: "multiple_choice",
    question: "Tokyo is one of ______ cities in the entire world.",
    options: ["more populated", "the most populated", "most populated", "populater"],
    answer: 1,
    explanation: "Orttirma darajadagi ko'p bo'g'inli sifatlar 'the most + adjective' qoidasi bo'yicha yasaladi."
  },
  {
    id: "g_cs_3",
    topicId: "comparatives_superlatives",
    level: "B1",
    type: "sentence_completion",
    question: "The harder you work today, ______ results you will achieve tomorrow.",
    options: ["the better", "better", "the best", "most good"],
    answer: 0,
    explanation: "Parallel o'sish qoidasi: 'The + comparative..., the + comparative...' ('the harder..., the better')."
  },
  {
    id: "g_cs_4",
    topicId: "comparatives_superlatives",
    level: "A2",
    type: "fill_in_the_blank",
    question: "His new smartphone is not as expensive ______ his old one.",
    options: ["than", "as", "like", "so"],
    answer: 1,
    explanation: "Tenglikni ifodalashda 'as + adjective + as' qolipi ishlatiladi ('as expensive as')."
  },
  {
    id: "g_cs_5",
    topicId: "comparatives_superlatives",
    level: "B2",
    type: "error_identification",
    question: "Find the error: [A] This hotel is [B] far more cheaper [C] than the luxury resort [D] down the street.",
    options: ["[A] This hotel is", "[B] far more cheaper", "[C] than the luxury resort", "[D] down the street"],
    answer: 1,
    explanation: "'More cheaper' qo'shaloq qiyosiy xato; to'g'risi 'far cheaper' bo'lishi kerak."
  },
  {
    id: "g_cs_6",
    topicId: "comparatives_superlatives",
    level: "B1",
    type: "word_selection",
    question: "Her condition is slightly ______ today than it was yesterday.",
    options: ["good", "better", "best", "more good"],
    answer: 1,
    explanation: "'Good' sifatining qiyosiy shakli noto'g'ri sifat bo'lib, 'better' deb yoziladi."
  },
  {
    id: "g_cs_7",
    topicId: "comparatives_superlatives",
    level: "B2",
    type: "fill_in_the_blank",
    question: "Out of the two solutions presented, this one is clearly ______.",
    options: ["the best", "the better", "better than", "most good"],
    answer: 1,
    explanation: "Faqat ikkita narsani taqqoslaganda 'the + comparative' (the better) qo'llaniladi."
  },

  // 15. Mixed Grammar (8 questions)
  {
    id: "g_mix_1",
    topicId: "mixed_grammar",
    level: "B1",
    type: "fill_in_the_blank",
    question: "I wish I ______ more free time to travel the world.",
    options: ["have", "had", "will have", "would have"],
    answer: 1,
    explanation: "Hozirgi paytdagi istak uchun 'wish + Past Simple' (had) ishlatiladi."
  },
  {
    id: "g_mix_2",
    topicId: "mixed_grammar",
    level: "B2",
    type: "multiple_choice",
    question: "Rarely ______ such an incredible act of bravery.",
    options: ["I have seen", "have I seen", "did I saw", "I saw"],
    answer: 1,
    explanation: "Inkor so'z (Rarely / Seldom / Never) gap boshida kelsa, inversiya (have I seen) sodir bo'ladi."
  },
  {
    id: "g_mix_3",
    topicId: "mixed_grammar",
    level: "B1",
    type: "sentence_completion",
    question: "She had her car ______ at the local service station.",
    options: ["repair", "repaired", "repairing", "to repair"],
    answer: 1,
    explanation: "Causative form: 'have + object + V3' (had her car repaired) — o'zgalarga qildirish."
  },
  {
    id: "g_mix_4",
    topicId: "mixed_grammar",
    level: "B2",
    type: "fill_in_the_blank",
    question: "You had better ______ an umbrella; the sky is very dark.",
    options: ["take", "to take", "taking", "took"],
    answer: 0,
    explanation: "'Had better' iborasidan keyin to'g'ridan-to'g'ri yalang'och infinitiv (take) qo'yiladi."
  },
  {
    id: "g_mix_5",
    topicId: "mixed_grammar",
    level: "C1",
    type: "error_identification",
    question: "Find the error: [A] Not only [B] he arrived late, [C] but he also forgot [D] his presentation notes.",
    options: ["[A] Not only", "[B] he arrived late", "[C] but he also forgot", "[D] his presentation notes"],
    answer: 1,
    explanation: "'Not only' gap boshida kelganda inversiya talab qilinadi: 'did he arrive late' bo'lishi kerak."
  },
  {
    id: "g_mix_6",
    topicId: "mixed_grammar",
    level: "B2",
    type: "word_selection",
    question: "The doctor recommended that he ______ less coffee.",
    options: ["drinks", "drink", "drank", "is drinking"],
    answer: 1,
    explanation: "Subjunctive mood: 'recommend that + subject + base form (drink)'."
  },
  {
    id: "g_mix_7",
    topicId: "mixed_grammar",
    level: "B1",
    type: "fill_in_the_blank",
    question: "She is used to ______ up early in the morning.",
    options: ["wake", "waking", "woke", "woken"],
    answer: 1,
    explanation: "'Be used to + gerund (-ing)' — biror narsaga odatlangan bo'lmoq (waking)."
  },
  {
    id: "g_mix_8",
    topicId: "mixed_grammar",
    level: "C1",
    type: "fill_in_the_blank",
    question: "No sooner ______ entered the room than the phone rang.",
    options: ["he had", "had he", "did he", "was he"],
    answer: 1,
    explanation: "'No sooner + had + subject + V3... than' inversiya qolipi ishlatiladi."
  }
];
