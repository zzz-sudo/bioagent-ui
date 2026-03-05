<!-- Author: Kuroneko -->
<!-- 登录页面：带有粒子特效、DNA 双螺旋和蛋白质结构动画的炫酷卡通风登录界面 -->

<template>
  <div class="login-container">
    <!-- 粒子特效背景 -->
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="particlesOptions"
    />

    <!-- DNA 双螺旋 SVG 动画（左上角） -->
    <div class="dna-helix">
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- DNA 双螺旋的左侧链 -->
        <path
          d="M 50 20 Q 70 60, 50 100 Q 30 140, 50 180"
          stroke="#00f5ff"
          stroke-width="4"
          fill="none"
          opacity="0.6"
        />
        <!-- DNA 双螺旋的右侧链 -->
        <path
          d="M 150 20 Q 130 60, 150 100 Q 170 140, 150 180"
          stroke="#ff00ff"
          stroke-width="4"
          fill="none"
          opacity="0.6"
        />
        <!-- 连接横杠 -->
        <line x1="50" y1="40" x2="150" y2="40" stroke="#00ff88" stroke-width="2" opacity="0.5" />
        <line x1="50" y1="70" x2="150" y2="70" stroke="#00ff88" stroke-width="2" opacity="0.5" />
        <line x1="50" y1="100" x2="150" y2="100" stroke="#00ff88" stroke-width="2" opacity="0.5" />
        <line x1="50" y1="130" x2="150" y2="130" stroke="#00ff88" stroke-width="2" opacity="0.5" />
        <line x1="50" y1="160" x2="150" y2="160" stroke="#00ff88" stroke-width="2" opacity="0.5" />
      </svg>
    </div>

    <!-- 蛋白质三维结构 SVG 动画（右下角） -->
    <div class="protein-structure">
      <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
        <!-- 蛋白质的螺旋结构 -->
        <circle cx="90" cy="40" r="15" fill="#ff6b6b" opacity="0.7" />
        <circle cx="70" cy="70" r="18" fill="#4ecdc4" opacity="0.7" />
        <circle cx="110" cy="70" r="18" fill="#ffe66d" opacity="0.7" />
        <circle cx="90" cy="100" r="20" fill="#a8e6cf" opacity="0.7" />
        <circle cx="60" cy="130" r="16" fill="#ff8b94" opacity="0.7" />
        <circle cx="120" cy="130" r="16" fill="#c7ceea" opacity="0.7" />
        <!-- 连接线 -->
        <line x1="90" y1="55" x2="70" y2="70" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        <line x1="90" y1="55" x2="110" y2="70" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        <line x1="70" y1="88" x2="90" y2="100" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        <line x1="110" y1="88" x2="90" y2="100" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        <line x1="90" y1="120" x2="60" y2="130" stroke="#ffffff" stroke-width="2" opacity="0.4" />
        <line x1="90" y1="120" x2="120" y2="130" stroke="#ffffff" stroke-width="2" opacity="0.4" />
      </svg>
    </div>

    <!-- 登录卡片（磨砂玻璃效果） -->
    <div class="login-card">
      <!-- 标题 -->
      <h1 class="title">BioAgent 生信分析中台</h1>
      <p class="subtitle">Bioinformatics Analysis Platform</p>

      <!-- 登录表单 -->
      <el-form :model="loginForm" class="login-form">
        <!-- 账号输入框 -->
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            size="large"
            prefix-icon="User"
            clearable
          />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

// 获取路由实例，用于页面跳转
const router = useRouter()

// 定义登录表单的响应式数据，默认值为 admin
const loginForm = ref({
  username: 'admin',
  password: 'admin'
})

// 定义 loading 状态，控制按钮的加载动画
const loading = ref(false)

// 粒子特效初始化函数
const particlesInit = async (engine: Engine) => {
  // 加载 tsparticles 的轻量版本
  await loadSlim(engine)
}

