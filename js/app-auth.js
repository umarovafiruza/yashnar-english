/**
 * YASHNAR ENGLISH - APPLICATION AUTHENTICATION & USER DATA SYNC
 * Route Guard, Profile Badge, Session Persistence, and User Data Isolation.
 */

(function () {
  'use strict';

  let currentUser = null;

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        // Unauthenticated visitor -> redirect to login
        const currentPath = window.location.pathname + window.location.hash;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}&error=unauthorized`;
        return;
      }

      currentUser = await res.json();
      window.currentUser = currentUser;

      renderUserProfileBadge(currentUser);
      await syncUserData(currentUser);
    } catch (err) {
      console.warn("Auth check network error:", err);
    }
  }

  function renderUserProfileBadge(user) {
    const userArea = document.getElementById('nav-user-area');
    if (!userArea) return;

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
        window.location.href = '/';
      });
    }
  }

  // Synchronize isolated private data for this specific user
  async function syncUserData(user) {
    const userStoragePrefix = `yashnar_u_${user.id}_`;

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

    // Set up debounced auto-sync to server
    let syncTimeout = null;
    window.syncCurrentUserDataToServer = function () {
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
