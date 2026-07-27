---
name: china-lutong-website-redesign
overview: 为中路通机械（china-lutong.com）重新设计4语言（中文/English/Русский/Español）企业官网，纯静态HTML/CSS/JS，共20页，国际化工业科技风。
design:
  architecture:
    framework: html
  styleKeywords:
    - Industrial Technology
    - International Corporate
    - Fullscreen Hero
    - Glassmorphism Cards
    - Gradient Overlay
    - Precision Engineering
    - Clean Layout
    - Professional B2B
  fontSystem:
    fontFamily: Montserrat, Noto Sans SC, Inter
    heading:
      size: 48px
      weight: 700
    subheading:
      size: 28px
      weight: 600
    body:
      size: 16px
      weight: 400
  colorSystem:
    primary:
      - "#0A1F3F"
      - "#1A56DB"
      - "#F59E0B"
    background:
      - "#FFFFFF"
      - "#F8FAFC"
      - "#0A1F3F"
    text:
      - "#1E293B"
      - "#64748B"
      - "#FFFFFF"
    functional:
      - "#10B981"
      - "#EF4444"
      - "#F59E0B"
todos:
  - id: setup-structure
    content: 创建项目目录结构（cn/en/ru/es四语言目录 + css/js/images + 根入口index.html + sitemap.xml）
    status: completed
  - id: design-tokens
    content: 使用 [skill:ui-styling] 和 [skill:ui-ux-pro-max] 构建CSS设计令牌体系与全局样式（common.css：Tailwind CDN导入、颜色/字体/间距CSS变量、全局重置、导航/页脚/动画基类、响应式断点）
    status: completed
    dependencies:
      - setup-structure
  - id: common-js
    content: 实现全局公共JS模块 common.js（语言路由切换、移动端菜单toggle、Intersection Observer滚动动画、数字计数动画、图片懒加载、Tab筛选切换）
    status: completed
    dependencies:
      - setup-structure
  - id: homepage-cn
    content: 使用 [skill:banner-design] 和 [skill:frontend-design] 实现中文首页 cn/index.html（全屏Hero、数据统计、6大产品分类卡片、品牌Logo墙、新闻简报、页脚）
    status: completed
    dependencies:
      - design-tokens
      - common-js
  - id: homepage-langs
    content: 基于中文首页复制并生成 en/ru/es 三语言首页（内容替换为对应语言真实数据）
    status: completed
    dependencies:
      - homepage-cn
  - id: about-pages
    content: 实现4语言关于我们页面（cn/en/ru/es about.html：公司介绍左右分栏、发展历程时间轴、ISO认证、工厂实力3列展示）
    status: completed
    dependencies:
      - homepage-langs
  - id: products-pages
    content: 实现4语言产品中心页面（cn/en/ru/es products.html：11类产品侧边栏分类导航、产品网格卡片、询盘引导横幅）
    status: completed
    dependencies:
      - homepage-langs
  - id: news-contact-pages
    content: 实现4语言新闻动态页面和联系我们页面（news.html：展会列表+分类筛选；contact.html：表单+联系信息+地图嵌入）
    status: completed
    dependencies:
      - homepage-langs
  - id: polish-verify
    content: 使用 [subagent:code-explorer] 检查20页面引用完整性，补全SEO元标签（og/twitter/schema）、跨浏览器兼容验证、响应式适配确认
    status: completed
    dependencies:
      - about-pages
      - products-pages
      - news-contact-pages
---

## 用户需求

为莆田市中路通机械有限公司（china-lutong.com）从零全新设计官方网站，采用纯静态HTML/CSS/JS技术栈，打造国际化工业科技风格的4语言企业门户网站。

## 产品概述

中路通机械品牌可追溯至1982年，是柴油发动机燃油喷射系统（EFI/EGI）配件专业制造商，拥有ISO9001:2015认证，6000+种产品型号，出口30+国家。网站面向B2B外贸客户，展现企业实力与产品专业性。

## 核心功能

### 4语言 x 5页 = 20页结构

- **首页**：全屏Hero大图、公司实力数据计数动画、核心产品分类卡片、合作品牌Logo墙、新闻简报、页脚联系方式
- **关于我们**：公司介绍左右分栏、发展历程时间轴、ISO认证展示、工厂实力3列展示（设备/质检/仓储）
- **产品中心**：11大产品分类侧边栏导航、产品网格卡片、询盘引导横幅
- **新闻动态**：展会信息列表、分类筛选标签（全部/展会/公司新闻/行业资讯）、静态分页
- **联系我们**：联系表单（formspree/web3forms）、联系信息卡片、嵌入式地图

### 全局交互

- 固定导航栏含4语言切换下拉菜单和移动端汉堡菜单
- 数字递增计数动画、Intersection Observer滚动入场动画
- 图片懒加载、Tab筛选切换

## 技术栈

- **HTML5**：语义化标签（header/nav/main/section/article/footer），SEO友好
- **CSS3**：Tailwind CSS CDN + CSS自定义属性（颜色/字体/间距/阴影Tokens）、Flexbox + Grid布局、CSS动画与过渡、@media响应式查询
- **原生JavaScript（ES6+）**：语言切换路由、移动端菜单toggle、滚动动画（Intersection Observer）、Tab切换、图片懒加载、平滑滚动
- **图标方案**：内联SVG（svgrepo.com），避免第三方图标库依赖
- **表单方案**：Web3Forms（纯前端表单提交，无需后端）
- **图片资源**：unsplash.com工业场景图 + placehold.co占位图

## 架构设计

### 多页面+共享资源架构

