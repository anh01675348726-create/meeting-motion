# 议题三 · 需求管理全流程（HyperFrames 工程）

一条命令出片：`npm run film` = 同步时间表 → 生成配乐 → 检查 → 渲染 `renders/议题三.mp4`（1920×1080 · 30fps · 带配乐）。

## 改什么，去哪改
| 想改的 | 文件 |
|---|---|
| 每一场几秒开始、能量高低（配乐密度跟着变） | `src/timeline.json`（唯一的时间表；改完 `npm run sync`） |
| 画面：线条形状、文字、镜头 | `src/film.js`（`ST` = 每一场线条的形状；`world()` = 画面里的字；`hud()` = 标题；`CAM` = 镜头） |
| 配乐 | `tools/music.py`（和弦进行 `PROG`、速度 `BPM`；换场时刻自动对齐 timeline.json） |
| 字体 / 第三方库 | `assets/`（MiSans、GSAP 都是本地文件，渲染时不联网） |

## 常用命令
- `npm run snapshot`：抽 6 帧看效果（`.hyperframes/artifacts/snapshots/`）
- `npm run check`：HyperFrames 质检（运行时、版式、对比度、音频）
- `npm run dev`：打开 HyperFrames Studio 预览

## 原理
`index.html` 里一个 canvas；GSAP 时间轴撑满全片，每次时间变化调用 `frame(t)` 重画。`frame(t)` 是时间的纯函数，所以 HyperFrames 可以逐帧跳转、截图、合成 MP4，并把 `assets/music.wav` 混进去。
