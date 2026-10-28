/**
 * YASHNAR ENGLISH - CLIENT AUTHENTICATION CONTROLLER
 * Client-side validation, password toggles, OAuth modal, and safe redirects.
 */

(function () {
  'use strict';

  function $(id) {
    return document.getElementById(id);
  }

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function getRedirectDestination() {
    const raw = getQueryParam('redirect');
    // Prevent open redirect attacks: only allow internal paths
    if (raw && raw.startsWith('/') && !raw.startsWith('//')) {
      return raw;
    }
    return '/app';
  }

  // --- Password Toggle Helper ---
  function setupPasswordToggle(inputEl, btnEl) {
    if (!inputEl || !btnEl) return;
    btnEl.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = inputEl.type === 'password';
      inputEl.type = isPassword ? 'text' : 'password';
      btnEl.textContent = isPassword ? "Yashirish" : "Ko'rsatish";
    });
  }

  // --- Alert Banner Helpers ---
  function showAlert(alertEl, message, type = 'error') {
    if (!alertEl) return;
    alertEl.className = `auth-alert ${type}`;
    alertEl.innerHTML = `<span>${message}</span>`;
    alertEl.hidden = false;
  }

  function hideAlert(alertEl) {
    if (!alertEl) return;
    alertEl.hidden = true;
    alertEl.innerHTML = '';
  }

  // --- OAuth Helper Modal ---
  function showOAuthChecklistModal(providerName, checklist) {
    const existing = document.querySelector('.oauth-modal-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.className = 'oauth-modal-backdrop';
    backdrop.innerHTML = `
      <div class="oauth-modal-card">
        <h3>${providerName} OAuth Sozlamalari Talab Qilinadi</h3>
        <p>Haqiqiy ${providerName} avtorizatsiyasi ishlashi uchun server muhitida quyidagi ma'lumotlar o'rnatilgan bo'lishi kerak:</p>
        <ol class="oauth-checklist">
          ${checklist.map(item => `<li>${item}</li>`).join('')}
        </ol>
        <p style="font-size: 0.8125rem; color: var(--muted); margin-bottom: 20px;">
          Hozircha tizimga kirish uchun <strong>elektron pochta / foydalanuvchi nomi</strong> va parol orqali ro'yxatdan o'tishingiz yoki kirishingiz mumkin.
        </p>
        <button type="button" class="btn-modal-close" id="btn-oauth-close">Tushundim</button>
      </div>
    `;

    document.body.appendChild(backdrop);
    backdrop.querySelector('#btn-oauth-close').addEventListener('click', () => {
      backdrop.remove();
    });
  }

  // --- OAuth Buttons Attachment ---
  function setupOAuthButtons() {
    const googleBtn = $('btn-oauth-google');
    const githubBtn = $('btn-oauth-github');
    const redirectAfter = encodeURIComponent(getRedirectDestination());

    if (googleBtn) {
      googleBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`/api/auth/oauth/google?redirect=${redirectAfter}`);
          const data = await res.json();
          if (data.configured && data.authUrl) {
            window.location.href = data.authUrl;
          } else {
            showOAuthChecklistModal('Google', data.checklist || [
              "GOOGLE_CLIENT_ID va GOOGLE_CLIENT_SECRET o'rnatilmagan.",
              "Google Cloud Console da Web Client ID yarating.",
              "Callback URL ni http://localhost:3000/api/auth/oauth/google/callback ga sozlang."
            ]);
          }
        } catch (err) {
          alert("Google OAuth xizmatiga ulanishda xatolik yuz berdi.");
        }
      });
    }

    if (githubBtn) {
      githubBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`/api/auth/oauth/github?redirect=${redirectAfter}`);
          const data = await res.json();
          if (data.configured && data.authUrl) {
            window.location.href = data.authUrl;
          } else {
            showOAuthChecklistModal('GitHub', data.checklist || [
              "GITHUB_CLIENT_ID va GITHUB_CLIENT_SECRET o'rnatilmagan.",
              "GitHub Developer Settings bo'limidan OAuth App yarating.",
              "Authorization Callback URL ni http://localhost:3000/api/auth/oauth/github/callback ga sozlang."
            ]);
          }
        } catch (err) {
          alert("GitHub OAuth xizmatiga ulanishda xatolik yuz berdi.");
        }
      });
    }
  }

  // --- Check Initial URL Messages ---
  function checkUrlStatus(alertEl) {
    const errorParam = getQueryParam('error') || getQueryParam('oauth_error');
    if (errorParam && alertEl) {
      if (errorParam === 'google_unconfigured') {
        showAlert(alertEl, "Google OAuth serverda hali sozlanmagan. Iltimos, quyidagi forma orqali kiring.");
      } else if (errorParam === 'github_unconfigured') {
        showAlert(alertEl, "GitHub OAuth serverda hali sozlanmagan. Iltimos, quyidagi forma orqali kiring.");
      } else if (errorParam === 'unauthorized') {
        showAlert(alertEl, "Ushbu bo'limdan foydalanish uchun tizimga kirishingiz lozim.");
      } else {
        showAlert(alertEl, decodeURIComponent(errorParam));
      }
    }
  }

  // ==================== LOGIN FORM ====================
  function initLoginForm() {
    const form = $('login-form');
    const alertEl = $('auth-alert');
    const submitBtn = $('btn-login-submit');
    const pwInput = $('login-password');
    const pwToggle = $('btn-pw-toggle');

    setupPasswordToggle(pwInput, pwToggle);
    setupOAuthButtons();
    checkUrlStatus(alertEl);

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert(alertEl);

      const identifier = $('login-identifier').value.trim();
      const password = pwInput.value;
      const rememberMe = $('login-remember') ? $('login-remember').checked : true;

      if (!identifier) {
        showAlert(alertEl, "Foydalanuvchi nomi yoki elektron pochtani kiriting.");
        $('login-identifier').focus();
        return;
      }
      if (!password) {
        showAlert(alertEl, "Parolni kiriting.");
        pwInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Kirilmoqda...";

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password, rememberMe })
        });
        const data = await res.json();

        if (res.ok && data.ok) {
          showAlert(alertEl, "Muvaffaqiyatli kirildi! Yo'naltirilmoqda...", 'success');
          // Navigate to intended destination
          setTimeout(() => {
            window.location.href = getRedirectDestination();
          }, 400);
        } else {
          showAlert(alertEl, data.error || "Tizimga kirishda xatolik yuz berdi.");
          submitBtn.disabled = false;
          submitBtn.textContent = "Kirish";
        }
      } catch (err) {
        showAlert(alertEl, "Server bilan bog'lanishda xatolik. Qaytadan urinib ko'ring.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirish";
      }
    });
  }

  // ==================== SIGNUP FORM ====================
  function initSignupForm() {
    const form = $('signup-form');
    const alertEl = $('auth-alert');
    const submitBtn = $('btn-signup-submit');
    const pwInput = $('signup-password');
    const pwToggle = $('btn-pw-toggle');

    setupPasswordToggle(pwInput, pwToggle);
    setupOAuthButtons();
    checkUrlStatus(alertEl);

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert(alertEl);

      const username = $('signup-username').value.trim();
      const email = $('signup-email').value.trim();
      const level = $('signup-level').value;
      const password = pwInput.value;
      const confirmPassword = $('signup-confirm-password').value;
      const termsAccepted = $('signup-terms').checked;

      // Client validation
      if (!username || username.length < 3) {
        showAlert(alertEl, "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak.");
        $('signup-username').focus();
        return;
      }
      if (!email || !email.includes('@')) {
        showAlert(alertEl, "To'g'ri elektron pochta manzilini kiriting.");
        $('signup-email').focus();
        return;
      }
      if (password.length < 8) {
        showAlert(alertEl, "Parol kamida 8 ta belgidan iborat bo'lishi shart.");
        pwInput.focus();
        return;
      }
      if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        showAlert(alertEl, "Parolda kamida bitta harf va bitta raqam qatnashishi kerak.");
        pwInput.focus();
        return;
      }
      if (password !== confirmPassword) {
        showAlert(alertEl, "Parollar bir-biriga mos kelmadi. Tekshirib qayta kiriting.");
        $('signup-confirm-password').focus();
        return;
      }
      if (!termsAccepted) {
        showAlert(alertEl, "Ro'yxatdan o'tish uchun foydalanish shartlariga rozilik bildiring.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Ro'yxatdan o'tkazilmoqda...";

      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email,
            level,
            password,
            confirmPassword,
            termsAccepted
          })
        });
        const data = await res.json();

        if (res.ok && data.ok) {
          showAlert(alertEl, "Profilingiz muvaffaqiyatli yaratildi! Platformaga yo'naltirilmoqda...", 'success');
          setTimeout(() => {
            window.location.href = getRedirectDestination();
          }, 400);
        } else {
          showAlert(alertEl, data.error || "Ro'yxatdan o'tishda xatolik yuz berdi.");
          submitBtn.disabled = false;
          submitBtn.textContent = "Ro'yxatdan o'tish";
        }
      } catch (err) {
        showAlert(alertEl, "Server bilan bog'lanishda xatolik. Qaytadan urinib ko'ring.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Ro'yxatdan o'tish";
      }
    });
  }

  // ==================== FORGOT PASSWORD FORM ====================
  function initForgotPasswordForm() {
    const reqForm = $('forgot-request-form');
    const resetForm = $('forgot-reset-form');
    const alertEl = $('auth-alert');
    const reqSubmitBtn = $('btn-forgot-request-submit');
    const resetSubmitBtn = $('btn-forgot-reset-submit');

    const tokenFromUrl = getQueryParam('token');
    if (tokenFromUrl && resetForm && reqForm) {
      reqForm.hidden = true;
      resetForm.hidden = false;
      $('reset-token-input').value = tokenFromUrl;
      showAlert(alertEl, "Yangi parolingizni kiriting va tasdiqlang.", 'info');
    }

    if (reqForm) {
      reqForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert(alertEl);

        const email = $('forgot-email').value.trim();
        if (!email || !email.includes('@')) {
          showAlert(alertEl, "To'g'ri elektron pochta manzilini kiriting.");
          $('forgot-email').focus();
          return;
        }

        reqSubmitBtn.disabled = true;
        reqSubmitBtn.textContent = "Yuborilmoqda...";

        try {
          const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          const data = await res.json();

          if (data.ok) {
            showAlert(alertEl, data.message, 'success');
            // If local environment returned resetToken, switch directly to reset form
            if (data.resetToken && resetForm) {
              setTimeout(() => {
                reqForm.hidden = true;
                resetForm.hidden = false;
                $('reset-token-input').value = data.resetToken;
                showAlert(alertEl, "Yangi parolingizni kiriting:", 'info');
              }, 600);
            }
          } else {
            showAlert(alertEl, data.error || "Xatolik yuz berdi.");
            reqSubmitBtn.disabled = false;
            reqSubmitBtn.textContent = "Tiklash havolasini yuborish";
          }
        } catch (err) {
          showAlert(alertEl, "Server bilan bog'lanishda xatolik yuz berdi.");
          reqSubmitBtn.disabled = false;
          reqSubmitBtn.textContent = "Tiklash havolasini yuborish";
        }
      });
    }

    if (resetForm) {
      resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert(alertEl);

        const token = $('reset-token-input').value.trim();
        const newPassword = $('reset-new-password').value;
        const confirmPassword = $('reset-confirm-password').value;

        if (newPassword.length < 8) {
          showAlert(alertEl, "Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak.");
          return;
        }
        if (newPassword !== confirmPassword) {
          showAlert(alertEl, "Kiritilgan yangi parollar bir-biriga mos kelmadi.");
          return;
        }

        resetSubmitBtn.disabled = true;
        resetSubmitBtn.textContent = "Saqlanmoqda...";

        try {
          const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword, confirmPassword })
          });
          const data = await res.json();

          if (res.ok && data.ok) {
            showAlert(alertEl, data.message + " Tizimga kirish sahifasiga yo'naltirilmoqda...", 'success');
            setTimeout(() => {
              window.location.href = '/login';
            }, 1200);
          } else {
            showAlert(alertEl, data.error || "Parolni yangilashda xatolik yuz berdi.");
            resetSubmitBtn.disabled = false;
            resetSubmitBtn.textContent = "Yangi parolni saqlash";
          }
        } catch (err) {
          showAlert(alertEl, "Server bilan bog'lanishda xatolik yuz berdi.");
          resetSubmitBtn.disabled = false;
          resetSubmitBtn.textContent = "Yangi parolni saqlash";
        }
      });
    }
  }

  // Export functions to global scope
  window.YashnarAuth = {
    initLoginForm,
    initSignupForm,
    initForgotPasswordForm
  };
})();
