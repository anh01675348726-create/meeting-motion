#!/usr/bin/env python3
"""配乐生成：纯代码合成，无版权问题。
用法：python3 tools/music.py [src/timeline.json] [assets/music.wav]

设计（跟片子的结构走，不是随便一段循环）：
- 速度 96 BPM；每一场换一个和弦，换和弦的时刻 = 场景切换时刻（timeline.json 的 scenes[].t）
- 乐器：拨弦（类钢琴/卡林巴，正弦泛音 + 指数衰减）、温暖铺底（慢起音的和弦垫）、低音、轻打点
- 每次场景切换：前 0.6 秒一声气流上扬（滤波噪声），切换那一拍一声低沉落点
- 「断点」（往下钻）那一场前留约 1 拍近静默；结尾解决到大和弦并延音
- 输出 44.1kHz 立体声，响度约 -16 LUFS（用 RMS 近似）
"""
import json, sys, wave
import numpy as np

SR = 44100
src = sys.argv[1] if len(sys.argv) > 1 else 'src/timeline.json'
out = sys.argv[2] if len(sys.argv) > 2 else 'assets/music.wav'
TL = json.load(open(src, encoding='utf-8'))
DUR = TL['duration']
CUTS = [s['t'] for s in TL['scenes']]
BPM = 96.0
BEAT = 60.0 / BPM
rng = np.random.default_rng(7)
N = int(SR * DUR)
L = np.zeros(N); Rr = np.zeros(N)

def hz(n):  # MIDI → Hz
    return 440.0 * 2 ** ((n - 69) / 12)

def add(buf, start, sig):
    i = int(start * SR)
    if i >= N: return
    j = min(N, i + len(sig))
    buf[i:j] += sig[:j - i]

def pluck(freq, dur=1.8, amp=.18, bright=1.0):
    t = np.arange(int(SR * dur)) / SR
    env = np.exp(-t * 3.2) * (1 - np.exp(-t * 400))
    s = sum((amp / k ** (1.6 - .4 * bright)) * np.sin(2 * np.pi * freq * k * t + k) * np.exp(-t * k * .9) for k in range(1, 6))
    return s * env

def pad(freqs, dur, amp=.05):
    t = np.arange(int(SR * dur)) / SR
    att = np.clip(t / 1.2, 0, 1); rel = np.clip((dur - t) / 1.0, 0, 1)
    s = np.zeros_like(t)
    for f in freqs:
        for det in (-0.12, 0.0, 0.12):
            s += np.sin(2 * np.pi * f * (1 + det / 100) * t + rng.uniform(0, 6))
            s += .3 * np.sin(2 * np.pi * f * 2 * (1 + det / 100) * t)
    return amp * s / len(freqs) * att * rel * (0.85 + 0.15 * np.sin(2 * np.pi * .18 * t))

def bass(freq, dur, amp=.16):
    t = np.arange(int(SR * dur)) / SR
    return amp * (np.sin(2 * np.pi * freq * t) + .25 * np.sin(4 * np.pi * freq * t)) * np.exp(-t * 1.2) * (1 - np.exp(-t * 200))

def tick(amp=.05):
    n = int(SR * .06); t = np.arange(n) / SR
    s = rng.standard_normal(n); s = np.diff(np.concatenate([[0], s]))  # 高通
    return amp * s * np.exp(-t * 70)

def whoosh(dur=.7, amp=.06):
    n = int(SR * dur); t = np.arange(n) / SR
    s = rng.standard_normal(n)
    k = np.exp(-np.linspace(4, .3, n))  # 越来越亮
    out = np.zeros(n); y = 0.0
    for i in range(n):  # 一阶低通，截止频率随时间升高
        y += k[i] * (s[i] - y); out[i] = y
    return amp * out * (t / dur) ** 2

def thump(amp=.32):
    t = np.arange(int(SR * .5)) / SR
    f = 70 * np.exp(-t * 6) + 42
    return amp * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)

