/* Xaber links: what a QR code or installer link opens on a phone without the app, or on a computer.
   On Android with Xaber installed, these addresses open the app directly (App Links), so this page is
   only seen when the app is missing or the link was opened elsewhere. */
(function () {
  'use strict';
  var PKG = 'com.offsitebimcraft.xaber';
  var PLAY = 'https://play.google.com/store/apps/details?id=' + PKG;
  var q = new URLSearchParams(location.search);
  var $ = function (id) { return document.getElementById(id); };
  function set(id, text) { var el = $(id); if (el) el.textContent = text; }
  // An intent link asks Android to open Xaber, and falls back to the Play Store when it is not installed
  var intent = 'intent://' + location.host + location.pathname + location.search +
    '#Intent;scheme=https;package=' + PKG + ';S.browser_fallback_url=' + encodeURIComponent(PLAY) + ';end';
  var isAndroid = /Android/i.test(navigator.userAgent);
  var open = $('openApp');
  if (open) {
    if (isAndroid) open.href = intent; else { open.href = PLAY; open.textContent = 'Get Xaber on Google Play'; }
  }
  var get = $('getApp'); if (get) get.href = PLAY;
  var file = q.get('file') || '', site = q.get('site') || '', el = q.get('el') || '', co = q.get('co') || '';
  if (file) set('model', file.split('/').pop().replace(/\.glb$/i, ''));
  if (file) set('where', [site.replace(/^[^/]+\/(sites|teams)\//i, ''), file.split('/').slice(0, -1).join(' / ')].filter(Boolean).join(' / '));
  if (el) set('mark', 'Opens at ' + el);
  if (co) { set('company', co); document.title = 'Join ' + co + ' on Xaber'; }
  if (site) set('siteName', site);
})();
