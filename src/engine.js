'use strict';
/* ============ 基础 ============ */
const W = 1920, H = 1080;
const C = {
  paper: '#FAF9F5', paper2: '#F5F0E8', paper3: '#EFE7DA',
  ink: '#2B2622', ink2: '#5E554C', ink3: '#9A8F84',
  tc: '#D97757', tcD: '#B85C3E', tcL: '#F2C6B1', tcLL: '#F8E1D5',
  sage: '#9DB59A', sageD: '#6E8E6B', sageL: '#DCE7D6',
  sky: '#8FB9D9', skyD: '#5C8DB4', skyL: '#D7E7F2',
  butter: '#F3D27E', butterL: '#F9EBBF', blush: '#F2AE9A', sand: '#E8DCC6'
};
const NS = 'http://www.w3.org/2000/svg';
const clamp = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
const lerp = (a, b, p) => a + (b - a) * p;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
let _R = rng(20261013);
const rnd = (a = -1, b = 1) => a + (b - a) * _R();
const seed = s => { _R = rng(s); };

/* ============ 缓动 ============ */
const E = {
  lin: p => p,
  in: p => p * p * p,
  out: p => 1 - Math.pow(1 - p, 3),
  out5: p => 1 - Math.pow(1 - p, 5),
  io: p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  sine: p => -(Math.cos(Math.PI * p) - 1) / 2,
  back: p => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
  back2: p => { const c1 = 3.2, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
  elastic: p => p === 0 ? 0 : p === 1 ? 1 : Math.pow(2, -9 * p) * Math.sin((p * 10 - .75) * (2 * Math.PI / 3)) + 1,
  bounce: p => { const n = 7.5625, d = 2.75; if (p < 1 / d) return n * p * p; if (p < 2 / d) return n * (p -= 1.5 / d) * p + .75; if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + .9375; return n * (p -= 2.625 / d) * p + .984375; },
  step: n => p => Math.floor(p * n) / n
};
/* 阻尼弹簧：t 秒后的位移比例（0→1） */
const spring = (t, k = 9, z = .35) => t <= 0 ? 0 : 1 - Math.exp(-z * k * t) * Math.cos(k * Math.sqrt(1 - z * z) * t);

/* ============ 手绘路径 ============ */
function bez(pts, closed) {
  const n = pts.length, segs = [];
  const g = i => closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)];
  const m = closed ? n : n - 1;
  for (let i = 0; i < m; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    segs.push([p1, [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6], p2]);
  }
  return segs;
}
const f1 = v => Math.round(v * 10) / 10;
function segsD(segs, closed) {
  if (!segs.length) return '';
  let d = `M${f1(segs[0][0][0])} ${f1(segs[0][0][1])}`;
  for (const s of segs) d += `C${f1(s[1][0])} ${f1(s[1][1])} ${f1(s[2][0])} ${f1(s[2][1])} ${f1(s[3][0])} ${f1(s[3][1])}`;
  return d + (closed ? 'Z' : '');
}
const smooth = (pts, closed) => segsD(bez(pts, closed), closed);
/* 抖动直线 */
function rl(x1, y1, x2, y2, j = 1.4) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  const k = j * (0.6 + L / 260);
  const pts = [[x1 + rnd() * j, y1 + rnd() * j]];
  [.33, .67].forEach(t => { const o = rnd() * k; pts.push([x1 + dx * t + nx * o, y1 + dy * t + ny * o]); });
  pts.push([x2 + rnd() * j, y2 + rnd() * j]);
  return smooth(pts);
}
/* 抖动折线 / 曲线 */
function rp(pts, j = 1.5, closed = false) { return smooth(pts.map(p => [p[0] + rnd() * j, p[1] + rnd() * j]), closed); }
/* 手绘圈：起笔与收笔错开 */
function rc(cx, cy, rx, ry = rx, o = {}) {
  const n = o.n || 16, turn = o.turn || 1.1, j = o.j ?? .035, a0 = o.a0 ?? rnd(-2.6, -1.8);
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = a0 + t * Math.PI * 2 * turn, s = 1 + rnd() * j + (t - .5) * (o.spiral ?? .06);
    pts.push([cx + Math.cos(a) * rx * s, cy + Math.sin(a) * ry * s]);
  }
  return smooth(pts);
}
/* 闭合手绘形（填色用） */
function rblob(cx, cy, rx, ry = rx, j = .06, n = 12) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, s = 1 + rnd() * j; pts.push([cx + Math.cos(a) * rx * s, cy + Math.sin(a) * ry * s]); }
  return smooth(pts, true);
}
/* 手绘矩形：一笔画完并略过头 */
function rr(x, y, w, h, j = 2, rad = 10) {
  const r = Math.min(rad, w / 3, h / 3), q = r * .3;
  const P = [[x + r, y], [x + w * .5, y + rnd() * j], [x + w - r, y], [x + w - q, y + q], [x + w, y + r], [x + w + rnd() * j, y + h * .5], [x + w, y + h - r], [x + w - q, y + h - q], [x + w - r, y + h], [x + w * .5, y + h + rnd() * j], [x + r, y + h], [x + q, y + h - q], [x, y + h - r], [x + rnd() * j, y + h * .5], [x, y + r], [x + q, y + q], [x + r + 6, y - 1.5]];
  return rp(P, j * .6);
}
/* 闭合矩形填色 */
function rrf(x, y, w, h, j = 3, rad = 12) {
  const r = Math.min(rad, w / 3, h / 3), q = r * .3;
  return rp([[x + r, y], [x + w / 2, y], [x + w - r, y], [x + w - q, y + q], [x + w, y + r], [x + w, y + h / 2], [x + w, y + h - r], [x + w - q, y + h - q], [x + w - r, y + h], [x + w / 2, y + h], [x + r, y + h], [x + q, y + h - q], [x, y + h - r], [x, y + h / 2], [x, y + r], [x + q, y + q]], j, true);
}
/* 波浪线 */
function wave(x1, x2, y, amp = 8, len = 60, ph = 0, j = 0) {
  const pts = [];
  for (let x = x1; x <= x2 + .1; x += len / 4) pts.push([x, y + Math.sin((x - x1) / len * Math.PI * 2 + ph) * amp + (j ? rnd() * j : 0)]);
  return smooth(pts);
}
/* 箭头头部 */
function head(x, y, ang, s = 16) {
  const a1 = ang + Math.PI - .5, a2 = ang + Math.PI + .5;
  return `M${f1(x + Math.cos(a1) * s)} ${f1(y + Math.sin(a1) * s)}L${f1(x)} ${f1(y)}L${f1(x + Math.cos(a2) * s * 1.05)} ${f1(y + Math.sin(a2) * s * 1.05)}`;
}
function arrowEnd(pts, s = 16) { const a = pts[pts.length - 2], b = pts[pts.length - 1]; return head(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), s); }
/* 阴影排线 */
function hatch(x, y, w, h, gap = 11, j = 1.2) {
  let d = '';
  for (let k = -h; k < w; k += gap) {
    const x1 = x + k, y1 = y + h, x2 = x + k + h, y2 = y;
    const cx1 = Math.max(x1, x), cy1 = y1 - (cx1 - x1), cx2 = Math.min(x2, x + w), cy2 = y2 + (x2 - cx2);
    if (cx2 - cx1 > 4) d += `M${f1(cx1 + rnd() * j)} ${f1(cy1 + rnd() * j)}L${f1(cx2 + rnd() * j)} ${f1(cy2 + rnd() * j)}`;
  }
  return d;
}
/* 沿路径采样，用于运动 */
function track(pts, closed) {
  const segs = bez(pts, closed), S = [];
  let L = 0, prev = null;
  for (const s of segs) for (let i = 0; i <= 30; i++) {
    const t = i / 30, u = 1 - t;
    const x = u * u * u * s[0][0] + 3 * u * u * t * s[1][0] + 3 * u * t * t * s[2][0] + t * t * t * s[3][0];
    const y = u * u * u * s[0][1] + 3 * u * u * t * s[1][1] + 3 * u * t * t * s[2][1] + t * t * t * s[3][1];
    if (prev) L += Math.hypot(x - prev[0], y - prev[1]);
    S.push([x, y, L]); prev = [x, y];
  }
  return {
    d: segsD(segs, closed), L,
    at(u) {
      const l = clamp(u) * L; let lo = 0, hi = S.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (S[m][2] < l) lo = m; else hi = m; }
      const a = S[lo], b = S[hi], k = b[2] - a[2] ? (l - a[2]) / (b[2] - a[2]) : 0;
      return { x: lerp(a[0], b[0], k), y: lerp(a[1], b[1], k), a: Math.atan2(b[1] - a[1], b[0] - a[0]) };
    }
  };
}

