<!--
 * @Description:车流量分析入口
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2019-01-17 10:34:52
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:44
 -->
<template>
  <div>
    <map-main></map-main>
      <!-- 军运村实时车辆 -->
    <div class="newzyjcyztJtJycsscl">
     <clxfxsscl></clxfxsscl>
    </div>
    <!-- 军运村车辆统计 -->
    <div class="newzyjcyztJtJyccltj">
      <clxfxcltj></clxfxcltj>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
import clxfxsscl from './cllfx-sscl'
import clxfxcltj from './cllfx-cltj'
let self
export default {
  components: {
    mapMain,
    clxfxsscl,
    clxfxcltj
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map'])
  },
  data () {
    return {}
  },
  props: [],
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
<style lang="less" scoped>
@import "../../assets/less/set.less";
@px: 30rem/1920;
.newzyjcyztJtJycsscl {
  position: absolute;
  top: 84 * @px;
  left: 20 * @px;
  z-index: 10;
}
.newzyjcyztJtJyccltj {
  position: absolute;
  top: 307 * @px;
  left: 20 * @px;
  z-index: 10;
}
</style>
