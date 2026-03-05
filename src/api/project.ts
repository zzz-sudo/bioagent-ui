// Author: Kuroneko
// 项目相关的 API 接口封装

import request from '@/utils/request'

/**
 * 项目信息接口定义
 * 定义从后端返回的项目数据结构
 */
export interface ProjectInfo {
  id: number                    // 项目唯一标识
  projectName: string           // 项目名称
  description: string           // 项目描述
  species: string               // 研究物种（如：人类、小鼠等）
  status: 'ACTIVE' | 'ARCHIVED' // 项目状态：活跃或已归档
  createTime: string            // 创建时间（ISO 8601 格式）
}

/**
 * 创建项目的请求参数接口
 * 定义创建新项目时需要提交的数据结构
 */
export interface CreateProjectParams {
  projectName: string    // 项目名称
  description: string    // 项目描述
  species: string        // 研究物种
  status: string         // 项目状态
}

/**
 * 获取项目列表
 * 调用后端 GET /api/project/list 接口
 * 
 * @returns Promise<ProjectInfo[]> 返回项目列表数组
 */
export const getProjectList = (): Promise<ProjectInfo[]> => {
  return request.get('/api/project/list')
}

/**
 * 创建新项目
 * 调用后端 POST /api/project/create 接口
 * 
 * @param data 创建项目的参数对象
 * @returns Promise<ProjectInfo> 返回创建成功的项目信息
 */
export const createProject = (data: CreateProjectParams): Promise<ProjectInfo> => {
  return request.post('/api/project/create', data)
}
