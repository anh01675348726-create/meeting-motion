'use strict';
/* ============ 播放器 ============ */

const XF = .8;
let TOTAL = 0;
SCENES.forEach(s => { s.start = TOTAL; TOTAL += s.dur; });
window.__total = TOTAL;
window.__errs = [];
window.addEventListener('error', e => window.__errs.push(String(e.message)));

const stage = $('#stage');
let T = 0, playing = true, last = 0, current = -1;

function fit() {
  const vw = innerWidth, vh = innerHeight, k = Math.min(vw / W, vh / H);
  stage.style.transform = `translate(${(vw - W * k) / 2}px,${(vh - H * k) / 2}px) scale(${k})`;
  drawBar();
}

function sceneAt(t) { for (let i = SCENES.length - 1; i >= 0; i--) if (t >= SCENES[i].start) return i; return 0; }

function render() {
  const idx = sceneAt(T);
  SCENES.forEach((s, i) => {
    const lt = T - s.start;
    const vis = i === idx || (i === idx - 1 && lt < s.dur + XF);
    if (vis !== s.vis) { s.root.classList.toggle('on', vis); s.vis = vis; }
    if (!vis) return;
    if (i !== idx) {
      const q = clamp((lt - s.dur) / XF), e = E.io(q);
      s.root.style.opacity = (1 - e).toFixed(3);
      s.root.style.transform = `translateY(${(-18 * e).toFixed(1)}px) scale(${(1 + .015 * e).toFixed(4)})`;
      s.root.style.zIndex = 2;
    } else { s.root.style.opacity = 1; s.root.style.transform = ''; s.root.style.zIndex = 1; }
    try { s.tl.apply(lt); } catch (err) { if (!s.err) { s.err = 1; console.error(s.id, err); window.__errs.push(s.id + ': ' + err.message); } }
  });
  if (idx !== current) {
    current = idx;
    const s = SCENES[idx], show = !s.noChrome;
    $('#chapter').style.opacity = show ? 1 : 0;
    $('#chapter').innerHTML = `<span class="n">${String(idx).padStart(2, '0')}</span> / ${String(SCENES.length - 1).padStart(2, '0')}<span class="t">${s.title}</span>`;
  }
  updateBar();
}

function frame(now) {
  const dt = Math.min(.1, (now - last) / 1000); last = now;
  if (playing && !dragging) { T += dt; if (T >= TOTAL) T -= TOTAL; render(); }
  requestAnimationFrame(frame);
}

