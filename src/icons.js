'use strict';
/* 手绘图标：以 (0,0) 为中心、约 90px 大小。描线带 pathLength 便于一笔笔画出 */
const IC = {
  bulb(c = 'f-butterL') {
    return pf(rblob(0, -12, 27, 29, .04), c, 'transform="translate(3,3)"') +
      p(rc(0, -12, 26, 28, { turn: 1.04, j: .02 })) + p(rl(-11, 18, 11, 18)) + p(rl(-9, 26, 9, 26)) + p(rl(-5, 33, 5, 33)) +
      p(rp([[-9, -8], [-4, 4], [0, -6], [4, 4], [9, -8]], .8), 's-tc');
  },
  chat(c = 'f-skyL') {
    return pf(rrf(-36, -28, 76, 50, 2), c, 'transform="translate(3,3)"') + p(rr(-38, -30, 76, 50, 1.5, 12)) + p(rp([[-14, 20], [-22, 36], [2, 20]], 1)) +
      p(rc(-16, -5, 3, 3, { n: 6 }), 'ink4') + p(rc(0, -5, 3, 3, { n: 6 }), 'ink4') + p(rc(16, -5, 3, 3, { n: 6 }), 'ink4');
  },
  rune(c = 'f-tcL') {
    const pts = []; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 - 1.57; pts.push([Math.cos(a) * 36, Math.sin(a) * 38]); }
    return pf(smooth(pts.map(q => [q[0] + 3, q[1] + 3]), true), c) + p(rp(pts.concat([pts[0]]), 1.2)) +
      p(rp([[0, -20], [0, 20]], .8), 's-tcD') + p(rp([[-14, -6], [0, 4], [14, -6]], .8), 's-tcD') + p(rp([[-10, 12], [10, 12]], .6), 's-tcD');
  },
  robot(c = 'f-sageL') {
    return pf(rrf(-30, -24, 62, 48, 2), c, 'transform="translate(3,3)"') + p(rr(-32, -26, 64, 50, 1.5, 12)) + p(rl(0, -26, 0, -40)) + p(rc(0, -44, 5, 5, { n: 8 })) +
      p(rc(-13, -4, 6, 6, { n: 8 }), 'ink4') + p(rc(13, -4, 6, 6, { n: 8 }), 'ink4') + p(rp([[-10, 12], [0, 15], [10, 12]], .6)) + p(rl(-32, 0, -42, 0)) + p(rl(32, 0, 42, 0));
  },
  pen(c = 'f-tcL') {
    return pf('M-28,30 L18,-16 L30,-4 L-16,42 Z', c) + p(rp([[-30, 40], [-24, 24], [18, -18], [28, -8], [-14, 34], [-30, 40]], .6)) + p(rl(10, -10, 22, 2)) + p(rp([[-36, 46], [-20, 50], [0, 44], [20, 50]], 1), 's-tc');
  },
  phone(c = 'f-skyL') {
    return pf(rrf(-22, -38, 48, 80, 2), c, 'transform="translate(3,3)"') + p(rr(-24, -40, 48, 80, 1.2, 10)) + p(rl(-14, -26, 14, -26), 'ink2') + p(rr(-14, -18, 28, 22, 1, 4), 'ink2') + p(rl(-14, 12, 8, 12), 'ink2') + p(rl(-14, 20, 14, 20), 'ink2') + p(rc(0, 32, 3, 3, { n: 6 }));
  },
  easel(c = 'f-butterL') {
    return pf(rrf(-40, -34, 80, 52, 2), c, 'transform="translate(3,3)"') + p(rr(-42, -36, 84, 54, 1.5, 6)) + p(rl(-24, 18, -34, 44)) + p(rl(24, 18, 34, 44)) + p(rl(0, 18, 0, 38)) +
      p(rl(-26, 6, -26, -6), 's-tc') + p(rl(-12, 6, -12, -16), 's-tc') + p(rl(2, 6, 2, -22), 's-tc') + p(rl(16, 6, 16, -12), 's-sage');
  },
  lighthouse(c = 'f-tcL') {
    return pf('M-16,40 L-10,-18 L10,-18 L16,40 Z', 'f-paper') + pf('M-13,16 L-11.5,0 L11.5,0 L13,16 Z', c) + pf('M-15,40 L-14,30 L14,30 L15,40 Z', c) +
      p(rp([[-17, 40], [-10, -18], [10, -18], [17, 40], [-17, 40]], .6)) + p(rr(-13, -34, 26, 16, .8, 3)) + p(rp([[-16, -34], [0, -46], [16, -34]], .6)) +
      p(rl(16, -26, 40, -32), 's-butter') + p(rl(16, -24, 40, -18), 's-butter') + p(rl(-16, -26, -40, -32), 's-butter') + p(rl(-16, -24, -40, -18), 's-butter');
  },
  mic(c = 'f-skyL') {
    return pf(rrf(-12, -38, 26, 46, 1, 13), c, 'transform="translate(2,2)"') + p(rr(-13, -40, 26, 46, .8, 13)) + p(rp([[-24, -6], [-22, 10], [0, 20], [22, 10], [24, -6]], .8)) + p(rl(0, 20, 0, 34)) + p(rl(-14, 36, 14, 36));
  },
  doc(c = 'f-paper') {
    return pf(rrf(-26, -34, 52, 68, 2), c, 'transform="translate(3,3)"') + p(rr(-28, -36, 54, 70, 1.4, 6)) + p(rl(-16, -20, 14, -20), 'ink2') + p(rl(-16, -8, 16, -8), 'ink2') + p(rl(-16, 4, 10, 4), 'ink2') + p(rl(-16, 16, 14, 16), 'ink2');
  },
  wand() {
    return p(rl(-30, 30, 14, -14), 'ink4') + p(rp([[22, -38], [26, -26], [38, -22], [26, -18], [22, -6], [18, -18], [6, -22], [18, -26], [22, -38]], .5), 's-tc');
  },
  globe(c = 'f-skyL') {
    return pf(rblob(3, 3, 38, 38, .03), c) + p(rc(0, 0, 38, 38, { turn: 1.05, j: .02 })) + p(rc(0, 0, 16, 38, { turn: 1.02, j: .02 }), 'ink2') + p(rl(-38, 0, 38, 0), 'ink2') + p(rp([[-33, -18], [0, -14], [33, -18]], .5), 'ink2') + p(rp([[-33, 18], [0, 14], [33, 18]], .5), 'ink2');
  },
  magnifier(c = 'f-butterL') {
    return pf(rblob(-6, -6, 24, 24, .03), c) + p(rc(-8, -8, 24, 24, { turn: 1.06 })) + p(rl(10, 10, 32, 32), 'ink4');
  },
  check(cls = 's-sage') { return p(rp([[-14, 0], [-4, 12], [16, -14]], .8), cls); },
  cross(cls = 's-tc') { return p(rl(-14, -14, 14, 14), cls) + p(rl(14, -14, -14, 14), cls); },
  star(r = 14, cls = 's-butter') {
    const pts = []; for (let i = 0; i <= 10; i++) { const a = i / 10 * 6.283 - 1.57, rr = i % 2 ? r * .45 : r; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    return p(rp(pts, .5), cls);
  },
  spark(r = 14, cls = 's-tc') { return p(rl(0, -r, 0, r), cls) + p(rl(-r, 0, r, 0), cls) + p(rl(-r * .6, -r * .6, r * .6, r * .6), cls + '" style="stroke-width:2'); },
  book(c = 'f-sageL') {
    return pf('M0,-22 Q-22,-32 -40,-24 L-40,26 Q-22,18 0,28 Q22,18 40,26 L40,-24 Q22,-32 0,-22Z', c) + p(rp([[0, -22], [-20, -30], [-40, -24], [-40, 26], [-20, 18], [0, 28]], .6)) + p(rp([[0, -22], [20, -30], [40, -24], [40, 26], [20, 18], [0, 28]], .6)) + p(rl(0, -22, 0, 28)) + p(rl(-30, -10, -10, -6), 'ink2') + p(rl(-30, 4, -10, 6), 'ink2') + p(rl(10, -6, 30, -10), 'ink2');
  },
  flow(c = 'f-skyL') {
    return pf(rrf(-40, -30, 80, 60, 2), c, 'opacity=".7"') + p(rr(-34, -18, 20, 16, .6, 3), 'ink2') + p(rr(14, -18, 20, 16, .6, 3), 'ink2') + p(rr(-10, 8, 20, 16, .6, 3), 'ink2') + p(rl(-14, -10, 12, -10), 'ink2') + p(rp([[24, -2], [20, 10], [12, 14]], .4), 'ink2') + p(rp([[-24, -2], [-20, 10], [-12, 14]], .4), 'ink2');
  },
  toolbox(c = 'f-tcL') {
    return pf(rrf(-38, -10, 76, 42, 2), c) + p(rr(-40, -12, 80, 44, 1.2, 6)) + p(rp([[-14, -12], [-14, -26], [14, -26], [14, -12]], .6)) + p(rl(-40, 4, 40, 4), 'ink2') + p(rr(-6, 0, 12, 10, .4, 2), 'ink2');
  },
  plug(c = 'f-butterL') {
    return pf(rrf(-20, -16, 40, 34, 2, 8), c) + p(rr(-22, -18, 44, 36, 1, 8)) + p(rl(-9, -18, -9, -34)) + p(rl(9, -18, 9, -34)) + p(rp([[0, 18], [0, 30], [-14, 40], [-30, 36]], .8));
  },
  shelf(c = 'f-sageL') {
    let s = p(rr(-40, -36, 80, 72, 1.2, 4)) + p(rl(-40, 0, 40, 0));
    [[-34, -32, 10, 30, 'f-tcL'], [-22, -30, 10, 28, 'f-skyL'], [-10, -32, 12, 30, 'f-butterL'], [6, -28, 10, 26, 'f-sageL'], [-34, 4, 12, 30, 'f-skyL'], [-20, 6, 10, 28, 'f-butterL'], [-6, 4, 10, 30, 'f-tcL'], [10, 8, 22, 26, 'f-sageL']].forEach(b => { s += pf(rrf(b[0], b[1], b[2], b[3], .4, 2), b[4]) + p(rr(b[0], b[1], b[2], b[3], .3, 2), 'ink2'); });
    return s;
  },
  ruler(c = 'f-butterL') {
    let s = pf('M-40,-12 L40,-12 L40,12 L-40,12Z', c) + p(rr(-40, -12, 80, 24, .8, 3));
    for (let i = -32; i <= 32; i += 8) s += p(rl(i, -12, i, i % 16 === 0 ? 0 : -5), 'ink2');
    return s + p(rp([[-10, 26], [-2, 34], [14, 18]], .5), 's-sage');
  },
  brain(c = 'f-tcLL') {
    const d = smooth([[-40, 4], [-38, -18], [-22, -34], [0, -36], [22, -34], [38, -18], [40, 4], [30, 24], [8, 28], [-12, 28], [-32, 24]], true);
    return pf(d, c, 'transform="translate(3,3)"') + p(d) + p(rl(0, -34, 0, 26), 'ink2') + p(rp([[-28, -14], [-16, -8], [-20, 6], [-8, 12]], .5), 'ink2') + p(rp([[28, -14], [16, -8], [20, 6], [8, 12]], .5), 'ink2');
  },
  mouth(c = 'f-tcL') {
    return pf('M-30,0 Q0,-14 30,0 Q0,30 -30,0Z', c) + p(rp([[-32, 0], [-14, -10], [0, -6], [14, -10], [32, 0], [14, 18], [0, 22], [-14, 18], [-32, 0]], .6)) + p(rl(-24, 2, 24, 2), 'ink2');
  },
  fan(c = 'f-butterL') {
    let s = pf('M0,30 L-36,-22 Q0,-44 36,-22 Z', c) + p(rp([[0, 30], [-36, -22], [-18, -34], [0, -38], [18, -34], [36, -22], [0, 30]], .8));
    for (let i = -2; i <= 2; i++) s += p(rl(0, 30, i * 13, -30 - Math.abs(i) * -3), 'ink2');
    return s + p(rl(0, 30, 0, 44));
  },
  warn(c = 'f-butterL') {
    return pf('M0,-26 L28,22 L-28,22Z', c) + p(rp([[0, -28], [30, 22], [-30, 22], [0, -28]], .8)) + p(rl(0, -10, 0, 6), 'ink4') + p(rc(0, 14, 2, 2, { n: 6 }), 'ink4');
  },
  lock(c = 'f-sageL') {
    return pf(rrf(-22, -6, 44, 36, 1, 6), c) + p(rr(-24, -8, 48, 38, 1, 6)) + p(rp([[-14, -8], [-14, -24], [0, -32], [14, -24], [14, -8]], .6)) + p(rl(0, 6, 0, 16), 'ink4');
  },
  people(c = 'f-skyL') {
    return pf(rblob(-14, 16, 18, 14), c) + pf(rblob(16, 18, 16, 12), 'f-tcLL') + p(rc(-14, -12, 11, 11)) + p(rp([[-34, 32], [-30, 8], [-14, 2], [2, 8], [6, 32]], .6)) + p(rc(16, -6, 9, 9)) + p(rp([[4, 32], [8, 14], [18, 10], [30, 14], [34, 32]], .6));
  },
  chart(c = 'f-sageL') {
    return pf(rrf(-38, -30, 76, 60, 2), 'f-paper') + p(rr(-40, -32, 80, 64, 1, 6)) + pf('M-28,20 L-28,6 L-16,6 L-16,20Z', c) + pf('M-10,20 L-10,-6 L2,-6 L2,20Z', 'f-skyL') + pf('M8,20 L8,-18 L20,-18 L20,20Z', 'f-tcL') + p(rl(-32, 20, 32, 20), 'ink2') + p(rp([[-26, -4], [-6, -14], [10, -10], [28, -24]], .5), 's-tc');
  },
  mail(c = 'f-skyL') { return pf(rrf(-32, -20, 64, 42, 1.5), c) + p(rr(-34, -22, 68, 44, 1, 4)) + p(rp([[-34, -20], [0, 6], [34, -20]], .6)); },
  table(c = 'f-sageL') {
    let s = pf(rrf(-34, -30, 68, 60, 1.5, 4), 'f-paper') + p(rr(-36, -32, 72, 64, 1, 4)) + pf('M-36,-32 L36,-32 L36,-16 L-36,-16Z', c, 'opacity=".8"');
    s += p(rl(-36, -16, 36, -16), 'ink2') + p(rl(-36, 0, 36, 0), 'ink2') + p(rl(-36, 16, 36, 16), 'ink2') + p(rl(-12, -32, -12, 32), 'ink2') + p(rl(12, -32, 12, 32), 'ink2');
    return s;
  },
  heart(c = 'f-tcL') { const d = 'M0,18 C-30,-2 -24,-26 -8,-24 C-2,-23 0,-18 0,-14 C0,-18 2,-23 8,-24 C24,-26 30,-2 0,18Z'; return pf(d, c, 'transform="translate(2,2)"') + p(d); },
  scale(c = 'f-butterL') { return p(rl(0, -30, 0, 30)) + p(rl(-30, -20, 30, -20)) + p(rl(-16, 30, 16, 30)) + pf('M-40,0 Q-30,12 -20,0Z', c) + pf('M20,0 Q30,12 40,0Z', c) + p(rp([[-30, -20], [-40, 0], [-20, 0], [-30, -20]], .4), 'ink2') + p(rp([[30, -20], [20, 0], [40, 0], [30, -20]], .4), 'ink2'); },
  calc(c = 'f-butterL') {
    let s = pf(rrf(-24, -34, 50, 70, 1.5, 6), c) + p(rr(-26, -36, 52, 72, 1, 6)) + p(rr(-16, -26, 32, 14, .5, 2), 'ink2');
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) s += p(rc(-12 + k * 12, 0 + r * 11, 2.6, 2.6, { n: 6 }), 'ink2');
    return s;
  },
  rocket(c = 'f-tcL') {
    return pf('M0,-40 Q18,-20 14,16 L-14,16 Q-18,-20 0,-40Z', 'f-paper') + p(rp([[0, -40], [14, -22], [14, 16], [-14, 16], [-14, -22], [0, -40]], .6)) + p(rc(0, -12, 6, 6, { n: 8 }), 's-sky') +
      pf('M-14,4 L-26,22 L-14,16Z', c) + pf('M14,4 L26,22 L14,16Z', c) + p(rp([[-6, 20], [0, 36], [6, 20]], .6), 's-tc');
  },
  snail(c = 'f-butterL') {
    return pf(rblob(4, -8, 22, 20), c) + p(rc(4, -8, 22, 20, { turn: 1.02 })) + p(rp([[4, -8], [10, -12], [12, -4], [4, 0], [-4, -8], [4, -18], [18, -12]], .4), 'ink2') + p(rp([[-30, 14], [-20, -6], [-14, -14], [-10, 12], [30, 14], [-30, 14]], .8)) + p(rl(-22, -6, -28, -20), 'ink2') + p(rl(-16, -10, -18, -24), 'ink2');
  }
};

