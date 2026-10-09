(function (w, d) {
  'use strict';
  // Production Guia only: archived pages and local previews must not send events.
  if (w.location.hostname !== 'fernandapanaro.com.br' || !/^\/guiadosofa\/?$/.test(w.location.pathname) || w.__fernandaGuiaPixel) return;
  w.__fernandaGuiaPixel = true;
  var pixelId = '1456076653085395';
  if (!w.fbq) {
    var n = w.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!w._fbq) w._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    var script = d.createElement('script'); script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    d.head.appendChild(script);
  }
  w.fbq('init', pixelId);
  function details() {
    return {content_ids: ['190039'], content_type: 'product', content_name: 'Guia de Estilo do Sofá Edição 01', value: 47, currency: 'BRL'};
  }
  w.fbq('trackSingle', pixelId, 'PageView');
  w.fbq('trackSingle', pixelId, 'ViewContent', details());
  // A CTA click is intent, not an arrived checkout and never a paid purchase.
  d.querySelectorAll('.js-checkout').forEach(function (button) {
    button.addEventListener('click', function () {
      try { w.fbq('trackSingleCustom', pixelId, 'ClickCheckout', details()); } catch (e) { /* Tracking must not block checkout. */ }
    }, true);
  });
})(window, document);
