<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:10:01
 -->
<!--头部 -->
<template>
  <div class="jtzx-header">
    <div class="hearderbj">
    </div>
    <div class="tq">
      <div class="thunder"></div>
      <img :src="tq_img" alt="">
      <p class="tqOne" v-if="len>2">{{turn(weatherList.STATEDETAILED)}}</p>
      <p class="tqOne" v-else>{{weatherList.STATEDETAILED}}</p>
      <p class="tqTwo">{{weatherList.TEM1}}℃~{{weatherList.TEM2}}℃</p>
      <p class="wlzs"><span>{{pm.AQI}} {{pm.QUALITY}}</span></p>
    </div>
    <div class="ds">
      <p>距开幕还有<span v-for="(item,index) in djsTime" :key="index">{{item}}</span>天</p>
    </div>
    <div class="time">
      <p>{{time}}</p>
      <p>{{date}}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import fmtDate from '@/utils/formatdate.es'
import common from '@/utils/common.es'
export default {
  data () {
    return {
      date: '',
      time: '',
      gettime: '',
      weatherList: [],
      pm: [],
      tq_img: '',
      Return_fhsyUrl: '',
      len: '',
      djsTime: []
    }
  },
  props: [],
  computed: {
    ...mapGetters(['configLoaded', 'mapConfig'])
  },
  methods: {
    turn (v) { // 截取天气 多云转小雨取小雨
      return v.split('转')[1]
    },
    restTime () { // 获取里开幕还有多少天
      let setTime = new Date('2019/10/18')
      let nowTime = new Date()
      let restSec = setTime.getTime() - nowTime.getTime()
      let day = parseInt(restSec / (60 * 60 * 24 * 1000))
      let key = day + ''
      this.djsTime = key.split('')
    },
    nowTime () { // 获取当前时间与日期
      let date = new Date()
      this.date = fmtDate.formatDate(date, 'yyyy-MM-dd')
      this.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    }
  },
  watch: {
    configLoaded () {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.nowTime()
    this.restTime()
    if (this.configLoaded) {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
    let that = this
    that.gettime = setInterval(this.nowTime, 1000)
    this.axios({
      method: 'post',
      url: this.$store.state.baseServiceUrl + '/DataService/QueryMoreSafety',
      data: {
        parameterList: [
          {
            DoAction: 'querygiswebdataweatherinfo',
            Conditions: [
              [
                {
                  Column: 'CITYNAME',
                  ColumnDataType: 'NVARCHAR2',
                  Mode: 'IS',
                  Value: '武汉市'
                }
              ]
            ],
            Offset: {
              Start: 0,
              Count: 1
            },
            OrderBy: {
              Column: 'TM',
              Order: 'desc'
            }
          },
          {
            DoAction: 'querygiswebdatapm25citysummary',
            Offset: {
              Start: 0,
              Count: 1
            },
            OrderBy: {
              Column: 'TIME_POINT',
              Order: 'desc'
            }
          }
        ]
      }
    }).then(function (res) {
      that.weatherList = common.convertTable2objects(res.data.QueryMoreSafetyResult[0])[0]
      that.pm = common.convertTable2objects(res.data.QueryMoreSafetyResult[1])[0]
      that.len = that.weatherList.STATEDETAILED.length
      if (that.len > 2) {
        var weatherDetail = that.turn(that.weatherList.STATEDETAILED)
      } else {
        weatherDetail = that.weatherList.STATEDETAILED
      }
      switch (weatherDetail) {
        case '晴':
          that.tq_img = require('../../../static/assets/img/jtzx/d晴.png')
          break
        case '阴':
          that.tq_img = require('../../../static/assets/img/jtzx/d阴.png')
          break
        case '多云':
          that.tq_img = require('../../../static/assets/img/jtzx/d多云.png')
          break
        case '多云转晴':
          that.tq_img = require('../../../static/assets/img/jtzx/d多云转晴.png')
          break
        case '多云转阴':
          that.tq_img = require('../../../static/assets/img/jtzx/d阴.png')
          break
        case '小雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雨.png')
          break
        case '小雨转阴':
          that.tq_img = require('../../../static/assets/img/jtzx/d阴.png')
          break
        case '小雨转中雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雨-中雨.png')
          break
        case '小雨转晴':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雨转晴.png')
          break
        case '中雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d中雨.png')
          break
        case '中雨转小雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雨.png')
          break
        case '中雨转大雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d中雨-大雨.png')
          break
        case '大雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d大雨.png')
          break
        case '大雨转中雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d中雨.png')
          break
        case '大雨转暴雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d大雨-暴雨.png')
          break
        case '暴雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d暴雨.png')
          break
        case '暴雨转大暴雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d暴雨-大暴雨.png')
          break
        case '大暴雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d大暴雨.png')
          break
        case '大暴雨转特大暴雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d大暴雨-特大暴雨.png')
          break
        case '阵雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d阵雨.png')
          break
        case '冻雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d冻雨.png')
          break
        case '雷阵雨':
          that.tq_img = require('../../../static/assets/img/jtzx/d雷阵雨.png')
          break
        case '雨夹雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d雷阵雨.png')
          break
        case '小雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雪.png')
          break
        case '小雪转中雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雪-中雪.png')
          break
        case '中雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d小雪-中雪.png')
          break
        case '中雪装大雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d中到大雪.png')
          break
        case '大雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d大雪.png')
          break
        case '大雪转暴雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d大雪-暴雪.png')
          break
        case '暴雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d暴雪.png')
          break
        case '阵雪':
          that.tq_img = require('../../../static/assets/img/jtzx/d阵雪.png')
          break
        case '霾':
          that.tq_img = require('../../../static/assets/img/jtzx/d霾.png')
          break
        case '沙尘暴':
          that.tq_img = require('../../../static/assets/img/jtzx/d沙尘暴.png')
          break
        case '强沙尘暴':
          that.tq_img = require('../../../static/assets/img/jtzx/d强沙尘暴.png')
          break
        case '雾':
          that.tq_img = require('../../../static/assets/img/jtzx/d雾.png')
          break
        case '浮沉':
          that.tq_img = require('../../../static/assets/img/jtzx/d浮沉.png')
          break
        case '扬沙':
          that.tq_img = require('../../../static/assets/img/jtzx/d扬沙.png')
          break
      }
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {
    clearInterval(this.gettime)
  },
  destroyed () { },
  errorCaptured () { }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/set.less";
