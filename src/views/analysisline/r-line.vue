<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:08:58
 -->
<!--

-->
<template>
  <div>
    <map-main></map-main>
    <div class="inputBox">
    <div>
      <input type="text" v-model="origin" placeholder="请输入起点">
      <span @click="setStart('start')">设置起点</span>
    </div>
    <div>
      <input type="text" v-model="destination" placeholder="请输入终点">
      <span @click="setEnd('end')">设置终点</span>
    </div>
    <div>
      <textarea rows="8" cols="36" style="margin-right: 20px" v-model="waypoints" placeholder="请输入途经点" />
      <span style="width: 90px" @click="addWarPoint('waypoint')">添加途经点</span>
    </div>
    <div>
      <span @click="analysisLine()">分析</span>
      <span @click="CleanAnalysisLine()">清除</span>
    </div>
  </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
let self
export default {
  components: {
    mapMain
  },
  data () {
    return {
      apiUrl: 'https://restapi.amap.com/v3/direction/driving',
      origin: '114.28646021,30.42851118', // 军运村
      destination: '114.32926477,30.54824329', // 洪山体育馆
      waypoints: '',
      key: '8d5ecf35d3bbd40399cc728b41032dcf',
      strategy: '10',
      output: 'JSON',
      mapClickState: '',
      startMarker: null,
      endMarker: null,
      wayPointsMarker: null
    }
  },
  computed: {
    ...mapGetters([
      'configLoaded',
      'mapLoaded',
      'map',
      'symbol',
      'mapConfig',
      'panel'
    ])
  },
  watch: {},
  methods: {
    init () {
      if (this.mapLoaded) {
        this.initMap()
      }
    },
    initMap () {
      // 先设置地图样式
      this.map.getInstance().setZoomAndCenter(11, [114.29, 30.43])
      this.map.getInstance().setMapStyle('') // 靛青蓝

      // 再设置图层显示状态
      var lyrs = this.map.getInstance().getLayers()
      // lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet'  //路网
      // lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic'  //路况
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (
            lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
            lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet'
          ) {
            lyrs[l].show()
          }
        }
      }

      // 绑定地图获取坐标操作
      this.map.getInstance().on('click', e => {
        console.log(e)
        console.log(this.mapClickState)
        switch (this.mapClickState) {
          case 'start':
            if (this.startMarker != null) {
              this.map.getInstance().remove(this.startMarker)
            }
            this.AddMarkerToMap(e, this.mapClickState)
            this.mapClickState = ''
            this.origin = e.lnglat.lng + ',' + e.lnglat.lat
            break
          case 'end':
            if (this.endMarker != null) {
              this.map.getInstance().remove(this.endMarker)
            }
            this.AddMarkerToMap(e, this.mapClickState)
            this.mapClickState = ''
            this.destination = e.lnglat.lng + ',' + e.lnglat.lat
            break
          case 'waypoint':
            this.AddMarkerToMap(e, this.mapClickState)
            this.mapClickState = ''
            this.waypoints += e.lnglat.lng + ',' + e.lnglat.lat + ';'
            break
          default:
            break
        }
      })

      //   this.analysisLine()
    },
    setStart (item) {
      this.mapClickState = item
    },
    setEnd (item) {
      this.mapClickState = item
    },
    addWarPoint (item) {
      this.mapClickState = item
    },
    analysisLine () {
      this.map.addPoints({})
      // https://restapi.amap.com/v3/direction/walking?origin=116.434307,39.90909&destination=116.434446,39.90816&key=<用户的key>
      var url =
        this.apiUrl +
        '?origin=' +
        this.origin +
        '&destination=' +
        this.destination +
        '&waypoints=' +
        this.waypoints +
        '&strategy=' +
        this.strategy +
        '&output=JSON&key=' +
        this.key
      this.axios({
        method: 'get',
        url: url
      }).then(res => {
        console.log(res)
        var paths = res.data.route.paths
        paths.forEach(path => {
          var polylines = ''
          var steps = path.steps
          steps.forEach(step => {
            var polyline = step.polyline
            polylines += polyline + ','
          })
          console.log(polylines)
          this.map.addlines(polylines, {
            symbol: [this.symbol.lineSymbols['lineBusB']]
          })
        })
      })
    },

    CleanAnalysisLine () {
      this.map.getInstance().clearMap()
      this.waypoints = ''
    },
    AddMarkerToMap (e, type) {
      var icons = ''
      const marker = new AMap.Marker({
        icon: icons,
        position: [e.lnglat.lng, e.lnglat.lat]
      })
      switch (type) {
        case 'start':
          icons = 'https://webapi.amap.com/theme/v1.3/markers/n/start.png'
          this.startMarker = marker
          break
        case 'end':
          icons = 'https://webapi.amap.com/theme/v1.3/markers/n/end.png'
          this.endMarker = marker
          break
        case 'waypoint':
          icons = 'https://webapi.amap.com/theme/v1.3/markers/n/mid.png'
          this.wayPointsMarker = marker
          break
        default:
          break
      }
      marker.setIcon(icons)
      this.map.getInstance().add(marker)
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.configLoaded && self.init()
    })
  },
  beforeDestroy () {
    // 退出时隐藏底图
    var lyrs = this.map.getInstance().getLayers()
    if (lyrs) {
      for (var l = 0; l < lyrs.length; l++) {
        if (
          lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
          lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
          lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet'
        ) {
          lyrs[l].hide()
        }
      }
    }
    this.map.clear()
  }
}
</script>
<style lang='less' scoped>
@import "../../assets/less/set.less";
.inputBox {
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 414px;
  background: #3d93fd;
  height: 320px;
  padding-left: 24px;
  margin: 14px;
}
.inputBox > div {
  margin-top: 20px;
  &:nth-child(3) {
    display: flex;
  }
  &:last-child {
    float: right;
  }
}
.inputBox > div > span {
  display: inline-block;
  width: 62px;
  color: white;
  cursor: pointer;
}
.inputBox > div > input {
  width: 70%;
  height: 30px;
  margin-right: 20px;
}
</style>