```
c:/Users/hua/CodeBuddy/20260726000943/
├── index.html                    # 根入口（自动检测浏览器语言跳转或默认中文首页）
├── cn/                           # 中文版 (zh-CN)
│   ├── index.html                # 首页
│   ├── about.html                # 关于我们
│   ├── products.html             # 产品中心
│   ├── news.html                 # 新闻动态
│   └── contact.html              # 联系我们
├── en/                           # 英文版 (en)
│   ├── index.html
│   ├── about.html
│   ├── products.html
│   ├── news.html
│   └── contact.html
├── ru/                           # 俄语版 (ru)
│   └── ... (同上5页)
├── es/                           # 西班牙语版 (es)
│   └── ... (同上5页)
├── css/
│   └── common.css                # 全局公共样式（Tailwind导入、CSS变量、导航、页脚、动画、响应式）
├── js/
│   └── common.js                 # 全局公共JS（语言切换、移动菜单、滚动动画、懒加载、计数动画、Tab切换）
└── images/
    └── logo.svg                  # 公司Logo SVG
```

### 数据流

用户访问任意页面 → HTML加载 → 引入common.css(Tailwind CDN+自定义变量) + common.js → JS初始化：语言路由设置、滚动监听、懒加载、移动菜单绑定 → 用户交互(语言切换/滚动/点击) → JS响应式处理

### 语言切换机制

导航栏固定下拉菜单列出4语言选项，点击切换到对应语言目录下的同名页面。例如：`/cn/about.html` 切换到 `/en/about.html`。使用 `document.documentElement.lang` 设置正确的语言属性以支持SEO。

## 实施注意事项

- 使用CSS自定义属性统一管理颜色/间距/字体Token，确保20页视觉一致
- 移动端菜单纯CSS + JS toggle实现
- 表单使用fetch API调用web3forms端点，含加载态和成功/失败反馈
- 滚动动画使用Intersection Observer API，避免scroll事件性能问题
- 图片使用onerror后备处理，防止资源加载失败
- 每页面含完整meta标签（description/keywords/og/twitter card）
- sitemap.xml列出所有20页链接

## 设计风格：国际化工业科技风

整体采用国际化B2B工业品牌视觉语言，以深邃工业蓝为主色调，搭配金属灰与纯净白，通过大画幅背景图片、全屏滚动视差效果、几何分割布局，展现中路通作为柴油发动机配件制造商的全球视野与技术实力。

### 首页设计（6大区块）

**区块1 - 全屏Hero区**：大面积工业场景背景图（柴油发动机/精密零件微距），覆盖100vh，渐变遮罩增强文字可读性。中心居中大标题，副标题+两个CTA按钮（边框发光悬停动效），底部向下滚动指示箭头带弹跳动画。

**区块2 - 数据实力展示**：深蓝背景4列毛玻璃卡片：成立年份(1982)、产品型号(6000+)、出口国家(30+)、ISO认证。数字JS计数动画从0递增到目标值。

**区块3 - 核心产品分类**：白色背景3x2网格展示6大产品类别卡片。每卡含产品图片+名称+简短描述，悬停时图片放大+阴影加深。底部「查看全部产品」按钮。

**区块4 - 合作品牌墙**：浅灰背景Logo墙展示8大配套品牌（Bosch/Denso/Zexel/Lucas/Delphi/Yanmar/CAT/Cummins），灰度处理悬停恢复彩色。

**区块5 - 新闻简报**：3列新闻卡片含展会图片+日期标签+标题+摘要，悬停标题变色+底部边框动画。

**区块6 - 页脚**：深蓝渐变4列（公司简介/快速链接/产品分类/联系方式）+ 版权栏。

### 关于我们页面

顶部半屏Banner + 公司介绍左右分栏 + 垂直时间轴（1982至今交替卡片） + ISO认证展示 + 工厂实力3列展示。

### 产品中心页面

顶部Banner + 桌面端分类侧边栏（11类）/ 移动端下拉 + 右侧产品网格卡片 + 底部询盘引导横幅。

### 新闻动态页面

顶部Banner + 横向大图卡片列表 + 分类筛选标签 + 静态年份归档。

### 联系我们页面

顶部Banner + 左右分栏（表单+联系信息卡片含嵌入式地图）。

### 全局导航

固定顶部导航栏滚动时背景模糊。桌面端：Logo左 + 5导航居中 + 4语言下拉右 + 询盘CTA。移动端：Logo + 语言切换 + 汉堡菜单展开全屏覆盖。当前页高亮下划线动画。

## Agent Extensions

### Skill

- **frontend-design**
- 用途：指导整体视觉设计方向，确保网站设计具有独特性和专业感，避免模板化外观
- 预期成果：产出具有辨识度的视觉设计方案，包括排版节奏、色彩层次、空间留白策略

- **ui-styling**
- 用途：构建CSS设计令牌体系（变量、间距、组件样式），确保4语言20页面的样式一致性
- 预期成果：完整的CSS自定义属性体系，可复用的组件样式规范

- **banner-design**
- 用途：设计首页Hero区大画幅Banner视觉方案，呈现工业感与国际化气质
- 预期成果：Hero区设计稿，包含背景图方案、文字排版和CTA按钮布局

- **ui-ux-pro-max**
- 用途：查询UI设计风格数据库，获取工业B2B网站的布局模式、配色方案、字体搭配和UX交互规范参考
- 预期成果：获得工业制造行业B2B网站的最佳设计实践和交互模式建议

### SubAgent

- **code-explorer**
- 用途：在实现过程中检查各页面文件的结构一致性和引用完整性
- 预期成果：确保所有HTML文件正确引用CSS/JS资源，4语言页面链接正确