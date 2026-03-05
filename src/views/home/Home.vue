<!-- 编码：UTF-8 -->
<!-- 课题大厅页面：展示项目列表，支持创建新项目 -->

<template>
  <!-- 主容器：全屏布局，深色背景 -->
  <div class="home-container">
    <!-- 左侧侧边栏：极简半透明设计 -->
    <aside class="sidebar">
      <!-- 系统 Logo 区域 -->
      <div class="logo-section">
        <div class="logo-icon">
          <i class="ph-fill ph-dna text-4xl text-blue-400"></i>
        </div>
        <h1 class="logo-text">BioNexus</h1>
      </div>
      
      <!-- 菜单列表 -->
      <nav class="menu-list">
        <!-- 课题大厅菜单项（高亮状态） -->
        <div class="menu-item active">
          <i class="ph-fill ph-squares-four"></i>
          <span>课题大厅</span>
        </div>
        
        <!-- 模型中心菜单项 -->
        <div class="menu-item">
          <i class="ph-fill ph-cube"></i>
          <span>模型中心</span>
        </div>
      </nav>
    </aside>
    
    <!-- 右侧主体区域 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <header class="top-navbar">
        <div class="navbar-left">
          <h2 class="page-title">课题大厅</h2>
        </div>
        
        <div class="navbar-right">
          <!-- 用户信息 -->
          <div class="user-info">
            <div class="user-avatar">
              <i class="ph-fill ph-user-circle text-3xl text-blue-400"></i>
            </div>
            <span class="user-name">admin</span>
          </div>
        </div>
      </header>
      
      <!-- 主体内容区域 -->
      <main class="content-area">
        <!-- 操作栏：新建课题按钮 -->
        <div class="action-bar">
          <button class="create-btn" @click="showCreateDialog = true">
            <i class="ph-bold ph-plus-circle"></i>
            <span>新建课题</span>
          </button>
        </div>
        
        <!-- 项目卡片网格 -->
        <div class="project-grid" v-if="projectList.length > 0">
          <div 
            v-for="project in projectList" 
            :key="project.id" 
            class="project-card"
          >
            <!-- 卡片头部：项目名称 -->
            <div class="card-header">
              <h3 class="project-name">{{ project.projectName }}</h3>
              <!-- 状态标签 -->
              <span 
                class="status-badge" 
                :class="project.status === 'ACTIVE' ? 'status-active' : 'status-archived'"
              >
                {{ project.status === 'ACTIVE' ? '活跃' : '已归档' }}
              </span>
            </div>
            
            <!-- 研究物种标签 -->
            <div class="species-tag">
              <i class="ph-fill ph-leaf"></i>
              <span>{{ project.species }}</span>
            </div>
            
            <!-- 项目描述 -->
            <p class="project-description">{{ project.description }}</p>
            
            <!-- 卡片底部：创建时间 -->
            <div class="card-footer">
              <i class="ph ph-clock"></i>
              <span>{{ formatDate(project.createTime) }}</span>
            </div>
          </div>
        </div>
        
        <!-- 空状态提示 -->
        <div v-else class="empty-state">
          <i class="ph ph-folder-open text-6xl text-gray-500"></i>
          <p class="empty-text">暂无项目，点击右上角新建课题</p>
        </div>
      </main>
    </div>
    
    <!-- 新建项目对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="新建课题"
      width="500px"
      :close-on-click-modal="false"
      class="create-dialog"
    >
      <!-- 表单 -->
      <el-form 
        :model="createForm" 
        :rules="formRules" 
        ref="createFormRef"
        label-width="100px"
      >
        <!-- 项目名称 -->
        <el-form-item label="项目名称" prop="projectName">
          <el-input 
            v-model="createForm.projectName" 
            placeholder="请输入项目名称"
            clearable
          />
        </el-form-item>
        
        <!-- 研究物种 -->
        <el-form-item label="研究物种" prop="species">
          <el-select 
            v-model="createForm.species" 
            placeholder="请选择研究物种"
            style="width: 100%"
          >
            <el-option label="人类" value="人类" />
            <el-option label="小鼠" value="小鼠" />
            <el-option label="大鼠" value="大鼠" />
            <el-option label="果蝇" value="果蝇" />
            <el-option label="斑马鱼" value="斑马鱼" />
            <el-option label="拟南芥" value="拟南芥" />
          </el-select>
        </el-form-item>
        
        <!-- 项目描述 -->
        <el-form-item label="项目描述" prop="description">
          <el-input 
            v-model="createForm.description" 
            type="textarea"
            :rows="4"
            placeholder="请输入项目描述"
          />
        </el-form-item>
        
        <!-- 项目状态 -->
        <el-form-item label="项目状态" prop="status">
          <el-radio-group v-model="createForm.status">
            <el-radio label="ACTIVE">活跃</el-radio>
            <el-radio label="ARCHIVED">已归档</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <!-- 对话框底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCreateProject" :loading="isCreating">
            {{ isCreating ? '创建中...' : '确定' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 3 核心 API
import { ref, reactive, onMounted } from 'vue'
// 导入 Element Plus 组件类型
import { ElMessage, FormInstance, FormRules } from 'element-plus'
// 导入项目 API 接口
import { getProjectList, createProject, ProjectInfo, CreateProjectParams } from '@/api/project'

// 项目列表数据：存储从后端获取的所有项目
const projectList = ref<ProjectInfo[]>([])

// 控制新建项目对话框的显示状态
const showCreateDialog = ref(false)

// 控制创建按钮的加载状态
const isCreating = ref(false)

// 表单引用：用于表单验证
const createFormRef = ref<FormInstance>()

// 新建项目表单数据
const createForm = reactive<CreateProjectParams>({
  projectName: '',
  description: '',
  species: '',
  status: 'ACTIVE'
})

// 表单验证规则
const formRules: FormRules = {
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 2, max: 50, message: '项目名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  species: [
    { required: true, message: '请选择研究物种', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入项目描述', trigger: 'blur' },
    { min: 10, max: 500, message: '项目描述长度在 10 到 500 个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择项目状态', trigger: 'change' }
  ]
}

/**
 * 获取项目列表数据
 * 调用后端 API，将返回的数据存储到 projectList 中
 */
const fetchProjectList = async () => {
  try {
    // 调用 API 获取项目列表
    const data = await getProjectList()
    // 将数据赋值给响应式变量，触发页面更新
    projectList.value = data
  } catch (error) {
    // 如果请求失败，显示错误提示
    ElMessage.error('获取项目列表失败')
    console.error('获取项目列表失败:', error)
  }
}

/**
 * 处理创建项目
 * 验证表单后调用后端 API 创建新项目
 */
const handleCreateProject = async () => {
  // 验证表单
  if (!createFormRef.value) return
  
  await createFormRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    
    // 设置加载状态
    isCreating.value = true
    
    try {
      // 调用 API 创建项目
      await createProject(createForm)
      
      // 显示成功提示
      ElMessage.success('项目创建成功')
      
      // 关闭对话框
      showCreateDialog.value = false
      
      // 重置表单
      createFormRef.value?.resetFields()
      
      // 重新获取项目列表，刷新页面数据
      await fetchProjectList()
    } catch (error) {
      // 如果创建失败，显示错误提示
      ElMessage.error('项目创建失败')
      console.error('项目创建失败:', error)
    } finally {
      // 无论成功或失败，都要重置加载状态
      isCreating.value = false
    }
  })
}

