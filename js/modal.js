/**
 * Yashnar English - Apple-Inspired Universal Modal Dialog System
 * Provides sleek, native-feeling alert, confirm, and history modals.
 */
(function() {
  'use strict';

  const SVG_ICONS = {
    warning: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,
    danger: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>`,
    info: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,
    history: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,
    close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`
  };

  let activeOverlay = null;

  function closeModal(overlay, callback) {
    if (!overlay) return;
    overlay.classList.add('closing');
    const card = overlay.querySelector('.modal-card');
    if (card) card.classList.add('closing');

    setTimeout(() => {
      overlay.remove();
      if (activeOverlay === overlay) {
        activeOverlay = null;
        document.body.classList.remove('modal-open');
      }
      if (typeof callback === 'function') callback();
    }, 160);
  }

  // Global keydown for Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activeOverlay) {
      const cancelBtn = activeOverlay.querySelector('#modal-btn-cancel, #modal-close-history, .modal-close-btn');
      if (cancelBtn) cancelBtn.click();
      else closeModal(activeOverlay);
    }
  });

  const YashnarModal = {
    /**
     * Confirmation Modal (e.g. Exit test, unfinished questions, delete confirm)
     */
    confirm: function(options) {
      const {
        title = "Tasdiqlash",
        message = "",
        icon = "warning",
        cancelText = "Bekor qilish",
        confirmText = "Davom etish",
        isDanger = false,
        onConfirm,
        onCancel
      } = options || {};

      if (activeOverlay) closeModal(activeOverlay);

      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      const iconSvg = SVG_ICONS[icon] || SVG_ICONS.warning;
      const iconClass = isDanger ? 'modal-icon-danger' : (icon === 'info' ? 'modal-icon-info' : 'modal-icon-warning');

      overlay.innerHTML = `
        <div class="modal-card">
          <button type="button" class="modal-close-btn" id="modal-close-x" aria-label="Yopish">
            ${SVG_ICONS.close}
          </button>
          <div class="modal-header-wrap">
            <div class="modal-icon-badge ${iconClass}">
              ${iconSvg}
            </div>
            <div class="modal-title-wrap">
              <h3 class="modal-title">${title}</h3>
              <p class="modal-message">${message}</p>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-modal-cancel" id="modal-btn-cancel">${cancelText}</button>
            <button type="button" class="btn-modal-confirm ${isDanger ? 'danger' : ''}" id="modal-btn-confirm">${confirmText}</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.classList.add('modal-open');
      activeOverlay = overlay;

      // Click outside card closes modal
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeModal(overlay, onCancel);
        }
      });

      overlay.querySelector('#modal-close-x').addEventListener('click', function() {
        closeModal(overlay, onCancel);
      });

      overlay.querySelector('#modal-btn-cancel').addEventListener('click', function() {
        closeModal(overlay, onCancel);
      });

      overlay.querySelector('#modal-btn-confirm').addEventListener('click', function() {
        closeModal(overlay, onConfirm);
      });
    },

    /**
     * History Modal (for Quiz and Listening practice history)
     */
    showHistory: function(options) {
      const {
        title = "Testlar Tarixi",
        badge = "Natijalar",
        items = [],
        emptyMessage = "Hozircha ishlangan testlar mavjud emas.",
        onClear,
        onClose
      } = options || {};

      if (activeOverlay) closeModal(activeOverlay);

      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      let listHtml = '';
      if (!items || !items.length) {
        listHtml = `
          <div class="history-empty-state">
            <div class="history-empty-icon">
              ${SVG_ICONS.history}
            </div>
            <p class="history-empty-title">${emptyMessage}</p>
            <p class="history-empty-desc">Mashqlarni ishlab o'z natijalaringizni shu yerda kuzatib borishingiz mumkin.</p>
          </div>
        `;
      } else {
        listHtml = `
          <div class="history-content-scroll">
            ${items.map(item => {
              const scoreClass = item.percentage >= 80 ? 'score-high' : (item.percentage >= 50 ? 'score-mid' : 'score-low');
              return `
                <div class="history-item">
                  <div class="history-meta">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
                      <span class="history-item-badge">${item.badge || 'Test'}</span>
                      <span class="history-title">${item.title}</span>
                    </div>
                    <span class="history-sub">${item.date} ${item.sub ? '· ' + item.sub : ''}</span>
                  </div>
                  <div class="history-score-wrap">
                    <span class="history-score-pill ${scoreClass}">${item.percentage}%</span>
                    <span class="history-score-frac">(${item.score}/${item.total})</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      overlay.innerHTML = `
        <div class="modal-card history-modal-card">
          <div class="history-modal-top">
            <div class="history-title-row">
              <div class="modal-icon-badge modal-icon-history">
                ${SVG_ICONS.history}
              </div>
              <div class="history-title-text-wrap">
                <h3 class="modal-title" style="margin: 0;">${title}</h3>
                <span class="history-count-badge">${items.length} ta mashq</span>
              </div>
            </div>
            <div class="history-top-actions">
              ${items.length && onClear ? `<button type="button" class="btn-clear-history-pill" id="btn-clear-history">Tarixni tozalash</button>` : ''}
              <button type="button" class="modal-close-btn" id="modal-close-x" aria-label="Yopish">
                ${SVG_ICONS.close}
              </button>
            </div>
          </div>
          ${listHtml}
          <div class="history-modal-footer">
            <button type="button" class="btn-modal-confirm" id="modal-close-history" style="min-width: 120px;">Yopish</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.classList.add('modal-open');
      activeOverlay = overlay;

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeModal(overlay, onClose);
        }
      });

      overlay.querySelector('#modal-close-x').addEventListener('click', function() {
        closeModal(overlay, onClose);
      });

      overlay.querySelector('#modal-close-history').addEventListener('click', function() {
        closeModal(overlay, onClose);
      });

      const clearBtn = overlay.querySelector('#btn-clear-history');
      if (clearBtn && onClear) {
        clearBtn.addEventListener('click', function() {
          YashnarModal.confirm({
            title: "Tarixni tozalash",
            message: "Haqiqatan ham barcha ishlangan testlar tarixini tozalashni xohlaysizmi? Bu amalni ortga qaytarib bo'lmaydi.",
            icon: "danger",
            cancelText: "Bekor qilish",
            confirmText: "Tozalash",
            isDanger: true,
            onConfirm: function() {
              onClear();
              closeModal(overlay);
            }
          });
        });
      }
    }
  };

  window.YashnarModal = YashnarModal;
})();
