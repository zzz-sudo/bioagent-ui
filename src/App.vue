<!-- Author: Kuroneko -->
<!-- 根组件，负责渲染路由视图，确保页面占满全屏 -->

<template>
  <!-- router-view 是路由的出口，所有路由组件都会在这里渲染 -->
  <router-view />
</template>

<script setup lang="ts">
// 使用 Vue 3 Composition API 的 setup 语法糖
// 当前根组件无需额外逻辑，仅作为路由容器
</script>

<style>
/* 全局样式重置，确保页面占满整个视口 */

/* 重置所有元素的默认边距和内边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 设置 html 和 body 占满全屏 */
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 确保根元素 #app 占满全屏 */
#app {
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
