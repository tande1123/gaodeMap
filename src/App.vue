<!--
 * @Description: 界面入口
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-04 10:10:10
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-07-24 18:32:05
 -->
<template>
  <div id="app">
    <!-- <map-main></map-main> -->
    <drag-panel></drag-panel>
    <router-view class="container-panel" />
  </div>
</template>

<script>
import mapMain from '@/gis/map/map-main'
import dragPanel from '@/components/drag-panel'
export default {
  name: 'App',
  components: {
    mapMain,
    dragPanel
  },
  watch: {
    '$route' (to, from) {
      switch (to.path) {
        case '/vehicle':
        case '/site':
        case '/newzyjcyzt':
        case '/wsbz':
        case '/r-dxyy-rywz':
        case '/r-trsx-rywz':
          document.body.style.background = `white`
          setTimeout(() => { document.getElementById('map_container').style.background = `white` }, 50)
          // document.getElementById('map_container').style.background = `white`
          // document.body.style.background = `url("./static/assets/img/maskImage/yjzhcjMask2.png") #0D4799`
          break
        case '/zsfwxx':
        case '/r-rcyxcj-bcss':
        case '/r-rcyxcj-ylss':
          // document.body.style.background = `#033447`
          setTimeout(() => { document.getElementById('map_container').style.background = `#033447` }, 50)
          // document.getElementById('map_container').style.background = `#033447`
          // document.body.style.backgroundColor = `rgb(11,50,110)`
          break
        case '/jtzx':
          document.body.style.background = `transparent`
          setTimeout(() => { document.getElementById('map_container').style.background = `transparent` }, 50)
          // document.getElementById('map_container').style.background = `transparent`
          break
        default:
          break
      }
      if (to.path === '/') {
        document.body.style.background = `transparent`
      }
    }
  },
  mounted () {

  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}
.container-panel {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.container-panel * {
  pointer-events: auto;
}
</style>
