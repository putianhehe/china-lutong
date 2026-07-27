---
name: industrial-redesign-en
overview: 对英文版5页进行国际大厂工业风格重设计：暗色基调+重型字体+大胆色块分割+超大留白+克制几何线条，完全去掉齿轮/铆钉/条纹等AI感装饰。
design:
  architecture:
    framework: html
  styleKeywords:
    - Industrial Minimalism
    - Dark Enterprise
    - Bold Geometric
    - Restrained Authority
    - Clean Heavy
  fontSystem:
    fontFamily: Rajdhani, Noto Sans, Share Tech Mono
    heading:
      size: clamp(2.5rem,6vw,4.5rem)
      weight: 700
    subheading:
      size: clamp(1.75rem,3vw,2.5rem)
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
      - "#1a1a1a"
    functional:
      - "#c77d20"
      - "#d98a2e"
      - "#e6942a"
todos:
  - id: create-industrial-css
    content: 使用 [skill:frontend-design] 和 [skill:ui-ux-pro-max] 获取工业大厂设计参考，新建 css/en-industrial.css（~600行），覆盖 :root 变量、组件样式，采用明暗交替区块、克制直线条、零纹理装饰
    status: completed
  - id: update-en-html-refs
    content: 为 en/index.html、about.html、products.html、news.html、contact.html 各添加一行 en-industrial.css 引用（在 common.css 之后）
    status: completed
    dependencies:
      - create-industrial-css
  - id: verify-industrial
    content: 验证英文版5页：暗黑背景生效、琥珀强调色到位、明暗区块交替正确、零AI装饰元素、CN/RU/ES不受影响
    status: completed
    dependencies:
      - update-en-html-refs
---

## 用户需求

对中路通英文版网站进行国际大厂工业风格重设计，解决"不够大气、和网络模板太相似"的问题。

**核心约束**：去掉所有AI味装饰元素，参考CAT/博世/康明斯/西门子等真正国际工业企业官网的克制美学。

## 产品概述

将当前 Swiss Modernism 2.0 白净风格转换为**国际大厂工业风格**。关键词：克制、权威、专业、不做作。采用暗黑基底、大胆色块分割明暗交替、超大留白、硬朗几何水平分割线、大图满版冲击、极致克制的装饰元素。

## 核心特征

- **暗黑基调 + 亮面交替**：区块按暗→亮→暗→亮节奏交替，形成强烈的明暗对比冲击力
- **大胆色块分割**：Hero全暗黑满版大图 → 亮面Stats统计区 → 暗面Products产品区 → 深灰Brands品牌区，每个区块由硬朗几何线分隔
- **超大留白**：section间距6-8rem，区块内padding宽松，消除模板网站的拥挤廉价感
- **重型字体系统**：Rajdhani(硬朗几何标题) + Share Tech Mono(等宽数据) + Noto Sans(正文)
- **克制几何线条**：直角/2px微圆角、2px solid边框、纯直线分割（零曲线零齿轮零铆钉）
- **大图满版**：Hero全屏大图+暗色渐变叠加，产品卡片图片占比70%+
- **极致克制装饰**：仅用直线条和色块分割，无任何图案纹理装饰
- **范围限定**：仅英文版5个HTML页面，CN/RU/ES保持原样

## 技术方案

### 实现策略：CSS变量覆盖 + 组件样式重写

common.css 中所有组件样式均通过 `:root` CSS自定义属性控制颜色、圆角、阴影、字体。在 common.css 之后加载 `en-industrial.css`，利用CSS层叠机制覆盖 `:root` 变量值，再加上少数需要直接干预的组件样式（布局结构变化），即可实现全局外观切换。

**核心优势**：不改动 common.css（零影响CN/RU/ES），仅需新建1个CSS文件 + 5个HTML各加一行 `<link>`。

### 设计令牌对照表

