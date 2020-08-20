<!--
 * @Description: 地图核心组件
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-04 13:38:01
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:09:20
 -->
<template>
  <div>
    <map-main></map-main>
    <div v-if="showPopBcss" class="bcssBox">
      <popbcss :MarkerData="ClickMarker"></popbcss>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import common from '@/utils/common.es'
import popbcss from '@/components/pop-bcss'
import mapMain from '@/gis/map/map-main'
let self
export default {
  components: { popbcss, mapMain },
  data () {
    return {
      resultTemplate: '',
      cgdata: [
        {
          layername: 'labelLayer',
          name: '驿山高尔夫球场',
          X: 114.508362,
          Y: 30.499367,
          typecode: 'end',
          linePoints: '114.295265,30.430401;114.296219,30.430246;114.296127,30.429951;114.29599,30.429422;114.295921,30.429131;114.295975,30.429106;114.296196,30.429964;114.29641,30.430595;114.296997,30.432127;114.297684,30.433945;114.297836,30.434313;114.299049,30.4375;114.299355,30.438316;114.299698,30.439226;114.299698,30.439362;114.299759,30.439522;114.299919,30.440151;114.300179,30.440786;114.300255,30.441019;114.300415,30.441494;114.300537,30.441971;114.300652,30.442577;114.300713,30.44306;114.30072,30.443111;114.300728,30.443333;114.300743,30.443989;114.30069,30.444717;114.300659,30.444944;114.300652,30.445009;114.300598,30.445272;114.300377,30.446241;114.300377,30.446306;114.300232,30.446722;114.299973,30.447718;114.299713,30.448681;114.299522,30.449444;114.299042,30.451944;114.298935,30.452522;114.298767,30.453529;114.298782,30.454102;114.29879,30.454613;114.298874,30.455605;114.297882,30.456156;114.297112,30.456524;114.295555,30.457277;114.29406,30.457996;114.293816,30.458111;114.292015,30.458984;114.292587,30.459972;114.293076,30.460846;114.293839,30.460505;114.297821,30.45878;114.29805,30.458794;114.298729,30.458508;114.299255,30.458311;114.299805,30.458138;114.300308,30.458015;114.30069,30.457937;114.301292,30.457848;114.30159,30.457817;114.301758,30.457809;114.302208,30.457787;114.302681,30.457787;114.303665,30.457838;114.306152,30.458014;114.306847,30.458059;114.309052,30.458206;114.309837,30.458242;114.310677,30.458229;114.312981,30.458141;114.316154,30.457973;114.317429,30.457911;114.318436,30.457882;114.320892,30.457855;114.321182,30.457855;114.323341,30.457865;114.323723,30.457865;114.330185,30.457882;114.332832,30.457882;114.334305,30.457886;114.340195,30.457911;114.342766,30.45797;114.345703,30.458134;114.349541,30.458361;114.351212,30.45845;114.360504,30.458998;;114.360504,30.458998;114.363609,30.459223;114.364037,30.459253;114.365372,30.459358;114.365959,30.4594;114.367668,30.459536;114.380524,30.460501;114.384544,30.46077;114.386421,30.460911;114.386864,30.460955;114.388199,30.461067;114.389458,30.461155;114.389641,30.461166;114.389908,30.461189;114.390892,30.461245;114.393936,30.461357;114.394569,30.46137;114.395981,30.461411;114.3992,30.461571;114.400566,30.461666;114.401848,30.461836;114.405441,30.462473;114.406357,30.462641;114.409386,30.463186;114.41069,30.463415;114.411621,30.463585;114.413185,30.463867;114.413559,30.463934;114.414345,30.464071;114.414696,30.46413;114.415909,30.464344;114.416252,30.464405;114.416779,30.4645;114.41745,30.464622;114.418152,30.464708;114.41877,30.464748;114.422348,30.464869;114.423325,30.464891;114.426552,30.464991;114.427788,30.46505;114.428551,30.465086;114.429688,30.465164;114.43071,30.465252;114.43277,30.465477;114.433594,30.465588;114.434105,30.465656;114.43557,30.465874;114.436104,30.465965;114.438492,30.466412;114.439407,30.466606;114.440971,30.46697;114.44194,30.467222;114.443993,30.467518;114.445358,30.46763;114.445686,30.467678;114.446121,30.46776;114.446487,30.467846;114.446678,30.467905;114.446861,30.46796;114.44706,30.468042;114.44738,30.468178;114.447784,30.468388;114.448196,30.468637;114.448372,30.468767;114.44873,30.469049;114.449013,30.469307;114.449127,30.469427;114.449265,30.469566;114.449448,30.469801;114.449593,30.469999;114.449745,30.470222;114.450012,30.470678;114.450356,30.471275;114.450478,30.471476;114.45063,30.471693;114.45079,30.471893;114.451317,30.472504;114.451591,30.472769;114.451881,30.473024;114.452072,30.473156;114.452316,30.473343;114.452904,30.473715;114.453598,30.474115;114.454277,30.47448;114.454948,30.474913;114.455238,30.475126;114.455566,30.475409;114.455795,30.47562;114.456223,30.476048;114.456245,30.47607;114.456512,30.476372;114.456886,30.476913;114.457291,30.47757;114.457428,30.477886;114.457603,30.478329;114.457817,30.479031;114.457901,30.479395;114.457954,30.479763;114.45797,30.480074;114.457985,30.480669;114.457954,30.481102;114.457909,30.481436;114.45797,30.48181;114.457855,30.482569;114.457855,30.482765;114.457878,30.482933;114.457916,30.483078;114.458,30.483265;114.458092,30.483412;114.458221,30.483589;114.458763,30.484161;114.459091,30.484509;114.459229,30.484613;114.459381,30.484709;114.459518,30.484777;114.459679,30.484827;114.460136,30.484913;114.461296,30.484818;114.461876,30.484787;114.463051,30.484795;114.463715,30.484821;114.464462,30.484821;114.46463,30.484886;114.464752,30.484936;114.465584,30.484961;114.466393,30.485054;114.467285,30.485191;114.46949,30.485689;114.470528,30.485897;114.471565,30.486076;114.473366,30.48642;114.474571,30.486649;114.475838,30.486898;114.476555,30.487013;114.476868,30.487059;114.477539,30.487148;114.478394,30.487253;114.480164,30.487431;114.480621,30.487465;114.48085,30.487486;114.481209,30.487513;114.481323,30.487526;114.481911,30.48756;114.483032,30.487621;114.484268,30.487713;114.484993,30.487801;114.486389,30.487991;114.48671,30.488047;114.487778,30.488237;114.490318,30.488762;114.490944,30.488911;114.491539,30.489002;114.492279,30.489107;114.492462,30.489708;114.492516,30.489878;114.492691,30.491085;114.492859,30.492208;114.492897,30.492477;114.492912,30.492826;114.492882,30.49316;114.495064,30.493082;114.495544,30.493059;114.496628,30.493025;114.496712,30.493015;114.497223,30.49299;114.498619,30.492924;114.499512,30.492905;114.500023,30.492895;114.500153,30.492891;114.501701,30.492842;114.502304,30.492823;114.502785,30.492804;114.502953,30.49279;114.503288,30.492783;114.50528,30.492733;114.505928,30.492739;114.506737,30.492764;114.507904,30.492865;114.508041,30.493456;114.508064,30.493654;114.508118,30.494102;114.508354,30.494713;114.50843,30.494987;114.508446,30.495169;114.508453,30.495512;114.508347,30.496172;114.508354,30.496334;114.508522,30.496775;114.508583,30.496996;114.508621,30.497505;114.508675,30.497911;114.508743,30.498047;114.508934,30.498383;114.509575,30.499393;114.508987,30.49935;114.508377,30.499418;114.508362,30.499367'
        }
      ],
      jyc: { layername: 'labelLayer', name: '军运村南门', X: 114.294756, Y: 30.430198, typecode: 'start' },
      bcssData: [],
      showPopBcss: true,
      ClickMarker: null
    }
  },
  /**
   * @name: 监听配置文件加载
   */
  watch: {
    mapLoaded () {
      this.mapLoaded && this.init()
    },
    popBcss: {
      handler (newName, oldName) {
        this.showPopBcss = this.popBcss
      },
      immediate: true,
      deep: true
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
      // this.map.getInstance().setMapStyle('amap:// styles/1bfa7f3a7fe64d9b95f5781f021396ff')// 极夜蓝

      // this.map.getInstance().setMapStyle('amap://styles/darkblue')// 极夜蓝
      this.map.getInstance().setMapStyle('amap://styles/blue')// 靛青蓝
      // this.map.getInstance().setMapStyle('amap://styles/dark')// 幻影黑
      // this.map.getInstance().setMapStyle('amap://styles/grey')// 雅士灰

      // this.map.getInstance().setMapStyle('amap://styles/whitesmoke')// 远山黛
      // this.map.getInstance().setMapStyle('amap://styles/light')// 月光银
      // this.map.getInstance().setMapStyle('amap://styles/fresh')// 草色青
      // this.map.getInstance().setMapStyle('amap://styles/macaron')// 马卡龙
      // this.map.getInstance().setMapStyle('amap://styles/graffiti')// 涂鸦
      // this.map.getInstance().setMapStyle('amap://styles/normal')// 标准
      // this.map.getInstance().setMapStyle('amap://styles/wine')// 酱籽

      // 再设置图层显示状态
      var lyrs = this.map.getInstance().getLayers()
      // lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet'  //路网
      // lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic'  //路况
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer') {
            // lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
            // lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet'
            lyrs[l].show()
          }
        }
      }
      this.map.clearClusterLayer()
      this.getBusData()
    },
    getBusData () {
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': 'querygisvbusmanagerinfo'
          },
          'token': 'string'
        }
      }).then(res => {
        this.bcssData = common.convertTable2objects(res.data.QuerySafetyResult)
        this.addBusPointToMap(this.bcssData)
        this.showFirstRoad()
      })
    },
    addBusPointToMap (data) {
      this.map.addPoints(data, {
        x: 'LONGTITUDE',
        y: 'LATITUDE',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols['bcssfree']
        },
        click: (e) => {
          this.processClick(e)
        }
      })
    },
    processClick (e) {
      // 清除路径
      this.map.clear('polyline')
      // 清除起点和终点
      this.map.clear('labelLayer')
      // 执行路径分析
      this.roadTask(e)
    },
    // 执行路径分析
    roadTask (e) {
      const item = e.target.getExtData() || {}
      this.ClickMarker = item
      this.$store.commit('setPopBcss', true)
      self.changeSymbol(item)
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
    changeSymbol (item) {
      var markers = self.map.getInstance().getAllOverlays('marker')
      for (let i = 0; i < markers.length; i++) {
        var markersData = markers[i].C.extData
        if (markersData.ID !== item.ID && !!markersData.BUS_NUM) {
          markers[i].setIcon('./static/assets/symbols/pictureMarkerSymbols/bcssfree.png')
        } else if (markersData.ID === item.ID) {
          markers[i].setIcon('./static/assets/symbols/pictureMarkerSymbols/bcss.png')
        }
      }
    },
    showVideo () {
      this.panel.getPopVideo().openPanel()
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
              dx: 20,
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
    },
    // 默认显示已到达第一条线路
    showFirstRoad () {
      for (let i = 0; i < this.bcssData.length; i++) {
        if (this.bcssData[i].RUNNING_STATUS === 'DRIVING') {
          this.showRoad(this.bcssData[i])
        }
      }
    },
    showRoad (item) {
      // const item = e.target.getExtData() || {}
      var lineSE = []
      lineSE.push(this.jyc)
      if (item.END_STATION === this.cgdata[0].name) {
        lineSE.push(this.cgdata[0])
        this.map.addPoints(lineSE, {
          x: 'X',
          y: 'Y',
          symbol: (item) => {
            return this.symbol.pictureMarkerSymbols[item['typecode']]
          },
          label: (item) => {
            if (item.typecode === 'start') {
              return {
                dx: 20,
                dy: -22,
                content: item['name'],
                fontcolor: '#26ce73'
              }
            } else if (item.typecode === 'end') {
              return {
                dx: -(item['name']).length,
                dy: -22,
                content: item['name'],
                fontcolor: '#dc6626'
              }
            }
          }
        })
        this.map.addlines(this.cgdata[0].linePoints, {
          symbol: [this.symbol.lineSymbols['lineBusA'], this.symbol.lineSymbols['lineBusB']]
        })
      }
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.init()
    })
    this.getTemplate('bcss').then((res) => {
      this.resultTemplate = res
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
    this.panel.getVediocall().closePanel()
    this.map.clear()
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
</style>
<style lang="less" scoped>
.bcssBox {
  top: 10px;
  right: 10px;
  position: absolute;
}
</style>
