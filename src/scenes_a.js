'use strict';
/* ===================================================================
   S1 封面 —— 一支钢笔把标题一笔一笔写出来，再顺手画下划线、圈重点
   =================================================================== */
scene({
  id: 's01', title: '封面 · 起航', dur: 9, noChrome: true,
  html: `
  <svg class="full" id="c1"></svg>
  <div class="abs c-kick" style="left:138px;top:226px;font-size:26px;letter-spacing:.34em;color:var(--ink2)">AI 应用分享会 · 全量会议记录</div>
  <div class="abs cute c-t1" style="left:128px;top:292px;font-size:112px;line-height:1.05;white-space:nowrap">驾驭 AI 应用的</div>
  <div class="abs cute c-t2" style="left:118px;top:432px;font-size:176px;line-height:1.05;color:var(--tc);white-space:nowrap;text-shadow:5px 6px 0 rgba(43,38,34,.10)">大航海时代</div>
  <div class="abs c-sub" style="left:140px;top:688px;font-size:42px;white-space:nowrap">每个金服人都能成为「<span class="c-key tcD" style="font-weight:700">AI+超级个体</span>」</div>
  <div class="abs c-tags" style="left:140px;top:806px;display:flex;gap:26px;font-size:25px;color:var(--ink2)">
    <span data-deco="box" data-col="ink">约 2 小时</span><span data-deco="box" data-col="sage">主题分享</span><span data-deco="box" data-col="sky">工具演示</span><span data-deco="box" data-col="butter">互动讨论</span><span data-deco="box" data-col="tc">现场创作</span>
  </div>
  <div class="abs c-pen" style="left:0;top:0;width:10px;height:10px">
    <svg width="10" height="10" style="overflow:visible"><g transform="rotate(32)">
      <ellipse cx="6" cy="-60" rx="20" ry="90" fill="${C.ink}" opacity=".08" transform="translate(16 30)"/>
      <path d="M0,0 L-10,-30 L10,-30 Z" fill="${C.butter}" stroke="${C.ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M0,-4 L0,-22" stroke="${C.ink}" stroke-width="1.8"/>
      <path d="M-12,-30 L12,-30 L13,-66 L-13,-66 Z" fill="${C.ink2}" stroke="${C.ink}" stroke-width="2.6" stroke-linejoin="round"/>
      <rect x="-15" y="-206" width="30" height="142" rx="11" fill="${C.tc}" stroke="${C.ink}" stroke-width="2.8"/>
      <rect x="-15" y="-160" width="30" height="9" fill="${C.butter}" stroke="${C.ink}" stroke-width="2.2"/>
      <path d="M8,-196 L8,-120" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/>
    </g></svg>
  </div>`,
  setup(root, tl) {
    seed(101);
    const svg = $('#c1', root);
    /* —— 右侧插画 —— */
    let s = '';
    s += `<g class="c-wash">${pf(rblob(1480, 560, 400, 330, .05, 14), 'f-skyL', 'opacity=".55"')}${pf(rblob(1530, 610, 300, 240, .08, 12), 'f-paper2', 'opacity=".5"')}</g>`;
    s += `<g class="c-sun" style="transform-origin:1640px 318px">${pf(rblob(1646, 324, 104, 104, .04), 'f-butter', 'opacity=".9" class="c-sunf"')}${p(rc(1640, 318, 104, 104, { turn: 1.08 }), 'ink', 'id="c-sunl"')}`;
    for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, r1 = 128, r2 = i % 2 ? 150 : 166; s += p(rl(1640 + Math.cos(a) * r1, 318 + Math.sin(a) * r1, 1640 + Math.cos(a) * r2, 318 + Math.sin(a) * r2, .8), 's-butter c-ray'); }
    s += `</g>`;
    s += `<g class="c-cl1">${pf(cloudD(1150, 300, 1.25), 'f-paper')}${p(cloudD(1150, 300, 1.25), 'ink2 c-cld')}</g>`;
    s += `<g class="c-cl2">${pf(cloudD(1700, 470, .9), 'f-paper')}${p(cloudD(1700, 470, .9), 'ink2 c-cld')}</g>`;
    s += `<g id="c-gulls"><path class="ink2 c-g" /><path class="ink2 c-g"/><path class="ink2 c-g"/></g>`;
    s += `<g id="c-seaB">${pf(rblob(1480, 860, 420, 120, .04, 14), 'f-skyL', 'opacity=".8"')}</g>`;
    s += `<g id="c-wb"><path class="s-sky c-w"/><path class="s-sky c-w" style="opacity:.6"/></g>`;
    s += `<g id="c-boatW"><g id="c-boatB">${boatSVG('c-boat', 'c-m')}</g></g>`;
    s += `<g id="c-wf"><path class="s-sky c-w"/><path class="s-sage c-w"/><path class="s-sky c-w" style="opacity:.7"/><path class="soft c-w"/></g>`;
    /* 罗盘 */
    s += `<g class="c-comp" style="transform-origin:1182px 196px">${p(rc(1182, 196, 44, 44, { turn: 1.06 }), 'ink2')}${p(rc(1182, 196, 30, 30, { turn: 1.03 }), 'soft')}
      ${pf('M1182,148 L1192,196 L1182,244 L1172,196Z', 'f-tcL')}${p('M1182,148 L1192,196 L1182,244 L1172,196Z', 'ink2')}${p(rl(1134, 196, 1230, 196, .4), 'soft')}</g>`;
    s += `<text x="1172" y="132" class="latin" font-size="26" fill="${C.ink3}" id="c-N">N</text>`;
    /* 写字用的装饰 */
    s += `<path id="c-ul" class="s-tc" pathLength="1" style="stroke-width:7"/><path id="c-circ" class="s-tc" pathLength="1" style="stroke-width:3.6"/>`;
    s += `<path id="c-spark1" class="s-butter" pathLength="1"/><path id="c-spark2" class="s-butter" pathLength="1"/>`;
    svg.innerHTML = s;

    /* —— 标题拆字，按字计算钢笔轨迹 —— */
    const chars = [...splitChars($('.c-t1', root)), ...splitChars($('.c-t2', root))];
    const boxes = chars.map(c => offIn(c, root));
    const segs = []; let t0 = .55;
    chars.forEach((ch, i) => {
      const b = boxes[i], d = /[A-Z]/.test(ch.textContent) ? .2 : .3;
      const st = t0;
      tl.fn(st, d, pr => {
        const X1 = -10 + pr * 150;
        ch.style.clipPath = pr >= 1 ? 'none' : `polygon(-60% -20%, ${X1}% -20%, ${X1 - 40}% 120%, -60% 120%)`;
        ch.style.opacity = pr > 0 ? 1 : 0;
      });
      segs.push({ t0: st, t1: st + d, f: pr => ({ x: b.x + b.w * (.12 + .78 * pr), y: b.y + b.h * (.3 + .42 * (.5 + .5 * Math.sin(pr * Math.PI * 5.2))) }) });
      t0 += d + .02;
    });
    /* 下划线 */
    const t2 = offIn($('.c-t2', root), root);
    const ulPts = [[t2.x + 14, t2.y + t2.h + 4], [t2.x + t2.w * .3, t2.y + t2.h + 12], [t2.x + t2.w * .62, t2.y + t2.h + 2], [t2.x + t2.w + 4, t2.y + t2.h - 8]];
    const ul = track(ulPts); $('#c-ul', root).setAttribute('d', ul.d);
    const ulT = t0 + .15;
    tl.add($('#c-ul', root), ulT, .7, { draw: [0, 1] }, E.io);
    segs.push({ t0: ulT, t1: ulT + .7, f: pr => ul.at(E.io(pr)) });
    /* 副标题 + 圈出 “AI+超级个体” */
    tl.add($('.c-sub', root), ulT + .4, .8, { o: [0, 1], y: [16, 0] });
    const k = offIn($('.c-key', root), root);
    const cp = []; const a0 = -2.4, n = 18;
    for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI * 2.14, sc = 1 + (i / n - .5) * .07; cp.push([k.x + k.w / 2 + Math.cos(a) * (k.w / 2 + 22) * sc, k.y + k.h / 2 + 2 + Math.sin(a) * (k.h / 2 + 12) * sc]); }
    const circ = track(cp); $('#c-circ', root).setAttribute('d', circ.d);
    const cT = ulT + 1.3;
    tl.add($('#c-circ', root), cT, .85, { draw: [0, 1] }, E.io);
    segs.push({ t0: cT, t1: cT + .85, f: pr => circ.at(E.io(pr)) });
    /* 小星星 */
    $('#c-spark1', root).setAttribute('d', rp([[k.x + k.w + 34, k.y - 18], [k.x + k.w + 48, k.y - 34]], .5));
    $('#c-spark2', root).setAttribute('d', rp([[k.x + k.w + 40, k.y + 2], [k.x + k.w + 62, k.y - 4]], .5));
    tl.add($$('#c-spark1,#c-spark2', root), cT + .85, .3, { draw: [0, 1] });
    const sT = cT + .95;
    segs.push({ t0: sT + .3, t1: sT + .3, f: () => ({ x: k.x + k.w + 60, y: k.y - 4 }) });
    const pen = $('.c-pen', root);
    const penAt = T => {
      if (T <= segs[0].t0) { const q = E.out(clamp((T - 0) / segs[0].t0)); const a = segs[0].f(0); return { x: lerp(a.x + 420, a.x, q), y: lerp(a.y - 380, a.y, q), up: 1 - q, o: q }; }
      for (let i = 0; i < segs.length; i++) {
        const sg = segs[i];
        if (T >= sg.t0 && T <= sg.t1) { const r = sg.f((T - sg.t0) / (sg.t1 - sg.t0 || 1)); return { ...r, up: 0, o: 1 }; }
        const nx = segs[i + 1];
        if (nx && T > sg.t1 && T < nx.t0) { const q = E.io((T - sg.t1) / (nx.t0 - sg.t1)), a = sg.f(1), b = nx.f(0); return { x: lerp(a.x, b.x, q), y: lerp(a.y, b.y, q) - Math.sin(q * Math.PI) * 26, up: Math.sin(q * Math.PI), o: 1 }; }
      }
      const L = segs[segs.length - 1], a = L.f(1), q = E.in(clamp((T - L.t1) / .9));
      return { x: a.x + q * 700, y: a.y - q * 520, up: q, o: 1 - q };
    };
    tl.loop(T => { const P = penAt(T); pen.style.transform = `translate(${P.x.toFixed(1)}px,${(P.y - P.up * 6).toFixed(1)}px) rotate(${(P.up * -6).toFixed(2)}deg)`; pen.style.opacity = P.o.toFixed(3); });

    /* 顶部小字、标签 */
    tl.add($('.c-kick', root), .2, .8, { o: [0, 1], x: [-24, 0] });
    tl.stag($$('.c-tags > span', root), sT + .2, .55, .12, { o: [0, 1], s: [.5, 1], r: [-8, 0] }, E.back);
    tl.loop(T => { $$('.c-tags .deco-p', root).forEach((e, i) => { const q = clamp((T - sT - .35 - i * .12) / .5); e.style.strokeDasharray = '1 1'; e.style.strokeDashoffset = 1 - E.io(q); e.style.visibility = q > 0 ? 'visible' : 'hidden'; }); });

    /* 插画进场 */
    tl.add($('.c-wash', root), .1, 1.4, { o: [0, 1], s: [.82, 1] }, E.out5);
    tl.add($('#c-sunl', root), .5, 1.1, { draw: [0, 1] }, E.io);
    tl.add($('.c-sunf', root), 1.1, .8, { o: [0, .9] });
    drawSeq(tl, $$('.c-ray', root), 1.3, 1.2);
    tl.add($$('.c-cld', root), .9, 1.2, { draw: [0, 1] }, E.io);
    tl.add($$('.c-cl1 path.f-paper,.c-cl2 path.f-paper', root), 1.5, .6, { o: [0, 1] });
    tl.add($('#c-seaB', root), .6, 1, { o: [0, 1], sx: [.4, 1] }, E.out);
    tl.add($('#c-wb', root), .7, 1.4, { clip: [0, 1] }, E.io);
    tl.add($('#c-wf', root), .9, 1.4, { clip: [0, 1] }, E.io);
    tl.add($('#c-boatW', root), 1.2, 1.3, { y: [140, 0], o: [0, 1] }, E.back);
    tl.add($('#c-boat .b-sail', root), 1.9, 1, { sy: [0, 1], origin: '50% 100%' }, E.elastic);
    tl.add($('.c-comp', root), 1.8, 1, { o: [0, 1], r: [-120, 0], s: [.4, 1] }, E.back);
    tl.add($('#c-N', root), 2.4, .5, { o: [0, 1] });
    tl.add($('#c-gulls', root), 2.6, .8, { o: [0, 1] });
    const m = mascotCtl($('#c-m', root));
    const gulls = $$('.c-g', root), waves = $$('#c-wb .c-w, #c-wf .c-w', root);
    const wy = [742, 766, 792, 826, 862, 896], wx = [[1110, 1820], [1150, 1800], [1090, 1860], [1130, 1830], [1200, 1760], [1280, 1680]];
    tl.loop(T => {
      waves.forEach((w, i) => w.setAttribute('d', wave(wx[i][0], wx[i][1], wy[i], 6 + (i % 2) * 3, 70 + i * 8, T * (1.6 + i * .25) * (i % 2 ? -1 : 1))));
      $('#c-boatB', root).setAttribute('transform', `translate(1470 ${f1(758 + Math.sin(T * 1.7) * 7)}) rotate(${f1(Math.sin(T * 1.3) * 3.2)})`);
      const pop = E.back(clamp((T - 2.4) / .6));
      m.set({ x: -36, y: -14 + (1 - pop) * 70, s: .78, t: T, armR: T > 3.2 ? -120 + Math.sin(T * 9) * 24 : 0, armL: 10, lookX: 2 });
      $('.c-sun', root).style.transform = `rotate(${(T * 6).toFixed(2)}deg)`;
      $('.c-cl1', root).setAttribute('transform', `translate(${f1(Math.sin(T * .4) * 14)} 0)`);
      $('.c-cl2', root).setAttribute('transform', `translate(${f1(-T * 6)} 0)`);
      gulls.forEach((g, i) => { const f = Math.sin(T * 7 + i * 2); g.setAttribute('d', gullD(f)); g.setAttribute('transform', `translate(${f1(1260 + i * 70 + T * 14)} ${f1(420 + i * 28 + Math.sin(T * 1.2 + i) * 8)}) scale(${1 - i * .15})`); });
    });
  }
});

