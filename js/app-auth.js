/**
 * YASHNAR ENGLISH - APPLICATION AUTHENTICATION & USER DATA SYNC
 * Route Guard, Profile Badge, Session Persistence, and User Data Isolation.
 * Supports both Full-Stack Node.js Server and Static GitHub Pages deployment.
 */

(function () {
  'use strict';

  let currentUser = null;

  // Detect static hosting environments (GitHub Pages, file protocol, or static CDNs)
  const isStaticHost = window.location.hostname.endsWith('github.io') ||
                       window.location.protocol === 'file:' ||
                       (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.port);

  async function checkAuth() {
    // 1. If deployed on GitHub Pages or static host, activate client-side guest session directly
    if (isStaticHost) {
      console.log("Yashnar English: Running on static host (GitHub Pages). Guest mode activated.");
      initGuestSession();
      return;
    }

    // 2. Full-stack Node.js server environment
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        // If API route does not exist (404), fallback to guest mode instead of breaking the app
        if (res.status === 404) {
          initGuestSession();
          return;
        }

        // Unauthenticated visitor on live auth server -> redirect to login.html
        const currentPath = window.location.pathname + window.location.hash;
        window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}&error=unauthorized`;
        return;
      }

      currentUser = await res.json();
      window.currentUser = currentUser;

      renderUserProfileBadge(currentUser);
      await syncUserData(currentUser);
    } catch (err) {
      console.warn("Auth check network error, activating guest session:", err);
      initGuestSession();
    }
  }

  function initGuestSession() {
    currentUser = {
      id: 'guest',
      username: 'Mehmon',
      email: 'guest@yashnar.uz',
      level: 'B2',
      isGuest: true
    };
    window.currentUser = currentUser;
    renderUserProfileBadge(currentUser);
    syncUserData(currentUser);
  }

  function renderUserProfileBadge(user) {
    const userArea = document.getElementById('nav-user-area');
    if (!userArea) return;

    if (user.isGuest) {
      userArea.innerHTML = `
        <div class="user-profile-widget">
          <span class="user-name-badge" title="Mehmon rejimi">${user.username} · ${user.level || 'B2'}</span>
          <a href="login.html" class="btn-logout" style="text-decoration:none;" title="Tizimga kirish">Kirish</a>
        </div>
      `;
      return;
    }

    userArea.innerHTML = `
      <div class="user-profile-widget">
        <span class="user-name-badge" title="Foydalanuvchi: ${user.email || user.username}">${user.username} · ${user.level || 'B2'}</span>
        <button type="button" class="btn-logout" id="btn-app-logout" title="Tizimdan chiqish">Chiqish</button>
      </div>
    `;

    const logoutBtn = document.getElementById('btn-app-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {}
        window.location.href = 'index.html';
      });
    }
  }

  // Synchronize isolated private data for this specific user
  async function syncUserData(user) {
    const userStoragePrefix = `yashnar_u_${user.id}_`;

    // Only attempt server fetch if not in static/guest mode
    if (!user.isGuest && !isStaticHost) {
      try {
        const res = await fetch('/api/user/data');
        if (res.ok) {
          const payload = await res.json();
          const serverData = payload.data || {};

          // Merge server data into isolated user localStorage
          if (serverData.savedWords && serverData.savedWords.length) {
            localStorage.setItem(`${userStoragePrefix}saved_words`, JSON.stringify(serverData.savedWords));
          }
          if (serverData.quizHistory && serverData.quizHistory.length) {
            localStorage.setItem(`${userStoragePrefix}quiz_hist`, JSON.stringify(serverData.quizHistory));
          }
          if (serverData.mockExamHistory && serverData.mockExamHistory.length) {
            localStorage.setItem(`${userStoragePrefix}exam_hist`, JSON.stringify(serverData.mockExamHistory));
          }
          if (serverData.listeningHistory && serverData.listeningHistory.length) {
            localStorage.setItem(`${userStoragePrefix}lis_hist`, JSON.stringify(serverData.listeningHistory));
          }
          if (serverData.speakingHistory && serverData.speakingHistory.length) {
            localStorage.setItem(`${userStoragePrefix}spk_hist`, JSON.stringify(serverData.speakingHistory));
          }
        }
      } catch (e) {
        console.warn("Data sync load error:", e);
      }
    }

    // Set up debounced auto-sync to server if authenticated
    let syncTimeout = null;
    window.syncCurrentUserDataToServer = function () {
      if (user.isGuest || isStaticHost) return; // Keep in localStorage in guest mode

      if (syncTimeout) clearTimeout(syncTimeout);
      syncTimeout = setTimeout(async () => {
        try {
          const savedWords = JSON.parse(localStorage.getItem(`${userStoragePrefix}saved_words`) || '[]');
          const quizHistory = JSON.parse(localStorage.getItem(`${userStoragePrefix}quiz_hist`) || '[]');
          const mockExamHistory = JSON.parse(localStorage.getItem(`${userStoragePrefix}exam_hist`) || '[]');
          const listeningHistory = JSON.parse(localStorage.getItem(`${userStoragePrefix}lis_hist`) || '[]');
          const speakingHistory = JSON.parse(localStorage.getItem(`${userStoragePrefix}spk_hist`) || '[]');

          await fetch('/api/user/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              savedWords,
              quizHistory,
              mockExamHistory,
              listeningHistory,
              speakingHistory
            })
          });
        } catch (e) {
          console.warn("Data sync save error:", e);
        }
      }, 1000);
    };
  }

  // Initialize immediately on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
  } else {
    checkAuth();
  }
})();