| 令牌 | 原值(Swiss Modernism) | 工业大厂值 |
| --- | --- | --- |
| --color-primary | #0F172A (海军蓝) | #0d0d0d (纯黑) |
| --color-primary-light | #1E293B | #1a1a1a |
| --color-primary-mid | #334155 | #2a2a2a |
| --color-accent | #0369A1 (蓝) | #c77d20 (琥珀) |
| --color-accent-light | #0284C7 | #d98a2e |
| --color-accent-glow | #38BDF8 | rgba(199,125,32,0.2) |
| --color-cta | #F59E0B | #c77d20 |
| --color-cta-hover | #D97706 | #e6942a |
| --color-background | #FFFFFF | #0d0d0d |
| --color-surface | #F8FAFC | #1a1a1a |
| --color-surface-alt | #F1F5F9 | #222222 |
| --color-muted | #E8ECF1 | #2a2a2a |
| --color-text | #1E293B | #e0e0e0 |
| --color-text-muted | #64748B | #888888 |
| --color-text-inverse | #FFFFFF | #FFFFFF |
| --color-border | #E2E8F0 | #333333 |
| --font-heading | Montserrat | Rajdhani |
| --radius-md | 8px | 0 (直角) |
| --radius-lg | 12px | 2px |
| --radius-xl | 16px | 2px |
| --radius-2xl | 24px | 4px |
| --shadow-card | 多层软阴影 | none (border替代) |
| --shadow-lg | 大软阴影 | none |
| --shadow-xl | 超大软阴影 | none |


### 文件变更清单

```
project-root/
├── css/
│   └── en-industrial.css       # [NEW] 工业大厂风格样式表 (~600行)
├── en/
│   ├── index.html              # [MODIFY] 在 common.css 后添加 en-industrial.css 引用
│   ├── about.html              # [MODIFY] 同上
│   ├── products.html           # [MODIFY] 同上
│   ├── news.html               # [MODIFY] 同上
│   └── contact.html            # [MODIFY] 同上
```

### en-industrial.css 架构设计（~600行，16个模块）

```
1.  字体引入 (@import Google Fonts: Rajdhani + Share Tech Mono)
2.  :root 变量全覆盖 (颜色/字体/圆角/阴影/间距/边框)
3.  Body & 基础排版覆盖 (暗黑背景，亮色文字)
4.  导航栏重写 (暗黑背景 #0d0d0d + 底部2px琥珀实线 + uppercase link)
5.  Hero 区重写 (全屏大图 + 深黑渐变叠加 + 超大标题 + 32px留白)
6.  统计区重写 (亮面 #e8e2d8 背景形成明暗对比 + 等宽大数字)
7.  产品卡片重写 (暗钢板底 + 直角 + 2px边框 + 琥珀hover边框)
8.  品牌区重写 (深灰背景 + 大间距)
9.  新闻卡片重写 (暗底 + 2px边框)
10. 时间轴重写 (直线分割 + 节点圆点收至6px)
11. 页面横幅重写 (全暗黑 + 大标题)
12. 表单重写 (暗输入框 + 2px边框 + 琥珀focus光环)
13. 页脚重写 (纯黑底 + 2px琥珀顶部分割线)
14. 动画覆盖 (translateY(40px)重型入场 替代 24px淡入)
15. 色块交替辅助类 (section-light/section-dark 明暗区块切换)
16. 响应式覆盖 (移动端间距调整)
```

### 明暗交替区块布局设计

首页区块节奏（暗→亮→暗→深灰）：