/**
 * 格式化日期时间
 * 将 ISO 8601 格式的时间字符串转换为易读的格式
 * 
 * @param dateString ISO 8601 格式的时间字符串
 * @returns 格式化后的日期字符串（如：2026-03-05 14:30）
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 组件挂载后的生命周期钩子
 * 页面加载完成后立即获取项目列表数据
 */
onMounted(() => {
  fetchProjectList()
})
</script>

<style scoped>
/* 主容器：全屏布局，深蓝色背景 */
.home-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  overflow: hidden;
}

/* 左侧侧边栏：半透明磨砂玻璃效果 */
.sidebar {
  width: 240px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
}

/* Logo 区域 */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
  font-family: 'Courier New', monospace;
}

/* 菜单列表 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 菜单项 */
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item i {
  font-size: 20px;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* 激活状态的菜单项 */
.menu-item.active {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

/* 右侧主体区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏 */
.top-navbar {
  height: 70px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left .page-title {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.15);
}

.user-avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

/* 主体内容区域 */
.content-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

/* 操作栏 */
.action-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

/* 新建课题按钮：高饱和度渐变色 */
.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.create-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 25px rgba(16, 185, 129, 0.5);
}

.create-btn:active {
  transform: translateY(0) scale(0.98);
}

.create-btn i {
  font-size: 20px;
}

/* 项目卡片网格：CSS Grid 布局 */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* 项目卡片：磨砂玻璃效果 */
.project-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 卡片悬浮效果：上浮 + 边缘发光 */
.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3),
              0 0 30px rgba(59, 130, 246, 0.2);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

