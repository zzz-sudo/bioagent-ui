<!-- 编码：UTF-8 -->
<!-- 登录页面：包含 Three.js 蛋白质动画、Canvas 粒子雪花、流金文字轮播的完整登录界面 -->

<template>
  <!-- 主容器：全屏显示，深蓝色背景 -->
  <div class="relative w-full h-screen bg-[#0f172a]">
    <!-- Three.js 3D 蛋白质动画容器 -->
    <div id="three-container" class="absolute inset-0 z-0"></div>
    
    <!-- Canvas 粒子雪花效果 -->
    <canvas id="snow-canvas" class="absolute inset-0 pointer-events-none" style="z-index: 1;"></canvas>
    
    <!-- 登录表单层：z-10 确保在背景之上 -->
    <div class="absolute inset-0 z-10 flex w-full h-full">
      <!-- 左侧：品牌展示区域（大屏幕显示） -->
      <div class="hidden lg:flex flex-col justify-center w-1/2 px-16 h-full bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent">
        <!-- Logo 和品牌名称 -->
        <div class="mb-12">
          <div class="flex items-center gap-4 mb-6">
            <!-- DNA 图标容器 -->
            <div class="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
              <i class="ph-fill ph-dna text-5xl text-blue-400"></i>
            </div>
            <!-- 品牌名称 -->
            <div>
              <h1 class="text-5xl font-bold tracking-wider font-mono text-white">BioNexus</h1>
            </div>
          </div>
          <!-- 装饰性渐变线条 -->
          <div class="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
        </div>
        
        <!-- 流金文字轮播区域：固定高度以防止布局抖动 -->
        <div class="h-48 relative w-full max-w-xl">
          <!-- Vue 3 Transition Group 实现文字淡入淡出切换 -->
          <transition-group name="text-fade">
            <!-- 第一条标语：解码生命 -->
            <div v-if="currentSloganIndex === 0" key="0" class="absolute top-0 left-0 w-full">
              <h2 class="text-5xl font-extrabold mb-6 leading-tight golden-text">
                Decoding Life<br>with Intelligence
              </h2>
              <p class="text-xl text-gray-300 font-light leading-relaxed">
                融合深度学习与生物信息学，从 GWAS 到 AlphaFold，一站式解决复杂生物计算难题。
              </p>
            </div>
            
            <!-- 第二条标语：蛋白质设计革命 -->
            <div v-if="currentSloganIndex === 1" key="1" class="absolute top-0 left-0 w-full">
              <h2 class="text-5xl font-extrabold mb-6 leading-tight golden-text">
                Protein Design<br>Revolution
              </h2>
              <p class="text-xl text-gray-300 font-light leading-relaxed">
                利用生成式 AI 进行蛋白质从头设计与结构预测，加速新药研发周期。
              </p>
            </div>
          </transition-group>
        </div>
        
        <!-- 底部状态指示器 -->
        <div class="mt-24 flex gap-8 text-sm text-gray-400 font-mono">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700">
            <!-- 绿色脉冲点：表示在线状态 -->
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>GPU Cluster: Online</span>
          </div>
        </div>
      </div>
      
      <!-- 右侧：登录表单区域 -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <!-- 磨砂玻璃登录卡片 -->
        <div class="glass-panel w-full max-w-[440px] h-[550px] rounded-2xl p-8 relative overflow-hidden flex flex-col shadow-2xl">
          <!-- 卡片头部：标题 -->
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold tracking-tight text-white">用户登录</h2>
          </div>
          
          <!-- 卡片主体：表单内容 -->
          <div class="flex-1 flex flex-col">
            <!-- 登录方式切换标签（当前仅密码登录） -->
            <div class="flex border-b border-gray-700 mb-6">
              <button class="text-white border-b-2 border-blue-500 pb-3 px-4 text-sm font-medium transition-all">密码登录</button>
            </div>
            
            <!-- 表单输入区域 -->
            <div class="space-y-5">
              <!-- 用户名输入框 -->
              <div class="group relative">
                <i class="ph ph-user absolute left-3 top-3.5 text-gray-400 text-lg"></i>
                <input 
                  type="text" 
                  v-model="loginForm.username" 
                  placeholder="用户名 / 邮箱" 
                  class="w-full bg-slate-900/50 border border-gray-600 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500 text-sm transition-colors text-white placeholder-gray-500 focus:bg-slate-900"
                >
              </div>
              
              <!-- 密码输入框 -->
              <div class="group relative">
                <i class="ph ph-lock-key absolute left-3 top-3.5 text-gray-400 text-lg"></i>
                <input 
                  type="password" 
                  v-model="loginForm.password" 
                  placeholder="密码" 
                  class="w-full bg-slate-900/50 border border-gray-600 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500 text-sm transition-colors text-white placeholder-gray-500 focus:bg-slate-900"
                >
              </div>
            </div>
            
            <!-- 登录按钮 -->
            <div class="mt-10">
              <button 
                @click="handleLogin" 
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <!-- 加载中显示旋转图标 -->
                <i v-if="isLoginLoading" class="ph-bold ph-spinner animate-spin"></i>
                {{ isLoginLoading ? '正在建立安全连接...' : '进入控制台' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 3 核心 API
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
// 导入 Vue Router 用于页面跳转
import { useRouter } from 'vue-router'
// 导入 Three.js 用于 3D 蛋白质动画
import * as THREE from 'three'

// 获取路由实例
const router = useRouter()

// 定义登录表单响应式数据，默认值为 admin/admin
const loginForm = reactive({
  username: 'admin',
  password: 'admin'
})

// 定义登录加载状态
const isLoginLoading = ref(false)

// 定义当前标语索引，用于文字轮播
const currentSloganIndex = ref(0)

// 定义全局变量用于存储动画帧 ID，便于清理
let threeAnimationFrameId: number | null = null
let snowAnimationFrameId: number | null = null
let sloganIntervalId: number | null = null

// Three.js 相关全局变量
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let proteins: THREE.Mesh[] = []

// Canvas 粒子雪花相关全局变量
let snowCanvas: HTMLCanvasElement | null = null
let snowCtx: CanvasRenderingContext2D | null = null
let snowParticles: Array<{ x: number; y: number; radius: number; speed: number; opacity: number }> = []

/**
 * 初始化 Three.js 3D 蛋白质动画
 * 创建多个半透明球体模拟蛋白质分子，并添加缓慢旋转和浮动效果
 */
const initThree = () => {
  // 获取 Three.js 容器 DOM 元素
  const container = document.getElementById('three-container')
  if (!container) return

  // 创建 Three.js 场景
  scene = new THREE.Scene()
  
  // 创建透视相机：视野角度 75 度，宽高比根据容器尺寸，近裁剪面 0.1，远裁剪面 1000
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 30 // 相机位置：向后移动 30 个单位

  // 创建 WebGL 渲染器，启用透明背景和抗锯齿
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0x000000, 0) // 透明背景
  container.appendChild(renderer.domElement)

  // 创建 15 个蛋白质球体，随机分布在 3D 空间中
  for (let i = 0; i < 15; i++) {
    // 创建球体几何体：半径在 0.8 到 2.5 之间随机
    const geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.8, 32, 32)
    
    // 创建材质：半透明，带有发光效果
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6), // 随机色相，高饱和度
      transparent: true,
      opacity: 0.4, // 半透明
      emissive: new THREE.Color().setHSL(Math.random(), 0.5, 0.3), // 自发光
      shininess: 100
    })
    
    // 创建网格对象
    const protein = new THREE.Mesh(geometry, material)
    
    // 随机位置：在 -25 到 25 的范围内
    protein.position.x = (Math.random() - 0.5) * 50
    protein.position.y = (Math.random() - 0.5) * 50
    protein.position.z = (Math.random() - 0.5) * 50
    
    // 添加到场景和数组中
    scene.add(protein)
    proteins.push(protein)
  }

  // 添加环境光：柔和的整体照明
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // 添加点光源：模拟主光源
  const pointLight = new THREE.PointLight(0xffffff, 1, 100)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  // 动画循环函数
  const animate = () => {
    threeAnimationFrameId = requestAnimationFrame(animate)

    // 让每个蛋白质球体缓慢旋转和浮动
    proteins.forEach((protein, index) => {
      protein.rotation.x += 0.001 * (index % 2 === 0 ? 1 : -1)
      protein.rotation.y += 0.002 * (index % 3 === 0 ? 1 : -1)
      protein.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01
    })

    // 渲染场景
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  // 启动动画循环
  animate()

  // 监听窗口大小变化，调整渲染器和相机
  const handleResize = () => {
    if (!container || !camera || !renderer) return
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }
  window.addEventListener('resize', handleResize)
}

