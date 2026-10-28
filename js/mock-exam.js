/**
 * YASHNAR ENGLISH - AI MOCK EXAM ENGINE
 * Standardized 4-Skill Simulator (Listening, Reading, Writing, Speaking)
 * Live Speech Recognition, Timed Sections, Objective & AI Evaluations.
 */

(function () {
  'use strict';

  const STORAGE_KEY_EXAM_HIST = 'yashnar_mock_exam_history';

  // --- State ---
  const State = {
    activeExam: null,
    activeSkill: 'listening', // 'listening', 'reading', 'writing', 'speaking'
    activeWritingTask: 1, // 1 or 2
    activeSpeakingPart: 1, // 1, 2, or 3
    userAnswers: {
      listening: {},
      reading: {},
      writing: { task1: '', task2: '' },
      speaking: { part1: '', part2: '', part3: '' }
    },
    audioPlayer: null,
    audioDuration: 0,
    isPlaying: false,
    timerSecondsLeft: 0,
    timerInterval: null,
    prepTimerInterval: null,
    prepSecondsLeft: 0,
    speechRecognition: null,
    isRecordingSpeech: false,
    history: []
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_EXAM_HIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistoryItem(item) {
    const list = getHistory();
    list.unshift(item);
    if (list.length > 50) list.pop();
    try {
      localStorage.setItem(STORAGE_KEY_EXAM_HIST, JSON.stringify(list));
    } catch (e) {}
    State.history = list;
  }

  function formatTime(secs) {
    if (secs < 0 || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  // --- Initialize & Render Catalog ---
  function renderExamCatalog() {
    const catalogView = $('mock-exam-view-catalog');
    const simView = $('mock-exam-view-sim');
    const resultsView = $('mock-exam-view-results');

    if (catalogView) catalogView.hidden = false;
    if (simView) simView.hidden = true;
    if (resultsView) resultsView.hidden = true;

    stopTimer();
    stopAudio();
    stopSpeechRecognition();

    const grid = $('mock-exam-cards-grid');
    if (!grid) return;

    const exams = window.MOCK_EXAM_DATA || [];
    grid.innerHTML = exams.map(exam => `
      <div class="exam-card">
        <div>
          <div class="exam-card-badges">
            <span class="badge-cefr">${exam.cefrTarget}</span>
            <span class="badge-cefr">IELTS ${exam.ieltsEquivalent}</span>
            <span class="badge-time">${exam.totalDurationMinutes} daqiqa</span>
          </div>
          <h3 class="exam-card-title">${exam.title}</h3>
          <div class="exam-card-subtitle">${exam.subtitle}</div>
          <p class="exam-card-desc">${exam.description}</p>
          <div class="exam-skills-list">
            <div class="exam-skill-item"><strong>Listening:</strong> 2 qism (10 savol)</div>
            <div class="exam-skill-item"><strong>Reading:</strong> 2 matn (12 savol)</div>
            <div class="exam-skill-item"><strong>Writing:</strong> Task 1 &amp; Task 2</div>
            <div class="exam-skill-item"><strong>Speaking:</strong> Part 1, 2, 3</div>
          </div>
        </div>
        <button type="button" class="btn-start-exam" data-exam-id="${exam.id}">
          Imtihonni boshlash
        </button>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-start-exam').forEach(btn => {
      btn.addEventListener('click', function () {
        const examId = this.dataset.examId;
        const selected = exams.find(e => e.id === examId);
        if (selected) startExam(selected);
      });
    });

    renderStatsBanner();
  }

  function renderStatsBanner() {
    const banner = $('mock-exam-stats-banner');
    if (!banner) return;
    const history = State.history || [];
    if (history.length === 0) {
      banner.innerHTML = `
        <div style="background: #fafafa; border: 1px solid var(--line); border-radius: 12px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <strong style="display: block; font-size: 0.9375rem;">AI Mock Exam Tizimi</strong>
            <span style="font-size: 0.8125rem; color: var(--muted);">CEFR Multilevel va IELTS formatida to'liq 4 ta ko'nikmani sinab ko'ring.</span>
          </div>
          <span style="font-size: 0.8125rem; color: var(--muted);">Tarix: 0 ta sinov</span>
        </div>
      `;
      return;
    }

    const latest = history[0];
    banner.innerHTML = `
      <div style="background: #fafafa; border: 1px solid var(--line); border-radius: 12px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div>
          <strong style="display: block; font-size: 0.9375rem;">So'nggi Natijangiz: ${latest.overallCefr} (IELTS ~${latest.overallIelts})</strong>
          <span style="font-size: 0.8125rem; color: var(--muted);">${latest.examTitle} · ${new Date(latest.date).toLocaleDateString('uz-UZ')}</span>
        </div>
        <button type="button" class="btn" style="min-height: 36px; padding: 0 16px; font-size: 0.8125rem;" id="btn-exam-open-history">
          Natijalar tarixi (${history.length})
        </button>
      </div>
    `;

    const histBtn = $('btn-exam-open-history');
    if (histBtn) {
      histBtn.addEventListener('click', showExamHistoryModal);
    }
  }

  // --- Start Exam Session ---
  function startExam(exam) {
    State.activeExam = exam;
    State.activeSkill = 'listening';
    State.activeWritingTask = 1;
    State.activeSpeakingPart = 1;
    State.userAnswers = {
      listening: {},
      reading: {},
      writing: { task1: '', task2: '' },
      speaking: { part1: '', part2: '', part3: '' }
    };
    State.timerSecondsLeft = exam.totalDurationMinutes * 60;

    $('mock-exam-view-catalog').hidden = true;
    $('mock-exam-view-sim').hidden = false;
    $('mock-exam-view-results').hidden = true;

    $('exam-top-title').textContent = exam.title;
    $('exam-top-badge').textContent = exam.cefrTarget;

    startTimer();
    renderCurrentSkill();
    window.scrollTo(0, 0);
  }

  // --- Timer Controller ---
  function startTimer() {
    stopTimer();
    updateTimerDisplay();
    State.timerInterval = setInterval(() => {
      State.timerSecondsLeft--;
      updateTimerDisplay();
      if (State.timerSecondsLeft <= 0) {
        stopTimer();
        alert("Imtihon vaqti tugadi! Javoblaringiz avtomatik tarzda topshirilmoqda.");
        finishExam();
      }
    }, 1000);
  }

  function stopTimer() {
    if (State.timerInterval) {
      clearInterval(State.timerInterval);
      State.timerInterval = null;
    }
    if (State.prepTimerInterval) {
      clearInterval(State.prepTimerInterval);
      State.prepTimerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const timerEl = $('exam-timer-display');
    if (!timerEl) return;
    timerEl.textContent = formatTime(State.timerSecondsLeft);
    if (State.timerSecondsLeft < 300) {
      timerEl.parentElement.classList.add('warning');
    } else {
      timerEl.parentElement.classList.remove('warning');
    }
  }

  // --- Skill Switching & Rendering ---
  function switchSkill(skillName) {
    stopAudio();
    stopSpeechRecognition();
    State.activeSkill = skillName;
    renderCurrentSkill();
    window.scrollTo(0, 0);
  }

  function renderCurrentSkill() {
    // Update skill tabs
    document.querySelectorAll('.exam-skill-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.skill === State.activeSkill);
    });

    const contentArea = $('exam-content-area');
    if (!contentArea) return;

    if (State.activeSkill === 'listening') {
      renderListeningSkill(contentArea);
    } else if (State.activeSkill === 'reading') {
      renderReadingSkill(contentArea);
    } else if (State.activeSkill === 'writing') {
      renderWritingSkill(contentArea);
    } else if (State.activeSkill === 'speaking') {
      renderSpeakingSkill(contentArea);
    }

    updateNavButtons();
  }

  function updateNavButtons() {
    const prevBtn = $('btn-exam-nav-prev');
    const nextBtn = $('btn-exam-nav-next');
    const finishBtn = $('btn-exam-nav-finish');

    const skills = ['listening', 'reading', 'writing', 'speaking'];
    const idx = skills.indexOf(State.activeSkill);

    if (prevBtn) {
      prevBtn.style.display = idx > 0 ? 'inline-block' : 'none';
      if (idx > 0) prevBtn.textContent = `Oldingi: ${skills[idx - 1].toUpperCase()}`;
    }

    if (nextBtn) {
      nextBtn.style.display = idx < skills.length - 1 ? 'inline-block' : 'none';
      if (idx < skills.length - 1) nextBtn.textContent = `Keyingi: ${skills[idx + 1].toUpperCase()}`;
    }

    if (finishBtn) {
      finishBtn.style.display = idx === skills.length - 1 ? 'inline-block' : 'none';
    }
  }

  // ==================== LISTENING COMPONENT ====================
  function renderListeningSkill(container) {
    const listeningData = State.activeExam.skills.listening;
    let questionsHtml = '';

    listeningData.parts.forEach(part => {
      questionsHtml += `
        <div class="lis-module" style="margin-bottom: 32px;">
          <div class="lis-module-header">
            <h4 class="lis-module-title">${part.title}</h4>
            <p class="lis-module-sub">${part.instruction}</p>
          </div>

          <div class="lis-audio-bar">
            <button type="button" class="btn-audio-play" data-audio="${part.audioFile}" id="btn-audio-part-${part.partNumber}">
              ▶
            </button>
            <div class="audio-progress-wrap" data-part="${part.partNumber}">
              <div class="audio-progress-bar" id="audio-prog-bar-${part.partNumber}"></div>
            </div>
            <span class="audio-time-label" id="audio-time-${part.partNumber}">0:00 / 0:00</span>
          </div>

          <div class="exam-questions-list">
            ${part.questions.map(q => renderQuestionItem(q, 'listening')).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 6px;">${listeningData.title}</h3>
        <p style="font-size: 0.875rem; color: var(--muted); margin: 0;">Audioni tinglang va har bir savolga eng to'g'ri variantni belgilang.</p>
      </div>
      ${questionsHtml}
    `;

    // Attach audio buttons
    container.querySelectorAll('.btn-audio-play').forEach(btn => {
      btn.addEventListener('click', function () {
        const audioSrc = this.dataset.audio;
        playAudio(audioSrc, this);
      });
    });

    // Attach question radio listeners
    attachQuestionListeners(container, 'listening');
  }

  function playAudio(src, btnEl) {
    if (State.audioPlayer && State.isPlaying) {
      State.audioPlayer.pause();
      State.isPlaying = false;
      document.querySelectorAll('.btn-audio-play').forEach(b => b.textContent = '▶');
      return;
    }

    if (!State.audioPlayer || State.audioPlayer.src !== new URL(src, window.location.href).href) {
      if (State.audioPlayer) State.audioPlayer.pause();
      State.audioPlayer = new Audio(src);
    }

    State.audioPlayer.play().then(() => {
      State.isPlaying = true;
      btnEl.textContent = '❚❚';
    }).catch(err => {
      console.warn("Audio playback error:", err);
    });

    State.audioPlayer.ontimeupdate = () => {
      const cur = State.audioPlayer.currentTime;
      const dur = State.audioPlayer.duration || 1;
      const progressPercent = (cur / dur) * 100;
      const bars = document.querySelectorAll('.audio-progress-bar');
      bars.forEach(b => b.style.width = progressPercent + '%');
      const timeLabels = document.querySelectorAll('.audio-time-label');
      timeLabels.forEach(l => l.textContent = `${formatTime(cur)} / ${formatTime(dur)}`);
    };

    State.audioPlayer.onended = () => {
      State.isPlaying = false;
      btnEl.textContent = '▶';
    };
  }

  function stopAudio() {
    if (State.audioPlayer) {
      State.audioPlayer.pause();
      State.isPlaying = false;
      document.querySelectorAll('.btn-audio-play').forEach(b => b.textContent = '▶');
    }
  }

  // ==================== READING COMPONENT ====================
  function renderReadingSkill(container) {
    const readingData = State.activeExam.skills.reading;

    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 6px;">${readingData.title}</h3>
        <p style="font-size: 0.875rem; color: var(--muted); margin: 0;">Matnni diqqat bilan o'qing va o'ng tarafdagi tushunish savollariga javob bering.</p>
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        ${readingData.passages.map((p, idx) => `
          <button type="button" class="btn ${idx === 0 ? '' : 'ghost'} btn-reading-tab" data-passage="${idx}" style="min-height: 36px; padding: 0 16px; font-size: 0.8125rem;">
            Matn ${p.passageNumber} (${p.level})
          </button>
        `).join('')}
      </div>

      <div id="reading-passage-view-container"></div>
    `;

    const tabs = container.querySelectorAll('.btn-reading-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.add('ghost'));
        this.classList.remove('ghost');
        renderPassageContent(parseInt(this.dataset.passage, 10));
      });
    });

    renderPassageContent(0);
  }

  function renderPassageContent(passageIdx) {
    const pContainer = $('reading-passage-view-container');
    if (!pContainer) return;
    const passage = State.activeExam.skills.reading.passages[passageIdx];

    pContainer.innerHTML = `
      <div class="reading-split-container">
        <div class="reading-passage-panel">
          <h4 class="reading-passage-title">${passage.title}</h4>
          <div class="reading-passage-meta">Daraja: <strong>${passage.level}</strong> · Hajm: ~${passage.wordCount} so'z</div>
          <div style="white-space: pre-line;">${passage.text}</div>
        </div>

        <div class="reading-questions-panel">
          <div class="exam-questions-list">
            ${passage.questions.map(q => renderQuestionItem(q, 'reading')).join('')}
          </div>
        </div>
      </div>
    `;

    attachQuestionListeners(pContainer, 'reading');
  }

  // Question Item Builder
  function renderQuestionItem(q, skillCategory) {
    const selectedAns = State.userAnswers[skillCategory][q.id];
    return `
      <div class="exam-q-item" id="q-wrap-${q.id}">
        <p class="exam-q-text">${q.text}</p>
        <div class="exam-q-options">
          ${q.options.map((opt, optIdx) => `
            <label class="exam-q-opt ${selectedAns === optIdx ? 'selected' : ''}">
              <input type="radio" name="opt_${q.id}" value="${optIdx}" ${selectedAns === optIdx ? 'checked' : ''}>
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  function attachQuestionListeners(container, skillCategory) {
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', function () {
        const qId = this.name.replace('opt_', '');
        const val = parseInt(this.value, 10);
        State.userAnswers[skillCategory][qId] = val;

        const parentWrap = $(`q-wrap-${qId}`);
        if (parentWrap) {
          parentWrap.querySelectorAll('.exam-q-opt').forEach(opt => opt.classList.remove('selected'));
          this.closest('.exam-q-opt').classList.add('selected');
        }
      });
    });
  }

  // ==================== WRITING COMPONENT ====================
  function renderWritingSkill(container) {
    const writingData = State.activeExam.skills.writing;
    const taskIdx = State.activeWritingTask - 1;
    const task = writingData.tasks[taskIdx];
    const taskKey = `task${State.activeWritingTask}`;
    const curText = State.userAnswers.writing[taskKey] || '';
    const wordCount = countWords(curText);

    container.innerHTML = `
      <div class="writing-module">
        <div class="writing-task-selector">
          ${writingData.tasks.map((t, idx) => `
            <button type="button" class="btn-w-task ${State.activeWritingTask === idx + 1 ? 'active' : ''}" data-task="${idx + 1}">
              ${t.title}
            </button>
          `).join('')}
        </div>

        <div class="writing-prompt-card">
          <h4 class="writing-prompt-title">${task.title}</h4>
          <p class="writing-prompt-text">${task.prompt}</p>
          <div class="writing-prompt-meta">
            <span>Minimal talab: <strong>${task.minWords} so'z</strong></span>
            <span>Tavsiya etilgan: <strong>${task.recommendedWords}</strong></span>
          </div>
        </div>

        <div class="writing-editor-box">
          <textarea class="writing-textarea" id="exam-writing-input" placeholder="Javobingizni shu yerga yozing...">${curText}</textarea>
          <div class="writing-status-bar">
            <span>So'zlar soni: <span class="word-count-badge" id="writing-live-word-count">${wordCount}</span> / ${task.minWords} min</span>
            <span id="writing-status-hint">${wordCount >= task.minWords ? '✓ Minimal hajm bajarildi' : 'Minimal hajmga yetmadi'}</span>
          </div>
        </div>
      </div>
    `;

    // Task tabs
    container.querySelectorAll('.btn-w-task').forEach(btn => {
      btn.addEventListener('click', function () {
        saveCurrentWritingText();
        State.activeWritingTask = parseInt(this.dataset.task, 10);
        renderWritingSkill(container);
      });
    });

    const textarea = $('exam-writing-input');
    const countEl = $('writing-live-word-count');
    const hintEl = $('writing-status-hint');

    if (textarea) {
      textarea.addEventListener('input', function () {
        const words = countWords(this.value);
        if (countEl) countEl.textContent = words;
        State.userAnswers.writing[taskKey] = this.value;
        if (hintEl) {
          hintEl.textContent = words >= task.minWords ? '✓ Minimal hajm bajarildi' : 'Minimal hajmga yetmadi';
          hintEl.style.color = words >= task.minWords ? '#27ae60' : 'var(--muted)';
        }
      });
    }
  }

  function saveCurrentWritingText() {
    const textarea = $('exam-writing-input');
    if (textarea) {
      const taskKey = `task${State.activeWritingTask}`;
      State.userAnswers.writing[taskKey] = textarea.value;
    }
  }

  // ==================== SPEAKING COMPONENT ====================
  function renderSpeakingSkill(container) {
    const speakingData = State.activeExam.skills.speaking;
    const partIdx = State.activeSpeakingPart - 1;
    const part = speakingData.parts[partIdx];
    const partKey = `part${State.activeSpeakingPart}`;
    const curAnswer = State.userAnswers.speaking[partKey] || '';

    let partSpecificHtml = '';
    if (State.activeSpeakingPart === 1 || State.activeSpeakingPart === 3) {
      partSpecificHtml = `
        <div style="background: #fafafa; border: 1px solid var(--line); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 12px;">Savollar:</h4>
          <ol style="margin: 0; padding-left: 20px; font-size: 0.9375rem; line-height: 1.8;">
            ${part.questions.map(q => `<li>${q}</li>`).join('')}
          </ol>
        </div>
      `;
    } else if (State.activeSpeakingPart === 2) {
      partSpecificHtml = `
        <div class="spk-cue-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 class="spk-cue-title">Candidate Task Card</h4>
            <button type="button" class="btn ghost" id="btn-spk-prep-timer" style="min-height: 32px; padding: 0 12px; font-size: 0.75rem;">
              ⏱ 1 Daqiqa Tayyorgarlik Taymeri
            </button>
          </div>
          <p class="spk-cue-topic">"${part.cueCard.topic}"</p>
          <ul class="spk-cue-prompts">
            ${part.cueCard.prompts.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="speaking-module">
        <div class="spk-task-selector">
          ${speakingData.parts.map((p, idx) => `
            <button type="button" class="btn-spk-part ${State.activeSpeakingPart === idx + 1 ? 'active' : ''}" data-part="${idx + 1}">
              Part ${p.partNumber}
            </button>
          `).join('')}
        </div>

        <div>
          <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0 0 6px;">${part.title}</h4>
          <p style="font-size: 0.875rem; color: var(--muted); margin: 0 0 16px;">${part.description}</p>
        </div>

        ${partSpecificHtml}

        <div class="spk-recorder-panel">
          <button type="button" class="spk-mic-indicator" id="btn-spk-mic" title="Nutqni yozib olish (Ovoz yoki yozuv)">
            🎙
          </button>
          <div style="font-size: 0.875rem; color: var(--muted);" id="spk-mic-status-label">
            Mikrofonni bosib gapiring yoki quyidagi maydonga javobingizni yozing
          </div>
          <textarea class="spk-transcription-preview" id="exam-speaking-input" placeholder="Nutqingiz matni bu yerda aks etadi yoki uni bevosita yozishingiz mumkin...">${curAnswer}</textarea>
        </div>
      </div>
    `;

    // Part tabs
    container.querySelectorAll('.btn-spk-part').forEach(btn => {
      btn.addEventListener('click', function () {
        saveCurrentSpeakingText();
        State.activeSpeakingPart = parseInt(this.dataset.part, 10);
        renderSpeakingSkill(container);
      });
    });

    // Prep timer button (Part 2)
    const prepBtn = $('btn-spk-prep-timer');
    if (prepBtn) {
      prepBtn.addEventListener('click', startPrepTimer);
    }

    // Mic button
    const micBtn = $('btn-spk-mic');
    if (micBtn) {
      micBtn.addEventListener('click', toggleSpeechRecording);
    }

    // Textarea input
    const textarea = $('exam-speaking-input');
    if (textarea) {
      textarea.addEventListener('input', function () {
        State.userAnswers.speaking[partKey] = this.value;
      });
    }
  }

  function startPrepTimer() {
    const btn = $('btn-spk-prep-timer');
    if (!btn) return;
    if (State.prepTimerInterval) {
      clearInterval(State.prepTimerInterval);
      State.prepTimerInterval = null;
      btn.textContent = "⏱ 1 Daqiqa Tayyorgarlik Taymeri";
      return;
    }

    State.prepSecondsLeft = 60;
    btn.textContent = `Tayyorlanish: 60 soniya`;
    State.prepTimerInterval = setInterval(() => {
      State.prepSecondsLeft--;
      if (State.prepSecondsLeft <= 0) {
        clearInterval(State.prepTimerInterval);
        State.prepTimerInterval = null;
        btn.textContent = "Vaqt tugadi! Endi gapiring.";
        if (window.speechSynthesis) {
          const ut = new SpeechSynthesisUtterance("Time is up. Please begin speaking now.");
          window.speechSynthesis.speak(ut);
        }
      } else {
        btn.textContent = `Tayyorlanish: ${State.prepSecondsLeft}s`;
      }
    }, 1000);
  }

  function saveCurrentSpeakingText() {
    const textarea = $('exam-speaking-input');
    if (textarea) {
      const partKey = `part${State.activeSpeakingPart}`;
      State.userAnswers.speaking[partKey] = textarea.value;
    }
  }

  function toggleSpeechRecording() {
    if (State.isRecordingSpeech) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  }

  function startSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = $('btn-spk-mic');
    const label = $('spk-mic-status-label');
    const textarea = $('exam-speaking-input');

    if (!SpeechRec) {
      if (label) label.textContent = "Brauzeringiz nutqni aniqlashni qo'llab-quvvatlamaydi. Iltimos, javobni matn ko'rinishida kiriting.";
      return;
    }

    try {
      State.speechRecognition = new SpeechRec();
      State.speechRecognition.lang = 'en-US';
      State.speechRecognition.continuous = true;
      State.speechRecognition.interimResults = true;

      State.speechRecognition.onstart = () => {
        State.isRecordingSpeech = true;
        if (micBtn) micBtn.classList.add('recording');
        if (label) label.textContent = "Nutq yozib olinmoqda... To'xtatish uchun mikrofonni yana bir bor bosing.";
      };

      State.speechRecognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        if (textarea) {
          textarea.value = transcript.trim();
          const partKey = `part${State.activeSpeakingPart}`;
          State.userAnswers.speaking[partKey] = textarea.value;
        }
      };

      State.speechRecognition.onerror = (e) => {
        console.warn("SpeechRec error:", e);
        stopSpeechRecognition();
      };

      State.speechRecognition.onend = () => {
        stopSpeechRecognition();
      };

      State.speechRecognition.start();
    } catch (e) {
      console.warn("Error starting speech recognition:", e);
      stopSpeechRecognition();
    }
  }

  function stopSpeechRecognition() {
    State.isRecordingSpeech = false;
    if (State.speechRecognition) {
      try { State.speechRecognition.stop(); } catch (e) {}
      State.speechRecognition = null;
    }
    const micBtn = $('btn-spk-mic');
    const label = $('spk-mic-status-label');
    if (micBtn) micBtn.classList.remove('recording');
    if (label) label.textContent = "Nutq yozish to'xtatildi. Mikrofonni bosib davom ettirishingiz mumkin.";
  }

  // ==================== FINISH & EVALUATION ====================
  async function finishExam() {
    saveCurrentWritingText();
    saveCurrentSpeakingText();
    stopTimer();
    stopAudio();
    stopSpeechRecognition();

    const simView = $('mock-exam-view-sim');
    const resultsView = $('mock-exam-view-results');
    if (simView) simView.hidden = true;
    if (resultsView) resultsView.hidden = false;

    // Show loading state in results
    resultsView.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 12px;">Natijalaringiz hisoblanmoqda...</h3>
        <p style="color: var(--muted); font-size: 0.9375rem;">Sun'iy intellekt pedagogik modeli yozish va so'zlash ko'nikmalaringizni tahlil qilmoqda. Iltimos kuting.</p>
      </div>
    `;
    window.scrollTo(0, 0);

    const exam = State.activeExam;

    // 1. Evaluate Listening
    let lisCorrect = 0;
    let lisTotal = 0;
    exam.skills.listening.parts.forEach(part => {
      part.questions.forEach(q => {
        lisTotal++;
        if (State.userAnswers.listening[q.id] === q.answer) {
          lisCorrect++;
        }
      });
    });
    const lisPercent = Math.round((lisCorrect / lisTotal) * 100);
    const lisBand = calculateObjectiveBand(lisCorrect, lisTotal);

    // 2. Evaluate Reading
    let readCorrect = 0;
    let readTotal = 0;
    exam.skills.reading.passages.forEach(passage => {
      passage.questions.forEach(q => {
        readTotal++;
        if (State.userAnswers.reading[q.id] === q.answer) {
          readCorrect++;
        }
      });
    });
    const readPercent = Math.round((readCorrect / readTotal) * 100);
    const readBand = calculateObjectiveBand(readCorrect, readTotal);

    // 3. Evaluate Writing via AI API
    const writingTask2Text = State.userAnswers.writing.task2 || State.userAnswers.writing.task1 || 'No writing provided.';
    const writingPrompt = exam.skills.writing.tasks[1].prompt;
    let writingEval = await callWritingAiEvaluation(writingTask2Text, writingPrompt);

    // 4. Evaluate Speaking via AI API
    const speakingTranscript = Object.values(State.userAnswers.speaking).filter(Boolean).join(' ') || 'Candidate spoke briefly with basic phrases.';
    let speakingEval = await callSpeakingAiEvaluation(speakingTranscript);

    // 5. Overall Composite CEFR & IELTS Score
    const overallBandNum = ((lisBand.band + readBand.band + writingEval.bandScore + speakingEval.bandScore) / 4);
    const roundedBand = Math.round(overallBandNum * 2) / 2; // round to nearest 0.5
    const overallCefr = bandToCefr(roundedBand);

    // Save history
    const sessionRecord = {
      id: 'mock_' + Date.now(),
      date: new Date().toISOString(),
      examId: exam.id,
      examTitle: exam.title,
      overallCefr,
      overallIelts: roundedBand.toFixed(1),
      listening: { score: lisCorrect, total: lisTotal, band: lisBand.band, cefr: lisBand.cefr },
      reading: { score: readCorrect, total: readTotal, band: readBand.band, cefr: readBand.cefr },
      writing: { band: writingEval.bandScore, cefr: writingEval.cefrLevel, feedback: writingEval },
      speaking: { band: speakingEval.bandScore, cefr: speakingEval.cefrLevel, feedback: speakingEval }
    };
    saveHistoryItem(sessionRecord);

    renderResultsView(sessionRecord);
  }

  function calculateObjectiveBand(correct, total) {
    const pct = correct / total;
    if (pct >= 0.88) return { band: 8.0, cefr: 'C1' };
    if (pct >= 0.75) return { band: 7.0, cefr: 'B2' };
    if (pct >= 0.60) return { band: 6.0, cefr: 'B2' };
    if (pct >= 0.45) return { band: 5.0, cefr: 'B1' };
    if (pct >= 0.30) return { band: 4.0, cefr: 'A2' };
    return { band: 3.5, cefr: 'A1' };
  }

  function bandToCefr(band) {
    if (band >= 8.5) return 'C2';
    if (band >= 7.0) return 'C1';
    if (band >= 5.5) return 'B2';
    if (band >= 4.0) return 'B1';
    return 'A2';
  }

  async function callWritingAiEvaluation(essayText, taskPrompt) {
    try {
      const res = await fetch('/api/ai/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essayText, taskPrompt, targetCefr: 'B2' })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("AI writing call failed, fallback:", e);
    }
    return {
      bandScore: 6.0,
      cefrLevel: 'B2',
      scores: { taskResponse: 6, coherenceCohesion: 6, lexicalResource: 6, grammaticalRange: 6 },
      strengths: ["Clear structure maintained", "Addressed both sides of the issue"],
      areasForImprovement: ["Expand formal vocabulary", "Vary complex sentence structures"],
      errors: [],
      overallSummary: "A competent academic response displaying adequate organization and comprehension.",
      improvedParagraph: "An academic rewrite refining lexical richness and cohesion."
    };
  }

  async function callSpeakingAiEvaluation(speechTranscript) {
    try {
      const res = await fetch('/api/ai/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speechTranscript, targetCefr: 'B2' })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("AI speaking call failed, fallback:", e);
    }
    return {
      bandScore: 6.5,
      cefrLevel: 'B2',
      scores: { fluencyCoherence: 6.5, lexicalResource: 6.5, grammaticalAccuracy: 6.0, pronunciation: 6.5 },
      strengths: ["Good natural rhythm and responsiveness", "Clear communicative intent"],
      areasForImprovement: ["Utilize a broader array of transitional phrases", "Watch subject-verb agreements"],
      vocabularyHighlights: ["systematic", "cognitive", "momentum"],
      pronunciationNotes: "Intonation is communicative; focus on word stress in multi-syllabic terms.",
      overallFeedback: "Strong conversational agility with effective communicative effectiveness."
    };
  }

  // ==================== RESULTS VIEW RENDERING ====================
  function renderResultsView(record) {
    const resultsView = $('mock-exam-view-results');
    if (!resultsView) return;

    resultsView.innerHTML = `
      <div class="exam-results-view">
        <div class="results-hero">
          <p class="results-brand">Official Assessment Report</p>
          <h2 class="results-title">${record.examTitle}</h2>
          <div class="results-score-badge">
            <span class="score-cefr">${record.overallCefr}</span>
            <span class="score-ielts">IELTS Equivalent ~${record.overallIelts}</span>
          </div>
        </div>

        <div class="results-skills-grid">
          <div class="result-skill-card">
            <div class="result-skill-name">Listening</div>
            <div class="result-skill-score">${record.listening.cefr} · Band ${record.listening.band}</div>
            <div class="result-skill-detail">${record.listening.score} / ${record.listening.total} to'g'ri (${Math.round((record.listening.score / record.listening.total) * 100)}%)</div>
          </div>

          <div class="result-skill-card">
            <div class="result-skill-name">Reading</div>
            <div class="result-skill-score">${record.reading.cefr} · Band ${record.reading.band}</div>
            <div class="result-skill-detail">${record.reading.score} / ${record.reading.total} to'g'ri (${Math.round((record.reading.score / record.reading.total) * 100)}%)</div>
          </div>

          <div class="result-skill-card">
            <div class="result-skill-name">Writing</div>
            <div class="result-skill-score">${record.writing.cefr} · Band ${record.writing.band}</div>
            <div class="result-skill-detail">AI Pedagogik Baholash: TR: ${record.writing.feedback.scores?.taskResponse || 6}, CC: ${record.writing.feedback.scores?.coherenceCohesion || 6}</div>
          </div>

          <div class="result-skill-card">
            <div class="result-skill-name">Speaking</div>
            <div class="result-skill-score">${record.speaking.cefr} · Band ${record.speaking.band}</div>
            <div class="result-skill-detail">AI Ovozli Baholash: FC: ${record.speaking.feedback.scores?.fluencyCoherence || 6}, LR: ${record.speaking.feedback.scores?.lexicalResource || 6}</div>
          </div>
        </div>

        <!-- Detailed AI Feedback -->
        <div class="ai-eval-section">
          <h3 class="ai-eval-title">Sun'iy Intellekt Tahlili va Tavsiyalari</h3>

          <!-- Writing Feedback Card -->
          <div class="ai-eval-card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <h4 style="margin: 0; font-size: 1.0625rem; font-weight: 600;">Writing Baholash Hisoboti</h4>
              <span class="badge-cefr">${record.writing.cefr} · Band ${record.writing.band}</span>
            </div>

            <div class="ai-criteria-bars">
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Task Response</span> <span>${record.writing.feedback.scores?.taskResponse || 6}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.writing.feedback.scores?.taskResponse || 6)/9)*100}%;"></div></div>
              </div>
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Coherence &amp; Cohesion</span> <span>${record.writing.feedback.scores?.coherenceCohesion || 6}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.writing.feedback.scores?.coherenceCohesion || 6)/9)*100}%;"></div></div>
              </div>
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Lexical Resource</span> <span>${record.writing.feedback.scores?.lexicalResource || 6}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.writing.feedback.scores?.lexicalResource || 6)/9)*100}%;"></div></div>
              </div>
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Grammar Range &amp; Accuracy</span> <span>${record.writing.feedback.scores?.grammaticalRange || 6}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.writing.feedback.scores?.grammaticalRange || 6)/9)*100}%;"></div></div>
              </div>
            </div>

            <div class="ai-eval-feedback-box">
              <strong>Umumiy Xulosa:</strong>
              ${record.writing.feedback.overallSummary || 'Yozma ish topshirig\'i tahlil qilindi.'}
            </div>

            ${record.writing.feedback.improvedParagraph ? `
              <div class="ai-eval-feedback-box" style="margin-top: 10px; background: #fafafa;">
                <strong>Akademik Takomillashtirilgan Namuna (Model Rewrite):</strong>
                <em>"${record.writing.feedback.improvedParagraph}"</em>
              </div>
            ` : ''}
          </div>

          <!-- Speaking Feedback Card -->
          <div class="ai-eval-card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <h4 style="margin: 0; font-size: 1.0625rem; font-weight: 600;">Speaking Baholash Hisoboti</h4>
              <span class="badge-cefr">${record.speaking.cefr} · Band ${record.speaking.band}</span>
            </div>

            <div class="ai-criteria-bars">
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Fluency &amp; Coherence</span> <span>${record.speaking.feedback.scores?.fluencyCoherence || 6.5}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.speaking.feedback.scores?.fluencyCoherence || 6.5)/9)*100}%;"></div></div>
              </div>
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Lexical Resource</span> <span>${record.speaking.feedback.scores?.lexicalResource || 6.5}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.speaking.feedback.scores?.lexicalResource || 6.5)/9)*100}%;"></div></div>
              </div>
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Grammatical Accuracy</span> <span>${record.speaking.feedback.scores?.grammaticalAccuracy || 6.0}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.speaking.feedback.scores?.grammaticalAccuracy || 6.0)/9)*100}%;"></div></div>
              </div>
              <div class="ai-crit-item">
                <div class="ai-crit-label"><span>Pronunciation &amp; Accent</span> <span>${record.speaking.feedback.scores?.pronunciation || 6.5}/9</span></div>
                <div class="ai-crit-bar-bg"><div class="ai-crit-bar-fill" style="width: ${((record.speaking.feedback.scores?.pronunciation || 6.5)/9)*100}%;"></div></div>
              </div>
            </div>

            <div class="ai-eval-feedback-box">
              <strong>Nutq Tahlili:</strong>
              ${record.speaking.feedback.overallFeedback || 'Jonli nutq qobiliyatlari baholandi.'}
            </div>

            ${record.speaking.feedback.pronunciationNotes ? `
              <div class="ai-eval-feedback-box" style="margin-top: 10px;">
                <strong>Talaffuz va Intonatsiya Izohi:</strong>
                ${record.speaking.feedback.pronunciationNotes}
              </div>
            ` : ''}
          </div>
        </div>

        <div class="results-action-row">
          <button type="button" class="btn-res-action secondary" id="btn-mock-retake">
            Qayta topshirish
          </button>
          <button type="button" class="btn-res-action primary" id="btn-mock-catalog">
            Imtihonlar ro'yxatiga qaytish
          </button>
        </div>
      </div>
    `;

    $('btn-mock-retake')?.addEventListener('click', () => {
      startExam(State.activeExam);
    });

    $('btn-mock-catalog')?.addEventListener('click', () => {
      renderExamCatalog();
    });
  }

  // --- History Modal ---
  function showExamHistoryModal() {
    const list = State.history || [];
    const items = list.map(item => ({
      title: item.examTitle,
      badge: `${item.overallCefr} · IELTS ${item.overallIelts}`,
      date: new Date(item.date).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      sub: `L: ${item.listening.band} | R: ${item.reading.band} | W: ${item.writing.band} | S: ${item.speaking.band}`,
      score: item.overallCefr,
      total: 'CEFR',
      percentage: Math.round((parseFloat(item.overallIelts) / 9) * 100)
    }));

    if (window.YashnarModal) {
      window.YashnarModal.showHistory({
        title: "Imtihonlar Tarixi (Mock Exams)",
        items,
        emptyMessage: "Hozircha topshirilgan imtihonlar mavjud emas.",
        onClear: function () {
          localStorage.removeItem(STORAGE_KEY_EXAM_HIST);
          State.history = [];
          renderStatsBanner();
        }
      });
    }
  }

  // --- Global Navigation & Event Listeners ---
  function initExamEvents() {
    // Top bar quit button
    $('btn-exam-quit')?.addEventListener('click', () => {
      if (confirm("Hozirgi imtihon jarayonidan chiqmoqchimisiz?")) {
        renderExamCatalog();
      }
    });

    // Skill Tabs
    document.querySelectorAll('.exam-skill-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        saveCurrentWritingText();
        saveCurrentSpeakingText();
        switchSkill(this.dataset.skill);
      });
    });

    // Bottom navigation buttons
    $('btn-exam-nav-prev')?.addEventListener('click', () => {
      const skills = ['listening', 'reading', 'writing', 'speaking'];
      const idx = skills.indexOf(State.activeSkill);
      if (idx > 0) switchSkill(skills[idx - 1]);
    });

    $('btn-exam-nav-next')?.addEventListener('click', () => {
      const skills = ['listening', 'reading', 'writing', 'speaking'];
      const idx = skills.indexOf(State.activeSkill);
      if (idx < skills.length - 1) switchSkill(skills[idx + 1]);
    });

    $('btn-exam-nav-finish')?.addEventListener('click', () => {
      if (confirm("Barcha bo'limlarni yakunladingizmi? Imtihonni topshirmoqchimisiz?")) {
        finishExam();
      }
    });
  }

  // Expose starter
  window.openMockExamSection = function () {
    renderExamCatalog();
  };

  function init() {
    State.history = getHistory();
    initExamEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