/* ===================================================================
   S2 会议航线 —— 帆船沿手绘地图航行，经过的岛屿依次插旗点亮
   =================================================================== */
scene({
  id: 's02', title: '本次航线', dur: 10,
  html: `${hdr('01', '会议概况', '本次航线：八个分享重点')}
  <svg class="full" id="m2"></svg>
  <div class="abs m-legend" style="left:1068px;top:112px;width:760px">
    <div class="body" style="font-size:25px"><span class="tcD" style="font-weight:700">核心命题</span>　每个金服人都能成为「<span class="hl tcl m-hl">AI+超级个体</span>」</div>
    <div class="small" style="margin-top:8px">会议方式　主题分享 · 工具演示 · 互动讨论 · 现场创作</div>
    <div class="small">时　　长　约 2 小时，含中场休息与实操演示</div>
  </div>
  <div class="m-labels"></div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(202);
    const isl = [
      ['AI认知', 300, 760, 'bulb'], ['提示词', 720, 772, 'chat'], ['Skill', 1140, 760, 'rune'], ['智能体', 1560, 772, 'robot'],
      ['文生文', 1600, 418, 'pen'], ['文生H5', 1180, 428, 'phone'], ['文生PPT', 760, 418, 'easel'], ['组织协同与风险边界', 330, 428, 'lighthouse']
    ];
    const route = track([[60, 975], [190, 920], [300, 900], [510, 884], [720, 912], [930, 890], [1140, 906], [1350, 884], [1560, 908], [1745, 870], [1840, 760], [1810, 640], [1640, 586], [1400, 564], [1180, 586], [970, 560], [760, 578], [550, 560], [330, 590], [150, 610]]);
    let s = `<defs><mask id="m2mask" maskUnits="userSpaceOnUse" x="-50" y="-50" width="2020" height="1180"><path d="${route.d}" pathLength="1" fill="none" stroke="#fff" stroke-width="16" id="m2rm"/></mask></defs>`;
    /* 海面纹 */
    for (let i = 0; i < 26; i++) { const x = 140 + (i * 271) % 1700, y = 300 + (i * 157) % 700; s += p(wave(x, x + 46, y, 4, 24, 0), 'soft m-tick', 'style="opacity:.55"'); }
    /* 罗盘 */
    s += `<g class="m-comp">${p(rc(120, 680, 52, 52, { turn: 1.06 }), 'ink2')}${pf('M120,622 L131,680 L120,738 L109,680Z', 'f-tcL')}${p('M120,622 L131,680 L120,738 L109,680Z', 'ink2')}${p(rl(62, 680, 178, 680, .4), 'soft')}<text x="111" y="610" class="latin" font-size="26" fill="${C.ink3}">N</text></g>`;
    /* 航线（虚线，被遮罩逐步显露） */
    s += `<path d="${route.d}" fill="none" stroke="${C.tc}" stroke-width="4" stroke-linecap="round" stroke-dasharray="3 13" mask="url(#m2mask)" opacity=".9"/>`;
    /* 岛屿 */
    isl.forEach((d, i) => {
      const [n, x, y, ic] = d;
      s += `<g class="m-isl" id="m-isl${i}">
        ${pf(rblob(x + 4, y + 8, 128, 46, .07, 14), 'f-butterL')}
        ${pf(rblob(x, y, 112, 38, .08, 14), 'f-sageL')}
        ${p(rblob(x, y, 112, 38, .08, 14), 'ink2')}
        <path d="${hatch(x - 90, y + 2, 180, 30, 12)}" class="hatch" clip-path="url(#mc${i})"/><clipPath id="mc${i}"><path d="${rblob(x, y, 108, 34, .02, 12)}"/></clipPath>
        <g transform="translate(${x - 4} ${y - 64}) scale(.95)"><g class="m-ic">${IC[ic]()}</g></g>
        <g class="m-flag" style="transform-origin:${x + 70}px ${y - 10}px">${p(rl(x + 70, y - 8, x + 70, y - 92, .5), 'ink2')}${pf(`M${x + 72},${y - 92} L${x + 120},${y - 78} L${x + 72},${y - 64}Z`, 'f-tc')}${p(`M${x + 72},${y - 92} L${x + 120},${y - 78} L${x + 72},${y - 64}`, 'ink2')}<text x="${x + 78}" y="${y - 70}" class="latin" font-size="20" fill="#fff">${String(i + 1).padStart(2, '0')}</text></g>
      </g>`;
    });
    /* 尾迹 + 船 */
    s += `<g id="m-wake">${'<path class="s-sky" style="stroke-width:2.6"/>'.repeat(8)}</g>`;
    s += `<g id="m-boatW"><g id="m-boatS">${boatSVG('m-boat', 'm-m')}</g></g>`;
    $('#m2', root).innerHTML = s;
    const lab = $('.m-labels', root);
    lab.innerHTML = isl.map((d, i) => `<div class="abs cute m-lab" style="left:${d[1] - 200}px;width:400px;top:${d[2] + 44}px;text-align:center;font-size:${d[0].length > 6 ? 27 : 31}px">${d[0]}</div>`).join('');
    /* 每座岛对应航线的位置 */
    const us = isl.map(d => { let best = 0, bd = 1e9; for (let k = 0; k <= 600; k++) { const q = route.at(k / 600), dd = Math.hypot(q.x - d[1], q.y - d[2] - 120) + (k / 600) * 0; if (dd < bd && Math.abs(q.x - d[1]) < 60) { bd = dd; best = k / 600; } } return best; });
    const T0 = .9, T1 = 9.2;
    const uAt = T => E.sine(clamp((T - T0) / (T1 - T0)));
    tl.add($$('.m-tick', root), .2, 1, { draw: [0, 1] });
    tl.add($('.m-comp', root), .3, 1, { o: [0, 1], r: [-90, 0] }, E.back);
    tl.add($('.m-legend', root), .4, .8, { o: [0, 1], y: [14, 0] });
    tl.add($('.m-hl', root), 1.2, .7, { hl: [0, 1] }, E.io);
    $$('.m-isl', root).forEach((g, i) => tl.add(g, .25 + i * .07, .7, { o: [0, 1], s: [.6, 1], y: [20, 0] }, E.back));
    $$('.m-lab', root).forEach(e => { e.style.opacity = .35; });
    tl.add($('#m-boatW', root), .4, .6, { o: [0, 1] });
    const m = mascotCtl($('#m-m', root));
    const wake = $$('#m-wake path', root), flags = $$('.m-flag', root), labs = $$('.m-lab', root), ics = $$('.m-ic', root);
    tl.loop(T => {
      const u = uAt(T);
      $('#m2rm', root).style.strokeDasharray = '1 1'; $('#m2rm', root).style.strokeDashoffset = (1 - u).toFixed(4);
      const P = route.at(u), P2 = route.at(Math.min(1, u + .004));
      const dir = P2.x >= P.x ? 1 : -1;
      const tilt = Math.sin(T * 2.4) * 3;
      $('#m-boatS', root).setAttribute('transform', `translate(${f1(P.x)} ${f1(P.y - 6 + Math.sin(T * 2) * 3)}) scale(${.4 * dir} .4) rotate(${f1(tilt)})`);
      m.set({ x: -36, y: -14, s: .78, t: T, armR: -40 + Math.sin(T * 3) * 10 });
      wake.forEach((w, k) => {
        const q = route.at(Math.max(0, u - .006 - k * .007)), o = u > .01 ? (1 - k / 8) * .8 : 0;
        w.setAttribute('d', `M${f1(q.x - 10)} ${f1(q.y + 14 + k)} q10 ${-4 - k} 20 0`); w.style.opacity = o.toFixed(2);
      });
      us.forEach((uu, i) => {
        const q = clamp((u - uu + .015) / .05);
        const e = E.back(q);
        flags[i].style.transform = `scale(${(.001 + e * .999).toFixed(3)})`; flags[i].style.opacity = q > 0 ? 1 : 0;
        labs[i].style.opacity = (.35 + .65 * q).toFixed(2);
        labs[i].style.color = q > .5 ? C.ink : C.ink3;
        ics[i].style.transform = `translateY(${(-Math.sin(q * Math.PI) * 14).toFixed(1)}px)`;
      });
    });
  }
});

/* ===================================================================
   S3 开场 —— 「AI 就是一个框」：打字机敲出金句，回答气泡弹性鼓起
   =================================================================== */
scene({
  id: 's03', title: '开场 · 一个框', dur: 9,
  html: `${hdr('02', '开场', '为什么谈「AI+超级个体」')}
  <div class="abs note o3-note" style="left:1130px;top:150px;width:700px;font-size:22px;transform:rotate(-1.2deg);color:var(--ink2)">
    <span class="tcD">✎ 背景：</span>AI 还无法被简单地「规模化、批发化」使用——许多人尚未真正理解 AI，也不清楚如何在平安环境中安全、有效地使用它。</div>
  <svg class="full" id="o3"></svg>
  <div class="abs o3-cap note" style="left:150px;top:268px;font-size:27px;color:var(--ink2)">最初感受：AI 看起来就是<span data-deco="circle" data-col="tc" class="o3-k1">一个框</span></div>
  <div class="abs o3-type cute" style="left:200px;top:440px;width:700px;font-size:68px;line-height:1.3;color:var(--ink)"><span class="o3-tx">你如果没有问题，<br>就没有答案。</span><span class="o3-caret" style="display:inline-block;width:5px;height:64px;background:var(--tc);vertical-align:-8px;margin-left:6px"></span></div>
  <div class="abs o3-b" style="left:1088px;top:300px"><div class="o3-bt" style="left:0">有的<b>荒谬</b></div></div>
  <div class="abs o3-b" style="left:1166px;top:470px"><div class="o3-bt">有的<b>有启发</b></div></div>
  <div class="abs o3-b" style="left:1088px;top:640px"><div class="o3-bt">有的<b>很强</b></div></div>
  <div class="abs o3-res" style="left:1530px;top:430px;width:330px">
    <div class="small">AI 可以回答任何问题，但——</div>
    <div class="h2" style="margin-top:10px;line-height:1.35">完全取决于<br><span class="tc" data-deco="ul2" data-col="tc">提问的方式</span></div></div>
  <div class="abs o3-bot" style="left:150px;top:842px;width:1650px">
    <div class="body" style="font-size:27px"><span class="o3-x">不必先懂<span data-deco="strike" data-col="ink">代码、模型或产品开发</span>；</span>
    <span class="o3-y">只要<span class="hl o3-hl">改变与 AI 对话和使用 AI 的方式</span>，就能显著扩展个人能力边界。</span></div>
    <div class="small o3-z" style="margin-top:14px">会议主题由「每个金服人都能成为超级个体」进一步展开为「驾驭 AI 应用的大航海时代」。</div>
  </div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(303);
    let s = '';
    s += `<g class="o3-box">${pf(rrf(146, 330, 820, 420, 3, 22), 'f-paper', 'transform="translate(8 9)" style="fill:${C.paper3}"')}${pf(rrf(140, 322, 820, 420, 3, 22), 'f-paper')}</g>`;
    s += p(rr(140, 322, 820, 420, 2.4, 22), 'ink4 o3-bl');
    s += p(rl(142, 384, 958, 382), 'ink2 o3-bl2');
    [0, 1, 2].forEach(i => { s += pf(rblob(178 + i * 32, 353, 9, 9), ['f-tc', 'f-butter', 'f-sage'][i], 'class="o3-dot"'); });
    s += p(rr(190, 664, 640, 52, 1.2, 26), 'ink2 o3-inp') + `<g class="o3-send">${pf(rblob(892, 690, 28, 28), 'f-tc')}${p(rp([[880, 690], [904, 690]], .4), 'ink', 'style="stroke:#fff"')}${p(rp([[894, 680], [904, 690], [894, 700]], .4), 'ink', 'style="stroke:#fff"')}</g>`;
    s += `<text x="214" y="698" font-size="24" fill="${C.ink3}" class="o3-ph">输入你的问题……</text>`;
    /* 回答气泡 */
    const bub = [[1088, 300, 'f-skyL'], [1166, 470, 'f-butterL'], [1088, 640, 'f-sageL']];
    bub.forEach((b, i) => {
      const [x, y, c] = b, w = 330, h = 106;
      s += `<g class="o3-bg" id="o3bg${i}">${pf(rrf(x + 6, y + 6, w, h, 3, 40), c)}${p(rr(x, y, w, h, 2, 40))}${p(rp([[x + 30, y + h - 12], [x - 18, y + h + 26], [x + 70, y + h - 2]], 1))}</g>`;
    });
    s += `<g class="o3-ic0" transform="translate(1370 352)">${p(rp([[0, 0], [8, -6], [12, 4], [2, 12], [-10, 4], [-4, -14], [14, -16], [22, 2]], .3), 's-sky')}</g>`;
    s += `<g class="o3-ic1" transform="translate(1458 520) scale(.62)">${IC.bulb()}</g>`;
    s += `<g class="o3-ic2" transform="translate(1372 692)">${IC.star(22)}</g>`;
    /* 大括号 + 箭头 */
    s += p(rp([[1478, 318], [1500, 330], [1500, 500], [1520, 522], [1500, 544], [1500, 720], [1478, 734]], 1.2), 'ink o3-br');
    /* 吉祥物从框后探头 */
    s += `<g id="o3-mW">${mascotSVG('o3-m', { seed: 9 })}</g>`;
    $('#o3', root).innerHTML = s;
    /* 让吉祥物在框的右上角探头 */
    $('#o3', root).insertBefore($('#o3-mW', root), $('#o3', root).firstChild);

    tl.add($('.o3-note', root), .3, .9, { o: [0, 1], y: [-10, 0] });
    tl.add($('.o3-box', root), .4, .7, { o: [0, 1] });
    tl.add($('.o3-bl', root), .3, 1.1, { draw: [0, 1] }, E.io);
    tl.add($('.o3-bl2', root), 1.0, .4, { draw: [0, 1] });
    tl.stag($$('.o3-dot', root), 1.1, .3, .08, { o: [0, 1], s: [0, 1] }, E.back2);
    tl.add($('.o3-inp', root), 1.2, .6, { draw: [0, 1] });
    tl.add($('.o3-send', root), 1.6, .4, { o: [0, 1], s: [0, 1] }, E.back2);
    tl.add($('.o3-ph', root), 1.6, .4, { o: [0, 1] });
    tl.add($('.o3-cap', root), .8, .8, { o: [0, 1], x: [-14, 0] });
    tl.add($('.o3-k1 .deco-p', root), 1.5, .7, { draw: [0, 1] }, E.io);
    /* 打字 */
    const tx = $('.o3-tx', root), chars = splitChars(tx, 'tch');
    const caret = $('.o3-caret', root);
    tl.fn(2.1, 2.4, pr => {
      const n = Math.round(pr * chars.length);
      chars.forEach((c, i) => { const v = i < n ? '' : 'none'; if (c.style.display !== v) c.style.display = v; });
    });
    tl.add($('.o3-ph', root), 2.0, .2, { o: [1, 0] });
    tl.loop(T => { caret.style.opacity = T < 1.9 ? 0 : (Math.floor(T * 2.4) % 2 ? .15 : 1); });
    /* 气泡 */
    $$('.o3-bg', root).forEach((g, i) => tl.add(g, 4.6 + i * .42, 1.1, { s: [0, 1], o: [0, 1], origin: '0% 100%' }, E.elastic));
    $$('.o3-b', root).forEach((g, i) => tl.add(g, 4.75 + i * .42, .5, { o: [0, 1], s: [.6, 1] }, E.back));
    tl.add($('.o3-ic0', root), 5.1, .4, { o: [0, 1] }); tl.add($('.o3-ic1', root), 5.5, .4, { o: [0, 1] }); tl.add($('.o3-ic2', root), 5.9, .5, { o: [0, 1], r: [-60, 0] }, E.back);
    tl.add($('.o3-br', root), 6.0, .7, { draw: [0, 1] }, E.io);
    tl.add($('.o3-res', root), 6.3, .7, { o: [0, 1], x: [-20, 0] });
    tl.add($('.o3-res .deco-p', root), 6.8, .6, { draw: [0, 1] });
    tl.add($('.o3-x', root), 6.9, .6, { o: [0, 1] });
    tl.add($('.o3-x .deco-p', root), 7.3, .4, { draw: [0, 1] });
    tl.add($('.o3-y', root), 7.4, .6, { o: [0, 1] });
    tl.add($('.o3-hl', root), 7.7, .8, { hl: [0, 1] }, E.io);
    tl.add($('.o3-z', root), 8.0, .6, { o: [0, 1] });
    const m = mascotCtl($('#o3-m', root));
    tl.loop(T => {
      const up = E.back(clamp((T - 1.3) / .7)) - E.in(clamp((T - 7.6) / .5)) * 0;
      m.set({ x: 900, y: 352 + (1 - up) * 140, s: .9, rot: 12, t: T, armL: -30, armR: -150 + Math.sin(T * 6) * 15, lookX: -3, lookY: Math.min(3, (T - 2) * 2) });
      $$('.o3-bg', root).forEach((g, i) => { if (T > 6) g.style.translate = `0 ${(Math.sin(T * 1.6 + i) * 3).toFixed(1)}px`; });
    });
  }
});

