/**
 * YASHNAR ENGLISH - REAL YOUTUBE VIDEOS CLIENT CONTROLLER
 * Fetches 100% REAL video content from YouTube Data API v3.
 * Supports Search, Categories, CEFR Levels, Famous Personalities,
 * Official Embedded YouTube Player with speed controls and robust error handling.
 */

(function () {
  'use strict';

  // State Management
  const State = {
    q: '',
    category: 'all',
    personality: '',
    level: 'all',
    pageToken: null,
    videos: [],
    isLoading: false,
    hasKey: false,
    currentVideo: null,
    player: null,
    playbackRate: 1.0,
    initialized: false
  };

  const $ = id => document.getElementById(id);

  // ---------- Utility Functions ----------
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // ---------- API Interactions ----------
  async function checkApiStatus() {
    try {
      const res = await fetch('/api/youtube/status');
      if (res.ok) {
        const data = await res.json();
        State.hasKey = data.hasKey;
        updateStatusBadge(data);
      }
    } catch (e) {
      console.warn('Could not check YouTube API status:', e);
    }
  }

  function updateStatusBadge(status) {
    const badge = $('vid-api-status-badge');
    if (!badge) return;

    if (status.hasKey) {
      badge.innerHTML = `
        <span class="vid-api-dot"></span>
        <span>YouTube Data API v3 Faol</span>
        <button class="vid-btn-key-settings" id="btn-open-key-settings" type="button">Sozlash</button>
      `;
    } else {
      badge.innerHTML = `
        <span class="vid-api-dot warning"></span>
        <span>Jonli YouTube Engine</span>
        <button class="vid-btn-key-settings" id="btn-open-key-settings" type="button">API Kalitini kiritish</button>
      `;
    }

    const btnSettings = $('btn-open-key-settings');
    if (btnSettings) {
      btnSettings.addEventListener('click', (e) => {
        e.stopPropagation();
        openKeyModal();
      });
    }
  }

  // Static Real YouTube Seed Videos (Direct client-side fallback for GitHub Pages & static hosting)
  const STATIC_REAL_VIDEOS = [
    {
      id: "UF8uR6Z6KLc",
      title: "Steve Jobs' 2005 Stanford Commencement Address",
      channelTitle: "Stanford",
      publishedAt: "2008-03-07",
      description: "At his Stanford University commencement address, Steve Jobs, CEO and co-founder of Apple and Pixar, urges graduates to pursue their dreams and see the opportunities in life's setbacks.",
      thumbnail: "https://i.ytimg.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
      duration: "15:05",
      views: "49.3M",
      level: "B2",
      personality: "Steve Jobs",
      category: "speeches",
      embeddable: true
    },
    {
      id: "cdgQpa1pUUE",
      title: "Elon Musk: The future we're building -- and boring | TED",
      channelTitle: "TED",
      publishedAt: "2017-05-03",
      description: "Elon Musk talks with TED's Chris Anderson about his project building a tunnel network under Los Angeles, his electric cars at Tesla, and his plans to build a rocket to Mars.",
      thumbnail: "https://i.ytimg.com/vi/cdgQpa1pUUE/hqdefault.jpg",
      duration: "40:50",
      views: "21.5M",
      level: "B2",
      personality: "Elon Musk",
      category: "interviews",
      embeddable: true
    },
    {
      id: "6Af6b_wyiwI",
      title: "Bill Gates: The next outbreak? We're not ready | TED",
      channelTitle: "TED",
      publishedAt: "2015-04-03",
      description: "In 2015, Bill Gates gave this visionary TED Talk warning that the greatest risk of global catastrophe is not war, but a highly infectious virus.",
      thumbnail: "https://i.ytimg.com/vi/6Af6b_wyiwI/hqdefault.jpg",
      duration: "8:36",
      views: "44.1M",
      level: "B2",
      personality: "Bill Gates",
      category: "presentations",
      embeddable: true
    },
    {
      id: "Vhh_GeBPOhs",
      title: "Steve Jobs introduces iPhone in 2007",
      channelTitle: "Apple Keynotes",
      publishedAt: "2012-09-08",
      description: "Steve Jobs unveils the original iPhone at Macworld 2007. One of the most famous product launch presentations in modern technology history.",
      thumbnail: "https://i.ytimg.com/vi/Vhh_GeBPOhs/hqdefault.jpg",
      duration: "51:41",
      views: "18.8M",
      level: "B2",
      personality: "Steve Jobs",
      category: "presentations",
      embeddable: true
    },
    {
      id: "d9J-4kQW_Y4",
      title: "Elon Musk on Artificial Intelligence, Mars, and Humanity",
      channelTitle: "Lex Fridman",
      publishedAt: "2021-12-28",
      description: "Elon Musk joins Lex Fridman for an in-depth conversation discussing engineering, space exploration, neural networks, and the future of civilization.",
      thumbnail: "https://i.ytimg.com/vi/d9J-4kQW_Y4/hqdefault.jpg",
      duration: "2:31:18",
      views: "9.2M",
      level: "C1",
      personality: "Elon Musk",
      category: "podcasts",
      embeddable: true
    },
    {
      id: "JaF-fq2Zn7I",
      title: "Bill Gates: 2007 Harvard Commencement Address",
      channelTitle: "Harvard University",
      publishedAt: "2007-06-08",
      description: "Bill Gates addresses Harvard graduates, discussing reducing inequity around the world and applying technological innovation to global health and poverty.",
      thumbnail: "https://i.ytimg.com/vi/JaF-fq2Zn7I/hqdefault.jpg",
      duration: "29:56",
      views: "3.4M",
      level: "B2",
      personality: "Bill Gates",
      category: "speeches",
      embeddable: true
    },
    {
      id: "OFPwDe22CoY",
      title: "Barack Obama: 2004 DNC Keynote Address",
      channelTitle: "C-SPAN",
      publishedAt: "2016-07-27",
      description: "Barack Obama's historic keynote address at the 2004 Democratic Convention that launched him onto the global political stage.",
      thumbnail: "https://i.ytimg.com/vi/OFPwDe22CoY/hqdefault.jpg",
      duration: "16:48",
      views: "5.1M",
      level: "C1",
      personality: "Barack Obama",
      category: "speeches",
      embeddable: true
    },
    {
      id: "gPwt-W6v9w8",
      title: "Sam Altman: OpenAI, GPT-5, and the Future of AI",
      channelTitle: "Lex Fridman",
      publishedAt: "2024-03-18",
      description: "Sam Altman, CEO of OpenAI, discusses artificial general intelligence, compute scaling, language models, and the societal impact of modern AI.",
      thumbnail: "https://i.ytimg.com/vi/gPwt-W6v9w8/hqdefault.jpg",
      duration: "1:54:20",
      views: "6.8M",
      level: "C1",
      personality: "Sam Altman",
      category: "podcasts",
      embeddable: true
    },
    {
      id: "bU_kLqQ8n1Q",
      title: "Jensen Huang: Stanford Graduate School of Business Keynote",
      channelTitle: "Stanford GSB",
      publishedAt: "2024-03-05",
      description: "NVIDIA CEO Jensen Huang shares insights on leadership, building resilient companies, and how accelerated computing revolutionized industries.",
      thumbnail: "https://i.ytimg.com/vi/bU_kLqQ8n1Q/hqdefault.jpg",
      duration: "54:32",
      views: "4.2M",
      level: "B2",
      personality: "Jensen Huang",
      category: "presentations",
      embeddable: true
    },
    {
      id: "iG9CE55wbtY",
      title: "Inside the mind of a master procrastinator | Tim Urban | TED",
      channelTitle: "TED",
      publishedAt: "2016-04-06",
      description: "Tim Urban takes us on a journey through YouTube binges, Wikipedia rabbit holes and bouts of staring out the window, encouraging us to think harder about what we're really procrastinating on.",
      thumbnail: "https://i.ytimg.com/vi/iG9CE55wbtY/hqdefault.jpg",
      duration: "14:03",
      views: "68.4M",
      level: "B1",
      category: "presentations",
      embeddable: true
    },
    {
      id: "7Bgz78JqY2M",
      title: "How to speak so that people want to listen | Julian Treasure | TED",
      channelTitle: "TED",
      publishedAt: "2014-06-27",
      description: "Have you ever felt like you're talking, but nobody is listening? Julian Treasure demonstrates the 'HAIL' framework for powerful speaking with vocal warm-ups.",
      thumbnail: "https://i.ytimg.com/vi/7Bgz78JqY2M/hqdefault.jpg",
      duration: "9:58",
      views: "52.8M",
      level: "B1",
      category: "presentations",
      embeddable: true
    },
    {
      id: "arj7oStGLkU",
      title: "Inside Bill's Brain: Decoding Bill Gates",
      channelTitle: "Netflix",
      publishedAt: "2019-08-29",
      description: "A deep dive into the mind of Bill Gates, his reading habits, his thinking process, and his mission to solve complex global challenges.",
      thumbnail: "https://i.ytimg.com/vi/arj7oStGLkU/hqdefault.jpg",
      duration: "2:15",
      views: "7.6M",
      level: "B2",
      personality: "Bill Gates",
      category: "interviews",
      embeddable: true
    }
  ];

  async function fetchVideos(append = false) {
    if (State.isLoading) return;
    State.isLoading = true;

    if (!append) {
      renderSkeletons();
    } else {
      const btn = $('vid-btn-load-more');
      if (btn) btn.innerHTML = 'Yuklanmoqda...';
    }

    const params = new URLSearchParams();
    if (State.q) params.set('q', State.q);
    if (State.category && State.category !== 'all') params.set('category', State.category);
    if (State.personality) params.set('personality', State.personality);
    if (State.level && State.level !== 'all') params.set('level', State.level);
    if (append && State.pageToken) params.set('pageToken', State.pageToken);

    try {
      const res = await fetch(`/api/youtube/videos?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();

      if (data.ok && Array.isArray(data.videos)) {
        if (append) {
          State.videos = State.videos.concat(data.videos);
        } else {
          State.videos = data.videos;
        }
        State.pageToken = data.nextPageToken || null;
        State.hasKey = data.hasKey;

        renderVideosGrid();
        return;
      }
    } catch (err) {
      console.warn('API video fetch fallback (static host / GitHub Pages):', err.message);
      // Client-side real YouTube videos filtering for static hosting
      let filtered = [...STATIC_REAL_VIDEOS];
      if (State.personality) {
        const p = State.personality.toLowerCase().replace('-', ' ');
        filtered = filtered.filter(v => v.personality && v.personality.toLowerCase().includes(p));
      }
      if (State.category && State.category !== 'all') {
        filtered = filtered.filter(v => v.category === State.category);
      }
      if (State.level && State.level !== 'all') {
        filtered = filtered.filter(v => v.level === State.level);
      }
      if (State.q && State.q.trim()) {
        const qLow = State.q.toLowerCase();
        filtered = filtered.filter(v => v.title.toLowerCase().includes(qLow) || v.description.toLowerCase().includes(qLow));
      }
      State.videos = filtered;
      State.pageToken = null;
      renderVideosGrid();
    } finally {
      State.isLoading = false;
      const btn = $('vid-btn-load-more');
      if (btn) btn.innerHTML = 'Yana ko‘proq videolar yuklash ↓';
    }
  }

  // ---------- Rendering ----------
  function renderSkeletons() {
    const grid = $('vid-grid');
    if (!grid) return;

    let html = '';
    for (let i = 0; i < 6; i++) {
      html += `
        <div class="vid-skeleton-card">
          <div class="vid-skeleton vid-skeleton-thumb"></div>
          <div class="vid-skeleton-body">
            <div class="vid-skeleton vid-skeleton-line short"></div>
            <div class="vid-skeleton vid-skeleton-line full"></div>
            <div class="vid-skeleton vid-skeleton-line medium"></div>
          </div>
        </div>
      `;
    }
    grid.innerHTML = html;

    const loadMoreWrap = $('vid-load-more-wrap');
    if (loadMoreWrap) loadMoreWrap.hidden = true;
  }

  function renderEmptyState(message = 'Hech qanday video topilmadi') {
    const grid = $('vid-grid');
    if (!grid) return;

    grid.innerHTML = `
      <div class="vid-empty-state" style="grid-column: 1 / -1;">
        <div class="vid-empty-icon">🔍</div>
        <h3 class="vid-empty-title">${escapeHtml(message)}</h3>
        <p class="vid-empty-text">Boshqa so‘z yoki filtrni tanlab ko‘ring yoki barcha videolarga qayting.</p>
        <button type="button" class="vid-btn-action primary" id="btn-reset-filters">Filtrlarni tozalash</button>
      </div>
    `;

    const resetBtn = $('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetFilters();
      });
    }

    const loadMoreWrap = $('vid-load-more-wrap');
    if (loadMoreWrap) loadMoreWrap.hidden = true;
  }

  function renderVideosGrid() {
    const grid = $('vid-grid');
    if (!grid) return;

    if (!State.videos || State.videos.length === 0) {
      renderEmptyState();
      return;
    }

    let html = '';
    State.videos.forEach((vid, idx) => {
      const levelClass = vid.level ? `level-${vid.level}` : 'level-B2';
      const durationBadge = vid.duration ? `<span class="vid-card-duration">${escapeHtml(vid.duration)}</span>` : '';
      const levelBadge = vid.level ? `<span class="vid-card-level ${levelClass}">CEFR ${escapeHtml(vid.level)}</span>` : '';
      const viewsText = vid.views ? `<span>${escapeHtml(vid.views)}</span>` : '';
      const publishedText = vid.publishedAt ? `<span>•</span><span>${escapeHtml(vid.publishedAt.slice(0, 10))}</span>` : '';

      html += `
        <article class="vid-card" data-video-index="${idx}" tabindex="0" role="button" aria-label="${escapeHtml(vid.title)}">
          <div class="vid-card-thumb-wrap">
            <img class="vid-card-thumb" src="${escapeHtml(vid.thumbnail)}" alt="${escapeHtml(vid.title)}" loading="lazy" onerror="this.src='https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg'">
            ${durationBadge}
            ${levelBadge}
            <div class="vid-card-play-overlay">
              <div class="vid-card-play-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="vid-card-content">
            <h3 class="vid-card-title">${escapeHtml(vid.title)}</h3>
            <div class="vid-card-channel">
              <span>${escapeHtml(vid.channelTitle)}</span>
              <svg class="vid-verified-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="vid-card-meta">
              ${viewsText}
              ${publishedText}
            </div>
            ${vid.description ? `<p class="vid-card-desc">${escapeHtml(vid.description)}</p>` : ''}
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;

    // Attach click listeners to cards
    grid.querySelectorAll('.vid-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.videoIndex, 10);
        const video = State.videos[idx];
        if (video) openPlayerModal(video);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    const loadMoreWrap = $('vid-load-more-wrap');
    if (loadMoreWrap) {
      loadMoreWrap.hidden = !State.pageToken;
    }
  }

  // ---------- YouTube Player Modal (Requirements 6 & 9) ----------
  function openPlayerModal(video) {
    State.currentVideo = video;
    State.playbackRate = 1.0;

    let modal = $('vid-player-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vid-player-modal';
      modal.className = 'vid-modal-backdrop';
      document.body.appendChild(modal);
    }

    const ytWatchUrl = `https://www.youtube.com/watch?v=${video.id}`;
    const levelClass = video.level ? `level-${video.level}` : 'level-B2';

    modal.innerHTML = `
      <div class="vid-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="vid-modal-title">
        <header class="vid-modal-header">
          <h2 class="vid-modal-title" id="vid-modal-title">${escapeHtml(video.title)}</h2>
          <button type="button" class="vid-modal-close" id="btn-close-vid-modal" aria-label="Yopish">✕</button>
        </header>

        <div class="vid-player-frame-wrap" id="vid-frame-container">
          <div id="yt-iframe-player"></div>
          
          <!-- Graceful Error Fallback if Embedding is Restricted (Requirement 9) -->
          <div class="vid-embed-fallback" id="vid-embed-fallback" hidden>
            <div class="vid-embed-fallback-icon">⚠️</div>
            <h3 class="vid-embed-fallback-title">Ushbu video tashqi saytda ko‘rsatishni cheklagan</h3>
            <p class="vid-embed-fallback-text">
              Video muallifi uni faqat rasmiy YouTube platformasida ko‘rishga ruxsat bergan. Siz uni bevosita YouTube orqali tomosha qilishingiz mumkin.
            </p>
            <a href="${ytWatchUrl}" target="_blank" rel="noopener noreferrer" class="vid-embed-fallback-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 22c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 2c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
              <span>YouTube'da tomosha qilish</span>
            </a>
          </div>
        </div>

        <div class="vid-modal-body">
          <div class="vid-player-controls-row">
            <div class="vid-speed-controls">
              <span class="vid-speed-label">Tezlik:</span>
              <button type="button" class="vid-speed-btn" data-rate="0.75">0.75x</button>
              <button type="button" class="vid-speed-btn active" data-rate="1">1.0x</button>
              <button type="button" class="vid-speed-btn" data-rate="1.25">1.25x</button>
            </div>

            <div class="vid-player-actions">
              <a href="${ytWatchUrl}" target="_blank" rel="noopener noreferrer" class="vid-btn-action primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
                <span>YouTube'da ochish</span>
              </a>
              <button type="button" class="vid-btn-action" id="btn-copy-vid-link">
                <span>Havolani nusxalash</span>
              </button>
            </div>
          </div>

          <div class="vid-learning-tip">
            <div class="vid-learning-tip-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <p class="vid-learning-tip-text">
              <strong>O‘rganish maslahati:</strong> Videoni tinglash jarayonida videoning pastki qismidagi <strong>[CC]</strong> tugmasini bosib rasmiy inglizcha subtitrlarni yoqishingiz, shuningdek yuqoridagi <strong>0.75x</strong> tezlik orqali notiqning talaffuzini so‘zma-so‘z takrorlab (Shadowing) mashq qilishingiz mumkin.
            </p>
          </div>

          <div class="vid-modal-description-box">
            <h4 class="vid-desc-heading">Video ma'lumotlari &amp; Tavsif</h4>
            <div class="vid-card-channel" style="margin-bottom: 10px;">
              <strong>Kanal:</strong> <span>${escapeHtml(video.channelTitle)}</span>
              ${video.level ? `• <span class="vid-card-level ${levelClass}" style="position:static;display:inline-block;">CEFR ${escapeHtml(video.level)}</span>` : ''}
              ${video.views ? `• <span>${escapeHtml(video.views)} ko'rish</span>` : ''}
            </div>
            <p class="vid-desc-text">${escapeHtml(video.description || 'Ushbu video uchun tavsif mavjud emas.')}</p>
          </div>
        </div>
      </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Initialize YouTube Iframe Player
    initIframePlayer(video.id);

    // Event Listeners for Modal
    $('btn-close-vid-modal').addEventListener('click', closePlayerModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePlayerModal();
    });

    // Speed Controls
    modal.querySelectorAll('.vid-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.dataset.rate);
        modal.querySelectorAll('.vid-speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setPlayerSpeed(rate);
      });
    });

    // Copy Link Button
    const copyBtn = $('btn-copy-vid-link');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ytWatchUrl).then(() => {
          copyBtn.innerHTML = '✓ Nusxalandi!';
          setTimeout(() => {
            copyBtn.innerHTML = 'Havolani nusxalash';
          }, 2000);
        });
      });
    }
  }

  function initIframePlayer(videoId) {
    const origin = window.location.origin;

    // If YouTube IFrame API is already loaded
    if (window.YT && window.YT.Player) {
      createYtPlayerInstance(videoId);
    } else {
      // Fallback: create standard responsive iframe directly
      const container = $('yt-iframe-player');
      if (container) {
        container.innerHTML = `
          <iframe 
            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&origin=${encodeURIComponent(origin)}" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        `;
      }
    }
  }

  function createYtPlayerInstance(videoId) {
    const origin = window.location.origin;

    try {
      State.player = new window.YT.Player('yt-iframe-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          origin: origin
        },
        events: {
          'onError': onPlayerError,
          'onReady': (event) => {
            if (State.playbackRate !== 1.0) {
              event.target.setPlaybackRate(State.playbackRate);
            }
          }
        }
      });
    } catch (e) {
      console.warn('YT Player creation fallback:', e);
    }
  }

  function onPlayerError(event) {
    // Error codes: 101 or 150 mean embedding is disabled by owner
    // 100 means video not found or removed
    if (event.data === 101 || event.data === 150 || event.data === 100 || event.data === 2) {
      const fallback = $('vid-embed-fallback');
      if (fallback) {
        fallback.hidden = false;
      }
    }
  }

  function setPlayerSpeed(rate) {
    State.playbackRate = rate;
    if (State.player && typeof State.player.setPlaybackRate === 'function') {
      State.player.setPlaybackRate(rate);
    }
  }

  function closePlayerModal() {
    const modal = $('vid-player-modal');
    if (modal) {
      modal.hidden = true;
      modal.innerHTML = '';
    }
    if (State.player && typeof State.player.destroy === 'function') {
      try {
        State.player.destroy();
      } catch (e) {}
    }
    State.player = null;
    State.currentVideo = null;
    document.body.style.overflow = '';
  }

  // ---------- API Key Configuration Modal (Requirement 10) ----------
  function openKeyModal() {
    let modal = $('vid-key-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vid-key-modal';
      modal.className = 'vid-modal-backdrop';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="vid-modal-dialog vid-key-modal-dialog" role="dialog" aria-modal="true">
        <header class="vid-modal-header">
          <h2 class="vid-modal-title">YouTube Data API v3 Kalitini Sozlash</h2>
          <button type="button" class="vid-modal-close" id="btn-close-key-modal">✕</button>
        </header>
        <div class="vid-key-form">
          <p style="font-size:0.875rem;color:var(--ink);margin:0 0 10px;line-height:1.45;">
            Saytingiz YouTube Data API v3 orqali bevosita eng so'nggi real inglizcha videolarni izlab topadi. Kalit faqat server muhitida (<code>.env</code>) xavfsiz saqlanadi va frontendga hech qachon oshkor qilinmaydi.
          </p>

          <label style="font-size:0.75rem;font-weight:600;text-transform:uppercase;color:var(--muted);" for="input-yt-api-key">
            Google Cloud API Key:
          </label>
          <input type="password" id="input-yt-api-key" class="vid-key-input" placeholder="AIzaSy..." autocomplete="off">

          <div class="vid-key-help">
            <strong>Kalitni qanday olish mumkin? (1 daqiqa, bepul):</strong>
            <ol>
              <li><a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" style="color:var(--accent);">Google Cloud Console</a>-ga kiring.</li>
              <li>"Library" bo'limidan <strong>"YouTube Data API v3"</strong> xizmatini yoqing (Enable).</li>
              <li>"Credentials" bo'limida <strong>"Create Credentials → API Key"</strong> ni bosing.</li>
              <li>Hosil bo'lgan kalitni nusxalab yuqoridagi maydonga kiriting.</li>
            </ol>
          </div>

          <div class="vid-key-actions">
            <button type="button" class="vid-btn-action" id="btn-cancel-key-modal">Bekor qilish</button>
            <button type="button" class="vid-btn-action primary" id="btn-save-key-submit">Saqlash</button>
          </div>
          <div id="vid-key-status-msg" style="margin-top:12px;font-size:0.8125rem;text-align:center;" hidden></div>
        </div>
      </div>
    `;

    modal.hidden = false;

    $('btn-close-key-modal').addEventListener('click', closeKeyModal);
    $('btn-cancel-key-modal').addEventListener('click', closeKeyModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeKeyModal();
    });

    $('btn-save-key-submit').addEventListener('click', async () => {
      const input = $('input-yt-api-key');
      const val = input.value.trim();
      const msg = $('vid-key-status-msg');

      if (!val) {
        msg.hidden = false;
        msg.style.color = '#ef4444';
        msg.textContent = 'Iltimos, API kalitini kiriting';
        return;
      }

      msg.hidden = false;
      msg.style.color = 'var(--muted)';
      msg.textContent = 'Saqlanmoqda...';

      try {
        const res = await fetch('/api/youtube/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: val })
        });
        const result = await res.json();
        if (result.ok) {
          msg.style.color = '#10b981';
          msg.textContent = 'Muvaffaqiyatli saqlandi!';
          checkApiStatus();
          setTimeout(() => {
            closeKeyModal();
            fetchVideos(false);
          }, 1000);
        } else {
          msg.style.color = '#ef4444';
          msg.textContent = result.error || 'Saqlashda xatolik yuz berdi';
        }
      } catch (err) {
        msg.style.color = '#ef4444';
        msg.textContent = 'Tarmoq xatosi: ' + err.message;
      }
    });
  }

  function closeKeyModal() {
    const modal = $('vid-key-modal');
    if (modal) modal.hidden = true;
  }

  // ---------- Filters & Toolbar Handlers ----------
  function resetFilters() {
    State.q = '';
    State.category = 'all';
    State.personality = '';
    State.level = 'all';
    State.pageToken = null;

    const input = $('vid-search-input');
    if (input) input.value = '';

    const clearBtn = $('vid-search-clear');
    if (clearBtn) clearBtn.hidden = true;

    // Reset pills
    document.querySelectorAll('.vid-pill[data-category]').forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'all');
    });
    document.querySelectorAll('.vid-pill[data-personality]').forEach(p => {
      p.classList.remove('active');
    });
    document.querySelectorAll('.vid-pill[data-level]').forEach(p => {
      p.classList.toggle('active', p.dataset.level === 'all');
    });

    fetchVideos(false);
  }

  function initToolbarEvents() {
    // Search Input
    const searchInput = $('vid-search-input');
    const searchClear = $('vid-search-clear');

    if (searchInput) {
      const handleSearch = debounce((val) => {
        State.q = val;
        State.pageToken = null;
        fetchVideos(false);
      }, 400);

      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (searchClear) searchClear.hidden = !val;
        handleSearch(val);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          State.q = searchInput.value.trim();
          State.pageToken = null;
          fetchVideos(false);
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchClear.hidden = true;
        State.q = '';
        State.pageToken = null;
        fetchVideos(false);
      });
    }

    // Category Pills
    document.querySelectorAll('.vid-pill[data-category]').forEach(pill => {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.vid-pill[data-category]').forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        State.category = this.dataset.category;
        // If selecting a category, unselect personality to avoid over-filtering
        State.personality = '';
        document.querySelectorAll('.vid-pill[data-personality]').forEach(p => p.classList.remove('active'));
        State.pageToken = null;
        fetchVideos(false);
      });
    });

    // Personality Pills
    document.querySelectorAll('.vid-pill[data-personality]').forEach(pill => {
      pill.addEventListener('click', function () {
        const isCurrent = this.classList.contains('active');
        document.querySelectorAll('.vid-pill[data-personality]').forEach(p => p.classList.remove('active'));

        if (isCurrent) {
          State.personality = '';
        } else {
          this.classList.add('active');
          State.personality = this.dataset.personality;
        }

        State.pageToken = null;
        fetchVideos(false);
      });
    });

    // CEFR Level Pills
    document.querySelectorAll('.vid-pill[data-level]').forEach(pill => {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.vid-pill[data-level]').forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        State.level = this.dataset.level;
        State.pageToken = null;
        fetchVideos(false);
      });
    });

    // Load More Button
    const loadMoreBtn = $('vid-btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        if (State.pageToken) {
          fetchVideos(true);
        }
      });
    }

    // Global Keydown (Escape to close modal)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const vidModal = $('vid-player-modal');
        if (vidModal && !vidModal.hidden) closePlayerModal();
        const keyModal = $('vid-key-modal');
        if (keyModal && !keyModal.hidden) closeKeyModal();
      }
    });
  }

  // ---------- Public Initialization Hook ----------
  window.openVideosSection = function () {
    if (!State.initialized) {
      State.initialized = true;
      initToolbarEvents();
      checkApiStatus();
      fetchVideos(false);
    }
  };

  // Auto-init if section is already visible
  document.addEventListener('DOMContentLoaded', () => {
    const root = $('videos-root');
    if (root && !root.hidden) {
      window.openVideosSection();
    }
  });

})();
