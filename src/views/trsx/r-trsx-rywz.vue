<!--
 * @Description: 铁人三项 - 人员、车辆位置展示
 * @version: 0.1.0
 * @Author:
 * @Date: 2019-06-20 18:09:01
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:30
 -->
<template>
  <div>
    <map-main></map-main>
    <div class="leftlengend">
      <img src="../../../static/assets/img/trsx/legend_trsx.png" alt="">
    </div>
    <!-- 底部btn -->
    <div class="footer">
      <footerNav></footerNav>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import footerNav from './footer.vue'
import mapMain from '@/gis/map/map-main'
let self
export default {
  components: {
    mapMain,
    footerNav
  },
  data () {
    return {
      youyong_linedata: [{ x: 114.461933, y: 30.239451 }, { x: 114.461482, y: 30.238288 }],
      malasong_linedata: [{ x: 114.461482, y: 30.238288 }, { x: 114.458811, y: 30.239571 }, { x: 114.456944, y: 30.241333 }],
      zixingche_linedata: [{ x: 114.456944, y: 30.241333 }, { x: 114.45806, y: 30.242389 }, { x: 114.459462, y: 30.242718 }],
      start_end: [{ x: 114.461933, y: 30.239451, typecode: 'dxyy_start' }, { x: 114.459462, y: 30.242718, typecode: 'dxyy_end' }]
    }
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig', 'panel'])
  },
  methods: {
    ...mapActions(['getTemplate']),
    init () {
      if (this.mapLoaded) {
        this.initMap()
      }
    },
    initMap () {
      if (!this.mapLoaded) return
      this.map.getInstance().setZoomAndCenter(16, [114.458596, 30.241175])
      this.map.getInstance().setMapStyle('')
      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer') {
            lyrs[l].show()
          }
        }
      }
      this.initdata(this.youyong_linedata, 'youyong_line')
      this.initdata(this.zixingche_linedata, 'zixingche_line')
      this.initdata(this.malasong_linedata, 'malasong_line')
      this.addBusPointToMap(this.start_end)
    },
    initdata (linedata, linestyle) {
      let lineSE = ''
      for (let i = 0; i < linedata.length; i++) {
        if (i !== linedata.length - 1) {
          lineSE += linedata[i].x + ',' + linedata[i].y + ';'
        } else {
          lineSE += linedata[i].x + ',' + linedata[i].y
        }
      }
      this.map.addlines(lineSE, {
        symbol: [this.symbol.lineSymbols[linestyle]]
      })
    },
    addBusPointToMap (data) {
      this.map.addPoints(data, {
        x: 'x',
        y: 'y',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols[item.typecode]
        }
      })
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.init()
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.init()
    })
    this.getTemplate('dxyy_csry').then((res) => {
      self.resultTemplate = res
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
@import "../../assets/less/set.less";
.leftlengend {
  background-color: rgba(255, 255, 255, 0.7);
  width: 435 * @px;
  height: 283 * @px;
  position: absolute;
  z-index: 999;
  top: 20 * @px;
  left: 20 * @px;
  border-radius: 6 * @px;
  -webkit-box-shadow: 0 0rem 0.234375rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 0rem 0.234375rem rgba(0, 0, 0, 0.2);
  img {
    width: 435 * @px;
    height: 273 * @px;
    margin-top: 10 * @px;
    margin-left: 10 * @px;
  }
}
.footer {
  width: 896 * @px;
  position: absolute;
  bottom: 79 * @px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
