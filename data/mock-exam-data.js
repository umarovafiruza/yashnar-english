/**
 * YASHNAR ENGLISH - AI MOCK EXAM DATASET
 * CEFR Multilevel & IELTS-style standardized exam models.
 * Complete 4 skills: Listening, Reading, Writing, Speaking.
 */

window.MOCK_EXAM_DATA = [
  {
    id: "cefr-multilevel-1",
    title: "CEFR Multilevel Standard Exam 1",
    subtitle: "Official Practice Model · B1–C1 Assessment",
    cefrTarget: "B1–C1",
    ieltsEquivalent: "5.5–8.0",
    totalDurationMinutes: 75,
    description: "To'liq 4 ta ko'nikma (Listening, Reading, Writing, Speaking) bo'yicha milliy Multilevel va xalqaro CEFR standartidagi attestatsiya imtihoni.",
    skills: {
      listening: {
        title: "Listening Comprehension",
        durationMinutes: 18,
        totalQuestions: 10,
        parts: [
          {
            partNumber: 1,
            title: "Part 1: University Seminar on Environmental Technologies",
            audioFile: "audio/listening-03.mp3",
            instruction: "Listen to the seminar recording and answer questions 1 to 5.",
            questions: [
              {
                id: "l1_q1",
                text: "What is the primary topic of Professor Davis's seminar?",
                type: "mcq",
                options: [
                  "The economic costs of traditional coal mining",
                  "Emerging renewable energy technologies and storage solutions",
                  "Urban transport regulations in northern Europe",
                  "Government subsidies for petrol-driven vehicles"
                ],
                answer: 1,
                explanation: "The seminar focuses on sustainable green technologies and energy storage systems."
              },
              {
                id: "l1_q2",
                text: "According to the speaker, what is the biggest obstacle to solar power adoption?",
                type: "mcq",
                options: [
                  "Lack of daylight in tropical regions",
                  "High manufacturing costs of solar panels only",
                  "Intermittent supply and battery storage capacity",
                  "Public resistance to installing roof panels"
                ],
                answer: 2,
                explanation: "Intermittency and energy storage are cited as the key technical challenges."
              },
              {
                id: "l1_q3",
                text: "Which energy storage material is highlighted for its high thermal capacity?",
                type: "mcq",
                options: [
                  "Molten salt solutions",
                  "Lithium-cadmium hybrids",
                  "Compressed natural gas",
                  "Lead-acid cells"
                ],
                answer: 0,
                explanation: "Molten salt is explicitly mentioned for thermal energy storage."
              },
              {
                id: "l1_q4",
                text: "What percentage reduction in costs has been observed over the last decade?",
                type: "mcq",
                options: [
                  "Approximately 30 percent",
                  "Nearly 50 percent",
                  "Over 70 percent",
                  "Less than 15 percent"
                ],
                answer: 2,
                explanation: "The professor states costs have decreased by over 70% in 10 years."
              },
              {
                id: "l1_q5",
                text: "What does the speaker conclude regarding developing nations?",
                type: "mcq",
                options: [
                  "They should avoid modern grids until 2050",
                  "They can leapfrog directly to decentralized green infrastructure",
                  "They lack sufficient geographical space for wind farms",
                  "They must rely strictly on imported coal"
                ],
                answer: 1,
                explanation: "Developing economies can leapfrog traditional centralized fossil grids."
              }
            ]
          },
          {
            partNumber: 2,
            title: "Part 2: Tech Innovations in Renewable Energy",
            audioFile: "audio/listening-04.mp3",
            instruction: "Listen to the presentation and answer questions 6 to 10.",
            questions: [
              {
                id: "l1_q6",
                text: "The new smart grid software primarily optimizes:",
                type: "mcq",
                options: [
                  "Electric billing rates for industrial consumers only",
                  "Dynamic balancing between variable generation and peak load demand",
                  "The mechanical rotation speed of offshore turbines",
                  "International energy trading treaties"
                ],
                answer: 1,
                explanation: "The software dynamically balances generation fluctuations with consumer demand."
              },
              {
                id: "l1_q7",
                text: "Offshore wind installations are preferred over onshore because:",
                type: "mcq",
                options: [
                  "They are far cheaper to assemble and maintain",
                  "Maritime winds are stronger and much more consistent",
                  "They require no underwater transmission cabling",
                  "Marine wildlife is entirely unaffected by noise"
                ],
                answer: 1,
                explanation: "Offshore wind offers higher velocity and consistent airflow."
              },
              {
                id: "l1_q8",
                text: "What safety feature is built into next-generation electrolyzers?",
                type: "mcq",
                options: [
                  "Manual valves operated solely by engineers",
                  "Automated pressure containment and acoustic leak sensors",
                  "Liquid nitrogen cooling jackets only",
                  "Wooden exterior shells to insulate electric current"
                ],
                answer: 1,
                explanation: "Acoustic leak detection and automated pressure containment are integrated."
              },
              {
                id: "l1_q9",
                text: "Green hydrogen is expected to play a critical role in decarbonizing:",
                type: "mcq",
                options: [
                  "Light residential household electronics",
                  "Heavy freight, shipping, and steel manufacturing",
                  "Digital smartphone production plants",
                  "Urban bicycle rental schemes"
                ],
                answer: 1,
                explanation: "Heavy industries like steelmaking and maritime freight require hydrogen."
              },
              {
                id: "l1_q10",
                text: "The speaker advises engineering graduates to focus on:",
                type: "mcq",
                options: [
                  "Traditional petroleum refining techniques",
                  "Interdisciplinary systems engineering and data-driven grid modeling",
                  "Pure theoretical mathematics without practical testing",
                  "Solely marketing and public advertising"
                ],
                answer: 1,
                explanation: "Interdisciplinary training and data modeling are recommended."
              }
            ]
          }
        ]
      },
      reading: {
        title: "Reading Comprehension",
        durationMinutes: 25,
        totalQuestions: 12,
        passages: [
          {
            passageNumber: 1,
            title: "Passage 1: The Neuroscience of Habit Formation and Daily Productivity",
            level: "B2",
            wordCount: 460,
            text: `For centuries, philosophers contemplated the nature of human routine, yet modern neuroscience has only recently demystified how repeated behaviors become ingrained neurological pathways. At the center of habit formation lies the basal ganglia, a primitive subcortical structure responsible for procedural learning, motor control, and routine automation. When an individual initiates an unfamiliar behavior, the prefrontal cortex—the cognitive epicenter of executive decision-making and conscious focus—works vigorously to evaluate every sequence. However, as the action is executed consistently within an identical contextual environment, the brain engages in a metabolic conservation process known as "chunking."

Chunking compresses complex sequences of discrete choices into an automatic mental loop. In his influential research, Charles Duhigg delineated this cognitive loop into three interdependent stages: the cue, the routine, and the reward. The cue acts as an environmental trigger that prompts the brain into automatic mode; the routine represents the behavioral manifestation itself; and the reward signals whether the cycle deserves retention in memory. 

Crucially, dopamine release does not merely accompany the receipt of the reward. Over successive repetitions, dopamine surges prior to the routine, upon mere perception of the sensory cue. This anticipatory neurochemical spike transforms a casual habit into a compulsive craving.

Consequently, attempts to obliterate undesirable habits through sheer willpower frequently falter. Contemporary cognitive behavioral research indicates that the most enduring methodology is the Golden Rule of Habit Change: leave the pre-existing cue and expected reward intact, while deliberately substituting an alternative, productive routine. By leveraging established neurological pathways rather than engaging in exhaustive mental resistance, individuals can systematically rewire daily habits with minimal cognitive fatigue.`,
            questions: [
              {
                id: "r1_q1",
                text: "According to paragraph 1, what is the primary role of the prefrontal cortex when learning a new task?",
                type: "mcq",
                options: [
                  "Automating motor reflexes without conscious awareness",
                  "Evaluating choices through active executive decision-making",
                  "Regulating metabolic temperature during physical stress",
                  "Permanently storing procedural memories of muscle movements"
                ],
                answer: 1,
                explanation: "Paragraph 1 states the prefrontal cortex is the cognitive epicenter of executive decision-making and conscious focus."
              },
              {
                id: "r1_q2",
                text: "The neurological process known as 'chunking' allows the brain to:",
                type: "mcq",
                options: [
                  "Erase unnecessary long-term memory traces",
                  "Conserve metabolic energy by transforming complex sequences into automatic loops",
                  "Increase dopamine levels during periods of sleep deprivation",
                  "Stimulate the prefrontal cortex to remain perpetually alert"
                ],
                answer: 1,
                explanation: "Chunking compresses complex sequences into automatic mental loops to conserve energy."
              },
              {
                id: "r1_q3",
                text: "According to the passage, when does dopamine surge once a habit is firmly established?",
                type: "mcq",
                options: [
                  "Solely after the final reward has been fully consumed",
                  "Before the routine begins, immediately upon detecting the cue",
                  "Only during REM sleep cycles following the activity",
                  "Randomly throughout the day regardless of environmental stimuli"
                ],
                answer: 1,
                explanation: "Dopamine surges in anticipation upon the mere perception of the sensory cue."
              },
              {
                id: "r1_q4",
                text: "The 'Golden Rule of Habit Change' advocates that people should:",
                type: "mcq",
                options: [
                  "Rely exclusively on unyielding willpower to eliminate cravings",
                  "Keep the cue and reward unchanged while replacing the intermediate routine",
                  "Change their living environment completely to avoid all triggers",
                  "Suppress dopamine production with pharmacological supplements"
                ],
                answer: 1,
                explanation: "The text explains the rule: keep existing cue and reward intact while substituting an alternative routine."
              },
              {
                id: "r1_q5",
                text: "The author implies that relying solely on willpower is often ineffective because:",
                type: "mcq",
                options: [
                  "The basal ganglia requires external electrical stimulation to change",
                  "Willpower causes severe long-term damage to the prefrontal cortex",
                  "Mental resistance induces cognitive fatigue and fails to alter the underlying neural loop",
                  "Dopamine is only produced in childhood"
                ],
                answer: 2,
                explanation: "Willpower involves exhaustive mental resistance, leading to cognitive fatigue."
              },
              {
                id: "r1_q6",
                text: "The word 'ingrained' in paragraph 1 is closest in meaning to:",
                type: "mcq",
                options: [
                  "Superficial and easily forgotten",
                  "Deeply established and permanent",
                  "Temporarily borrowed",
                  "Technologically engineered"
                ],
                answer: 1,
                explanation: "'Ingrained' refers to habits that are deeply embedded and firmly fixed."
              }
            ]
          },
          {
            passageNumber: 2,
            title: "Passage 2: Cognitive Linguistics and the Architecture of Human Thought",
            level: "C1",
            wordCount: 520,
            text: `In the middle decades of the twentieth century, formal linguistics was dominated by the Chomskyan paradigm of universal grammar—the thesis that the human brain contains an innate, biologically determined language acquisition device distinct from general cognitive faculties. Cognitive linguistics arose as a deliberate departure from this modular perspective. Pioneered by linguists such as George Lakoff, Ronald Langacker, and Mark Johnson, the cognitive paradigm posits that language does not occupy an autonomous cognitive silo. Instead, linguistic competence emerges organically from universal human sensorimotor experiences, perceptual processes, and embodied conceptual structures.

Central to this intellectual tradition is the Conceptual Metaphor Theory. Far from being merely decorative rhetorical flourishes utilized by poets, metaphors are fundamental mechanisms of everyday cognition. Human beings conceptualize abstract concepts by mapping them onto concrete, visceral experiences. For instance, in virtually every major language, time is conceptualized in terms of spatial movement: we look forward to the future, leave the past behind us, or run out of time as if it were a depleting physical commodity. These mappings are not arbitrary cultural anomalies; they reflect the inescapable reality that human beings move through physical space while observing the sequential passage of external events.

Moreover, cognitive grammarians demonstrate that grammatical categories themselves are inherently meaningful and graded rather than strictly binary. Whereas traditional formal grammar treats categories—such as nouns, verbs, or transitivity—as rigid, rule-bound compartments with sharp boundaries, cognitive grammar argues that categories are organized around prototypical exemplars. A robin or sparrow is deemed a central prototype of a bird, whereas a penguin or ostrich occupies the conceptual periphery.

This shift in theoretical perspective carries profound ramifications for second language acquisition. Rather than forcing adult learners to memorize sterile grammatical formulas and decontextualized tables, modern pedagogy grounded in cognitive linguistics emphasizes conceptual motivation. When learners comprehend the underlying spatial, sensorimotor, and metaphorical logic underpinning prepositions, phrasal verbs, and tense aspectual distinctions, linguistic rules cease to appear erratic and instead reveal an intuitive, interconnected architecture.`,
            questions: [
              {
                id: "r1_q7",
                text: "How does cognitive linguistics differ fundamentally from Chomsky's universal grammar?",
                type: "mcq",
                options: [
                  "It claims that language is governed exclusively by mathematical logic",
                  "It argues that language arises from general cognitive and sensorimotor processes rather than an isolated innate module",
                  "It asserts that written language existed thousands of years prior to speech",
                  "It rejects the idea that humans share any biological traits"
                ],
                answer: 1,
                explanation: "Cognitive linguistics posits that language emerges from embodied sensorimotor experience rather than an autonomous innate silo."
              },
              {
                id: "r1_q8",
                text: "According to Conceptual Metaphor Theory, metaphors are:",
                type: "mcq",
                options: [
                  "Superficial stylistic devices used primarily by literary authors",
                  "Core cognitive tools used to understand abstract domains through physical experience",
                  "Errors in grammatical execution caused by lack of education",
                  "Artificial idioms created solely by mass advertising"
                ],
                answer: 1,
                explanation: "Metaphors are described as fundamental mechanisms mapping abstract concepts onto concrete experiences."
              },
              {
                id: "r1_q9",
                text: "The spatial orientation example (e.g., 'look forward to the future') illustrates that:",
                type: "mcq",
                options: [
                  "All languages evolved from an identical ancient script",
                  "Abstract temporal concepts are systematically mapped onto physical space and movement",
                  "Human beings are incapable of understanding time without clocks",
                  "Future events are physically located in front of our eyes"
                ],
                answer: 1,
                explanation: "Time is conceptualized through physical spatial movement."
              },
              {
                id: "r1_q10",
                text: "How does cognitive grammar view grammatical categories?",
                type: "mcq",
                options: [
                  "As binary, strict compartments with rigid mathematical boundaries",
                  "As graded structures organized around central prototypical exemplars",
                  "As arbitrary historical conventions with zero intrinsic meaning",
                  "As useless remnants that should be eliminated from textbooks"
                ],
                answer: 1,
                explanation: "Categories are organized around prototypical exemplars with graded boundaries."
              },
              {
                id: "r1_q11",
                text: "What benefit does cognitive linguistics offer to second language learners?",
                type: "mcq",
                options: [
                  "It allows them to bypass learning any vocabulary entirely",
                  "It reveals the conceptual logic behind rules such as prepositions and phrasal verbs",
                  "It guarantees native fluency within twenty-four hours",
                  "It replaces teachers with autonomous computer scoring"
                ],
                answer: 1,
                explanation: "It provides conceptual motivation, making prepositions and phrasal verbs intuitive rather than erratic."
              },
              {
                id: "r1_q12",
                text: "The word 'periphery' in paragraph 3 refers to:",
                type: "mcq",
                options: [
                  "The exact mathematical center",
                  "The outer edge or non-central boundary",
                  "An ancient grammatical doctrine",
                  "A violent biological mutation"
                ],
                answer: 1,
                explanation: "Periphery means the outer edge or marginal boundaries of a concept."
              }
            ]
          }
        ]
      },
      writing: {
        title: "Writing Assessment",
        durationMinutes: 20,
        tasks: [
          {
            taskNumber: 1,
            title: "Task 1: Formal Communication",
            minWords: 120,
            recommendedWords: "150–180 words",
            prompt: `You are a university student planning an exchange semester abroad. Write a formal letter to the Director of International Student Exchange at Oxford College.

In your letter:
- Explain your academic background and chosen field of study.
- State why you wish to study at Oxford College and how it will advance your professional goals.
- Inquire about accommodation facilities, tuition fee exemptions, and scholarship deadlines.

Write at least 120 words in an appropriate formal academic tone.`
          },
          {
            taskNumber: 2,
            title: "Task 2: Discursive Essay",
            minWords: 200,
            recommendedWords: "250–320 words",
            prompt: `Some people believe that artificial intelligence will lead to massive unemployment and diminish human capability, while others maintain that it will foster new industries and liberate workers from repetitive tasks.

Discuss both views and give your own reasoned opinion. Include relevant examples from your knowledge or personal observation.

Write at least 200 words using a structured essay format (Introduction, Body Paragraphs, Conclusion).`
          }
        ]
      },
      speaking: {
        title: "Speaking Assessment",
        durationMinutes: 12,
        parts: [
          {
            partNumber: 1,
            title: "Part 1: Interview & Warm-Up",
            description: "Javob berish vaqti: har bir savol uchun 20-30 soniya.",
            questions: [
              "Could you tell me about your hometown and what makes it unique?",
              "Do you prefer studying or working in the morning or in the evening? Why?",
              "How important is learning English for your future academic and professional goals?"
            ]
          },
          {
            partNumber: 2,
            title: "Part 2: Long Turn (Cue Card)",
            description: "Tayyorlanish uchun 1 daqiqa vaqt beriladi. So'ng 1.5–2 daqiqa davomida to'xtovsiz gapiring.",
            cueCard: {
              topic: "Describe a momentous decision you made that significantly influenced your personal growth or educational journey.",
              prompts: [
                "What the decision was and when you made it",
                "What options you had to choose between",
                "Why this choice was difficult or challenging",
                "And explain how this decision affected your life in the long run"
              ]
            }
          },
          {
            partNumber: 3,
            title: "Part 3: Discussion & Two-Way Abstract Exchange",
            description: "Chuqurlashtirilgan tahliliy savollar. Har bir savolga to'liq, misollar bilan asoslangan javob bering.",
            questions: [
              "Do young people today face more difficult life decisions than previous generations did?",
              "To what extent should individuals rely on rational analysis versus intuition when making crucial career choices?",
              "How can education systems better equip students with critical decision-making skills?"
            ]
          }
        ]
      }
    }
  },
  {
    id: "ielts-academic-model-2",
    title: "IELTS Academic Simulation Exam 2",
    subtitle: "Full Academic Format · B2–C1 Focus",
    cefrTarget: "B2–C1",
    ieltsEquivalent: "6.5–8.5",
    totalDurationMinutes: 75,
    description: "Xalqaro IELTS Academic talablari asosida tuzilgan, talabchan ilmiy maqolalar, eshitish mashqlari va AI tahlilli yozish hamda gapirish imtihoni.",
    skills: {
      listening: {
        title: "Academic Listening",
        durationMinutes: 18,
        totalQuestions: 10,
        parts: [
          {
            partNumber: 1,
            title: "Part 1: Urban Architecture & Sustainable Cities",
            audioFile: "audio/listening-07.mp3",
            instruction: "Listen to the urban planning lecture and answer questions 1 to 5.",
            questions: [
              {
                id: "l2_q1",
                text: "The concept of the '15-Minute City' aims primarily to:",
                type: "mcq",
                options: [
                  "Increase maximum vehicular speed limits on highways",
                  "Ensure all essential services are accessible within a quarter-hour walk or bike ride",
                  "Mandate that all residential towers be constructed within 15 months",
                  "Limit pedestrian movement after nighttime curfews"
                ],
                answer: 1,
                explanation: "The 15-minute city ensures everyday necessities are reachable within 15 minutes by foot or cycling."
              },
              {
                id: "l2_q2",
                text: "What material does the lecturer recommend for carbon-negative construction?",
                type: "mcq",
                options: [
                  "Cross-laminated timber (mass timber)",
                  "High-density reinforced concrete",
                  "Single-glazed non-insulated glass",
                  "Lead-coated steel girders"
                ],
                answer: 0,
                explanation: "Mass engineered timber sequesters carbon and replaces high-emission concrete."
              },
              {
                id: "l2_q3",
                text: "How does green roofing mitigate the 'urban heat island' effect?",
                type: "mcq",
                options: [
                  "By reflecting gamma rays back into outer space",
                  "Through vegetative evapotranspiration and solar shading",
                  "By absorbing and trapping warm air inside attics",
                  "By eliminating all humidity in the surrounding air"
                ],
                answer: 1,
                explanation: "Vegetation cools surrounding air through evapotranspiration and shading."
              },
              {
                id: "l2_q4",
                text: "What challenge do older historical European cities face regarding retrofitting?",
                type: "mcq",
                options: [
                  "A total lack of municipal electricity",
                  "Strict conservation regulations and narrow medieval street networks",
                  "Excessive tropical heat throughout all four seasons",
                  "No interest from local residents in public transport"
                ],
                answer: 1,
                explanation: "Historic preservation codes and dense medieval layouts complicate retrofitting."
              },
              {
                id: "l2_q5",
                text: "The speaker argues that truly sustainable urban design must prioritize:",
                type: "mcq",
                options: [
                  "Private luxury car ownership",
                  "Equitable public transit, pedestrian zones, and civic green space",
                  "Commercial shopping malls on city perimeters",
                  "Underground automated delivery tunnels solely"
                ],
                answer: 1,
                explanation: "Transit equity, pedestrian priority, and public green infrastructure are central."
              }
            ]
          },
          {
            partNumber: 2,
            title: "Part 2: The Science of Sleep and Memory Consolidation",
            audioFile: "audio/listening-08.mp3",
            instruction: "Listen to the neurobiology lecture and answer questions 6 to 10.",
            questions: [
              {
                id: "l2_q6",
                text: "During slow-wave deep sleep, memories are transferred from:",
                type: "mcq",
                options: [
                  "The hippocampus to the neocortex for long-term storage",
                  "The retina directly to spinal motor neurons",
                  "The cerebellum to the outer auditory nerve",
                  "The frontal lobe into the brainstem"
                ],
                answer: 0,
                explanation: "Sleep spindles transfer temporary hippocampal data to the permanent neocortex."
              },
              {
                id: "l2_q7",
                text: "What neurochemical cleansing mechanism is active predominantly during sleep?",
                type: "mcq",
                options: [
                  "The cardiovascular pump system",
                  "The glymphatic system flushing toxic beta-amyloid proteins",
                  "Adrenaline surges clearing muscle lactic acid",
                  "Cortisol floods burning excess visceral fat"
                ],
                answer: 1,
                explanation: "The glymphatic system washes cerebral spinal fluid to remove metabolic waste."
              },
              {
                id: "l2_q8",
                text: "Chronic sleep deprivation below 6 hours per night is correlated with:",
                type: "mcq",
                options: [
                  "Increased mathematical creativity and IQ",
                  "Impaired immune response, higher cardiovascular risk, and cognitive decline",
                  "Immediate reduction in overall body weight",
                  "Permanent eradication of all anxious thoughts"
                ],
                answer: 1,
                explanation: "Chronic lack of sleep severely harms immunity, cardiovascular health, and focus."
              },
              {
                id: "l2_q9",
                text: "Blue light emitted by smartphones disrupts sleep by:",
                type: "mcq",
                options: [
                  "Directly destroying retinal cone cells permanently",
                  "Suppressing the pineal gland's secretion of melatonin",
                  "Elevating stomach acid levels immediately",
                  "Accelerating heart rate above 180 bpm"
                ],
                answer: 1,
                explanation: "Short-wavelength blue light suppresses natural melatonin synthesis."
              },
              {
                id: "l2_q10",
                text: "The lecturer recommends university students to:",
                type: "mcq",
                options: [
                  "Pull all-nighters before final exams to maximize rote memorization",
                  "Prioritize consistent 7 to 8 hours of restorative sleep to enhance cognitive retention",
                  "Rely exclusively on caffeine pills rather than sleeping",
                  "Sleep only once every two days"
                ],
                answer: 1,
                explanation: "Consistent 7-8 hours is essential for memory retention and exam performance."
              }
            ]
          }
        ]
      },
      reading: {
        title: "Academic Reading",
        durationMinutes: 25,
        totalQuestions: 12,
        passages: [
          {
            passageNumber: 1,
            title: "Passage 1: Marine Ecosystem Restoration and Ocean Acidity",
            level: "B2",
            wordCount: 480,
            text: `Marine biodiversity is currently undergoing unprecedented disruption due to anthropogenic emissions of carbon dioxide. Approximately thirty percent of carbon dioxide released into the atmosphere is absorbed by the world's oceans. While this marine absorption mitigates atmospheric global warming, it initiates a destructive chemical cascade termed ocean acidification. When carbon dioxide dissolves in seawater, it forms carbonic acid, which dissociates into hydrogen ions and bicarbonate. The excess hydrogen ions bind with ambient carbonate ions, drastically reducing the availability of free carbonate required by calcifying organisms.

Organisms such as corals, mollusks, and microscopic pteropods rely on calcium carbonate to synthesize their protective shells and structural skeletons. In acidified waters, the saturation state of aragonite—a soluble crystalline form of calcium carbonate—plummets. As a consequence, coral polyps experience stunted calcification rates, leading to fragile reef structures incapable of withstanding severe storms. Given that coral reefs support over twenty-five percent of all marine species despite occupying less than one percent of the seabed, their degradation threatens global fisheries and marine trophic stability.

In response to this ecological crisis, marine biologists are deploying innovative restorative methodologies. One prominent strategy involves cultivating resilient "super corals"—strains that have survived elevated temperatures and acidic waters in thermal lagoons. Through assisted micro-fragmentation, these specimens are propagated in offshore nurseries and subsequently outplanted onto damaged reef zones. Micro-fragmentation accelerates coral growth rates by up to forty times compared to natural reproduction.

Simultaneously, scientists are restoring kelp forests and coastal seagrass meadows. These underwater floral ecosystems perform immense biological carbon sequestration, commonly termed "blue carbon." Seagrass meadows draw carbon down into sediment thirty times faster than terrestrial rainforests. Furthermore, by photosynthesizing vigorously during daylight hours, they create localized zones of elevated pH, effectively providing acidic refugia where juvenile shellfish can build shells without chemical hindrance.`,
            questions: [
              {
                id: "r2_q1",
                text: "What occurs chemically when carbon dioxide dissolves in seawater?",
                type: "mcq",
                options: [
                  "Water evaporates rapidly, increasing salt salinity",
                  "Carbonic acid is formed, releasing hydrogen ions that deplete carbonate ions",
                  "Nitrogen levels double, suffocating microscopic algae",
                  "The temperature of the deep seabed drops to near freezing"
                ],
                answer: 1,
                explanation: "Carbonic acid dissociates into hydrogen ions, which consume free carbonate."
              },
              {
                id: "r2_q2",
                text: "Why are pteropods and corals particularly vulnerable to acidification?",
                type: "mcq",
                options: [
                  "They cannot breathe oxygen underwater",
                  "They need carbonate ions to build calcium carbonate shells and skeletons",
                  "They rely strictly on terrestrial insects for nutrition",
                  "Their eyes are blinded by direct sunlight in clear waters"
                ],
                answer: 1,
                explanation: "They require free carbonate ions to synthesize calcium carbonate shells."
              },
              {
                id: "r2_q3",
                text: "Despite occupying less than 1% of the seabed, coral reefs:",
                type: "mcq",
                options: [
                  "Produce all global drinking water",
                  "Support over twenty-five percent of all marine species",
                  "Consume all volcanic minerals emitted by trenches",
                  "Prevent icebergs from drifting toward the equator"
                ],
                answer: 1,
                explanation: "Paragraph 2 states coral reefs support over 25% of all marine species."
              },
              {
                id: "r2_q4",
                text: "What is the primary advantage of coral micro-fragmentation?",
                type: "mcq",
                options: [
                  "It eliminates the need for clean seawater",
                  "It accelerates coral growth rates by up to forty times",
                  "It transforms soft corals into metallic composites",
                  "It prevents predatory sharks from entering reefs"
                ],
                answer: 1,
                explanation: "Micro-fragmentation accelerates growth rates up to 40 times."
              },
              {
                id: "r2_q5",
                text: "How do seagrass meadows assist juvenile shellfish?",
                type: "mcq",
                options: [
                  "By creating localized areas of higher pH through daylight photosynthesis",
                  "By feeding them synthetic calcium tablets",
                  "By building artificial concrete barriers around them",
                  "By blocking all sea currents completely"
                ],
                answer: 0,
                explanation: "Seagrass photosynthesis raises local pH, providing safe refugia for shell formation."
              },
              {
                id: "r2_q6",
                text: "The term 'blue carbon' in paragraph 4 refers to:",
                type: "mcq",
                options: [
                  "Carbon captured and stored by coastal and oceanic ecosystems",
                  "Industrial carbon dyes used in nautical painting",
                  "Frozen methane ice found beneath polar glaciers",
                  "Smoke emissions produced by container cargo ships"
                ],
                answer: 0,
                explanation: "Blue carbon refers to carbon sequestered by marine and coastal habitats."
              }
            ]
          },
          {
            passageNumber: 2,
            title: "Passage 2: The Evolution of Space Telescopes and Deep-Field Astronomy",
            level: "C1",
            wordCount: 540,
            text: `For generations, observational astronomy was constrained by the turbulent atmospheric envelope of planet Earth. Even the most sophisticated terrestrial observatories atop desolate peaks suffered from atmospheric scintillation—the twinkling and blurring caused by shifting air currents and thermal gradients. Moreover, critical segments of the electromagnetic spectrum, particularly infrared and ultraviolet radiation, are absorbed by water vapor and ozone before reaching ground level. The launch of the Hubble Space Telescope in 1990 inaugurated a new epoch by lifting astronomy beyond the atmosphere, providing pristine optical clarity that revealed billions of previously undetected galaxies.

Yet, as astronomers probed deeper into cosmic history, an intrinsic physical hurdle emerged: cosmological redshift. Because the universe has been continuously expanding since the Big Bang, light emitted by primordial stars and early galaxies billions of years ago has had its wavelength stretched across vast cosmic distances. Visible and ultraviolet starlight emitted shortly after the dawn of time has shifted entirely into the infrared spectrum. Consequently, observing the birth of the earliest galaxies demanded an observatory optimized not for visible light, but for long-wavelength infrared astronomy.

This scientific imperative culminated in the development of the James Webb Space Telescope (JWST). Unlike Hubble, which operates in low Earth orbit just 550 kilometers above the planet, JWST was positioned at the second Sun-Earth Lagrange point (L2), roughly 1.5 million kilometers into deep space. At L2, the gravitational pull of the Sun and Earth balances the centrifugal force of the telescope's orbital motion, allowing it to maintain a stable, synchronized orbit that permanently shields its sensitive instruments from the thermal glow of Earth and the Moon.

To detect extraordinarily faint infrared signals, JWST's instruments must operate at cryogenic temperatures below 50 Kelvin (-223 degrees Celsius). This is achieved through a five-layer sunshield constructed of polyimide film coated with vapor-deposited aluminum and treated silicon. Each micro-thin membrane acts as an insulating barrier, reflecting scorching solar heat into space so that the telescope's beryllium primary mirror remains frigid. Through this breathtaking convergence of engineering and astrophysics, astronomers are now peering into the cosmic dark ages, capturing light emitted over 13.5 billion years ago and rewriting human comprehension of stellar evolution.`,
            questions: [
              {
                id: "r2_q7",
                text: "Terrestrial ground telescopes are disadvantaged compared to space telescopes primarily because:",
                type: "mcq",
                options: [
                  "Earth's gravity breaks reflective mirrors",
                  "Atmospheric scintillation blurs images and air absorbs infrared/UV radiation",
                  "No mountains on Earth are tall enough to point at stars",
                  "Solar wind blows dust onto terrestrial lenses daily"
                ],
                answer: 1,
                explanation: "Scintillation causes blurring and the atmosphere absorbs infrared and ultraviolet light."
              },
              {
                id: "r2_q8",
                text: "Why is infrared astronomy crucial for studying the earliest galaxies?",
                type: "mcq",
                options: [
                  "Infrared light is completely invisible to alien civilizations",
                  "Cosmological redshift has stretched the light of ancient stars into infrared wavelengths",
                  "Early stars only emitted heat waves with no visible radiation",
                  "Visible light travels significantly slower than infrared light"
                ],
                answer: 1,
                explanation: "Cosmological redshift stretches ancient light into the infrared spectrum."
              },
              {
                id: "r2_q9",
                text: "What makes the Lagrange Point L2 an advantageous location for JWST?",
                type: "mcq",
                options: [
                  "It is warm enough to operate without electrical batteries",
                  "It provides a gravitationally stable orbit shielded from Earth's thermal emission",
                  "Astronauts can easily fly there on weekly repair missions",
                  "It is located directly inside the atmosphere of Jupiter"
                ],
                answer: 1,
                explanation: "L2 offers a stable synchronized position that shields the telescope from Earth's thermal glow."
              },
              {
                id: "r2_q10",
                text: "What is the function of the five-layer polyimide sunshield on JWST?",
                type: "mcq",
                options: [
                  "To collect rainwater to power onboard hydro-turbines",
                  "To reflect solar heat and keep instruments at cryogenic temperatures below 50K",
                  "To disguise the telescope from space debris",
                  "To broadcast television signals back to global satellites"
                ],
                answer: 1,
                explanation: "The sunshield insulates and reflects solar radiation to maintain cryogenic conditions."
              },
              {
                id: "r2_q11",
                text: "The primary mirror of the JWST is constructed of:",
                type: "mcq",
                options: [
                  "Solid cast iron",
                  "Lightweight beryllium coated with gold",
                  "Transparent tempered glass only",
                  "Compressed carbon fiber diamonds"
                ],
                answer: 1,
                explanation: "Paragraph 4 highlights the telescope's beryllium primary mirror."
              },
              {
                id: "r2_q12",
                text: "The word 'pristine' in paragraph 1 is closest in meaning to:",
                type: "mcq",
                options: [
                  "Extremely flawed and distorted",
                  "Pure, clear, and unspoiled",
                  "Heavy and immovable",
                  "Ancient and decaying"
                ],
                answer: 1,
                explanation: "'Pristine' means immaculate, clear, and unblemished."
              }
            ]
          }
        ]
      },
      writing: {
        title: "Academic Writing Assessment",
        durationMinutes: 20,
        tasks: [
          {
            taskNumber: 1,
            title: "Task 1: Academic Data Description",
            minWords: 130,
            recommendedWords: "150–180 words",
            prompt: `The chart below summarizes data regarding renewable electricity generation (solar, wind, hydroelectric) across four European countries between 2012 and 2024. In 2012, renewable sources accounted for 18% in Country A, 24% in Country B, 32% in Country C, and 12% in Country D. By 2024, these figures surged to 48%, 56%, 68%, and 39% respectively, with offshore wind demonstrating the steepest trajectory in Country B and solar leading in Country A.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 130 words in an objective academic style.`
          },
          {
            taskNumber: 2,
            title: "Task 2: Academic Discursive Essay",
            minWords: 200,
            recommendedWords: "250–320 words",
            prompt: `Some educational theorists argue that universities should exclusively train students in technical, career-specific competencies to meet labor market demands, while others contend that tertiary education should prioritize broad critical inquiry, humanities, and theoretical wisdom regardless of immediate vocation.

Discuss both perspectives and express your personal viewpoint, citing real-world examples to support your argument.

Write at least 200 words with coherent paragraphs and strong academic vocabulary.`
          }
        ]
      },
      speaking: {
        title: "Academic Speaking Assessment",
        durationMinutes: 12,
        parts: [
          {
            partNumber: 1,
            title: "Part 1: Academic & Lifestyle Introduction",
            description: "20-30 soniyalik aniq va ravon javob bering.",
            questions: [
              "What subject do you find most intellectually stimulating, and why?",
              "How has digital technology transformed the way you read and retain information?",
              "Do you prefer living in a bustling metropolitan area or a quiet countryside town?"
            ]
          },
          {
            partNumber: 2,
            title: "Part 2: Long Turn (Cue Card)",
            description: "1 daqiqa tayyorgarlik, 1.5–2 daqiqa ravon nutq.",
            cueCard: {
              topic: "Describe a scientific breakthrough, article, or documentary that fundamentally shifted your perspective on a global issue.",
              prompts: [
                "What the breakthrough or piece of media was",
                "When and where you first encountered it",
                "What key insights or evidence it presented",
                "And explain why it left such a profound impression on your world view"
              ]
            }
          },
          {
            partNumber: 3,
            title: "Part 3: In-Depth Abstract Discussion",
            description: "Ijtimoiy va falsafiy tahlil. Fikringizni argumentlar bilan mustahkamlang.",
            questions: [
              "Why is scientific literacy crucial for citizens in modern democratic societies?",
              "Do mass media platforms tend to sensationalize scientific news at the expense of accuracy?",
              "What ethical boundaries should govern genetic engineering and artificial intelligence?"
            ]
          }
        ]
      }
    }
  }
];
