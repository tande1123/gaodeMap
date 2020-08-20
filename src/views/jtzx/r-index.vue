<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 交通专项 -->
<template>
  <div class="jtzx">
    <!-- <top></top> -->
    <div class="left-wrap">
      <!-- 今日班车调度 -->
      <div class="jrbcdd">
        <jrbcdd @showPopBcss="ifShowPopBcss"></jrbcdd>
      </div>
      <!-- 班车统计 -->
      <div class="bctj">
        <bctj></bctj>
      </div>
    </div>
    <div class="mapWrap">
      <div class="map-jtzx-icon" v-show="jtzx" @click="changeMap()"></div>
      <div class="map-jtzx-tuli" v-show="jtzx"></div>
      <div v-if="showPopBcss" class="popbcss">
        <popBcss></popBcss>
      </div>
      <div class="diaodu" v-show="!jtzx">
        <ul class="tabBox">
          <li @click="changeTabe(0)" :class="{active:tabindex===0}">运动员抵达</li>
          <li @click="changeTabe(1)" :class="{active1:tabindex===1}">运动员离开</li>
          <li @click="changeTabe(2)" :class="{active2:tabindex===2}">运动员赛时</li>
          <li @click="changeTabe(3)" :class="{active3:tabindex===3}">开闭幕式离村</li>
          <li @click="changeTabe(4)" :class="{active4:tabindex===4}">开闭幕式回村</li>
          <li @click="changeTabe(5)" :class="{active5:tabindex===5}">代表团</li>
          <li @click="changeTabe(6)" :class="{active6:tabindex===6}">贵宾专用</li>
          <li @click="changeTabe(7)" :class="{active7:tabindex===7}">参观流线</li>
          <li @click="changeTabe(8)" :class="{active8:tabindex===8}">电瓶车流线</li>
        </ul>
        <img :src="imgSrc" alt="" class="imgOne">
        <img :src="imgSrc2" alt="" class="imgTwo">
        <div class="icon-diaodu" @click="changeMap()"></div>
      </div>
      <div class="mapBox">
        <map-main></map-main>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import top from './header.vue'
