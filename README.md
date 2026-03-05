# BioAgent-Platform 生物信息学分析中台 - 前端项目

Author: Kuroneko

## 项目简介

这是一个基于 Vue 3 + TypeScript + Vite 构建的现代化生物信息学分析中台前端项目。
采用卡通风格设计，配合炫酷的粒子特效和生信元素动画，为用户提供极致的视觉体验。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **HTTP 客户端**: Axios
- **特效库**: tsparticles (粒子特效)

## 快速开始

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

## 初始化新项目（从零开始）

### 第一步：创建 Vite + Vue 3 + TypeScript 项目

```bash
# 使用 Vite 创建项目
npm create vite@latest bioagent-ui -- --template vue-ts

# 进入项目目录
cd bioagent-ui
```

### 第二步：安装核心依赖

```bash
# 安装 Vue Router（路由管理）
npm install vue-router@4

# 安装 Axios（HTTP 请求库）
npm install axios

# 安装 Element Plus（UI 组件库）
npm install element-plus

# 安装 Element Plus 图标库
npm install @element-plus/icons-vue

# 安装 tsparticles（粒子特效库）
npm install tsparticles-engine tsparticles-vue3 tsparticles-slim
```

### 第三步：安装开发依赖（可选但推荐）

```bash
# 安装 TypeScript 类型定义
npm install --save-dev @types/node
```

## 项目目录结构

```
bioagent-ui/
├── public/                          # 静态资源目录
├── src/                             # 源代码目录
│   ├── router/                      # 路由配置目录
│   │   └── index.ts                 # 路由主配置文件（已完成）
│   ├── utils/                       # 工具函数目录
│   │   └── request.ts               # Axios 封装（已完成）
│   ├── views/                       # 页面视图目录
│   │   ├── login/                   # 登录模块
│   │   │   └── Login.vue            # 登录页面（已完成）
│   │   └── home/                    # 首页模块
│   │       └── Home.vue             # 首页占位组件（已完成）
│   ├── App.vue                      # 根组件（已完成）
│   ├── main.ts                      # 应用入口文件（已完成）
│   ├── style.css                    # 默认样式文件
│   └── vite-env.d.ts                # Vite 环境类型声明
├── index.html                       # HTML 入口文件
├── package.json                     # 项目依赖配置
├── tsconfig.json                    # TypeScript 配置
├── vite.config.ts                   # Vite 配置文件
└── README.md                        # 项目说明文档（本文件）
```

## 已完成的功能模块

### 核心文件清单