/* ============ SVG 字符串助手 ============ */
/* p(d, 类名, 额外属性)  默认带 pathLength=1 以便描线动画 */
const p = (d, cls = 'ink', ex = '') => `<path d="${d}" pathLength="1" class="${cls}" ${ex}/>`;
const pf = (d, cls, ex = '') => `<path d="${d}" class="${cls}" ${ex}/>`;

/* ============ 时间线 ============ */
const TF = ['x', 'y', 's', 'sx', 'sy', 'r', 'rx', 'ry', 'z', 'skx'];
class TL {
  constructor() { this.map = new Map(); this.fns = []; this.loops = []; }
  /* props: {o:[0,1], y:[40,0], draw:[0,1], clip:[0,1] ...}  */
  add(el, t, d, props, ease = E.out) {
    if (!el) { console.warn('TL: missing el', props); return this; }
    if (el.length !== undefined && !(el instanceof Element)) { Array.from(el).forEach(e => this.add(e, t, d, props, ease)); return this; }
    let rec = this.map.get(el);
    if (!rec && el instanceof SVGElement && el.hasAttribute('transform') && Object.keys(props).some(k => TF.includes(k))) {
      const w = document.createElementNS(NS, 'g');
      w.setAttribute('transform', el.getAttribute('transform')); el.removeAttribute('transform');
      el.parentNode.insertBefore(w, el); w.appendChild(el);
    }
    if (!rec) {
      rec = { tw: {}, el };
      this.map.set(el, rec);
    }
    if (el instanceof SVGElement && !rec.tb && Object.keys(props).some(k => TF.includes(k))) { rec.tb = 1; el.style.transformBox = 'fill-box'; if (!el.style.transformOrigin) el.style.transformOrigin = 'center'; }
    for (const k in props) {
      if (k === 'origin') { el.style.transformOrigin = props[k]; continue; }
      (rec.tw[k] = rec.tw[k] || []).push({ t, d: Math.max(d, 1e-4), a: props[k][0], b: props[k][1], e: ease });
      rec.tw[k].sort((u, v) => u.t - v.t);
    }
    if (props.draw) { el.style.strokeDasharray = '1 1'; }
    return this;
  }
  /* 依次出现 */
  stag(els, t, d, gap, props, ease) { Array.from(els).forEach((e, i) => this.add(e, t + i * gap, d, props, ease)); return this; }
  fn(t, d, cb, ease = E.lin) { this.fns.push({ t, d: Math.max(d, 1e-4), cb, e: ease }); return this; }
  loop(cb) { this.loops.push(cb); return this; }
  apply(T) {
    for (const rec of this.map.values()) {
      const v = {};
      for (const k in rec.tw) {
        const L = rec.tw[k]; let w = L[0];
        for (let i = L.length - 1; i >= 0; i--) if (L[i].t <= T) { w = L[i]; break; }
        const pr = w.e(clamp((T - w.t) / w.d));
        v[k] = w.a + (w.b - w.a) * pr;
      }
      flush(rec.el, v);
    }
    for (const f of this.fns) f.cb(f.e(clamp((T - f.t) / f.d)), T);
    for (const l of this.loops) l(T);
  }
}
function flush(el, v) {
  const st = el.style;
  let tr = '';
  if ('x' in v || 'y' in v || 'z' in v) tr += `translate3d(${(v.x || 0).toFixed(2)}px,${(v.y || 0).toFixed(2)}px,${(v.z || 0).toFixed(2)}px) `;
  if ('r' in v) tr += `rotate(${v.r.toFixed(2)}deg) `;
  if ('rx' in v) tr += `rotateX(${v.rx.toFixed(2)}deg) `;
  if ('ry' in v) tr += `rotateY(${v.ry.toFixed(2)}deg) `;
  if ('skx' in v) tr += `skewX(${v.skx.toFixed(2)}deg) `;
  if ('s' in v) tr += `scale(${v.s.toFixed(4)}) `;
  if ('sx' in v || 'sy' in v) tr += `scale(${(v.sx ?? 1).toFixed(4)},${(v.sy ?? 1).toFixed(4)}) `;
  if (tr) st.transform = tr;
  if ('o' in v) st.opacity = v.o.toFixed(3);
  if ('draw' in v) { st.strokeDashoffset = (1 - v.draw).toFixed(4); st.visibility = v.draw < .003 ? 'hidden' : 'visible'; }
  if ('clip' in v) st.clipPath = `inset(-20px ${((1 - v.clip) * 100).toFixed(2)}% -20px -20px)`;
  if ('clipY' in v) st.clipPath = `inset(-20px -20px ${((1 - v.clipY) * 100).toFixed(2)}% -20px)`;
  if ('clipU' in v) st.clipPath = `inset(${((1 - v.clipU) * 100).toFixed(2)}% -20px -20px -20px)`;
  if ('hl' in v) st.setProperty('--p', v.hl.toFixed(3));
  if ('blur' in v) st.filter = v.blur > .05 ? `blur(${v.blur.toFixed(2)}px)` : 'none';
}

