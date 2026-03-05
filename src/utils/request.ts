// Author: Kuroneko
// Axios 网络请求封装，统一处理请求拦截、响应拦截和错误处理

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 定义后端返回的统一数据结构 ResultBody
interface ResultBody<T = any> {
  code: number        // 状态码，0 表示成功，非 0 表示失败
  message: string     // 返回的提示信息
  data: T             // 实际的业务数据
}

// 创建 Axios 实例，配置基础 URL 和超时时间
const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // 后端服务的基础地址
  timeout: 15000,                     // 请求超时时间为 15 秒
  headers: {
    'Content-Type': 'application/json;charset=utf-8'  // 默认请求头
  }
})

// 请求拦截器：在每次发送请求前执行
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 中获取 token（如果存在）
    const token = localStorage.getItem('token')
    
    // 如果 token 存在，则将其添加到请求头中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    // 返回配置对象，继续发送请求
    return config
  },
  (error) => {
    // 请求配置出错时的处理
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器：在收到响应后执行
service.interceptors.response.use(
  (response: AxiosResponse<ResultBody>) => {
    // 获取响应数据
    const res = response.data
    
    // 判断后端返回的 code 是否为 0（成功）
    if (res.code === 0) {
      // 如果成功，直接返回 data 部分
      return res.data
    } else {
      // 如果 code 不为 0，说明业务逻辑出错
      // 使用 Element Plus 的 Message 组件显示错误提示
      ElMessage.error(res.message || '请求失败')
      
      // 返回一个被拒绝的 Promise，阻止后续的 then 执行
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error) => {
    // HTTP 状态码异常或网络错误的处理
    console.error('响应拦截器错误:', error)
    
    // 根据不同的错误类型显示不同的提示信息
    let message = '网络请求失败'
    
    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败: ${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '网络连接超时，请检查网络'
    }
    
    // 显示错误提示
    ElMessage.error(message)
    
    return Promise.reject(error)
  }
)

// 导出封装好的 Axios 实例，供其他模块使用
export default service
