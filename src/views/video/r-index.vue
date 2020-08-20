<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:50
 -->
<!-- 视频监控一张图入口文件 -->
<template>
  <div class="jycsp">
    <map-main></map-main>
    <!-- 头部组件 -->
    <jkyztHead />
    <!-- 左侧文本框组件 -->
    <div class="left">
      <jkyztLeft />
    </div>
    <!-- 中间轮播组件 -->
    <div class="jycspLunbo">
      <jkyztLunbo />
    </div>
    <!-- 中间视频组件 -->
    <div
      class="zjVideo"
      v-if="show"
      @openChange="closeVide"
    >
      <jkyztVideo />
    </div>
  </div>
</template>

<script>
import mapMain from '@/gis/map/map-main'
import jkyztHead from './r-jycspjkyzt-Header.vue'
import jkyztLeft from './r-jycspjkyzt-left.vue'
import jkyztLunbo from './r-jycspjkyzt-lunbo.vue'
import jkyztVideo from './r-jycspjkyzt-video.vue'
export default {
  components: { mapMain, jkyztHead, jkyztLeft, jkyztLunbo, jkyztVideo },
  computed: {},
  data () {
    return {
      show: true
    }
  },
  props: [],
  methods: {
    closeVide (title) {
      console.log(title)
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.jycsp {
  height: 100%;
  width: 100%;
  background: #000211;
  opacity: 0.9;
  overflow: hidden;
}
.left {
  float: left;
  width: 414 * @px;
  margin: 14 * @px 0 0 20 * @px;
  height: 500 * @px;
}
.jycspLunbo {
  width: 1433 * @px;
  height: 213 * @px;
  position: fixed;
  top: 82 * @px;
  left: 454 * @px;
  background: url("../../../static/img/jycspjkyzt/topbj.png") no-repeat center
    center;
  background-size: 100%;
  z-index: 3;
}
.zjVideo {
  width: 730 * @px;
  height: 534 * @px;
  position: fixed;
  top: 330 * @px;
  left: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
}

</style>
