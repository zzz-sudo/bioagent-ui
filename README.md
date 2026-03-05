# BioAgent-Platform 生物信息学分析中台 - 前端项目

Author: Kuroneko

## 项目简介

这是一个基于 Vue 3 + TypeScript + Vite 构建的现代化生物信息学分析中台前端项目。采用深色主题设计，配合 Three.js 3D 蛋白质分子动画、Canvas 粒子雪花特效和流金文字轮播，为用户提供沉浸式的视觉体验。

## 技术栈

- **框架**: Vue 3 (Composition API + setup 语法糖)
- **语言**: TypeScript
- **构建工具**: Vite 5.4.21
- **UI 组件库**: Element Plus
- **样式框架**: Tailwind CSS v3
- **路由**: Vue Router
- **HTTP 客户端**: Axios
- **3D 渲染**: Three.js
- **图标库**: Phosphor Icons

## 快速开始

### 环境要求

- Node.js >= 18.12.1
- npm >= 8.19.2

### 克隆项目

```bash
# 从 GitHub 克隆项目
git clone https://github.com/zzz-sudo/bioagent-ui.git

# 进入项目目录
cd bioagent-ui

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 即可看到炫酷的登录页面。

**默认账号**：`admin`  
**默认密码**：`admin`

## 项目特色

### 视觉设计亮点

1. **Three.js 3D 蛋白质分子动画**
   - 11 个彩色蛋白质分子链结构
   - 每个分子由 15-25 个原子球体通过化学键连接
   - 螺旋链状结构，模拟真实蛋白质形态
   - 随机大小（0.6-1.4 倍缩放）增强空间层次感
   - 缓慢旋转和浮动动画，配合多彩点光源

2. **Canvas 粒子雪花特效**
   - 100 个半透明白色粒子从上到下缓慢飘落
   - 自动循环，营造梦幻氛围

3. **流金文字轮播**
   - 两条标语每 5 秒自动切换
   - 金色渐变流动动画
   - 淡入淡出过渡效果

4. **Glassmorphism 磨砂玻璃设计**
   - 半透明深蓝色背景 + 20px 背景模糊
   - 登录卡片悬浮在 3D 场景之上
   - 深色阴影增强立体感

5. **Tailwind CSS 响应式布局**
   - 移动端单列布局
   - 大屏幕左右分栏（品牌展示 + 登录表单）
   - 流畅的交互动画

### 技术特色

1. **Vue 3 Composition API**：使用最新的 setup 语法糖
2. **TypeScript 严格模式**：完整的类型定义和类型安全
3. **Three.js 3D 渲染**：WebGL 硬件加速，流畅的 60fps 动画
4. **模块化架构**：清晰的目录结构，易于维护和扩展
5. **统一的网络请求封装**：自动处理 token、错误提示
6. **详细的代码注释**：每段逻辑都有中文注释，适合学习

## 项目目录结构

```
bioagent-ui/
├── public/                          # 静态资源目录
├── src/                             # 源代码目录
│   ├── router/                      # 路由配置目录
│   │   └── index.ts                 # 路由主配置文件
│   ├── utils/                       # 工具函数目录
│   │   └── request.ts               # Axios 封装
│   ├── views/                       # 页面视图目录
│   │   ├── login/                   # 登录模块
│   │   │   └── Login.vue            # 登录页面（Three.js + Canvas + 流金文字）
│   │   └── home/                    # 首页模块
│   │       └── Home.vue             # 首页占位组件
│   ├── App.vue                      # 根组件
│   ├── main.ts                      # 应用入口文件
│   ├── style.css                    # 全局样式文件（含 Tailwind 指令）
│   └── vite-env.d.ts                # Vite 环境类型声明
├── postcss.config.js                # PostCSS 配置（Tailwind CSS）
├── tailwind.config.js               # Tailwind CSS 配置
├── index.html                       # HTML 入口文件
├── package.json                     # 项目依赖配置
├── tsconfig.json                    # TypeScript 配置
├── vite.config.ts                   # Vite 配置文件
└── README.md                        # 项目说明文档（本文件）
```

## 核心功能详解

### 1. 网络请求封装 (src/utils/request.ts)

**功能特性**：
- 创建 Axios 实例，基础 URL 配置为 `http://localhost:8080`
- 请求超时时间设置为 15 秒
- 请求拦截器：自动从 localStorage 读取 token 并添加到请求头
- 响应拦截器：统一处理后端返回格式 `{ code: 0, message: "成功", data: {...} }`
  - code 为 0：直接返回 data 数据
  - code 不为 0：使用 Element Plus 弹出错误提示