- Hero (暗#0d0d0d) → Stats (亮#e8e2d8) → Products (暗#0d0d0d) → Brands (深灰#1a1a1a)

内页区块节奏：

- Banner (暗) → 主内容 (暗) → 次要区块 (深灰或亮)

每个区块交界处用2px琥珀水平线或硬朗色块边缘自然分割。

### 工业克制装饰原则

- **只用直线**：border、分割线、下划线，全部是直的
- **只用矩形**：卡片、按钮、标签，全部直角或2px微圆角
- **不用图案**：零齿轮、零纹理、零条纹、零铆钉、零网格
- **不用渐变装饰**：按钮和背景使用纯色，不用gradient做装饰
- **色彩克制**：全站仅使用黑/白/灰/琥珀四个色系，无蓝色、无绿色、无紫色
- **大图说话**：让产品图片和工厂图片成为唯一的"装饰"

## 设计方向：国际大厂工业克制美学

参考CAT(Caterpillar)的黑黄厚重感、博世(Bosch)的冷峻精准、康明斯(Cummins)的深色工业权威感。核心原则：**节制产生力量**。

## 色彩系统

- **Primary**: #0d0d0d 纯黑 — 全局主背景色
- **Surface Dark**: #1a1a1a / #222222 — 深灰表面，用于卡片和次要区域
- **Surface Light**: #e8e2d8 暖灰白 — 对比亮面区块背景，形成明暗交替节奏
- **Accent**: #c77d20 工业琥珀 — 全站唯一强调色，仅用于CTA按钮、关键边框、数据数字
- **Text**: #e0e0e0 主文字 / #b0b0b0 正文 / #888 次级文字 / #1a1a1a 亮面文字
- **Border**: #333 通用边框 / #c77d20 强调边框

## 排版层级

- **Hero标题**: Rajdhani 700, clamp(2.5rem,6vw,4.5rem), letter-spacing: -0.02em, #ffffff
- **区块标题**: Rajdhani 600, clamp(1.75rem,3vw,2.5rem), uppercase, letter-spacing: 0.06em, 底部无装饰线（用留白代替）
- **卡片标题**: Rajdhani 600, 1.125rem, #e0e0e0
- **统计数据**: Share Tech Mono 400, 2.5rem, #c77d20(暗底)/#0d0d0d(亮底)
- **正文**: Noto Sans 400, 1rem, #b0b0b0(暗底)/#333(亮底), line-height: 1.75

## 布局系统

- 区块间距: 6-8rem (桌面) / 4rem (移动)
- 区块内左右padding: 4rem (桌面)
- 卡片间距: 2rem+
- 内容最大宽度: 1280px (保留原值)
- 色块交替: 暗→亮→暗→深灰 轮换，每色块占满视口宽度

## 组件造型

- **导航栏**: 纯黑底 #0d0d0d，底部 2px solid #c77d20 贯穿全宽
- **Hero区**: 全屏大图(满版) + 深黑渐变叠加(rgba(0,0,0,0.75)→rgba(0,0,0,0.4))，标题左对齐或居中但超大字号
- **统计卡片**: 亮面区块内深色文字+琥珀数字，无背景色卡片（仅靠留白分割）
- **产品卡片**: 暗面 #1a1a1a 底 + 2px solid #333 边框，hover边框变 #c77d20，图占比70%
- **新闻卡片**: 同上
- **按钮CTA**: #c77d20 实心 + #0d0d0d 粗体文字，hover背景变亮 #d98a2e，无阴影
- **按钮Outline**: 2px solid #c77d20 + 透明底 + #c77d20 文字，hover填充
- **输入框**: #1a1a1a 底 + 2px solid #333 边框，focus边框 #c77d20
- **页脚**: #0d0d0d 底，顶部 2px solid #c77d20 贯穿分割线

## 动画

- 入场: translateY(40px→0) + opacity 0→1, duration 0.6s ease
- 卡片hover: translateY(-4px) + border-color 过渡 200ms (无光晕、无发光)
- 无旋转动画、无脉冲动画、无复杂运动

## Agent Extensions

### Skill

- **frontend-design**
- 用途：提供国际大厂工业网站的视觉方向指导，确保设计不落入模板化或AI味陷阱
- 预期成果：获取CAT/博世/康明斯等真实工业网站的克制美学参考，指导布局节奏和留白比例

- **ui-ux-pro-max**
- 用途：检索 Dark Industrial / Enterprise / Heavy Sans-Serif 风格的具体色板数据和字体配对方案
- 预期成果：获取精确的暗黑工业色值参考、Rajdhani/Share Tech Mono 字体最佳使用场景