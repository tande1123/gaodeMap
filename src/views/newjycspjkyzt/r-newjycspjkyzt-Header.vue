<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:10:33
 -->
<!-- 军运村视频监控一张图头部 -->
<template>
  <div class="top">
    <header class="topImg">
      <div>
        <p class="top-name">军运村视频监控一张图</p>
      </div>
      <a :href="Return_fhsyUrl" class="top-fanhui">
        <img src="../../../static/assets/img/zyjcyzt/back.png" alt="" class="toptitlea" >
        <p class="fanhui">返回首页</p>
      </a>
    </header>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
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
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.top {
  width: 100%;
  height: 72 * @px;
}
header {
  width: 100%;
  height:72 * @px;
  background: url("../../../static/img/newjycspjkyzt/title.png") no-repeat center center;
  background-size:100% auto;
  position: relative;
}
.top-name {
  text-align: center;
  line-height: 72 * @px;
  color: #fff;
  font-size: 32px;
  font-weight: 500;
}
.top-wenzhi {
  display: inline-block;
  text-align: center;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  font-size: 32 * @px;
  font-weight: bolder;
  line-height: 72 * @px;
  color: #8ad3ec;
}
.top-fanhui {
  position: absolute;
  top: 34 * @px;
  right: 13 * @px;
  display: block;
  // width: 130 * @px;
  // height: 36 * @px;
}
.toptitlea {
  width: 100%;
  height: 100%;
  z-index: 99;
  transform: 0.8s;
  -webkit-transform: 0.8s;
  -moz-transform: 0.8s;
  -ms-transform: 0.8s;
  -o-transform:0.8s;
}
.toptitlea:hover {
  opacity: 0.9;
  cursor: pointer;
}
.fanhui {
  height: 40 * @px;
  display: block;
  z-index: 99;
  position: absolute;
  right: 30 * @px;
  top: 12 * @px;
  color: white;
  font-size: 14 * @px;
  cursor: pointer;
}
.toptitle > p {
  width: 100%;
  height: 36 * @px;
  position: absolute;
  left: 0;
  text-align: center;
  font-size: 32 * @px;
  color: #ffffff;
  line-height: 36 * @px;
}
a {
  position: absolute;
  right: 120 * @px;
  top: 26 * @px;
}
a img {
  width: 265*@px;
  height: 40*@px;
  font-size: 18 * @px;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