- 错误处理：根据 HTTP 状态码显示不同的错误信息（401/403/404/500 等）

**使用示例**：
```typescript
import request from '@/utils/request'

// GET 请求
const data = await request.get('/api/user/info')

// POST 请求
const result = await request.post('/api/login', { 
  username: 'admin', 
  password: 'admin' 
})
```

### 2. 路由配置 (src/router/index.ts)

**当前路由**：
- `/` - 根路径，自动重定向到 `/login`
- `/login` - 登录页面（Three.js 蛋白质动画 + Canvas 粒子雪花）
- `/home` - 首页（当前为占位页面，后续开发项目列表功能）

**路由守卫**：
- 全局前置守卫：自动设置页面标题

### 3. 炫酷登录页 (src/views/login/Login.vue)

这是本项目的核心亮点，采用深色主题 + 3D 动画设计。

#### 视觉设计特点

**背景层（z-index: 0）**：
- 深蓝色纯色背景（#0f172a）
- Three.js 3D 蛋白质分子动画：
  - 11 个彩色蛋白质分子链（青色、粉色、绿色、黄色、紫色、红色）
  - 每个分子由 15-25 个原子球体通过线条连接
  - 螺旋链状结构，随机大小（0.6-1.4 倍缩放）
  - 三轴旋转 + 浮动动画
  - 环境光 + 双点光源照明

**粒子层（z-index: 1）**：
- Canvas 2D 粒子雪花效果
- 100 个白色半透明圆形粒子
- 从上到下缓慢飘落，自动循环

**内容层（z-index: 10）**：
- 左侧品牌展示区（大屏幕显示）：
  - DNA 图标 + BioNexus 品牌名
  - 流金文字轮播（两条标语，5 秒切换）
  - GPU 集群在线状态指示器
- 右侧登录表单区：
  - 磨砂玻璃卡片（440x550px）
  - 用户名 / 密码输入框
  - 渐变色登录按钮

#### 交互功能

**表单默认值**：
- 用户名：`admin`
- 密码：`admin`

**输入框样式**：
- 半透明深色背景，圆角设计
- 聚焦时显示蓝色边框

**登录按钮**：
- 蓝色到靛蓝色渐变（from-blue-600 to-indigo-600）
- 悬浮效果：放大 1.05 倍
- 点击效果：缩小至 0.95 倍
- Loading 状态：显示旋转图标和"正在建立安全连接..."文字

**登录逻辑**：
1. 点击登录按钮
2. 显示 loading 状态
3. 使用 setTimeout 模拟 1.5 秒的网络请求
4. 跳转到首页

#### 技术实现

- Vue 3 Composition API（setup 语法糖）
- TypeScript 类型安全
- Three.js WebGL 渲染
- Canvas 2D API
- Tailwind CSS 实用类
- Phosphor Icons 图标库

## 启动项目

### 开发模式

```bash
# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev
```

访问地址：`http://localhost:5173`（Vite 默认端口）

默认会打开登录页面，输入账号 `admin` 和密码 `admin` 即可体验炫酷的登录效果。

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 依赖安装说明

### 核心依赖

```bash
# Vue Router（路由管理）
npm install vue-router@4

# Axios（HTTP 请求库）
npm install axios

# Element Plus（UI 组件库）
npm install element-plus

# Three.js（3D 渲染库）
npm install three

# Phosphor Icons（图标库）
npm install @phosphor-icons/web
```

### 开发依赖

