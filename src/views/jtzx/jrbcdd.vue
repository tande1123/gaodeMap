<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:10:14
 -->

<!-- 今日班车调度 -->
<template>
  <div class="jrbcdd-wrap">
    <h3>今日赛时班车调度</h3>
    <div class="table-list">
      <div class="search-box">
        <div class="search-input">
          <input type="text" class="search" :placeholder='placeholder' v-model="inputVal" @focus="placeholder=''" @blur="placeholder='按车牌、电话、起点、终点查询'">
          <i class="icon" @click="search" v-show="placeholder"></i>
        </div>
        <span class="back" @click="back"></span>
      </div>
      <div class="nav">
        <div :class="activeTab===1?'active':''" @click="tabClick(1,'DRIVING')">已发车{{bcDRIVING.length}}辆</div>
        <div :class="activeTab===3?'active':''" @click="tabClick(3,'Arrived')">已到达{{bcARRIVED.length}}辆</div>
        <div :class="activeTab===4?'active':''" @click="tabClick(4,'unstarted')">未发车{{bcUNSTARTED.length}}辆</div>
        <div :class="activeTab===2?'active':''" @click="tabClick(2)">异常班车0辆</div>
      </div>
      <div class="list" v-if="activeTab===2">
        <el-scrollbar style="height:100%;">
          <div v-if="initData.length>0">
            <div :class="activeLi===index?'active detail warn':'detail warn'" v-for="(item,index) in initData" :key="index" @click="detailClick(item)">
              <div class="td td-top">
                <div class="td-1 orange"><span>{{fmtCarNum(item.BUS_NUM)}}</span></div>
                <div class="td-2 white">司机电话：{{item.DRIVER_MOBILE}}</div>
              </div>
              <div class="td">
                <div class="td-1">上报时间：<span>{{fmtDate(item.PLAN_ARRIVAL_TIME)}}</span></div>
                <div class="td-2">异常原因：<span>汽车故障</span></div>
              </div>
              <div class="td td-box">
                <div>路线：{{item.START_STATION}}--{{item.END_STATION}}</div>
              </div>
              <div class="line-img"></div>
            </div>
          </div>
          <div v-else class="noList">
          </div>
        </el-scrollbar>
      </div>
      <div class="list" v-if="activeTab===1">
        <el-scrollbar style="height:100%;">
          <div v-for="(item,index) in initData" :key="index" class="detail" @click="detailClick(item,index)" :class="{detailActive:activeDiv===index}">
            <div class="td td-top">
              <div class="td-1 yellow">{{fmtCarNum(item.BUS_NUM)}}</div>
              <div class="td-2 white">司机电话：<span>{{item.DRIVER_MOBILE}}</span></div>
            </div>
            <div class="td">
              <div class="td-1">预计抵达时间：<span>{{fmtDate(item.PLAN_ARRIVAL_TIME)}}</span></div>
              <div class="td-2">搭载人数：<span>{{item.CAPACITY_NUM}}</span></div>
              <!-- <div class="td-3">里程：<span>{{item.ROAD_MILES}} 公里</span></div> -->
            </div>
            <div class="td td-box">
              <div>路线：{{item.START_STATION}}--{{item.END_STATION}}</div>
            </div>
            <div class="line-img"></div>
          </div>
        </el-scrollbar>
      </div>
      <div class="list" v-if="activeTab===3">
        <el-scrollbar style="height:100%;">
          <div v-for="(item,index) in initData" :key="index" class="detail" @click="detailClick(item,index)" :class="{detailActive:activeDiv===index}">
            <div class="td td-top">
              <div class="td-1 yellow">{{fmtCarNum(item.BUS_NUM)}}</div>
              <div class="td-2 white">司机电话：<span>{{item.DRIVER_MOBILE}}</span></div>
            </div>
            <div class="td">
              <div class="td-1">实际抵达时间：<span>{{fmtDate(item.REAL_ARRIVAL_TIME)}}</span></div>
              <div class="td-2">搭载人数：<span>{{item.CAPACITY_NUM}}</span></div>
              <!-- <div class="td-3">里程：<span>{{item.ROAD_MILES}} 公里</span></div> -->
            </div>
            <div class="td td-box">
              <div>路线：{{item.START_STATION}}--{{item.END_STATION}}</div>
            </div>
            <div class="line-img"></div>
          </div>
        </el-scrollbar>
      </div>
      <div class="list" v-if="activeTab===4">
        <el-scrollbar style="height:100%;">
          <div v-for="(item,index) in initData" :key="index" class="detail" @click="detailClick(item,index)" :class="{detailActive:activeDiv===index}">
            <div class="td td-top">
              <div class="td-1 yellow">{{fmtCarNum(item.BUS_NUM)}}</div>
              <div class="td-2 white">司机电话：<span>{{item.DRIVER_MOBILE}}</span></div>
            </div>
            <div class="td">
              <div class="td-1">预计发车时间：<span>{{fmtDate(item.PLAN_LEAVE_TIME)}}</span></div>
              <div class="td-2">搭载人数：<span>{{item.CAPACITY_NUM}}</span></div>
              <!-- <div class="td-3">里程：<span>{{item.ROAD_MILES}} 公里</span></div> -->
            </div>
            <div class="td td-box">
              <div>路线：{{item.START_STATION}}--{{item.END_STATION}}</div>
            </div>
            <div class="line-img"></div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import common from '../../utils/common.es'