/* 小船（可装吉祥物） */
function boatSVG(id, mid, mascotOpts) {
  seed(31);
  return `<g id="${id}">
   <g class="b-sail" >
    <path d="M6,-214 L6,-30 L128,-30 Z" fill="#FFFDF8" stroke="${C.ink}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M6,-150 L84,-60" stroke="${C.tc}" stroke-width="9" opacity=".75"/><path d="M6,-112 L52,-58" stroke="${C.tc}" stroke-width="9" opacity=".75"/>
    <path d="M-6,-190 L-6,-30 L-96,-30 Z" fill="${C.tcLL}" stroke="${C.ink}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="${hatch(-90, -150, 80, 110, 12)}" class="hatch" clip-path="url(#jib-${id})"/>
    <clipPath id="jib-${id}"><path d="M-6,-190 L-6,-30 L-96,-30 Z"/></clipPath>
   </g>
   <path d="M0,-30 L0,-236" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
   <path d="M0,-236 L30,-226 L0,-216" fill="${C.tc}" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>
   ${mascotSVG(mid, mascotOpts || { seed: 5 })}
   <path d="M-128,-26 L130,-26 L96,26 L-92,26 Z" fill="#FFFDF8" stroke="${C.ink}" stroke-width="3.4" stroke-linejoin="round"/>
   <path d="M-118,-12 L120,-12" stroke="${C.tc}" stroke-width="5" stroke-linecap="round" opacity=".85"/>
   <path d="${hatch(-90, 0, 180, 24, 13)}" class="hatch" clip-path="url(#hull-${id})"/>
   <clipPath id="hull-${id}"><path d="M-128,-26 L130,-26 L96,26 L-92,26 Z"/></clipPath>
   <circle cx="-60" cy="2" r="6" fill="${C.skyL}" stroke="${C.ink}" stroke-width="2.4"/><circle cx="-30" cy="2" r="6" fill="${C.skyL}" stroke="${C.ink}" stroke-width="2.4"/>
  </g>`;
}
function cloudD(x, y, s) {
  return `M${x} ${y} a${18 * s} ${18 * s} 0 0 1 ${20 * s} ${-26 * s} a${28 * s} ${28 * s} 0 0 1 ${50 * s} ${-12 * s} a${22 * s} ${22 * s} 0 0 1 ${38 * s} ${14 * s} a${16 * s} ${16 * s} 0 0 1 ${10 * s} ${24 * s} Z`;
}
const gullD = (f) => `M-16,0 Q-8,${f1(-10 * f)} 0,0 Q8,${f1(-10 * f)} 16,0`;

const SCENES = window.SCENES = [];
const scene = o => SCENES.push(o);
/* 章节抬头 */
const hdr = (no, cn, title, top = 84) => `<div class="abs kicker hd-k" style="left:122px;top:${top}px">Part ${no}<b>${cn}</b></div><div class="abs title hd-t" style="left:118px;top:${top + 40}px">${title}</div>`;
function hdrIn(tl, root, t = 0) {
  tl.add($('.hd-k', root), t, .6, { o: [0, 1], x: [-20, 0] });
  tl.add($('.hd-t', root), t + .15, .9, { clip: [0, 1], o: [0, 1] }, E.io);
}
