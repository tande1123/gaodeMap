<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:13:15
 -->
<!--专业监测一张图 头部 -->
<template>
  <header class="toptitle">
    <div class="hearderbj">
      <div class="tq">
        <img :src="'./static/assets/img/newzyjcyzt/'+('d'+weatherList.STATEDETAILED)+'.png'" alt="">
        <p class="tqOne" v-if="len>2">{{turn(weatherList.DICT_NAME)}}</p>
        <p class="tqOne" v-else>{{weatherList.DICT_NAME}}</p>
        <p class="tqTwo">{{parseInt(weatherList.AIRTEMP_MIN_VALUE)}}~{{Math.ceil(weatherList.AIRTEMP_MAX_VALUE)}}℃</p>
      </div>
      <div class="time1">
        <p>{{time}}</p>
        <p>{{date}}</p>
      </div>
    </div>
    <a :href="Return_fhsyUrl">
      <img src="../../../static/assets/img/newzyjcyzt/back.png" alt="" class="toptitlea">
      <p class="fanhui">返回</p>
    </a>
  </header>
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
      Return_fhsyUrl: '',
      len: ''
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
    initData () { // 数据请求
      let that = this
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            DoAction: 'queryweanowaction'
          }
        }
      }).then(function (res) {
        that.weatherList = common.convertTable2objects(res.data.QuerySafetyResult)[0]
      })
    },
    getDayTime () {
      let that = this
      let date = new Date() // 进入页面不延迟显示时间
      that.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
      that.date = fmtDate.formatDate(date, 'yyyy年MM月dd日')
      that.gettime = setInterval(() => {
        let date = new Date()
        that.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
      }, 1000)
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
    if (this.configLoaded) {
      this.Return_fhsyUrl = this.mapConfig.misConfig.Return_fhsyUrl
    }
    this.getDayTime()
    this.initData()
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
  background: url("../../../static/assets/img/newzyjcyzt/zyjcyzt_02.png")
    no-repeat center center;
  background-size: 100% auto;
  -webkit-background-size: 100% auto;
  -moz-background-size: 100% auto;
  -ms-background-size: 100% auto;
  -o-background-size: 100%;
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
  -o-transform: 0.8s;
}
.toptitlea:hover {
  opacity: 0.9;
  cursor: pointer;
}
.fanhui {
  width: 55 * @px;
  height: 40 * @px;
  text-align: center;
  display: block;
  z-index: 99;
  position: absolute;
  top: 35 * @px;
  right: 30 * @px;
  color: white;
  font-size: 16 * @px;
  font-weight: bold;
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
  margin: 10 * @px 0 0 26 * @px;
  position: absolute;
  left: 0;
  top: 0 * @px;
}
.tqOne {
  width: 30%;
  margin: 40 * @px 0 0 2 * @px;
  color: #ffffff;
  font-size: 14 * @px;
  float: left;
  overflow: hidden;
  // text-overflow:ellipsis;
  white-space: nowrap;
}
.tqTwo {
  margin: 40 * @px 0 0 35 * @px;
  color: #ffffff;
  font-size: 14 * @px;
}
.time1 {
  // width: 124 * @px;
  // height: 70 * @px;
  float: right;
  margin-right: 50 * @px;
  color: #fff;
  font-size: 0.4375rem;
  line-height: 0.5rem;
  height: 0.5rem;
  padding-left: 8px;
  font-family: Digiface;
  text-align: center;
}
.time1 > p:nth-child(1) {
  color: #ffffff;
  font-size: 28 * @px;
  margin: 8 * @px 0 0 0;
  line-height: 32 * @px;
  height: 32 * @px;
  padding-left: 44 * @px;
  font-family: "Digiface";
}
.time1 > p:nth-child(2) {
  color: #ffffff;
  font-size: 16 * @px;
  padding-left: 12 * @px;
  margin-top: 2 * @px;
  text-align: center;
}
</style>
