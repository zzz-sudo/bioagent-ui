<!-- Author: Kuroneko -->
<!-- 首页占位组件，后续将开发完整的项目列表功能 -->

<template>
  <div class="home-container">
    <div class="content">
      <h1>欢迎来到 BioAgent 生信分析中台</h1>
      <p>首页功能正在开发中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用 Vue 3 Composition API
// 当前为占位页面，暂无业务逻辑
</script>

<style scoped>
/* 首页容器样式 */
.home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 内容区域样式 */
.content {
  text-align: center;
  color: white;
}

.content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: bold;
}

.content p {
  font-size: 24px;
  opacity: 0.9;
}
</style>
