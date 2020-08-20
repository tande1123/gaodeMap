<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:18:30
 -->

<!--专业监测一张图 头部 -->
<template>
  <header class="toptitle">
    <div class="hearderbj">
      <div class="tq">
        <img :src="tq_img" alt="" ref='tq_img'>
        <p class="tqOne">{{weatherList[7]}}</p>
        <p class="tqTwo">{{weatherList[3]}} ~ {{weatherList[4]}}℃</p>
      </div>
      <div class="time">
        <p>{{time}}</p>
        <p>{{date}}</p>
      </div>
    </div>
    <!-- <router-link tag="li" to="/"> -->
    <a :href="Return_fhsyUrl">
       <img src="../../../static/assets/img/zyjcyzt/back.png" alt="" class="toptitlea" >
      <p class="fanhui">返回首页</p>
    </a>
    <!-- </router-link> -->
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      date: '',
      time: '',
      gettime: '',
      weatherList: [],
      tq_img: '',
      Return_fhsyUrl: ''
    }
  },
  props: [],
  computed: {
    ...mapGetters(['configLoaded', 'mapConfig'])
  },
  methods: {},
  watch: {
    configLoaded () {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    if (this.configLoaded) {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
    let that = this
    let date = new Date()
    let month = date.getMonth() * 1 + 1 * 1 < 9 ? '0' + (date.getMonth() * 1 + 1 * 1) + '月' : (date.getMonth() * 1 + 1 * 1) + '月'
    let day = date.getDate() * 1 + 1 * 1 < 9 ? '0' + (date.getDate() * 1 + 1 * 1) + '日' : (date.getDate() * 1 + 1 * 1) + '日'
    that.date = date.getFullYear() + '年' + month + day
    this.gettime = setInterval(() => {
      that.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    }, 1000)
    this.axios({
      method: 'post',
      url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
      data: {
        parameter: {
          'DoAction': 'querygiswebdataweathercityt',
          'Conditions': [
            null
          ],
          'Offset': {
            'Start': 0,
            'Count': 1
          },
          'OrderBy': {
            'Column': 'TM',
            'Order': 'desc'
          }
        }
      }
    }).then(function (res) {
      console.log(res)
      that.weatherList = res.data.QuerySafetyResult.Values[0]
      switch (that.weatherList[7]) {
        case '晴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d晴.png')
          break
        case '阴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d阴.png')
          break
        case '多云':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d多云.png')
          break
        case '多云转晴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d多云转晴.png')
          break
        case '小雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雨.png')
          break
        case '小雨转阴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d阴.png')
          break
        case '小雨转中雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雨-中雨.png')
          break
        case '小雨转晴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雨转晴.png')
          break
        case '中雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d中雨.png')
          break
        case '中雨转小雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雨.png')
          break
        case '中雨转大雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d中雨-大雨.png')
          break
        case '大雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d大雨.png')
          break
        case '大雨转中雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d中雨.png')
          break
        case '大雨转暴雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d大雨-暴雨.png')
          break
        case '暴雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d暴雨.png')
          break
        case '暴雨转大暴雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d暴雨-大暴雨.png')
          break
        case '大暴雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d大暴雨.png')
          break
        case '大暴雨转特大暴雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d大暴雨-特大暴雨.png')
          break
        case '阵雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d阵雨.png')
          break
        case '冻雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d冻雨.png')
          break
        case '雷阵雨':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d雷阵雨.png')
          break
        case '雨夹雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d雷阵雨.png')
          break
        case '小雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雪.png')
          break
        case '小雪转中雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雪-中雪.png')
          break
        case '中雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d小雪-中雪.png')
          break
        case '中雪装大雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d中到大雪.png')
          break
        case '大雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d大雪.png')
          break
        case '大雪转暴雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d大雪-暴雪.png')
          break
        case '暴雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d暴雪.png')
          break
        case '阵雪':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d阵雪.png')
          break
        case '霾':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d霾.png')
          break
        case '沙尘暴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d沙尘暴.png')
          break
        case '强沙尘暴':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d强沙尘暴.png')
          break
        case '雾':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d雾.png')
          break
        case '浮沉':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d浮沉.png')
          break
        case '扬沙':
          that.tq_img = require('../../../static/assets/img/zyjcyzt/d扬沙.png')
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
@import "../../fonts/font2/font.css";
header {
  width: 100%;
  height: 70 * @px;
  position: fixed;
  top: -1px;
  left: 0;
  z-index: 9;
}
.hearderbj {
  width: 1006 * @px;
  height: 70 * @px;
  background: url("../../../static/assets/img/zyjcyzt/zyjcyzt_02.png") no-repeat
    center center;
  background-size: 100% auto;
  -webkit-background-size: 100% auto;
  -moz-background-size:100% auto;
  -ms-background-size:100% auto;
  -o-background-size:100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
.toptitlea {
  height: 40 * @px;
  display: block;
  z-index: 99;
  position: absolute;
  top: 27 * @px;
  right: 13 * @px;
  transform: 0.8s;
  -webkit-transform: 0.8s;
  -moz-transform: 0.8s;
  -ms-transform: 0.8s;
  -o-transform:0.8s;
}
.toptitlea:hover {
  opacity: 0.9;
  cursor: pointer;
}
.fanhui {
  height: 40 * @px;
  display: block;
  z-index: 99;
  position: absolute;
  top: 35 * @px;
  right: 30 * @px;
  color: white;
  font-size: 14 * @px;
  cursor: pointer;
}
.toptitle {
  height: 70 * @px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.toptitle > p {
  width: 100%;
  height: 70 * @px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 32 * @px;
  color: #ffffff;
  line-height: 70 * @px;
}
.tq {
  width: 95 * @px;
  height: 70 * @px;
  margin-left: 52 * @px;
  float: left;
  position: relative;
}
.tq > img {
  width: 25 * @px;
  height: 25 * @px;
  margin: 10 * @px 0 0 -6*@px;
  position: absolute;
  left: 35*@px;
  top:0*@px
}
.tqOne{
  width: 30%;
  margin: 40 * @px 0 0 2 * @px;
  color: #ffffff;
  font-size: 14 * @px;
  float: left;
  font-weight: bold;
  overflow: hidden;
  // text-overflow:ellipsis;
  white-space: nowrap;
}
.tqTwo{
  margin: 40 * @px 0 0 10 * @px;
  color: #ffffff;
  font-size: 14 * @px;
  float: left;
  font-weight: bold;
}
.time {
  width: 124 * @px;
  height: 70 * @px;
  float: right;
  margin-right: 50 * @px;
}
.time > p:nth-child(1) {
  color: #ffffff;
  font-size: 32 * @px;
  margin: 8 * @px 0 0 0;
  line-height: 32*@px;
  padding-left: 48 * @px;
  font-family: "Digiface";
}
.time > p:nth-child(2) {
  color: #ffffff;
  font-size: 15 * @px;
  font-weight: bolder;
  padding-left: 12 * @px;
  margin-top: 2*@px;
  // padding-bottom: 32 * @px;
}
</style>
