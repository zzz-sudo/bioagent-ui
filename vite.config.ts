// Author: Kuroneko
// Vite 配置文件：配置开发服务器、构建选项和跨域代理

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // 开发服务器配置
  server: {
    // 配置跨域代理，解决前后端分离的跨域问题
    proxy: {
      // 将所有以 /api 开头的请求代理到后端服务器
      '/api': {
        target: 'http://localhost:8080',  // 后端服务器地址
        changeOrigin: true,                // 改变请求源，避免跨域问题
        // rewrite: (path) => path.replace(/^\/api/, '')  // 如果后端不需要 /api 前缀，可以取消注释
      }
    }
  }
})
