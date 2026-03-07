# LATENT & MANIFEST 官网

为 LATENT（胶片拍摄 App）和 MANIFEST（暗房冲洗 App）打造的官方介绍网站。

## 设计理念

- **极简主义**：大量留白，突出内容本质
- **暗色调**：深色背景，呼应 App 内的暗房/取景器视觉
- **胶片美学**：颗粒质感、齿孔元素、显影过程动画
- **高级感**：精致排版、克制动效、无多余装饰

## 文件结构

```
website/
├── index.html          # 主页面
├── css/
│   └── style.css       # 全部样式
├── js/
│   └── main.js         # 交互逻辑
└── assets/
    └── images/         # 图片资源（可选）
```

## 技术栈

- **HTML5**：语义化结构
- **CSS3**：现代 CSS 特性（Custom Properties、Grid、Animations）
- **原生 JavaScript**：零依赖，轻量级交互

## 本地预览

直接在浏览器中打开 `index.html` 即可预览：

```bash
# macOS
open index.html

# 或使用 Python 启动本地服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 页面结构

1. **Hero Section**：品牌标识 + 核心 Slogan + 双 App 入口
2. **LATENT Section**：拍摄体验展示（画幅、快门、潜影）
3. **MANIFEST Section**：冲洗流程展示（配方、LUT、仪式感）
4. **Workflow Section**：拍摄→冲洗→查看的完整流程
5. **Tech Specs**：技术规格展示
6. **Download**：下载引导

## 视觉规范

### 色彩

| 用途 | 色值 |
|------|------|
| 背景主色 | `#0a0a0a` |
| 背景次要 | `#0f0f0f` |
| 强调色 | `#8b0000`（暗房红） |
| 文字主色 | `#f5f5f5` |
| 文字次要 | `#888888` |

### 字体

- 中文：系统默认（思源黑体 / PingFang SC）
- 英文：`-apple-system`, `SF Pro Display`
- 等宽：`SF Mono`, `Monaco`, `Consolas`

## 动画特性

- **胶片颗粒**：SVG 噪声 + CSS 动画模拟胶片质感
- **安全灯脉动**：暗房红色安全灯的呼吸效果
- **对焦框**：点击取景器产生对焦动画
- **滚动淡入**：元素随滚动依次显现

## 响应式断点

- Desktop: `> 992px`
- Tablet: `641px - 992px`
- Mobile: `≤ 640px`

## 部署

可将整个 `website` 目录部署到任意静态托管服务：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## 浏览器支持

- Chrome (最新)
- Safari (最新)
- Firefox (最新)
- Edge (最新)

---

© 2026. Crafted with precision.
