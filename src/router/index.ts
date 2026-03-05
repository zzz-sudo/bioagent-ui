// Author: Kuroneko
// 路由配置文件，定义应用的所有路由规则

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 定义路由规则数组
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'  // 根路径重定向到首页
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),  // 懒加载登录页组件
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),  // 懒加载首页组件
    meta: {
      title: '首页'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 History 模式
  routes
})

// 全局前置守卫：在每次路由跳转前执行
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - BioAgent Platform`
  }
  
  // 继续路由跳转
  next()
})

// 导出路由实例
export default router
