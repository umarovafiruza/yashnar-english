/**
 * YASHNAR ENGLISH - QUIZ SYSTEM (GRAMMAR & VOCABULARY)
 * Complete implementation with CEFR levels, question palette,
 * instant evaluation, review explanations, and localStorage persistence.
 */

(function () {
  'use strict';

  // --- Constants & Keys ---
  const STORAGE_KEY_HISTORY = 'yashnar_quiz_history';
  const STORAGE_KEY_LAST_MODE = 'yashnar_quiz_last_mode';

  // --- State ---
  const State = {
    activeAppTab: 'shadowing', // 'shadowing' or 'quiz'
    activeQuizSection: 'grammar', // 'grammar' or 'vocabulary'
    activeLevelFilter: 'all', // 'all', 'A1', 'A2', 'B1', 'B2', 'C1'
    questionCount: 10, // 5, 10, 15, 20
    currentQuiz: null, // active quiz session
    history: []
  };

  // --- Helpers ---
  function $(id) {
    return document.getElementById(id);
  }

  function getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistoryItem(item) {
    const list = getHistory();
    list.unshift(item);
    // Keep last 100 entries
    if (list.length > 100) list.pop();
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(list));
    } catch (e) {}
    State.history = list;
  }

  function clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {}
    State.history = [];
    renderStatsBanner();
  }

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function showToast(message) {
    const existing = document.querySelector('.quiz-toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.className = 'quiz-toast';
    t.innerHTML = `<span>ℹ️</span> <span>${message}</span>`;
    document.body.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.3s ease';
      setTimeout(() => t.remove(), 300);
    }, 2800);
  }

  // --- Global Navigation Tabs ---
  function initNavTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const homeEl = $('home');
    const quizRoot = $('quiz-root');
    const listeningRoot = $('listening-root');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        State.activeAppTab = target;

        if (target === 'shadowing') {
          if (quizRoot) quizRoot.hidden = true;
          if (listeningRoot) listeningRoot.hidden = true;
          if (homeEl) homeEl.hidden = false;
          window.scrollTo(0, 0);
        } else if (target === 'listening') {
          if (homeEl) homeEl.hidden = true;
          if (quizRoot) quizRoot.hidden = true;
          if (listeningRoot) listeningRoot.hidden = false;
          if (window.openListeningSection) {
            window.openListeningSection();
          }
          window.scrollTo(0, 0);
        } else if (target === 'quiz') {
          if (homeEl) homeEl.hidden = true;
          if (listeningRoot) listeningRoot.hidden = true;
          if (quizRoot) quizRoot.hidden = false;
          renderCatalog();
          window.scrollTo(0, 0);
        }
      });
    });
  }

  // --- Statistics Computation ---
  function computeStats() {
    const hist = State.history;
    if (!hist.length) {
      return { total: 0, best: 0, average: 0, grammarCount: 0, vocabCount: 0 };
    }
    let totalScore = 0;
    let best = 0;
    let gCount = 0;
    let vCount = 0;

    hist.forEach(h => {
      const pct = Math.round((h.score / h.total) * 100);
      totalScore += pct;
      if (pct > best) best = pct;
      if (h.section === 'grammar') gCount++;
      else vCount++;
    });

    return {
      total: hist.length,
      best: best,
      average: Math.round(totalScore / hist.length),
      grammarCount: gCount,
      vocabCount: vCount
    };
  }

  // --- Render Catalog View ---
  function renderCatalog() {
    const container = $('quiz-view-catalog');
    const runner = $('quiz-view-runner');
    const results = $('quiz-view-results');

    if (container) container.hidden = false;
    if (runner) runner.hidden = true;
    if (results) results.hidden = true;

    renderStatsBanner();
    renderTopicsList();
  }

  function renderStatsBanner() {
    const banner = $('quiz-stats-banner');
    if (!banner) return;
    const stats = computeStats();

    banner.innerHTML = `
      <div class="stat-item">
        <span class="stat-num">${stats.total}</span>
        <span class="stat-label">Ishlangan testlar</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">${stats.total > 0 ? stats.best + '%' : '—'}</span>
        <span class="stat-label">Eng yaxshi natija</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">${stats.total > 0 ? stats.average + '%' : '—'}</span>
        <span class="stat-label">O'rtacha ko'rsatkich</span>
      </div>
      <div class="stat-action">
        <button type="button" class="btn ghost" id="btn-open-history" style="font-size: 0.875rem; padding: 0 16px; min-height: 40px;">
          Tarixni ko'rish (${stats.total})
        </button>
      </div>
    `;

    const histBtn = $('btn-open-history');
    if (histBtn) {
      histBtn.addEventListener('click', showHistoryModal);
    }
  }

  function getTopicBestScore(topicId) {
    const matches = State.history.filter(h => h.topicId === topicId);
    if (!matches.length) return null;
    let bestPct = 0;
    let bestScore = 0;
    let total = 0;
    matches.forEach(m => {
      const p = Math.round((m.score / m.total) * 100);
      if (p >= bestPct) {
        bestPct = p;
        bestScore = m.score;
        total = m.total;
      }
    });
    return { percent: bestPct, score: bestScore, total: total };
  }

  function renderTopicsList() {
    const grid = $('quiz-topics-grid');
    if (!grid) return;

    const isGrammar = State.activeQuizSection === 'grammar';
    const topics = isGrammar ? window.QUIZ_GRAMMAR_TOPICS : window.QUIZ_VOCAB_TOPICS;
    const allQuestions = isGrammar ? window.QUIZ_GRAMMAR : window.QUIZ_VOCABULARY;
    const currentLevel = State.activeLevelFilter;

    // Filter topics based on CEFR level
    const filteredTopics = topics.filter(t => {
      if (currentLevel === 'all') return true;
      return t.levels.includes(currentLevel);
    });

    if (!filteredTopics.length) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px 16px; color: var(--muted);">
          <p style="font-size: 1.125rem; margin-bottom: 8px;">Ushbu daraja uchun testlar topilmadi.</p>
          <button type="button" class="btn ghost" id="reset-level-filter" style="margin-top: 8px;">Barcha darajalarni ko'rsatish</button>
        </div>
      `;
      const resetBtn = $('reset-level-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          setLevelFilter('all');
        });
      }
      return;
    }

    grid.innerHTML = '';
    filteredTopics.forEach(topic => {
      // Count questions available for this topic
      let count = allQuestions.filter(q => q.topicId === topic.id).length;
      if (currentLevel !== 'all') {
        const levelCount = allQuestions.filter(q => q.topicId === topic.id && q.level === currentLevel).length;
        if (levelCount > 0) count = levelCount;
      }

      const best = getTopicBestScore(topic.id);

      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      card.innerHTML = `
        <div>
          <div class="card-top">
            <div class="card-levels">
              ${topic.levels.map(lv => `<span class="badge-level">${lv}</span>`).join('')}
            </div>
            ${best ? `<span class="card-score-pill">Natija: ${best.percent}%</span>` : ''}
          </div>
          <h3 class="card-title">${topic.name}</h3>
          <div class="card-uz">${topic.uz}</div>
          <p class="card-desc">${topic.desc}</p>
        </div>
        <div class="card-footer">
          <span>${count} ta savol mavjud</span>
          <span class="card-btn">Boshlash →</span>
        </div>
      `;

      card.addEventListener('click', () => {
        startQuiz(topic, State.activeQuizSection, currentLevel);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startQuiz(topic, State.activeQuizSection, currentLevel);
        }
      });

      grid.appendChild(card);
    });
  }

  function setLevelFilter(level) {
    State.activeLevelFilter = level;
    document.querySelectorAll('.level-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.level === level);
    });
    renderTopicsList();
  }

  // --- Start Quiz Session ---
  function startQuiz(topic, section, level) {
    const isGrammar = section === 'grammar';
    const allQuestions = isGrammar ? window.QUIZ_GRAMMAR : window.QUIZ_VOCABULARY;

    // Filter questions
    let pool = allQuestions.filter(q => q.topicId === topic.id);
    if (level && level !== 'all') {
      const levelMatches = pool.filter(q => q.level === level);
      if (levelMatches.length >= 3) {
        pool = levelMatches;
      }
    }

    if (!pool.length) {
      showToast("Bu mavzuda savollar topilmadi.");
      return;
    }

    // Shuffle and pick desired count
    const count = Math.min(State.questionCount, pool.length);
    const selectedQuestions = shuffle(pool).slice(0, count);

    State.currentQuiz = {
      topic: topic,
      section: section,
      level: level === 'all' ? (topic.levels.join(', ')) : level,
      questions: selectedQuestions,
      userAnswers: new Array(selectedQuestions.length).fill(null),
      currentIndex: 0,
      startTime: Date.now()
    };

    // Switch views
    $('quiz-view-catalog').hidden = true;
    $('quiz-view-runner').hidden = false;
    $('quiz-view-results').hidden = true;
    window.scrollTo(0, 0);

    renderRunner();
  }

  // --- Active Quiz Runner ---
  function renderRunner() {
    const quiz = State.currentQuiz;
    if (!quiz) return;

    const total = quiz.questions.length;
    const curIdx = quiz.currentIndex;
    const q = quiz.questions[curIdx];

    // Topic info
    $('runner-topic-title').textContent = quiz.topic.name;
    $('runner-topic-meta').innerHTML = `
      <span class="badge-level">${q.level}</span>
      <span>·</span>
      <span class="q-type-badge">${formatQuestionType(q.type)}</span>
      <span>·</span>
      <span>Savol ${curIdx + 1} / ${total}</span>
    `;

    // Progress bar
    const answeredCount = quiz.userAnswers.filter(a => a !== null).length;
    const pct = Math.round((answeredCount / total) * 100);
    $('runner-progress-fill').style.width = pct + '%';

    // Palette (number pills)
    const palette = $('runner-palette');
    palette.innerHTML = '';
    quiz.questions.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-btn';
      if (i === curIdx) btn.classList.add('current');
      if (quiz.userAnswers[i] !== null) btn.classList.add('answered');
      btn.textContent = i + 1;
      btn.title = `Savol ${i + 1}`;
      btn.addEventListener('click', () => {
        quiz.currentIndex = i;
        renderRunner();
      });
      palette.appendChild(btn);
    });

    // Question card
    $('runner-q-type').textContent = formatQuestionType(q.type);
    $('runner-q-text').textContent = q.question;

    // Options
    const optContainer = $('runner-options');
    optContainer.innerHTML = '';
    const keys = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, optIdx) => {
      const optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.className = 'option-item';
      if (quiz.userAnswers[curIdx] === optIdx) {
        optBtn.classList.add('selected');
      }

      optBtn.innerHTML = `
        <span class="option-key">${keys[optIdx]}</span>
        <span class="option-text">${optText}</span>
      `;

      optBtn.addEventListener('click', () => {
        quiz.userAnswers[curIdx] = optIdx;
        renderRunner();
      });

      optContainer.appendChild(optBtn);
    });

    // Navigation buttons
    const prevBtn = $('btn-runner-prev');
    const nextBtn = $('btn-runner-next');
    const finishBtn = $('btn-runner-finish');

    prevBtn.disabled = curIdx === 0;
    prevBtn.style.opacity = curIdx === 0 ? '0.35' : '1';

    if (curIdx === total - 1) {
      nextBtn.hidden = true;
      finishBtn.hidden = false;
    } else {
      nextBtn.hidden = false;
      finishBtn.hidden = false;
    }
  }

  function formatQuestionType(type) {
    const map = {
      multiple_choice: 'Multiple Choice',
      fill_in_the_blank: 'Fill in the blank',
      sentence_completion: 'Sentence Completion',
      error_identification: 'Error Identification',
      word_selection: 'Word Selection',
      word_formation: 'Word Formation'
    };
    return map[type] || 'Savol';
  }

  // --- Keyboard Shortcuts ---
  document.addEventListener('keydown', (e) => {
    const quiz = State.currentQuiz;
    if (!quiz || $('quiz-view-runner').hidden) return;

    // A, B, C, D or 1, 2, 3, 4
    const key = e.key.toUpperCase();
    if (['A', '1'].includes(key)) { selectOption(0); }
    else if (['B', '2'].includes(key)) { selectOption(1); }
    else if (['C', '3'].includes(key)) { selectOption(2); }
    else if (['D', '4'].includes(key)) { selectOption(3); }
    else if (e.key === 'ArrowRight' && quiz.currentIndex < quiz.questions.length - 1) {
      quiz.currentIndex++;
      renderRunner();
    } else if (e.key === 'ArrowLeft' && quiz.currentIndex > 0) {
      quiz.currentIndex--;
      renderRunner();
    }
  });

  function selectOption(index) {
    const quiz = State.currentQuiz;
    if (!quiz) return;
    const q = quiz.questions[quiz.currentIndex];
    if (q && q.options[index] !== undefined) {
      quiz.userAnswers[quiz.currentIndex] = index;
      renderRunner();
    }
  }

  // --- Finish Quiz & Evaluate ---
  function requestFinishQuiz() {
    const quiz = State.currentQuiz;
    if (!quiz) return;

    const unansweredCount = quiz.userAnswers.filter(a => a === null).length;
    if (unansweredCount > 0) {
      showConfirmModal(
        "Savollar to'liq yechilmadi",
        `Sizda hali ${unansweredCount} ta javob berilmagan savol bor. Testni hozir yakunlamoqchimisiz?`,
        "Davom etish",
        "Testni yakunlash",
        () => {
          finalizeQuiz();
        }
      );
    } else {
      finalizeQuiz();
    }
  }

  function finalizeQuiz() {
    const quiz = State.currentQuiz;
    if (!quiz) return;

    quiz.endTime = Date.now();
    const durationSec = Math.max(1, Math.round((quiz.endTime - quiz.startTime) / 1000));

    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (quiz.userAnswers[i] === q.answer) {
        correctCount++;
      }
    });

    const total = quiz.questions.length;
    const percent = Math.round((correctCount / total) * 100);

    const historyItem = {
      id: 'h_' + Date.now(),
      date: new Date().toISOString(),
      section: quiz.section,
      topicId: quiz.topic.id,
      topicName: quiz.topic.name,
      level: quiz.level,
      score: correctCount,
      total: total,
      percentage: percent,
      duration: durationSec
    };

    saveHistoryItem(historyItem);
    renderResults(correctCount, total, percent, durationSec);
  }

  // --- Render Results & Review ---
  function renderResults(correct, total, percent, durationSec) {
    $('quiz-view-catalog').hidden = true;
    $('quiz-view-runner').hidden = true;
    $('quiz-view-results').hidden = false;
    window.scrollTo(0, 0);

    const quiz = State.currentQuiz;
    const incorrect = total - correct;
    const mins = Math.floor(durationSec / 60);
    const secs = durationSec % 60;
    const timeFormatted = mins > 0 ? `${mins} daq ${secs} son` : `${secs} soniya`;

    $('res-score-percent').textContent = percent;
    $('res-metric-correct').textContent = correct;
    $('res-metric-wrong').textContent = incorrect;
    $('res-metric-time').textContent = timeFormatted;
    $('res-metric-level').textContent = quiz.level;

    // Motivational headline
    let headline = "Sinov yakunlandi!";
    let message = "Natijangiz qayd etildi. Xatolaringizni quyida ko'rib chiqishingiz mumkin.";
    if (percent === 100) {
      headline = "Mukammal natija! 🏆";
      message = "Barcha savollarga 100% to'g'ri javob berdingiz. Ushbu mavzuni a'lo darajada o'zlashtiribsiz!";
    } else if (percent >= 80) {
      headline = "Ajoyib natija! 🌟";
      message = "Juda yuqori ko'rsatkich! Kichik kamchiliklarni quyidagi tahlil orqali mustahkamlab oling.";
    } else if (percent >= 60) {
      headline = "Yaxshi natija! 👍";
      message = "Mavzuning asosiy qismini bilasiz. Xatolaringizni o'rganib, qayta urinib ko'ring.";
    } else {
      headline = "Amaliyotni davom eting! 📚";
      message = "Qiyinchiliklar o'rganishning bir qismidir. Har bir savol izohini yaxshilab o'qib, yana sinab ko'ring.";
    }

    $('res-headline').textContent = headline;
    $('res-message').textContent = message;

    // Detailed Review List
    const list = $('res-review-list');
    list.innerHTML = '';
    const keys = ['A', 'B', 'C', 'D'];

    quiz.questions.forEach((q, i) => {
      const userAns = quiz.userAnswers[i];
      const isCorrect = userAns === q.answer;
      const isUnanswered = userAns === null;

      const item = document.createElement('div');
      item.className = `review-item ${isUnanswered ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect')}`;

      const statusTag = isUnanswered
        ? '<span class="status-tag unanswered">Javobsiz</span>'
        : (isCorrect
          ? '<span class="status-tag correct">✓ To\'g\'ri</span>'
          : '<span class="status-tag incorrect">✕ Noto\'g\'ri</span>');

      const userAnsText = isUnanswered ? 'Javob berilmadi' : `${keys[userAns]}. ${q.options[userAns]}`;
      const correctAnsText = `${keys[q.answer]}. ${q.options[q.answer]}`;

      item.innerHTML = `
        <div class="review-status-row">
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--muted);">${i + 1}-savol · ${q.level}</span>
          ${statusTag}
        </div>
        <div class="review-question-text">${q.question}</div>
        <div class="review-answers-box">
          <div class="ans-row your-ans ${isCorrect ? 'correct-choice' : (isUnanswered ? '' : 'wrong-choice')}">
            <span class="ans-label">Sizning javobingiz:</span>
            <span class="ans-val">${userAnsText}</span>
          </div>
          ${!isCorrect ? `
            <div class="ans-row correct-ans">
              <span class="ans-label">To'g'ri javob:</span>
              <span class="ans-val">${correctAnsText}</span>
            </div>
          ` : ''}
        </div>
        <div class="review-explanation">
          <strong>Izoh:</strong> ${q.explanation}
        </div>
      `;

      list.appendChild(item);
    });
  }

  // --- Modals (Exit Confirmation, History) ---
  function showConfirmModal(title, message, cancelText, confirmText, onConfirm) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-card">
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="modal-actions">
          <button type="button" class="btn ghost" id="modal-btn-cancel">${cancelText}</button>
          <button type="button" class="btn" id="modal-btn-confirm">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#modal-btn-cancel').addEventListener('click', () => {
      overlay.remove();
    });

    overlay.querySelector('#modal-btn-confirm').addEventListener('click', () => {
      overlay.remove();
      if (onConfirm) onConfirm();
    });
  }

  function showHistoryModal() {
    const hist = State.history;
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    let contentHtml = '';
    if (!hist.length) {
      contentHtml = `<p style="text-align: center; color: var(--muted); padding: 32px 0;">Hozircha ishlangan testlar mavjud emas.</p>`;
    } else {
      contentHtml = `
        <div class="history-list">
          ${hist.map(h => {
            const dateStr = new Date(h.date).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            return `
              <div class="history-item">
                <div class="history-meta">
                  <span class="history-title">${h.topicName}</span>
                  <span class="history-sub">${dateStr} · ${h.section.toUpperCase()} · ${h.level}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span class="history-score">${h.percentage}%</span>
                  <span style="font-size: 0.8125rem; color: var(--muted);">(${h.score}/${h.total})</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    overlay.innerHTML = `
      <div class="modal-card history-modal-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <h3 style="margin: 0;">Testlar Tarixi</h3>
          ${hist.length ? `<button type="button" class="btn ghost" id="btn-clear-history" style="font-size: 0.75rem; padding: 4px 10px; min-height: 32px; color: #c5221f;">Tarixni tozalash</button>` : ''}
        </div>
        ${contentHtml}
        <div class="modal-actions" style="margin-top: auto;">
          <button type="button" class="btn" id="modal-close-history">Yopish</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#modal-close-history').addEventListener('click', () => {
      overlay.remove();
    });

    const clearBtn = overlay.querySelector('#btn-clear-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm("Haqiqatan ham testlar tarixini tozalashni xohlaysizmi?")) {
          clearHistory();
          overlay.remove();
        }
      });
    }
  }

  // --- Attach Event Listeners ---
  function initEvents() {
    // Section Switcher (Grammar vs Vocabulary)
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        modeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        State.activeQuizSection = this.dataset.mode;
        renderTopicsList();
      });
    });

    // Level Filter Pills
    const levelPills = document.querySelectorAll('.level-pill');
    levelPills.forEach(pill => {
      pill.addEventListener('click', function () {
        setLevelFilter(this.dataset.level);
      });
    });

    // Question Count Selector
    const countSelect = $('select-question-count');
    if (countSelect) {
      countSelect.addEventListener('change', function () {
        State.questionCount = parseInt(this.value, 10);
      });
    }

    // Runner Controls
    const prevBtn = $('btn-runner-prev');
    const nextBtn = $('btn-runner-next');
    const finishBtn = $('btn-runner-finish');
    const exitBtn = $('btn-runner-exit');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (State.currentQuiz && State.currentQuiz.currentIndex > 0) {
          State.currentQuiz.currentIndex--;
          renderRunner();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (State.currentQuiz && State.currentQuiz.currentIndex < State.currentQuiz.questions.length - 1) {
          State.currentQuiz.currentIndex++;
          renderRunner();
        }
      });
    }

    if (finishBtn) {
      finishBtn.addEventListener('click', requestFinishQuiz);
    }

    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        showConfirmModal(
          "Testni tark etish",
          "Test jarayonidan chiqmoqchimisiz? Hozirgi urinishingiz natijasi saqlanmaydi.",
          "Davom etish",
          "Chiqish",
          () => {
            State.currentQuiz = null;
            renderCatalog();
          }
        );
      });
    }

    // Results Actions
    const retakeBtn = $('btn-res-retake');
    const backBtn = $('btn-res-catalog');

    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        if (State.currentQuiz) {
          startQuiz(State.currentQuiz.topic, State.currentQuiz.section, State.activeLevelFilter);
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        State.currentQuiz = null;
        renderCatalog();
      });
    }
  }

  // --- Initialize on DOM Ready ---
  function init() {
    State.history = getHistory();
    initNavTabs();
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