/**
 * 初始化 Canvas 粒子雪花效果
 * 创建多个半透明圆形粒子，从上到下缓慢飘落
 */
const initSnow = () => {
  // 获取 Canvas DOM 元素
  snowCanvas = document.getElementById('snow-canvas') as HTMLCanvasElement
  if (!snowCanvas) return

  // 设置 Canvas 尺寸为窗口大小
  snowCanvas.width = window.innerWidth
  snowCanvas.height = window.innerHeight

  // 获取 2D 绘图上下文
  snowCtx = snowCanvas.getContext('2d')
  if (!snowCtx) return

  // 创建 100 个雪花粒子
  for (let i = 0; i < 100; i++) {
    snowParticles.push({
      x: Math.random() * snowCanvas.width, // 随机 X 坐标
      y: Math.random() * snowCanvas.height, // 随机 Y 坐标
      radius: Math.random() * 3 + 1, // 半径 1-4 像素
      speed: Math.random() * 1 + 0.5, // 下落速度 0.5-1.5
      opacity: Math.random() * 0.5 + 0.3 // 透明度 0.3-0.8
    })
  }

  // 动画循环函数
  const animateSnow = () => {
    snowAnimationFrameId = requestAnimationFrame(animateSnow)

    if (!snowCtx || !snowCanvas) return

    // 清空画布
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height)

    // 绘制并更新每个粒子
    snowParticles.forEach((particle) => {
      if (!snowCtx) return

      // 绘制圆形粒子
      snowCtx.beginPath()
      snowCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      snowCtx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
      snowCtx.fill()

      // 更新粒子位置：向下移动
      particle.y += particle.speed

      // 如果粒子移出底部，重置到顶部
      if (particle.y > snowCanvas!.height) {
        particle.y = -10
        particle.x = Math.random() * snowCanvas!.width
      }
    })
  }

  // 启动动画循环
  animateSnow()

  // 监听窗口大小变化，调整 Canvas 尺寸
  const handleResize = () => {
    if (!snowCanvas) return
    snowCanvas.width = window.innerWidth
    snowCanvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)
}