/* 一组描线按顺序画出：返回结束时间 */
function drawSeq(tl, els, t, total, ease = E.io) {
  els = Array.from(els); if (!els.length) return t;
  const d = total / els.length;
  els.forEach((e, i) => tl.add(e, t + i * d * .85, d * 1.15, { draw: [0, 1] }, ease));
  return t + total;
}

/* ============ 文字工具 ============ */
/* 把元素的文字拆成单字 span（保留 <b> 等内联标签） */
function splitChars(el, cls = 'ch') {
  const walk = n => {
    Array.from(n.childNodes).forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const ch of c.textContent) {
          if (ch === ' ' || ch === '\n') { frag.appendChild(document.createTextNode(ch)); continue; }
          const s = document.createElement('span'); s.className = cls; s.textContent = ch; frag.appendChild(s);
        }
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && !c.classList.contains('nosplit')) walk(c);
    });
  };
  walk(el);
  return $$('.' + cls, el);
}
/* 相对某祖先的位置 */
function offIn(el, anc) {
  let x = 0, y = 0, e = el;
  while (e && e !== anc) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/* 手绘装饰：给 .deco-circle / .deco-ul / .deco-box / .deco-strike 元素加覆盖层 SVG */
function decorate(root) {
  $$('[data-deco]', root).forEach(el => {
    if (el.querySelector(':scope > svg.deco')) return;
    const kind = el.dataset.deco, col = el.dataset.col || 'tc';
    const w = el.offsetWidth, h = el.offsetHeight; if (!w) return;
    const pad = kind === 'circle' ? 16 : 10;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'deco'); svg.setAttribute('width', w + pad * 2); svg.setAttribute('height', h + pad * 2);
    svg.style.cssText = `position:absolute;left:${-pad}px;top:${-pad}px;overflow:visible;pointer-events:none`;
    let d = '';
    if (kind === 'circle') d = rc(pad + w / 2, pad + h / 2, w / 2 + 10, h / 2 + 8, { j: .03, turn: 1.12 });
    else if (kind === 'ul') d = rp([[pad - 4, pad + h + 2], [pad + w * .35, pad + h + 4], [pad + w * .7, pad + h + 1], [pad + w + 6, pad + h + 3]], 1.2);
    else if (kind === 'ul2') d = rp([[pad - 4, pad + h], [pad + w * .5, pad + h + 4], [pad + w + 4, pad + h], [pad + w * .4, pad + h + 9], [pad + w * .1, pad + h + 10]], 1);
    else if (kind === 'box') d = rr(pad - 6, pad - 4, w + 12, h + 8, 2, 8);
    else if (kind === 'strike') d = rp([[pad - 6, pad + h * .55], [pad + w * .5, pad + h * .45], [pad + w + 6, pad + h * .5]], 1.5);
    svg.innerHTML = `<path d="${d}" pathLength="1" class="deco-p s-${col}"/>`;
    el.appendChild(svg);
  });
}

