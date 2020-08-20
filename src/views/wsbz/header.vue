<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!--专业监测一张图 头部 -->
<template>
  <header class="toptitle">
    <a :href="Return_fhsyUrl">
      <img src="../../../static/assets/img/newzyjcyzt/back.png" alt="" class="toptitlea">
      <p class="fanhui">返回</p>
    </a>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      Return_fhsyUrl: ''
    }
  },
  props: [],
  computed: {
    ...mapGetters(['configLoaded', 'mapConfig'])
  },
  methods: {},
  watch: {
    configLoaded () {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    if (this.configLoaded) {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {
    clearInterval(this.gettime)
  },
  destroyed () { },
  errorCaptured () { }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/set.less";
@import "../../fonts/font2/font.css";
header {
  width: 100%;
  height: 70 * @px;
  position: fixed;
  top: -1px;
  left: 0;
  z-index: 9;
  background: url("../../../static/assets/img/wsbz/header.png") no-repeat center
    center;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
}
.hearderbj {
  width: 100%;
  height: 70 * @px;

  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
.toptitlea {
  height: 40 * @px;
  display: block;
  z-index: 99;
  position: absolute;
  top: 27 * @px;
  right: 13 * @px;
  transform: 0.8s;
  -webkit-transform: 0.8s;
  -moz-transform: 0.8s;
  -ms-transform: 0.8s;
  -o-transform: 0.8s;
}
.toptitlea:hover {
  opacity: 0.9;
  cursor: pointer;
}
.fanhui {
  width: 55 * @px;
  height: 40 * @px;
  text-align: center;
  display: block;
  z-index: 99;
  position: absolute;
  top: 35 * @px;
  right: 30 * @px;
  color: white;
  font-size: 16 * @px;
  font-weight: bold;
  cursor: pointer;
}
</style>
