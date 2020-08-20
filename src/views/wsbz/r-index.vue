<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:17:36
 -->
<!-- 卫生保障 -->
<template>
  <div>
     <map-main></map-main>
    <!-- 头部 -->
    <div class="header">
      <wsbzheader></wsbzheader>
    </div>
    <transition name="slide-fade">
      <div class="wsbz_box" v-if="show">
        <!-- 天气预报 -->
        <div class="tqyb_box">
          <tqyb></tqyb>
        </div>
        <!-- 120急救状态 -->
        <div class="first-aid">
          <firstAid></firstAid>
        </div>
        <!-- 卫生检测 -->
        <div class="detection">
          <wsjc></wsjc>
        </div>
        <!-- 卫生保障值班信息 -->
        <div class="duct">
          <wsbzzbxx></wsbzzbxx>
        </div>
      </div>
    </transition>
    <!-- 右侧面板信息 -->
    <div class="patientInfo">
      <div class="hzxx_box">
        <hzxx ref="hzxx"></hzxx>
      </div>
      <div class="xz">
        <ylxx @SavePatientInfo="SavePatientInfo"></ylxx>
      </div>
    </div>
    <!-- 底部btn -->
    <div class="footer">
      <footerNav></footerNav>
    </div>
    <!-- 报警信息 -->
    <div class="emergencyinfo">
      <emergencyinfo></emergencyinfo>
    </div>
    <div class="kztb" @click="showOpen">
      <i :class="show?'icon-left':'icon-right'"></i>
    </div>
    <div class="dbyl">
      <dbyl></dbyl>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
import wsbzheader from './header.vue'
import tqyb from './tqyb.vue'
import firstAid from './firstAid.vue'
import wsjc from './wsjc.vue'
import wsbzzbxx from './wsbzzbxx.vue'
import hzxx from './hzxx.vue'
import emergencyinfo from './emergencyinfo.vue'
import footerNav from './footer.vue'
import dbyl from './dbyltd_pop.vue'
import ylxx from './ylxx.vue'
let self
export default {
  components: {
    mapMain,
    firstAid,
    wsjc,
    wsbzzbxx,
    hzxx,
    wsbzheader,
    emergencyinfo,
    footerNav,
    tqyb,
    dbyl,
    ylxx
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map'])
  },
  data () {
    return {
      show: false
    }
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
    },
    showOpen () {
      this.show = !this.show
    },
    SavePatientInfo (data) {
      if (data) {
        this.$refs.hzxx.loadData()
      }
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.initMap()
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.initMap()
    })
  },
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
  }
}
</script>
<style lang="less" scoped>
@px: 30rem/1920;
.header {
  position: absolute;
  top: 0;
  left: 0;
}
.wsbz_box {
  width: 414 * @px;
  position: absolute;
  top: 84 * @px;
  left: 20 * @px;
}
.first-aid,
.detection,
.duct {
  margin-top: 14 * @px;
}
.patientInfo {
  position: absolute;
  top: 84 * @px;
  right: 20 * @px;
  .hzxx_box {
    margin-top: 10 * @px;
  }
  .xz {
    margin-top: 14 * @px;
  }
}
.emergencyinfo {
  position: absolute;
  left: 0;
  bottom: 0;
}
.footer {
  width: 896 * @px;
  position: absolute;
  bottom: 79 * @px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.kztb {
  height: 30 * @px;
  width: 14 * @px;
  position: absolute;
  top: 50%;
  left: 0;
  .icon-right {
    display: inline-block;
    height: 30 * @px;
    width: 17 * @px;
    background: url("../../../static/assets/img/wsbz/right.png") no-repeat
      center center;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .icon-left {
    display: inline-block;
    height: 30 * @px;
    width: 17 * @px;
    background: url("../../../static/assets/img/wsbz/left.png") no-repeat center
      center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(-414px);
  opacity: 0;
}
</style>
