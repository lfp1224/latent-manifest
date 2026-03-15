# LATENT & MANIFEST 官网

为 LATENT（胶片拍摄 App）和 MANIFEST（暗房冲洗 App）打造的官方介绍网站。

## 设计理念

- **极简主义**：大量留白，突出内容本质
- **暗色调**：纯黑背景，呼应 App 内的暗房/取景器视觉
- **胶片美学**：颗粒质感、取景器模拟、安全灯脉动
- **App 原生风格**：参考 ManifestCompanionDetailView 的设计语言

## 文件结构

```
website/
├── index.html          # 主页面（含 i18n 多语言）
├── css/
│   └── style.css       # 全部样式
├── js/
│   └── main.js         # 交互逻辑
└── assets/
    └── images/         # App 资源素材
        ├── LATN-B.png          # LATENT App Icon (黑底)
        ├── LATN-W.png          # LATENT App Icon (白底)
        ├── LATN-LD.png         # LATENT Launch Logo
        ├── LATN-AU.png         # LATENT Launch Icon
        ├── MNFT-B.png          # MANIFEST App Icon (黑底)
        ├── MNFT-W.png          # MANIFEST App Icon (白底)
        ├── MNFT-LD.png         # MANIFEST Launch Logo
        ├── ManifestScreenshot1-3.png  # MANIFEST 截图
        └── frame_classic_1x1.png     # 胶片相框素材
```

## 页面结构

1. **Hero**：双 App 图标 + TWO APPS. ONE DARKROOM. + 品牌标签
2. **Philosophy**：Shoot Blind / Develop in the Dark / Anticipation
3. **LATENT Section**：取景器模拟 + 6 个功能卡片
4. **MANIFEST Section**：暗房模拟 + 6 个功能卡片
5. **Screenshots**：3 张 MANIFEST 真实截图（可点击放大）
6. **Workflow**：3 步流程（Load → Shoot → Develop）
7. **Privacy**：100% On-Device / No Account / No Tracking
8. **Download**：App Store 按钮 + Coming Soon

## 技术栈

- HTML5 + CSS3 + 原生 JavaScript，零依赖
- 自动检测浏览器语言（中/英）
- 响应式：Desktop > 992px / Tablet 641-992px / Mobile ≤ 640px

## 本地预览

```bash
open website/index.html
# 或
python3 -m http.server 8000 -d website
```

---

© 2026. Crafted with precision by LFP.
