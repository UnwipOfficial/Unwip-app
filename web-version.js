window.UNWIP_VERSION = "0.48.12";
window.UNWIP_LATEST_NOTES = "- Dictate: talk instead of typing. Tap the Dictate button next to Record, the mic beside Read aloud, Dictate on the phone's formatting row, or press F9. On an iPhone, iPad or Mac in Safari, Unwip starts listening straight away and your words go in at the cursor, with what it's still hearing shown in a small box at the top. The first time, your device asks to use the microphone. It uses Apple's own speech recognition, the same as the keyboard's mic, so Unwip itself still has no AI. On a PC, press Windows+H to use Windows voice typing.\n- While Dictate is on, the button, a bar along the top of the page and the cursor turn raspberry, so a screen video shows it, and the words you say get a faint underline until you switch it off. The underline is never saved.\n- Replay: with Dictate on, a replay marks the dictated stretches (under the slider, and with a Dictated badge while they play), and the recordings list and the report count dictated words apart from typed ones. Timelapse videos show the badge too.\n- Writing history has a Copy\u2026 button. Copy your words by day as a list for a message or Discord, a table that pastes into Excel or Google Sheets as columns, or a picture of the grid with your totals. Pick this week, this month, the last 12 months, a year or your own dates. Only dates and numbers are copied; your books are named only if you tick Split by book. On an iPhone or iPad, Share\u2026 sends it straight to Messages, Notes or another app, and on a PC or Mac Save as file\u2026 keeps it as a spreadsheet file.\n- iPad and iPhone: in Ctrl+K (Find anything), swiping the results now scrolls the list. Before, it could move the whole screen instead. The box also fits above the keyboard's bar, so nothing hides under it.\n- Toolbar: the scene break button now shows * * *, so it no longer looks like the \u22ef button next to it. Same on the phone's formatting row.\n- Build: New character sheet has its own icon, a backpack, instead of the coat of arms' shield.\n- Split view: a wide picture now fits inside the pane. Before, it showed full size and the pane scrolled sideways.\n- Binder: an icon Unwip no longer has now shows as the usual chapter or folder icon, instead of its name in letters. An unused life-ring icon was taken out.\n- Help: two topics pointed to Settings sections that don't exist. Fonts are in Settings \u203a Appearance, and backups are in the book's \u22ef \u203a Backups\u2026 on the main screen.";
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
