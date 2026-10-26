// ========================================================
// YASHNAR ENGLISH - LISTENING PRACTICE EXERCISES DATABASE
// 12 Full Exercises, 6 Distinct Parts, CEFR Levels A2 to C1
// Exactly 8 Questions per Exercise (96 questions total)
// ========================================================

window.LISTENING_PARTS = [
  { id: 1, name: "Everyday Conversations", uz: "Kundalik Suhbatlar", desc: "Do'kon, xizmat ko'rsatish va kundalik muloqot" },
  { id: 2, name: "Monologue and Information", uz: "Monolog va Ma'lumot", desc: "E'lonlar, yo'riqnomalar va rasmiy xabarlar" },
  { id: 3, name: "Academic Discussion", uz: "Akademik Muhokama", desc: "Talabalar va o'qituvchilar o'rtasidagi ilmiy suhbat" },
  { id: 4, name: "Lecture or Educational Talk", uz: "Ma'ruza va Ta'limiy Nutq", desc: "Fan, tabiat va texnologiya mavzularidagi ma'ruzalar" },
  { id: 5, name: "Opinions and Attitudes", uz: "Munosabat va Fikrlar", desc: "Turli nuqtayi nazarlar, afzallik va kamchiliklar tahlili" },
  { id: 6, name: "Short Story and Narrative", uz: "Qisqa Hikoya va Voqealar", desc: "Shaxsiy tajribalar, sayohatlar va qiziqarli voqealar" }
];

window.LISTENING_VOICE_PREVIEWS = [
  { id: "jenny", name: "Jenny (US - Tabiiy va Mayin)", file: "audio/preview-jenny.mp3", accent: "American", desc: "Tavsiya etilgan: o'quvchilar uchun iliq va tabiiy talaffuz" },
  { id: "aria", name: "Aria (US - Aniq va Professional)", file: "audio/preview-aria.mp3", accent: "American", desc: "Ekspressiv va ravon neyron ovoz" },
  { id: "sonia", name: "Sonia (UK - Britaniya)", file: "audio/preview-sonia.mp3", accent: "British", desc: "Klassik britancha intonatsiya va toza diksiya" }
];

