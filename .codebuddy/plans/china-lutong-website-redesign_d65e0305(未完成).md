---
name: china-lutong-website-redesign
overview: 重新设计莆田市中路通机械有限公司（www.china-lutong.com）官方网站，采用纯静态HTML/CSS/JS技术栈，实现中英双语企业站（首页、关于我们、产品中心、新闻动态、联系我们 + 英文对应页面），国际化大气风格，大图全屏滚动视觉体验。
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
      - "#0A1F3F → #1E3A5F"
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
    content: 创建项目目录结构和基础HTML框架（中英文共10页面骨架、CSS/JS目录、公共资源引入）
    status: pending
  - id: design-tokens
    content: 使用 [skill:ui-styling] 和 [skill:ui-ux-pro-max] 构建CSS设计令牌体系（颜色/字体/间距/阴影变量、全局重置、响应式断点）
    status: pending
    dependencies:
      - setup-structure
  - id: global-components
    content: 实现全局共享组件（固定导航栏含语言切换与移动端菜单、页脚、滚动动画模块、图片懒加载）
    status: pending
    dependencies:
      - design-tokens
  - id: homepage
    content: 使用 [skill:banner-design] 和 [skill:frontend-design] 实现中英文首页（全屏Hero、数据统计、产品分类卡片、品牌Logo墙、新闻简报）
    status: pending
    dependencies:
      - global-components
  - id: about-page
    content: 实现中英文关于我们页面（公司介绍、发展历程时间轴、ISO认证、工厂实力展示）
    status: pending
    dependencies:
      - global-components
  - id: products-page
    content: 实现中英文产品中心页面（11类产品分类导航、产品网格卡片、询盘引导横幅）
    status: pending
    dependencies:
      - global-components
  - id: news-contact-pages
    content: 实现中英文新闻动态页面和联系我们页面（新闻列表、分类筛选、联系表单与静态表单服务集成、地图嵌入）
    status: pending
    dependencies:
      - global-components
  - id: polish-deploy
    content: 整体精细调优（响应式适配验证、交互动效完善、SEO元标签补全、跨浏览器兼容性测试）
    status: pending
    dependencies:
      - homepage
      - about-page
      - products-page
      - news-contact-pages
---

## 用户需求

为莆田市中路通机械有限公司（china-lutong.com）全新设计官方网站，采用纯静态HTML/CSS/JS技术栈，打造国际化大气风格的中英双语企业门户网站。

## 产品概述

中路通机械始建于1982年，是柴油发动机燃油喷射系统（EFI/EGI）配件专业制造商，拥有ISO9001:2015认证，6000+种产品型号，远销南美、中东、东南亚等全球市场。网站需面向B2B外贸客户，展现企业实力与产品专业性。

## 核心页面（中英双语共10页）

- **首页（中文/英文）**：全屏大图Hero区、公司实力数据、核心产品分类导航、合作品牌展示、新闻简报、底部联系方式
- **关于我们（中英）**：公司发展历程时间轴、ISO认证、工厂实力展示（厂区/设备/团队）、企业文化
- **产品中心（中英）**：11大类产品分类卡片网格、产品应用领域、配套品牌展示、询盘引导
- **新闻动态（中英）**：展会信息列表、公司新闻、行业资讯
- **联系我们（中英）**：联系表单（formspree/web3forms等静态表单方案）、地址电话邮箱信息、地图嵌入

## 技术栈选型

- **HTML5**：语义化标签（header/nav/main/section/article/footer），SEO友好
- **CSS3**：CSS自定义属性（主题色/字体/间距Token）、Flexbox + Grid布局、CSS动画与过渡、@media响应式查询
- **原生JavaScript（ES6+）**：语言切换模块、移动端菜单、滚动动画（Intersection Observer）、Tab切换、图片懒加载、平滑滚动
- **图标方案**：内联SVG（避免第三方依赖）
- **表单方案**：formspree.io 或 Web3Forms（纯前端表单提交，无需后端）

## 实现策略

### 整体架构

