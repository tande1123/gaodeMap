<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:16
 -->
<!-- 军运周边态势 -->
<template>
  <div class="head">
    <a href="../amap-tdt/#/r-zbtsgz-zbqxts">
      <div :class="active === 1 ? 'icon-qx-active' : 'icon-qx'"></div>
    </a>
    <a href="../amap-tdt/#/r-zbtsgz-zbhjts">
      <div :class="active === 2 ? 'icon-hj-active': 'icon-hj'"></div>
    </a>
    <a href="../amap/#/site">
      <div :class="active === 3 ? 'icon-jt-active': 'icon-jt'"></div>
    </a>
    <a :href="Return_fhsyUrl">
      <div :class="active === 4 ? 'icon-fh-active': 'icon-fh'"></div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      Return_fhsyUrl: ''
    }
  },
  props: ['active'],
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
@px : 30rem/1920;
.head {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 70 * @px;
  background-image: url("../../../static/img/site/icon-header.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.head > div:hover {
  cursor: pointer;
}
.icon-qx {
  position: absolute;
  bottom: 0;
  left: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-qxts.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-qx:hover {
  position: absolute;
  bottom: 0;
  left: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-qxts-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-qx-active {
  position: absolute;
  bottom: 0;
  left: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-qxts-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-hj {
  position: absolute;
  bottom: 0;
  left: 385 * @px;
  width: 225 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-hjts.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-hj:hover {
  position: absolute;
  bottom: 0;
  left: 385 * @px;
  width: 225 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-hjts-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-hj-active {
  position: absolute;
  bottom: 0;
  left: 385 * @px;
  width: 225 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-hjts-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-jt {
  position: absolute;
  bottom: 0;
  right: 385 * @px;
  width: 225 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-jtts.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-jt:hover {
  position: absolute;
  bottom: 0;
  right: 385 * @px;
  width: 225 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-jtts-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-jt-active {
  position: absolute;
  bottom: 0;
  right: 385 * @px;
  width: 225 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-jtts-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-fh {
  position: absolute;
  bottom: 0;
  right: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-fhsy.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-fh:hover {
  position: absolute;
  bottom: 0;
  right: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-fhsy-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-fh:active {
  position: absolute;
  bottom: 0;
  right: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-fhsy-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.icon-fh-active {
  position: absolute;
  bottom: 0;
  right: 121 * @px;
  width: 260 * @px;
  height: 42 * @px;
  background-image: url("../../../static/img/site/icon-fhsy-active.png");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
</style>
