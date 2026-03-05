# BioAgent-Platform 生物信息学分析中台 - 前端项目

Author: Kuroneko

## 项目简介

这是一个基于 Vue 3 + TypeScript + Vite 构建的现代化生物信息学分析中台前端项目。
采用现代卡通风格设计，配合炫酷的粒子特效和 DNA/蛋白质结构动画，为用户提供极致的视觉体验。

## 技术栈

- **框架**: Vue 3 (Composition API + setup 语法糖)
- **语言**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **HTTP 客户端**: Axios
- **粒子特效**: @tsparticles/vue3

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

**默认账号**：`admin`  
**默认密码**：`admin`

## 项目特色

### 视觉设计亮点

1. **粒子特效背景**：使用 tsparticles 实现 80 个荧光色粒子向上漂浮
2. **DNA 双螺旋动画**：SVG 图形配合 CSS 动画，在左上角缓缓旋转漂浮
3. **蛋白质结构动画**：SVG 图形在右下角执行反向旋转漂浮
4. **Glassmorphism 设计**：磨砂玻璃质感的登录卡片，半透明背景 + 模糊效果
5. **高饱和度配色**：深蓝到紫色的渐变背景，搭配荧光色粒子
6. **流畅交互动画**：按钮悬浮放大、输入框聚焦发光、卡片入场动画

### 技术特色

1. **Vue 3 Composition API**：使用最新的 setup 语法糖
2. **TypeScript 严格模式**：完整的类型定义和类型安全
3. **模块化架构**：清晰的目录结构，易于维护和扩展
4. **统一的网络请求封装**：自动处理 token、错误提示
5. **详细的代码注释**：每段逻辑都有中文注释，适合学习

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
│   │   │   └── Login.vue            # 登录页面（粒子特效 + DNA/蛋白质动画）
│   │   └── home/                    # 首页模块
│   │       └── Home.vue             # 首页占位组件
│   ├── App.vue                      # 根组件
│   ├── main.ts                      # 应用入口文件
│   ├── style.css                    # 全局样式文件
│   └── vite-env.d.ts                # Vite 环境类型声明
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
- `/login` - 登录页面（粒子特效 + DNA/蛋白质动画）
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

**DNA 双螺旋动画**（左上角）：
- 使用内联 SVG 绘制双螺旋结构
- 青色和紫色的螺旋链，绿色的连接横杠
- 执行 8 秒循环的浮动旋转动画（上下浮动 30px + 360 度旋转）

**蛋白质三维结构动画**（右下角）：
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

## 依赖安装说明

### 核心依赖

```bash
# Vue Router（路由管理）
npm install vue-router@4

# Axios（HTTP 请求库）
npm install axios

# Element Plus（UI 组件库）
npm install element-plus

# Element Plus 图标库
npm install @element-plus/icons-vue

# tsparticles（粒子特效库）
npm install @tsparticles/vue3 @tsparticles/slim @tsparticles/engine
```

### 开发依赖

```bash
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
- [ ] 添加响应式布局，支持移动端

## 注意事项

1. **后端服务**：确保后端服务运行在 `http://localhost:8080`
2. **登录功能**：当前为模拟实现（1.5 秒延迟），后续需要对接真实 API
3. **性能优化**：粒子特效可能影响低端设备性能，可在 Login.vue 中调整粒子数量
4. **浏览器兼容**：建议使用 Chrome、Edge、Firefox 等现代浏览器
5. **代码规范**：严格禁止在代码和注释中使用 Emoji 和特殊符号

## 常见问题

### 1. 粒子特效不显示？

检查是否正确安装了 tsparticles 相关依赖：
```bash
npm install @tsparticles/vue3 @tsparticles/slim @tsparticles/engine
```

确保在 `main.ts` 中注册了 Particles 组件：
```typescript
import Particles from '@tsparticles/vue3'
app.use(Particles)
```

### 2. Element Plus 样式丢失？

确保在 main.ts 中正确引入了 Element Plus 样式：
```typescript
import 'element-plus/dist/index.css'
```

### 3. Element Plus 中文语言包导入错误？

使用正确的导入路径：
```typescript
import zhCn from 'element-plus/es/locale/lang/zh-cn'
```

### 4. 路由跳转不生效？

检查 router/index.ts 是否正确配置，并在 main.ts 中注册了路由。

### 5. 粒子特效性能问题？

可以在 Login.vue 中减少粒子数量（当前为 80）：
```typescript
number: {
  value: 40,  // 减少到 40 个粒子
  density: {
    enable: true,
    area: 800
  }
}
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

提交代码前请确保：
1. 代码符合项目的设计规范
2. 所有文件顶部包含 `Author: Kuroneko` 注释
3. 代码有详细的中文注释
4. 没有使用 Emoji 和特殊符号
5. 通过 TypeScript 类型检查

## 开源协议

MIT License

---

**Author: Kuroneko**  
**创建日期**: 2026-03-05  
**最后更新**: 2026-03-05  
**项目版本**: v1.0.1  
**GitHub**: https://github.com/zzz-sudo/bioagent-ui