采用传统多页面结构，中英文页面各自独立部署，通过语言切换按钮跳转对应页面。每个页面共享同一套CSS和JS模块，通过`<link>`和`<script>`引入公共资源。

```
根目录/
├── index.html              # 中文首页
├── about.html              # 中文关于我们
├── products.html           # 中文产品中心
├── news.html               # 中文新闻动态
├── contact.html            # 中文联系我们
├── en/                     # 英文版目录
│   ├── index.html
│   ├── about.html
│   ├── products.html
│   ├── news.html
│   └── contact.html
├── css/
│   ├── common.css          # 公共样式（变量、重置、导航、页脚、响应式）
│   └── pages/              # 各页面特有样式
├── js/
│   ├── common.js           # 公共JS（语言切换、移动菜单、滚动动画、懒加载）
│   └── pages/              # 各页面特有JS
├── images/                 # 图片资源
└── assets/                 # 其他静态资源
```

### 关键设计决策

1. **语言切换**：页面顶部固定语言切换按钮，点击跳转到对应的中/英文页面。每个页面的`<html lang="">`属性正确设置（zh-CN / en），有助于SEO。
2. **响应式断点**：Mobile < 768px、Tablet 768px-1024px、Desktop > 1024px，优先移动端适配。
3. **性能优化**：图片使用WebP格式+JPG兜底、Intersection Observer实现懒加载、CSS动画使用transform/opacity触发GPU加速、关键CSS内联、非关键CSS延迟加载。
4. **SEO基础**：meta description/keywords、og标签、结构化数据（Organization schema）、语义化HTML、sitemap链接。
5. **无外部框架依赖**：不引入jQuery/Bootstrap等第三方库，保持包体积最小化，所有交互用原生JS实现。

### 实施注意事项

- 使用CSS自定义属性统一管理颜色/间距/字体Token，确保中英文版本视觉一致
- 移动端菜单使用纯CSS + JS toggle实现，无需第三方汉堡菜单库
- 表单提交使用fetch API调用formspree/web3forms端点，附加载状态和成功/失败提示
- 滚动动画使用Intersection Observer API，避免滚动事件轮询的性能问题
- 图片占位使用低分辨率base64占位符，配合lazyload实现渐进式加载

## 设计风格：国际化工业科技风

整体采用国际化B2B工业品牌视觉语言，以深邃工业蓝为主色调，搭配金属灰与纯净白，通过大画幅背景图片、全屏滚动视差效果、几何分割布局，展现中路通作为柴油发动机配件制造商的全球视野与技术实力。

### 首页设计（6大区块）

**区块1 - 全屏Hero区**

- 大面积工业场景背景图（柴油发动机/精密零件微距），覆盖100vh
- 中心居中大标题「全球柴油喷射系统核心供应商」，配合渐变遮罩增强文字可读性
- 副标题简要说明+两个CTA按钮（查看产品/联系我们），按钮采用边框发光悬停动效
- 底部向下滚动指示箭头，带弹跳动画

**区块2 - 数据实力展示**

- 深蓝背景上的4列数据卡片：成立年份（1982）、产品型号（6000+）、出口国家（30+）、ISO认证
- 数字使用JS计数动画从0递增到目标值
- 卡片采用毛玻璃半透明效果

**区块3 - 核心产品分类**

- 白色背景，网格展示6大产品类别（VE泵头、喷油嘴、柱塞、出油阀、共轨系统、喷油器总成）
- 每个卡片包含产品图片+名称+简短描述，悬停时图片放大+阴影加深
- 底部「查看全部产品」按钮链接产品中心

**区块4 - 应用领域与合作品牌**

- 浅灰背景，Logo墙展示配套品牌（博世、康明斯、卡特、德尔福、洋马等）
- 品牌Logo采用灰度处理，悬停时恢复彩色

**区块5 - 新闻简报**

- 3列新闻卡片，每列含展会图片+日期标签+标题+摘要
- 卡片悬停时标题颜色变化+底部边框动画

**区块6 - 页脚区域**

- 深蓝渐变背景，4列布局：公司简介、快速链接、产品分类、联系方式
- 底部版权栏 + 社交媒体图标（可选）

