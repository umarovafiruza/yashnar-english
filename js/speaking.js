/**
 * Yashnar English - AI Speaking Partner Controller
 * Interactive conversational practice with AI tutor:
 * - 6 structured conversation modes with topic & CEFR selection
 * - Text & Microphone speech-to-text input with permission handling
 * - Real-time grammatical analysis & natural phrasing feedback
 * - Vocabulary discovery with direct "Save to Vocabulary" integration
 * - Comprehensive end-of-session diagnostic report
 */
(function () {
  'use strict';

  const STORAGE_KEY_SPEAKING_HIST = 'yashnar_speaking_history';

  // Pre-configured conversation modes and topics
  const MODES_DATA = [
    {
      id: "Everyday Conversations",
      title: "Everyday Conversations",
      desc: "Daily routines, hobbies, social events, food, and casual chat with friends.",
      topics: ["Weekend Plans & Hobbies", "Favorite Meals & Cooking", "Daily Morning Routine", "Family & Friendships", "City Life vs Country Life"]
    },
    {
      id: "Study and Education",
      title: "Study and Education",
      desc: "Language learning strategies, academic goals, university life, and exam preparation.",
      topics: ["Language Learning Methods", "Preparing for English Exams", "University Life in Uzbekistan", "Online Learning vs Traditional Classes", "Studying Abroad Goals"]
    },
    {
      id: "Work and Professional English",
      title: "Work and Professional English",
      desc: "Job interviews, team projects, career ambitions, workplace communication, and leadership.",
      topics: ["Job Interview Practice", "Remote Work & Digital Collaboration", "Leadership & Teamwork", "Time Management at Work", "Future Career Goals"]
    },
    {
      id: "Travel and Real-Life Situations",
      title: "Travel and Real-Life Situations",
      desc: "Airport navigation, hotel check-in, asking directions, dining out, and cultural experiences.",
      topics: ["Dream Travel Destinations", "Exploring Historic Cities", "At an International Airport", "Ordering in a Restaurant", "Cultural Differences & Customs"]
    },
    {
      id: "Opinions and Discussion",
      title: "Opinions and Discussion",
      desc: "Debating current topics, technology impacts, environmental solutions, and societal questions.",
      topics: ["Artificial Intelligence in Society", "Climate Action & Environment", "Social Media's Impact on Youth", "Preserving Cultural Heritage", "Work-Life Balance"]
    },
    {
      id: "CEFR Speaking Practice",
      title: "CEFR Speaking Practice",
      desc: "Structured practice mirroring CEFR & Multilevel Part 1, 2, and 3 interview questions.",
      topics: ["CEFR Part 1: Personal Interview", "CEFR Part 2: Long Turn Presentation", "CEFR Part 3: Two-Way Analytical Discussion", "Describing a Memorable Experience", "Analyzing a Public Policy Issue"]
    }
  ];

  // State
  const State = {
    selectedMode: MODES_DATA[0].id,
    selectedTopic: MODES_DATA[0].topics[0],
    selectedLevel: "B1",
    inSession: false,
    sessionStartTime: null,
    messages: [], // { sender: 'tutor'|'learner', text, timestamp, feedback: { correction, explanation, naturalAlternative, vocabularyTips } }
    isRecording: false,
    recognition: null,
    micError: null,
    history: []
  };

  const $ = (id) => document.getElementById(id);

  // Storage
  function loadHistory() {
    try {
      const d = localStorage.getItem(STORAGE_KEY_SPEAKING_HIST);
      State.history = d ? JSON.parse(d) : [];
    } catch (e) {
      State.history = [];
    }
  }

  function saveHistoryItem(item) {
    State.history.unshift(item);
    if (State.history.length > 50) State.history.pop();
    try {
      localStorage.setItem(STORAGE_KEY_SPEAKING_HIST, JSON.stringify(State.history));
    } catch (e) {}
  }

  // Audio Playback for Tutor
  function speakTutorText(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  // Speech Recognition Setup (Web Speech API)
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      State.recognition = null;
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        State.isRecording = true;
        State.micError = null;
        updateMicButtonUI();
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = $('speaking-text-input');
        if (input) {
          input.value = transcript;
        }
      };

      recognition.onerror = (event) => {
        State.isRecording = false;
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          State.micError = "Mikrofon ruxsati berilmadi. Iltimos brauzer sozlamalarida mikrofonga ruxsat bering yoki matn orqali yozing.";
        } else if (event.error === 'no-speech') {
          State.micError = "Ovoz eshitilmadi. Iltimos qaytadan urinib ko'ring.";
        } else {
          State.micError = `Ovozni tanishda xatolik yuz berdi (${event.error}).`;
        }
        updateMicButtonUI();
        renderMicError();
      };

      recognition.onend = () => {
        State.isRecording = false;
        updateMicButtonUI();
        // If an input exists, allow auto sending
        const input = $('speaking-text-input');
        if (input && input.value.trim().length > 0) {
          handleSendLearnerMessage(input.value.trim());
          input.value = '';
        }
      };

      State.recognition = recognition;
    } catch (e) {
      State.recognition = null;
    }
  }

  function toggleRecording() {
    if (!State.recognition) {
      State.micError = "Ushbu brauzerda ovozni avtomatik yozib olish (SpeechRecognition) qo'llab-quvvatlanmaydi. Matn orqali yozishingiz mumkin.";
      renderMicError();
      return;
    }

    if (State.isRecording) {
      State.recognition.stop();
      State.isRecording = false;
      updateMicButtonUI();
    } else {
      State.micError = null;
      renderMicError();
      try {
        State.recognition.start();
      } catch (err) {
        State.recognition.stop();
      }
    }
  }

  function updateMicButtonUI() {
    const btn = $('btn-speaking-mic');
    if (!btn) return;
    btn.classList.toggle('recording', State.isRecording);
    btn.title = State.isRecording ? "Yozishni to'xtatish" : "Mikrofon orqali gapirish";
  }

  function renderMicError() {
    let errBanner = $('speaking-mic-error-banner');
    if (!State.micError) {
      if (errBanner) errBanner.remove();
      return;
    }

    if (!errBanner) {
      errBanner = document.createElement('div');
      errBanner.id = 'speaking-mic-error-banner';
      errBanner.className = 'speaking-mic-error';
      const container = $('speaking-chat-container');
      if (container) container.insertBefore(errBanner, container.querySelector('.speaking-input-bar'));
    }

    errBanner.innerHTML = `
      <span>${State.micError}</span>
      <button type="button" style="background: none; border: 0; cursor: pointer; color: #d92d20; font-weight: 700;" onclick="this.parentElement.remove()">✕</button>
    `;
  }

  // --- Start Conversation Session ---
  function startSession() {
    State.inSession = true;
    State.sessionStartTime = Date.now();
    State.messages = [];

    // Initial greeting from AI Tutor based on mode and topic
    const initialGreetings = {
      "Everyday Conversations": `Hello! It's great to chat with you today. We're talking about "${State.selectedTopic}". To start off, how has your day been so far?`,
      "Study and Education": `Welcome to our study session! Today's focus is "${State.selectedTopic}". What inspired you to work on this topic today?`,
      "Work and Professional English": `Good day! In this professional conversation, our topic is "${State.selectedTopic}". Could you introduce your current background and perspective on this area?`,
      "Travel and Real-Life Situations": `Hello fellow traveler! We're exploring "${State.selectedTopic}" today. When you imagine this scenario, what is the first thing that comes to your mind?`,
      "Opinions and Discussion": `Welcome to our discussion forum. Our debate question centers on "${State.selectedTopic}". What is your immediate stance or opinion on this matter?`,
      "CEFR Speaking Practice": `Hello candidate. Welcome to this CEFR speaking practice session on "${State.selectedTopic}". Let us begin: could you describe your general thoughts on this subject?`
    };

    const initialText = initialGreetings[State.selectedMode] || `Hello! Let's talk about ${State.selectedTopic}. How are you doing today?`;

    State.messages.push({
      sender: 'tutor',
      text: initialText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: null
    });

    renderActiveChat();
    speakTutorText(initialText);
  }

  // --- Send Learner Message & Fetch AI Tutor Response ---
  async function handleSendLearnerMessage(text) {
    if (!text || !text.trim()) return;

    const learnerMsg = {
      sender: 'learner',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: null
    };

    State.messages.push(learnerMsg);
    renderMessagesList();
    scrollChatToBottom();

    // Show typing state
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble-wrap tutor';
    typingIndicator.id = 'chat-typing-bubble';
    typingIndicator.innerHTML = `
      <span class="chat-sender-label">AI Tutor</span>
      <div class="chat-bubble tutor" style="font-style: italic; color: var(--muted);">
        O'ylamoqda...
      </div>
    `;
    const msgArea = $('speaking-messages-area');
    if (msgArea) msgArea.appendChild(typingIndicator);
    scrollChatToBottom();

    try {
      const historyContext = State.messages
        .filter(m => m.text)
        .slice(-6)
        .map(m => `${m.sender}: ${m.text}`);

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: State.selectedMode,
          topic: State.selectedTopic,
          level: State.selectedLevel,
          message: text.trim(),
          history: historyContext
        })
      });

      const data = await response.json();
      if (typingIndicator) typingIndicator.remove();

      // Attach feedback to learner message
      if (data.correction || data.naturalAlternative || (data.vocabularyTips && data.vocabularyTips.length)) {
        learnerMsg.feedback = {
          correction: data.correction,
          explanation: data.explanation,
          naturalAlternative: data.naturalAlternative,
          vocabularyTips: data.vocabularyTips || []
        };
      }

      // Add tutor reply
      const tutorMsg = {
        sender: 'tutor',
        text: data.reply || "That's very interesting. Could you tell me more about that?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedback: null
      };

      State.messages.push(tutorMsg);
      renderMessagesList();
      scrollChatToBottom();
      speakTutorText(tutorMsg.text);

    } catch (err) {
      if (typingIndicator) typingIndicator.remove();
      // Graceful fallback response
      const fallbackMsg = {
        sender: 'tutor',
        text: "Thank you for your answer. Could you elaborate a little further with a practical example?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedback: null
      };
      State.messages.push(fallbackMsg);
      renderMessagesList();
      scrollChatToBottom();
      speakTutorText(fallbackMsg.text);
    }
  }

  function scrollChatToBottom() {
    const msgArea = $('speaking-messages-area');
    if (msgArea) {
      msgArea.scrollTop = msgArea.scrollHeight;
    }
  }

  // --- End Session & Generate Report ---
  function endSession() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (State.recognition && State.isRecording) State.recognition.stop();

    const learnerTurns = State.messages.filter(m => m.sender === 'learner');
    const grammarIssues = learnerTurns.filter(m => m.feedback && m.feedback.correction);
    const allVocab = [];
    learnerTurns.forEach(m => {
      if (m.feedback && m.feedback.vocabularyTips) {
        allVocab.push(...m.feedback.vocabularyTips);
      }
    });
    const uniqueVocab = Array.from(new Set(allVocab));

    const durationMin = Math.max(1, Math.round((Date.now() - State.sessionStartTime) / 60000));

    const report = {
      id: 'spk_' + Date.now(),
      date: new Date().toISOString(),
      mode: State.selectedMode,
      topic: State.selectedTopic,
      level: State.selectedLevel,
      turnsCount: learnerTurns.length,
      durationMin,
      grammarMistakesCount: grammarIssues.length,
      vocabularyRecommended: uniqueVocab
    };

    saveHistoryItem(report);
    renderSessionReport(report, grammarIssues, uniqueVocab);
  }

  // --- Render Views ---

  // 1. Setup Screen
  function renderSetupScreen() {
    const root = $('speaking-content-area');
    if (!root) return;

    const currentModeObj = MODES_DATA.find(m => m.id === State.selectedMode) || MODES_DATA[0];

    root.innerHTML = `
      <div class="speaking-setup-card">
        <div>
          <h3 class="speaking-setup-title">1. Suhbat yo'nalishini tanlang</h3>
          <p class="speaking-setup-desc">O'zingizga qiziq bo'lgan mavzuda AI repetitor bilan tabiiy muloqot qiling.</p>
        </div>

        <div class="speaking-modes-grid">
          ${MODES_DATA.map(m => `
            <div class="speaking-mode-card ${m.id === State.selectedMode ? 'selected' : ''}" data-mode="${m.id}">
              <span class="speaking-mode-name">${m.title}</span>
              <span class="speaking-mode-desc">${m.desc}</span>
            </div>
          `).join('')}
        </div>

        <div>
          <h3 class="speaking-setup-title">2. Mavzu va CEFR darajasi</h3>
          <p class="speaking-setup-desc">Tutor savollari siz tanlagan qiyinlik darajasiga moslashadi.</p>
        </div>

        <div class="speaking-options-row">
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <label for="speaking-topic-select" style="font-size: 0.8125rem; font-weight: 600; color: var(--muted);">Mavzu:</label>
            <select class="speaking-level-select" id="speaking-topic-select">
              ${currentModeObj.topics.map(t => `<option value="${t}" ${t === State.selectedTopic ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <label for="speaking-level-select" style="font-size: 0.8125rem; font-weight: 600; color: var(--muted);">Daraja:</label>
            <select class="speaking-level-select" id="speaking-level-select">
              <option value="A2" ${State.selectedLevel === 'A2' ? 'selected' : ''}>A2 — Elementary</option>
              <option value="B1" ${State.selectedLevel === 'B1' ? 'selected' : ''}>B1 — Intermediate</option>
              <option value="B2" ${State.selectedLevel === 'B2' ? 'selected' : ''}>B2 — Upper-Intermediate</option>
              <option value="C1" ${State.selectedLevel === 'C1' ? 'selected' : ''}>C1 — Advanced</option>
            </select>
          </div>

          <button type="button" class="btn" id="btn-start-speaking-session" style="min-height: 44px; padding: 0 24px;">
            Suhbatni boshlash
          </button>
        </div>
      </div>
    `;

    // Attach card clicks
    root.querySelectorAll('.speaking-mode-card').forEach(c => {
      c.onclick = () => {
        State.selectedMode = c.dataset.mode;
        const newModeObj = MODES_DATA.find(m => m.id === State.selectedMode);
        if (newModeObj) State.selectedTopic = newModeObj.topics[0];
        renderSetupScreen();
      };
    });

    const topicSelect = $('speaking-topic-select');
    if (topicSelect) {
      topicSelect.onchange = (e) => {
        State.selectedTopic = e.target.value;
      };
    }

    const levelSelect = $('speaking-level-select');
    if (levelSelect) {
      levelSelect.onchange = (e) => {
        State.selectedLevel = e.target.value;
      };
    }

    $('btn-start-speaking-session').onclick = startSession;
  }

  // 2. Active Chat Screen
  function renderActiveChat() {
    const root = $('speaking-content-area');
    if (!root) return;

    root.innerHTML = `
      <div class="speaking-chat-container" id="speaking-chat-container">
        <!-- Chat Header -->
        <div class="speaking-chat-header">
          <div class="speaking-chat-topic-info">
            <span class="speaking-status-dot"></span>
            <div>
              <div class="speaking-chat-title">${State.selectedTopic}</div>
              <div class="speaking-chat-meta">${State.selectedMode} · CEFR ${State.selectedLevel}</div>
            </div>
          </div>
          <button type="button" class="btn ghost" id="btn-end-speaking-session" style="min-height: 36px; padding: 0 14px; font-size: 0.8125rem;">
            Suhbatni yakunlash
          </button>
        </div>

        <!-- Messages Stream -->
        <div class="speaking-messages-area" id="speaking-messages-area"></div>

        <!-- Input Bar -->
        <div class="speaking-input-bar">
          <button type="button" class="btn-mic-toggle" id="btn-speaking-mic" aria-label="Mikrofon orqali gapirish" title="Ovoz bilan gapirish">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
          </button>

          <input type="text" class="speaking-text-input" id="speaking-text-input" placeholder="Ingliz tilida javob yozing yoki mikrofonni bosing..." autocomplete="off">

          <button type="button" class="btn-speaking-send" id="btn-speaking-send" aria-label="Yuborish" title="Yuborish">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    renderMessagesList();

    // Event listeners
    $('btn-end-speaking-session').onclick = () => {
      if (window.YashnarModal) {
        window.YashnarModal.confirm({
          title: "Suhbatni yakunlash",
          message: "Suhbatni yakunlab, o'rganilgan so'zlar va grammatik tahlil hisobotini ko'rishni xohlaysizmi?",
          icon: "info",
          confirmText: "Yakunlash va hisobot",
          cancelText: "Davom etish",
          onConfirm: endSession
        });
      } else {
        endSession();
      }
    };

    $('btn-speaking-mic').onclick = toggleRecording;

    const input = $('speaking-text-input');
    const sendBtn = $('btn-speaking-send');

    sendBtn.onclick = () => {
      if (input.value.trim().length > 0) {
        handleSendLearnerMessage(input.value.trim());
        input.value = '';
      }
    };

    input.onkeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
      }
    };

    setTimeout(() => input.focus(), 100);
  }

  function renderMessagesList() {
    const area = $('speaking-messages-area');
    if (!area) return;

    area.innerHTML = State.messages.map((m, idx) => {
      const isTutor = m.sender === 'tutor';
      return `
        <div class="chat-bubble-wrap ${m.sender}">
          <span class="chat-sender-label">${isTutor ? 'AI Tutor' : 'Siz'} · ${m.timestamp}</span>
          <div class="chat-bubble ${m.sender}">
            ${m.text}
          </div>

          ${isTutor ? `
            <div class="chat-bubble-actions">
              <button type="button" class="btn-chat-speak" data-text="${encodeURIComponent(m.text)}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                Ovozda tinglash
              </button>
            </div>
          ` : ''}

          ${m.feedback ? `
            <div class="feedback-box">
              ${m.feedback.correction ? `
                <div>
                  <span class="feedback-tag">Tavsiya etilgan tuzatish:</span>
                  <div class="feedback-correction">${m.feedback.correction}</div>
                  ${m.feedback.explanation ? `<div style="color: #6a6d75; margin-top: 2px;">${m.feedback.explanation}</div>` : ''}
                </div>
              ` : ''}

              ${m.feedback.naturalAlternative ? `
                <div>
                  <span class="feedback-tag">Tabiiy muqobil variant:</span>
                  <div class="feedback-alt">"${m.feedback.naturalAlternative}"</div>
                </div>
              ` : ''}

              ${m.feedback.vocabularyTips && m.feedback.vocabularyTips.length ? `
                <div class="feedback-vocab-row">
                  <span style="font-size: 0.6875rem; color: var(--muted); font-weight: 600;">Mavzuga oid iboralar:</span>
                  ${m.feedback.vocabularyTips.map(v => `
                    <button type="button" class="btn-vocab-chip" data-word="${v}" title="Lug'atimga saqlash">
                      + ${v}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach speak buttons
    area.querySelectorAll('.btn-chat-speak').forEach(btn => {
      btn.onclick = () => {
        speakTutorText(decodeURIComponent(btn.dataset.text));
      };
    });

    // Attach vocab chips save listeners
    area.querySelectorAll('.btn-vocab-chip').forEach(btn => {
      btn.onclick = () => {
        const word = btn.dataset.word;
        if (window.saveWordToVocabulary) {
          window.saveWordToVocabulary(word);
        }
      };
    });
  }

  // 3. End Session Summary Report Screen
  function renderSessionReport(report, grammarIssues, uniqueVocab) {
    const root = $('speaking-content-area');
    if (!root) return;

    root.innerHTML = `
      <div class="speaking-summary-card">
        <div class="speaking-summary-header">
          <span class="vocab-badge-level" style="margin-bottom: 8px; display: inline-block;">Sessiya Tahlili</span>
          <h2 style="font-family: var(--font-display); font-size: 2.25rem; margin: 0 0 6px;">Suhbat Hisoboti</h2>
          <p style="color: var(--muted); margin: 0;">Mavzu: <strong>${report.topic}</strong> · CEFR ${report.level}</p>
        </div>

        <div class="speaking-summary-grid">
          <div class="speaking-metric-card">
            <span class="speaking-metric-val">${report.turnsCount}</span>
            <span class="speaking-metric-lbl">Javoblar soni</span>
          </div>
          <div class="speaking-metric-card">
            <span class="speaking-metric-val">${report.durationMin} daq</span>
            <span class="speaking-metric-lbl">Suhbat davomiyligi</span>
          </div>
          <div class="speaking-metric-card">
            <span class="speaking-metric-val" style="color: ${report.grammarMistakesCount === 0 ? '#10753f' : '#d97706'};">${report.grammarMistakesCount}</span>
            <span class="speaking-metric-lbl">Grammatik tavsiyalar</span>
          </div>
        </div>

        ${grammarIssues.length ? `
          <div>
            <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 10px;">E'tibor berish kerak bo'lgan grammatik jihatlar:</h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${grammarIssues.map(g => `
                <div style="background: #fafbfc; border: 1px solid var(--line); border-left: 3px solid #d97706; padding: 10px 14px; border-radius: 8px; font-size: 0.875rem;">
                  <div style="color: #111; font-weight: 500;">${g.feedback.correction}</div>
                  <div style="color: var(--muted); font-size: 0.75rem; margin-top: 2px;">Sizning gapingiz: "${g.text}"</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div style="background: #eef8f2; border: 1px solid #d1fadf; border-radius: 12px; padding: 14px 18px; color: #10753f; font-size: 0.875rem;">
            Ajoyib natija! Ushbu sessiyada jiddiy grammatik xatolar kuzatilmadi. Fikrlaringiz ravon va tushunarli ifodalandi.
          </div>
        `}

        ${uniqueVocab.length ? `
          <div>
            <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 10px;">Sessiyada uchragan foydali so'zlar va iboralar:</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${uniqueVocab.map(v => `
                <button type="button" class="btn-vocab-chip" data-word="${v}" style="padding: 6px 14px; font-size: 0.8125rem;">
                  + ${v} (Lug'atga saqlash)
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 16px; border-top: 1px solid var(--line);">
          <button type="button" class="btn" id="btn-speaking-again">Yangi suhbat boshlash</button>
          <button type="button" class="btn ghost" id="btn-speaking-to-vocab">Mening lug'atimga o'tish</button>
        </div>
      </div>
    `;

    $('btn-speaking-again').onclick = renderSetupScreen;
    $('btn-speaking-to-vocab').onclick = () => {
      const vocabTab = document.querySelector('[data-tab="vocabulary"]');
      if (vocabTab) vocabTab.click();
    };

    root.querySelectorAll('.btn-vocab-chip').forEach(btn => {
      btn.onclick = () => {
        if (window.saveWordToVocabulary) {
          window.saveWordToVocabulary(btn.dataset.word);
        }
      };
    });
  }

  // --- Initialization ---
  function init() {
    loadHistory();
    initSpeechRecognition();
    renderSetupScreen();
  }

  window.openSpeakingSection = function () {
    init();
  };

  document.addEventListener('DOMContentLoaded', () => {
    initSpeechRecognition();
  });
})();