/**
 * 处理登录逻辑
 * 设置加载状态，延迟 1.5 秒后跳转到首页
 */
const handleLogin = () => {
  // 设置加载状态为 true
  isLoginLoading.value = true

  // 模拟网络请求延迟 1.5 秒
  setTimeout(() => {
    // 重置加载状态
    isLoginLoading.value = false
    
    // 跳转到首页
    router.push('/')
  }, 1500)
}

/**
 * 组件挂载后的生命周期钩子
 * 初始化 Three.js 动画、Canvas 雪花效果和文字轮播定时器
 */
onMounted(() => {
  // 初始化 Three.js 3D 蛋白质动画
  initThree()
  
  // 初始化 Canvas 粒子雪花效果
  initSnow()
  
  // 启动文字轮播定时器：每 5 秒切换一次标语
  sloganIntervalId = window.setInterval(() => {
    currentSloganIndex.value = (currentSloganIndex.value + 1) % 2
  }, 5000)
})

/**
 * 组件卸载前的生命周期钩子
 * 清理所有动画帧和定时器，释放内存
 */
onBeforeUnmount(() => {
  // 取消 Three.js 动画帧
  if (threeAnimationFrameId !== null) {
    cancelAnimationFrame(threeAnimationFrameId)
  }
  
  // 取消 Canvas 雪花动画帧
  if (snowAnimationFrameId !== null) {
    cancelAnimationFrame(snowAnimationFrameId)
  }
  
  // 清除文字轮播定时器
  if (sloganIntervalId !== null) {
    clearInterval(sloganIntervalId)
  }
  
  // 清理 Three.js 资源
  if (renderer) {
    renderer.dispose()
  }
  
  // 移除窗口事件监听器
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
/* 流金文字效果：渐变色从左到右流动 */
.golden-text {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: shine 4s linear infinite;
}

/* 流金动画：背景位置从左到右移动 */
@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* 磨砂玻璃面板效果 */
.glass-panel {
  background: rgba(15, 23, 42, 0.75); /* 半透明深蓝色背景 */
  backdrop-filter: blur(20px); /* 背景模糊 20px */
  border: 1px solid rgba(255, 255, 255, 0.1); /* 半透明白色边框 */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); /* 深色阴影 */
}

/* 文字淡入淡出过渡效果：激活状态 */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
  position: absolute;
  width: 100%;
}

/* 文字淡入：从下方淡入 */
.text-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* 文字淡出：向上方淡出 */
.text-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
