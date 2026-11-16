/* Privacy-conscious aggregate analytics for Date Roulette.
 * Records event names only: NO names, email addresses, answers or invite tokens.
 * Umami automatically collects ordinary pageview/visitor metrics when configured.
 */
(function () {
  'use strict';
  const settings = window.DATE_ROULETTE_SETTINGS || {};
  const id = String(settings.UMAMI_WEBSITE_ID || '').trim();
  const validId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const isDemo = new URLSearchParams(window.location.search).get('preview') === '1';
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) || window.location.protocol === 'file:';
  const queue = [];
  const allowed = new Set([
    'invitation_created', 'share_clicked', 'invitation_opened',
    'invite_yes', 'invite_no_playful_click', 'invite_no_final',
    'game_started', 'game_completed', 'result_email_requested',
    'result_email_accepted', 'result_email_error'
  ]);
  const enabled = validId && !isDemo && !isLocal;
  function flush() {
    if (typeof window.umami?.track !== 'function') return;
    while (queue.length) {
      const name = queue.shift();
      try { window.umami.track(name); } catch (_) { /* optional analytics */ }
    }
  }
  function track(name) {
    if (!enabled || !allowed.has(name)) return;
    if (typeof window.umami?.track === 'function') {
      try { window.umami.track(name); } catch (_) { /* optional analytics */ }
    } else if (queue.length < 30) {
      queue.push(name);
    }
  }
  window.DateRouletteAnalytics = Object.freeze({track, enabled});
  if (!enabled) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = settings.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';
  script.setAttribute('data-website-id', id);
  script.setAttribute('data-exclude-hash', 'true');
  script.setAttribute('data-exclude-search', 'true');
  script.setAttribute('data-do-not-track', 'true');
  script.addEventListener('load', flush);
  document.head.appendChild(script);
})();
