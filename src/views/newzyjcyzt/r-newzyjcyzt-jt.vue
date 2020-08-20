<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:15:48
 -->
<!-- 新版专业检测一张图 交通-->
<template>
  <div>
    <newzyjcyzt-Header></newzyjcyzt-Header>
    <newzyjcyzt-toolbar :active='1'></newzyjcyzt-toolbar>
    <!-- 军运村实时车辆 -->
    <div class="newzyjcyztJtJycsscl">
      <newzyjcyztJtJycsscl></newzyjcyztJtJycsscl>
    </div>
    <!-- 军运村车辆统计 -->
    <div class="newzyjcyztJtJyccltj">
      <newzyjcyztJtJyccltj @showDetail="showDetail"></newzyjcyztJtJyccltj>
    </div>
    <!-- 军运村内车辆类型分布 -->
    <div class="newzyjcyztJtCllxfb">
      <newzyjcyztJtCllxfb></newzyjcyztJtCllxfb>
    </div>
    <!-- 天气实况 -->
    <div class="newzyjcyztQxTqsk">
      <newzyjcyztQxTqsk></newzyjcyztQxTqsk>
    </div>
    <!-- 军运村停车场统计 -->
    <div class="newzyjcyztTcctj">
      <newzyjcyztTcctj></newzyjcyztTcctj>
    </div>
    <map-main></map-main>
    <!-- 军运村停车场统计 视频 -->
    <div class="newzyjcyztJtCltjVideo">
      <newzyjcyztJtCltjVideo></newzyjcyztJtCltjVideo>
    </div>
    <jyccltjDetail v-show="showDetailPop" @closeDetil="closeDetil"></jyccltjDetail>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
import newzyjcyztHeader from './newzyjcyzt-Header'
import newzyjcyztToolbar from './newzyjcyzt-toolbar'
import newzyjcyztTcctj from './newzyjcyzt-tcctj'
import newzyjcyztQxTqsk from './newzyjcyzt-qx-leftthree.vue'
import newzyjcyztJtJycsscl from './newzyjcyzt-jt-jycsscl.vue'
import newzyjcyztJtJyccltj from './newzyjcyzt-jt-jyccltj.vue'
import newzyjcyztJtCllxfb from './newzyjcyzt-jt-cllxfb.vue'
import newzyjcyztJtCltjVideo from './newzyjcyzt-jt-cltjVideo.vue'
import jyccltjDetail from './jyccltj-Detail.vue'
let self
export default {
  components: {
    mapMain,
    newzyjcyztHeader,
    newzyjcyztToolbar,
    newzyjcyztTcctj,
    newzyjcyztQxTqsk,
    newzyjcyztJtJycsscl,
    newzyjcyztJtJyccltj,
    newzyjcyztJtCllxfb,
    newzyjcyztJtCltjVideo,
    jyccltjDetail
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map'])
  },
  data () {
    return {
      showDetailPop: false
    }
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
    },
    showDetail (data) {
      this.showDetailPop = data
    },
    closeDetil (data) {
      this.showDetailPop = data
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
.newzyjcyztQxTqsk {
  position: absolute;
  top: 84 * @px;
  right: 20 * @px;
  z-index: 10;
}
.newzyjcyztJtCllxfb {
  position: absolute;
  top: 601 * @px;
  left: 20 * @px;
  z-index: 10;
}
.newzyjcyztTcctj {
  position: absolute;
  top: 274 * @px;
  right: 20 * @px;
  z-index: 10;
}
.newzyjcyztJtCltjVideo {
  position: absolute;
  top: 673 * @px;
  right: 20 * @px;
  z-index: 10;
}
</style>
