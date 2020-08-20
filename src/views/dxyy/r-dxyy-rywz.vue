<!--
 * @Description: 定向越野 - 人员、车辆位置展示
 * @version: 0.1.0
 * @Author:
 * @Date: 2019-06-20 18:09:01
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:09:24
 -->
<template>
  <div>
    <map-main></map-main>
    <div class="leftlengend">
      <img src="../../../static/assets/img/dxyy/legend_dxyy.png" alt="">
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mapMain from '@/gis/map/map-main'
let self
export default {
  components: { mapMain },
  data () {
    return {
      linedata: [{ x: 114.320985, y: 30.333419 }, { x: 114.324568, y: 30.330196 }, { x: 114.329182, y: 30.328919 }, { x: 114.338194, y: 30.326418 }, { x: 114.34167, y: 30.324973 }, { x: 114.334718, y: 30.322529 }, { x: 114.328238, y: 30.325455 }],
      people: [
        {
          id: 1,
          x: 114.329182,
          y: 30.328919,
          typecode: 'csry_people',
          name: '吴维',
          age: '29',
          guoji: '中国'
        },
        {
          id: 2,
          x: 114.34167,
          y: 30.324973,
          typecode: 'csry_people',
          name: '李松',
          age: '26',
          guoji: '中国'
        }
      ],
      start_end: [{ x: 114.320985, y: 30.333419, typecode: 'dxyy_start' }, { x: 114.328238, y: 30.325455, typecode: 'dxyy_end' }]
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
      this.map.getInstance().setZoomAndCenter(16, [114.326843, 30.328687])
      this.map.getInstance().setMapStyle('')

      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer') {
            lyrs[l].show()
          }
        }
      }
      this.initdata()
    },
    initdata () {
      let lineSE = ''
      for (let i = 0; i < this.linedata.length; i++) {
        if (i !== this.linedata.length - 1) {
          lineSE += this.linedata[i].x + ',' + this.linedata[i].y + ';'
        } else {
          lineSE += this.linedata[i].x + ',' + this.linedata[i].y
        }
      }
      this.map.addlines(lineSE, {
        symbol: [this.symbol.lineSymbols['linedxyy']]
      })
      this.addBusPointToMap(this.people)
      this.addBusPointToMap(this.start_end)
    },
    addBusPointToMap (data) {
      this.map.addPoints(data, {
        x: 'x',
        y: 'y',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols[item.typecode]
        },
        click: (e) => {
          this.processClick(e)
        }
      })
    },
    processClick (e) {
      const item = e.target.getExtData() || {}
      if (item.typecode !== 'csry_people') {
        return
      }
      const offset = e.target.getOffset() || {}
      this.map.showInfoWindow({
        x: item.x,
        y: item.y,
        dx: -offset.x + 10,
        dy: offset.y - 10,
        title: item.name,
        data: item,
        content: this.resultTemplate
      })
      var markers = this.map.getInstance().getAllOverlays('marker')
      for (let i = 0; i < markers.length; i++) {
        var markersData = markers[i].C.extData
        if (markersData.typecode !== 'csry_people') {
          return
        } else if (markersData.id !== item.id) {
          markers[i].setIcon('./static/assets/img/dxyy/dxyy_people.png')
        } else {
          markers[i].setIcon('./static/assets/img/dxyy/dxyy_people_active.png')
        }
      }
    },
    getContent (content) {
      const str = `
        <div class="aqi-infw-msgBox-content">
        <div style="height:40px;line-height:40px;text-indent:20px;font-size:22px;background:#19B8FB;color:#fff">详情</div>
          <div><span class="aqi-infw-tiplist">企业名称</span>：${content.COMPANYNAME}</div>
        </div>`
      return str
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
  width: 300 * @px;
  height: 150 * @px;
  position: absolute;
  z-index: 999;
  top: 20 * @px;
  left: 20 * @px;
  border-radius: 6 * @px;
  -webkit-box-shadow: 0 0rem 0.234375rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 0rem 0.234375rem rgba(0, 0, 0, 0.2);
  img {
    width: 300 * @px;
    height: 140 * @px;
    margin-top: 10 * @px;
    margin-left: 10 * @px;
  }
}
</style>
