// Vocabulary Quiz Questions Database (112 questions across 8 categories and 5 CEFR levels)
window.QUIZ_VOCAB_TOPICS = [
  { id: "word_meaning", name: "Word Meaning", uz: "So'z Ma'nosi", desc: "So'zlarning aniq ma'nosi va ta'rifini topish", levels: ["A1", "A2", "B1", "B2", "C1"] },
  { id: "synonyms", name: "Synonyms", uz: "Sinonimlar", desc: "Ma'nodosh so'zlarni aniqlash va lug'atni boyitish", levels: ["A2", "B1", "B2", "C1"] },
  { id: "antonyms", name: "Antonyms", uz: "Antonimlar", desc: "Qarama-qarshi ma'nodagi so'zlarni topish", levels: ["A1", "A2", "B1", "B2"] },
  { id: "word_in_context", name: "Word in Context", uz: "Kontekstda So'z Qo'llash", desc: "Gap mazmuniga eng mos tushuvchi so'zni tanlash", levels: ["A2", "B1", "B2", "C1"] },
  { id: "collocations", name: "Collocations", uz: "Tabiiy So'z Birikmalari", desc: "Doim birga keluvchi barqaror so'z juftliklari", levels: ["B1", "B2", "C1"] },
  { id: "phrasal_verbs", name: "Phrasal Verbs", uz: "Frazali Fe'llar", desc: "Fe'l va predlogdan tashkil topgan maxsus birikmalar", levels: ["B1", "B2", "C1"] },
  { id: "word_formation", name: "Word Formation", uz: "So'z Yasash", desc: "Old va orqa qo'shimchalar yordamida to'g'ri so'z shaklini hosil qilish", levels: ["B1", "B2", "C1"] },
  { id: "common_expressions", name: "Common Expressions & Idioms", uz: "Kundalik Iboralar va Idiomalar", desc: "Nutqda faol ishlatiladigan ko'chma ma'noli iboralar", levels: ["A2", "B1", "B2", "C1"] }
];

