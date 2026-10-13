'use strict';
/* ===================================================================
   S11 收束 —— 金句像活字一样从四处飞回原位，最后写下全片结论
   =================================================================== */
scene({
  id: 's11', title: '金句与收束', dur: 13,
  html: `${hdr('10', '会议收束', '人驾驭 AI')}
  <div class="abs q11" style="left:120px;top:230px;width:1700px;display:grid;grid-template-columns:1fr 1fr;gap:18px 70px">
    ${['你如果没有问题，就没有答案。', '真正的答案不在两端，在中间。', '不是把AI当许愿池，而是给它下命令让它干活。', '从业务流程出发，才是AI的人间正道。', '别追求大而全，要追求小而美。', 'AI可以帮你到80分，80分到95分还得靠人。', '人工智能有多少人，就有多少智能。', '养龙虾不是为了吃虾肉，而是为了提取虾黄。'].map((q, i) => `<div class="q11-l body" style="font-size:29px;color:var(--${['ink', 'tcD', 'ink', 'sageD', 'ink', 'tcD', 'skyD', 'ink'][i]})">“${q}”</div>`).join('')}
  </div>
  <div class="abs q11-path small" style="left:120px;top:600px;width:1700px;font-size:24px">最终能力路径：做好提示词 → 积累优秀 Skill 与案例 → 将高频任务转成智能体 → 调度多个数字员工协作 → 将验证过的流程固化为组织能力</div>
  <div class="abs q11-fin cute" style="left:0;width:1920px;top:690px;text-align:center;font-size:76px">人驾驭 AI，<span class="tc">而不是被老板和 AI 联合驾驭</span>。</div>
  <div class="abs q11-sub small" style="left:0;width:1920px;top:810px;text-align:center;font-size:25px">主动拥抱变化 · 理解 AI 长短板 · 与 AI 形成互补 · 不断学习、反思和进化</div>
  <svg class="full"><g id="q11-mW">${mascotSVG('q11-m', { seed: 4 })}</g></svg>`,
  setup(root, tl) {
    hdrIn(tl, root, 0);
    seed(1111);
    const chars = $$('.q11-l', root).flatMap(l => splitChars(l));
    chars.forEach((c, i) => {
      const st = .4 + i * .018, dx = rnd(-900, 900), dy = rnd(300, 700), r = rnd(-180, 180);
      tl.add(c, st, .8, { x: [dx, 0], y: [dy, 0], r: [r, 0], o: [0, 1], s: [.4, 1] }, E.out5);
    });
    tl.add($('.q11-path', root), 6.2, .9, { clip: [0, 1], o: [0, 1] }, E.io);
    tl.add($('.q11-fin', root), 7.2, 1, { o: [0, 1], s: [.8, 1] }, E.back);
    tl.add($('.q11-sub', root), 8.2, .7, { o: [0, 1], y: [12, 0] });
    tl.add($('.scene#s11 .q11', root) || $('.q11', root), 11.8, 1, { o: [1, 0] });
    tl.add($$('.q11-path,.q11-fin,.q11-sub,#q11-mW', root), 12.2, .8, { o: [1, 0] });
    const m = mascotCtl($('#q11-m', root));
    tl.loop(T => { const k = clamp((T - 8) / 3); m.set({ x: 1700 - k * 0, y: 1000, s: .9, t: T, armR: -130 + Math.sin(T * 8) * 25, armL: -20, bob: -Math.abs(Math.sin(T * 4)) * 8 }); });
  }
});