/* ============ 控制条 ============ */
const ui = $('#ui'), bar = $('#ui .bar'), tip = $('#ui .tip');
const ICON = {
  play: `<svg viewBox="0 0 30 30"><path d="M9 6.5 L23.5 15.2 L9.3 23.8 Z" fill="#D97757" stroke="#2B2622" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  pause: `<svg viewBox="0 0 30 30"><path d="M9.5 7 L9.8 23.5" stroke="#2B2622" stroke-width="4.2" stroke-linecap="round"/><path d="M19.8 6.6 L20.2 23.2" stroke="#2B2622" stroke-width="4.2" stroke-linecap="round"/></svg>`,
  prev: `<svg viewBox="0 0 30 30"><path d="M8 7 L8.4 23" stroke="#2B2622" stroke-width="2.8" stroke-linecap="round"/><path d="M22.5 7.5 L11.5 15 L22.8 22.6 Z" fill="none" stroke="#2B2622" stroke-width="2.6" stroke-linejoin="round"/></svg>`,
  next: `<svg viewBox="0 0 30 30"><path d="M22 7 L21.6 23" stroke="#2B2622" stroke-width="2.8" stroke-linecap="round"/><path d="M7.5 7.5 L18.5 15 L7.2 22.6 Z" fill="none" stroke="#2B2622" stroke-width="2.6" stroke-linejoin="round"/></svg>`,
  fs: `<svg viewBox="0 0 30 30"><path d="M5.5 11 L5.8 5.8 L11 5.5 M19 5.6 L24.3 5.8 L24.5 11 M24.4 19 L24.2 24.3 L19 24.5 M11 24.4 L5.7 24.2 L5.5 19" fill="none" stroke="#2B2622" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  fsx: `<svg viewBox="0 0 30 30"><path d="M11 5.5 L11.2 11 L5.6 11.2 M19 5.6 L18.8 11 L24.4 11.2 M24.4 18.8 L19 19 L19.2 24.5 M5.6 18.9 L11 19 L11.1 24.4" fill="none" stroke="#2B2622" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
const bPlay = $('#bPlay'), bPrev = $('#bPrev'), bNext = $('#bNext'), bFs = $('#bFs');
bPrev.innerHTML = ICON.prev; bNext.innerHTML = ICON.next;
function syncButtons() {
  bPlay.innerHTML = playing ? ICON.pause : ICON.play; bPlay.title = playing ? '暂停（空格）' : '播放（空格）';
  bFs.innerHTML = document.fullscreenElement ? ICON.fsx : ICON.fs;
  document.body.classList.toggle('paused', !playing);
}
let barW = 600;
function drawBar() {
  barW = bar.clientWidth || 600;
  seed(77);
  const uw = ui.clientWidth || 900, uh = ui.clientHeight || 70;
  $('#ui .frame').setAttribute('viewBox', `0 0 ${uw} ${uh}`);
  $('#ui .frame').style.cssText = `position:absolute;left:0;top:0;width:${uw}px;height:${uh}px;z-index:2`;
  $('#ui .frame').innerHTML = `<path d="${rr(5, 5, uw - 10, uh - 10, 1.6, 24)}" fill="none" stroke="#2B2622" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>`;
  const w = barW, y = 30, pts = [];
  for (let x = 6; x <= w - 6; x += 18) pts.push([x, y + Math.sin(x / 34) * 2.6]);
  const d = smooth(pts);
  let ticks = '';
  SCENES.forEach(s => { const x = 6 + (w - 12) * s.start / TOTAL; ticks += `<circle cx="${f1(x)}" cy="${f1(y + Math.sin(x / 34) * 2.6)}" r="3.1" fill="#FAF7F0" stroke="#9A8F84" stroke-width="1.6"/>`; });
  bar.querySelector('svg').innerHTML = `
    <path d="${d}" fill="none" stroke="#CDBFAE" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 7"/>
    <g id="barPlayed"><path d="${d}" fill="none" stroke="#D97757" stroke-width="4.2" stroke-linecap="round"/></g>
    ${ticks}
    <g id="barBoat"><path d="M-14 -2 L14 -2 L9 7 L-9 7 Z" fill="#FFFDF8" stroke="#2B2622" stroke-width="2.2" stroke-linejoin="round"/><path d="M0 -2 L0 -24" stroke="#2B2622" stroke-width="2.2" stroke-linecap="round"/><path d="M1.5 -22 L13 -6 L1.5 -6 Z" fill="#D97757" stroke="#2B2622" stroke-width="2" stroke-linejoin="round"/></g>`;
  updateBar();
}
function updateBar() {
  const u = T / TOTAL, x = 6 + (barW - 12) * u;
  const pl = $('#barPlayed'), bt = $('#barBoat');
  if (pl) pl.style.clipPath = `inset(0 ${Math.max(0, barW - x)}px 0 0)`;
  if (bt) bt.setAttribute('transform', `translate(${f1(x)} ${f1(30 + Math.sin(x / 34) * 2.6 - 4)}) rotate(${f1(Math.sin(T * 2.2) * 4)})`);
  const fmt = v => `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, '0')}`;
  $('#ui .time').textContent = `${fmt(T)} / ${fmt(TOTAL)}`;
}
let dragging = false;
function barSeek(e) {
  const r = bar.getBoundingClientRect(), u = clamp((e.clientX - r.left - 6) / (r.width - 12));
  T = u * TOTAL * .99999; render();
}
bar.addEventListener('pointerdown', e => { dragging = true; bar.classList.add('drag'); bar.setPointerCapture(e.pointerId); barSeek(e); e.stopPropagation(); });
bar.addEventListener('pointermove', e => {
  const r = bar.getBoundingClientRect(), u = clamp((e.clientX - r.left - 6) / (r.width - 12));
  const s = SCENES[sceneAt(u * TOTAL)];
  tip.textContent = s.title; tip.style.left = (e.clientX - r.left) + 'px';
  if (dragging) barSeek(e);
});
const endDrag = () => { dragging = false; bar.classList.remove('drag'); last = performance.now(); };
bar.addEventListener('pointerup', endDrag); bar.addEventListener('pointercancel', endDrag);
ui.addEventListener('click', e => e.stopPropagation());
ui.addEventListener('pointerdown', e => e.stopPropagation());

function flash(kind) {
  const f = $('#flash');
  f.innerHTML = `<svg viewBox="0 0 120 120"><path d="${rblob(60, 60, 52, 50, .05)}" fill="rgba(250,247,240,.92)" stroke="#2B2622" stroke-width="3"/>${kind === 'pause' ? '<path d="M47 38 L47.6 82 M73 37.5 L73.4 81.5" stroke="#2B2622" stroke-width="9" stroke-linecap="round"/>' : '<path d="M46 35 L86 60 L46.5 85 Z" fill="#D97757" stroke="#2B2622" stroke-width="4" stroke-linejoin="round"/>'}</svg>`;
  f.classList.add('show'); clearTimeout(flash.t); flash.t = setTimeout(() => f.classList.remove('show'), 380);
}
function toggle() { playing = !playing; last = performance.now(); syncButtons(); flash(playing ? 'play' : 'pause'); wake(); }
function go(i) { i = (i + SCENES.length) % SCENES.length; T = SCENES[i].start + .001; render(); wake(); }
function toggleFs() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)?.call(document.documentElement);
}
bPlay.onclick = toggle; bPrev.onclick = () => go(sceneAt(T) - 1); bNext.onclick = () => go(sceneAt(T) + 1); bFs.onclick = toggleFs;
document.addEventListener('fullscreenchange', () => { syncButtons(); setTimeout(fit, 60); });
document.addEventListener('click', () => toggle());
document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); go(sceneAt(T) + 1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); go(sceneAt(T) - 1); }
  else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFs(); }
});
let idleT = 0;
function wake() {
  document.body.classList.remove('idle'); clearTimeout(idleT);
  idleT = setTimeout(() => { if (!dragging && !ui.matches(':hover')) document.body.classList.add('idle'); else wake(); }, 2600);
}
['mousemove', 'pointerdown', 'touchstart', 'keydown'].forEach(ev => document.addEventListener(ev, wake, { passive: true }));

/* ============ 启动 ============ */
async function boot() {
  const g = paperTexture();
  document.documentElement.style.setProperty('--grain', `url(${g})`);
  try {
    await Promise.all(['WenKai', 'WenKaiM', 'KuaiLe', 'Caveat'].map(f => document.fonts.load(`40px "${f}"`, '驾驭AI航海a1')));
    await document.fonts.ready;
  } catch (e) { }
  const host = $('#scenes');
  SCENES.forEach((s, i) => {
    const sec = document.createElement('section');
    sec.className = 'scene'; sec.id = s.id; sec.innerHTML = s.html; host.appendChild(sec); s.root = sec;
  });
  SCENES.forEach(s => {
    s.root.classList.add('on');
    s.tl = new TL();
    try { decorate(s.root); s.setup(s.root, s.tl); } catch (err) { console.error(s.id, err); window.__errs.push(s.id + ' setup: ' + err.message); }
    s.root.classList.remove('on'); s.vis = false;
  });
  const q = new URLSearchParams(location.search);
  if (q.has('t')) { T = +q.get('t') || 0; playing = q.has('play'); }
  syncButtons(); fit(); render(); wake();
  addEventListener('resize', fit);
  last = performance.now(); requestAnimationFrame(frame);
  window.__ready = true;
}
window.__seek = t => { playing = false; T = clamp(t, 0, TOTAL - .001); render(); syncButtons(); document.body.classList.add('idle', 'shot'); };
window.__scenes = () => SCENES.map(s => ({ id: s.id, title: s.title, start: s.start, dur: s.dur }));
boot();