/* ============ 吉祥物：戴纸船帽的小陶土团子 ============ */
function mascotSVG(id, o = {}) {
  seed(o.seed || 11);
  const body = rblob(0, -60, 47, 43, .035, 14);
  const hat = o.hat || 'boat';
  let hatSvg = '';
  if (hat === 'boat') hatSvg = `<g class="m-hat"><path d="M-36,-94 L36,-94 L26,-82 L-26,-82 Z" fill="${C.skyL}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M-28,-94 L0,-128 L28,-94 Z" fill="#FFFDF8" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M0,-128 L0,-142" stroke="${C.ink}" stroke-width="2.5" stroke-linecap="round"/><path d="M0,-142 L15,-137 L0,-132" fill="${C.tc}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/><path d="M-10,-104 L10,-104" stroke="${C.ink3}" stroke-width="2" stroke-linecap="round"/></g>`;
  else if (hat === 'cap') hatSvg = `<g class="m-hat"><path d="M-44,-104 L0,-120 L44,-104 L0,-90 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-24,-98 L-24,-86 Q0,-78 24,-86 L24,-98" fill="${C.ink}" /><path d="M36,-106 L40,-80" stroke="${C.butter}" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="-78" r="4" fill="${C.butter}"/></g>`;
  else if (hat === 'pencil') hatSvg = `<g class="m-hat"><path d="M-8,-100 L-8,-136 L8,-136 L8,-100 Z" fill="${C.butter}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-8,-100 L0,-88 L8,-100Z" fill="#F7E3C4" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-8,-136 L8,-136 L8,-144 L-8,-144Z" fill="${C.blush}" stroke="${C.ink}" stroke-width="2.5"/></g>`;
  else if (hat === 'wrench') hatSvg = `<g class="m-hat"><path d="M-30,-96 Q0,-130 30,-96 Z" fill="${C.butter}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M-40,-96 L40,-96" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/><path d="M0,-124 L0,-110" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/></g>`;
  else if (hat === 'mega') hatSvg = `<g class="m-hat"><path d="M-22,-98 Q0,-118 22,-98" fill="none" stroke="${C.ink}" stroke-width="3"/><circle cx="-22" cy="-96" r="7" fill="${C.sky}" stroke="${C.ink}" stroke-width="2.5"/><circle cx="22" cy="-96" r="7" fill="${C.sky}" stroke="${C.ink}" stroke-width="2.5"/></g>`;
  else if (hat === 'none') hatSvg = '';
  const fill = o.fill || C.tc;
  return `<g id="${id}" class="mascot">
   <g class="m-legL"><path d="M-17,-24 L-19,-6" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><ellipse cx="-21" cy="-4" rx="11" ry="5.5" fill="${C.ink}"/></g>
   <g class="m-legR"><path d="M17,-24 L19,-6" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><ellipse cx="21" cy="-4" rx="11" ry="5.5" fill="${C.ink}"/></g>
   <g class="m-bod">
    <g class="m-armL"><path d="M-40,-56 Q-56,-48 -60,-32" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/></g>
    <g class="m-armR"><path d="M40,-56 Q56,-48 60,-32" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/></g>
    <path d="${body}" fill="${C.ink}" transform="translate(3,4)" opacity=".12"/>
    <path d="${body}" fill="${fill}" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-44" rx="25" ry="16" fill="#FFF6EE" opacity=".45"/>
    <g class="m-face">
     <g class="m-eyes"><ellipse cx="-15" cy="-66" rx="5" ry="6.5" fill="${C.ink}"/><ellipse cx="15" cy="-66" rx="5" ry="6.5" fill="${C.ink}"/><circle cx="-13.5" cy="-68.5" r="1.8" fill="#fff"/><circle cx="16.5" cy="-68.5" r="1.8" fill="#fff"/></g>
     <ellipse cx="-29" cy="-53" rx="7.5" ry="4.2" fill="${C.blush}" opacity=".95"/><ellipse cx="29" cy="-53" rx="7.5" ry="4.2" fill="${C.blush}" opacity=".95"/>
     <path class="m-mouth" d="M-7,-55 Q-3.5,-50 0,-55 Q3.5,-50 7,-55" fill="none" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round"/>
    </g>
    ${hatSvg}
   </g>
  </g>`;
}
/* 吉祥物姿态控制 */
function mascotCtl(g) {
  const q = s => g.querySelector(s);
  const legL = q('.m-legL'), legR = q('.m-legR'), armL = q('.m-armL'), armR = q('.m-armR'), bod = q('.m-bod'), eyes = q('.m-eyes'), face = q('.m-face');
  return {
    g,
    set(o) {
      const s = o.s ?? 1, fl = o.flip ? -1 : 1;
      g.setAttribute('transform', `translate(${f1(o.x ?? 0)} ${f1(o.y ?? 0)}) rotate(${f1(o.rot ?? 0)}) scale(${s * fl} ${s})`);
      const ph = o.walk;
      let lL = o.legL ?? 0, lR = o.legR ?? 0, aL = o.armL ?? 0, aR = o.armR ?? 0, bob = o.bob ?? 0, sq = o.squash ?? 1;
      if (ph !== undefined) { const sw = Math.sin(ph); lL += sw * 26; lR -= sw * 26; aL -= sw * 22; aR += sw * 22; bob += -Math.abs(Math.cos(ph)) * 5; }
      legL.setAttribute('transform', `rotate(${f1(lL)} -17 -24)`);
      legR.setAttribute('transform', `rotate(${f1(lR)} 17 -24)`);
      armL.setAttribute('transform', `rotate(${f1(aL)} -40 -56)`);
      armR.setAttribute('transform', `rotate(${f1(aR)} 40 -56)`);
      bod.setAttribute('transform', `translate(0 ${f1(bob)}) translate(0 -20) scale(${f1(2 - sq)} ${sq}) translate(0 20)`);
      const T = o.t ?? 0, bl = (T % 3.7) < .12 ? .12 : 1;
      eyes.setAttribute('transform', `translate(${f1(o.lookX ?? 0)} ${f1(-66 + (o.lookY ?? 0))}) scale(1 ${bl}) translate(0 66)`);
      if (o.faceX !== undefined) face.setAttribute('transform', `translate(${f1(o.faceX)} 0)`);
    }
  };
}

/* ============ 纸张颗粒 ============ */
function paperTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 420;
  const x = c.getContext('2d'), R = rng(5);
  const img = x.createImageData(420, 420);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = R(); const g = v < .5 ? 90 : 255;
    img.data[i] = g; img.data[i + 1] = g * .94; img.data[i + 2] = g * .86; img.data[i + 3] = Math.floor(Math.pow(R(), 3) * 26);
  }
  x.putImageData(img, 0, 0);
  x.globalAlpha = .07; x.strokeStyle = '#8a7356'; x.lineWidth = .7;
  for (let i = 0; i < 110; i++) { const a = R() * 420, b = R() * 420, l = 4 + R() * 14, an = R() * 6.28; x.beginPath(); x.moveTo(a, b); x.quadraticCurveTo(a + Math.cos(an) * l * .5 + R() * 3, b + Math.sin(an) * l * .5, a + Math.cos(an) * l, b + Math.sin(an) * l); x.stroke(); }
  x.globalAlpha = .05; x.fillStyle = '#7a6040';
  for (let i = 0; i < 70; i++) { x.beginPath(); x.arc(R() * 420, R() * 420, R() * 1.4 + .3, 0, 7); x.fill(); }
  return c.toDataURL();
}
