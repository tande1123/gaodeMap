<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:21:47
 -->
<!--
 专业监测一张图总览
 -->
<template>
  <div class="zyjcyztBox">
    <!-- 头部 -->
    <zyjcyztHeader />
    <!-- 左侧栏-->
    <div class="left">
      <zyjcyztLeft />
      <zyjcyztLeftTwo />
      <zyjcyztLeftThree />
    </div>
    <!-- 右侧栏-->
    <div class="right">
      <zyjcyztRight />
      <zyjcyztRightTwo />
    </div>
    <!-- 底部菜单 -->
    <zyjcyztFooter />
    <map-main></map-main>
  </div>
</template>
<script>
import mapMain from '@/gis/map/map-main'
import zyjcyztHeader from './r-zyjcyzt-Header.vue'
import zyjcyztFooter from './r-zyjcyzt-footer.vue'
import zyjcyztLeft from './r-zyjcyzt-left.vue'
import zyjcyztLeftTwo from './r-zyjcyzt-lefttwo.vue'
import zyjcyztLeftThree from './r-zyjcyzt-leftthree.vue'
import zyjcyztRight from './r-zyjcyzt-rightOne.vue'
import zyjcyztRightTwo from './r-zyjcyzt-rightTwo.vue'
export default {
  data () {
    return {

    }
  },
  props: [],
  computed: {},
  methods: {},
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
  components: {
    mapMain, zyjcyztHeader, zyjcyztFooter, zyjcyztLeft, zyjcyztLeftTwo, zyjcyztLeftThree, zyjcyztRight, zyjcyztRightTwo
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.zyjcyztBox {
  width: 100%;
  height: 100%;
}
.left {
  width: 414 * @px;
  // float: left;
  margin: 84 * @px 0 0 20 * @px;
  position: absolute;
  z-index: 999;
}
.right {
  width: 414 * @px;
  // float: right;
  margin: 84 * @px 20 * @px 0 0;
   position: absolute;
  z-index: 999;
}
</style>
