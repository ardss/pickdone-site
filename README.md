# 拾事 PickDone 官网（website/）

纯静态站点：零外部依赖、零字体请求、零构建步骤，任何静态托管都能直接跑。

## 结构

```
website/
├── index.html          首页（单页：Hero/支柱/CLI/功能格/对比/隐私/下载/FAQ）
├── docs.html           文档·入门（安装 / 快速上手教程 / 界面导览 / 文档地图）
├── guide.html          文档·使用指南（How-to：任务/组织/日程/番茄/复盘/桌面）
├── cli.html            文档·CLI 参考（完整命令表，与 todo-app/cli/SKILL.md 对齐）
├── data.html           文档·数据与安全（存储/备份/迁移/导出/网络声明）
├── faq.html            文档·常见问题（使用 FAQ + 技术排查）
├── blog.html           发布与手记（开发手记 + 版本发布底稿）
├── assets/
│   ├── css/style.css   全部样式（深色松石青品牌语言，--brand:#0f9d8f）
│   ├── js/main.js      交互 + 中英双语字典（I18N 对象，全站共享）
│   ├── img/            logo
│   └── shots/          应用截图（14 张，明暗 × 中英，3200×2000）
└── tools/              截图流水线、本地服务器、文档组装器（产物已 gitignore）
```

> 文档体系按 Diátaxis 框架组织（教程/指南/参考/阐释四象限），定稿见 `docs/官网/文档体系定稿-Diataxis映射-2026-09-02.md`。
> cli/data/faq 三页由 `tools/assemble-docs.mjs` 以 guide.html 为骨架组装生成——改共享骨架后重跑一次即可；内容件在 `tools/_c-*.html`。

## 本地预览

```bash
node website/tools/serve.cjs 5188
# 打开 http://127.0.0.1:5188
```

直接双击 `index.html` 也能看（无任何网络请求）。

## 双语机制

- 文案全部在 `assets/js/main.js` 的 `I18N` 对象里（`data-i18n` 纯文本 / `data-i18n-html` 富文本），页面静态内容为中文底稿
- 右上角 中文/EN 切换，选择持久化在 `localStorage('pd-lang')`，跨页面生效
- 截图按语言换源：`<img data-shots='{"zh":"...","en":"..."}'>`

## 重新生成应用截图

截图来自 5175 浏览器调试宿主（演示数据，不碰真实应用库）：

```bash
# 1) 起宿主
cd todo-app/browser-dev && npm run dev
# 2) 起临时浏览器（Electron 当 Chromium 用）
cd todo-app && npx electron ../website/tools/capture-main.cjs --remote-debugging-port=9777
# 3) 截图（已存在的文件自动跳过；删除某张即可重截那张）
node website/tools/capture.mjs
# 产出在 website/tools/shots/，确认后拷贝到 website/assets/shots/
```

## 部署（发布时执行）

任选其一，仓库无需改动：

- **GitHub Pages**：仓库 Settings → Pages → 选 `main` 分支 `/website` 目录（或加 GitHub Action）。建议绑定 `pickdone.app` 并开启 HTTPS
- **其他静态托管**（Cloudflare Pages / Vercel / Netlify）：构建命令留空，输出目录填 `website`
- 部署后补两件事：`og:image` 分享图（1280×640）；域名备案与公众号等本土化家具（如走国内线）

## 约束（改版前必读）

- 宣传红线：不点名任何竞品、不提习惯/项目等实验性模块、不暴露实现细节（见 docs/宣传/宣发方案.md）
- 文案修改进 `main.js` 的 `I18N`（中英两份都要改），页面静态中文是 no-JS 兜底
- 新增截图后建议用 `website/tools/verify.mjs` + `sections.mjs` 过一遍桌面/移动/双语渲染