window.LISTENING_EXERCISES = [
  // -------------------------------------------------------------------------
  // EXERCISE 1: Part 1 - Everyday Conversations (Level B1)
  // -------------------------------------------------------------------------
  {
    id: "lis_01",
    title: "Booking a Language Consultation",
    uzTitle: "Til kursi konsultatsiyasini band qilish",
    part: 1,
    partName: "Everyday Conversations",
    partUz: "Kundalik Suhbatlar",
    level: "B1",
    durationSec: 36,
    audioFile: "audio/listening-01.mp3",
    transcript: "Good morning! Welcome to the Central Language Institute. How can I help you today? Hello! I would like to schedule a placement test and a brief consultation for the evening IELTS preparation course. Certainly! We have slots available this Thursday at four thirty in the afternoon, or Friday morning at ten o'clock. Friday morning works best for me because I work late shifts on Thursdays. Perfect. Please bring your photo ID and arrive fifteen minutes early to Room 204.",
    questions: [
      {
        id: "lis_01_q1",
        type: "multiple_choice",
        question: "Where does this conversation take place?",
        options: ["At a university cafeteria", "At the Central Language Institute", "At a public visa office", "At a travel agency"],
        answer: 1,
        explanation: "Admin xodimi boshida 'Welcome to the Central Language Institute' deydi."
      },
      {
        id: "lis_01_q2",
        type: "multiple_choice",
        question: "Which course is the student interested in?",
        options: ["General Spanish for Beginners", "Evening IELTS preparation course", "Morning Business English", "Academic Writing seminar"],
        answer: 1,
        explanation: "Talaba: 'I would like to schedule... for the evening IELTS preparation course' deb aytadi."
      },
      {
        id: "lis_01_q3",
        type: "true_false",
        question: "The speaker is offered appointment options on Thursday and Friday.",
        options: ["True", "False"],
        answer: 0,
        explanation: "Xodim payshanba 16:30 yoki juma 10:00 vaqtlarini taklif qildi (True)."
      },
      {
        id: "lis_01_q4",
        type: "multiple_choice",
        question: "Why did the student choose Friday morning?",
        options: ["Because the institute is closed on Thursdays", "Because the student works late shifts on Thursdays", "Because Friday is free of charge", "Because Thursday was already fully booked"],
        answer: 1,
        explanation: "Talaba: 'Friday morning works best for me because I work late shifts on Thursdays' deydi."
      },
      {
        id: "lis_01_q5",
        type: "fill_in_the_blank",
        question: "The student was asked to bring their photo ______.",
        acceptedAnswers: ["id", "identification", "id card"],
        explanation: "Admin: 'Please bring your photo ID' deb aytadi."
      },
      {
        id: "lis_01_q6",
        type: "short_answer",
        question: "Which room should the student report to?",
        acceptedAnswers: ["room 204", "204"],
        explanation: "Audioda 'arrive fifteen minutes early to Room 204' deb ko'rsatilgan."
      },
      {
        id: "lis_01_q7",
        type: "true_false",
        question: "The student must arrive thirty minutes before the scheduled time.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Xodim 15 daqiqa oldin kelishni so'radi ('fifteen minutes early'), 30 daqiqa emas (False)."
      },
      {
        id: "lis_01_q8",
        type: "multiple_choice",
        question: "What time is the Friday morning slot?",
        options: ["At 9:00 AM", "At 9:30 AM", "At 10:00 AM", "At 10:30 AM"],
        answer: 2,
        explanation: "Xodim 'or Friday morning at ten o'clock' deb aytgan."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 2: Part 1 - Everyday Conversations (Level A2)
  // -------------------------------------------------------------------------
  {
    id: "lis_02",
    title: "At the Community Library",
    uzTitle: "Shahar kutubxonasida",
    part: 1,
    partName: "Everyday Conversations",
    partUz: "Kundalik Suhbatlar",
    level: "A2",
    durationSec: 28,
    audioFile: "audio/listening-02.mp3",
    transcript: "Excuse me, can you tell me how many books I can borrow at one time? As a registered member, you may borrow up to six books for three weeks. If you need more time, you can renew them online twice, provided nobody else has reserved them. That is great! And is there free Wi-Fi access on the second floor? Yes, the network name is Library Guest and the password is on the notice board next to the front desk.",
    questions: [
      {
        id: "lis_02_q1",
        type: "multiple_choice",
        question: "How many books can a registered member borrow at once?",
        options: ["Up to 3 books", "Up to 4 books", "Up to 6 books", "Up to 10 books"],
        answer: 2,
        explanation: "Kutubxonachi 'you may borrow up to six books' deb ta'kidlaydi."
      },
      {
        id: "lis_02_q2",
        type: "multiple_choice",
        question: "What is the standard borrowing period for books?",
        options: ["One week", "Two weeks", "Three weeks", "One month"],
        answer: 2,
        explanation: "Kutubxonachi 'for three weeks' deb aytadi."
      },
      {
        id: "lis_02_q3",
        type: "true_false",
        question: "Borrowers can renew their books online twice.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'you can renew them online twice' deb aytilgan (True)."
      },
      {
        id: "lis_02_q4",
        type: "multiple_choice",
        question: "When is online renewal NOT allowed?",
        options: ["On weekends", "If another borrower has reserved the book", "After 5:00 PM", "If books are damaged"],
        answer: 1,
        explanation: "'provided nobody else has reserved them' sharti aytilgan."
      },
      {
        id: "lis_02_q5",
        type: "fill_in_the_blank",
        question: "The visitor asked about free ______ on the second floor.",
        acceptedAnswers: ["wi-fi", "wifi", "internet"],
        explanation: "Tashrif buyuruvchi 'free Wi-Fi access on the second floor' haqida so'radi."
      },
      {
        id: "lis_02_q6",
        type: "short_answer",
        question: "What is the name of the guest wireless network?",
        acceptedAnswers: ["library guest", "libraryguest"],
        explanation: "Kutubxonachi: 'the network name is Library Guest' deb javob beradi."
      },
      {
        id: "lis_02_q7",
        type: "true_false",
        question: "The Wi-Fi password is printed inside every library book.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Parol doskada ('on the notice board next to the front desk') ekanligi aytildi (False)."
      },
      {
        id: "lis_02_q8",
        type: "multiple_choice",
        question: "Where can visitors find the Wi-Fi password?",
        options: ["In their email receipt", "On the notice board next to the front desk", "On the library website homepage", "From the security officer outside"],
        answer: 1,
        explanation: "'on the notice board next to the front desk' deb aniq ko'rsatilgan."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 3: Part 2 - Monologue and Information (Level B1)
  // -------------------------------------------------------------------------
  {
    id: "lis_03",
    title: "Campus Orientation Briefing",
    uzTitle: "Universitet tanishtiruv e'loni",
    part: 2,
    partName: "Monologue and Information",
    partUz: "Monolog va Ma'lumot",
    level: "B1",
    durationSec: 30,
    audioFile: "audio/listening-03.mp3",
    transcript: "Attention all incoming international students! Welcome to Green Valley University. Our campus orientation starts promptly at nine o'clock tomorrow in the Main Auditorium. Please ensure you have completed your digital registration before entering. The cafeteria is located in Building B and serves hot lunch between eleven thirty and two PM. For emergency medical assistance, the health center in Building D operates twenty-four hours a day.",
    questions: [
      {
        id: "lis_03_q1",
        type: "multiple_choice",
        question: "Who is the primary audience for this announcement?",
        options: ["University professors", "Incoming international students", "Local cafeteria suppliers", "Campus construction workers"],
        answer: 1,
        explanation: "Boshida 'Attention all incoming international students!' deb murojaat qilinadi."
      },
      {
        id: "lis_03_q2",
        type: "multiple_choice",
        question: "What time does tomorrow's orientation start?",
        options: ["At 8:30 AM", "At 9:00 AM", "At 9:30 AM", "At 10:00 AM"],
        answer: 1,
        explanation: "'orientation starts promptly at nine o'clock tomorrow' deb aytiladi."
      },
      {
        id: "lis_03_q3",
        type: "fill_in_the_blank",
        question: "The orientation session will be held in the Main ______.",
        acceptedAnswers: ["auditorium", "hall"],
        explanation: "Audioda 'in the Main Auditorium' deyilgan."
      },
      {
        id: "lis_03_q4",
        type: "true_false",
        question: "Students must complete digital registration before entering the auditorium.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'Please ensure you have completed your digital registration before entering' (True)."
      },
      {
        id: "lis_03_q5",
        type: "multiple_choice",
        question: "In which building is the cafeteria located?",
        options: ["Building A", "Building B", "Building C", "Building D"],
        answer: 1,
        explanation: "'The cafeteria is located in Building B' deb aytiladi."
      },
      {
        id: "lis_03_q6",
        type: "multiple_choice",
        question: "What hours does the cafeteria serve hot lunch?",
        options: ["11:00 AM to 1:00 PM", "11:30 AM to 2:00 PM", "12:00 PM to 3:00 PM", "10:30 AM to 1:30 PM"],
        answer: 1,
        explanation: "'serves hot lunch between eleven thirty and two PM' deyilgan."
      },
      {
        id: "lis_03_q7",
        type: "short_answer",
        question: "Which building houses the health center?",
        acceptedAnswers: ["building d", "d"],
        explanation: "'the health center in Building D operates...' deb ko'rsatilgan."
      },
      {
        id: "lis_03_q8",
        type: "true_false",
        question: "The campus health center closes at 8:00 PM every evening.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Tibbiyot markazi kechayu-kunduz ochiq: 'operates twenty-four hours a day' (False)."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 4: Part 2 - Monologue and Information (Level B2)
  // -------------------------------------------------------------------------
  {
    id: "lis_04",
    title: "Botanical Garden Audio Tour",
    uzTitle: "Botanika bog'i audio qo'llanmasi",
    part: 2,
    partName: "Monologue and Information",
    partUz: "Monolog va Ma'lumot",
    level: "B2",
    durationSec: 27,
    audioFile: "audio/listening-04.mp3",
    transcript: "Welcome to the Royal Botanical Conservatory. We host over four thousand rare plant species from five continents. The Tropical Rainforest Dome is maintained at eighty-five percent humidity, so please watch your step along the stone pathways. Flash photography is strictly prohibited inside the orchid gallery to protect delicate blossoms. Guided tours depart from the greenhouse entrance every forty minutes.",
    questions: [
      {
        id: "lis_04_q1",
        type: "multiple_choice",
        question: "How many rare plant species does the conservatory host?",
        options: ["Over 400", "Over 1,400", "Over 4,000", "Over 40,000"],
        answer: 2,
        explanation: "'We host over four thousand rare plant species' deb aytilgan."
      },
      {
        id: "lis_04_q2",
        type: "fill_in_the_blank",
        question: "The Tropical Rainforest Dome is maintained at eighty-five percent ______.",
        acceptedAnswers: ["humidity", "moisture"],
        explanation: "Audioda 'maintained at eighty-five percent humidity' deyiladi."
      },
      {
        id: "lis_04_q3",
        type: "true_false",
        question: "Visitors are advised to watch their step because of stone pathways.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'please watch your step along the stone pathways' (True)."
      },
      {
        id: "lis_04_q4",
        type: "multiple_choice",
        question: "What is strictly prohibited inside the orchid gallery?",
        options: ["Wearing footwear", "Flash photography", "Speaking loudly", "Carrying umbrellas"],
        answer: 1,
        explanation: "'Flash photography is strictly prohibited inside the orchid gallery' deb aytiladi."
      },
      {
        id: "lis_04_q5",
        type: "multiple_choice",
        question: "Why is flash photography restricted?",
        options: ["To prevent fire hazards", "To protect delicate blossoms", "To maintain total darkness", "To respect sleeping animals"],
        answer: 1,
        explanation: "Sababi: 'to protect delicate blossoms' (nozik gullarni asrash)."
      },
      {
        id: "lis_04_q6",
        type: "short_answer",
        question: "Where do guided tours depart from?",
        acceptedAnswers: ["greenhouse entrance", "the greenhouse entrance", "greenhouse"],
        explanation: "'Guided tours depart from the greenhouse entrance' deb ko'rsatilgan."
      },
      {
        id: "lis_04_q7",
        type: "multiple_choice",
        question: "How frequently do the guided tours depart?",
        options: ["Every 15 minutes", "Every 30 minutes", "Every 40 minutes", "Every hour"],
        answer: 2,
        explanation: "Audioda 'depart from the greenhouse entrance every forty minutes' deyilgan."
      },
      {
        id: "lis_04_q8",
        type: "true_false",
        question: "The plants come exclusively from the European continent.",
        options: ["True", "False"],
        answer: 1,
        explanation: "O'simliklar 5 ta qit'adan keltirilgan ('from five continents') (False)."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 5: Part 3 - Academic Discussion (Level B2)
  // -------------------------------------------------------------------------
  {
    id: "lis_05",
    title: "Environmental Project Planning",
    uzTitle: "Ekologik loyiha rejasini muhokama qilish",
    part: 3,
    partName: "Academic Discussion",
    partUz: "Akademik Muhokama",
    level: "B2",
    durationSec: 29,
    audioFile: "audio/listening-05.mp3",
    transcript: "Professor Miller, our group analyzed urban air quality data across five major metropolitan zones. We noticed a substantial decline in particulate matter during weekends, primarily due to reduced commuter traffic. However, nitrogen dioxide levels remained surprisingly persistent near industrial hubs. We recommend installing solar powered monitoring sensors along peripheral ring roads before delivering our final report next Tuesday.",
    questions: [
      {
        id: "lis_05_q1",
        type: "multiple_choice",
        question: "How many metropolitan zones did the research group analyze?",
        options: ["Three zones", "Five zones", "Seven zones", "Ten zones"],
        answer: 1,
        explanation: "'analyzed urban air quality data across five major metropolitan zones' deyilgan."
      },
      {
        id: "lis_05_q2",
        type: "multiple_choice",
        question: "What trend was observed during weekends?",
        options: ["A sharp spike in smog", "A substantial decline in particulate matter", "Complete power shutdowns", "A rise in factory emissions"],
        answer: 1,
        explanation: "'We noticed a substantial decline in particulate matter during weekends' deb aytiladi."
      },
      {
        id: "lis_05_q3",
        type: "fill_in_the_blank",
        question: "The weekend decline was primarily caused by reduced commuter ______.",
        acceptedAnswers: ["traffic", "commuter traffic"],
        explanation: "Sababi: 'primarily due to reduced commuter traffic'."
      },
      {
        id: "lis_05_q4",
        type: "true_false",
        question: "Nitrogen dioxide levels dropped significantly near industrial areas.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Sanoat hududlarida NO2 darajasi yuqoriligicha qolgan ('remained surprisingly persistent') (False)."
      },
      {
        id: "lis_05_q5",
        type: "multiple_choice",
        question: "What pollutant remained persistent near industrial hubs?",
        options: ["Carbon monoxide", "Nitrogen dioxide", "Sulfur crystals", "Methane gas"],
        answer: 1,
        explanation: "'nitrogen dioxide levels remained surprisingly persistent' deyilgan."
      },
      {
        id: "lis_05_q6",
        type: "short_answer",
        question: "What kind of sensors does the group propose installing?",
        acceptedAnswers: ["solar powered", "solar-powered monitoring sensors", "solar"],
        explanation: "Guruh 'solar powered monitoring sensors' o'rnatishni taklif qilmoqda."
      },
      {
        id: "lis_05_q7",
        type: "multiple_choice",
        question: "Where should the new sensors be installed?",
        options: ["Inside underground subway tunnels", "Along peripheral ring roads", "On university rooftop towers", "In residential gardens"],
        answer: 1,
        explanation: "'along peripheral ring roads' deb aniq tavsiya qilingan."
      },
      {
        id: "lis_05_q8",
        type: "true_false",
        question: "The final report must be submitted next Tuesday.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'before delivering our final report next Tuesday' (True)."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 6: Part 3 - Academic Discussion (Level B2)
  // -------------------------------------------------------------------------
  {
    id: "lis_06",
    title: "Psychology Survey Methodology",
    uzTitle: "Psixologik so'rovnoma metodologiyasi",
    part: 3,
    partName: "Academic Discussion",
    partUz: "Akademik Muhokama",
    level: "B2",
    durationSec: 26,
    audioFile: "audio/listening-06.mp3",
    transcript: "After reviewing our cognitive survey results, two hundred participants completed the online questionnaire. Interestingly, sixty percent reported enhanced task productivity when listening to ambient instrumental soundscapes. However, vocal music with lyrics caused frequent attention lapses and slower reading speed. We need to standardize sample demographics before publishing our preliminary findings.",
    questions: [
      {
        id: "lis_06_q1",
        type: "multiple_choice",
        question: "How many participants completed the cognitive survey?",
        options: ["100 participants", "200 participants", "500 participants", "1,000 participants"],
        answer: 1,
        explanation: "'two hundred participants completed the online questionnaire' deb aytiladi."
      },
      {
        id: "lis_06_q2",
        type: "fill_in_the_blank",
        question: "Sixty percent of respondents reported enhanced task ______ with ambient sounds.",
        acceptedAnswers: ["productivity", "performance"],
        explanation: "'reported enhanced task productivity when listening to ambient instrumental soundscapes'."
      },
      {
        id: "lis_06_q3",
        type: "true_false",
        question: "Vocal music with lyrics improved students' reading speed.",
        options: ["True", "False"],
        answer: 1,
        explanation: "So'zli musiqa diqqatni buzib, o'qish tezligini pasaytirgan ('slower reading speed') (False)."
      },
      {
        id: "lis_06_q4",
        type: "multiple_choice",
        question: "What negative impact was observed with lyrical music?",
        options: ["Physical tiredness", "Frequent attention lapses and slower reading speed", "Hearing impairment", "Total memory loss"],
        answer: 1,
        explanation: "'caused frequent attention lapses and slower reading speed' deb aytilgan."
      },
      {
        id: "lis_06_q5",
        type: "multiple_choice",
        question: "What type of audio positively influenced productivity?",
        options: ["Heavy rock music", "Ambient instrumental soundscapes", "Fast-paced radio news", "Loud podcasts"],
        answer: 1,
        explanation: "'ambient instrumental soundscapes' ijobiy ta'sir ko'rsatgan."
      },
      {
        id: "lis_06_q6",
        type: "short_answer",
        question: "What percentage of participants noted higher productivity?",
        acceptedAnswers: ["60%", "60", "sixty percent", "sixty"],
        explanation: "Audioda 'sixty percent reported enhanced task productivity' deyiladi."
      },
      {
        id: "lis_06_q7",
        type: "true_false",
        question: "The survey was administered through printed paper forms in classrooms.",
        options: ["True", "False"],
        answer: 1,
        explanation: "So'rovnoma onlayn to'ldirilgan: 'completed the online questionnaire' (False)."
      },
      {
        id: "lis_06_q8",
        type: "multiple_choice",
        question: "What must the researchers do before publishing findings?",
        options: ["Re-interview all participants", "Standardize sample demographics", "Pay additional survey fees", "Discard initial data"],
        answer: 1,
        explanation: "'We need to standardize sample demographics before publishing' deyilgan."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 7: Part 4 - Lecture or Educational Talk (Level B2)
  // -------------------------------------------------------------------------
  {
    id: "lis_07",
    title: "Urban Architecture and Green Roofs",
    uzTitle: "Shahar me'morchiligi va yashil tomlar",
    part: 4,
    partName: "Lecture or Educational Talk",
    partUz: "Ma'ruza va Ta'limiy Nutq",
    level: "B2",
    durationSec: 27,
    audioFile: "audio/listening-07.mp3",
    transcript: "Modern sustainable architecture increasingly incorporates green rooftop gardens into metropolitan building designs. These vegetative layers absorb up to seventy percent of stormwater runoff, significantly mitigating localized sewer flooding. Furthermore, green roofs reduce building surface temperatures by fifteen degrees Celsius in summer, lowering commercial air conditioning costs and counteracting the urban heat island effect.",
    questions: [
      {
        id: "lis_07_q1",
        type: "multiple_choice",
        question: "What design feature is modern sustainable architecture increasingly using?",
        options: ["Glass skyscraper spires", "Green rooftop gardens", "Underground parking complexes", "Solar reflective mirrors"],
        answer: 1,
        explanation: "'increasingly incorporates green rooftop gardens into metropolitan building designs' deyilgan."
      },
      {
        id: "lis_07_q2",
        type: "fill_in_the_blank",
        question: "Vegetative layers absorb up to seventy percent of ______ runoff.",
        acceptedAnswers: ["stormwater", "rainwater", "water"],
        explanation: "'absorb up to seventy percent of stormwater runoff' deb aytiladi."
      },
      {
        id: "lis_07_q3",
        type: "true_false",
        question: "Green roofs help reduce localized sewer flooding.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'significantly mitigating localized sewer flooding' (True)."
      },
      {
        id: "lis_07_q4",
        type: "multiple_choice",
        question: "By how much can green roofs reduce surface temperatures in summer?",
        options: ["By 5 degrees Celsius", "By 10 degrees Celsius", "By 15 degrees Celsius", "By 25 degrees Celsius"],
        answer: 2,
        explanation: "'reduce building surface temperatures by fifteen degrees Celsius in summer' deyilgan."
      },
      {
        id: "lis_07_q5",
        type: "short_answer",
        question: "Which urban phenomenon do green roofs help counteract?",
        acceptedAnswers: ["urban heat island effect", "heat island effect", "urban heat island"],
        explanation: "Audioda 'counteracting the urban heat island effect' deyiladi."
      },
      {
        id: "lis_07_q6",
        type: "true_false",
        question: "Green roofs increase the cost of commercial air conditioning.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Aksincha, xarajatlarni kamaytiradi: 'lowering commercial air conditioning costs' (False)."
      },
      {
        id: "lis_07_q7",
        type: "multiple_choice",
        question: "What percentage of stormwater is absorbed by these roof layers?",
        options: ["Up to 30%", "Up to 50%", "Up to 70%", "Up to 90%"],
        answer: 2,
        explanation: "'absorb up to seventy percent of stormwater runoff' deb ko'rsatilgan."
      },
      {
        id: "lis_07_q8",
        type: "multiple_choice",
        question: "What kind of roofs are being discussed in this lecture?",
        options: ["Traditional metal roofs", "Green vegetative roofs", "Asphalt shingle roofs", "Concrete slabs"],
        answer: 1,
        explanation: "Butun ma'ruza yashil o'simlikli tomlar ('green rooftop gardens') haqida."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 8: Part 4 - Lecture or Educational Talk (Level C1)
  // -------------------------------------------------------------------------
  {
    id: "lis_08",
    title: "Deep Sea Bioluminescence",
    uzTitle: "Chuqur dengiz biolyuminessensiyasi",
    part: 4,
    partName: "Lecture or Educational Talk",
    partUz: "Ma'ruza va Ta'limiy Nutq",
    level: "C1",
    durationSec: 27,
    audioFile: "audio/listening-08.mp3",
    transcript: "In the oceanic twilight zone, over seventy-five percent of deep sea organisms possess bioluminescence. This biochemical light is produced when the enzyme luciferase oxidizes a substrate called luciferin. Marine creatures utilize this cold emission not merely for illumination, but primarily for counter-illumination camouflage against predators, enticing prey into striking range, and species-specific courtship signals.",
    questions: [
      {
        id: "lis_08_q1",
        type: "multiple_choice",
        question: "What proportion of deep sea organisms possess bioluminescence?",
        options: ["Under 25%", "Approximately 50%", "Over 75%", "Nearly 100%"],
        answer: 2,
        explanation: "'over seventy-five percent of deep sea organisms possess bioluminescence' deb aytiladi."
      },
      {
        id: "lis_08_q2",
        type: "fill_in_the_blank",
        question: "Biochemical light is produced when the enzyme ______ oxidizes luciferin.",
        acceptedAnswers: ["luciferase"],
        explanation: "Audioda 'when the enzyme luciferase oxidizes a substrate called luciferin' deyilgan."
      },
      {
        id: "lis_08_q3",
        type: "true_false",
        question: "The chemical reaction produces extreme volcanic heat.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Bu sovuq nur chiqarish hisoblanadi: 'this cold emission' (False)."
      },
      {
        id: "lis_08_q4",
        type: "multiple_choice",
        question: "What is the substrate molecule oxidized during this process?",
        options: ["Chlorophyll", "Luciferin", "Hemoglobin", "Melanin"],
        answer: 1,
        explanation: "'a substrate called luciferin' deb aytilgan."
      },
      {
        id: "lis_08_q5",
        type: "short_answer",
        question: "In which oceanic zone is bioluminescence particularly widespread?",
        acceptedAnswers: ["twilight zone", "the twilight zone", "oceanic twilight zone"],
        explanation: "Boshida 'In the oceanic twilight zone' deb aytiladi."
      },
      {
        id: "lis_08_q6",
        type: "true_false",
        question: "Marine creatures use bioluminescence solely to illuminate their dark surroundings.",
        options: ["True", "False"],
        answer: 1,
        explanation: "'not merely for illumination, but primarily for...' ya'ni faqat yoritish uchun emas (False)."
      },
      {
        id: "lis_08_q7",
        type: "multiple_choice",
        question: "Which purpose is mentioned for bioluminescent emission?",
        options: ["Melting polar icecaps", "Counter-illumination camouflage against predators", "Increasing water salinity", "Absorbing sound waves"],
        answer: 1,
        explanation: "'counter-illumination camouflage against predators' asosiy vazifalardan biridir."
      },
      {
        id: "lis_08_q8",
        type: "multiple_choice",
        question: "How do predators use bioluminescence regarding prey?",
        options: ["To blind prey permanently", "To entice prey into striking range", "To freeze prey with cold light", "To disguise as rocks"],
        answer: 1,
        explanation: "'enticing prey into striking range' (o'ljani zarba masofasiga jalb qilish)."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 9: Part 5 - Opinions and Attitudes (Level B1)
  // -------------------------------------------------------------------------
  {
    id: "lis_09",
    title: "Debating Remote and Hybrid Work",
    uzTitle: "Masofaviy va gibrid ish muhokamasi",
    part: 5,
    partName: "Opinions and Attitudes",
    partUz: "Munosabat va Fikrlar",
    level: "B1",
    durationSec: 26,
    audioFile: "audio/listening-09.mp3",
    transcript: "While remote working offers remarkable flexibility and eliminates stressful daily commutes, several team leaders express genuine concern about weakened team cohesion. In our recent company survey, forty-five percent of employees felt slightly isolated when working entirely from home. Consequently, management is transitioning to a balanced hybrid schedule requiring two designated collaborative office days each week.",
    questions: [
      {
        id: "lis_09_q1",
        type: "multiple_choice",
        question: "What main advantage of remote working is highlighted first?",
        options: ["Higher salary packages", "Flexibility and elimination of daily commutes", "Free company laptops", "Unlimited annual leave"],
        answer: 1,
        explanation: "'offers remarkable flexibility and eliminates stressful daily commutes' deyiladi."
      },
      {
        id: "lis_09_q2",
        type: "fill_in_the_blank",
        question: "Team leaders expressed concern about weakened team ______.",
        acceptedAnswers: ["cohesion", "unity"],
        explanation: "'several team leaders express genuine concern about weakened team cohesion'."
      },
      {
        id: "lis_09_q3",
        type: "true_false",
        question: "No employees experienced feelings of isolation when working from home.",
        options: ["True", "False"],
        answer: 1,
        explanation: "45% xodim o'zini yolg'izlangan his qilgan ('felt slightly isolated') (False)."
      },
      {
        id: "lis_09_q4",
        type: "short_answer",
        question: "What percentage of employees reported feeling isolated?",
        acceptedAnswers: ["45%", "45", "forty-five percent", "forty five percent"],
        explanation: "'forty-five percent of employees felt slightly isolated' deb ko'rsatilgan."
      },
      {
        id: "lis_09_q5",
        type: "multiple_choice",
        question: "What model is management transitioning toward?",
        options: ["Full-time remote work forever", "A balanced hybrid schedule", "Six days in the office", "Closing down regional branches"],
        answer: 1,
        explanation: "'transitioning to a balanced hybrid schedule' deb aytiladi."
      },
      {
        id: "lis_09_q6",
        type: "multiple_choice",
        question: "How many office days will be required per week under the new plan?",
        options: ["One day", "Two days", "Three days", "Four days"],
        answer: 1,
        explanation: "'requiring two designated collaborative office days each week' deyilgan."
      },
      {
        id: "lis_09_q7",
        type: "true_false",
        question: "The new schedule is based on findings from a recent company survey.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'In our recent company survey... Consequently, management is transitioning' (True)."
      },
      {
        id: "lis_09_q8",
        type: "multiple_choice",
        question: "What is the designated purpose of the office days?",
        options: ["Personal relaxation", "Collaborative teamwork", "Taking written exams", "Cleaning office equipment"],
        answer: 1,
        explanation: "Ofis kunlari jamoaviy hamkorlik uchun: 'collaborative office days'."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 10: Part 5 - Opinions and Attitudes (Level B2)
  // -------------------------------------------------------------------------
  {
    id: "lis_10",
    title: "Perspectives on Electric Vehicles",
    uzTitle: "Elektromobillar bo'yicha fikr-mulohazalar",
    part: 5,
    partName: "Opinions and Attitudes",
    partUz: "Munosabat va Fikrlar",
    level: "B2",
    durationSec: 28,
    audioFile: "audio/listening-10.mp3",
    transcript: "Automotive analysts acknowledge that electric vehicles boast superior powertrain efficiency and zero tailpipe emissions. Nevertheless, prospective consumers remain hesitant due to initial purchase price disparities and limited high-speed charging infrastructure along rural corridors. Until battery recycling standards become universally adopted, skeptics argue that environmental benefits might be partially offset by mineral extraction demands.",
    questions: [
      {
        id: "lis_09_q1_b",
        id: "lis_10_q1",
        type: "multiple_choice",
        question: "What benefits of electric vehicles do analysts acknowledge?",
        options: ["Cheap spare parts", "Superior powertrain efficiency and zero tailpipe emissions", "Ability to fly over traffic", "Free battery replacements forever"],
        answer: 1,
        explanation: "'boast superior powertrain efficiency and zero tailpipe emissions' deyilgan."
      },
      {
        id: "lis_10_q2",
        type: "fill_in_the_blank",
        question: "Consumers are hesitant due to purchase price disparities and limited ______ infrastructure.",
        acceptedAnswers: ["charging", "charging infrastructure"],
        explanation: "'limited high-speed charging infrastructure along rural corridors'."
      },
      {
        id: "lis_10_q3",
        type: "true_false",
        question: "Charging stations are already abundant in all rural areas.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Qishloq hududlarida quvvatlash tarmog'i cheklangan ('limited along rural corridors') (False)."
      },
      {
        id: "lis_10_q4",
        type: "multiple_choice",
        question: "Where is charging infrastructure particularly limited?",
        options: ["Around downtown airports", "Along rural corridors", "Near commercial shopping malls", "At university campuses"],
        answer: 1,
        explanation: "'along rural corridors' deb ta'kidlanadi."
      },
      {
        id: "lis_10_q5",
        type: "short_answer",
        question: "What kind of standards need to be universally adopted?",
        acceptedAnswers: ["battery recycling", "battery recycling standards"],
        explanation: "'Until battery recycling standards become universally adopted' deb aytiladi."
      },
      {
        id: "lis_10_q6",
        type: "true_false",
        question: "Skeptics worry that mineral extraction demands might offset some environmental gains.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'environmental benefits might be partially offset by mineral extraction demands' (True)."
      },
      {
        id: "lis_10_q7",
        type: "multiple_choice",
        question: "What is another major consumer concern besides charging points?",
        options: ["Vehicle color options", "Initial purchase price disparities", "Lack of headlights", "Radio compatibility"],
        answer: 1,
        explanation: "Dastlabki xarid narxining qimmatligi: 'initial purchase price disparities'."
      },
      {
        id: "lis_10_q8",
        type: "multiple_choice",
        question: "What do electric vehicles emit from their tailpipes?",
        options: ["Heavy smoke", "Steam only", "Zero tailpipe emissions", "Carbon dioxide"],
        answer: 2,
        explanation: "'zero tailpipe emissions' (chiqindi gazlari nol darajada)."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 11: Part 6 - Short Story and Narrative (Level B1)
  // -------------------------------------------------------------------------
  {
    id: "lis_11",
    title: "An Unplanned Detour in the Highlands",
    uzTitle: "Tog'li hududdagi kutilmagan sarguzasht",
    part: 6,
    partName: "Short Story and Narrative",
    partUz: "Qisqa Hikoya va Voqealar",
    level: "B1",
    durationSec: 25,
    audioFile: "audio/listening-11.mp3",
    transcript: "Last autumn, while hiking through the Scottish Highlands, a sudden blanket of dense fog obscured our trail markers. We took shelter inside an abandoned stone shepherd cottage just as dusk fell. To our great surprise, an elderly local couple arrived an hour later carrying warm tea and fresh bannock bread. What began as an alarming ordeal turned into the warmest evening of our entire journey.",
    questions: [
      {
        id: "lis_11_q1",
        type: "multiple_choice",
        question: "Where did this hiking journey take place?",
        options: ["In the Swiss Alps", "In the Scottish Highlands", "In the Rocky Mountains", "In the Black Forest"],
        answer: 1,
        explanation: "'while hiking through the Scottish Highlands' deb boshlanadi."
      },
      {
        id: "lis_11_q2",
        type: "fill_in_the_blank",
        question: "A sudden blanket of dense ______ obscured the trail markers.",
        acceptedAnswers: ["fog", "mist"],
        explanation: "'a sudden blanket of dense fog obscured our trail markers' deyilgan."
      },
      {
        id: "lis_11_q3",
        type: "true_false",
        question: "The hikers stayed outside in an open meadow during the entire night.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Ular tosh uychadan panoh topishdi ('shelter inside an abandoned stone shepherd cottage') (False)."
      },
      {
        id: "lis_11_q4",
        type: "multiple_choice",
        question: "Where did the hikers seek shelter?",
        options: ["Inside a modern mountain hotel", "Inside an abandoned stone shepherd cottage", "Inside a wooden cave", "Under a plastic tent"],
        answer: 1,
        explanation: "'inside an abandoned stone shepherd cottage' deb aytiladi."
      },
      {
        id: "lis_11_q5",
        type: "short_answer",
        question: "Who arrived at the cottage an hour later?",
        acceptedAnswers: ["an elderly couple", "an elderly local couple", "local couple", "elderly couple"],
        explanation: "Audioda 'an elderly local couple arrived an hour later' deyilgan."
      },
      {
        id: "lis_11_q6",
        type: "multiple_choice",
        question: "What did the local visitors bring with them?",
        options: ["Maps and compasses", "Warm tea and fresh bannock bread", "Cold sandwiches and juice", "Flashlights and batteries"],
        answer: 1,
        explanation: "'carrying warm tea and fresh bannock bread' deb ta'kidlanadi."
      },
      {
        id: "lis_11_q7",
        type: "true_false",
        question: "The evening ended as a frightening and hostile experience.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Aksincha, butun safardagi eng samimiy oqshomga aylandi ('turned into the warmest evening') (False)."
      },
      {
        id: "lis_11_q8",
        type: "multiple_choice",
        question: "During which season of the year did this incident occur?",
        options: ["In early spring", "In mid-summer", "Last autumn", "In freezing winter"],
        answer: 2,
        explanation: "Hikoyaning birinchi so'zlari: 'Last autumn, while hiking...'."
      }
    ]
  },

  // -------------------------------------------------------------------------
  // EXERCISE 12: Part 6 - Short Story and Narrative (Level B2)
  // -------------------------------------------------------------------------
  {
    id: "lis_12",
    title: "The Midnight Discovery in the Attic",
    uzTitle: "Chordoqdagi yarim tunda topilgan sir",
    part: 6,
    partName: "Short Story and Narrative",
    partUz: "Qisqa Hikoya va Voqealar",
    level: "B2",
    durationSec: 24,
    audioFile: "audio/listening-12.mp3",
    transcript: "While helping my grandmother pack up her century-old ancestral home, we stumbled upon a padlocked cedar chest beneath dusty attic rafters. Inside lay a leatherbound maritime journal belonging to my great-grandfather from nineteen twelve. Between handwritten accounts of navigating the Pacific, he had pressed vibrant tropical leaves that still retained faint hints of green across more than a century.",
    questions: [
      {
        id: "lis_12_q1",
        type: "multiple_choice",
        question: "What task was the narrator assisting with?",
        options: ["Painting the living room walls", "Packing up grandmother's ancestral home", "Demolishing an old garden shed", "Installing attic insulation"],
        answer: 1,
        explanation: "'While helping my grandmother pack up her century-old ancestral home' deyiladi."
      },
      {
        id: "lis_12_q2",
        type: "fill_in_the_blank",
        question: "They discovered a padlocked ______ chest beneath the attic rafters.",
        acceptedAnswers: ["cedar", "wood", "wooden"],
        explanation: "'stumbled upon a padlocked cedar chest beneath dusty attic rafters'."
      },
      {
        id: "lis_12_q3",
        type: "multiple_choice",
        question: "What valuable item was found inside the chest?",
        options: ["Gold jewelry boxes", "A leatherbound maritime journal", "Antique silver coins", "Silk dresses"],
        answer: 1,
        explanation: "'Inside lay a leatherbound maritime journal' deb aytiladi."
      },
      {
        id: "lis_12_q4",
        type: "short_answer",
        question: "From which year did the journal date?",
        acceptedAnswers: ["1912", "nineteen twelve"],
        explanation: "'belonging to my great-grandfather from nineteen twelve' (1912-yil)."
      },
      {
        id: "lis_12_q5",
        type: "true_false",
        question: "The journal belonged to the narrator's great-grandfather.",
        options: ["True", "False"],
        answer: 0,
        explanation: "'belonging to my great-grandfather' (True)."
      },
      {
        id: "lis_12_q6",
        type: "multiple_choice",
        question: "Which ocean was mentioned in the handwritten voyage accounts?",
        options: ["The Atlantic Ocean", "The Indian Ocean", "The Pacific Ocean", "The Arctic Ocean"],
        answer: 2,
        explanation: "'accounts of navigating the Pacific' deb ko'rsatilgan."
      },
      {
        id: "lis_12_q7",
        type: "fill_in_the_blank",
        question: "Pressed between the pages were vibrant tropical ______.",
        acceptedAnswers: ["leaves", "leafs", "leaf"],
        explanation: "'he had pressed vibrant tropical leaves that still retained faint hints of green'."
      },
      {
        id: "lis_12_q8",
        type: "true_false",
        question: "The pressed leaves had completely turned to black ash.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Ular 100 yildan keyin ham yashilligini saqlab qolgan: 'still retained faint hints of green' (False)."
      }
    ]
  }
];

