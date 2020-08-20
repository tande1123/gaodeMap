<!--
 * @Description: 菜单界面
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-05 09:41:05
 * @LastEditors: wsw
 * @LastEditTime: 2019-01-04 15:27:56
 -->
<template>
<div>
  <ul class="menu">
    <li><a href="#/measure">工具</a></li>
    <li><a href="#/draw">绘图</a></li>
    <li><a href="#/geo">加点、线</a></li>
    <li><a href="#/switch">底图切换</a></li>
    <li><a href="#/res">资源列表</a></li>
    <li><a href="#/buffer">缓冲区分析</a></li>
    <li><a href="#/search">搜索/定位</a></li>
  </ul>
</div>
</template>

<script>
export default {
  components: {
  }
}
</script>
<style scoped>
  .menu{
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ccc;
    padding: 0 10px;
  }
</style>