import jrbcdd from './jrbcdd.vue'
import bctj from './bctj.vue'
import popBcss from '@/components/pop-bcss'
import mapMain from '@/gis/map/map-main'
let self
export default {
  data () {
    return {
      ClickMarker: {},
      showPopBcss: true,
      jtzx: true,
      imgSrc: '',
      imgSrc2: '',
      tabindex: null
    }
  },
  components: {
    jrbcdd,
    bctj,
    top,
    popBcss,
    mapMain
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'panel', 'clickMarkerData']),
    ...mapState(['mapVisible', 'popBcss'])
  },
  methods: {
    initMap () {
      this.map.getInstance().setZoomAndCenter(13, [114.29, 30.43])
      this.map.getInstance().setMapStyle('amap://styles/blue')// 靛青蓝

      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          // if (lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
          //   lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
          //   lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet') {
          //   lyrs[l].show()
          // }
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer') {
            lyrs[l].show()
          }
        }
      }
    },
    changeMap () {
      this.jtzx = !this.jtzx
      if (!this.jtzx) {
        this.panel.getVediocall2().closePanel()
        this.$store.commit('setPopBcss', false)
      } else {
        this.$store.commit('setPopBcss', true)
      }
    },
    changeTabe (index) {
      this.tabindex = index
      switch (index) {
        case 0:
          this.imgSrc = require('../../../static/assets/img/jtzx/ydyddlx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/ydydd.png')
          break
        case 1:
          this.imgSrc = require('../../../static/assets/img/jtzx/ydylk_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/ydylk_rl.png')
          break
        case 2:
          this.imgSrc = require('../../../static/assets/img/jtzx/ydyss_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/ydyss_rl.png')
          break
        case 3:
          this.imgSrc = require('../../../static/assets/img/jtzx/kbms_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/kbms_rl.png')
          break
        case 4:
          this.imgSrc = require('../../../static/assets/img/jtzx/kbmshc_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/kbmshc_rl.png')
          break
        case 5:
          this.imgSrc = require('../../../static/assets/img/jtzx/dbt_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/dbt_rl.png')
          break
        case 6:
          this.imgSrc = require('../../../static/assets/img/jtzx/gbzx_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/gbzy_rl.png')
          break
        case 7:
          this.imgSrc = require('../../../static/assets/img/jtzx/cglx_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/cglx_rl.png')
          break
        case 8:
          this.imgSrc = require('../../../static/assets/img/jtzx/dpc_lx.png')
          this.imgSrc2 = require('../../../static/assets/img/jtzx/dpc_rl.png')
          break
        default:
          break
      }
    },
    ifShowPopBcss (data) {
      if (!this.jtzx) {
        this.$store.commit('setPopBcss', false)
      }
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.initMap()
    },
    popBcss: {
      handler (newName, oldName) {
        this.showPopBcss = this.popBcss
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.initMap()
    })
    this.$store.commit('setMapLocation', true)
    this.changeTabe(0)
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
    this.$store.commit('setMapLocation', false)
    this.map.clear()
    this.panel.getVediocall2().closePanel()
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.jtzx {
  background: url("../../../static/assets/img/jtzx/background.png") no-repeat
    center center;
  background-size: 100% 100%;
  .left-wrap {
    width: 450 * @px;
    position: absolute;
    top: 108 * @px;
    left: 35 * @px;
    .bctj {
      margin-top: 45 * @px;
    }
  }
  .mapWrap {
    position: absolute;
    top: 108 * @px;
    left: 580 * @px !important;
    width: calc(100% - 635 * @px);
    height: 900 * @px;
    background: url("../../../static/assets/img/jtzx/border.png") center center
      no-repeat;
    background-size: 100% 100%;
    z-index: 999;
    .map-jtzx-icon {
      width: 90 * @px;
      height: 109 * @px;
      position: absolute;
      top: 33 * @px;
      left: 45 * @px;
      background: url("../../../static/assets/img/jtzx/car.png") center center
        no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      z-index: 199;
    }
    .map-jtzx-tuli {
      width: 332 * @px;
      height: 134 * @px;
      position: absolute;
      bottom: 52 * @px;
      left: 55 * @px;
      background: url("../../../static/assets/img/jtzx/tuli.png") center center
        no-repeat;
      background-size: 100% 100%;
      z-index: 199;
    }
    .popbcss {
      position: absolute;
      top: 20 * @px;
      right: 20 * @px !important;
      z-index: 999;
      .icon-diaodu {
        width: 90 * @px;
        height: 109 * @px;
        position: absolute;
        top: 24 * @px;
        left: 35 * @px;
        background: url("../../../static/assets/img/jtzx/diaodu.png") center
          center no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .mapBox {
    position: absolute;
    left: 19px;
    top: 17px;
    width: 97%;
    height: 96%;
  }
  .diaodu {
    position: absolute;
    top: 30 * @px;
    left: -20px;
    bottom: -20 * @px;
    right: -20 * @px;
    z-index: 199;
    .imgOne {
      width: 94%;
      height: 97%;
      position: absolute;
      top: -15 * @px;
      left: 38 * @px;
    }
    .imgTwo {
      position: absolute;
      bottom: 50 * @px;
      left: 52 * @px;
    }
    .tabBox {
      width: 94%;
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: absolute;
      top: -10 * @px;
      left: 36 * @px;
      z-index: 200;
      li {
        cursor: pointer;
        width: 143 * @px;
        height: 46px;
        line-height: 46px;
        padding-left: 46 * @px;
        color: #c7e3ff;
        font-size: 14 * @px;
        margin-left: 4 * @px;
        &:nth-child(1) {
          background: url("../../../static/assets/img/jtzx/yddd.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(2) {
          background: url("../../../static/assets/img/jtzx/ydlk.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(3) {
          background: url("../../../static/assets/img/jtzx/ydss.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(4) {
          background: url("../../../static/assets/img/jtzx/kbmsl_02.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(5) {
          background: url("../../../static/assets/img/jtzx/kbmsh_02.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(6) {
          background: url("../../../static/assets/img/jtzx/dbt_02.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(7) {
          background: url("../../../static/assets/img/jtzx/gbzy_02.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(8) {
          background: url("../../../static/assets/img/jtzx/cglx_02.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(9) {
          background: url("../../../static/assets/img/jtzx/dpclx_02.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
      }
      .active {
        background: url("../../../static/assets/img/jtzx/yddd_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active1 {
        background: url("../../../static/assets/img/jtzx/ydlk_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active2 {
        background: url("../../../static/assets/img/jtzx/ydss_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active3 {
        background: url("../../../static/assets/img/jtzx/kbmsl_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active4 {
        background: url("../../../static/assets/img/jtzx/kbmsh_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active5 {
        background: url("../../../static/assets/img/jtzx/dbt_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active6 {
        background: url("../../../static/assets/img/jtzx/gbzy_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active7 {
        background: url("../../../static/assets/img/jtzx/cglx_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
      .active8 {
        background: url("../../../static/assets/img/jtzx/dpclx_xz.png") center
          center no-repeat !important;
        background-size: 100% 100% !important;
        color: #f7b43e;
        font-size: 14 * @px;
        font-weight: bold;
      }
    }
    .icon-diaodu {
      width: 90 * @px;
      height: 109 * @px;
      position: absolute;
      top: 48 * @px;
      left: 52 * @px;
      background: url("../../../static/assets/img/jtzx/diaodu.png") center
        center no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
</style>