### 关于我们页面设计

- 顶部Banner（工厂全景照片半屏展示+页面标题）
- 公司介绍区（左右分栏：文字+工厂图片）
- 发展历程时间轴（1982年至今，垂直时间线+交替卡片）
- ISO认证展示区
- 工厂实力区（3列：生产设备/质检流程/仓储物流）

### 产品中心页面设计

- 顶部Banner
- 产品分类侧边栏（桌面端）或顶部下拉（移动端），11个分类
- 右侧网格展示产品卡片（图片+名称+型号范围）
- 每张卡片悬停显示简要规格
- 底部询盘引导横幅

### 新闻动态页面设计

- 顶部Banner
- 新闻列表：左侧大图+右侧标题/日期/摘要的横向卡片布局
- 分类筛选标签（全部/展会/公司新闻/行业资讯）
- 分页（静态实现，按年份归档）

### 联系我们页面设计

- 顶部Banner
- 左右分栏：左侧联系表单（姓名/邮箱/电话/公司名/留言），右侧联系信息卡片（地址/电话/邮箱/工作时间）+ 嵌入式地图
- 表单提交后显示成功反馈

### 全局导航设计

- 固定顶部导航栏，滚动时添加背景模糊效果
- 桌面端：Logo左对齐 + 5个导航链接居中 + 语言切换按钮右对齐 + 「询盘」CTA按钮
- 移动端：Logo + 语言切换 + 汉堡菜单按钮，展开后全屏覆盖菜单
- 当前页面导航高亮（下划线指示器动画）

### 字体系统

<title>字体系统</title>

- **标题字体**：Montserrat（英文标题）/ 思源黑体 Noto Sans SC（中文标题），Bold 700
- **正文字体**：Inter（英文正文）/ 思源黑体 Noto Sans SC（中文正文），Regular 400
- **Hero主标题**：48px Desktop / 32px Mobile，字重700，字母间距-0.02em
- **区块标题**：36px Desktop / 28px Mobile，字重600
- **正文**：16px，行高1.6

### 色彩系统

- **主色调**：#0A1F3F 深海蓝（导航/页脚/主要按钮/强调元素）
- **辅助色**：#1A56DB 亮蓝（链接/悬停/次要按钮）
- **强调色**：#F59E0B 琥珀金（CTA按钮/数据高亮/询盘引导）
- **背景**：#FFFFFF 纯白（内容区背景）、#F8FAFC 浅灰（交替区块背景）
- **文字**：#1E293B 深灰（主文字）、#64748B 中灰（辅助文字）、#FFFFFF 白色（深色背景文字）
- **功能色**：#10B981 成功绿、#EF4444 错误红

## Agent Extensions

### Skill

- **ui-ux-pro-max**
- 用途：查询UI设计风格数据库，获取工业B2B网站的布局模式、配色方案、字体搭配和UX交互规范参考
- 预期成果：获得工业制造行业B2B网站的最佳设计实践和交互模式建议

- **frontend-design**
- 用途：指导整体视觉设计方向，确保网站设计具有独特性和专业感，避免模板化外观
- 预期成果：产出具有辨识度的视觉设计方案，包括排版节奏、色彩层次、空间留白策略

- **ui-styling**
- 用途：构建CSS设计令牌体系（变量、间距、组件样式），确保中英双语页面的样式一致性
- 预期成果：完整的CSS自定义属性体系，可复用的组件样式规范

- **banner-design**
- 用途：设计首页Hero区大画幅Banner视觉方案，呈现工业感与国际化气质
- 预期成果：Hero区设计稿，包含背景图方案、文字排版和CTA按钮布局

- **design**
- 用途：生成品牌Logo变体设计和企业形象识别元素
- 预期成果：适配网站的Logo方案和品牌色彩规范

### SubAgent

- **code-explorer**
- 用途：在实现过程中检查各页面文件的结构一致性和引用完整性
- 预期成果：确保所有HTML文件正确引用CSS/JS资源，中英文页面链接正确