window.UNWIP_VERSION = "0.48.16";
window.UNWIP_LATEST_NOTES = "- New: Text layout\u2026 in Settings \u203a Appearance (also in Style and Ctrl+K). Set line spacing, first-line indent, space after paragraphs and justified text for the whole book, with an example from Dracula beside it that changes as you go. Use it for this book, new books too, or every book you have.\n- iPhone: tap Aa on the formatting row to align text left, centre, right or justified.\n- iPhone: going back to the chapter list now closes Style or any other side panel that was open.\n- Typing \"- \" at the start of a line still turns it into a bullet, but pressing Backspace straight after puts your \"- \" back, so you can start a line with a plain dash.";
if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
(function () {
  if (location.protocol !== 'https:') return;
  let last = 0, offered = '';
  async function check() {
    if (Date.now() - last < 60000) return; last = Date.now();
    try {
      const t = await (await fetch('web-version.js?v=' + Date.now(), { cache: 'no-store' })).text();
      const m = t.match(/UNWIP_VERSION = "([^"]+)"/); const v = m && m[1];
      const U = window.__unwip; if (!v || v === window.UNWIP_VERSION || v === offered || !U || !U.toastAction) return;
      offered = v;
      let notes = ''; try { const n = t.match(/UNWIP_LATEST_NOTES = ("(?:[^"\\]|\\.)*");/); if (n) notes = JSON.parse(n[1]); } catch (e) {}
      const go = () => U.safeRestart ? U.safeRestart(() => location.reload()) : location.reload();
      if (window.UnwipUpdates && window.UnwipUpdates.notice) window.UnwipUpdates.notice({ title: 'A new version of Unwip is ready', version: v, notes, action: 'Update now', run: go });
      else U.toastAction('A new version of Unwip is ready (' + v + ').', 'Update now', go, 60000);
    } catch (e) {}
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  addEventListener('load', () => setTimeout(check, 20000)); setInterval(check, 3600000);
})();
