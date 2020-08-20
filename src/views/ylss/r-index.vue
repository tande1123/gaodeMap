<!--
 * @Description: 地图核心组件
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-04 13:38:01
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-10-16 11:33:08
 -->
<template>
  <div>
    <map-main></map-main>
    <popylss :MarkerData="TaskItem" v-if='show' v-on:close='changShow'></popylss>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/utils/common.es'
import mapMain from '@/gis/map/map-main'
import popylss from './pop-ylss'
let self
export default {
  components: { mapMain, popylss },
  data () {
    return {
      yyData: [],
      ClickMarker: null,
      show: false,
      TaskItem: null, // 此条任务信息的数据
      lineStartXY: '114.288511,30.424881;', // 军运村医疗卫生服务中心
      allHospital: []
    }
  },
  watch: {
    allHospital () {

    }
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'panel'])
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
      // 生产环境测试
      // this.LoadAmbulanceByIsExcute('0', '1565761337129464')
      window.addEventListener('message', function (e) {
        try {
          var msgObj = JSON.parse(e.data)
          console.log(msgObj)
          switch (msgObj.type) {
            case 'showPop':
              if (msgObj.data.isExcute && msgObj.data.taskCode) {
                self.LoadAmbulanceByIsExcute(msgObj.data.isExcute, msgObj.data.taskCode)
              }
              break
          }
        } catch (ex) {
          console.log(ex)
        }
      })
    },
    initMap () {
      this.map.getInstance().setZoomAndCenter(12, [114.29, 30.43])
      this.map.getInstance().setMapStyle('amap://styles/blue')
      // 再设置图层显示状态
      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer') {
            lyrs[l].show()
          }
        }
      }
      this.addPointToLayer()
    },
    // 加载救护车信息(实时的或者是历史轨迹)
    LoadAmbulanceByIsExcute (isExcute, taskCode) {
      this.map.clear('polyline')
      this.map.clear('OtherHospital')
      // 执行中
      if (isExcute === '1') {
        this.getPatientData('querymvsrktaskrunt', taskCode)
      } else {
        this.getPatientData('querymvsrktaskhist', taskCode)
      }
    },
    // 获取此条医疗服务的信息根据task_code
    getPatientData (actionName, taskcode) {
      let Condition1 = [{
        Column: 'TASK_CODE', Mode: 'IS', Value: taskcode, ColumnDateType: ''
      }]
      this.RequestFun([Condition1], actionName, res => {
        console.log('获取此条医疗服务的信息根据task_code')
        self.TaskItem = res[0]
        console.log(self.TaskItem)
        self.showRoad(res[0].TRANSFER_HOSPITAL)
        if (!res || res.length === 0) {
          console.log('医疗服务的信息   null')
          self.show = true
          return
        }
        let resultMap = self.checkColumeISNull(res[0])
        if (resultMap.size === 0) {
          self.show = true
          return
        }
        // 再查询一下这个患者的修改表，缺的字段信息，从这张表里面获取
        this.RequestFun([Condition1], 'querymvsrktasktagelib', res2 => {
          if (!res2.length > 0) {
            self.showNowTaskOrHisTask(res[0])
            return
          }
          let objRes2 = res2[0]
          for (let kk in objRes2) {
            let MapKey = kk.substring(0, kk.length - 4) // 去掉CONDITION_TAG等字段的_TAG
            if (resultMap.has(MapKey)) {
              resultMap.set(MapKey, objRes2[kk])// 更新值
            }
          }
          let obj = Object.create(null)
          resultMap.forEach((value, kev) => {
            obj[kev] = value
          })
          self.TaskItem = Object.assign(self.TaskItem, obj)
        })
        self.show = true
      })
    },
    // 添加定点医院
    addPointToLayer () {
      this.RequestFun([], 'queryhos20action', res => {
        console.log('添加定点医院')
        console.log(res)
        self.yyData = res
        self.addtoMap(self.yyData)
      })
    },
    addtoMap (data) {
      self.map.addPoints(data, {
        x: 'X',
        y: 'Y',
        symbol: (item) => {
          if (item.NAME === '军运村医疗卫生服务中心') { return self.symbol.pictureMarkerSymbols['hospcenter'] } else { return self.symbol.pictureMarkerSymbols['hospital'] }
        },
        label: (item) => {
          let sys = item.NAME === '军运村医疗卫生服务中心' ? self.symbol.pictureMarkerSymbols['hospcenter'] || {} : self.symbol.pictureMarkerSymbols['hospital'] || {}
          if (item.NAME === '军运村医疗卫生服务中心') {
            return {
              dx: -(sys.markerDx) - 80,
              dy: -22,
              content: item.NAME,
              fontcolor: '#f7b43e'
            }
          } else {
            return {
              dx: -(sys.markerDx) - 50,
              dy: -22,
              content: '',
              fontcolor: '#00ddff'
            }
          }
        },
        hover: (e) => {
          const item = e.target.getExtData() || {}
          if (item.NAME !== '军运村医疗卫生服务中心') {
            self.markerHover(e.target)
          }
        },
        mouseout: (e) => {
          self.markerHoverOut()
        }
      })
    },
    // 显示连线
    showRoad (hospitalName) {
      var markers = this.map.getInstance().getAllOverlays('marker')
      let MapHospital = []
      let singleMarker = null
      for (let i = 0; i < markers.length; i++) {
        var markersData = markers[i].getExtData()
        if (markersData.NAME !== '军运村医疗卫生服务中心') {
          markers[i].setLabel({})
        }
        let xy = markers[i].getPosition()
        if (hospitalName === markersData.NAME) {
          singleMarker = markers[i]
        }
        markersData.XY = xy.lng + ',' + xy.lat
        MapHospital.push(markersData)
      }
      let item = MapHospital.find(ele => {
        if (ele.NAME === hospitalName) {
          return true
        }
      })
      if (typeof (item) === 'undefined') {
        self.queryOtherHospital(hospitalName)
      } else {
        this.map.getInstance().remove(singleMarker)
        this.addSinglePoint([item])
        let lineSE = this.lineStartXY + item.XY
        this.map.addlines(lineSE, {
          symbol: [this.symbol.lineSymbols['lineJhc']]
        })
      }
    },
    // 先查询实时表和历史表的任务信息，如果有字段为空，则去查临时表
    checkColumeISNull (dataObj) {
      let resultMap = new Map()
      for (let k in dataObj) {
        if (k === 'PATIENT_NAME' || k === 'NATIONALITY' || k === 'CONDITION' || k === 'TRANSFER_HOSPITAL' ||
        k === 'DRIVER' || k === 'CONTACT_TEL' || k === 'PLATE_NUM') {
          if (dataObj[k] === '' || dataObj[k] === null) {
            resultMap.set(k, dataObj[k])
          }
        }
      }
      return resultMap
    },
    // 查询其他医院，不在图上的
    queryOtherHospital (hospitalName) {
      this.RequestFun([], 'queryg20ensureplanhospital', res => {
        self.allHospital = res
        let itemHospital = this.allHospital.find(ele => {
          if (ele.NAME === hospitalName) {
            return true
          }
        })
        let Condition1 = [{
          Column: 'ID', Mode: 'IS', Value: itemHospital.ID, ColumnDateType: ''
        }]
        this.RequestFun([Condition1], 'queryg20ensureplanhospital', yyData => {
          if (yyData.length === 0) {
            return
          }
          let obj = Object.assign(yyData[0], {X: yyData[0].LONGITUDE, Y: yyData[0].LATITUDE})
          let lineSE = this.lineStartXY + yyData[0].LONGITUDE + ',' + yyData[0].LATITUDE
          this.map.addlines(lineSE, {
            symbol: [this.symbol.lineSymbols['lineJhc']]
          })
          obj.layername = 'OtherHospital'
          self.addSinglePoint([obj])
        })
      })
    },
    // 请求方法封装一下
    RequestFun (Condition, DoAction, callback) {
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': DoAction,
            'Conditions': Condition
          },
          'token': 'string'
        }
      }).then(res => {
        let resultData = common.convertTable2objects(res.data.QuerySafetyResult)
        if (callback) {
          callback(resultData)
        }
      })
    },
    changShow () {
      this.show = false
    },
    // 添加终点（单个的）
    addSinglePoint (data) {
      self.map.addPoints(data, {
        x: 'X',
        y: 'Y',
        symbol: (item) => {
          return self.symbol.pictureMarkerSymbols['hospital']
        },
        label: (item) => {
          let sys = item.NAME === '军运村医疗卫生服务中心' ? self.symbol.pictureMarkerSymbols['hospcenter'] || {} : self.symbol.pictureMarkerSymbols['hospital'] || {}
          return {
            dx: -(sys.markerDx) - 50,
            dy: -22,
            content: item.NAME,
            fontcolor: '#00ddff'
          }
        }
      })
    },
    // 鼠标滑过效果
    markerHover (marker) {
      const item = marker.getExtData() || {}
      this.map.showInfoWindow({
        x: item.X,
        y: item.Y,
        dx: 130,
        dy: -90,
        data: item,
        title: item.NAME,
        content: this.resultTemplate
      })
    },
    // 鼠标移出效果
    markerHoverOut () {
      this.map.hideInfoWindow()
    },
    // 患者体征
    openry () {
      this.panel.getPopDetail().openPanel()
    },
    // 拨打电话
    showPhone () {
      this.panel.getVediocall().openPanel()
    },
    // 摄像头
    opensxt () {
      this.panel.getSxt().openSxt()
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.init()
    })
    this.getTemplate('ylss-hover').then((res) => {
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
    this.panel.getPopDetail().closePanel()
    this.panel.getSxt().closeSxt()
    this.panel.getVediocall().closePanel()
    this.map.clear()
    // 清除定时器
    clearInterval(this.interval)
  }
}

</script>
<style>
#map2_container {
  width: 100%;
  height: 100%;
}
#map2_container .amap-logo {
  left: -1000px !important;
  display: none !important;
}
#map2_container .amap-copyright {
  opacity: 0;
}
.ylss_xtk {
  color: red;
}
.amap-overlay-text-container {
    background: none;
    border: 0px;
}
</style>
