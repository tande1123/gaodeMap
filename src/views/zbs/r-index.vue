<!--
 * @Description: 总值班室，交通管理
 * @version: 0.1.0
 * @Author:
 * @Date: 2019-06-03 18:09:01
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:18:11
 -->
<template>
  <div>
    <map-main></map-main>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import common from '@/utils/common.es'
import mapMain from '@/gis/map/map-main'
let self
export default {
  components: { mapMain },
  data () {
    return {
    }
  },
  /**
   * @name: 监听配置文件加载
   */
  watch: {
    mapLoaded () {
      this.mapLoaded && this.init()
    }
  },
  /**
   * @name: 从store中取数据
   */
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig', 'panel']),
    ...mapState(['popBcss'])
  },
  methods: {
    ...mapActions(['getTemplate']),
    /**
   * @name: 地图初始化
   */
    init () {
      if (this.mapLoaded) {
        this.initMap()
      }
    },
    initMap () {
      if (!this.mapLoaded) return
      // 先设置地图样式
      this.map.getInstance().setZoomAndCenter(11, [114.29, 30.43])
      this.map.getInstance().setMapStyle('amap://styles/blue')// 靛青蓝
      // 再设置图层显示状态
      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer') {
            lyrs[l].show()
          }
        }
      }
      // 测试数据加载
      // this.addLineToLayer('FCC3BE9667D14505B16D0E88A2E16107')
      // let data = {
      //   type: 'zbs_addBusLine',
      //   data: {
      //     id: 'FCC3BE9667D14505B16D0E88A2E16107'
      //   }
      // }
      // window.postMessage(JSON.stringify(data),*)
      window.addEventListener('message', function (e) {
        try {
          var msgObj = JSON.parse(e.data)
          console.log('msgObj', msgObj)
          switch (msgObj.type) {
            case 'zbs_addBusLine':
              self.addLineToLayer(msgObj.data.id)
              break
          }
        } catch (ex) {
          console.log(ex)
        }
      })
    },
    addLineToLayer (ID) {
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': 'querygisvbusmanagerinfo',
            'Conditions': [
              [
                {
                  Column: 'ID',
                  ColumnDataType: 'NVARCHAR2',
                  Mode: 'IS',
                  Value: ID
                }
              ]
            ]
          },
          'token': 'string'
        }
      }).then(res => {
        let bcssData = common.convertTable2objects(res.data.QuerySafetyResult)
        this.roadTask(bcssData[0])
      })
    },
    // 行路径分析
    roadTask (item) {
      // 清除路径
      this.map.clear('polyline')
      // 清除起点和终点
      this.map.clear('labelLayer')
      this.map.RoadNetWork(item.START_STATION, item.END_STATION, function (LineArr) {
        if (LineArr.length === 0) {
          return
        }
        // 起点和终点
        self.addStartAndEndPoint(item, LineArr)
        let str = ''
        LineArr.forEach(e => {
          str += e
        })
        str += ';'
        self.map.addlines(str, {
          symbol: [self.symbol.lineSymbols['lineBusB'], self.symbol.lineSymbols['lineBusB']]
        })
      })
    },
    // 添加起点和终点（item是点击的列表项，LineArr是此条线路）
    addStartAndEndPoint (item, LineArr) {
      let Point = [
        {
          name: item.START_STATION,
          X: parseFloat(LineArr[0].split(',')[0]),
          Y: parseFloat(LineArr[0].split(',')[1]),
          layername: 'labelLayer',
          typecode: 'start'

        }, {
          name: item.END_STATION,
          X: parseFloat(LineArr[LineArr.length - 1].split(',')[0]),
          Y: parseFloat(LineArr[LineArr.length - 1].split(',')[1]),
          layername: 'labelLayer',
          typecode: 'end'
        }
      ]
      self.map.addPoints(Point, {
        x: 'X',
        y: 'Y',
        symbol: (element) => {
          return self.symbol.pictureMarkerSymbols[element['typecode']]
        },
        label: (element) => {
          if (element.typecode === 'start') {
            return {
              dx: -(element['name']).length * 5,
              dy: -22,
              content: element['name'],
              fontcolor: '#26ce73'
            }
          } else if (element.typecode === 'end') {
            return {
              dx: -(element['name']).length,
              dy: -22,
              content: element['name'],
              fontcolor: '#dc6626'
            }
          }
        }
      })
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.init()
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
    this.panel.getPopVideo().closePanel()
    this.map.clear()
  }
}
</script>
<style lang="less" scoped>

</style>