# 和弦进行（A 小调 → C 大调收尾）；每一场一个和弦
PROG = [
    [57, 60, 64],      # Am   现状
    [53, 57, 60],      # F    点状需求
    [50, 53, 57],      # Dm   四个问题
    [48, 52, 55],      # C    变化1
    [52, 55, 59],      # Em   往下钻（暗）
    [53, 57, 60, 64],  # Fmaj7 点线面
    [55, 59, 62],      # G    人才
    [57, 60, 64, 67],  # Am7  方案落地
    [53, 57, 60, 67],  # Fadd9 资产
    [48, 52, 55, 62],  # Cadd9 闭环
]
for si, t0 in enumerate(CUTS):
    t1 = CUTS[si + 1] if si + 1 < len(CUTS) else DUR
    ch = PROG[si % len(PROG)]
    dense = TL['scenes'][si].get('energy', 1)
    # 铺底
    p = pad([hz(n) for n in ch], t1 - t0 + 1.2, amp=.05 + .012 * dense)
    add(L, t0, p); add(Rr, t0, p * .92)
    # 低音：每 2 拍
    b = 0.0
    while t0 + b < t1 - .05:
        add(L, t0 + b, bass(hz(ch[0] - 12), BEAT * 2)); add(Rr, t0 + b, bass(hz(ch[0] - 12), BEAT * 2))
        b += BEAT * 2
    # 拨弦琶音：八分音符，密度随 energy
    step = BEAT / (2 if dense >= 1 else 1)
    pat = [0, 1, 2, 1, 2, 3 % len(ch), 1, 2] if len(ch) > 3 else [0, 1, 2, 1, 2, 1, 0, 2]
    k = 0; b = 0.0
    while t0 + b < t1 - .1:
        n = ch[pat[k % len(pat)] % len(ch)] + 12 + (12 if (k // 8) % 2 and dense >= 2 else 0)
        s = pluck(hz(n), amp=.11 + .03 * (k % 4 == 0), bright=.6 + .2 * dense)
        pan = .5 + .25 * np.sin(k * .9)
        add(L, t0 + b, s * (1 - pan) * 1.4); add(Rr, t0 + b, s * pan * 1.4)
        if dense >= 2 and k % 2 == 1:
            add(L, t0 + b, tick() * .7); add(Rr, t0 + b, tick())
        k += 1; b += step
    # 转场：上扬 + 落点
    if si > 0:
        w = whoosh(); add(L, t0 - .7, w); add(Rr, t0 - .7, w * .9)
        th = thump(); add(L, t0, th); add(Rr, t0, th)

# 往下钻那一场之前：一拍近静默（ducking）
drill = [s['t'] for s in TL['scenes'] if s.get('id') == 'drill']
if drill:
    a = int((drill[0] - BEAT * 1.2) * SR); b = int((drill[0] - .05) * SR)
    env = np.ones(N); env[a:b] = .12; L *= env; Rr *= env

# 结尾：解决和弦长延音 + 淡出
end = CUTS[-1]
fin = sum(pluck(hz(n), dur=6, amp=.12) for n in [60, 64, 67, 72, 74])
add(L, DUR - 7.5, fin); add(Rr, DUR - 7.5, fin)
fade = np.clip((DUR - np.arange(N) / SR) / 2.5, 0, 1); L *= fade; Rr *= fade

# 简单混响：指数衰减噪声脉冲响应，FFT 卷积
ir_n = int(SR * 1.6); irt = np.arange(ir_n) / SR
for buf in (L, Rr):
    ir = rng.standard_normal(ir_n) * np.exp(-irt * 3.5); ir[0] = 0
    wet = np.fft.irfft(np.fft.rfft(buf, N + ir_n) * np.fft.rfft(ir, N + ir_n))[:N]
    buf += wet * (0.18 / np.sqrt(np.sum(ir ** 2)))

# 响度：RMS 对齐到约 -18 dBFS（接近 -16 LUFS），峰值限制在 -1 dBFS
st = np.stack([L, Rr], 1)
rms = np.sqrt(np.mean(st ** 2)); st *= (10 ** (-18 / 20)) / (rms + 1e-9)
st = np.tanh(st * 1.2) / 1.2; pk = np.max(np.abs(st)); st *= min(1, 10 ** (-1 / 20) / pk)
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
print(f'wrote {out}: {DUR:.1f}s, {len(CUTS)} scenes')
