---
name: industrial-redesign-en
overview: 对英文版5个页面进行工业风格重设计：创建 industrial.css 覆盖视觉系统（暗黑调色板+钢板纹理+齿轮元素+工业字体+粗犷边框），仅修改英文版页面引用新CSS。
design:
  architecture:
    framework: html
  styleKeywords:
    - Dark Industrial
    - Heavy Metal
    - Mechanical
    - Factory Floor
    - Precision Engineering
    - Gear Textures
    - 琥珀警示色
  fontSystem:
    fontFamily: Rajdhani, Share Tech Mono, Noto Sans
    heading:
      size: clamp(2rem,5vw,3rem)
      weight: 700
    subheading:
      size: 1.125rem
      weight: 600
    body:
      size: 1rem
      weight: 400
  colorSystem:
    primary:
      - "#0d0d0d"
      - "#1a1a1a"
      - "#222222"
      - "#2a2a2a"
    background:
      - "#0d0d0d"
      - "#1a1a1a"
      - "#e8e2d8"
    text:
      - "#e0e0e0"
      - "#b0b0b0"
      - "#888888"
    functional:
      - "#c77d20"
      - "#cc3333"
      - "#e8e2d8"
todos:
  - id: create-industrial-css
    content: 使用 [skill:ui-ux-pro-max] 和 [skill:frontend-design] 获取工业设计参考，新建 css/industrial.css（~700行），覆盖 :root 变量、组件样式，注入齿轮/钢板/蓝图网格装饰纹理
    status: pending
  - id: update-en-html
    content: 为 en/index.html、about.html、products.html、news.html、contact.html 各添加一行 industrial.css 引用（在 common.css 之后）
    status: pending
    dependencies:
      - create-industrial-css
  - id: verify-industrial-look
    content: 验证英文版5页工业风格生效，确认暗黑背景、琥珀强调色、锐角边框、重型动画全部到位，且中文/俄语/西班牙语版本不受影响
    status: pending
    dependencies:
      - update-en-html
---

## 用户需求

对中路通英文版网站进行工业风格重设计，解决"不够大气、和网络模板太相似"的问题。

## 产品概述

将当前 Swiss Modernism 2.0 白净风格彻底转换为**暗黑重型工厂美学**——体现柴油机精密零件制造企业的厚重感、专业性和独特个性。

## 核心功能

- **暗黑工业调色板**：炭黑主背景 + 暗钢表面色 + 工业琥珀强调色 + 警示红功能色
- **重型字体系统**：Rajdhani 几何标题 + Share Tech Mono 等宽数据 + Noto Sans 正文
- **机械装饰纹理**：齿轮 SVG 背景图案 + 钢板对角线纹理 + 蓝图网格叠加
- **锐利边框造型**：圆角从 8-24px 收至 2-4px，边框加粗至 2px solid
- **重型入场动画**：translateY(40px→0) 替代原 24px 淡入，营造力量感
- **范围限定**：仅修改英文版 5 页面，中文/俄语/西班牙语保持原样

## 技术方案

### 实现策略：CSS 变量覆盖法

common.css 中所有组件样式均通过 `:root` 自定义属性控制颜色、圆角、阴影、字体。在 common.css 之后加载 `industrial.css`，利用 CSS 层叠机制覆盖 `:root` 变量值 + 少数需要直接干预的组件样式，即可实现全局外观切换。

**核心优势**：不改动 common.css（零影响中文/俄语/西班牙语），仅需新建一个 CSS 文件 + 在 5 个英文 HTML 中各加一行 `<link>`。

### 文件变更清单

```
project-root/
├── css/
│   └── industrial.css          # [NEW] 工业风格样式表 (~700行)
├── en/
│   ├── index.html              # [MODIFY] 添加 industrial.css 引用
│   ├── about.html              # [MODIFY] 添加 industrial.css 引用
│   ├── products.html           # [MODIFY] 添加 industrial.css 引用
│   ├── news.html               # [MODIFY] 添加 industrial.css 引用
│   └── contact.html            # [MODIFY] 添加 industrial.css 引用
```

### industrial.css 架构设计

文件结构按模块组织（~700行）：

```
1. 字体引入 (Rajdhani + Share Tech Mono)
2. :root 变量全覆盖 (颜色/字体/圆角/阴影/边框)
3. 工业装饰纹理 (齿轮SVG/钢板对角线/蓝图网格 CSS背景)
4. Body & 基础排版覆盖
5. 导航栏重写 (厚底边琥珀线 + 暗黑背景)
6. Hero 区重写 (齿轮叠加层 + 重型标题)
7. 统计区重写 (等宽数据 + 危险条纹分隔线)
8. 产品卡片重写 (暗钢板底色 + 琥珀悬停边框发光)
9. 品牌区重写
10. 新闻卡片重写
11. 时间轴重写 (铆钉装饰)
12. 页面横幅重写
13. 表单重写 (暗色输入框 + 琥珀 focus)
14. 页脚重写 (炭黑 + 粗边框)
15. 动画覆盖 (重型入场)
16. 响应式覆盖
```

