'use strict';
/* ===================================================================
   S6 信息炼金 —— 四味原料投进烧瓶，液体变色冒泡，交付物随气泡升起
   =================================================================== */
scene({
  id: 's06', title: '信息炼金', dur: 10,
  html: `${hdr('05', '会议纪要', '从会议纪要到「信息炼金」')}
  <svg class="full" id="a6"></svg>
  <div class="abs a6-steps" style="left:112px;top:262px;width:470px">
    <div class="small a6-st0" style="color:var(--tcD);margin-bottom:6px">AI 纪要的机制 · 例：「快乐平安记忆笔」</div>
    ${[['mic', '录音'], ['wave', '语音转写'], ['doc', '转写文本作为上下文'], ['wand', '提示词加工'], ['out', '输出纪要、报告或其他交付物']].map((s, i) => `<div class="a6-st" style="height:92px;display:flex;align-items:center;gap:18px"><svg width="80" height="80" data-ic="${s[0]}"></svg><span class="body" style="font-size:26px">${s[1]}</span></div>`).join('')}
  </div>
  <div class="a6-ings">${['原始信息', '足够上下文', '明确框架', '专业提示词'].map((t, i) => `<div class="abs a6-ing cute" style="left:${640 + i * 160}px;top:252px;width:150px;text-align:center;font-size:27px" data-deco="box" data-col="${['sky', 'sage', 'butter', 'tc'][i]}">${t}</div>`).join('')}</div>
  <div class="a6-outs"></div>
  <div class="abs small a6-outcap" style="left:1190px;top:470px;width:660px">不要只把录音转写工具当成「纪要按钮」——预设专业提示词，它还能把会议加工成更多交付物。</div>
  <div class="abs a6-info" style="left:1190px;top:560px;width:660px">
    <div class="h3" style="font-size:28px">AI 纪要的价值</div>
    <div class="body a6-v" style="font-size:23px;line-height:1.6">· 人开会时通常只关注自己关心、听得懂的内容</div>
    <div class="body a6-v" style="font-size:23px;line-height:1.6">· AI 可以处理<b>全量转写</b></div>
    <div class="body a6-v" style="font-size:23px;line-height:1.6">· 人工数小时的整理 → 压缩为<b>分钟级初稿</b></div>
    <div class="body a6-v" style="font-size:23px;line-height:1.6">· 参会者更多聚焦交流，而不是记笔记</div>
    <div class="a6-85" style="margin-top:16px;display:flex;gap:20px;align-items:flex-start">
      <div class="cute tc" style="font-size:54px;line-height:1;white-space:nowrap" data-deco="circle" data-col="tc">≈85分</div>
      <div class="small" style="font-size:20px">不等于 100 分：ASR 准确率、专业术语、人名、数字、决议和责任人都会影响结果。重要会议必须<span class="hl tcl a6-hl">人工复核关键事实、任务、时间节点和责任归属</span>。</div>
    </div>
  </div>
  <div class="abs a6-formula cute" style="left:112px;top:944px;width:1150px;font-size:31px;white-space:nowrap">原始信息 <span class="tc">+</span> 足够上下文 <span class="tc">+</span> 明确框架 <span class="tc">+</span> 专业提示词 <span class="tc">=</span> <span class="hl a6-hl2">更可用的结构化交付物</span></div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(606);
    const CX = 930, CY = 625, R = 172, NW = 46, NT = 330;
    const jy = CY - Math.sqrt(R * R - NW * NW);
    const pts = [[CX - NW, NT], [CX - NW, NT + 60], [CX - NW, jy]];
    const a0 = Math.atan2(jy - CY, -NW), a1 = Math.atan2(jy - CY, NW) - Math.PI * 2;
    for (let i = 1; i < 26; i++) { const a = a0 + (a1 - a0) * i / 26; pts.push([CX + Math.cos(a) * R, CY + Math.sin(a) * R]); }
    pts.push([CX + NW, jy], [CX + NW, NT + 60], [CX + NW, NT]);
    let s = `<defs><clipPath id="a6clip"><circle cx="${CX}" cy="${CY}" r="${R - 5}"/><rect x="${CX - NW + 4}" y="${NT}" width="${2 * NW - 8}" height="${jy - NT + 20}"/></clipPath></defs>`;
    s += `<g class="a6-stand">${p(rl(CX - 150, CY + R - 20, CX - 190, CY + R + 90), 'ink')}${p(rl(CX + 150, CY + R - 20, CX + 190, CY + R + 90), 'ink')}${p(rl(CX - 170, CY + R + 4, CX + 170, CY + R + 4), 'ink4')}
      <g class="a6-flame"><path id="a6-fl1" fill="${C.tc}" opacity=".85"/><path id="a6-fl2" fill="${C.butter}"/></g>${p(rr(CX - 40, CY + R + 66, 80, 24, 1, 6), 'ink2')}</g>`;
    s += `<g class="a6-glassF">${pf(smooth(pts, true), 'f-paper', 'opacity=".75"')}</g>`;
    s += `<g clip-path="url(#a6clip)"><path id="a6-liq" opacity=".9"/><path id="a6-liq2" opacity=".5"/><g id="a6-bub">${'<circle fill="none" stroke-width="2.2"/>'.repeat(16)}</g></g>`;
    s += p(rp(pts, 1.2), 'ink4 a6-glass');
    s += p(rp([[CX - NW - 12, NT - 2], [CX + NW + 12, NT - 2]], .6), 'ink4 a6-lip');
    s += p(rp([[CX - 130, CY - 40], [CX - 112, CY - 92], [CX - 76, CY - 128]], .8), 'ink2 a6-shine', 'style="stroke:#fff;stroke-width:7;opacity:.9"');
    s += `<g id="a6-spl">${'<path class="s-sky" style="stroke-width:3"/>'.repeat(6)}</g>`;
    $('#a6', root).innerHTML = s;
    const icons = { mic: IC.mic(), wave: p(wave(-34, 34, 0, 12, 22, 0), 's-sky') + p(wave(-34, 34, 0, 6, 14, 1), 'ink2'), doc: IC.doc(), wand: IC.wand(), out: IC.doc('f-butterL') + p(rp([[18, 20], [34, 30], [24, 38]], .4), 's-tc') };
    $$('.a6-steps svg', root).forEach((g, i) => { g.innerHTML = `<g transform="translate(40 40) scale(.8)">${icons[g.dataset.ic]}</g>`; });
    /* 左侧机制：逐行画出 */
    tl.add($('.a6-st0', root), .3, .5, { o: [0, 1] });
    $$('.a6-st', root).forEach((e, i) => {
      tl.add(e, .5 + i * .32, .5, { o: [0, 1], x: [-20, 0] });
      drawSeq(tl, $$('path[pathLength]', e), .5 + i * .32, .7);
    });
    /* 烧瓶 */
    tl.add($('.a6-glass', root), .4, 1.2, { draw: [0, 1] }, E.io);
    tl.add($('.a6-lip', root), 1.3, .3, { draw: [0, 1] });
    tl.add($('.a6-glassF', root), .9, .6, { o: [0, 1] });
    tl.add($('.a6-shine', root), 1.5, .4, { draw: [0, 1] });
    tl.add($('.a6-stand', root), .6, .6, { o: [0, 1], y: [20, 0] });
    /* 原料投入 */
    const ings = $$('.a6-ing', root), cols = [C.skyL, C.sky, C.sage, C.butter, '#EFA486'];
    const drops = [1.9, 2.55, 3.2, 3.85];
    ings.forEach((e, i) => {
      tl.add(e, 1.0 + i * .12, .5, { o: [0, 1], y: [-30, 0] }, E.back);
      tl.add($('.deco-p', e), 1.2 + i * .12, .5, { draw: [0, 1] });
      const b = offIn(e, root), dx = CX - (b.x + b.w / 2), dy = NT + 20 - (b.y + b.h / 2);
      tl.fn(drops[i], .6, pr => {
        if (pr <= 0) { if (e._f) { e.style.translate = ''; e.style.scale = ''; e._f = 0; } return; }
        e._f = 1; const q = E.in(pr);
        e.style.translate = `${(dx * E.io(pr)).toFixed(1)}px ${(dy * q - Math.sin(pr * Math.PI) * 60).toFixed(1)}px`;
        e.style.scale = (1 - .75 * q).toFixed(3); e.style.opacity = pr > .9 ? ((1 - pr) * 10).toFixed(2) : 1;
      });
    });
    const liq = $('#a6-liq', root), liq2 = $('#a6-liq2', root), bubs = $$('#a6-bub circle', root), spl = $$('#a6-spl path', root);
    const mix = (a, b, k) => { const h = x => [1, 3, 5].map(i => parseInt(x.substr(i, 2), 16)); const A = h(a), B = h(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };
    tl.loop(T => {
      let lv = 0, ci = 0;
      drops.forEach((d, i) => { const q = E.out(clamp((T - d - .55) / .8)); lv += q; if (T > d + .55) ci = i + 1; });
      const lvlY = CY + R - 30 - lv * 62 - clamp(T / 1.5) * 40;
      const kk = clamp((T - drops[Math.max(0, ci - 1)] - .55) / .8);
      const col = ci === 0 ? cols[0] : mix(cols[ci - 1], cols[ci], kk);
      const pts = []; for (let x = CX - R - 10; x <= CX + R + 10; x += 20) pts.push([x, lvlY + Math.sin(x / 26 + T * 4) * 5 + Math.sin(x / 13 - T * 6) * 2]);
      const top = smooth(pts);
      liq.setAttribute('d', `${top}L${CX + R + 10} ${CY + R + 20}L${CX - R - 10} ${CY + R + 20}Z`); liq.setAttribute('fill', col);
      liq2.setAttribute('d', `${smooth(pts.map(q => [q[0], q[1] + 16 + Math.sin(q[0] / 18 + T * 3) * 3]))}L${CX + R + 10} ${CY + R + 20}L${CX - R - 10} ${CY + R + 20}Z`); liq2.setAttribute('fill', '#fff'); liq2.style.opacity = .18;
      bubs.forEach((b, i) => {
        const sp = .5 + (i % 5) * .12, ph = ((T * sp + i * .37) % 1), x = CX - 120 + ((i * 53) % 240) + Math.sin(T * 3 + i) * 8, y = CY + R - 20 - ph * (CY + R - 20 - lvlY + 10);
        b.setAttribute('cx', f1(x)); b.setAttribute('cy', f1(y)); b.setAttribute('r', f1(4 + (i % 4) * 2.5 * (.6 + ph)));
        b.setAttribute('stroke', '#fff'); b.style.opacity = T > 1.6 ? (1 - ph) * .9 : 0;
      });
      spl.forEach((sp, i) => {
        let best = -1; drops.forEach((d, k) => { if (T > d + .5 && T < d + 1.1) best = k; });
        if (best < 0) { sp.style.opacity = 0; return; }
        const q = (T - drops[best] - .5) / .6, a = -Math.PI / 2 + (i - 2.5) * .45, r1 = 20 + q * 40, r2 = r1 + 16;
        sp.setAttribute('d', `M${f1(CX + Math.cos(a) * r1)} ${f1(lvlY + Math.sin(a) * r1)}L${f1(CX + Math.cos(a) * r2)} ${f1(lvlY + Math.sin(a) * r2)}`); sp.style.opacity = (1 - q).toFixed(2);
      });
      const f = Math.sin(T * 13) * 4, g2 = Math.cos(T * 9) * 3, by = CY + R + 66;
      $('#a6-fl1', root).setAttribute('d', `M${CX - 26} ${by} Q${CX - 30 + g2} ${by - 40} ${CX + f} ${by - 70 + g2} Q${CX + 30 + g2} ${by - 36} ${CX + 26} ${by}Z`);
      $('#a6-fl2', root).setAttribute('d', `M${CX - 12} ${by} Q${CX - 14} ${by - 22} ${CX + f * .6} ${by - 40} Q${CX + 14} ${by - 20} ${CX + 12} ${by}Z`);
    });
    /* 交付物气泡上升 */
    const outs = [['纪要', 1235, 262, 62], ['立项报告', 1398, 215, 76], ['宣传稿', 1570, 268, 66], ['课程教案', 1740, 222, 76], ['文章', 1300, 395, 56], ['项目评优材料', 1494, 392, 88], ['团队总结', 1700, 390, 74]];
    const oh = $('.a6-outs', root);
    oh.innerHTML = outs.map((o, i) => `<div class="abs a6-o" style="left:${o[1] - o[3]}px;top:${o[2] - o[3]}px;width:${o[3] * 2}px;height:${o[3] * 2}px;display:grid;place-items:center;font-family:var(--cute);font-size:${o[0].length > 4 ? 23 : 26}px;color:var(--ink)">
      <svg width="${o[3] * 2}" height="${o[3] * 2}" style="position:absolute;left:0;top:0">${pf(rblob(o[3], o[3], o[3] - 4, o[3] - 4, .04), ['f-skyL', 'f-sageL', 'f-butterL', 'f-tcLL'][i % 4], 'opacity=".85"')}${p(rc(o[3], o[3], o[3] - 4, o[3] - 4, { turn: 1.05 }), 'ink2')}<path d="M${o[3] * .45} ${o[3] * .5} q${o[3] * .15} ${-o[3] * .2} ${o[3] * .4} ${-o[3] * .22}" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg><span style="position:relative">${o[0]}</span></div>`).join('');
    $$('.a6-o', root).forEach((e, i) => {
      const o = outs[i], dx = CX - o[1], dy = NT - 10 - o[2];
      const st = 4.6 + i * .3;
      tl.fn(st, 1.3, pr => {
        const q = E.out(pr);
        e.style.translate = `${(dx * (1 - q) + Math.sin(pr * 9 + i) * 14 * (1 - pr)).toFixed(1)}px ${(dy * (1 - q)).toFixed(1)}px`;
        e.style.scale = (.25 + .75 * q).toFixed(3); e.style.opacity = pr > 0 ? Math.min(1, pr * 4) : 0;
      });
    });
    tl.loop(T => { $$('.a6-o', root).forEach((e, i) => { if (T > 6.2 + i * .3) e.style.rotate = `${(Math.sin(T * 1.5 + i) * 3).toFixed(2)}deg`; }); });
    tl.add($('.a6-outcap', root), 6.3, .6, { o: [0, 1] });
    tl.stag($$('.a6-info .h3, .a6-v', root), 6.5, .5, .2, { o: [0, 1], x: [20, 0] });
    tl.add($('.a6-85', root), 7.6, .5, { o: [0, 1] });
    tl.add($('.a6-85 .deco-p', root), 7.8, .6, { draw: [0, 1] });
    tl.add($('.a6-hl', root), 8.2, .8, { hl: [0, 1] }, E.io);
    tl.add($('.a6-formula', root), 4.4, .8, { clip: [0, 1], o: [0, 1] }, E.io);
    tl.add($('.a6-hl2', root), 5.2, .7, { hl: [0, 1] });
  }
});

/* ===================================================================
   S7 智能体 —— 立体书翻开，毛坯房与七件“家具”一层层弹起，最后立起安全护栏
   =================================================================== */
scene({
  id: 's07', title: '从大模型到智能体', dur: 11,
  html: `${hdr('06', '智能体', '从大模型到智能体')}
  <div class="abs pb-wrap" style="left:40px;top:150px;width:1200px;height:900px;perspective:1600px;perspective-origin:50% 30%">
    <div class="pb-book" style="position:absolute;left:60px;top:500px;width:1080px;height:380px;transform-style:preserve-3d;transform:rotateX(62deg)">
      <div class="pb-cover" style="position:absolute;left:-16px;top:-14px;width:1112px;height:408px;background:${C.tc};border-radius:14px;transform:translateZ(-8px);box-shadow:0 30px 60px -20px rgba(90,50,30,.4)"></div>
      <div class="pb-page" style="left:0;border-radius:10px 0 0 10px"><div class="pb-txt">大模型像<b>毛坯房</b></div></div>
      <div class="pb-pr" style="position:absolute;left:540px;top:0;width:540px;height:380px;transform-origin:0 50%;transform-style:preserve-3d">
        <div class="pb-page" style="left:0;border-radius:0 10px 10px 0;backface-visibility:hidden"><div class="pb-txt" style="text-align:right">智能体才是更接近<b>组织生产性行为</b>的形态</div></div>
        <div class="pb-page" style="left:0;border-radius:0 10px 10px 0;transform:rotateY(180deg);backface-visibility:hidden;background:${C.tc}"></div>
      </div>
      <div class="pb-gut" style="position:absolute;left:520px;top:0;width:40px;height:380px;background:linear-gradient(90deg,rgba(0,0,0,0),rgba(90,60,40,.18),rgba(0,0,0,0));transform:translateZ(.5px)"></div>
      <div class="pb-L pb-house" style="left:150px;top:-300px;width:780px;height:420px"><svg width="780" height="420" id="pb-house"></svg></div>
      ${[['chat', '提示词', 95], ['book', '方法论', 345], ['flow', '工作流', 595], ['toolbox', '工具链', 845]].map(d => `<div class="pb-L pb-it" style="left:${d[2] - 95}px;top:${235 - 200}px;width:190px;height:200px"><svg width="190" height="200" data-ic="${d[0]}" data-lb="${d[1]}"></svg></div>`).join('')}
      ${[['plug', 'MCP / API', 210], ['shelf', '知识库与上下文', 540], ['ruler', '交付标准', 870]].map(d => `<div class="pb-L pb-it2" style="left:${d[2] - 110}px;top:${318 - 180}px;width:220px;height:180px"><svg width="220" height="180" data-ic="${d[0]}" data-lb="${d[1]}"></svg></div>`).join('')}
      <div class="pb-L pb-fence" style="left:40px;top:${374 - 130}px;width:1000px;height:130px"><svg width="1000" height="130" id="pb-fence"></svg></div>
    </div>
  </div>
  <div class="abs pb-side" style="left:1290px;top:236px;width:560px">
    <div class="pb-s1"><div class="h3">智能体是什么？</div>
      <div class="small" style="margin-top:6px;font-size:21px">把提示词、方法论、工作流、工具链、MCP/API 等技术连接、知识库与上下文、交付标准<b>封装</b>起来——不只是对话，而是可沿着既定流程完成特定任务的<span class="hl pb-hl">数字助手</span>。</div></div>
    <div class="pb-s2" style="margin-top:26px;display:flex;gap:16px;align-items:flex-start"><svg width="70" height="64"><g transform="translate(34 32) scale(.62)">${''}</g></svg>
      <div><div class="h3" style="font-size:26px">传统智能体</div><div class="small">通常是「一问一答」</div></div></div>
    <div class="pb-s3" style="margin-top:14px;display:flex;gap:16px;align-items:flex-start"><svg width="70" height="64"></svg>
      <div><div class="h3" style="font-size:26px">执行型智能体 <span class="small tcD">在授权范围内</span></div>
      <div class="small" style="font-size:20px">读取、加工、生成文件 · 操作网页 · 拆解任务、编排流程、调用工具 · 产出 H5、文档、原型等成果</div></div></div>
    <div class="pb-s4" style="margin-top:22px;padding-top:16px;border-top:2px dashed rgba(43,38,34,.25)">
      <div class="h3 tcD" style="font-size:26px">⚠ 授权风险</div>
      <div class="small" style="font-size:21px">误解意图 · 误删文件 · 越权访问 · 数据泄露</div>
      <div class="small" style="font-size:21px;margin-top:4px">金融机构不能因追求自动化而忽略监管与安全边界 ↓</div></div>
  </div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(707);
    /* 毛坯房 */
    let h = '';
    h += pf('M90,410 L90,170 L390,40 L690,170 L690,410Z', 'f-paper2');
    h += p(rp([[70, 186], [390, 30], [712, 186]], 1.5), 'ink4') + p(rp([[100, 172], [100, 410], [680, 410], [680, 172]], 1.4), 'ink4');
    h += `<path d="${hatch(110, 200, 560, 200, 16)}" class="hatch" style="opacity:.18"/>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) if ((r + c) % 3 === 0) h += p(rr(120 + c * 62 + (r % 2) * 30, 216 + r * 32, 44, 18, .6, 3), 'soft');
    h += p(rr(330, 300, 110, 110, 1, 4), 'ink2') + p(rr(170, 230, 90, 70, 1, 4), 'ink2') + p(rr(520, 230, 90, 70, 1, 4), 'ink2');
    h += `<text x="390" y="140" text-anchor="middle" class="cute" font-size="38" fill="${C.ink}">大模型 ≈ 毛坯房</text>`;
    $('#pb-house', root).innerHTML = h;
    const itemSvg = (svg, w, hh, c, lt) => {
      const ic = svg.dataset.ic, lb = svg.dataset.lb;
      svg.innerHTML = `${pf(rblob(w / 2 + 4, hh / 2 - 6, w / 2 - 14, hh / 2 - 26, .06), c)}${p(rblob(w / 2, hh / 2 - 10, w / 2 - 14, hh / 2 - 26, .06), 'ink2')}
        <g transform="translate(${w / 2} ${hh / 2 - 28}) scale(1.05)">${IC[ic]()}</g>
        ${pf(rrf(16, lt ? 0 : hh - 50, w - 32, 40, 2, 10), 'f-paper')}${p(rr(16, lt ? 0 : hh - 50, w - 32, 40, 1, 10), 'ink2')}
        <text x="${w / 2}" y="${lt ? 29 : hh - 21}" text-anchor="middle" font-size="${lb.length > 6 ? 21 : 25}" class="wk7" fill="${C.ink}" style="font-weight:700">${lb}</text>`;
    };
    $$('.pb-it svg', root).forEach((s, i) => itemSvg(s, 190, 200, ['f-skyL', 'f-sageL', 'f-butterL', 'f-tcLL'][i], 1));
    $$('.pb-it2 svg', root).forEach((s, i) => itemSvg(s, 220, 180, ['f-butterL', 'f-skyL', 'f-sageL'][i]));
    /* 护栏 */
    let f = pf(rrf(20, 40, 960, 24, 2, 8), 'f-butterL') + p(rr(20, 40, 960, 24, 1, 8), 'ink2') + pf(rrf(20, 86, 960, 18, 2, 6), 'f-butterL') + p(rr(20, 86, 960, 18, 1, 6), 'ink2');
    ['最小权限', '隔离环境', '受控接口', '人工验收', '不可越权访问'].forEach((t, i) => {
      const x = 100 + i * 200;
      f += pf(`M${x - 34},130 L${x - 34},22 L${x},0 L${x + 34},22 L${x + 34},130Z`, 'f-paper') + p(rp([[x - 34, 130], [x - 34, 22], [x, 0], [x + 34, 22], [x + 34, 130]], .8), 'ink2');
      f += `<g transform="translate(${x} 70)"><rect x="-74" y="-20" width="148" height="40" rx="10" fill="${C.sageL}" stroke="${C.ink}" stroke-width="2"/><text y="8" text-anchor="middle" font-size="${t.length > 4 ? 19 : 22}" class="wk7" fill="${C.ink}" style="font-weight:700">${t}</text></g>`;
    });
    $('#pb-fence', root).innerHTML = f;
    $('.pb-s2 svg', root).innerHTML = `<g transform="translate(34 32) scale(.62)">${IC.chat()}</g>`;
    $('.pb-s3 svg', root).innerHTML = `<g transform="translate(34 32) scale(.62)">${IC.robot()}</g>`;
    /* 动画：书翻开 */
    tl.add($('.pb-wrap', root), 0, .8, { o: [0, 1], y: [120, 0] }, E.out);
    tl.add($('.pb-pr', root), .5, 1.1, { ry: [-180, 0] }, E.io);
    const pop = (el, t, ang = -54) => {
      tl.add(el, t, .9, { rx: [0, ang], origin: '50% 100%' }, E.back);
      tl.add(el, t, .25, { o: [0, 1] });
    };
    pop($('.pb-house', root), 1.5, -58);
    $$('.pb-it', root).forEach((e, i) => pop(e, 2.3 + i * .22, -60));
    $$('.pb-it2', root).forEach((e, i) => pop(e, 3.3 + i * .22, -61));
    pop($('.pb-fence', root), 7.4, -62);
    tl.add($$('.pb-txt', root), 1.3, .6, { o: [0, 1] });
    /* 右侧说明 */
    tl.add($('.pb-s1', root), 4.2, .6, { o: [0, 1], x: [24, 0] });
    tl.add($('.pb-hl', root), 4.9, .6, { hl: [0, 1] });
    tl.add($('.pb-s2', root), 5.4, .5, { o: [0, 1], x: [24, 0] });
    tl.add($('.pb-s3', root), 5.9, .5, { o: [0, 1], x: [24, 0] });
    tl.add($('.pb-s4', root), 6.7, .6, { o: [0, 1], x: [24, 0] });
    /* 立起的纸片随呼吸轻晃 */
    tl.loop(T => { if (T > 4.5) $$('.pb-it,.pb-it2', root).forEach((e, i) => { e.style.rotate = `${(Math.sin(T * 1.4 + i) * .8).toFixed(2)}deg`; }); });
  }
});

/* ===================================================================
   S8 四大领域八要素 —— 机器人零件从四面飞来“咔哒”拼装，再拉出引线标注
   =================================================================== */
scene({
  id: 's08', title: '四大领域 · 八个要素', dur: 10,
  html: `${hdr('07', '智能体解剖图', '四大领域、八个要素')}
  <svg class="full" id="r8"></svg>
  ${[['大脑', '模型、算力', '引擎与燃料', '是否聪明、是否足够快', 110, 236, 'sky'],
    ['感官与体验', '入口、交互、体验', '五官与入口', '找不找得到、用得顺不顺', 1380, 236, 'butter'],
    ['手脚', '工作流、工具链', '行动能力', '能否拆任务、调工具、串流程', 110, 506, 'sage'],
    ['记忆与方向', '知识库、上下文、Skill、提示词', '记忆与方向盘', '是否懂业务、资料、规则与标准', 1380, 506, 'tc']].map((d, i) => `
    <div class="abs r8-a r8-a${i}" style="left:${d[4]}px;top:${d[5]}px;width:${i % 2 ? 470 : 450}px">
      <div class="cute" style="font-size:38px;color:var(--${d[6] === 'tc' ? 'tcD' : d[6] === 'butter' ? 'ink' : d[6] + 'D'})"><span class="r8-dot" style="background:var(--${d[6]})"></span>${d[0]}</div>
      <div class="body" style="font-size:24px;margin-top:4px"><span class="ink3c">构成</span>　${d[1]}</div>
      <div class="body" style="font-size:24px"><span class="ink3c">比喻</span>　${d[2]}</div>
      <div class="body" style="font-size:24px"><span class="ink3c">解决</span>　${d[3]}</div></div>`).join('')}
  <div class="abs r8-bot" style="left:110px;top:792px;width:1740px">
    <div class="h3 r8-bh" style="font-size:27px">企业内部 AI「不好用」的四个原因</div>
    <div style="display:flex;gap:30px;margin-top:10px">
      ${[['模型与算力有限', '成本和权限受限'], ['工具链和工作流不通', '知识库、接口、系统间存在烟囱'], ['入口与体验不佳', '有 AI 无入口、有入口无 AI，或两者都有但不好用'], ['业务知识不足', '外部产品不懂企业业务、交付标准和具体场景']].map((d, i) => `<div class="r8-r" style="flex:1"><div class="body" style="font-size:24px"><span class="latin tc" style="font-size:32px">${i + 1}</span> <b>${d[0]}</b></div><div class="small" style="font-size:20px">${d[1]}</div></div>`).join('')}
    </div>
    <div class="body r8-c" style="margin-top:14px;font-size:27px">→ 大多数业务人员最可控、最应训练的部分，是<span class="hl tcl r8-hl" style="font-weight:700">上下文与提示词</span>。</div>
  </div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(808);
    const X = 960;
    let s = '';
    s += `<g id="r8-legs">${pf(rrf(900, 640, 50, 90, 2, 10), 'f-skyL')}${p(rr(900, 640, 50, 90, 1, 10))}${pf(rrf(970, 640, 50, 90, 2, 10), 'f-skyL')}${p(rr(970, 640, 50, 90, 1, 10))}
      ${pf(rblob(918, 742, 44, 16), 'f-ink')}${pf(rblob(1004, 742, 44, 16), 'f-ink')}</g>`;
    s += `<g id="r8-armL">${p(rp([[848, 470], [790, 520], [760, 580]], 1), 'ink4', 'style="stroke-width:14;stroke:' + C.ink + '"')}${p(rp([[848, 470], [790, 520], [760, 580]], 1), 'ink', 'style="stroke-width:8;stroke:' + C.sageL + '"')}
      <g transform="translate(744 606) rotate(-30)">${pf('M-8,-30 L8,-30 L8,20 L-8,20Z', 'f-paper3')}${p(rp([[-8, 24], [-8, -26], [-20, -38], [-14, -52], [-4, -42], [4, -42], [14, -52], [20, -38], [8, -26], [8, 24]], .6))}</g></g>`;
    let gear = ''; for (let i = 0; i < 20; i++) { const a = i / 20 * 6.283, r = i % 2 ? 26 : 36; gear += `${i ? 'L' : 'M'}${f1(Math.cos(a) * r)} ${f1(Math.sin(a) * r)}`; }
    s += `<g id="r8-armR">${p(rp([[1072, 470], [1130, 520], [1160, 580]], 1), 'ink4', 'style="stroke-width:14"')}${p(rp([[1072, 470], [1130, 520], [1160, 580]], 1), 'ink', 'style="stroke-width:8;stroke:' + C.sageL + '"')}
      <g transform="translate(1172 612)"><g class="r8-gear">${pf(gear + 'Z', 'f-butter')}${p(gear + 'Z', 'ink2')}${p(rc(0, 0, 10, 10, { n: 8 }), 'ink2')}</g></g></g>`;
    s += `<g id="r8-torso">${pf(rrf(846, 428, 236, 214, 3, 26), 'f-butterL', 'transform="translate(6 7)"')}${pf(rrf(840, 420, 240, 216, 3, 26), 'f-paper')}${p(rr(840, 420, 240, 216, 1.6, 26), 'ink4')}
      <g class="r8-wheel" style="transform-origin:930px 520px">${p(rc(930, 520, 52, 52, { turn: 1.05 }), 'ink4')}${p(rl(930, 470, 930, 570, .5), 'ink2')}${p(rl(880, 520, 980, 520, .5), 'ink2')}${pf(rblob(930, 520, 13, 13), 'f-tc')}</g>
      ${pf(rrf(1004, 470, 52, 36, 1, 4), 'f-sageL')}${p(rr(1004, 470, 52, 36, .6, 4), 'ink2')}<text x="1030" y="495" text-anchor="middle" font-size="17" class="latin" fill="${C.ink}">Skill</text>
      ${pf(rrf(1004, 520, 52, 36, 1, 4), 'f-skyL')}${p(rr(1004, 520, 52, 36, .6, 4), 'ink2')}<text x="1030" y="544" text-anchor="middle" font-size="15" fill="${C.ink}">知识库</text>
      ${p(rl(870, 600, 1050, 600, .6), 'soft')}${p(rl(870, 612, 1000, 612, .6), 'soft')}</g>`;
    s += `<g id="r8-head">${p(rl(X, 408, X, 428, .4), 'ink4')}
      ${pf(rrf(866, 262, 194, 146, 3, 30), 'f-skyL', 'transform="translate(6 7)"')}${pf(rrf(860, 256, 200, 150, 3, 30), 'f-paper')}${p(rr(860, 256, 200, 150, 1.6, 30), 'ink4')}
      <g class="r8-eyes">${pf(rblob(918, 318, 24, 24), 'f-paper')}${p(rc(918, 318, 24, 24, { turn: 1.05 }), 'ink')}<circle class="r8-pu" cx="920" cy="318" r="10" fill="${C.ink}"/>${pf(rblob(1002, 318, 24, 24), 'f-paper')}${p(rc(1002, 318, 24, 24, { turn: 1.05 }), 'ink')}<circle class="r8-pu" cx="1004" cy="318" r="10" fill="${C.ink}"/></g>
      ${p(rp([[930, 368], [960, 376], [990, 368]], .6), 'ink')}
      <g>${pf(rblob(846, 330, 16, 26), 'f-butter')}${p(rblob(846, 330, 16, 26), 'ink2')}${pf(rblob(1074, 330, 16, 26), 'f-butter')}${p(rblob(1074, 330, 16, 26), 'ink2')}</g>
      ${pf(`M876,258 Q960,140 1044,258Z`, 'f-tcLL', 'opacity=".9"')}${p(rp([[874, 258], [890, 214], [924, 184], [960, 176], [996, 184], [1030, 214], [1046, 258]], .8), 'ink')}
      <g transform="translate(960 224) scale(.95)">${IC.brain('f-tcL')}</g>
      ${p(rp([[900, 222], [910, 200]], .4), 'ink2', 'style="stroke:#fff;stroke-width:5"')}</g>`;
    s += `<g id="r8-fx">${'<path class="s-tc" style="stroke-width:3"/>'.repeat(18)}</g>`;
    /* 引线 */
    s += p(rp([[920, 196], [760, 210], [580, 270]], 1), 'ink2 r8-ld') + pf(rblob(920, 196, 6, 6), 'f-ink', 'class="r8-ldd"');
    s += p(rp([[1080, 318], [1200, 300], [1360, 280]], 1), 'ink2 r8-ld') + pf(rblob(1080, 318, 6, 6), 'f-ink', 'class="r8-ldd"');
    s += p(rp([[750, 600], [660, 600], [580, 560]], 1), 'ink2 r8-ld') + pf(rblob(750, 600, 6, 6), 'f-ink', 'class="r8-ldd"');
    s += p(rp([[1060, 500], [1200, 520], [1360, 560]], 1), 'ink2 r8-ld') + pf(rblob(1060, 500, 6, 6), 'f-ink', 'class="r8-ldd"');
    $('#r8', root).innerHTML = s;
    /* 飞入 */
    const fly = (sel, t, from, ease = E.out5) => tl.add($(sel, root), t, .7, { x: [from[0], 0], y: [from[1], 0], r: [from[2], 0], o: [0, 1] }, ease);
    fly('#r8-legs', .4, [0, 500, 0], E.back);
    fly('#r8-torso', .8, [0, -700, 25], E.back);
    fly('#r8-armL', 1.3, [-700, 60, -80], E.back);
    fly('#r8-armR', 1.5, [700, 60, 80], E.back);
    fly('#r8-head', 2.0, [0, -700, -30], E.back);
    const snaps = [[960, 640, 1.0], [960, 425, 1.4], [848, 470, 1.9], [1072, 470, 2.1], [960, 410, 2.6]];
    const fx = $$('#r8-fx path', root);
    tl.loop(T => {
      fx.forEach((pth, i) => {
        const k = Math.floor(i / 3.6), sn = snaps[Math.min(k, 4)], q = (T - sn[2]) / .35;
        if (q < 0 || q > 1) { pth.style.opacity = 0; return; }
        const a = -Math.PI / 2 + ((i % 4) - 1.5) * .6 + (k % 2 ? Math.PI : 0) * 0, r1 = 30 + q * 30, r2 = r1 + 18;
        pth.setAttribute('d', `M${f1(sn[0] + Math.cos(a) * r1 * 1.6)} ${f1(sn[1] + Math.sin(a) * r1)}L${f1(sn[0] + Math.cos(a) * r2 * 1.6)} ${f1(sn[1] + Math.sin(a) * r2)}`);
        pth.style.opacity = (1 - q).toFixed(2);
      });
      const on = clamp((T - 2.9) / .3);
      $$('.r8-pu', root).forEach(e => { e.setAttribute('r', (on * 10).toFixed(1)); e.setAttribute('transform', `translate(${f1(Math.sin(T * 1.3) * 4)} 0)`); });
      $('.r8-wheel', root).style.rotate = `${(Math.sin(T * 1.1) * 30 * on).toFixed(1)}deg`;
      const g = $('.r8-gear', root); g.setAttribute('transform', `rotate(${f1(T * 60)})`);
      $('#r8-head', root).setAttribute('transform', T > 3 ? `rotate(${f1(Math.sin(T * 1.6) * 2)} 960 400)` : '');
    });
    drawSeq(tl, $$('.r8-ld', root), 3.1, 1.6);
    tl.stag($$('.r8-ldd', root), 3.0, .3, .4, { o: [0, 1], s: [0, 1] }, E.back2);
    [0, 1, 2, 3].forEach(i => tl.add($('.r8-a' + i, root), 3.5 + i * .4, .7, { clip: [0, 1], o: [0, 1] }, E.io));
    tl.add($('.r8-bh', root), 5.6, .5, { o: [0, 1] });
    tl.stag($$('.r8-r', root), 5.8, .5, .3, { o: [0, 1], y: [16, 0] });
    tl.add($('.r8-c', root), 7.2, .6, { o: [0, 1] });
    tl.add($('.r8-hl', root), 7.6, .7, { hl: [0, 1] });
  }
});