window.QUIZ_VOCABULARY = [
  // 1. Word Meaning (14 questions)
  {
    id: "v_wm_1",
    topicId: "word_meaning",
    level: "A1",
    type: "multiple_choice",
    question: "What does the word 'ancient' mean?",
    options: ["Very modern and new", "Belonging to a very distant past", "Extremely tiny", "Bright and colorful"],
    answer: 1,
    explanation: "'Ancient' — juda qadimiy, uzoq o'tmishga oid degan ma'noni anglatadi."
  },
  {
    id: "v_wm_2",
    topicId: "word_meaning",
    level: "A2",
    type: "word_selection",
    question: "A person who designs buildings and houses is called an ______.",
    options: ["accountant", "architect", "electrician", "author"],
    answer: 1,
    explanation: "Binolar va uylarning loyihasini chizuvchi mutaxassis — 'architect' (arxitektor)."
  },
  {
    id: "v_wm_3",
    topicId: "word_meaning",
    level: "B1",
    type: "multiple_choice",
    question: "What is the meaning of the adjective 'reluctant'?",
    options: ["Enthusiastic and eager", "Unwilling and hesitant", "Extremely confident", "Deeply generous"],
    answer: 1,
    explanation: "'Reluctant' — istamaydigan, ikkilanuvchi, rozi bo'lishga shoshilmaydigan."
  },
  {
    id: "v_wm_4",
    topicId: "word_meaning",
    level: "B1",
    type: "word_selection",
    question: "The ability to recover quickly from difficulties is known as ______.",
    options: ["negligence", "resilience", "arrogance", "reluctance"],
    answer: 1,
    explanation: "'Resilience' — qiyinchiliklardan tezda o'nglanib olish, chidamlilik va moslashuvchanlik."
  },
  {
    id: "v_wm_5",
    topicId: "word_meaning",
    level: "B2",
    type: "multiple_choice",
    question: "If something is described as 'ubiquitous', it is ______.",
    options: ["found or present everywhere", "extremely rare and precious", "hidden underground", "completely useless"],
    answer: 0,
    explanation: "'Ubiquitous' — hamma joyda uchraydigan, keng tarqalgan (masalan, smartphones are ubiquitous)."
  },
  {
    id: "v_wm_6",
    topicId: "word_meaning",
    level: "B2",
    type: "word_selection",
    question: "A feeling of deep respect mixed with wonder is called ______.",
    options: ["scorn", "awe", "dread", "spite"],
    answer: 1,
    explanation: "'Awe' — hayrat va chuqur ehtirom aralash tuyg'u (hayratlanish)."
  },
  {
    id: "v_wm_7",
    topicId: "word_meaning",
    level: "C1",
    type: "multiple_choice",
    question: "What does 'ephemeral' mean?",
    options: ["Lasting for a very short time", "Eternal and permanent", "Extremely complicated", "Physically powerful"],
    answer: 0,
    explanation: "'Ephemeral' — o'tkinchi, qisqa muddatli, tez g'oyib bo'ladigan."
  },
  {
    id: "v_wm_8",
    topicId: "word_meaning",
    level: "A2",
    type: "fill_in_the_blank",
    question: "A ______ is a strong vehicle used to carry sick or injured people to the hospital.",
    options: ["tractor", "submarine", "ambulance", "helicopter"],
    answer: 2,
    explanation: "'Ambulance' — tez yordam mashinasi."
  },
  {
    id: "v_wm_9",
    topicId: "word_meaning",
    level: "B1",
    type: "multiple_choice",
    question: "What does 'candid' mean in communication?",
    options: ["Deceptive and tricky", "Truthful and straightforward", "Shy and quiet", "Aggressive and hostile"],
    answer: 1,
    explanation: "'Candid' — ochiqko'ngil, samimiy va to'g'riso'z."
  },
  {
    id: "v_wm_10",
    topicId: "word_meaning",
    level: "B2",
    type: "word_selection",
    question: "A person who always expects the best possible outcome is an ______.",
    options: ["optimist", "pessimist", "cynic", "antagonist"],
    answer: 0,
    explanation: "'Optimist' — har narsaning yaxshi tomonini ko'ruvchi, nekbin shaxs."
  },
  {
    id: "v_wm_11",
    topicId: "word_meaning",
    level: "C1",
    type: "multiple_choice",
    question: "The word 'meticulous' means ______.",
    options: ["careless and rushed", "showing great attention to detail", "very noisy and disruptive", "unwilling to change"],
    answer: 1,
    explanation: "'Meticulous' — mayda-chuydasigacha o'ta sinchkov, e'tiborli va tartibli."
  },
  {
    id: "v_wm_12",
    topicId: "word_meaning",
    level: "A1",
    type: "fill_in_the_blank",
    question: "The son of your brother or sister is your ______.",
    options: ["nephew", "niece", "cousin", "uncle"],
    answer: 0,
    explanation: "'Nephew' — aka-uka yoki opa-singilning o'g'il farzandi (jiyan)."
  },
  {
    id: "v_wm_13",
    topicId: "word_meaning",
    level: "B2",
    type: "multiple_choice",
    question: "What does the verb 'mitigate' mean?",
    options: ["To worsen an issue", "To make something less severe", "To celebrate wildly", "To copy directly"],
    answer: 1,
    explanation: "'Mitigate' — yumshatmoq, og'irlikni yoki zararni kamaytirmoq."
  },
  {
    id: "v_wm_14",
    topicId: "word_meaning",
    level: "C1",
    type: "word_selection",
    question: "An official forgiveness or pardon for people convicted of political offenses is ______.",
    options: ["embargo", "amnesty", "litigation", "sanction"],
    answer: 1,
    explanation: "'Amnesty' — amnistiya, umumiy afv etish."
  },

  // 2. Synonyms (14 questions)
  {
    id: "v_syn_1",
    topicId: "synonyms",
    level: "A2",
    type: "multiple_choice",
    question: "Which word is a synonym for 'wealthy'?",
    options: ["Poor", "Rich", "Greedy", "Broke"],
    answer: 1,
    explanation: "'Wealthy' so'zining sinonimi 'rich' (boy, badavlat)."
  },
  {
    id: "v_syn_2",
    topicId: "synonyms",
    level: "B1",
    type: "multiple_choice",
    question: "Choose the best synonym for 'accurate':",
    options: ["Vague", "Precise", "Careless", "Quick"],
    answer: 1,
    explanation: "'Accurate' — aniq, to'g'ri. Uning yaqin ma'nodosh sinonimi 'precise'."
  },
  {
    id: "v_syn_3",
    topicId: "synonyms",
    level: "B1",
    type: "multiple_choice",
    question: "What is the synonym of 'gigantic'?",
    options: ["Colossal", "Miniature", "Fragile", "Bland"],
    answer: 0,
    explanation: "'Gigantic' (ulkan, bahaybat) so'zining sinonimi 'colossal' hisoblanadi."
  },
  {
    id: "v_syn_4",
    topicId: "synonyms",
    level: "B2",
    type: "multiple_choice",
    question: "Which of the following is a synonym for 'compulsory'?",
    options: ["Optional", "Mandatory", "Flexible", "Voluntary"],
    answer: 1,
    explanation: "'Compulsory' — majburiy. Uning eng yaqin sinonimi 'mandatory'."
  },
  {
    id: "v_syn_5",
    topicId: "synonyms",
    level: "B2",
    type: "multiple_choice",
    question: "Find the synonym for 'plausible':",
    options: ["Credible", "Absurd", "Outrageous", "Unlikely"],
    answer: 0,
    explanation: "'Plausible' — aqlga sig'adigan, ishonchli. Sinonimi 'credible'."
  },
  {
    id: "v_syn_6",
    topicId: "synonyms",
    level: "C1",
    type: "multiple_choice",
    question: "What is a synonym for 'lucid'?",
    options: ["Murky", "Ambiguous", "Clear", "Hostile"],
    answer: 2,
    explanation: "'Lucid' — tushunarli, ravshan, tiniq ('clear')."
  },
  {
    id: "v_syn_7",
    topicId: "synonyms",
    level: "A2",
    type: "multiple_choice",
    question: "Select the synonym for 'furious':",
    options: ["Delighted", "Calm", "Extremely angry", "Anxious"],
    answer: 2,
    explanation: "'Furious' — juda qattiq g'azablangan ('extremely angry')."
  },
  {
    id: "v_syn_8",
    topicId: "synonyms",
    level: "B1",
    type: "multiple_choice",
    question: "Which word means the same as 'drowsy'?",
    options: ["Alert", "Sleepy", "Active", "Angry"],
    answer: 1,
    explanation: "'Drowsy' — uyqusiragan, mudroq bosgan ('sleepy')."
  },
  {
    id: "v_syn_9",
    topicId: "synonyms",
    level: "B2",
    type: "multiple_choice",
    question: "What is the synonym of 'prudent'?",
    options: ["Reckless", "Wise", "Hasty", "Stubborn"],
    answer: 1,
    explanation: "'Prudent' — ehtiyotkor, oqilona ish tutuvchi ('wise / cautious')."
  },
  {
    id: "v_syn_10",
    topicId: "synonyms",
    level: "C1",
    type: "multiple_choice",
    question: "Which word is a synonym for 'indolent'?",
    options: ["Diligent", "Lazy", "Generous", "Violent"],
    answer: 1,
    explanation: "'Indolent' — yalqov, harakatsiz, dangasa ('lazy')."
  },
  {
    id: "v_syn_11",
    topicId: "synonyms",
    level: "B1",
    type: "multiple_choice",
    question: "Find the synonym for 'hazard':",
    options: ["Danger", "Safety", "Reward", "Comfort"],
    answer: 0,
    explanation: "'Hazard' — xavf-xatar ('danger / peril')."
  },
  {
    id: "v_syn_12",
    topicId: "synonyms",
    level: "B2",
    type: "multiple_choice",
    question: "What is a synonym for 'obscure'?",
    options: ["Unclear", "Famous", "Apparent", "Bright"],
    answer: 0,
    explanation: "'Obscure' — noaniq, tushunarsiz, uncha ma'lum bo'lmagan ('unclear')."
  },
  {
    id: "v_syn_13",
    topicId: "synonyms",
    level: "A2",
    type: "multiple_choice",
    question: "Select the synonym of 'courageous':",
    options: ["Timid", "Brave", "Cowardly", "Gentle"],
    answer: 1,
    explanation: "'Courageous' — jasur, dovyurak ('brave')."
  },
  {
    id: "v_syn_14",
    topicId: "synonyms",
    level: "C1",
    type: "multiple_choice",
    question: "What is the synonym of 'ubiquity'?",
    options: ["Pervasiveness", "Scarcity", "Solitude", "Simplicity"],
    answer: 0,
    explanation: "'Ubiquity' — hamma joyda mavjudlik ('pervasiveness / omnipresence')."
  },

  // 3. Antonyms (14 questions)
  {
    id: "v_ant_1",
    topicId: "antonyms",
    level: "A1",
    type: "multiple_choice",
    question: "What is the antonym of 'empty'?",
    options: ["Hollow", "Full", "Clear", "Vacant"],
    answer: 1,
    explanation: "'Empty' (bo'sh) so'zining antonimi 'full' (to'la)."
  },
  {
    id: "v_ant_2",
    topicId: "antonyms",
    level: "A2",
    type: "multiple_choice",
    question: "What is the opposite of 'generous'?",
    options: ["Stingy", "Kind", "Helpful", "Polite"],
    answer: 0,
    explanation: "'Generous' (saxiy) so'ziga qarama-qarshi ma'nodagi so'z 'stingy' (baxil, xasis)."
  },
  {
    id: "v_ant_3",
    topicId: "antonyms",
    level: "B1",
    type: "multiple_choice",
    question: "Choose the antonym for 'scarce':",
    options: ["Abundant", "Rare", "Meager", "Limited"],
    answer: 0,
    explanation: "'Scarce' — tanqis, kamyob. Qarama-qarshi ma'nosi 'abundant' (mo'l-ko'l)."
  },
  {
    id: "v_ant_4",
    topicId: "antonyms",
    level: "B1",
    type: "multiple_choice",
    question: "What is the opposite of 'expand'?",
    options: ["Contract", "Enlarge", "Widen", "Multiply"],
    answer: 0,
    explanation: "'Expand' (kengaymoq) fe'lining antonimi 'contract' (qisqarmoq, toraymoq)."
  },
  {
    id: "v_ant_5",
    topicId: "antonyms",
    level: "B2",
    type: "multiple_choice",
    question: "Find the antonym for 'hostile':",
    options: ["Amicable", "Antagonistic", "Aggressive", "Bitter"],
    answer: 0,
    explanation: "'Hostile' (dushmanona, adovatli) antonimi 'amicable' (do'stona, totuv)."
  },
  {
    id: "v_ant_6",
    topicId: "antonyms",
    level: "B2",
    type: "multiple_choice",
    question: "What is the opposite of 'rigid'?",
    options: ["Flexible", "Stiff", "Harsh", "Strict"],
    answer: 0,
    explanation: "'Rigid' (egilmas, qotib qolgan) so'zining antonimi 'flexible' (egiluvchan, moslashuvchan)."
  },
  {
    id: "v_ant_7",
    topicId: "antonyms",
    level: "A2",
    type: "multiple_choice",
    question: "Select the antonym for 'innocent':",
    options: ["Guilty", "Pure", "Harmless", "Naive"],
    answer: 0,
    explanation: "'Innocent' (begunoh, aybsiz) so'zining qarama-qarshisi 'guilty' (aybdor)."
  },
  {
    id: "v_ant_8",
    topicId: "antonyms",
    level: "B1",
    type: "multiple_choice",
    question: "What is the opposite of 'transparent'?",
    options: ["Opaque", "Clear", "Lucid", "Glassy"],
    answer: 0,
    explanation: "'Transparent' (shaffof) so'zining antonimi 'opaque' (nurni o'tkazmaydigan, xira)."
  },
  {
    id: "v_ant_9",
    topicId: "antonyms",
    level: "B2",
    type: "multiple_choice",
    question: "Find the antonym of 'superficial':",
    options: ["Profound", "Shallow", "Trivial", "Casual"],
    answer: 0,
    explanation: "'Superficial' (yuzaki) so'zining teskari ma'nosi 'profound' (teran, chuqur)."
  },
  {
    id: "v_ant_10",
    topicId: "antonyms",
    level: "A1",
    type: "multiple_choice",
    question: "What is the opposite of 'smooth'?",
    options: ["Rough", "Sleek", "Silky", "Flat"],
    answer: 0,
    explanation: "'Smooth' (silliq) so'zining antonimi 'rough' (g'adir-budur, qovushmagan)."
  },
  {
    id: "v_ant_11",
    topicId: "antonyms",
    level: "B1",
    type: "multiple_choice",
    question: "Choose the antonym for 'praise':",
    options: ["Criticize", "Compliment", "Applaud", "Admire"],
    answer: 0,
    explanation: "'Praise' (maqtamoq) so'zining antonimi 'criticize' (tanqid qilmoq)."
  },
  {
    id: "v_ant_12",
    topicId: "antonyms",
    level: "B2",
    type: "multiple_choice",
    question: "What is the opposite of 'genuine'?",
    options: ["Artificial", "Authentic", "Sincere", "Original"],
    answer: 0,
    explanation: "'Genuine' (asl, haqiqiy) so'zining antonimi 'artificial' yoki 'fake'."
  },
  {
    id: "v_ant_13",
    topicId: "antonyms",
    level: "A2",
    type: "multiple_choice",
    question: "Select the opposite of 'cautious':",
    options: ["Reckless", "Careful", "Watchful", "Guarded"],
    answer: 0,
    explanation: "'Cautious' (ehtiyotkor) antonimi 'reckless' (o'ylamasdan harakat qiluvchi)."
  },
  {
    id: "v_ant_14",
    topicId: "antonyms",
    level: "B2",
    type: "multiple_choice",
    question: "What is the opposite of 'affluent'?",
    options: ["Impoverished", "Prosperous", "Flourishing", "Comfortable"],
    answer: 0,
    explanation: "'Affluent' (to'q, badavlat) antonimi 'impoverished' (qashshoqlashgan, kambag'al)."
  },

  // 4. Word in Context (14 questions)
  {
    id: "v_wic_1",
    topicId: "word_in_context",
    level: "A2",
    type: "word_selection",
    question: "She showed great ______ by standing on stage and speaking in front of hundreds of people.",
    options: ["fear", "courage", "laziness", "sadness"],
    answer: 1,
    explanation: "Ko'pchilik oldida sahnada gapira olish insonning 'courage' (jasorati)ni bildiradi."
  },
  {
    id: "v_wic_2",
    topicId: "word_in_context",
    level: "B1",
    type: "fill_in_the_blank",
    question: "The government has implemented strict policies to reduce air ______ in the capital.",
    options: ["pollution", "population", "production", "promotion"],
    answer: 0,
    explanation: "Havoni ifloslanishdan tozalash kontekstida 'air pollution' birikmasi qo'llaniladi."
  },
  {
    id: "v_wic_3",
    topicId: "word_in_context",
    level: "B1",
    type: "word_selection",
    question: "Due to heavy snowfall, many flights were temporarily ______ until the runways were cleared.",
    options: ["promoted", "suspended", "celebrated", "advertised"],
    answer: 1,
    explanation: "Noqulay ob-havo tufayli reyslar vaqtincha to'xtatildi ('suspended')."
  },
  {
    id: "v_wic_4",
    topicId: "word_in_context",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The economic crisis had a ______ impact on small business owners across the region.",
    options: ["trivial", "detrimental", "favorable", "delightful"],
    answer: 1,
    explanation: "Iqtisodiy inqiroz kichik biznesga zararli, salbiy ta'sir ko'rsatgan: 'detrimental impact'."
  },
  {
    id: "v_wic_5",
    topicId: "word_in_context",
    level: "B2",
    type: "word_selection",
    question: "Her explanation was so ______ that even complete beginners could understand the concept.",
    options: ["lucid", "perplexing", "ambiguous", "cluttered"],
    answer: 0,
    explanation: "Boshlovchilar ham darhol tushuna olgan bo'lsa, tushuntirish juda ravshan ('lucid') bo'lgan."
  },
  {
    id: "v_wic_6",
    topicId: "word_in_context",
    level: "C1",
    type: "fill_in_the_blank",
    question: "The scientist's claims were met with widespread ______ until verified by independent laboratories.",
    options: ["credulity", "skepticism", "compliance", "homage"],
    answer: 1,
    explanation: "Laboratoriyada tasdiqlanmaguncha ilmiy iddaolarga shubha bilan qaralgan: 'skepticism'."
  },
  {
    id: "v_wic_7",
    topicId: "word_in_context",
    level: "A2",
    type: "sentence_completion",
    question: "Please remember to turn off the lights before leaving to save ______.",
    options: ["traffic", "energy", "pollution", "space"],
    answer: 1,
    explanation: "Chiroqlarni o'chirish orqali elektr energiyasi tejaladi ('save energy')."
  },
  {
    id: "v_wic_8",
    topicId: "word_in_context",
    level: "B1",
    type: "word_selection",
    question: "He felt a wave of ______ when he saw his childhood home after twenty years.",
    options: ["nostalgia", "apathy", "jealousy", "hostility"],
    answer: 0,
    explanation: "Bolalik uyi yoki o'tmishni eslab qo'msash hissi — 'nostalgia'."
  },
  {
    id: "v_wic_9",
    topicId: "word_in_context",
    level: "B2",
    type: "fill_in_the_blank",
    question: "Doctors emphasized the importance of a balanced diet and regular exercise to ______ illness.",
    options: ["prevent", "provoke", "endure", "simulate"],
    answer: 0,
    explanation: "Sog'lom turmush tarzi kasalliklarning oldini oladi ('prevent illness')."
  },
  {
    id: "v_wic_10",
    topicId: "word_in_context",
    level: "C1",
    type: "word_selection",
    question: "His ______ response to the reporter's question left no doubt about his firm stance on the issue.",
    options: ["equivocal", "unequivocal", "hesitant", "evasive"],
    answer: 1,
    explanation: "Hech qanday shubha qoldirmagan, qat'iy va ochiq javob — 'unequivocal response'."
  },
  {
    id: "v_wic_11",
    topicId: "word_in_context",
    level: "B1",
    type: "fill_in_the_blank",
    question: "The internet connection was so ______ that the video call kept disconnecting.",
    options: ["stable", "unstable", "rapid", "durable"],
    answer: 1,
    explanation: "Doimiy uzilib turgan aloqa beqaror bo'ladi: 'unstable connection'."
  },
  {
    id: "v_wic_12",
    topicId: "word_in_context",
    level: "B2",
    type: "sentence_completion",
    question: "The company achieved record-breaking profits this quarter, surpassing all market ______.",
    options: ["exceptions", "expectations", "interruptions", "delays"],
    answer: 1,
    explanation: "Kutilgan ko'rsatkichlardan ham oshib ketish — 'surpassing expectations'."
  },
  {
    id: "v_wic_13",
    topicId: "word_in_context",
    level: "A2",
    type: "word_selection",
    question: "She had to pay a fine because she exceeded the speed ______ on the highway.",
    options: ["barrier", "limit", "border", "edge"],
    answer: 1,
    explanation: "Yo'ldagi belgilangan tezlik chegarasi — 'speed limit'."
  },
  {
    id: "v_wic_14",
    topicId: "word_in_context",
    level: "C1",
    type: "fill_in_the_blank",
    question: "The minister was accused of making ______ statements intended to deceive voters.",
    options: ["misleading", "straightforward", "transparent", "coherent"],
    answer: 0,
    explanation: "Odamlarni chalg'ituvchi bayonotlar — 'misleading statements'."
  },

  // 5. Collocations (14 questions)
  {
    id: "v_col_1",
    topicId: "collocations",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Students are expected to ______ attention throughout the lecture.",
    options: ["give", "pay", "take", "make"],
    answer: 1,
    explanation: "Ingliz tilida e'tibor bermoq birikmasi 'pay attention' shaklida ishlatiladi."
  },
  {
    id: "v_col_2",
    topicId: "collocations",
    level: "A2",
    type: "word_selection",
    question: "Don't be afraid to ______ a mistake; that is how we learn.",
    options: ["do", "make", "take", "create"],
    answer: 1,
    explanation: "Xato qilmoq 'do a mistake' emas, barqaror birikma sifatida 'make a mistake' bo'ladi."
  },
  {
    id: "v_col_3",
    topicId: "collocations",
    level: "B1",
    type: "sentence_completion",
    question: "Could you please ______ me a favor and review this draft?",
    options: ["make", "do", "give", "bring"],
    answer: 1,
    explanation: "Yaxshilik yoki iltifot qilmoq birikmasi 'do someone a favor' deb yuritiladi."
  },
  {
    id: "v_col_4",
    topicId: "collocations",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The startup is planning to ______ an important business deal next week.",
    options: ["strike", "hit", "knock", "slap"],
    answer: 0,
    explanation: "Bitim tuzmoq, kelishuvga erishmoq birikmasi 'strike a deal' shaklida keladi."
  },
  {
    id: "v_col_5",
    topicId: "collocations",
    level: "B2",
    type: "word_selection",
    question: "Heavy rain can ______ havoc on local transport infrastructure.",
    options: ["wreak", "build", "form", "place"],
    answer: 0,
    explanation: "'Wreak havoc' — jiddiy zarar yetkazmoq, tartibsizlik va vayronagarchilik keltirib chiqarmoq."
  },
  {
    id: "v_col_6",
    topicId: "collocations",
    level: "B1",
    type: "fill_in_the_blank",
    question: "After working twelve hours straight, he was ______ exhausted.",
    options: ["utterly", "slightly", "widely", "highly"],
    answer: 0,
    explanation: "'Exhausted' (o'ta charchagan) bilan kuchaytiruvchi tabiiy kollokatsiya 'utterly exhausted' hisoblanadi."
  },
  {
    id: "v_col_7",
    topicId: "collocations",
    level: "B2",
    type: "sentence_completion",
    question: "I took his words to ______ and decided to change my career path.",
    options: ["mind", "heart", "head", "soul"],
    answer: 1,
    explanation: "'Take something to heart' — maslahatni yoki gapni chuqur qabul qilmoq, jiddiy hisobga olmoq."
  },
  {
    id: "v_col_8",
    topicId: "collocations",
    level: "A2",
    type: "fill_in_the_blank",
    question: "It took him several weeks to ______ friends in his new school.",
    options: ["do", "make", "find", "reach"],
    answer: 1,
    explanation: "Do'st orttirmoq — 'make friends'."
  },
  {
    id: "v_col_9",
    topicId: "collocations",
    level: "B1",
    type: "word_selection",
    question: "We need to ______ a decision before the application deadline passes.",
    options: ["reach", "take", "make", "do"],
    answer: 2,
    explanation: "Qaror qabul qilmoq uchun 'make a decision' (yoki 'reach a decision') ishlatiladi."
  },
  {
    id: "v_col_10",
    topicId: "collocations",
    level: "B2",
    type: "fill_in_the_blank",
    question: "Smoking poses a ______ risk to cardiovascular health.",
    options: ["tall", "high", "grave", "dense"],
    answer: 2,
    explanation: "'Grave risk / serious risk' — salomatlikka jiddiy va og'ir xavf tug'dirmoq."
  },
  {
    id: "v_col_11",
    topicId: "collocations",
    level: "C1",
    type: "sentence_completion",
    question: "The judge stated that the accused had shown a ______ disregard for public safety.",
    options: ["blatant", "heavy", "thick", "deep"],
    answer: 0,
    explanation: "'Blatant disregard' — ochiqchasiga mensimaslik, qonunga ko'z ko'ra-bila bo'ysunmaslik."
  },
  {
    id: "v_col_12",
    topicId: "collocations",
    level: "B1",
    type: "word_selection",
    question: "She gave a ______ explanation that answered all our questions immediately.",
    options: ["short", "brief", "tiny", "little"],
    answer: 1,
    explanation: "Qisqa va lo'nda tushuntirish uchun 'brief explanation' eng tabiiy kollokatsiyadir."
  },
  {
    id: "v_col_13",
    topicId: "collocations",
    level: "B2",
    type: "fill_in_the_blank",
    question: "The two organizations entered into a ______ partnership to develop renewable energy.",
    options: ["joint", "collective", "combined", "twin"],
    answer: 0,
    explanation: "Qo'shma hamkorlik — 'joint partnership' yoki 'joint venture'."
  },
  {
    id: "v_col_14",
    topicId: "collocations",
    level: "C1",
    type: "word_selection",
    question: "The sudden resignation of the CEO sparked ______ controversy in the industry.",
    options: ["fierce", "narrow", "flat", "tight"],
    answer: 0,
    explanation: "Shiddatli bahs-munozaralar keltirib chiqarmoq — 'spark fierce controversy'."
  },

  // 6. Phrasal Verbs (14 questions)
  {
    id: "v_pv_1",
    topicId: "phrasal_verbs",
    level: "A2",
    type: "fill_in_the_blank",
    question: "Don't ______! Keep trying and you will eventually succeed.",
    options: ["give up", "give in", "give away", "give off"],
    answer: 0,
    explanation: "'Give up' — taslim bo'lmoq, umidni uzmoq."
  },
  {
    id: "v_pv_2",
    topicId: "phrasal_verbs",
    level: "B1",
    type: "multiple_choice",
    question: "They had to ______ the football match because of torrential rain.",
    options: ["call off", "put off", "take off", "turn off"],
    answer: 0,
    explanation: "'Call off' — butunlay bekor qilmoq ('cancel'). 'Put off' esa faqat keyinga qoldirishdir."
  },
  {
    id: "v_pv_3",
    topicId: "phrasal_verbs",
    level: "B1",
    type: "sentence_completion",
    question: "I happened to ______ an old friend while shopping at the supermarket.",
    options: ["run into", "run over", "run out", "run away"],
    answer: 0,
    explanation: "'Run into someone' — kutilmaganda, tasodifan uchratib qolmoq."
  },
  {
    id: "v_pv_4",
    topicId: "phrasal_verbs",
    level: "B2",
    type: "fill_in_the_blank",
    question: "We have ______ sugar; could you buy some on your way home?",
    options: ["run out of", "run out with", "run away from", "run through"],
    answer: 0,
    explanation: "'Run out of something' — zaxira tugab qolmoq (masalan, shakarsiz qolmoq)."
  },
  {
    id: "v_pv_5",
    topicId: "phrasal_verbs",
    level: "B2",
    type: "multiple_choice",
    question: "What does 'bring up' mean in the sentence: 'She brought up three wonderful children'?",
    options: ["To mention a topic", "To raise and educate", "To vomit", "To build a house"],
    answer: 1,
    explanation: "Bolalarga nisbatan 'bring up' — voyaga yetkazmoq, tarbiya qilmoq ('raise')."
  },
  {
    id: "v_pv_6",
    topicId: "phrasal_verbs",
    level: "B1",
    type: "word_selection",
    question: "You should ______ the new vocabulary words in an English dictionary.",
    options: ["look up", "look for", "look after", "look out"],
    answer: 0,
    explanation: "Lug'atdan yoki ma'lumotnomadan qidirib topmoq — 'look up'."
  },
  {
    id: "v_pv_7",
    topicId: "phrasal_verbs",
    level: "B2",
    type: "sentence_completion",
    question: "She took a deep breath to ______ her nerves before the speech.",
    options: ["settle down", "calm down", "bring down", "pull down"],
    answer: 1,
    explanation: "'Calm down' — o'zini tinchlantirmoq, hayajonni bosmoq."
  },
  {
    id: "v_pv_8",
    topicId: "phrasal_verbs",
    level: "B1",
    type: "fill_in_the_blank",
    question: "Could you please ______ after my cat while I am on vacation?",
    options: ["look", "take", "look after", "see to"],
    answer: 2,
    explanation: "'Look after' — g'amxo'rlik qilmoq, qarab turmoq ('take care of')."
  },
  {
    id: "v_pv_9",
    topicId: "phrasal_verbs",
    level: "B2",
    type: "multiple_choice",
    question: "The plane will ______ in about twenty minutes.",
    options: ["take on", "take off", "take up", "take out"],
    answer: 1,
    explanation: "Samolyotning yerdan ko'tarilishi 'take off' deb ataladi."
  },
  {
    id: "v_pv_10",
    topicId: "phrasal_verbs",
    level: "C1",
    type: "fill_in_the_blank",
    question: "The board decided to ______ with the obsolete regulations.",
    options: ["do away", "make away", "put away", "take away"],
    answer: 0,
    explanation: "'Do away with' — bekor qilmoq, yo'q qilmoq, ortda qoldirmoq ('abolish')."
  },
  {
    id: "v_pv_11",
    topicId: "phrasal_verbs",
    level: "B2",
    type: "word_selection",
    question: "I cannot ______ his rude behavior any longer.",
    options: ["put up with", "stand up for", "look up to", "come up with"],
    answer: 0,
    explanation: "'Put up with' — chidamoq, toqat qilmoq ('tolerate')."
  },
  {
    id: "v_pv_12",
    topicId: "phrasal_verbs",
    level: "B1",
    type: "sentence_completion",
    question: "He turned down the job offer because ______.",
    options: ["the salary was too low", "he was very excited", "he accepted immediately", "he started on Monday"],
    answer: 0,
    explanation: "'Turn down' — rad etmoq (taklifni qabul qilmaslik)."
  },
  {
    id: "v_pv_13",
    topicId: "phrasal_verbs",
    level: "B2",
    type: "fill_in_the_blank",
    question: "Scientists are trying to ______ with an innovative solution to combat global warming.",
    options: ["come up", "catch up", "keep up", "make up"],
    answer: 0,
    explanation: "'Come up with an idea/solution' — yangi fikr yoki yechim o'ylab topmoq."
  },
  {
    id: "v_pv_14",
    topicId: "phrasal_verbs",
    level: "C1",
    type: "multiple_choice",
    question: "What does 'peter out' mean?",
    options: ["To diminish gradually until disappearing", "To explode suddenly", "To increase rapidly", "To criticize publicly"],
    answer: 0,
    explanation: "'Peter out' — asta-sekin pasayib, oxir-oqibat butunlay to'xtamoq / so'nmoq."
  },

  // 7. Word Formation (14 questions)
  {
    id: "v_wf_1",
    topicId: "word_formation",
    level: "B1",
    type: "word_formation",
    question: "The children were playing ______ in the garden. (HAPPY)",
    options: ["happily", "happiness", "unhappy", "happiful"],
    answer: 0,
    explanation: "Fe'lni ('playing') ifodalash uchun ravish kerak: happy -> happily."
  },
  {
    id: "v_wf_2",
    topicId: "word_formation",
    level: "B1",
    type: "word_formation",
    question: "Regular physical activity has numerous ______ effects on health. (BENEFIT)",
    options: ["beneficial", "beneficially", "benefactor", "benefitless"],
    answer: 0,
    explanation: "Ot ('effects') oldidan sifat keladi: benefit -> beneficial (foydali)."
  },
  {
    id: "v_wf_3",
    topicId: "word_formation",
    level: "B2",
    type: "word_formation",
    question: "His sudden ______ shocked everyone in the company. (DEPART)",
    options: ["departed", "departure", "departing", "department"],
    answer: 1,
    explanation: "Egalik olmoshidan keyin ot kelishi zarur: depart (fe'l) -> departure (jo'nab ketish)."
  },
  {
    id: "v_wf_4",
    topicId: "word_formation",
    level: "B2",
    type: "word_formation",
    question: "The internet has ______ the way we communicate with one another. (REVOLUTION)",
    options: ["revolutionized", "revolutionary", "revolutionist", "revolutioning"],
    answer: 0,
    explanation: "'Has' yordamchi fe'lidan keyin V3 fe'l shakli kerak: revolution -> revolutionize -> revolutionized."
  },
  {
    id: "v_wf_5",
    topicId: "word_formation",
    level: "B1",
    type: "word_formation",
    question: "She made a very ______ decision to continue her education abroad. (SENSE)",
    options: ["sensitive", "sensible", "senseless", "sensibility"],
    answer: 1,
    explanation: "Aqlga muvofiq, to'g'ri qaror ma'nosida 'sensible' sifati ishlatiladi (sensitive — ta'sirchan degani)."
  },
  {
    id: "v_wf_6",
    topicId: "word_formation",
    level: "B2",
    type: "word_formation",
    question: "There has been a significant ______ in the local public transportation system. (IMPROVE)",
    options: ["improvement", "improver", "improvable", "improvingly"],
    answer: 0,
    explanation: "Artikldan so'ng ot keladi: improve -> improvement (yaxshilanish)."
  },
  {
    id: "v_wf_7",
    topicId: "word_formation",
    level: "C1",
    type: "word_formation",
    question: "Her argument was entirely ______, based solely on rumors and speculation. (FOUND)",
    options: ["unfounded", "foundational", "founder", "profound"],
    answer: 0,
    explanation: "Asossiz, dalilsiz ma'nosida inkor qo'shimchasi bilan sifat: unfounded."
  },
  {
    id: "v_wf_8",
    topicId: "word_formation",
    level: "A2",
    type: "word_formation",
    question: "It is ______ to drive through a red traffic signal. (LEGAL)",
    options: ["illegal", "unlegal", "dislegal", "nonlegal"],
    answer: 0,
    explanation: "'Legal' so'zining inkori 'il-' prefiksi bilan yasaladi: illegal (noqonuniy)."
  },
  {
    id: "v_wf_9",
    topicId: "word_formation",
    level: "B1",
    type: "word_formation",
    question: "The teacher praised her for being so ______ in solving math problems. (CREATE)",
    options: ["creative", "creativity", "creature", "creatively"],
    answer: 0,
    explanation: "'Being so...' iborasidan so'ng sifat kerak: create -> creative (ijodkor, topqir)."
  },
  {
    id: "v_wf_10",
    topicId: "word_formation",
    level: "B2",
    type: "word_formation",
    question: "Due to unforeseen circumstances, the meeting was ______ postponed. (DEFINITE)",
    options: ["indefinitely", "definite", "definiteness", "indefinite"],
    answer: 0,
    explanation: "Fe'lni ('postponed') ifodalash uchun ravish shakli kerak: indefinite -> indefinitely (noma'lum muddatga)."
  },
  {
    id: "v_wf_11",
    topicId: "word_formation",
    level: "C1",
    type: "word_formation",
    question: "The documentary highlights the ______ of endangered wildlife species. (VULNERABLE)",
    options: ["vulnerability", "vulnerably", "vulnerableness", "invulnerable"],
    answer: 0,
    explanation: "'The' artikli va 'of' orasida ot shakli keladi: vulnerable -> vulnerability (zaiflik, himoyasizlik)."
  },
  {
    id: "v_wf_12",
    topicId: "word_formation",
    level: "B1",
    type: "word_formation",
    question: "He is completely ______ to complete the project without supervision. (ABLE)",
    options: ["unable", "disability", "inability", "disabled"],
    answer: 0,
    explanation: "Shaxs holatini ko'rsatuvchi inkor sifat: able -> unable (qodir emas)."
  },
  {
    id: "v_wf_13",
    topicId: "word_formation",
    level: "B2",
    type: "word_formation",
    question: "The company provides training to ensure employee ______ in all departments. (EFFICIENT)",
    options: ["efficiency", "efficiently", "efficacious", "inefficient"],
    answer: 0,
    explanation: "Employee so'zidan keyin ot kelishi kerak: efficient -> efficiency (samaradorlik)."
  },
  {
    id: "v_wf_14",
    topicId: "word_formation",
    level: "C1",
    type: "word_formation",
    question: "His achievements are truly ______ and will be remembered for generations. (REMARK)",
    options: ["remarkable", "remarkably", "unremarkable", "remarking"],
    answer: 0,
    explanation: "Hayratlanarli, ajoyib ma'nosidagi sifat: remark -> remarkable."
  },

  // 8. Common Expressions & Idioms (14 questions)
  {
    id: "v_ce_1",
    topicId: "common_expressions",
    level: "A2",
    type: "multiple_choice",
    question: "What does the idiom 'once in a blue moon' mean?",
    options: ["Very frequently", "Very rarely", "Every full moon", "Never in history"],
    answer: 1,
    explanation: "'Once in a blue moon' — juda kamdan-kam, yilda bir martagina sodir bo'ladigan voqealarga aytiladi."
  },
  {
    id: "v_ce_2",
    topicId: "common_expressions",
    level: "B1",
    type: "multiple_choice",
    question: "If someone tells you to 'break a leg', what are they wishing you?",
    options: ["Good luck", "Bad health", "Safe travels", "Careful driving"],
    answer: 0,
    explanation: "'Break a leg!' — teatr va san'atkorlar orasida an'anaga ko'ra 'omad yor bo'lsin!' tilagi."
  },
  {
    id: "v_ce_3",
    topicId: "common_expressions",
    level: "B1",
    type: "word_selection",
    question: "I am feeling a bit under the ______ today, so I think I will stay in bed.",
    options: ["weather", "climate", "cloud", "storm"],
    answer: 0,
    explanation: "'Under the weather' — o'zini noxush, biroz betob yoki holsiz his qilmoq."
  },
  {
    id: "v_ce_4",
    topicId: "common_expressions",
    level: "B2",
    type: "sentence_completion",
    question: "Stop beating around the ______ and tell me exactly what happened!",
    options: ["bush", "tree", "forest", "grass"],
    answer: 0,
    explanation: "'Beat around the bush' — gapni aylantirmoq, asosiy mavzudan qochmoq."
  },
  {
    id: "v_ce_5",
    topicId: "common_expressions",
    level: "B2",
    type: "multiple_choice",
    question: "What does it mean to 'let the cat out of the bag'?",
    options: ["To buy a pet", "To reveal a secret accidentally", "To rescue an animal", "To lose control"],
    answer: 1,
    explanation: "'Let the cat out of the bag' — sirni bilmasdan yoki kutilmaganda fosh qilib qo'ymoq."
  },
  {
    id: "v_ce_6",
    topicId: "common_expressions",
    level: "B1",
    type: "fill_in_the_blank",
    question: "That new electric sports car costs an arm and a ______.",
    options: ["leg", "foot", "hand", "finger"],
    answer: 0,
    explanation: "'Cost an arm and a leg' — o'ta qimmat, behisob pul turmoq."
  },
  {
    id: "v_ce_7",
    topicId: "common_expressions",
    level: "B2",
    type: "word_selection",
    question: "Don't put all your eggs in one ______; diversify your investments.",
    options: ["basket", "box", "cart", "bowl"],
    answer: 0,
    explanation: "'Put all your eggs in one basket' — hamma imkoniyatni bir joyga tikib, katta tavakkal qilmoq."
  },
  {
    id: "v_ce_8",
    topicId: "common_expressions",
    level: "A2",
    type: "multiple_choice",
    question: "The expression 'piece of cake' means that something is ______.",
    options: ["very delicious", "very easy to do", "extremely difficult", "sweet and sugary"],
    answer: 1,
    explanation: "'A piece of cake' — juda oson, suv ichgandek yengil ish."
  },
  {
    id: "v_ce_9",
    topicId: "common_expressions",
    level: "B2",
    type: "sentence_completion",
    question: "We will cross that ______ when we come to it; let's focus on today's problems first.",
    options: ["bridge", "road", "river", "mountain"],
    answer: 0,
    explanation: "'Cross that bridge when we come to it' — muammo ro'y berganda hal qilarmiz, oldindan xavotirlanmaylik."
  },
  {
    id: "v_ce_10",
    topicId: "common_expressions",
    level: "C1",
    type: "multiple_choice",
    question: "What does 'bite the bullet' mean?",
    options: ["To face a grim situation with fortitude", "To get shot in battle", "To eat quickly", "To make a foolish remark"],
    answer: 0,
    explanation: "'Bite the bullet' — noxush yoki og'ir vaziyatga tishni tishga qo'yib, mardonavor ro'para kelmoq."
  },
  {
    id: "v_ce_11",
    topicId: "common_expressions",
    level: "B1",
    type: "fill_in_the_blank",
    question: "I have butterflies in my ______ before every major public presentation.",
    options: ["stomach", "chest", "head", "throat"],
    answer: 0,
    explanation: "'Have butterflies in one's stomach' — kuchli hayajonlanmoq, yuragi bezovtalanmoq."
  },
  {
    id: "v_ce_12",
    topicId: "common_expressions",
    level: "B2",
    type: "word_selection",
    question: "He hit the ______ right on the head with his insightful analysis of the market.",
    options: ["nail", "hammer", "target", "board"],
    answer: 0,
    explanation: "'Hit the nail on the head' — nishonga to'g'ri urmoq, ayni haqiqatni aytmoq."
  },
  {
    id: "v_ce_13",
    topicId: "common_expressions",
    level: "C1",
    type: "multiple_choice",
    question: "If someone is 'skating on thin ice', they are ______.",
    options: ["taking a dangerous or risky step", "enjoying winter sports", "moving very fast", "lacking confidence"],
    answer: 0,
    explanation: "'Skate on thin ice' — xatarli va xavfli ishga qo'l urmoq."
  },
  {
    id: "v_ce_14",
    topicId: "common_expressions",
    level: "B2",
    type: "sentence_completion",
    question: "The unexpected bonus was just the icing on the ______ after a successful promotion.",
    options: ["cake", "bread", "pie", "cookie"],
    answer: 0,
    explanation: "'The icing on the cake' — yaxshi narsaning ustiga yanada quvonarli qo'shimcha bo'lmoq."
  }
];
