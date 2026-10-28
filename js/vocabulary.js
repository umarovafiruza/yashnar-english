/**
 * Yashnar English - Vocabulary Builder Engine
 * Features:
 * - Curated A1-C1 Vocabulary Library
 * - Spaced Repetition System (SRS) using SM-2 algorithm
 * - Interactive 3D Flashcards with self-assessment
 * - Vocabulary Quizzes (Multiple Choice, Fill-in-blank, Context)
 * - "My Vocabulary" word book & transcript word saver
 * - Real pronunciation via Web Speech API
 */
(function () {
  'use strict';

  const STORAGE_KEY_PROGRESS = 'yashnar_vocab_progress';
  const STORAGE_KEY_MY_WORDS = 'yashnar_my_vocabulary';

  // --- State ---
  const State = {
    words: [],
    progress: {},      // { [id]: { repetitions, interval, nextReviewDate, lastReviewDate, status } }
    myWords: new Set(), // Set of saved word IDs
    activeTab: 'browse', // 'browse' | 'flashcards' | 'quiz' | 'mywords'
    filterLevel: 'all',
    filterTopic: 'all',
    searchQuery: '',
    // Flashcard session state
    fcQueue: [],
    fcIndex: 0,
    fcFlipped: false,
    // Quiz session state
    quizQueue: [],
    quizIndex: 0,
    quizScore: 0,
    quizUserAnswer: null
  };

  const $ = (id) => document.getElementById(id);

  // --- Storage Helpers ---
  function loadStoredData() {
    try {
      const p = localStorage.getItem(STORAGE_KEY_PROGRESS);
      State.progress = p ? JSON.parse(p) : {};
    } catch (e) {
      State.progress = {};
    }

    try {
      const m = localStorage.getItem(STORAGE_KEY_MY_WORDS);
      State.myWords = new Set(m ? JSON.parse(m) : []);
    } catch (e) {
      State.myWords = new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(State.progress));
    } catch (e) {}
  }

  function saveMyWords() {
    try {
      localStorage.setItem(STORAGE_KEY_MY_WORDS, JSON.stringify(Array.from(State.myWords)));
    } catch (e) {}
  }

  // --- Spaced Repetition (SRS) Engine ---
  /**
   * Rating scale:
   * 1 = Again / Unutdim (Reset interval to 1 day)
   * 2 = Hard / Qiyin (Slow interval growth)
   * 3 = Good / Yaxshi (Standard interval growth)
   * 4 = Easy / Oson (Rapid interval growth)
   */
  function recordReview(wordId, rating) {
    const now = Date.now();
    const entry = State.progress[wordId] || {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: now,
      lastReviewDate: now,
      status: 'learning'
    };

    let rep = entry.repetitions || 0;
    let interval = entry.interval || 1;

    if (rating === 1) {
      // Again: reset interval
      rep = 0;
      interval = 1;
    } else if (rating === 2) {
      // Hard
      rep += 1;
      interval = rep === 1 ? 1 : Math.max(2, Math.round(interval * 1.3));
    } else if (rating === 3) {
      // Good
      rep += 1;
      interval = rep === 1 ? 1 : (rep === 2 ? 3 : Math.round(interval * 2.2));
    } else if (rating === 4) {
      // Easy
      rep += 1;
      interval = rep === 1 ? 3 : (rep === 2 ? 7 : Math.round(interval * 3.5));
    }

    const nextDate = now + interval * 24 * 60 * 60 * 1000;
    const isLearned = interval >= 14;

    State.progress[wordId] = {
      repetitions: rep,
      interval: interval,
      easeFactor: entry.easeFactor || 2.5,
      nextReviewDate: nextDate,
      lastReviewDate: now,
      status: isLearned ? 'learned' : 'learning'
    };

    saveProgress();
    updateStatsBanner();
  }

  function isDueForReview(wordId) {
    const p = State.progress[wordId];
    if (!p || !p.nextReviewDate) return false;
    return p.nextReviewDate <= Date.now();
  }

  function toggleMyWord(wordId) {
    if (State.myWords.has(wordId)) {
      State.myWords.delete(wordId);
    } else {
      State.myWords.add(wordId);
      // Auto initialize in progress as learning if not exists
      if (!State.progress[wordId]) {
        recordReview(wordId, 1);
      }
    }
    saveMyWords();
    updateStatsBanner();
    renderCurrentView();
  }

  // --- Audio Pronunciation ---
  function speakWord(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  // --- Filtered Words ---
  function getFilteredWords() {
    let list = State.words;

    // Filter by Level
    if (State.filterLevel !== 'all') {
      list = list.filter(w => w.level.toLowerCase() === State.filterLevel.toLowerCase());
    }

    // Filter by Topic
    if (State.filterTopic !== 'all') {
      list = list.filter(w => w.topic === State.filterTopic);
    }

    // Filter by Search
    if (State.searchQuery.trim()) {
      const q = State.searchQuery.toLowerCase().trim();
      list = list.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q) ||
        w.definition.toLowerCase().includes(q)
      );
    }

    // Filter by Tab
    if (State.activeTab === 'mywords') {
      list = list.filter(w => State.myWords.has(w.id));
    }

    return list;
  }

  // --- Statistics Calculation ---
  function updateStatsBanner() {
    const banner = $('vocab-stats-banner');
    if (!banner) return;

    const totalWords = State.words.length;
    const savedCount = State.myWords.size;

    let learnedCount = 0;
    let dueCount = 0;
    const now = Date.now();

    Object.keys(State.progress).forEach(id => {
      const p = State.progress[id];
      if (p.status === 'learned' || (p.interval && p.interval >= 14)) {
        learnedCount++;
      }
      if (p.nextReviewDate && p.nextReviewDate <= now) {
        dueCount++;
      }
    });

    banner.innerHTML = `
      <div class="vocab-stat-item">
        <span class="vocab-stat-num">${totalWords}</span>
        <span class="vocab-stat-label">Lug'at boyligi</span>
      </div>
      <div class="vocab-stat-item">
        <span class="vocab-stat-num">${savedCount}</span>
        <span class="vocab-stat-label">Mening so'zlarim</span>
      </div>
      <div class="vocab-stat-item">
        <span class="vocab-stat-num">${learnedCount}</span>
        <span class="vocab-stat-label">O'zlashtirilgan</span>
      </div>
      <div class="vocab-stat-item">
        <span class="vocab-stat-num" style="${dueCount > 0 ? 'color: #d97706;' : ''}">${dueCount}</span>
        <span class="vocab-stat-label">Takrorlash kutilmoqda</span>
      </div>
      <div class="vocab-stat-action">
        ${dueCount > 0 ? `
          <button type="button" class="btn" id="btn-start-due-review" style="font-size: 0.8125rem; min-height: 40px; padding: 0 16px;">
            Takrorlashni boshlash (${dueCount})
          </button>
        ` : `
          <button type="button" class="btn ghost" id="btn-start-flashcards" style="font-size: 0.8125rem; min-height: 40px; padding: 0 16px;">
            Kartochkalar bilan mashq
          </button>
        `}
      </div>
    `;

    const dueBtn = $('btn-start-due-review');
    if (dueBtn) {
      dueBtn.onclick = () => {
        startFlashcards(true);
      };
    }

    const fcBtn = $('btn-start-flashcards');
    if (fcBtn) {
      fcBtn.onclick = () => {
        switchTab('flashcards');
      };
    }
  }

  // --- Views ---

  // 1. Browse / Library View
  function renderBrowseView() {
    const container = $('vocab-content-area');
    if (!container) return;

    const words = getFilteredWords();

    if (!words.length) {
      container.innerHTML = `
        <div class="vocab-empty-box">
          <h3>Hech qanday so'z topilmadi</h3>
          <p>Qidiruv shartlarini o'zgartirib ko'ring yoki boshqa darajani tanlang.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="vocab-grid">
        ${words.map(w => {
          const isSaved = State.myWords.has(w.id);
          const prog = State.progress[w.id];
          const isLearned = prog && prog.status === 'learned';
          const isDue = isDueForReview(w.id);

          return `
            <div class="vocab-card" data-id="${w.id}">
              <div>
                <div class="vocab-card-header">
                  <div class="vocab-card-word-wrap">
                    <div class="vocab-card-word">
                      ${w.word}
                      <button type="button" class="btn-vocab-icon btn-speak" data-word="${w.word}" title="Talaffuzni tinglash" aria-label="Talaffuz">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                      </button>
                    </div>
                    <span class="vocab-card-ipa">${w.ipa || ''}</span>
                  </div>
                  <div class="vocab-card-badges">
                    <span class="vocab-badge-level">${w.level}</span>
                    <span class="vocab-badge-pos">${w.partOfSpeech}</span>
                  </div>
                </div>

                <div class="vocab-card-uz">${w.translation}</div>
                <div class="vocab-card-def">${w.definition}</div>

                <div class="vocab-card-example">
                  <div>"${w.example}"</div>
                  <div class="vocab-card-example-uz">"${w.exampleUz}"</div>
                </div>
              </div>

              <div class="vocab-card-footer">
                <div>
                  ${isLearned ? '<span style="color: #10753f; font-weight: 600;">O\'zlashtirilgan</span>' :
                    (isDue ? '<span style="color: #d97706; font-weight: 600;">Takrorlash vaqti keldi</span>' :
                    (prog ? '<span style="color: var(--muted);">O\'rganilmoqda</span>' : '<span style="color: #9aa0a6;">Yangi so\'z</span>'))}
                </div>
                <div class="vocab-card-actions">
                  <button type="button" class="btn-vocab-icon btn-save ${isSaved ? 'saved' : ''}" data-id="${w.id}" title="${isSaved ? 'Lug\'atdan olib tashlash' : 'Lug\'atimga saqlash'}" aria-label="Saqlash">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach speak button listeners
    container.querySelectorAll('.btn-speak').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        speakWord(btn.dataset.word);
      };
    });

    // Attach save button listeners
    container.querySelectorAll('.btn-save').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleMyWord(btn.dataset.id);
      };
    });
  }

  // 2. Flashcards View
  function startFlashcards(dueOnly = false) {
    let pool = dueOnly
      ? State.words.filter(w => isDueForReview(w.id))
      : getFilteredWords();

    if (!pool.length && dueOnly) {
      if (window.YashnarModal) {
        window.YashnarModal.confirm({
          title: "Barcha so'zlar takrorlangan",
          message: "Ayni paytda takrorlash kutilayotgan so'zlar yo'q. Barcha mavjud so'zlar bilan kartochkalar mashqini boshlamoqchimisiz?",
          icon: "info",
          confirmText: "Mashqni boshlash",
          cancelText: "Ortga",
          onConfirm: () => startFlashcards(false)
        });
      }
      return;
    }

    if (!pool.length) {
      pool = State.words.slice(0, 20);
    }

    State.fcQueue = pool.slice(0, 30); // 30 cards per session
    State.fcIndex = 0;
    State.fcFlipped = false;
    State.activeTab = 'flashcards';
    updateModeTabsUI();
    renderFlashcardSession();
  }

  function renderFlashcardSession() {
    const container = $('vocab-content-area');
    if (!container) return;

    if (!State.fcQueue.length || State.fcIndex >= State.fcQueue.length) {
      // Completed session
      container.innerHTML = `
        <div class="vocab-empty-box" style="padding: 60px 24px;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #eef8f2; color: #10753f; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3>Kartochkalar mashqi yakunlandi!</h3>
          <p style="max-width: 24rem; margin-bottom: 24px;">Siz ushbu sessiyadagi barcha so'zlarni muvaffaqiyatli ko'rib chiqdingiz va oraliq takrorlash jadvalingiz yangilandi.</p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
            <button type="button" class="btn" id="btn-fc-repeat">Qaytadan mashq qilish</button>
            <button type="button" class="btn ghost" id="btn-fc-back-lib">Lug'atga qaytish</button>
          </div>
        </div>
      `;

      $('btn-fc-repeat').onclick = () => startFlashcards(false);
      $('btn-fc-back-lib').onclick = () => switchTab('browse');
      return;
    }

    const currentWord = State.fcQueue[State.fcIndex];
    const progressPct = Math.round(((State.fcIndex) / State.fcQueue.length) * 100);

    container.innerHTML = `
      <div class="flashcards-container">
        <div>
          <div class="flashcard-progress-bar">
            <span>Kartochka ${State.fcIndex + 1} / ${State.fcQueue.length}</span>
            <span>${progressPct}%</span>
          </div>
          <div class="flashcard-track">
            <div class="flashcard-track-fill" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <div class="flashcard-card-scene" id="fc-scene">
          <div class="flashcard-flipper ${State.fcFlipped ? 'flipped' : ''}" id="fc-flipper">
            <!-- Front Face -->
            <div class="flashcard-face">
              <div class="flashcard-top-meta">
                <span class="vocab-badge-level">${currentWord.level}</span>
                <span class="vocab-badge-pos">${currentWord.partOfSpeech}</span>
              </div>
              <div class="flashcard-center-word">
                <h2 class="flashcard-main-word">${currentWord.word}</h2>
                <div class="flashcard-main-ipa">${currentWord.ipa || ''}</div>
                <button type="button" class="btn ghost btn-speak" data-word="${currentWord.word}" style="border-radius: 999px; padding: 6px 18px; font-size: 0.875rem;" aria-label="Talaffuzni tinglash">
                  Talaffuzni tinglash
                </button>
              </div>
              <div class="flashcard-hint-text">
                Tarjima va ma'noni ko'rish uchun kartani bosing
              </div>
            </div>

            <!-- Back Face -->
            <div class="flashcard-face flashcard-face-back">
              <div class="flashcard-top-meta">
                <span class="vocab-badge-level">${currentWord.level}</span>
                <span class="vocab-badge-pos">${currentWord.topic}</span>
              </div>
              <div class="flashcard-back-content">
                <div class="flashcard-back-uz">${currentWord.translation}</div>
                <div class="flashcard-back-def">${currentWord.definition}</div>
                <div class="flashcard-back-example">
                  <strong>Misol:</strong> "${currentWord.example}"
                  <div style="color: #6a6d75; font-size: 0.8125rem; margin-top: 4px;">"${currentWord.exampleUz}"</div>
                </div>
                ${currentWord.collocations && currentWord.collocations.length ? `
                  <div class="flashcard-back-colloc">
                    <strong>Birikmalar:</strong> ${currentWord.collocations.join(', ')}
                  </div>
                ` : ''}
              </div>
              <div class="flashcard-hint-text">
                O'zlashtirish darajangizni tanlang:
              </div>
            </div>
          </div>
        </div>

        <!-- Rating Buttons (Visible when flipped or ready) -->
        <div class="flashcard-rating-bar">
          <button type="button" class="btn-rating again" data-rating="1">
            <span class="rating-label">Unutdim</span>
            <span class="rating-interval">1 kundan so'ng</span>
          </button>
          <button type="button" class="btn-rating hard" data-rating="2">
            <span class="rating-label">Qiyin</span>
            <span class="rating-interval">2 kundan so'ng</span>
          </button>
          <button type="button" class="btn-rating good" data-rating="3">
            <span class="rating-label">Yaxshi</span>
            <span class="rating-interval">5 kundan so'ng</span>
          </button>
          <button type="button" class="btn-rating easy" data-rating="4">
            <span class="rating-label">Oson</span>
            <span class="rating-interval">10+ kundan so'ng</span>
          </button>
        </div>
      </div>
    `;

    // Flip click
    const flipper = $('fc-flipper');
    if (flipper) {
      flipper.onclick = () => {
        State.fcFlipped = !State.fcFlipped;
        flipper.classList.toggle('flipped', State.fcFlipped);
      };
    }

    // Audio click
    container.querySelectorAll('.btn-speak').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        speakWord(b.dataset.word);
      };
    });

    // Rating clicks
    container.querySelectorAll('.btn-rating').forEach(b => {
      b.onclick = () => {
        const rating = parseInt(b.dataset.rating, 10);
        recordReview(currentWord.id, rating);
        State.fcFlipped = false;
        State.fcIndex++;
        renderFlashcardSession();
      };
    });
  }

  // 3. Quiz View
  function startQuiz() {
    const pool = getFilteredWords();
    if (pool.length < 4) {
      if (window.YashnarModal) {
        window.YashnarModal.confirm({
          title: "Yetarli so'zlar yo'q",
          message: "Test tuzish uchun kamida 4 ta so'z kerak. Barcha darajalar bo'yicha testni boshlamoqchimisiz?",
          icon: "info",
          confirmText: "Ha, boshlash",
          cancelText: "Ortga",
          onConfirm: () => {
            State.filterLevel = 'all';
            State.filterTopic = 'all';
            startQuiz();
          }
        });
      }
      return;
    }

    // Build 10 quiz questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    State.quizQueue = selected.map(target => {
      // 3 wrong distractors
      const distractors = State.words
        .filter(w => w.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [
        { text: target.translation, correct: true },
        ...distractors.map(d => ({ text: d.translation, correct: false }))
      ].sort(() => 0.5 - Math.random());

      return {
        word: target,
        options: options
      };
    });

    State.quizIndex = 0;
    State.quizScore = 0;
    State.quizUserAnswer = null;
    State.activeTab = 'quiz';
    updateModeTabsUI();
    renderQuizSession();
  }

  function renderQuizSession() {
    const container = $('vocab-content-area');
    if (!container) return;

    if (!State.quizQueue.length || State.quizIndex >= State.quizQueue.length) {
      // Quiz finished
      const total = State.quizQueue.length;
      const pct = Math.round((State.quizScore / total) * 100);

      container.innerHTML = `
        <div class="vocab-empty-box" style="padding: 60px 24px;">
          <div style="font-family: var(--font-display); font-size: 3.5rem; line-height: 1; color: var(--ink); margin-bottom: 8px;">
            ${pct}%
          </div>
          <h3>Lug'at testi yakunlandi</h3>
          <p style="margin-bottom: 24px;">Siz ${total} ta savoldan ${State.quizScore} tasiga to'g'ri javob berdingiz.</p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button type="button" class="btn" id="btn-quiz-retry">Qayta ishlash</button>
            <button type="button" class="btn ghost" id="btn-quiz-lib">Lug'atga qaytish</button>
          </div>
        </div>
      `;

      $('btn-quiz-retry').onclick = startQuiz;
      $('btn-quiz-lib').onclick = () => switchTab('browse');
      return;
    }

    const currentQ = State.quizQueue[State.quizIndex];
    const currentWord = currentQ.word;

    container.innerHTML = `
      <div class="vocab-quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 0.8125rem; color: var(--muted);">
          <span>Savol ${State.quizIndex + 1} / ${State.quizQueue.length}</span>
          <span>Ball: ${State.quizScore}</span>
        </div>

        <div class="vocab-quiz-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <span class="vocab-badge-level">${currentWord.level}</span>
            <button type="button" class="btn-vocab-icon btn-speak" data-word="${currentWord.word}" title="Talaffuzni tinglash" aria-label="Talaffuz">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
          </div>

          <div class="vocab-quiz-q">
            <strong>"${currentWord.word}"</strong> so'zining to'g'ri o'zbekcha ma'nosi qaysi?
          </div>

          <div style="font-size: 0.875rem; color: #555861; font-style: italic; margin-bottom: 20px;">
            Inglizcha ta'rifi: "${currentWord.definition}"
          </div>

          <div class="vocab-quiz-options" id="quiz-options">
            ${currentQ.options.map((opt, i) => `
              <button type="button" class="vocab-quiz-opt" data-index="${i}">
                <span>${opt.text}</span>
                <span class="opt-mark" style="font-size: 0.75rem; font-weight: 700;"></span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Speak button
    container.querySelector('.btn-speak').onclick = () => speakWord(currentWord.word);

    // Option clicks
    const optButtons = container.querySelectorAll('.vocab-quiz-opt');
    optButtons.forEach(btn => {
      btn.onclick = () => {
        if (State.quizUserAnswer !== null) return; // already answered
        const idx = parseInt(btn.dataset.index, 10);
        State.quizUserAnswer = idx;

        const isCorrect = currentQ.options[idx].correct;
        if (isCorrect) {
          btn.classList.add('correct');
          btn.querySelector('.opt-mark').textContent = 'TO\'G\'RI';
          State.quizScore++;
          recordReview(currentWord.id, 3); // record as Good in SRS
        } else {
          btn.classList.add('wrong');
          btn.querySelector('.opt-mark').textContent = 'XATO';
          recordReview(currentWord.id, 1); // record as Again in SRS
          // Highlight correct option
          optButtons.forEach((b, bi) => {
            if (currentQ.options[bi].correct) {
              b.classList.add('correct');
              b.querySelector('.opt-mark').textContent = 'TO\'G\'RI JAVOB';
            }
          });
        }

        setTimeout(() => {
          State.quizUserAnswer = null;
          State.quizIndex++;
          renderQuizSession();
        }, 1200);
      };
    });
  }

  // --- Tab Switching & UI Updates ---
  function updateModeTabsUI() {
    const tabs = document.querySelectorAll('.vocab-mode-btn');
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.mode === State.activeTab);
    });

    const toolbar = $('vocab-toolbar');
    if (toolbar) {
      // Hide filters during active flashcard or quiz session
      toolbar.style.display = (State.activeTab === 'flashcards' || State.activeTab === 'quiz') ? 'none' : 'flex';
    }
  }

  function renderCurrentView() {
    updateModeTabsUI();
    if (State.activeTab === 'browse' || State.activeTab === 'mywords') {
      renderBrowseView();
    } else if (State.activeTab === 'flashcards') {
      renderFlashcardSession();
    } else if (State.activeTab === 'quiz') {
      renderQuizSession();
    }
  }

  function switchTab(mode) {
    State.activeTab = mode;
    if (mode === 'flashcards') {
      startFlashcards(false);
    } else if (mode === 'quiz') {
      startQuiz();
    } else {
      renderCurrentView();
    }
  }

  // --- Attach Event Listeners ---
  function initEvents() {
    // Mode tabs
    document.querySelectorAll('.vocab-mode-btn').forEach(b => {
      b.onclick = () => switchTab(b.dataset.mode);
    });

    // Level filters
    document.querySelectorAll('.vocab-level-btn').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.vocab-level-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        State.filterLevel = b.dataset.level;
        renderCurrentView();
      };
    });

    // Topic filter
    const topicSelect = $('vocab-topic-select');
    if (topicSelect) {
      topicSelect.onchange = (e) => {
        State.filterTopic = e.target.value;
        renderCurrentView();
      };
    }

    // Search input
    const searchInput = $('vocab-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        State.searchQuery = e.target.value;
        renderCurrentView();
      };
    }
  }

  // --- Public API for Transcripts & Global Integration ---
  window.saveWordToVocabulary = function (wordText) {
    if (!wordText) return false;
    const clean = wordText.trim().toLowerCase();
    const found = State.words.find(w => w.word.toLowerCase() === clean);
    if (found) {
      State.myWords.add(found.id);
      saveMyWords();
      updateStatsBanner();
      if (window.YashnarModal) {
        window.YashnarModal.confirm({
          title: "So'z saqlandi",
          message: `"${found.word}" (${found.translation}) so'zi "Mening so'zlarim" ro'yxatiga muvaffaqiyatli qo'shildi.`,
          icon: "info",
          confirmText: "Lug'atga o'tish",
          cancelText: "Yopish",
          onConfirm: () => {
            const vocabTab = document.querySelector('[data-tab="vocabulary"]');
            if (vocabTab) vocabTab.click();
          }
        });
      }
      return true;
    }
    return false;
  };

  // --- Initialization ---
  function init() {
    State.words = window.YASHNAR_VOCABULARY || [];
    loadStoredData();
    initEvents();
    updateStatsBanner();
    renderCurrentView();
  }

  window.openVocabularySection = function () {
    init();
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (window.YASHNAR_VOCABULARY) {
      init();
    }
  });
})();