/* ===================================================================
   S9 提示词 —— 两种低效问法被打叉；卷轴从中间向两侧徐徐展开七要素，凝成「符文」
   =================================================================== */
scene({
  id: 's09', title: '提示词', dur: 10,
  html: `${hdr('08', '提示词', '从「许愿」到「任务指挥」')}
  <svg class="full" id="p9"></svg>
  <div class="abs p9-b1" style="left:330px;top:228px;width:560px">
    <div class="h3 tcD" style="font-size:27px">许愿式提问</div>
    <div class="body" style="font-size:25px;margin-top:4px">“请帮我做一个让领导满意的报告。”</div></div>
  <div class="abs p9-b2" style="left:1190px;top:228px;width:640px">
    <div class="h3 tcD" style="font-size:27px">大号搜索式提问</div>
    <div class="body" style="font-size:25px;margin-top:4px">只把不懂的问题抛给 AI，却不给任务和交付要求。</div></div>
  <div class="abs p9-lack cute" style="left:0;width:1920px;top:410px;text-align:center;font-size:30px;color:var(--ink2)">缺材料、对象、标准、边界和格式，<span class="tc">难以得到可直接使用的成果</span></div>
  <div class="abs p9-scroll" style="left:150px;top:478px;width:1620px;height:350px">
    <div class="p9-paper" style="position:absolute;inset:0;background:#FFFCF3;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink)">
      <div class="cute" style="position:absolute;left:0;right:0;top:20px;text-align:center;font-size:34px">有效提示词 · 七要素</div>
      <div style="position:absolute;left:30px;right:30px;top:86px;display:flex">
      ${['角色与任务', '背景、附件与已有事实', '交付对象与目标', '输出结构、字数、页数、格式', '风格、禁区与约束', '评价标准', '不明确时需要追问的事项'].map((t, i) => `<div class="p9-c" style="flex:1;text-align:center;padding:0 8px;${i ? 'border-left:2px dotted rgba(43,38,34,.2)' : ''}"><div class="latin tc" style="font-size:40px;line-height:1">${i + 1}</div><svg width="90" height="80" data-i="${i}"></svg><div class="body" style="font-size:23px;line-height:1.35">${t}</div></div>`).join('')}
      </div>
      <div class="small" style="position:absolute;left:0;right:0;bottom:16px;text-align:center">提示词像「咒语」：必须<b>念对、念全</b>，才有稳定效果</div>
    </div>
  </div>
  <div class="abs p9-rl" style="left:0;top:458px;width:44px;height:390px"></div>
  <div class="abs p9-rr" style="left:0;top:458px;width:44px;height:390px"></div>
  <div class="abs p9-rune" style="left:120px;top:868px;width:860px;display:flex;align-items:center;gap:22px">
    <svg width="130" height="130"></svg>
    <div><div class="h3" style="font-size:28px">验证过的好提示词 → 提炼为「符文」，即 <span class="tc latin" style="font-size:38px">Skill</span></div><div class="small">避免每次都从零开始</div></div></div>
  <div class="abs p9-q" style="left:1030px;top:880px;width:820px">
    <div class="cute" style="font-size:32px">“不是把 AI 当许愿池，而是<span class="hl p9-hl">给它下命令让它干活</span>。”</div>
    <div class="small" style="margin-top:8px">“提示词是大家未来驾驭 AI、领导 AI 的唯一制胜法宝。”</div></div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(909);
    let s = '';
    /* 许愿池 */
    s += `<g class="p9-well">${pf(rrf(150, 300, 150, 90, 2, 10), 'f-paper3')}${p(rr(150, 300, 150, 90, 1.2, 10))}
      ${p(rl(150, 330, 300, 330), 'soft')}${p(rl(150, 360, 300, 360), 'soft')}${p(rl(190, 300, 190, 330), 'soft')}${p(rl(250, 330, 250, 360), 'soft')}${p(rl(210, 360, 210, 390), 'soft')}
      ${pf(rblob(225, 302, 76, 12), 'f-sky')}${p(rl(160, 300, 160, 230))}${p(rl(290, 300, 290, 230))}${pf('M140,236 L225,196 L310,236Z', 'f-tcL')}${p(rp([[136, 238], [225, 194], [314, 238], [136, 238]], .6))}</g>`;
    s += `<g class="p9-coin">${pf(rblob(0, 0, 12, 12), 'f-butter')}${p(rc(0, 0, 12, 12, { n: 8 }), 'ink2')}</g>`;
    s += `<g class="p9-rip">${p(rc(225, 304, 30, 6, { n: 10 }), 's-sky')}</g>`;
    s += `<g transform="translate(1100 300)">${IC.magnifier()}</g>`;
    s += p(rp([[150, 214], [900, 400]], 2), 's-tc p9-x', 'style="stroke-width:6"') + p(rp([[900, 214], [150, 400]], 2), 's-tc p9-x', 'style="stroke-width:6"');
    s += p(rp([[1030, 214], [1840, 400]], 2), 's-tc p9-x', 'style="stroke-width:6"') + p(rp([[1840, 214], [1030, 400]], 2), 's-tc p9-x', 'style="stroke-width:6"');
    s += `<g id="p9-sp">${'<path class="s-butter" style="stroke-width:3"/>'.repeat(14)}</g>`;
    $('#p9', root).innerHTML = s;
    const target = () => { const r = [0, 0]; return r; };
    const icons = [IC.people(), IC.doc(), p(rc(0, 0, 30, 30, { turn: 1.04 })) + p(rc(0, 0, 18, 18, { turn: 1.04 }), 's-tc') + pf(rblob(0, 0, 6, 6), 'f-tc') + p(rl(22, -22, 46, -40), 'ink2'), IC.table(), IC.lock(), IC.ruler(), IC.chat('f-butterL') + `<text x="0" y="10" text-anchor="middle" font-size="30" class="cute" fill="${C.tc}">?</text>`];
    $$('.p9-c svg', root).forEach((g, i) => { g.innerHTML = `<g transform="translate(45 42) scale(.72)">${icons[i]}</g>`; });
    $('.p9-rune svg', root).innerHTML = `<g transform="translate(65 65) scale(1.45)">${IC.rune()}</g><g class="p9-glint">${IC.spark(12)}</g>`;
    const roll = c => `<svg width="44" height="390" style="overflow:visible"><rect x="6" y="14" width="32" height="362" rx="14" fill="${c}" stroke="${C.ink}" stroke-width="3"/><path d="M14 30 L14 360" stroke="#fff" stroke-width="4" opacity=".45" stroke-linecap="round"/><rect x="0" y="0" width="44" height="22" rx="9" fill="${C.ink2}" stroke="${C.ink}" stroke-width="2.5"/><rect x="0" y="368" width="44" height="22" rx="9" fill="${C.ink2}" stroke="${C.ink}" stroke-width="2.5"/></svg>`;
    $('.p9-rl', root).innerHTML = roll(C.tc); $('.p9-rr', root).innerHTML = roll(C.tc);
    /* 低效问法 */
    tl.add($('.p9-well', root), .3, .6, { o: [0, 1], y: [20, 0] }, E.back);
    tl.add($('.p9-b1', root), .5, .6, { o: [0, 1], x: [-20, 0] });
    tl.add($('.p9-b2', root), .9, .6, { o: [0, 1], x: [20, 0] });
    tl.fn(0, 2, pr => { const c = $('.p9-coin', root), q = clamp((pr - .35) / .45); c.setAttribute('transform', `translate(${f1(225 + 40 * (1 - q))} ${f1(150 + q * q * 160)}) scale(${(1 - q * .4).toFixed(2)} 1)`); c.style.opacity = q > 0 && q < 1 ? 1 : 0; });
    tl.loop(T => { const q = (T - 2) % 1.6 / 1.6; const r = $('.p9-rip', root); r.style.opacity = T > 2 && T < 5 ? (1 - q) : 0; r.setAttribute('transform', `translate(225 304) scale(${(.6 + q * .8).toFixed(2)}) translate(-225 -304)`); });
    drawSeq(tl, $$('.p9-x', root), 1.9, 1.0, E.out);
    tl.add($$('.p9-well, .p9-b1, .p9-b2', root), 2.9, .5, { o: [1, .45] });
    tl.add($('.p9-lack', root), 2.7, .6, { o: [0, 1], y: [10, 0] });
    /* 卷轴展开 */
    const sc = $('.p9-scroll', root), rl1 = $('.p9-rl', root), rr1 = $('.p9-rr', root);
    tl.add($$('.p9-rl,.p9-rr', root), 3.0, .4, { o: [0, 1] });
    tl.fn(3.4, 1.6, pr => {
      const half = 810 * pr;
      sc.style.clipPath = `inset(-6px ${(810 - half).toFixed(1)}px -6px ${(810 - half).toFixed(1)}px)`;
      rl1.style.transform = `translateX(${(960 - half - 44).toFixed(1)}px) rotate(${(-pr * 4).toFixed(2)}deg)`;
      rr1.style.transform = `translateX(${(960 + half).toFixed(1)}px) rotate(${(pr * 4).toFixed(2)}deg)`;
    }, E.io);
    tl.stag($$('.p9-c', root), 3.7, .5, .15, { o: [0, 1], y: [14, 0] });
    /* 提炼成符文：火花从七列飞向符文 */
    const sp = $$('#p9-sp path', root);
    tl.loop(T => {
      sp.forEach((e, i) => {
        const st = 6.0 + (i % 7) * .08 + Math.floor(i / 7) * .25, q = clamp((T - st) / .8);
        if (q <= 0 || q >= 1) { e.style.opacity = 0; return; }
        const x0 = 150 + 30 + (i % 7) * 223 + 110, y0 = 640, x1 = 185, y1 = 933;
        const qq = E.io(q), x = lerp(x0, x1, qq), y = lerp(y0, y1, qq) - Math.sin(q * Math.PI) * 120;
        e.setAttribute('d', `M${f1(x - 6)} ${f1(y)}L${f1(x + 6)} ${f1(y)}M${f1(x)} ${f1(y - 6)}L${f1(x)} ${f1(y + 6)}`); e.style.opacity = 1;
      });
      $('.p9-glint', root).setAttribute('transform', `translate(110 26) scale(${(.6 + .4 * Math.abs(Math.sin(T * 3))).toFixed(2)})`);
    });
    tl.add($('.p9-rune svg', root), 6.7, .7, { s: [0, 1], r: [-90, 0] }, E.back2);
    tl.add($('.p9-rune', root), 6.6, .5, { o: [0, 1] });
    tl.add($('.p9-q', root), 7.6, .6, { o: [0, 1], y: [14, 0] });
    tl.add($('.p9-hl', root), 8.0, .7, { hl: [0, 1] });
  }
});

/* ===================================================================
   S10 三大应用赛道 —— 三封信依次滑入，折纸般上下翻开，露出赛道内容
   =================================================================== */
scene({
  id: 's10', title: '三大应用赛道', dur: 12,
  html: `${hdr('09', '三大应用赛道', '分公司最值得优先探索的三条赛道')}
  <div class="of-host"></div>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(1010);
    const W0 = 540, H0 = 780, PH = 260;
    const sheets = [
      { n: '01', t: '文生文', st: '最直接的生产力', ic: 'pen', c: 'sky', body: `
        <div class="of-lb">可用于</div>
        <div class="of-tx">信息收集 · 资料萃取 · 逻辑梳理 · 框架整理 · 报告写作 · 翻译 · 话术 · 文案 · 脚本 · 标签 · 汇报策略与 PPT 故事线</div>
        <div class="of-lb">一线坐席真正需要</div>
        <div class="of-tx">经验证的<b>话术、文案、脚本、标签、需求预判和知识支持</b></div>
        <div class="of-four">${['新', '真', '准', '可用'].map(x => `<span class="cute of-k" data-deco="circle" data-col="tc">${x}</span>`).join('')}</div>
        <div class="of-warn">⚠ AI 生成后不能未经审核直接面客</div>` },
      { n: '02', t: '文生 H5', st: '小工具、原型与影响力放大器', ic: 'phone', c: 'sage', body: `
        <div class="of-lb">可用于</div>
        <div class="of-tx">计算器 · 信息管理 · 数据看板 · 轻量应用 · 业务原型 · 互动展示 · 小系统演示 · 游戏 · 活动页面 · 长图文汇报</div>
        <div class="of-lb">会议提供的体验指令</div>
        <div class="of-cmd">“请制作一个精美的 H5，能充分体现 H5 编程的极限性能，给我一点惊喜。”</div>
        <div class="of-tx" style="font-size:21px;color:var(--ink2)">这只是入门尝试。真实业务 H5 需要把这些说清：</div>
        <div class="of-tx"><span class="hl sage of-h">用户 · 场景 · 信息 · 交互 · 视觉 · 数据规则 · 交付边界</span></div>` },
      { n: '03', t: '文生 PPT', st: '适合沟通，必须分级使用', ic: 'easel', c: 'butter', body: `
        <div class="of-lb">三种形态</div>
        <div class="of-tx">① H5 可翻页 PPT　② 可编辑传统 PPT<br>③ 图片页封装的 PPT / PDF</div>
        <div class="of-lb">分级使用</div>
        <div class="of-row"><span class="of-ok">✓</span>向下和横向沟通、内部培训宣导：用 AI 提速</div>
        <div class="of-row"><span class="of-ok">✓</span>分公司内部讨论：适合快速可视化</div>
        <div class="of-row"><span class="of-no">!</span>跨两级向上、总部正式汇报、关键外部交付：<b>人工高标准编辑</b></div>
        <div class="of-tx" style="margin-top:10px"><span data-deco="ul" data-col="tc">12—15 页</span>相对容易保持质量，过长应拆分</div>
        <div class="of-tx" style="font-size:20px;color:var(--ink2)">企业内部 AI PPT 通常可用但不完美，需要人补足信息饱和度和企业语境</div>` }
    ];
    const content = (sh) => `<div class="of-c" style="width:${W0}px;height:${H0}px">
        <div class="of-hd"><div><span class="latin tc" style="font-size:46px">${sh.n}</span><span class="cute" style="font-size:52px;margin-left:12px">${sh.t}</span></div><div class="h3" style="font-size:26px;color:var(--${sh.c === 'butter' ? 'tcD' : sh.c + 'D'})">${sh.st}</div>
        <svg class="of-ic" width="110" height="110"><g transform="translate(55 55) scale(1.05)">${IC[sh.ic]()}</g></svg></div>
        <div class="of-bd">${sh.body}</div></div>`;
    $('.of-host', root).innerHTML = sheets.map((sh, i) => `
      <div class="abs of-sheet" style="left:${88 + i * 600}px;top:226px;width:${W0}px;height:${H0}px;perspective:2200px">
        <div class="of-in">
          <div class="of-p of-mid" style="top:${PH}px"><div class="of-face"><div class="of-sl" style="top:${-PH}px">${content(sh)}</div><div class="of-sh"></div></div></div>
          <div class="of-p of-bot" style="top:${PH * 2}px;transform-origin:50% 0"><div class="of-face"><div class="of-sl" style="top:${-PH * 2}px">${content(sh)}</div><div class="of-sh"></div></div><div class="of-face of-back"><div class="of-sh"></div></div></div>
          <div class="of-p of-top" style="top:0;transform-origin:50% 100%"><div class="of-face"><div class="of-sl" style="top:0">${content(sh)}</div><div class="of-sh"></div></div>
            <div class="of-face of-back"><div class="of-out"><span class="latin tc" style="font-size:60px">${sh.n}</span><span class="cute" style="font-size:54px">${sh.t}</span></div><div class="of-tape ${sh.c}"></div><div class="of-sh"></div></div></div>
        </div></div>`).join('');
    decorate(root);
    $$('.of-sheet', root).forEach((sh, i) => {
      const inn = $('.of-in', sh), top = $('.of-top', sh), bot = $('.of-bot', sh);
      tl.add(inn, .2 + i * .2, .8, { y: [420, 0], r: [-8 + i * 6, 0], o: [0, 1] }, E.out5);
      const t1 = 1.1 + i * 1.15, t2 = t1 + .55;
      tl.add(top, 0, .01, { rx: [-179.5, -179.5], z: [3, 3] });
      tl.add(top, t1, .9, { rx: [-179.5, 0], z: [3, 0] }, E.io);
      tl.add(bot, 0, .01, { rx: [179.5, 179.5], z: [1.5, 1.5] });
      tl.add(bot, t2, .9, { rx: [179.5, 0], z: [1.5, 0] }, E.io);
      const shT = $$('.of-top .of-sh', sh), shB = $$('.of-bot .of-sh', sh);
      tl.fn(t1, .9, pr => { const a = Math.sin(E.io(pr) * Math.PI); shT.forEach(e => e.style.opacity = (a * .35 + (pr < 1 ? 0 : 0)).toFixed(3)); }, E.lin);
      tl.fn(t2, .9, pr => { const a = Math.sin(E.io(pr) * Math.PI); shB.forEach(e => e.style.opacity = (a * .35).toFixed(3)); }, E.lin);
      const ks = $$('.of-k .deco-p', sh);
      ks.forEach((k, j) => tl.add(k, 5.2 + j * .2, .5, { draw: [0, 1] }));
      $$('.of-h', sh).forEach(h => tl.add(h, 6.0, .8, { hl: [0, 1] }));
      $$('.of-tx .deco-p', sh).forEach(h => tl.add(h, 6.6, .6, { draw: [0, 1] }));
      tl.loop(T => { if (T > 4.5) inn.style.translate = `0 ${(Math.sin(T * 1.2 + i * 1.3) * 3).toFixed(1)}px`; });
    });
  }
});
