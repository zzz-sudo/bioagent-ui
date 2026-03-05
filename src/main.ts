// Author: Kuroneko
// 应用入口文件，负责初始化 Vue 应用、引入全局依赖和挂载根组件

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入 Element Plus 组件库及其完整样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 Phosphor Icons 图标库样式
import '@phosphor-icons/web/css'

// 引入 Element Plus 中文语言包，确保组件显示为中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 引入路由配置
import router from './router'

// 创建 Vue 应用实例
const app = createApp(App)

// 注册 Element Plus 插件，并配置中文语言
app.use(ElementPlus, {
  locale: zhCn,
})

// 注册路由插件
app.use(router)

// 将应用挂载到 id 为 app 的 DOM 元素上
app.mount('#app')