import { mapGetters, mapActions } from 'vuex'
let self
export default {
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig', 'panel'])
  },
  data () {
    return {
      resultTemplate: '',
      activeTab: 1,
      bcARRIVED: [], // 到达
      bcDRIVING: [], // 已出发
      bcUNSTARTED: [], // 未出发
      tableData: [],
      initData: [],
      inputVal: '',
      activeLi: 0,
      activeDiv: 0,
      placeholder: '按车牌、电话、起点、终点查询'
    }
  },
  methods: {
    ...mapActions(['getTemplate']),

    tabClick (index, type) { // tab切换数据
      this.activeLi = 0
      this.activeDiv = 0
      this.activeTab = index
      this.inputVal = ''
      this.map.getInstance().clearMap()
      this.map.clearClusterLayer()
      switch (type) {
        case 'DRIVING':
          this.tableData = this.bcDRIVING // 已发车
          this.detailClick(this.tableData[0], 0)
          this.addPointToLayer(this.tableData)
          break
        case 'Arrived':
          this.tableData = this.bcARRIVED // 已到达
          this.detailClick(this.tableData[0], 0)
          break
        case 'unstarted':
          this.tableData = this.bcUNSTARTED // 未发车
          this.detailClick(this.tableData[0], 0)
          break
        default:
          this.tableData = []
          break
      }
      var str = []
      if (this.inputVal === '') {
        this.initData = this.tableData
      } else {
        switch (this.activeTab) {
          case 1:
          case 3:
          case 4:
            if (this.tableData.length > 0) {
              this.tableData.forEach(e => {
                if (e.START_STATION.includes(this.inputVal) || e.END_STATION.includes(this.inputVal) ||
                  e.BUS_NUM.replace(/\s*/g, '').includes(this.inputVal.replace(/\s*/g, '')) || e.DRIVER_MOBILE.includes(this.inputVal)) {
                  str.push(e)
                }
              })
            }
            this.initData = str
            break
          default:
            this.initData = []
            break
        }
      }
    },
    detailClick (item, key) {
      // 清除路径
      this.map.clear('polyline')
      // 清除起点和终点
      this.map.clear('labelLayer')
      this.activeDiv = key
      if (item.RUNNING_STATUS === 'DRIVING') {
        // 添加此班车点位
        this.addPointToLayer([item])
      }
      this.$store.commit('setClickMarkerData', item)
      this.$store.commit('setPopBcss', true)
      this.$emit('showPopBcss', true)
      // 执行路径分析
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
          } else {
            // return {
            //   dx: -(element['UPDATE_TIME']).length * 5,
            //   dy: -22,
            //   content: element['UPDATE_TIME'],
            //   fontcolor: '#26ce73'
            // }
          }
        }
      })
    },

    search () { // 查询搜索框
    },
    back () { // 返回初始化数据
      this.inputVal = ''
      this.init()
    },
    classfyData (result) { // 数据分组组织
      var resultdata = {}
      if (result) {
        result.forEach(element => {
          var cartype = element.RUNNING_STATUS
          if (!resultdata[cartype]) {
            resultdata[cartype] = []
          }
          resultdata[cartype].push(element)
        })
      }
      return resultdata
    },
    init () { // 数据初始化
      let parameters = {
        parameter: {
          'DoAction': 'querygisvbusmanagerinfo'
        }
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', parameters).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyResult)
        let bcData = this.classfyData(result)
        this.bcARRIVED = bcData['ARRIVED'] || []
        this.bcDRIVING = bcData['DRIVING'] || []
        this.bcUNSTARTED = bcData['UNSTARTED'] || []
        switch (this.activeTab) {
          case 1:
            this.tableData = this.bcDRIVING // 已发车
            break
          case 3:
            this.tableData = this.bcARRIVED // 已到达
            break
          case 4:
            this.tableData = this.bcUNSTARTED // 未发车
            break
          default:
            this.tableData = []
            break
        }
        this.initData = this.tableData
        if (this.initData.length > 0) {
          // this.addPointToLayer(this.initData)
          this.detailClick(this.initData[0], 0)
        }
      })
    },
    addPointToLayer (data) { // 添加数据到地图  模拟数据
      this.map.clearClusterLayer()
      var dataArr = []
      data.forEach(function (item) {
        if (item.LONGTITUDE > 0 && item.LATITUDE > 0) dataArr.push(item)
      })
      if (dataArr.length > 0) {
        this.map.addCluster(dataArr, {
          x: 'LONGTITUDE',
          y: 'LATITUDE',
          symbol: (item) => {
            if (!this.symbol.pictureMarkerSymbols['bcssfree']) {
              console.log(item.TYPECODE || item)
            }
            return this.symbol.pictureMarkerSymbols['bcssfree']
          },
          // label: (item) => {
          //   let sys = this.symbol.pictureMarkerSymbols['bcss'] || {}
          //   return {
          //     dx: -('目的地:' + item.END_STATION + ' 到达时间：' + item.PLAN_ARRIVAL_TIME).length * 5,
          //     dy: (sys.markerDy || 0) * 2,
          //     content: '目的地:' + item.END_STATION + ' 到达时间：' + item.UPDATE_TIME// item.NAME
          //   }
          // },
          click: (e) => {
            this.processClick(e)
          }
        })
      }
    },
    processClick (e) { // 地图点击事件
      const item = e.target.getExtData() || {}
      this.detailClick(item, this.activeDiv)
      this.inputVal = item.BUS_NUM
      this.$store.commit('setPopBcss', true)
      this.$store.commit('setClickMarkerData', item)
      var markers = this.map.getInstance().getAllOverlays('marker')
      for (let i = 0; i < markers.length; i++) {
        var markersData = markers[i].C.extData
        if (markersData.ID !== item.ID && !!markersData.BUS_NUM) {
          markers[i].setIcon('./static/assets/symbols/pictureMarkerSymbols/bcssfree.png')
        }
      }
      e.target.setIcon('./static/assets/symbols/pictureMarkerSymbols/bcss.png')
      // const offset = e.target.getOffset() || {}
      // this.map.showInfoWindow({
      //   x: item.LONGTITUDE,
      //   y: item.LATITUDE,
      //   dx: -offset.x - 18,
      //   dy: offset.y * 2 + 18,
      //   title: item.END_STATION,
      //   data: item,
      //   methods: {
      //     showVideo: this.showVideo
      //   },
      //   content: this.resultTemplate
      // })
    },
    showVideo () {
      this.panel.getPopVideo().openPanel()
    },
    fmtDate (date) {
      let item = date.slice(0, 4)
      let result = ''
      for (let i = 0; i < item.length; i++) {
        result += item[i]
        if (i === 1) {
          result += ':'
        }
      }
      return result
    },
    fmtCarNum (str) { // 格式化车牌号
      return str.slice(0, 2) + ' ' + str.slice(2)
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.init()
    },
    inputVal () { // 监听input框搜索  依据tab选中搜索
      var str = []
      if (this.inputVal === '') {
        this.init()
      } else {
        switch (this.activeTab) {
          case 1:
          case 3:
          case 4:
            this.tableData.forEach(e => {
              if (e.START_STATION.includes(this.inputVal) || e.END_STATION.includes(this.inputVal) ||
                e.BUS_NUM.replace(/\s*/g, '').includes(this.inputVal.replace(/\s*/g, '').toUpperCase()) || e.BUS_NUM.replace(/\s*/g, '').includes(this.inputVal.replace(/\s*/g, '').toLowerCase()) || e.DRIVER_MOBILE.includes(this.inputVal)) {
                str.push(e)
              }
            })
            this.initData = str
            if (str.length > 0) {
              this.detailClick(this.initData[0], 0)
            }
            break
          default:
            this.initData = []
            break
        }
      }
    }
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.init()
    })
    this.getTemplate('jrbc').then((res) => {
      this.resultTemplate = res
    })
  },
  beforeDestroy () {
    // 退出时隐藏底图
    this.map.clearClusterLayer()
    this.$store.commit('setPopBcss', false)
    this.panel.keyvideo().closePanel()
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.jrbcdd-wrap {
  width: 100%;
  height: 586 * @px;
  color: #a2beda;
  overflow: hidden;
  background: url("../../../static/assets/img/jtzx/border1.png") center center
    no-repeat;
  background-size: 100% 100%;
  h3 {
    color: #00effe;
    letter-spacing: 1px;
    text-indent: 16px;
    font-weight: bold;
    font-size: 18 * @px;
    line-height: 24 * @px;
    margin-top: 14 * @px;
    border-left: 5 * @px solid #00cdfe;
    background: rgba(17, 70, 124, 0.6);
  }
  .search-box {
    margin: 12 * @px 0;
    overflow: hidden;
    .search-input {
      display: inline-block;
      position: relative;
      .search {
        width: 305 * @px;
        height: 46 * @px;
        border: 1px solid #00809f;
        display: inline-block;
        font-size: 16 * @px;
        text-indent: 13 * @px;
        color: #7f91a6;
        background: rgba(18, 42, 81, 0.8);
      }
      .icon {
        width: 23 * @px;
        height: 25 * @px;
        position: absolute;
        top: 10 * @px;
        right: 16 * @px;
        background: url("../../../static/assets/img/jtzx/search.png") center
          center no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .back {
      float: right;
      width: 100 * @px;
      height: 45 * @px;
      cursor: pointer;
      background: url("../../../static/assets/img/jtzx/back.png") center center
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .table-list {
    padding: 0 12 * @px 0 15 * @px;
  }
  .nav {
    height: 44 * @px;
    margin: 2 * @px 0;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #0b1d4b;
    border-bottom: 1px solid #0b1d4b;
    background: rgba(17, 70, 124, 0.4);
    div {
      flex: 1;
      height: 44 * @px;
      font-size: 18 * @px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #c3e3fc;
    }
    .active {
      background: url("../../../static/assets/img/jtzx/table-active.png") center
        center no-repeat;
      background-size: 100% 100%;
      color: #f9b43d;
    }
  }
  .list {
    // padding-bottom: 11 * @px;
    height: 410 * @px;
    position: relative;
    .detail {
      width: 100%;
      font-size: 16 * @px;
      line-height: 28 * @px;
      text-indent: 13 * @px;
      color: #c8e1ff;
      cursor: pointer;
      background: url("../../../static/assets/img/jtzx/list-active.png") center
        center no-repeat;
      background-size: 100% 100%;
      .line-img {
        height: 1px;
        background: url("../../../static/assets/img/jtzx/border-line.png")
          center center no-repeat;
        background-size: 100% 100%;
      }
      .td {
        display: flex;
        line-height: 30 * @px;
        align-items: center;
        overflow: hidden;
        &:nth-child(1) {
          line-height: 34 * @px;
          margin-top: 6 * @px;
        }
        &:nth-child(2),
        &:nth-child(3) {
          margin-left: 0 * @px;
        }
        &.td-top {
          &:before {
            display: inline-block;
            width: 20 * @px;
            height: 20 * @px;
            content: "";
            background: url("../../../static/assets/img/jtzx/circle.png") center
              center no-repeat;
            background-size: 100% 100%;
          }
        }
        .yellow {
          color: #00ccfe;
          font-size: 16 * @px;
        }
        .td-4 {
          width: 40 * @px;
          height: 20 * @px;
          line-height: 20 * @px;
          text-align: center;
          border: 1px solid #000;
          margin-right: 27 * @px;
          border-radius: 5 * @px;
          cursor: pointer;
        }
        span {
          // display: inline-block;
          color: #00ccfe;
        }
      }
      .td-box {
        justify-content: space-between;
        padding-bottom: 12 * @px;
      }
    }
    .detailActive {
      height: 107 * @px;
      color: #f9be78;
      background: url("../../../static/assets/img/jtzx/xzK.png") center center
        no-repeat !important;
      background-size: 100% 100% !important;
      .line-img {
        height: 1px;
        background: none;
      }
      .td {
        display: flex;
        line-height: 30 * @px;
        align-items: center;
        overflow: hidden;
        &:nth-child(1) {
          line-height: 34 * @px;
          margin-top: 6 * @px;
        }
        &:nth-child(2),
        &:nth-child(3) {
          margin-left: 0 * @px;
        }
        &.td-top {
          &:before {
            display: inline-block;
            width: 20 * @px;
            height: 20 * @px;
            content: "";
            background: url("../../../static/assets/img/jtzx/yuan.png") center
              center no-repeat;
            background-size: 100% 100%;
          }
        }
        .yellow {
          color: #f5b53a;
          font-size: 16 * @px;
        }
        .td-4 {
          width: 40 * @px;
          height: 20 * @px;
          line-height: 20 * @px;
          text-align: center;
          border: 1px solid #000;
          margin-right: 27 * @px;
          border-radius: 5 * @px;
          cursor: pointer;
        }
        span {
          // display: inline-block;
          color: #f5b53a;
        }
      }
    }
    .warn {
      span {
        color: #f6541b !important;
      }
    }
    .noList {
      width: 377 * @px;
      height: 367 * @px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: url("../../../static/assets/img/jtzx/warn.png") center center
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
<style>
.jrbcdd-wrap .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