```bash
# Tailwind CSS v3（样式框架，兼容 Node.js 18）
npm install -D tailwindcss@3 postcss autoprefixer

# TypeScript 类型定义
npm install --save-dev @types/node
```

## Git 版本管理

### 初始化 Git 仓库并推送到 GitHub

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "feat: 初始化项目，完成登录页开发"

# 添加远程仓库
git remote add origin https://github.com/zzz-sudo/bioagent-ui.git

# 推送到 GitHub（首次推送）
git push -u origin main
```

### 后续更新代码

```bash
# 添加修改的文件
git add .

# 提交修改
git commit -m "feat: 添加新功能"

# 推送到远程仓库
git push
```

## 后续开发计划

- [ ] 完善首页布局和项目列表功能
- [ ] 接入真实的后端登录接口
- [ ] 添加用户权限管理和路由守卫
- [ ] 开发生物信息学分析工具模块（GWAS、AlphaFold 等）
- [ ] 添加数据可视化图表（ECharts）
- [ ] 实现暗色/亮色主题切换
- [ ] 优化移动端响应式布局

## 注意事项

1. **Node.js 版本**：建议使用 Node.js 18 或更高版本
2. **Tailwind CSS 版本**：使用 v3 版本以兼容 Node.js 18
3. **后端服务**：确保后端服务运行在 `http://localhost:8080`
4. **登录功能**：当前为模拟实现（1.5 秒延迟），后续需要对接真实 API
5. **性能优化**：Three.js 和 Canvas 动画可能影响低端设备性能
6. **浏览器兼容**：建议使用 Chrome、Edge、Firefox 等现代浏览器
7. **代码规范**：严格禁止在代码和注释中使用 Emoji 和特殊符号

## 常见问题

### 1. Three.js 蛋白质动画不显示？

检查是否正确安装了 Three.js：
```bash
npm install three
```

确保浏览器支持 WebGL。

### 2. Tailwind CSS 样式不生效？

确保已创建 `postcss.config.js` 和 `tailwind.config.js` 配置文件，并在 `src/style.css` 中添加了 Tailwind 指令：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Phosphor Icons 图标不显示？

确保在 `main.ts` 中正确引入了图标样式：
```typescript
import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/fill'
import '@phosphor-icons/web/bold'
```

### 4. Element Plus 中文语言包导入错误？

使用正确的导入路径：
```typescript
import zhCn from 'element-plus/es/locale/lang/zh-cn'
```

### 5. 开发服务器端口被占用？

Vite 会自动尝试下一个可用端口（5174、5175 等）。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

提交代码前请确保：
1. 代码符合项目的设计规范
2. 所有文件顶部包含 `Author: Kuroneko` 或 `编码：UTF-8` 注释
3. 代码有详细的中文注释
4. 没有使用 Emoji 和特殊符号
5. 通过 TypeScript 类型检查

## 开源协议

MIT License

---

## 版本信息

**Author**: Kuroneko  
**创建日期**: 2026-03-05  
**最后更新**: 2026-03-05  
**项目版本**: v1.0.0  
**GitHub**: https://github.com/zzz-sudo/bioagent-ui

## 初始版本 Git 提交标识

本 README 文件对应的初始完整版本代码已提交到 GitHub，提交信息如下：

```
Commit: 9ca71d1
Author: Kuroneko
Date: 2026-03-05
Message: feat: increase protein count to 11 and add random size scaling
```

**主要功能**：
- Vue 3 + TypeScript + Vite 基础架构
- Three.js 3D 蛋白质分子动画（11 个随机大小的彩色分子链）
- Canvas 粒子雪花特效（100 个白色粒子）
- 流金文字轮播（两条标语自动切换）
- Tailwind CSS v3 响应式布局
- Glassmorphism 磨砂玻璃登录卡片
- Phosphor Icons 图标库
- Element Plus UI 组件库
- Vue Router 路由管理
- Axios 网络请求封装

**克隆此版本**：
```bash
git clone https://github.com/zzz-sudo/bioagent-ui.git
cd bioagent-ui
git checkout 9ca71d1
npm install
npm run dev
```
