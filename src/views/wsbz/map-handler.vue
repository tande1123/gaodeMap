<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 卫生保障地图操作类 -->
<template>
  <div></div>
</template>

<script>
import AMap from 'AMap'
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['map', 'symbol', 'panel'])
  },
  data () {
    return {
      radius: 0,
      radius2: 0,
      centerPt: [],
      bufferCircle: null,
      bufferCircle2: null,
      resultTemplate: null,
      loadedData: []
    }
  },
  props: [],
  methods: {
    createBufferCircle (center = ['114.403322', '30.920255'], radius = 1000, radius2 = 2000) {
      this.clear()
      const centerPt = new AMap.LngLat(center[0], center[1])
      this.centerPt = centerPt
      this.radius = radius
      this.radius2 = radius2
      const bufferCircle = this.symbol.ploygonSymbols.bufferCircle
      this.bufferCircle = new AMap.Circle({
        center: centerPt, // 圆心位置
        radius: radius, // 半径
        strokeColor: bufferCircle.strokeColor, // 线颜色
        strokeOpacity: bufferCircle.strokeOpacity, // 线透明度
        strokeWeight: bufferCircle.strokeWeight, // 线粗细度
        fillColor: bufferCircle.fillColor, // 填充颜色
        fillOpacity: bufferCircle.fillOpacity // 填充透明度
      })
      const bufferCircle2 = this.symbol.ploygonSymbols.bufferCircle2
      this.bufferCircle2 = new AMap.Circle({
        center: centerPt, // 圆心位置
        radius: radius2, // 半径
        strokeColor: bufferCircle2.strokeColor, // 线颜色
        strokeOpacity: bufferCircle2.strokeOpacity, // 线透明度
        strokeWeight: bufferCircle2.strokeWeight, // 线粗细度
        fillColor: bufferCircle2.fillColor, // 填充颜色
        fillOpacity: bufferCircle2.fillOpacity // 填充透明度
      })
      this.map.getInstance().add([this.bufferCircle2, this.bufferCircle])
    },
    clear () {
      if (this.map) {
        this.bufferCircle && this.map.getInstance().remove(this.bufferCircle)
        this.bufferCircle2 && this.map.getInstance().remove(this.bufferCircle2)
        this.centerPt = []
        this.radius = 0
        this.radius2 = 0
      }
    },
    loadData (type) {
      console.log('type: ', type)
      if (this.loadedData.length > 0) {
        console.log(this.loadedData)
        this.filterData(type)
      } else {
        this.$store.dispatch('getEnsurePlan').then(data => {
          console.log(data)
          this.loadedData = this.loadedData.concat(data)
          this.filterData(type)
        })
        this.$store.dispatch('getEnsurePlanHospital').then(data => {
          console.log(data)
          data.forEach(element => {
            element.ADDRESSTYPE = 'G07'
          })
          this.loadedData = this.loadedData.concat(data)
          this.filterData(type)
        })
      }
    },
    filterData (type) {
      if (!type) {
        this.addToMap()
      } else {
        let _data = this.loadedData.filter(e => e.ADDRESSTYPE === type)
        this.addToMap(_data)
      }
    },
    addToMap (data) {
      data = data || this.loadedData
      if (data instanceof Array) {
        this.clearToMap()
        this.map.addPoints(data, {
          x: 'LONGITUDE',
          y: 'LATITUDE',
          symbol: (item) => {
            if (!this.symbol.pictureMarkerSymbols[item.ADDRESSTYPE]) {
              console.log(item.ADDRESSTYPE)
            }
            return this.symbol.pictureMarkerSymbols[item.ADDRESSTYPE]
          },
          click: (e) => {
            this.processClick(e)
          }
        })
      }
    },
    processClick (e) {
      const obj = e.target.getExtData() || {}
      const offset = e.target.getOffset() || {}
      if (obj.ADDRESSTYPE === 'G01' || obj.ADDRESSTYPE === 'G02') {
        this.$store.dispatch('getEnsurePlanGroup', obj.ID).then(f => {
          obj.ensurePlanGroup = f
          this.$store.dispatch('getEnsurePlanAmbulance', obj.ID).then(g => {
            obj.ensurePlanAmbulance = g
            this.showPopWin(obj, offset)
          })
        })
      } else if (obj.ADDRESSTYPE === 'G03') {
        this.panel.getDaibiaotuan().openPanel(obj)
      } else {
        this.showPopWin(obj, offset)
      }
    },
    showPopWin (obj, offset) {
      console.log('showPopWin: ', obj.NAME)
      this.map.showInfoWindow({
        x: obj.LONGITUDE,
        y: obj.LATITUDE,
        dx: -offset.x * 0.2,
        dy: offset.y,
        title: obj.NAME,
        data: {
          displayData: obj,
          ...obj,
          tableIndex: 0
        },
        methods: {
          tipclickcommand: this.processPopClick
        },
        content: this.resultTemplate
      })
    },
    processPopClick ({ id, point }) {
      switch (id) {
        case 'YILIAOZU':
          this.panel.getYiliaozu().openPanel(point)
          break
        case 'JIUHUCHE':
          this.panel.getJiuhuche().openPanel(point)
          break
        case 'ROUTE':
          this.panel.getLuxian().openPanel(point)
          break
        case 'OTHERS':
          // this.panel.getShipin().openPanel(point)
          this.createBufferCircle([point.LONGITUDE, point.LATITUDE])
          break
        case 'VEDIOCALL':
          this.panel.getVediocall2().openPanel(point)
          break
      }
      console.log('{id, point}: ', { id, point })
    },
    clearToMap () {
      this.map.clear('marker')
      this.clear()
      this.map.hideInfoWindow()
    }
  },
  watch: {},
  mounted () {
    this.$nextTick(_ => {
      this.$store.dispatch('getTemplate', 'wsbz').then((res) => {
        this.resultTemplate = res
      })
    })
  },
  beforeDestroy () { }
}

</script>
<style scoped>
</style>