// 粒子特效配置选项
const particlesOptions = {
  background: {
    color: {
      value: 'transparent'  // 背景透明，使用 CSS 渐变
    }
  },
  fpsLimit: 60,  // 限制帧率为 60fps
  particles: {
    color: {
      value: ['#00f5ff', '#ff00ff', '#00ff88', '#ffeb3b']  // 粒子颜色（荧光色）
    },
    links: {
      enable: false  // 不显示粒子之间的连线
    },
    move: {
      enable: true,
      speed: 1.5,  // 粒子移动速度
      direction: 'top',  // 粒子向上移动
      random: true,
      straight: false,
      outModes: {
        default: 'out'  // 粒子移出画布后消失
      }
    },
    number: {
      value: 80,  // 粒子数量
      density: {
        enable: true,
        area: 800  // 粒子密度
      }
    },
    opacity: {
      value: 0.5,  // 粒子透明度
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1
      }
    },
    shape: {
      type: 'circle'  // 粒子形状为圆形
    },
    size: {
      value: { min: 2, max: 6 },  // 粒子大小范围
      random: true
    }
  },
  detectRetina: true  // 支持视网膜屏幕
}

// 处理登录逻辑
const handleLogin = () => {
  // 简单的表单验证
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }

  // 设置 loading 状态为 true，显示加载动画
  loading.value = true

  // 使用 setTimeout 模拟网络请求延迟（1.5 秒）
  setTimeout(() => {
    // 模拟登录成功
    loading.value = false
    
    // 显示成功提示
    ElMessage.success('登录成功')
    
    // 跳转到首页
    router.push('/')
  }, 1500)
}
</script>

<style scoped>
/* 登录容器：全屏显示，带有深蓝到紫色的卡通渐变背景 */
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
  overflow: hidden;
}

/* 粒子特效容器 */
#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

/* DNA 双螺旋动画（左上角） */
.dna-helix {
  position: absolute;
  top: 50px;
  left: 80px;
  z-index: 2;
  animation: float-rotate 8s ease-in-out infinite;
}

/* 蛋白质结构动画（右下角） */
.protein-structure {
  position: absolute;
  bottom: 60px;
  right: 100px;
  z-index: 2;
  animation: float-rotate-reverse 10s ease-in-out infinite;
}

/* DNA 双螺旋的浮动旋转动画 */
@keyframes float-rotate {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
}

/* 蛋白质结构的反向浮动旋转动画 */
@keyframes float-rotate-reverse {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(30px) rotate(-180deg);
  }
  100% {
    transform: translateY(0) rotate(-360deg);
  }
}

/* 登录卡片：磨砂玻璃效果（Glassmorphism） */
.login-card {
  position: relative;
  z-index: 10;
  width: 450px;
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.1);  /* 半透明白色背景 */
  backdrop-filter: blur(20px);  /* 背景模糊效果 */
  border-radius: 30px;  /* 大圆角 */
  border: 2px solid rgba(255, 255, 255, 0.3);  /* 半透明白色边框 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              0 0 60px rgba(138, 43, 226, 0.4);  /* 发光阴影 */
  animation: card-entrance 0.8s ease-out;
}

/* 卡片入场动画 */
@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 标题样式 */
.title {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
}

/* 副标题样式 */
.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

/* 登录表单样式 */
.login-form {
  width: 100%;
}

/* 调整 Element Plus 输入框样式 */
.login-form :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 12px 15px;
  box-shadow: none;
  transition: all 0.3s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.login-form :deep(.el-input__wrapper.is-focus) {
  background: rgba(255, 255, 255, 0.3);
  border-color: #a855f7;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
}

.login-form :deep(.el-input__inner) {
  color: #ffffff;
  font-size: 16px;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

/* 登录按钮样式：高饱和度渐变色 */
.login-button {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
}

/* 登录按钮悬浮效果：放大和阴影加深 */
.login-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(118, 75, 162, 0.6),
              0 0 30px rgba(240, 147, 251, 0.5);
}

/* 登录按钮按下效果 */
.login-button:active {
  transform: scale(0.98);
}

/* 调整表单项间距 */
.login-form :deep(.el-form-item) {
  margin-bottom: 25px;
}

.login-form :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}
</style>