/* 项目名称 */
.project-name {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 0;
}

/* 状态标签 */
.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-archived {
  background: rgba(107, 114, 128, 0.2);
  color: #9ca3af;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

/* 研究物种标签 */
.species-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.species-tag i {
  font-size: 16px;
}

/* 项目描述 */
.project-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 卡片底部 */
.card-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
}

.card-footer i {
  font-size: 16px;
}

/* 空状态提示 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.empty-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  margin-top: 16px;
}

/* 滚动条样式 */
.content-area::-webkit-scrollbar {
  width: 8px;
}

.content-area::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

<style>
/* 全局样式：覆盖 Element Plus 对话框样式 */

/* 对话框遮罩层 */
.el-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}

/* 对话框容器：深色毛玻璃风格 */
.create-dialog .el-dialog {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

/* 对话框标题 */
.create-dialog .el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 24px;
}

.create-dialog .el-dialog__title {
  color: white;
  font-size: 20px;
  font-weight: bold;
}

/* 关闭按钮 */
.create-dialog .el-dialog__headerbtn .el-dialog__close {
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
}

.create-dialog .el-dialog__headerbtn:hover .el-dialog__close {
  color: white;
}

/* 对话框内容 */
.create-dialog .el-dialog__body {
  padding: 24px;
}

/* 表单标签 */
.create-dialog .el-form-item__label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* 输入框 */
.create-dialog .el-input__wrapper {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: none;
}

.create-dialog .el-input__wrapper:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.create-dialog .el-input__wrapper.is-focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.create-dialog .el-input__inner {
  color: white;
}

.create-dialog .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* 文本域 */
.create-dialog .el-textarea__inner {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
}

.create-dialog .el-textarea__inner::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.create-dialog .el-textarea__inner:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.create-dialog .el-textarea__inner:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* 下拉选择框 */
.create-dialog .el-select__wrapper {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: none;
}

.create-dialog .el-select__wrapper:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.create-dialog .el-select__wrapper.is-focused {
  background: rgba(255, 255, 255, 0.15);
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.create-dialog .el-select__placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.create-dialog .el-select__selected-item {
  color: white;
}

/* 单选按钮 */
.create-dialog .el-radio__label {
  color: rgba(255, 255, 255, 0.9);
}

.create-dialog .el-radio__input.is-checked .el-radio__inner {
  background: #3b82f6;
  border-color: #3b82f6;
}

.create-dialog .el-radio__input.is-checked + .el-radio__label {
  color: white;
}

/* 对话框底部 */
.create-dialog .el-dialog__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 24px;
}

/* 按钮 */
.create-dialog .el-button {
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 600;
}

.create-dialog .el-button--default {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.create-dialog .el-button--default:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.create-dialog .el-button--primary {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.create-dialog .el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}
</style>