/* ===================================================================
   S4 AI 的正确定位 —— 天平真的倾斜：两种误解先后压秤，最后在中间平衡
   =================================================================== */
scene({
  id: 's04', title: '人机分工', dur: 11,
  html: `${hdr('03', 'AI 的正确定位', '人机分工，而不是两极化判断')}
  <svg class="full" id="b4"></svg>
  <div class="abs b4-ans cute" style="left:560px;top:218px;width:800px;text-align:center;font-size:44px">真正的答案不在两端，<span class="hl b4-hl tc">在中间</span></div>
  <div class="abs b4-nL small" style="left:400px;top:688px;width:360px;text-align:center"><b class="ink2c" style="color:var(--ink)">AI 万能论</b><br>认为 AI 什么都能干、会替代人，人可以不再工作</div>
  <div class="abs b4-nR small" style="left:1160px;top:688px;width:360px;text-align:center"><b style="color:var(--ink)">AI 无用论</b><br>认为 AI 不能解决实际问题，做出来不如人自己完成</div>
  <div class="abs b4-colL" style="left:84px;top:300px;width:300px">
    <div class="h3 sage" style="margin-bottom:8px">AI 擅长</div>
    ${['查资料', '消化信息', '总结会议', '写文案', '画图', '做 H5', '整理 PPT', '处理重复性任务'].map(t => `<div class="body b4-li" style="line-height:1.62"><span class="sage">●</span> ${t}</div>`).join('')}
  </div>
  <div class="abs b4-colR" style="left:1540px;top:300px;width:330px">
    <div class="h3 tc" style="margin-bottom:8px">人不可替代</div>
    ${[['责任与背书', 'AI 不能「背锅」'], ['真正的情绪价值', '理解和支持无法代替'], ['灰度判断', '结合背景、关系与组织语境'], ['原创方向与价值选择', '原始创意仍依赖人'], ['责任心与风险兜底', '确保不出错，由人保证']].map(t => `<div class="b4-ri" style="margin-bottom:9px"><div class="body" style="line-height:1.25"><span class="tc">●</span> ${t[0]}</div><div class="small" style="font-size:19px;padding-left:24px">${t[1]}</div></div>`).join('')}
  </div>
  <div class="abs b4-quote" style="left:330px;top:846px;width:1500px">
    <div class="h3" style="font-size:31px">“AI 像一个<span class="hl b4-hl2">很聪明、但没有社会阅历和工作经验</span>的毕业生。”</div>
    <div class="small b4-q2" style="margin-top:10px;font-size:22px">交代清楚时能完成任务；交代不清时做不出来，甚至会用看似合理的内容掩饰不确定性——<span class="tcD" data-deco="ul" data-col="tc">「一本正经地胡说八道」</span>。所以人必须保持判断、验证与验收。</div>
  </div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(404);
    const PX = 960, PY = 360, R = 380, HANG = 210;
    let s = '';
    s += `<g class="b4-stand">${pf(rblob(960, 790, 210, 22, .05), 'f-paper3')}${p(rp([[820, 792], [880, 762], [1040, 762], [1100, 792], [820, 792]], 1))}${p(rl(960, 380, 962, 764, .8), 'ink4')}${p(rl(946, 380, 948, 762, .6), 'ink2')}
      ${pf(rblob(960, PY, 18, 18), 'f-tc')}${p(rc(960, PY, 18, 18))}</g>`;
    s += `<g id="b4-ptr">${p(rp([[960, PY - 18], [960, PY - 92]], .4), 'ink2')}${pf(`M952,${PY - 86} L960,${PY - 108} L968,${PY - 86}Z`, 'f-tc')}</g>`;
    s += `<g id="b4-beam">${pf(`M${PX - R - 10},${PY - 8} L${PX + R + 10},${PY - 8} L${PX + R + 10},${PY + 8} L${PX - R - 10},${PY + 8}Z`, 'f-butterL')}${p(rr(PX - R - 12, PY - 9, 2 * R + 24, 18, 1, 9))}
      ${[-1, 1].map(k => p(rc(PX + k * R, PY, 7, 7, { n: 8 }), 'ink2')).join('')}</g>`;
    const pan = (id, c) => `<g id="${id}">
      ${p(rl(0, 0, -112, HANG, .8), 'ink2')}${p(rl(0, 0, 112, HANG, .8), 'ink2')}${p(rl(0, 0, 0, HANG - 6, .6), 'soft')}
      <g class="b4-pile"></g>
      ${pf(`M-130,${HANG} Q0,${HANG + 70} 130,${HANG} Z`, c)}${p(rp([[-134, HANG], [-70, HANG + 40], [0, HANG + 50], [70, HANG + 40], [134, HANG], [-134, HANG]], 1))}
      <path d="${hatch(-110, HANG + 6, 220, 38, 12)}" class="hatch" clip-path="url(#cp-${id})"/><clipPath id="cp-${id}"><path d="M-130,${HANG} Q0,${HANG + 70} 130,${HANG} Z"/></clipPath>
      <g class="b4-wt" transform="translate(0 ${HANG - 4})"><g class="b4-wtI">${pf(`M-92,0 L-74,-84 L74,-84 L92,0Z`, c === 'f-sageL' ? 'f-sky' : 'f-tcL')}${p(rp([[-92, 0], [-74, -84], [74, -84], [92, 0], [-92, 0]], 1))}${p(rc(0, -96, 14, 12, { n: 8 }))}</g></g>
    </g>`;
    s += pan('b4-panL', 'f-sageL') + pan('b4-panR', 'f-tcLL');
    s += `<g id="b4-mW">${mascotSVG('b4-m', { seed: 3, hat: 'cap' })}</g>`;
    $('#b4', root).innerHTML = s;
    /* 砝码文字 */
    const wl = document.createElementNS(NS, 'text'); wl.textContent = 'AI 万能论'; wl.setAttribute('x', 0); wl.setAttribute('y', -32); wl.setAttribute('text-anchor', 'middle'); wl.setAttribute('class', 'cute'); wl.setAttribute('font-size', 28); wl.setAttribute('fill', C.ink);
    $('#b4-panL .b4-wtI', root).appendChild(wl);
    const wr = wl.cloneNode(); wr.textContent = 'AI 无用论'; $('#b4-panR .b4-wtI', root).appendChild(wr);
    /* 小石子 */
    const pile = (g, n, c, sd) => { seed(sd); let h = ''; const pos = []; for (let i = 0; i < n; i++) { const row = i < 4 ? 0 : i < 7 ? 1 : 2, k = row === 0 ? i : row === 1 ? i - 4 : i - 7, cnt = row === 0 ? 4 : row === 1 ? 3 : 1; const x = (k - (cnt - 1) / 2) * 50 + rnd() * 4, y = HANG + 2 - row * 30; pos.push([x, y]); h += `<g class="b4-pb" transform="translate(${f1(x)} ${f1(y)})"><g>${pf(rblob(0, -14, 25, 15, .12, 9), c)}${p(rblob(0, -14, 25, 15, .12, 9), 'ink2')}</g></g>`; } g.innerHTML = h; return pos; };
    pile($('#b4-panL .b4-pile', root), 8, 'f-sage', 1);
    pile($('#b4-panR .b4-pile', root), 5, 'f-tc', 2);
    const pbL = $$('#b4-panL .b4-pb > g', root), pbR = $$('#b4-panR .b4-pb > g', root);
    /* 落下时刻 */
    const tL = 1.4, tR = 3.0, tList = 5.4;
    const dropsL = pbL.map((_, i) => tList + .25 + i * .32), dropsR = pbR.map((_, i) => tList + .41 + i * .5);
    const theta = T => {
      let th = 0;
      if (T >= tL) th = -15 * spring(T - tL - .35, 7, .32);
      if (T >= tR + .3) { const th0 = -15 * spring(tR - tL, 7, .32); th = th0 * (1 - spring(T - tR - .3, 5.5, .2)); }
      const imp = (ts, sg) => { const d = T - ts - .3; return d > 0 ? sg * 2.4 * Math.exp(-3.4 * d) * Math.sin(11 * d) : 0; };
      dropsL.forEach(t => th += imp(t, -1)); dropsR.forEach(t => th += imp(t, 1));
      return th;
    };
    tl.add($('.b4-stand', root), .2, .6, { o: [0, 1], y: [30, 0] }, E.back);
    tl.add($('#b4-beam', root), .4, .6, { o: [0, 1], sx: [.2, 1] }, E.back);
    tl.add($$('#b4-panL,#b4-panR', root), .6, .5, { o: [0, 1] });
    tl.add($('#b4-ptr', root), .8, .5, { o: [0, 1] });
    const wL = $('#b4-panL .b4-wtI', root), wR = $('#b4-panR .b4-wtI', root);
    tl.add(wL, tL, .5, { y: [-560, 0], o: [0, 1] }, E.in);
    tl.add(wR, tR, .5, { y: [-560, 0], o: [0, 1] }, E.in);
    tl.add(wL, tList - .3, .5, { s: [1, .2], o: [1, 0] }, E.in);
    tl.add(wR, tList - .3, .5, { s: [1, .2], o: [1, 0] }, E.in);
    tl.add($('.b4-nL', root), tL + .5, .6, { o: [0, 1], y: [10, 0] });
    tl.add($('.b4-nR', root), tR + .5, .6, { o: [0, 1], y: [10, 0] });
    tl.add($$('.b4-nL,.b4-nR', root), tList - .2, .5, { o: [1, .0] });
    tl.add($('.b4-ans', root), 4.5, .8, { o: [0, 1], s: [.85, 1] }, E.back);
    tl.add($('.b4-hl', root), 5.0, .6, { hl: [0, 1] });
    tl.add($('.b4-colL .h3', root), tList, .4, { o: [0, 1] }); tl.add($('.b4-colR .h3', root), tList + .1, .4, { o: [0, 1] });
    $$('.b4-li', root).forEach((e, i) => tl.add(e, dropsL[i] - .1, .4, { o: [0, 1], x: [-16, 0] }));
    $$('.b4-ri', root).forEach((e, i) => tl.add(e, dropsR[i] - .1, .4, { o: [0, 1], x: [16, 0] }));
    pbL.forEach((e, i) => tl.add(e, dropsL[i], .45, { y: [-420, 0], o: [0, 1] }, E.bounce));
    pbR.forEach((e, i) => tl.add(e, dropsR[i], .45, { y: [-420, 0], o: [0, 1] }, E.bounce));
    tl.add($('.b4-quote', root), 8.2, .7, { o: [0, 1], y: [16, 0] });
    tl.add($('.b4-hl2', root), 8.6, .8, { hl: [0, 1] }, E.io);
    tl.add($('.b4-q2', root), 8.9, .6, { o: [0, 1] });
    tl.add($('.b4-q2 .deco-p', root), 9.5, .6, { draw: [0, 1] });
    tl.add($('#b4-mW', root), 8.0, .6, { o: [0, 1], y: [40, 0] }, E.back);
    const beam = $('#b4-beam', root), pL = $('#b4-panL', root), pR = $('#b4-panR', root), ptr = $('#b4-ptr', root);
    const m = mascotCtl($('#b4-m', root));
    tl.loop(T => {
      const th = theta(T), a = th * Math.PI / 180;
      beam.setAttribute('transform', `rotate(${f1(th)} ${PX} ${PY})`);
      ptr.setAttribute('transform', `rotate(${f1(th)} ${PX} ${PY})`);
      pL.setAttribute('transform', `translate(${f1(PX - Math.cos(a) * R)} ${f1(PY - Math.sin(a) * R)})`);
      pR.setAttribute('transform', `translate(${f1(PX + Math.cos(a) * R)} ${f1(PY + Math.sin(a) * R)})`);
      m.set({ x: 230, y: 1004, s: .82, t: T, armL: -20, armR: -60 + Math.sin(T * 4) * 8, bob: Math.sin(T * 3) * 2, rot: Math.sin(T * 1.8) * 3 });
    });
  }
});

/* ===================================================================
   S5 认识大模型 —— 句子被切成 Token 方块，飞进大脑，连线闪烁后「预测」出新句
   =================================================================== */
scene({
  id: 's05', title: '认识大模型', dur: 10,
  html: `${hdr('04', '认识大模型', '它为什么会强，又为什么会错')}
  <div class="abs t5-cloud" style="left:120px;top:236px;width:1700px;display:flex;align-items:center;gap:30px;font-size:26px;color:var(--ink3)">
    <span class="t5-w">RPA</span><span class="t5-w">低代码</span><span class="t5-w">规则引擎</span><span class="t5-w">小模型</span><span class="t5-w">OCR</span><span class="t5-w">ASR</span><span class="t5-w">NLP</span><span class="t5-w">智能体</span>
    <span class="t5-eq ink2c" style="font-size:24px">…… 都属于广义 AI，当前热点是</span><span class="cute t5-llm" data-deco="circle" data-col="tc" style="font-size:40px;color:var(--ink)">大语言模型</span></div>
  <svg class="full" id="t5"></svg>
  <div class="abs t5-ghost" style="left:120px;top:440px;font-size:34px;white-space:nowrap;color:var(--ink3);opacity:0;letter-spacing:.02em">语言 被 切为 最小 单元 <span class="latin" style="font-size:40px">Token</span></div>
  <div class="abs t5-sent" style="left:120px;top:440px;font-size:34px;white-space:nowrap"><span class="t5-tk">语言</span><span class="t5-tk">被</span><span class="t5-tk">切为</span><span class="t5-tk">最小</span><span class="t5-tk">单元</span><span class="t5-tk latin" style="font-size:40px">Token</span></div>
  <div class="abs small t5-s1" style="left:120px;top:520px;width:540px">在海量资料上学习<b>词与词的关系</b></div>
  <div class="abs t5-out" style="left:1220px;top:420px;width:640px;font-size:30px;line-height:1.9"><span class="t5-o">根据</span><span class="t5-o">用户提问</span><span class="t5-o">和</span><span class="t5-o">上下文</span><span class="t5-o">，</span><span class="t5-o">预测</span><span class="t5-o">、组织</span><span class="t5-o">后续内容</span></div>
  <div class="abs small t5-s2" style="left:1220px;top:560px;width:640px">本质：以<span class="hl t5-hl">语言处理为核心</span>的能力系统</div>
  <div class="abs t5-meta" style="left:120px;top:740px;width:820px">
    <div class="t5-m1" style="display:flex;align-items:center;gap:18px"><svg width="150" height="80"><g transform="translate(40 40) scale(.8)">${''}</g></svg><div><div class="h3">「大脑加嘴巴」</div><div class="small">能讲、能写、能出主意</div></div></div>
    <div class="t5-m2" style="display:flex;align-items:center;gap:18px;margin-top:14px"><svg width="150" height="80"></svg><div><div class="h3">「高位截瘫的军师」</div><div class="small">能讲很多道理，但从知道到做到，还要依赖人、流程与工具</div></div></div>
  </div>
  <div class="abs t5-feat" style="left:1010px;top:740px;width:840px">
    <div class="h3 tcD" style="font-size:27px;margin-bottom:8px">所以要记住三件事</div>
    <div class="body t5-f" style="font-size:24px;line-height:1.75">① 不联网时，无法可靠回答训练数据之外的<b>最新事实</b></div>
    <div class="body t5-f" style="font-size:24px;line-height:1.75">② 若输入<b>错误前提</b>，模型可能沿错误前提继续论证</div>
    <div class="body t5-f" style="font-size:24px;line-height:1.75">③ 能给出建议与文本，却不能自动完成现实世界中的全部行动</div>
  </div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(505);
    const BX = 960, BY = 500;
    let s = '';
    /* 大脑 */
    const bd = smooth([[-170, 20], [-160, -70], [-100, -130], [0, -146], [100, -130], [160, -70], [170, 20], [128, 96], [40, 116], [-50, 116], [-130, 96]].map(q => [BX + q[0], BY + q[1]]), true);
    s += `<g class="t5-brain">${pf(bd, 'f-tcLL', 'transform="translate(7 8)"')}${pf(bd, 'f-paper')}</g>${p(bd, 'ink4 t5-bl')}`;
    s += p(rp([[BX, BY - 144], [BX - 10, BY - 60], [BX + 8, BY + 20], [BX, BY + 114]], 3), 'ink2 t5-bl2');
    s += p(rp([[BX - 130, BY - 60], [BX - 80, BY - 40], [BX - 96, BY + 10], [BX - 40, BY + 40]], 3), 'ink2 t5-bl2') + p(rp([[BX + 130, BY - 60], [BX + 80, BY - 40], [BX + 96, BY + 10], [BX + 40, BY + 40]], 3), 'ink2 t5-bl2');
    /* 神经网络 */
    const nodes = []; for (let i = 0; i < 16; i++) nodes.push([BX + rnd(-120, 120), BY + rnd(-100, 80)]);
    const edges = []; nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 105) edges.push([i, j]); }));
    s += `<g class="t5-net">${edges.map(e => `<path class="t5-e" d="M${f1(nodes[e[0]][0])} ${f1(nodes[e[0]][1])}L${f1(nodes[e[1]][0])} ${f1(nodes[e[1]][1])}" stroke="${C.sky}" stroke-width="2.2" stroke-linecap="round"/>`).join('')}
      ${nodes.map(n => `<circle class="t5-n" cx="${f1(n[0])}" cy="${f1(n[1])}" r="6" fill="${C.skyL}" stroke="${C.skyD}" stroke-width="2"/>`).join('')}</g>`;
    s += `<text x="${BX}" y="${BY + 172}" text-anchor="middle" class="cute t5-cap" font-size="28" fill="${C.ink2}">学习 → 预测</text>`;
    s += p(rp([[BX + 190, BY - 10], [BX + 240, BY - 26]], 1), 'ink t5-ar') + p(head(BX + 240, BY - 26, -.3, 14), 'ink t5-ar');
    $('#t5', root).innerHTML = s;
    $('.t5-m1 svg', root).innerHTML = `<g transform="translate(46 40) scale(.75)">${IC.brain()}</g><text x="88" y="50" font-size="30" fill="${C.ink3}">+</text><g transform="translate(124 40) scale(.62)">${IC.mouth()}</g>`;
    $('.t5-m2 svg', root).innerHTML = `<g transform="translate(60 42) scale(.85)">${IC.fan()}</g><g transform="translate(118 40) scale(.5)">${IC.doc()}</g>`;
    /* 云词 */
    tl.stag($$('.t5-w', root), .3, .5, .09, { o: [0, 1], y: [-18, 0], r: [-6, 0] }, E.back);
    tl.add($('.t5-eq', root), 1.1, .5, { o: [0, 1] });
    tl.add($('.t5-llm', root), 1.4, .6, { o: [0, 1], s: [.6, 1] }, E.back);
    tl.add($('.t5-llm .deco-p', root), 1.8, .7, { draw: [0, 1] }, E.io);
    tl.add($$('.t5-w', root), 2.2, .6, { o: [1, .45] });
    /* 大脑 */
    tl.add($('.t5-brain', root), 1.6, .7, { o: [0, 1], s: [.8, 1] }, E.back);
    tl.add($('.t5-bl', root), 1.5, 1, { draw: [0, 1] }, E.io);
    tl.add($$('.t5-bl2', root), 2.1, .7, { draw: [0, 1] });
    /* token 切分 */
    const tks = $$('.t5-tk', root);
    tl.add($('.t5-sent', root), 1.9, .5, { o: [0, 1] });
    tks.forEach((e, i) => { e.style.display = 'inline-block'; e.style.padding = '2px 4px'; e.style.borderRadius = '8px'; });
    const sentB = tks.map(e => offIn(e, root));
    tl.fn(2.6, .6, pr => {
      tks.forEach((e, i) => {
        e.style.marginRight = (pr * 16).toFixed(1) + 'px';
        e.style.background = pr > 0 ? `rgba(${i % 2 ? '143,185,217' : '243,210,126'},${(pr * .45).toFixed(2)})` : 'transparent';
        e.style.outline = pr > 0 ? `2px solid rgba(43,38,34,${(pr * .7).toFixed(2)})` : 'none';
      });
    }, E.back);
    tl.add($('.t5-s1', root), 2.9, .5, { o: [0, 1] });
    tl.add($('.t5-ghost', root), 4.2, .8, { o: [0, .45] });
    tks.forEach((e, i) => {
      const st = 3.5 + i * .14;
      tl.fn(st, .75, pr => {
        const b = sentB[i], tx = BX - 30 - (b.x + i * 16 + b.w / 2), ty = BY - (b.y + b.h / 2);
        const e2 = E.io(pr);
        const x = tx * e2, y = ty * e2 - Math.sin(pr * Math.PI) * 120;
        e.style.transform = pr > 0 ? `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(1 - .7 * e2).toFixed(3)}) rotate(${(pr * 40 * (i % 2 ? 1 : -1)).toFixed(1)}deg)` : '';
        e.style.opacity = pr < .85 ? 1 : (1 - (pr - .85) / .15).toFixed(2);
      });
    });
    /* 网络亮起 */
    const es = $$('.t5-e', root), ns = $$('.t5-n', root);
    tl.loop(T => {
      const on = clamp((T - 4.1) / .6);
      es.forEach((e, i) => { const f = .25 + .75 * (.5 + .5 * Math.sin(T * 7 + i * 1.7)); e.style.opacity = (on * f).toFixed(2); });
      ns.forEach((n, i) => { const f = .5 + .5 * Math.sin(T * 5 + i * 2.3); n.setAttribute('r', (4 + f * 3 * on).toFixed(1)); n.style.opacity = on; });
    });
    tl.add($('.t5-cap', root), 4.4, .5, { o: [0, 1] });
    tl.add($$('.t5-ar', root), 4.8, .4, { draw: [0, 1] });
    /* 预测输出：一个接一个“吐”出 */
    $$('.t5-o', root).forEach((e, i) => { e.style.display = 'inline-block'; tl.add(e, 5.0 + i * .16, .45, { o: [0, 1], x: [-60, 0], s: [.4, 1] }, E.back); });
    tl.add($('.t5-s2', root), 6.3, .5, { o: [0, 1] });
    tl.add($('.t5-hl', root), 6.6, .6, { hl: [0, 1] });
    tl.add($('.t5-m1', root), 6.6, .6, { o: [0, 1], x: [-30, 0] });
    tl.add($('.t5-m2', root), 7.0, .6, { o: [0, 1], x: [-30, 0] });
    tl.add($('.t5-feat .h3', root), 7.0, .5, { o: [0, 1] });
    tl.stag($$('.t5-f', root), 7.3, .5, .35, { o: [0, 1], x: [24, 0] });
  }
});
