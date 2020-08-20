<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:00
 -->
<!-- 新版专业检测一张图  气象 -->
<template>
  <div>
    <newzyjcyzt-Header></newzyjcyzt-Header>
    <newzyjcyzt-toolbar :active='2'></newzyjcyzt-toolbar>
    <!-- 雨情 -->
    <div class="newzyjcyztQxYuQing">
      <newzyjcyztQxYuQing></newzyjcyztQxYuQing>
    </div>
    <!-- 水情 -->
    <div class="newzyjcyztQxShuiQing">
      <newzyjcyztQxShuiQing></newzyjcyztQxShuiQing>
    </div>
    <!-- 天气实况 -->
    <div class="newzyjcyztQxTqsk">
      <newzyjcyztQxTqsk></newzyjcyztQxTqsk>
    </div>
    <!-- 未来三天天气预报 -->
    <div class="newzyjcyztQxWlsttq">
      <newzyjcyztQxWlsttq></newzyjcyztQxWlsttq>
    </div>
    <map-main></map-main>
    <!-- 气象监测站 -->
    <div class="newzyjcyztQxQxjcz">
      <newzyjcyztQxQxjcz></newzyjcyztQxQxjcz>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
import newzyjcyztHeader from './newzyjcyzt-Header'
import newzyjcyztToolbar from './newzyjcyzt-toolbar'
import newzyjcyztQxYuQing from './newzyjcyzt-qx-rightOne.vue'
import newzyjcyztQxShuiQing from './newzyjcyzt-qx-rightTwo.vue'
import newzyjcyztQxTqsk from './newzyjcyzt-qx-leftthree.vue'
import newzyjcyztQxWlsttq from './newzyjcyzt-qx-wlsttq.vue'
import newzyjcyztQxQxjcz from './newzyjcyzt-qx-qxjcz.vue'
let self
export default {
  components: {
    mapMain,
    newzyjcyztHeader,
    newzyjcyztToolbar,
    newzyjcyztQxYuQing,
    newzyjcyztQxShuiQing,
    newzyjcyztQxTqsk,
    newzyjcyztQxWlsttq,
    newzyjcyztQxQxjcz
  },
  data () { return {} },
  props: [],
  computed: {
    ...mapGetters(['mapLoaded', 'map'])
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
.newzyjcyztQxYuQing {
  position: absolute;
  top: 84 * @px;
  left: 20 * @px;
  z-index: 10;
}
.newzyjcyztQxShuiQing {
  position: absolute;
  top: 545 * @px;
  left: 20 * @px;
  z-index: 10;
}
.newzyjcyztQxTqsk {
  position: absolute;
  top: 84 * @px;
  right: 20 * @px;
  z-index: 10;
}
.newzyjcyztQxWlsttq {
  position: absolute;
  top: 274 * @px;
  right: 20 * @px;
  z-index: 10;
}
.newzyjcyztQxQxjcz {
  position: absolute;
  top: 629 * @px;
  right: 20 * @px;
  z-index: 10;
}
</style>
