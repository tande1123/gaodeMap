<!--basic info service  -->
<template>
  <div></div>
</template>
<script>
import common from '@/utils/common.es'
// import maptalks from '#/assets/maptalks/maptalks-ext.es'
import { mapGetters } from 'vuex'
import wgs2gcj from '@/utils/Transform_Coordinate'
export default {
  props: [],
  computed: {
    ...mapGetters(['map', 'symbol', 'configLoaded'])
  },
  watch: {
    configLoaded () {
      this.initLoad()
    }
  },
  methods: {
    initLoad () {
      init(this.map, this.symbol)
    },
    loadPath () {
      let para = {
        parameter: {
          DoAction: 'querytriathpoint'
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', para).then(res => {
        console.log('铁人三项定向越野途经点集合------------------------')
        console.log(res)
        let path = common.convertTable2objects(res.data.QuerySafetyResult)
        path.forEach(element => {
          element.symbol = getSymbolByType(element.TYPE)
          let temPoint = wgs2gcj.WGS84_GCJ(element.LATITUDE, element.LONGITUDE)
          // element.LONGITUDE = temPoint.lat.toString() * 1 - 0.0035
          // element.LATITUDE = temPoint.lon.toString() * 1 - 0.0008
          element.LONGITUDE = temPoint.lon.toString() * 1
          element.LATITUDE = temPoint.lat.toString() * 1
        })
        console.log(path)
        let triathData = classfyPoint(path)
        triathData['1'].sort(sortData)
        triathData['2'].sort(sortData)
        triathData['3'].sort(sortData)
        console.log(triathData)

        triathData['1'].push(triathData['2'][0])
        triathData['2'].push(triathData['3'][0])
        let multiLinePath = ''
        triathData['1'].forEach(element => {
          multiLinePath += element.LONGITUDE + ',' + element.LATITUDE + ';'
        })
        multiLinePath = multiLinePath + ';'
        triathData['2'].forEach(element => {
          multiLinePath += element.LONGITUDE + ',' + element.LATITUDE + ';'
        })
        multiLinePath = multiLinePath + ';'
        triathData['3'].forEach(element => {
          multiLinePath += element.LONGITUDE + ',' + element.LATITUDE + ';'
        })
        // multiLinePath.slice(0, -1)
        this.map.addlines(multiLinePath.slice(0, -1), {
          fitView: true,
          symbol: [this.symbol.lineSymbols['swim_line'], this.symbol.lineSymbols['bike_line'], this.symbol.lineSymbols['running_line']]
        })
        path = [...triathData['1'], ...triathData['2'], ...triathData['3'], ...triathData['0'], ...triathData['4']]
        console.log(path)
        this.map.addPoints(path, {
          x: 'LONGITUDE',
          y: 'LATITUDE',
          symbol: (element) => {
            return element.symbol
          }
        })
      })
    }
  },
  data () {
    return {}
  },
  mounted () {
    window.closeWindowPop = function () {
      _map.hideInfoWindow()
    }
    if (this.configLoaded) {
      this.initLoad()
    }
  },
  beforeDestroy () {
    window.closeWindowPop = null
    clearlyr()
  }
}
let _map = null
let _symbols = null
// 清除图层数据及地图监听事件
// function clear () {
//   if (!_map) return
//   clearlyr()
//   _map.removeMapLinstener('route_layer')
// }
// 清除图层数据
function clearlyr () {
  if (!_map) return
  _map.clear()
  // _map.clearLayerById('route_layer')
  _map.hideInfoWindow()
}
// 初始化地图参数
// 设置地图点击事件监听
function init (myMap, symbols) {
  _map = myMap
  _symbols = symbols
  // common.assert(_map, 'basic-info-handler init error,map is null')
  // common.assert(_symbols, 'basic-info-handler init error,symbols is null')
  clearlyr()
  // _map.setMapLinstener({
  //   id: 'route_layer',
  //   layerIds: ['route_layer'],
  //   run: function (e) {
  //   }
  // })
}
// 根据type对数据点分类
function classfyPoint (array) {
  let result = {}
  array.forEach(element => {
    let type = element.TYPE.trim()
    if (!result[type]) {
      result[type] = []
    }
    result[type].push(element)
  })
  return result
}
// 根据sort对数据点排序
function sortData (a, b) {
  if (parseInt(a['SORT']) < parseInt(b['SORT'])) {
    return -1
  }
  if (parseInt(a['SORT']) > parseInt(b['SORT'])) {
    return 1
  }
  if (parseInt(a['SORT']) === parseInt(b['SORT'])) {
    return 0
  }
}
// 根据type获取元素symbol
function getSymbolByType (type) {
  switch (type) {
    case '0':
      return _symbols.pictureMarkerSymbols['triathStart']
    case '1':
      return _symbols.pictureMarkerSymbols['triathSwim']
    case '2':
      return _symbols.pictureMarkerSymbols['triathBike']
    case '3':
      return _symbols.pictureMarkerSymbols['triathRunning']
    case '4':
      return _symbols.pictureMarkerSymbols['triathEnd']
  }
}

</script>
<style lang="less">
@import "../../assets/less/set.less";

</style>