1. **src/main.ts** - 应用入口，已配置 Element Plus 和 Vue Router
2. **src/App.vue** - 根组件，全屏路由容器
3. **src/router/index.ts** - 路由配置，包含登录页和首页
4. **src/utils/request.ts** - Axios 网络请求封装
5. **src/views/login/Login.vue** - 炫酷登录页（粒子特效 + 生信元素动画）
6. **src/views/home/Home.vue** - 首页占位组件

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
const result = await request.post('/api/login', { username: 'admin', password: 'admin' })
```

### 2. 路由配置 (src/router/index.ts)

**当前路由**：
- `/` - 根路径，自动重定向到 `/home`
- `/login` - 登录页面（炫酷粒子特效 + 生信元素动画）
- `/home` - 首页（当前为占位页面，后续开发项目列表功能）

**路由守卫**：
- 全局前置守卫：自动设置页面标题

### 3. 炫酷登录页 (src/views/login/Login.vue)

这是本项目的核心亮点，采用现代卡通风格设计。

#### 视觉设计特点

**背景层**：
- 深蓝到紫色的渐变背景（#1e3c72 → #2a5298 → #7e22ce）
- tsparticles 粒子特效：80 个荧光色粒子缓慢向上漂浮
- 粒子颜色：青色、紫色、绿色、黄色（高饱和度）

**生信元素动画**：
- **DNA 双螺旋**（左上角）：
  - 使用内联 SVG 绘制双螺旋结构
  - 青色和紫色的螺旋链，绿色的连接横杠
  - 执行 8 秒循环的浮动旋转动画（上下浮动 30px + 360 度旋转）
  
- **蛋白质三维结构**（右下角）：
  - 使用 SVG 绘制多个彩色圆球和连接线
  - 模拟蛋白质的空间结构
  - 执行 10 秒循环的反向浮动旋转动画

**登录卡片**（Glassmorphism 设计）：
- 宽度 450px，大圆角（30px）
- 半透明白色背景（rgba(255, 255, 255, 0.1)）
- 背景模糊效果（backdrop-filter: blur(20px)）
- 半透明白色边框 + 紫色发光阴影
- 卡片入场动画：从下方淡入并放大

#### 交互功能

**表单默认值**：
- 用户名：`admin`
- 密码：`admin`

**输入框样式**：
- 半透明白色背景，圆角 15px
- 悬浮时背景变亮
- 聚焦时显示紫色发光边框

**登录按钮**：
- 高饱和度渐变色（#667eea → #764ba2 → #f093fb）
- 悬浮效果：放大 1.05 倍 + 阴影加深 + 紫色光晕
- 点击效果：缩小至 0.98 倍
- Loading 状态：显示加载动画和"登录中..."文字

**登录逻辑**：
1. 点击登录按钮
2. 简单表单验证（检查是否为空）
3. 显示 loading 状态
4. 使用 setTimeout 模拟 1.5 秒的网络请求
5. 显示"登录成功"提示
6. 跳转到首页

#### 技术实现

- Vue 3 Composition API（setup 语法糖）
- TypeScript 类型安全
- 响应式数据绑定（ref）
- CSS @keyframes 动画
- tsparticles-vue3 粒子特效库
- Element Plus UI 组件

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

## 设计规范

### 代码规范

1. **禁止使用 Emoji 和特殊符号**：代码和注释中严禁出现任何 Emoji 或装饰性符号
2. **作者标注**：每个代码文件顶部必须包含 `Author: Kuroneko` 注释
3. **详细注释**：每段逻辑都有详细的中文注释，方便初学者理解
4. **TypeScript 严格模式**：充分利用类型系统，避免 any 类型

### UI 设计风格

- **色彩**：高饱和度、明快的配色方案
- **形状**：圆角设计、轻微阴影
- **动画**：流畅的过渡效果和交互反馈
- **主题**：现代卡通风 + 生物信息学科技感

## 项目特色

### 视觉设计亮点

1. **现代卡通风格**：高饱和度配色、大圆角、发光阴影
2. **Glassmorphism 设计**：磨砂玻璃质感的登录卡片
3. **粒子特效**：80 个荧光色粒子缓慢向上漂浮
4. **生信主题动画**：DNA 双螺旋和蛋白质结构的 3D 旋转漂浮效果
5. **流畅交互**：按钮悬浮放大、输入框聚焦发光、卡片入场动画

### 技术特色

1. **Vue 3 Composition API**：使用最新的 setup 语法糖
2. **TypeScript 严格模式**：完整的类型定义和类型安全
3. **模块化架构**：清晰的目录结构，易于扩展
4. **统一的网络请求封装**：自动处理 token、错误提示
5. **详细的代码注释**：每段逻辑都有中文注释，适合学习

## 后续开发计划

- [ ] 完善首页布局和项目列表功能
- [ ] 接入真实的后端登录接口
- [ ] 添加用户权限管理和路由守卫
- [ ] 开发生物信息学分析工具模块
- [ ] 添加数据可视化图表（ECharts）
- [ ] 实现暗色/亮色主题切换
- [ ] 添加响应式布局，支持移动端

## 注意事项

1. **后端服务**：确保后端服务运行在 `http://localhost:8080`
2. **登录功能**：当前为模拟实现（1.5 秒延迟），后续需要对接真实 API
3. **性能优化**：粒子特效可能影响低端设备性能，可在 Login.vue 中调整粒子数量（particlesOptions.particles.number.value）
4. **浏览器兼容**：建议使用 Chrome、Edge、Firefox 等现代浏览器
5. **代码规范**：严格禁止在代码和注释中使用 Emoji 和特殊符号

## 常见问题

### 1. 粒子特效不显示？

检查是否正确安装了 tsparticles 相关依赖：
```bash
npm install tsparticles-engine tsparticles-vue3 tsparticles-slim
```

### 2. Element Plus 样式丢失？

确保在 main.ts 中正确引入了 Element Plus 样式：
```typescript
import 'element-plus/dist/index.css'
```

### 3. 路由跳转不生效？

检查 router/index.ts 是否正确配置，并在 main.ts 中注册了路由。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

提交代码前请确保：
1. 代码符合项目的设计规范
2. 所有文件顶部包含 `Author: Kuroneko` 注释
3. 代码有详细的中文注释
4. 没有使用 Emoji 和特殊符号

## 开源协议

MIT License

---

**Author: Kuroneko**  
**创建日期**: 2026-03-05  
**最后更新**: 2026-03-05  
**项目版本**: v1.0.0  
**GitHub**: https://github.com/zzz-sudo/bioagent-ui