### 设计令牌对照表

| 令牌 | 原值 | 工业风格值 |
| --- | --- | --- |
| --color-primary | #0F172A (海军蓝) | #0d0d0d (炭黑) |
| --color-background | #FFFFFF | #0d0d0d |
| --color-surface | #F8FAFC | #1a1a1a |
| --color-accent | #0369A1 (蓝) | #c77d20 (工业琥珀) |
| --color-cta | #F59E0B | #c77d20 |
| --color-text | #1E293B | #e0e0e0 |
| --color-text-muted | #64748B | #888888 |
| --color-border | #E2E8F0 | #333333 |
| --font-heading | Montserrat | Rajdhani |
| --radius-md | 8px | 2px |
| --radius-xl | 16px | 4px |
| --shadow-card | 软阴影 | 无阴影(用border替代) |


## 设计风格：暗黑重型工业 (Dark Heavy Industrial)

### 视觉主题

以柴油发动机制造车间为灵感——炭黑基调、暗钢表面、机械齿轮装饰、琥珀色警示点缀，营造精密重型制造的视觉冲击力。

### 色彩系统

- **Primary**: #0d0d0d 炭黑 — 全局背景，模拟铸造车间暗色
- **Surface**: #1a1a1a / #222222 / #2a2a2a — 三层钢板灰度递进
- **Accent**: #c77d20 工业琥珀 — 唯一暖色强调，用于按钮/边框/高亮
- **Functional**: #cc3333 警示红 — 用于错误状态/危险条纹
- **Light Surface**: #e8e2d8 暖水泥 — 精致亮面卡片背景(contacts等)
- **Text**: #e0e0e0 主文字 / #999 次级文字 / #e8e2d8 亮面文字

### 排版层级

- **Hero标题**: Rajdhani 700, clamp(2.5rem,6vw,4.5rem), letter-spacing: -0.03em, #e0e0e0
- **区块标题**: Rajdhani 600, 2rem, text-transform: uppercase, letter-spacing: 0.08em, 底部2px琥珀短线装饰
- **卡片标题**: Rajdhani 600, 1.125rem, #e0e0e0
- **统计数据**: Share Tech Mono 400, 2.5rem, #c77d20, tabular-nums
- **正文**: Noto Sans 400, 1rem, #b0b0b0, line-height: 1.7

### 装饰系统

- **齿轮图案**: CSS `background-image` 嵌入 data-URI SVG 齿轮，opacity 0.03-0.06，Hero 区和 Stats 区叠加
- **钢板纹理**: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)` 用于卡片背景
- **蓝图网格**: `linear-gradient` 纵横线 + 径向圆点，用于 section-gray 区替代原浅灰
- **危险条纹**: `repeating-linear-gradient` 黄黑斜条纹，用于 Stats 区间分隔和 footer 顶部
- **铆钉装饰**: `::before` 伪元素绝对定位小圆点，用于时间轴节点和卡片四角

### 组件造型

- **导航**: 炭黑底色 #0d0d0d，底部 2px solid #c77d20 底线，链接 uppercase letter-spacing 0.06em
- **卡片**: #1a1a1a 背景，2px solid #333 边框，hover 边框变 #c77d20 + `box-shadow: 0 0 20px rgba(199,125,32,0.15)` 琥珀发光
- **按钮 .btn-cta**: #c77d20 实心背景 + #0d0d0d 文字，hover 变亮 + translateY(-2px)，border-radius: 2px
- **按钮 .btn-cta-outline**: 2px solid #c77d20 边框 + 透明背景 + #c77d20 文字，hover 填充
- **输入框**: #1a1a1a 背景 + 2px solid #333 边框，focus: border-color #c77d20 + box-shadow 琥珀光晕
- **统计卡片**: 齿轮背景 + #222 背景 + 1px solid #333，等宽数字 Share Tech Mono

### 动画系统

- 入场动画: `@keyframes heavyFadeUp { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }` (取代原 24px)
- 卡片悬停: `transform: translateY(-4px)` + 琥珀光晕过渡 250ms
- Hero 齿轮层: 慢速旋转 `@keyframes gearRotate { to { transform:rotate(360deg) } }` 60s 线性无限循环

## 推荐使用的 Agent 扩展

### Skill

- **ui-ux-pro-max**
- 用途：检索工业风格设计参考、暗黑主题色板数据、字体配对方案
- 预期成果：获取 Heavy Industrial / Dark Mode / Mechanical 风格的具体色值参考和排版建议

- **frontend-design**
- 用途：指导工业风格的整体视觉方向，确保不落入模板化设计
- 预期成果：获得对齿轮纹理、钢板质感、铆钉装饰等机械元素在 CSS 中实现的最佳实践建议