@import "../../fonts/font2/font2.css";
.jtzx-header {
  width: 100%;
  height: 104 * @px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: url("../../../static/assets/img/jtzx/top.png") no-repeat center
    center;
  background-size: 100% auto;
  .tq {
    height: 54 * @px;
    margin-left: 46 * @px;
    margin-top: 35 * @px;
    float: left;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 25 * @px;
      height: 25 * @px;
      margin-left: 4 * @px;
    }
    .thunder {
      width: 45 * @px;
      height: 54 * @px;
      background: url("../../../static/assets/img/jtzx/thunder.png") no-repeat
        center center;
      background-size: 100% 100%;
    }
    .tqOne {
      width: 32 * @px;
      color: #ffffff;
      font-size: 14 * @px;
      float: left;
      overflow: hidden;
      margin: 0 0 0 8 * @px;
      white-space: nowrap;
    }
    .tqTwo {
      margin-left: 4 * @px;
      color: #ffffff;
      font-size: 14 * @px;
    }
    .wlzs {
      width: 68 * @px;
      height: 24 * @px;
      border-radius: 4 * @px;
      background: #008ae7 url("../../../static/assets/img/jtzx/ly.png")
        no-repeat 4 * @px center;
      margin-left: 7 * @px;
      span {
        font-size: 14 * @px;
        color: white;
        line-height: 24 * @px;
        float: right;
        margin-right: 12 * @px;
      }
    }
  }
  .time {
    width: 100 * @px;
    margin-top: 35 * @px;
    height: 42 * @px;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p:nth-child(1) {
      color: #ffffff;
      font-size: 16 * @px;
      font-weight: bold;
      // margin: 8 * @px 0 0 0;
      color: #4db3df;
      font-family: "Digiface";
      height: 24 * @px;
    }
    p:nth-child(2) {
      color: #d0e3f8;
      font-size: 14 * @px;
      height: 16 * @px;
    }
  }
  .ds {
    float: right;
    margin-right: 92 * @px;
    margin-top: 35 * @px;
    height: 42 * @px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    p {
      color: #d0e3f8;
      span {
        width: 24 * @px;
        margin-left: 2 * @px;
        font-size: 20 * @px;
        font-weight: bold;
        text-align: center;
        line-height: 32 * @px;
        display: inline-block;
        background: url("../../../static/assets/img/jtzx/djs.png") no-repeat
          center center;
        background-size: 100% 100%;
        font-family: "Digiface";
      }
    }
  }
}
</style>
