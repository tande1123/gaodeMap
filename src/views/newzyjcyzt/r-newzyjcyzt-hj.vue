<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 新版专业检测一张图  环境 -->
<template>
  <div>
    <!-- 头部 -->
    <newzyjcyzt-Header></newzyjcyzt-Header>
    <!-- 菜单 -->
    <newzyjcyzt-toolbar :active='3'></newzyjcyzt-toolbar>
    <!-- 天气实况 -->
    <newzyjcyzt-hj-zbtqsk class="rnewzyjcyzttqsk"></newzyjcyzt-hj-zbtqsk>
    <!-- 场馆空气质量 -->
    <newzyjcyzt-hj-cgkqzl class="rnewzyjcyztzgkqzl"></newzyjcyzt-hj-cgkqzl>
    <!-- 各区空气质量排名 -->
    <newzyjcyzt-hj-kqzlpm class="rnewzyjcyztkqzlpm"></newzyjcyzt-hj-kqzlpm>
    <!-- 空气质量预报 -->
    <newzyjcyzt-hj-kqzlyb class="rnewzyjcyztkqzlyb"></newzyjcyzt-hj-kqzlyb>
    <!-- 空气质量指数 -->
    <newzyjcyzt-hj-kqzlzs class="rnewzyjcyztkqzlzs"></newzyjcyzt-hj-kqzlzs>
    <!-- 重点监控单位 -->
    <newzyjcyztHjZdjkdw class="rnewzyjcyztHjZdjkdw"></newzyjcyztHjZdjkdw>
    <!-- 弹窗 -->
    <div class="rnewzyjcyztHjLayer" v-if="show">
      <newzyjcyztHjLayer></newzyjcyztHjLayer>
    </div>
    <map-main></map-main>
    <!-- 标尺 -->
    <newzyjcyzt-hj-bc class="rnewzyjcyztbc"></newzyjcyzt-hj-bc>
  </div>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
import mapMain from '@/gis/map/map-main'
import newzyjcyztHeader from './newzyjcyzt-Header'
import newzyjcyztToolbar from './newzyjcyzt-toolbar'
import newzyjcyztHjZbtqsk from './newzyjcyzt-hj-zbtqsk'
import newzyjcyztHjCgkqzl from './newzyjcyzt-hj-cgkqzl'
import newzyjcyztHjKqzlpm from './newzyjcyzt-hj-kqzlpm'
import newzyjcyztHjKqzlyb from './newzyjcyzt-hj-kqzlyb'
import newzyjcyztHjKqzlzs from './newzyjcyzt-hj-kqzlzs'
import newzyjcyztHjBc from './newzyjcyzt-hj-bc'
import newzyjcyztHjZdjkdw from './newzyjcyzt-hj-zdjkdw'
import newzyjcyztHjLayer from './newzyjcyzt-hj-layer'
let self
export default {
  components: {
    mapMain,
    newzyjcyztHeader,
    newzyjcyztToolbar,
    newzyjcyztHjZbtqsk,
    newzyjcyztHjCgkqzl,
    newzyjcyztHjKqzlpm,
    newzyjcyztHjKqzlyb,
    newzyjcyztHjKqzlzs,
    newzyjcyztHjBc,
    newzyjcyztHjZdjkdw,
    newzyjcyztHjLayer
  },
  data () {
    return {
      show: false
    }
  },
  props: [],
  computed: {
    ...mapGetters(['mapLoaded', 'map']),
    ...mapState(['zdwl'])
  },
  methods: {
    initMap () {
      this.map.getInstance().setZoomAndCenter(13, [114.29, 30.43])
      this.map.getInstance().setMapStyle('')

      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
            lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
            lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet') {
            lyrs[l].show()
          }
        }
      }
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.initMap()
    },
    zdwl: {
      handler (newName, oldName) {
        this.show = this.zdwl
      },
      immediate: true,
      deep: true
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.initMap()
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {
    // 退出时隐藏底图
    var lyrs = this.map.getInstance().getLayers()
    if (lyrs) {
      for (var l = 0; l < lyrs.length; l++) {
        if (lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
          lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
          lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet') {
          lyrs[l].hide()
        }
      }
    }
    this.map.clear()
  },
  destroyed () { },
  errorCaptured () { }

}
</script>
<style lang='less' scoped>
@px: 30rem/1920;
.rnewzyjcyzttqsk {
  position: absolute;
  top: 84 * @px;
  left: 20 * @px;
  z-index: 10;
}
.rnewzyjcyztzgkqzl {
  position: absolute;
  top: 368 * @px;
  left: 20 * @px;
  z-index: 10;
}
.rnewzyjcyztkqzlpm {
  position: absolute;
  top: 711 * @px;
  left: 20 * @px;
  z-index: 10;
}
.rnewzyjcyztkqzlyb {
  position: absolute;
  top: 84 * @px;
  right: 20 * @px;
  z-index: 10;
}
.rnewzyjcyztkqzlzs {
  position: absolute;
  top: 368 * @px;
  right: 20 * @px;
  z-index: 10;
}
.rnewzyjcyztbc {
  position: absolute;
  top: 84 * @px;
  right: 453 * @px;
  z-index: 10;
}
.rnewzyjcyztHjZdjkdw {
  position: absolute;
  right: 20 * @px;
  top: 712 * @px;
  z-index: 10;
}
.rnewzyjcyztHjLayer {
  position: absolute;
  right: 575 * @px;
  top: 167 * @px;
  z-index: 10;
}
</style>
