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
      <img src="../../../static/assets/img/trsx/图例.png" alt="">
    </div>
   <map-handler ref="mapH"></map-handler>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
import mapHandler from './trsx-map-handler'
let self
export default {
  components: {
    mapMain,
    mapHandler
    // footerNav
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig', 'panel'])
  },
  methods: {
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

      this.$refs.mapH && this.$refs.mapH.loadPath()
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
  },
  beforeDestroy () {}
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.leftlengend {
  // background-color: rgba(255, 255, 255, 0.7);
  width: 435 * @px;
  height: 283 * @px;
  position: absolute;
  z-index: 999;
  top: 20 * @px;
  left: 20 * @px;
  border-radius: 6 * @px;
  // -webkit-box-shadow: 0 0rem 0.234375rem rgba(0, 0, 0, 0.2);
  // box-shadow: 0 0rem 0.234375rem rgba(0, 0, 0, 0.2);
  img {
    // width: 435 * @px;
    // height: 273 * @px;
    width: 312* @px;
    height: 239 * @px;
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
