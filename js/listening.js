/**
 * YASHNAR ENGLISH - LISTENING PRACTICE SECTION
 * Fully featured audio player, 12 complete exercises with 8 questions each,
 * real audio playback with TTS fallback, answer evaluation, and localStorage history.
 */

(function () {
  'use strict';

  const STORAGE_KEY_LISTENING_HIST = 'yashnar_listening_history';

  // --- State ---
  const State = {
    activePart: 0, // 0 = all parts, 1..6
    activeLevel: 'all', // 'all', 'A2', 'B1', 'B2', 'C1'
    currentExercise: null,
    currentQuestionIdx: 0,
    userAnswers: [], // 8 items: number or string
    history: [],
    audioPlayer: null,
    audioDuration: 0,
    isPlaying: false
  };

  // --- Helpers ---
  function $(id) {
    return document.getElementById(id);
  }

  function getListeningHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LISTENING_HIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveListeningHistoryItem(item) {
    const list = getListeningHistory();
    list.unshift(item);
    if (list.length > 100) list.pop();
    try {
      localStorage.setItem(STORAGE_KEY_LISTENING_HIST, JSON.stringify(list));
    } catch (e) {}
    State.history = list;
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function normalizeAnswer(str) {
    if (!str) return '';
    return str.toString().trim().toLowerCase().replace(/[.,!?;:'"]/g, '').replace(/\s+/g, ' ');
  }

  // --- Statistics ---
  function computeListeningStats() {
    const hist = State.history;
    const totalExercises = (window.LISTENING_EXERCISES || []).length;
    if (!hist.length) {
      return { totalAvailable: totalExercises, completed: 0, bestPct: 0, avgPct: 0 };
    }

    let sumPct = 0;
    let best = 0;
    const uniqueDone = new Set();

    hist.forEach(h => {
      uniqueDone.add(h.exerciseId);
      const p = Math.round((h.score / h.total) * 100);
      sumPct += p;
      if (p > best) best = p;
    });

    return {
      totalAvailable: totalExercises,
      completed: uniqueDone.size,
      bestPct: best,
      avgPct: Math.round(sumPct / hist.length)
    };
  }

  // --- Audio Player Controller ---
  function setupAudioPlayer(audioSrc, transcriptText) {
    // Teardown previous instance
    if (State.audioPlayer) {
      State.audioPlayer.pause();
      State.audioPlayer.src = '';
      State.audioPlayer = null;
    }

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = audioSrc;
    State.audioPlayer = audio;
    State.isPlaying = false;
    State.audioDuration = 0;

    const playBtn = $('btn-audio-play');
    const scrubberFill = $('player-scrubber-fill');
    const timeCur = $('player-time-current');
    const timeDur = $('player-time-duration');
    const speedSelect = $('select-playback-speed');
    const volumeSlider = $('audio-volume-slider');

    if (playBtn) playBtn.innerHTML = '▶';
    if (scrubberFill) scrubberFill.style.width = '0%';
    if (timeCur) timeCur.textContent = '0:00';
    if (timeDur) timeDur.textContent = '0:00';

    // Events
    audio.addEventListener('loadedmetadata', () => {
      State.audioDuration = audio.duration;
      if (timeDur) timeDur.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      const cur = audio.currentTime;
      const dur = audio.duration || State.audioDuration || 1;
      if (timeCur) timeCur.textContent = formatTime(cur);
      if (timeDur && !isNaN(audio.duration)) timeDur.textContent = formatTime(audio.duration);
      if (scrubberFill) {
        const pct = Math.min(100, Math.max(0, (cur / dur) * 100));
        scrubberFill.style.width = pct + '%';
      }
    });

    audio.addEventListener('ended', () => {
      State.isPlaying = false;
      if (playBtn) playBtn.innerHTML = '▶';
      if (scrubberFill) scrubberFill.style.width = '100%';
    });

    audio.addEventListener('error', () => {
      console.warn("Audio file failed to load, falling back to speech synthesis if available.");
      // Speech synthesis fallback mechanism
      audio.isFallback = true;
    });

    // Scrubber click seek
    const scrubberBar = $('player-scrubber-bar');
    if (scrubberBar) {
      scrubberBar.onclick = (e) => {
        const rect = scrubberBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        const dur = audio.duration || State.audioDuration || 35;
        audio.currentTime = ratio * dur;
      };
    }

    // Play/Pause button
    if (playBtn) {
      playBtn.onclick = () => {
        if (audio.paused) {
          audio.play().then(() => {
            State.isPlaying = true;
            playBtn.innerHTML = '⏸';
          }).catch(err => {
            // SpeechSynthesis fallback
            playWithSpeechSynthesis(transcriptText, playBtn);
          });
        } else {
          audio.pause();
          State.isPlaying = false;
          playBtn.innerHTML = '▶';
        }
      };
    }

    // Speed
    if (speedSelect) {
      speedSelect.onchange = () => {
        audio.playbackRate = parseFloat(speedSelect.value);
      };
    }

    // Volume
    if (volumeSlider) {
      volumeSlider.oninput = () => {
        audio.volume = parseFloat(volumeSlider.value);
      };
    }

    // Replay
    const replayBtn = $('btn-audio-replay');
    if (replayBtn) {
      replayBtn.onclick = () => {
        audio.currentTime = 0;
        audio.play().then(() => {
          State.isPlaying = true;
          if (playBtn) playBtn.innerHTML = '⏸';
        }).catch(() => {});
      };
    }
  }

  // --- Voice Preview Feature ---
  let activePreviewAudio = null;
  let activePreviewBtn = null;

  function stopVoicePreview() {
    if (activePreviewAudio) {
      activePreviewAudio.pause();
      activePreviewAudio.currentTime = 0;
      activePreviewAudio = null;
    }
    if (activePreviewBtn) {
      activePreviewBtn.classList.remove('playing');
      const icon = activePreviewBtn.querySelector('.preview-icon');
      if (icon) icon.textContent = '▶';
      activePreviewBtn = null;
    }
  }

  function initVoicePreviews() {
    const btns = document.querySelectorAll('.btn-voice-preview');
    btns.forEach(btn => {
      btn.onclick = () => {
        const voiceId = btn.dataset.voice;
        const soundFile = `audio/preview-${voiceId}.mp3`;

        // If currently playing this preview, toggle pause
        if (activePreviewBtn === btn && activePreviewAudio && !activePreviewAudio.paused) {
          stopVoicePreview();
          return;
        }

        // Stop any previous preview
        stopVoicePreview();

        // Also pause main exercise player if playing
        if (State.audioPlayer) State.audioPlayer.pause();

        const a = new Audio(soundFile);
        activePreviewAudio = a;
        activePreviewBtn = btn;
        btn.classList.add('playing');
        const icon = btn.querySelector('.preview-icon');
        if (icon) icon.textContent = '⏹';

        a.onended = () => stopVoicePreview();
        a.onerror = () => stopVoicePreview();
        a.play().catch(e => {
          console.warn("Could not play preview audio file:", e);
          stopVoicePreview();
        });
      };
    });
  }

  function pickBestNeuralVoice() {
    let voices = [];
    try {
      voices = window.speechSynthesis.getVoices() || [];
    } catch (e) {}

    const enVoices = voices.filter(v => /^en/i.test(v.lang || v.locale));
    if (!enVoices.length) return null;

    // Prefer online/natural neural female voices
    const neuralPref = /(natural|online|neural)/i;
    const femalePref = /(jenny|aria|samantha|karen|serena|zoe|victoria|female|google us english|zira)/i;

    const neuralFemale = enVoices.find(v => neuralPref.test(v.name) && femalePref.test(v.name));
    if (neuralFemale) return neuralFemale;

    const anyNeural = enVoices.find(v => neuralPref.test(v.name));
    if (anyNeural) return anyNeural;

    const naturalFemale = enVoices.find(v => femalePref.test(v.name));
    if (naturalFemale) return naturalFemale;

    return enVoices[0];
  }

  function playWithSpeechSynthesis(text, playBtn) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.94;
    u.pitch = 1.0;

    const v = pickBestNeuralVoice();
    if (v) {
      u.voice = v;
      u.lang = v.lang;
    }

    u.onstart = () => {
      State.isPlaying = true;
      if (playBtn) playBtn.innerHTML = '⏸';
    };
    u.onend = () => {
      State.isPlaying = false;
      if (playBtn) playBtn.innerHTML = '▶';
    };
    u.onerror = () => {
      State.isPlaying = false;
      if (playBtn) playBtn.innerHTML = '▶';
    };
    window.speechSynthesis.speak(u);
  }

  // --- Render Catalog View ---
  function renderListeningCatalog() {
    const catalog = $('listening-view-catalog');
    const runner = $('listening-view-runner');
    const results = $('listening-view-results');

    if (catalog) catalog.hidden = false;
    if (runner) runner.hidden = true;
    if (results) results.hidden = true;

    stopVoicePreview();

    // Pause audio if running
    if (State.audioPlayer) {
      State.audioPlayer.pause();
    }

    renderListeningStats();
    renderExerciseCards();
    initVoicePreviews();
  }

  function renderListeningStats() {
    const banner = $('listening-stats-banner');
    if (!banner) return;
    const stats = computeListeningStats();

    banner.innerHTML = `
      <div class="stat-item">
        <span class="stat-num">${stats.totalAvailable}</span>
        <span class="stat-label">Mavjud mashqlar</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">${stats.completed}</span>
        <span class="stat-label">Bajarilgan mashqlar</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">${stats.bestPct > 0 ? stats.bestPct + '%' : '—'}</span>
        <span class="stat-label">Eng yaxshi natija</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">${stats.avgPct > 0 ? stats.avgPct + '%' : '—'}</span>
        <span class="stat-label">O'rtacha ko'rsatkich</span>
      </div>
    `;
  }

  function getExerciseBestScore(exId) {
    const matches = State.history.filter(h => h.exerciseId === exId);
    if (!matches.length) return null;
    let bestScore = 0;
    let total = 8;
    let bestPct = 0;
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

  function renderExerciseCards() {
    const grid = $('listening-grid');
    if (!grid) return;

    const allExercises = window.LISTENING_EXERCISES || [];
    const partFilter = State.activePart;
    const levelFilter = State.activeLevel;

    const filtered = allExercises.filter(ex => {
      const partMatch = partFilter === 0 || ex.part === partFilter;
      const levelMatch = levelFilter === 'all' || ex.level === levelFilter;
      return partMatch && levelMatch;
    });

    if (!filtered.length) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px 16px; color: var(--muted);">
          <p style="font-size: 1.125rem; margin-bottom: 8px;">Ushbu filtr bo'yicha mashqlar topilmadi.</p>
          <button type="button" class="btn ghost" id="btn-reset-lis-filters" style="margin-top: 8px;">Filtrlarni tozalash</button>
        </div>
      `;
      const resetBtn = $('btn-reset-lis-filters');
      if (resetBtn) {
        resetBtn.onclick = () => {
          State.activePart = 0;
          State.activeLevel = 'all';
          updateFilterPillStates();
          renderExerciseCards();
        };
      }
      return;
    }

    grid.innerHTML = '';
    filtered.forEach(ex => {
      const best = getExerciseBestScore(ex.id);
      const card = document.createElement('div');
      card.className = 'lis-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      card.innerHTML = `
        <div>
          <div class="lis-card-top">
            <span class="lis-part-tag">Part ${ex.part} · ${ex.partName}</span>
            <span class="badge-level">${ex.level}</span>
          </div>
          <h3 class="lis-card-title">${ex.title}</h3>
          <div class="lis-card-uz">${ex.uzTitle}</div>
          <div class="lis-card-meta">
            <span>🎧 ~${ex.durationSec} soniya</span>
            <span>·</span>
            <span>📝 ${ex.questions.length} ta savol</span>
          </div>
        </div>
        <div class="lis-card-footer">
          ${best ? `<span class="lis-score-pill">Natija: ${best.percent}% (${best.score}/${best.total})</span>` : '<span>Bajarilmagan</span>'}
          <span class="card-btn">Tinglash va ishlash →</span>
        </div>
      `;

      card.onclick = () => startListeningExercise(ex);
      card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startListeningExercise(ex);
        }
      };

      grid.appendChild(card);
    });
  }

  function updateFilterPillStates() {
    document.querySelectorAll('.part-pill').forEach(pill => {
      pill.classList.toggle('active', parseInt(pill.dataset.part, 10) === State.activePart);
    });
    document.querySelectorAll('.lis-level-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.level === State.activeLevel);
    });
  }

  // --- Start Exercise ---
  function startListeningExercise(exercise) {
    stopVoicePreview();
    State.currentExercise = exercise;
    State.currentQuestionIdx = 0;
    State.userAnswers = new Array(exercise.questions.length).fill(null);

    $('listening-view-catalog').hidden = true;
    $('listening-view-runner').hidden = false;
    $('listening-view-results').hidden = true;
    window.scrollTo(0, 0);

    // Setup player
    setupAudioPlayer(exercise.audioFile, exercise.transcript);

    // Topic info
    $('lis-runner-title').textContent = exercise.title;
    $('lis-runner-meta').innerHTML = `
      <span class="badge-level">${exercise.level}</span>
      <span>·</span>
      <span class="lis-part-tag">Part ${exercise.part}</span>
      <span>·</span>
      <span>8 ta savol</span>
    `;

    renderQuestionStage();
  }

  // --- Render Questions Stage ---
  function renderQuestionStage() {
    const ex = State.currentExercise;
    if (!ex) return;

    const curIdx = State.currentQuestionIdx;
    const total = ex.questions.length;
    const q = ex.questions[curIdx];

    // Palette
    const palette = $('lis-runner-palette');
    if (palette) {
      palette.innerHTML = '';
      ex.questions.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'palette-btn';
        if (i === curIdx) btn.classList.add('current');
        if (State.userAnswers[i] !== null && State.userAnswers[i] !== '') {
          btn.classList.add('answered');
        }
        btn.textContent = i + 1;
        btn.title = `Savol ${i + 1}`;
        btn.onclick = () => {
          saveCurrentInputAnswer();
          State.currentQuestionIdx = i;
          renderQuestionStage();
        };
        palette.appendChild(btn);
      });
    }

    // Question header
    $('lis-q-badge').textContent = formatQuestionTypeName(q.type);
    $('lis-q-counter').textContent = `Savol ${curIdx + 1} / ${total}`;
    $('lis-q-text').textContent = q.question;

    // Render Answers widget based on question type
    const ansContainer = $('lis-q-options');
    ansContainer.innerHTML = '';

    if (q.type === 'multiple_choice') {
      const keys = ['A', 'B', 'C', 'D'];
      const list = document.createElement('div');
      list.className = 'options-list';
      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-item';
        if (State.userAnswers[curIdx] === optIdx) {
          btn.classList.add('selected');
        }
        btn.innerHTML = `
          <span class="option-key">${keys[optIdx]}</span>
          <span class="option-text">${optText}</span>
        `;
        btn.onclick = () => {
          State.userAnswers[curIdx] = optIdx;
          renderQuestionStage();
        };
        list.appendChild(btn);
      });
      ansContainer.appendChild(list);
    } else if (q.type === 'true_false') {
      const row = document.createElement('div');
      row.className = 'tf-options-row';

      const trueBtn = document.createElement('button');
      trueBtn.type = 'button';
      trueBtn.className = `tf-btn ${State.userAnswers[curIdx] === 0 ? 'selected' : ''}`;
      trueBtn.innerHTML = '<span>✓</span> <span>True (To\'g\'ri)</span>';
      trueBtn.onclick = () => {
        State.userAnswers[curIdx] = 0;
        renderQuestionStage();
      };

      const falseBtn = document.createElement('button');
      falseBtn.type = 'button';
      falseBtn.className = `tf-btn ${State.userAnswers[curIdx] === 1 ? 'selected' : ''}`;
      falseBtn.innerHTML = '<span>✕</span> <span>False (Noto\'g\'ri)</span>';
      falseBtn.onclick = () => {
        State.userAnswers[curIdx] = 1;
        renderQuestionStage();
      };

      row.appendChild(trueBtn);
      row.appendChild(falseBtn);
      ansContainer.appendChild(row);
    } else if (q.type === 'fill_in_the_blank' || q.type === 'short_answer') {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '8px';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'lis-text-ans-input';
      input.className = 'lis-text-input';
      input.placeholder = q.type === 'fill_in_the_blank' ? 'Bo\'sh joyga mos so\'zni kiriting...' : 'Qisqa javobingizni yozing...';
      input.value = State.userAnswers[curIdx] || '';
      input.autocomplete = 'off';
      input.spellcheck = false;

      input.oninput = () => {
        State.userAnswers[curIdx] = input.value;
        // Update palette button visual state
        const palBtns = document.querySelectorAll('#lis-runner-palette .palette-btn');
        if (palBtns[curIdx]) {
          palBtns[curIdx].classList.toggle('answered', input.value.trim().length > 0);
        }
      };

      wrapper.appendChild(input);
      ansContainer.appendChild(wrapper);
      setTimeout(() => input.focus(), 50);
    }

    // Prev / Next button state
    const prevBtn = $('btn-lis-prev');
    const nextBtn = $('btn-lis-next');
    const finishBtn = $('btn-lis-finish');

    if (prevBtn) {
      prevBtn.disabled = curIdx === 0;
      prevBtn.style.opacity = curIdx === 0 ? '0.35' : '1';
    }

    if (curIdx === total - 1) {
      if (nextBtn) nextBtn.hidden = true;
      if (finishBtn) finishBtn.hidden = false;
    } else {
      if (nextBtn) nextBtn.hidden = false;
      if (finishBtn) finishBtn.hidden = false;
    }
  }

  function saveCurrentInputAnswer() {
    const input = $('lis-text-ans-input');
    if (input) {
      State.userAnswers[State.currentQuestionIdx] = input.value;
    }
  }

  function formatQuestionTypeName(type) {
    const map = {
      multiple_choice: 'Multiple Choice',
      true_false: 'True / False',
      fill_in_the_blank: 'Fill in the blank',
      short_answer: 'Short Answer'
    };
    return map[type] || 'Savol';
  }

  // --- Finish Exercise & Evaluate ---
  function requestFinishListening() {
    saveCurrentInputAnswer();
    const ex = State.currentExercise;
    if (!ex) return;

    let unanswered = 0;
    State.userAnswers.forEach(ans => {
      if (ans === null || (typeof ans === 'string' && ans.trim() === '')) {
        unanswered++;
      }
    });

    if (unanswered > 0) {
      if (confirm(`Sizda ${unanswered} ta javob berilmagan savol qoldi. Mashqni yakunlamoqchimisiz?`)) {
        finalizeListeningExercise();
      }
    } else {
      finalizeListeningExercise();
    }
  }

  function finalizeListeningExercise() {
    const ex = State.currentExercise;
    if (!ex) return;

    // Pause audio
    if (State.audioPlayer) {
      State.audioPlayer.pause();
    }

    let correctCount = 0;
    ex.questions.forEach((q, i) => {
      const uAns = State.userAnswers[i];
      if (q.type === 'multiple_choice' || q.type === 'true_false') {
        if (uAns === q.answer) correctCount++;
      } else if (q.type === 'fill_in_the_blank' || q.type === 'short_answer') {
        const cleanUser = normalizeAnswer(uAns);
        const accepted = (q.acceptedAnswers || []).map(normalizeAnswer);
        if (accepted.includes(cleanUser)) correctCount++;
      }
    });

    const total = ex.questions.length;
    const percent = Math.round((correctCount / total) * 100);

    const historyItem = {
      id: 'lh_' + Date.now(),
      date: new Date().toISOString(),
      exerciseId: ex.id,
      title: ex.title,
      part: ex.part,
      level: ex.level,
      score: correctCount,
      total: total,
      percent: percent
    };

    saveListeningHistoryItem(historyItem);
    renderListeningResults(correctCount, total, percent);
  }

  // --- Render Results & Review ---
  function renderListeningResults(correct, total, percent) {
    $('listening-view-catalog').hidden = true;
    $('listening-view-runner').hidden = true;
    $('listening-view-results').hidden = false;
    window.scrollTo(0, 0);

    const ex = State.currentExercise;
    const incorrect = total - correct;

    $('lis-res-percent').textContent = percent;
    $('lis-res-correct').textContent = correct;
    $('lis-res-wrong').textContent = incorrect;
    $('lis-res-level').textContent = ex.level;
    $('lis-res-part').textContent = `Part ${ex.part}`;

    let headline = "Mashq yakunlandi!";
    let message = "Audioni eshitib tushunish bo'yicha natijangiz qayd etildi. Quyida savollarning to'liq tahlili bilan tanishing.";
    if (percent === 100) {
      headline = "Mukammal natija! 🎯";
      message = "8 ta savoldan 8 tasiga to'g'ri javob berdingiz. Eshitib tushunish mahoratingiz yuqori darajada!";
    } else if (percent >= 75) {
      headline = "Ajoyib natija! 👏";
      message = "Audiodagi asosiy fikrlar va tafsilotlarni juda yaxshi tushundingiz.";
    } else if (percent >= 50) {
      headline = "Yaxshi natija! 👍";
      message = "Asosiy mazmunni tushundingiz. Ba'zi tafsilotlarni transkript orqali qayta tekshirib oling.";
    } else {
      headline = "Davom eting! 🎧";
      message = "Har bir audio bilan tajribangiz ortib boradi. Transkriptni o'qib, audioni yana bir bor tinglab ko'ring.";
    }

    $('lis-res-headline').textContent = headline;
    $('lis-res-message').textContent = message;

    // Transcript Box Setup
    const transcriptTextEl = $('lis-res-transcript-text');
    const transcriptBox = $('lis-transcript-box');
    const toggleTranscriptBtn = $('btn-toggle-transcript');

    if (transcriptTextEl) transcriptTextEl.textContent = ex.transcript;
    if (transcriptBox) transcriptBox.hidden = true;
    if (toggleTranscriptBtn) {
      toggleTranscriptBtn.textContent = "Audio matnini ko'rsatish (Show Transcript)";
      toggleTranscriptBtn.onclick = () => {
        const isHidden = transcriptBox.hidden;
        transcriptBox.hidden = !isHidden;
        toggleTranscriptBtn.textContent = isHidden
          ? "Audio matnini yashirish (Hide Transcript)"
          : "Audio matnini ko'rsatish (Show Transcript)";
      };
    }

    // Audio replay in transcript box
    const replayAudioBtn = $('btn-transcript-play-audio');
    if (replayAudioBtn) {
      replayAudioBtn.onclick = () => {
        if (State.audioPlayer) {
          State.audioPlayer.currentTime = 0;
          State.audioPlayer.play();
        }
      };
    }

    // Review list
    const reviewList = $('lis-res-review-list');
    reviewList.innerHTML = '';
    const keys = ['A', 'B', 'C', 'D'];

    ex.questions.forEach((q, i) => {
      const uAns = State.userAnswers[i];
      let isCorrect = false;
      let userDisplay = '';
      let correctDisplay = '';

      if (q.type === 'multiple_choice') {
        isCorrect = uAns === q.answer;
        userDisplay = uAns === null ? 'Javob berilmadi' : `${keys[uAns]}. ${q.options[uAns]}`;
        correctDisplay = `${keys[q.answer]}. ${q.options[q.answer]}`;
      } else if (q.type === 'true_false') {
        isCorrect = uAns === q.answer;
        userDisplay = uAns === null ? 'Javob berilmadi' : (uAns === 0 ? 'True' : 'False');
        correctDisplay = q.answer === 0 ? 'True' : 'False';
      } else {
        const cleanUser = normalizeAnswer(uAns);
        const accepted = (q.acceptedAnswers || []).map(normalizeAnswer);
        isCorrect = accepted.includes(cleanUser);
        userDisplay = (!uAns || uAns.trim() === '') ? 'Javob berilmadi' : uAns;
        correctDisplay = (q.acceptedAnswers || []).join(' / ');
      }

      const item = document.createElement('div');
      item.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;

      item.innerHTML = `
        <div class="review-status-row">
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--muted);">${i + 1}-savol · ${formatQuestionTypeName(q.type)}</span>
          <span class="status-tag ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '✓ To\'g\'ri' : '✕ Noto\'g\'ri'}</span>
        </div>
        <div class="review-question-text">${q.question}</div>
        <div class="review-answers-box">
          <div class="ans-row your-ans ${isCorrect ? 'correct-choice' : 'wrong-choice'}">
            <span class="ans-label">Sizning javobingiz:</span>
            <span class="ans-val">${userDisplay}</span>
          </div>
          ${!isCorrect ? `
            <div class="ans-row correct-ans">
              <span class="ans-label">To'g'ri javob:</span>
              <span class="ans-val">${correctDisplay}</span>
            </div>
          ` : ''}
        </div>
        <div class="review-explanation">
          <strong>Izoh:</strong> ${q.explanation}
        </div>
      `;

      reviewList.appendChild(item);
    });
  }

  // --- Attach Event Listeners ---
  function initListeningEvents() {
    // Part Filter Pills
    document.querySelectorAll('.part-pill').forEach(pill => {
      pill.onclick = function () {
        State.activePart = parseInt(this.dataset.part, 10);
        updateFilterPillStates();
        renderExerciseCards();
      };
    });

    // Level Filter Pills
    document.querySelectorAll('.lis-level-pill').forEach(pill => {
      pill.onclick = function () {
        State.activeLevel = this.dataset.level;
        updateFilterPillStates();
        renderExerciseCards();
      };
    });

    // Runner Prev / Next / Finish / Exit
    const prevBtn = $('btn-lis-prev');
    const nextBtn = $('btn-lis-next');
    const finishBtn = $('btn-lis-finish');
    const exitBtn = $('btn-lis-exit');

    if (prevBtn) {
      prevBtn.onclick = () => {
        saveCurrentInputAnswer();
        if (State.currentQuestionIdx > 0) {
          State.currentQuestionIdx--;
          renderQuestionStage();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        saveCurrentInputAnswer();
        if (State.currentExercise && State.currentQuestionIdx < State.currentExercise.questions.length - 1) {
          State.currentQuestionIdx++;
          renderQuestionStage();
        }
      };
    }

    if (finishBtn) {
      finishBtn.onclick = requestFinishListening;
    }

    if (exitBtn) {
      exitBtn.onclick = () => {
        if (confirm("Mashq jarayonidan chiqmoqchimisiz? Natijangiz saqlanmaydi.")) {
          if (State.audioPlayer) State.audioPlayer.pause();
          renderListeningCatalog();
        }
      };
    }

    // Results Actions
    const tryAgainBtn = $('btn-lis-try-again');
    const nextExBtn = $('btn-lis-next-exercise');
    const backBtn = $('btn-lis-back-catalog');

    if (tryAgainBtn) {
      tryAgainBtn.onclick = () => {
        if (State.currentExercise) {
          startListeningExercise(State.currentExercise);
        }
      };
    }

    if (nextExBtn) {
      nextExBtn.onclick = () => {
        const all = window.LISTENING_EXERCISES || [];
        const curIdx = all.findIndex(e => e.id === State.currentExercise.id);
        const next = all[(curIdx + 1) % all.length];
        startListeningExercise(next);
      };
    }

    if (backBtn) {
      backBtn.onclick = () => {
        renderListeningCatalog();
      };
    }
  }

  // Global trigger to switch to listening
  window.openListeningSection = function () {
    renderListeningCatalog();
  };

  // DOM ready
  function init() {
    State.history = getListeningHistory();
    initListeningEvents();
    initVoicePreviews();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
