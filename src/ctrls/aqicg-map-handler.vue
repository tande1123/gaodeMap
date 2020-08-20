<!--
 * @Description: 场馆空气质量
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-10 09:36:02
 * @LastEditors: wsw
 * @LastEditTime: 2019-06-13 18:27:20
 -->
<template>
  <div>
  </div>
</template>

<script>
import AMap from 'AMap'
import { mapGetters, mapActions } from 'vuex'
import mapBuffer from '@/gis/map/map-buffer'
export default {
  components: {
    mapBuffer
  },
  computed: {
    ...mapGetters(['map', 'symbol'])
  },
  methods: {
    ...mapActions(['bufferSearch', 'getTableInfo']),
    selectorHandler (data, type) {
      let x = data.X
      let y = data.Y
      if (isNaN(x) || isNaN(y) || x === 0 || y === 0) return
      this.clear()
      let symbol = null
      let s = this.getSymbolByName(data.QUALITY)
      symbol = this.symbol.pictureMarkerSymbols[s]
      if (!symbol) return
      let marker = new AMap.Marker({
        position: new AMap.LngLat(x, y),
        icon: symbol.markerFile,
        offset: new AMap.Pixel(0, 0),
        angle: symbol.markerRotation || 0,
        clickable: true,
        cursor: 'pointer',
        extData: data
      })
      this.map.addPoints([data], {
        x: 'X',
        y: 'Y',
        symbol: (item) => {
          let typecode = this.getSymbolByName(item.QUALITY)
          return this.symbol.pictureMarkerSymbols[typecode]
        },
        click: (e) => {
          this.processClick(e)
        }
      })
      this.processClick({ target: marker })
    },
    processClick (e) {
      const item = e.target.getExtData() || {}
      const offset = e.target.getOffset() || {}
      this.map.showInfoWindow({
        x: item.X,
        y: item.Y,
        dx: -offset.x,
        dy: offset.y * 2,
        title: item.POSITION_NAME,
        content: this.getContent(item)
      })
    },
    getContent (content) {
      const str = `
        <div class="aqi-infw-msgBox-content">
        <div style="height:40px;line-height:40px;text-indent:20px;font-size:22px;background:#19B8FB;color:#fff">详情</div>
          <div><span class="aqi-infw-tiplist">空气质量</span>：${content.QUALITY}</div>
          <div><span class="aqi-infw-tiplist">AQI</span>：${content.AQI}</div>
        </div>`
      return str
    },
    getSymbolByName (name) {
      if (name.indexOf('良') >= 0) {
        return 'Liang'
      }
      if (name.indexOf('轻') >= 0) {
        return 'QingDuWuRan'
      }
      if (name.indexOf('严') >= 0) {
        return 'YanZhongWuRan'
      }
      if (name.indexOf('优') >= 0) {
        return 'You'
      }
      if (name.indexOf('中') >= 0) {
        return 'ZhongDuWuRan'
      }
      if (name.indexOf('重') >= 0) {
        return 'ZhongDuWuRan4'
      }
      return 'AqiDefault'
    },
    /**
     * @name: 地图清理
     * @param : undefined
     * @return : undefined
     */
    clear () {
      this.map && this.map.clear()
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style >
.aqi-infw-msgBox-content {
  width: 300px;
  height: 180px;
  background: #fff;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  bottom: 0;
  border-radius: 5px;
  font-size: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px 1px #ccc;
}
.aqi-infw-tiplist {
  font-size: 20px !important;
  width: 100px;
  display: inline-block;
  text-align: right;
  text-align: justify;
  text-align-last: justify;
  text-justify: inter-ideograph;
}
</style>
