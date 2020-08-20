<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 军运村视频监控一张图头部 -->
<template>
  <div class="top">
    <header class="topImg">
      <a :href="Return_fhsyUrl">
        <img src="../../../static/img/jycspjkyzt/videoharder1.png" alt="">
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
  background: url("../../../static/img/jycspjkyzt/video-head.png") no-repeat center center;
  background-size:100% auto;
  position: relative;
  // background: #00010f;
}
// .topImg img {
//   width: 100%;
//   height: 72 * @px;
// }
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
