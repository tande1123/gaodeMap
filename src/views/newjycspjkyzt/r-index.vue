<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
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
import jkyztHead from './r-newjycspjkyzt-Header.vue'
import jkyztLeft from './r-newjycspjkyzt-left.vue'
import jkyztVideo from './r-newjycspjkyzt-video.vue'
export default {
  // name:'Jycspjkyzt',
  data () {
    return {
      show: true
    }
  },
  props: [],
  computed: {},
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
  errorCaptured () { },
  components: { jkyztHead, jkyztLeft, jkyztVideo, mapMain }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.jycsp {
  height: 100%;
  width: 100%;
  // opacity: 0.9;
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
  width: 725 * @px;
  height: 625 * @px;
  position: fixed;
  top: 135 * @px;
  left: 767 * @px;
  right: 0;
  pointer-events: none;
}

</style>
