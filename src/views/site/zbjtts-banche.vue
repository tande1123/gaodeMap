<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->

<!-- 今日班车调度 -->
<template>
  <div class="jrbcdd-wrap">
    <h3>今日赛时班车调度</h3>
    <div class="table-list">
      <div class="search-box">
        <div class="search-input">
          <input type="text" class="search" :placeholder='placeholder' v-model="inputVal" @focus="placeholder=''" @blur="placeholder='按场馆名称或比赛项目查询'">
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
              <div class="td-3">里程：<span>{{item.DISTANCE}} 公里</span></div>
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
              <div class="td-1">抵达时间：<span>{{fmtDate(item.PLAN_ARRIVAL_TIME)}}</span></div>
              <div class="td-2">搭载人数：<span>{{item.CAPACITY_NUM}}</span></div>
              <div class="td-3">里程：<span>{{item.DISTANCE}} 公里</span></div>
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
              <div class="td-1">发车时间：<span>{{fmtDate(item.REAL_ARRIVAL_TIME)}}</span></div>
              <div class="td-2">搭载人数：<span>{{item.CAPACITY_NUM}}</span></div>
              <div class="td-3">里程：<span>{{item.DISTANCE}} 公里</span></div>
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
      placeholder: '按场馆名称或比赛项目查询'
    }
  },
  methods: {
    ...mapActions(['getTemplate']),

    tabClick (index, type) { // tab切换数据
      this.activeLi = 0
      this.activeDiv = 0
      this.activeTab = index
      // this.map.getInstance().clearMap()
      switch (type) {
        case 'DRIVING':
          this.tableData = this.bcDRIVING // 已发车
          break
        case 'Arrived':
          this.tableData = this.bcARRIVED // 已到达
          break
        case 'unstarted':
          this.tableData = this.bcUNSTARTED // 未发车
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
            this.tableData.forEach(e => {
              if (e.START_STATION.includes(this.inputVal) || e.END_STATION.includes(this.inputVal)) {
                str.push(e)
              }
            })
            this.initData = str
            break
          default:
            this.initData = []
            break
        }
      }
      this.map.clearClusterLayer()
      this.addPointToLayer(this.initData)
    },
    detailClick (item, key) {
      this.activeDiv = key
    },
    search () { // 查询搜索框
    },
    back () { // 返回初始化数据
      this.inputVal = ''
      this.init()
    },
    classfyData (result) { // 数据分组组织
      var resultdata = {}
      result.forEach(element => {
        var cartype = element.RUNNING_STATUS
        if (!resultdata[cartype]) {
          resultdata[cartype] = []
        }
        element['DISTANCE'] = self.random(10, 30)// 后期对接真实数据后删除行代码
        resultdata[cartype].push(element)
      })
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
        this.addPointToLayer(this.initData)
        this.detailClick(this.initData[0], 0)
      })
    },
    addPointToLayer (data) { // 添加数据到地图  模拟数据
      this.map.clearClusterLayer()
      this.map.addCluster(data, {
        x: 'LONGTITUDE',
        y: 'LATITUDE',
        symbol: (item) => {
          if (!this.symbol.pictureMarkerSymbols['bcssfree']) {
            console.log(item.TYPECODE || item)
          }
          return this.symbol.pictureMarkerSymbols['bcssfree']
        },
        click: (e) => {
          // this.processClick(e)
        }
      })
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
    },
    // 随机生成一个路线距离（后期接真实数据后删除）
    random (lower, upper) {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower
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
              if (e.START_STATION.includes(this.inputVal) || e.END_STATION.includes(this.inputVal)) {
                str.push(e)
              }
            })
            this.initData = str
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
  width: 440 * @px;
  height: 610 * @px;
  color: #a2beda;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 8px #999;
  -webkit-box-shadow: 0 0 8px #999;
  -moz-box-shadow: 0 0 8px #999;
  -ms-box-shadow: 0 0 8px #999;
  -o-box-shadow: 0 0 8px #999;
  h3 {
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../../static/img/site/headbg.png") center center
      no-repeat;
    background-size: 100% 100%;
    font-size: 18 * @px;
    font-weight: bold;
    text-indent: 13 * @px;
    overflow: hidden;
  }
  .search-box {
    margin: 12 * @px 0;
    overflow: hidden;
    .search-input {
      display: inline-block;
      position: relative;
      .search {
        width: 305 * @px;
        height: 40 * @px;
        border: 1px solid #eee;
        display: inline-block;
        font-size: 16 * @px;
        text-indent: 13 * @px;
        color: #7f91a6;
        background: #fff;
      }
      .icon {
        height: 40 * @px;
        width: 55 * @px;
        position: absolute;
        top: 0 * @px;
        right: 0 * @px;
        background: url("../../../static/img/site/seachbtn.png") #0a7bc7
          no-repeat center center;
        cursor: pointer;
      }
    }
    .back {
      float: right;
      width: 100 * @px;
      height: 40 * @px;
      cursor: pointer;
      background: #0a7bc7 url("../../../static/assets/img/jtzx/back.png") center
        center no-repeat;
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
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #e6edfa;
    div {
      flex: 1;
      height: 44 * @px;
      font-size: 18 * @px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #909499;
    }
    .active {
      background-color: #3b8be4;
      color: #fff;
    }
  }
  .list {
    // padding-bottom: 11 * @px;
    height: 440 * @px;
    position: relative;
    .detail {
      width: 100%;
      font-size: 16 * @px;
      line-height: 28 * @px;
      text-indent: 13 * @px;
      color: #000;
      cursor: pointer;
      border-top: 1px solid #eee;
      // .line-img {
      //   height: 1px;
      //   background: url("../../../static/assets/img/jtzx/border-line.png")
      //     center center no-repeat;
      //   background-size: 100% 100%;
      // }
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
          color: #000;
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
          color: #000;
        }
      }
      .td-box {
        justify-content: space-between;
        padding-bottom: 12 * @px;
      }
    }
    .detailActive {
      height: 107 * @px;
      color: #088dd3;
      // background: url("../../../static/assets/img/jtzx/xzK.png") center center
      //   no-repeat !important;
      // background-size: 100% 100% !important;
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
            background: url("../../../static/assets/img/jtzx/circle.png") center
              center no-repeat;
            background-size: 100% 100%;
          }
        }
        .yellow {
          color: #088dd3;
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
          color: #088dd3;
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
