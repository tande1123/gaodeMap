<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-14 17:16:42
 -->

<!--气象  天气实况 -->
<template>
  <div class="leftthree">
    <div class="tq">
      <h3>天气实况</h3>
      <div class="weather">
        <ul class="weatherBox">
          <li>
            <p style="letter-spacing: 2px;">{{date}} {{time}}</p>
          </li>
          <li class="details">
            <!-- <img :src="'./static/assets/img/newzyjcyzt/'+('d'+weatherList.DICT_NAME)+'.png'" alt=""> -->
            <img :src="imgsrc" alt="">
            <p v-if="len>2">{{turn(weatherList.DICT_NAME)}}</p>
            <p v-else>{{weatherList.DICT_NAME}}</p>
            <p>{{weatherList.AIRTEMP_CURRENT_VALUE}}℃</p>
            <p>{{quality.AQI}} {{quality.QUALITY}}</p>
            <p>{{disaster}}预警</p>
          </li>
          <li class="details2">
            <p>{{weatherList.WIND_CURRENT_DIRVALUE*1 | getFx}}风{{weatherList.WIND_CURRENT_POWERVALUE}}级</p>
            <p>湿度 {{parseInt(weatherList.RH_CURRENT_VALUE)}}</p>
            <p>气压 {{parseInt(weatherList.STAPRESSURE_CURRENT_VALUE)}}hpa</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import common from '@/utils/common.es'
import fmtDate from '@/utils/formatdate.es'
export default {
  data () {
    return {
      weatherList: [],
      quality: [],
      disaster: '',
      len: '',
      date: '',
      time: '',
      gettime: '',
      imgsrc: ''
    }
  },
  computed: {},
  methods: {
    turn (v) { // 截取天气 多云转小雨取小雨
      return v.split('转')[1]
    },
    loadData () {
      let that = this
      let request = {
        parameterList: [
          {
            DoAction: 'queryweanowaction' // 天气
          },
          {
            DoAction: 'queryweawarningaction' // 预警
          },
          {
            DoAction: 'querygiswebdatapm25citysummary', // 空气质量
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
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QueryMoreSafety', request).then(
        res => {
          that.weatherList = common.convertTable2objects(res.data.QueryMoreSafetyResult[0])[0] // 天气数据
          if (that.weatherList.DICT_NAME + '' === '') {
            that.imgsrc = ''
          } else {
            that.imgsrc = './static/assets/img/newzyjcyzt/d' + that.weatherList.DICT_NAME + '.png'
          }
          console.log('that.weatherList', that.weatherList)
          let warnWeather = common.convertTable2objects(res.data.QueryMoreSafetyResult[1])[0] // 预警数据
          let currentTime = that.getCurrentTime()
          let StopTime = that.loadDateNow(warnWeather.WARN_DATE_TO)
          if (that.CompareDate(currentTime, StopTime)) {
            that.disaster = '无'
          } else {
            that.disaster = warnWeather.EVENTTYPENAME
          }
          that.quality = common.convertTable2objects(res.data.QueryMoreSafetyResult[2])[0] // 空气的优良
        }
      )
    },
    // 时间比较
    CompareDate (currentTime, StopTime) {
      if (currentTime > StopTime) {
        return true
      }
      return false
    },
    // 获取当前时间
    getCurrentTime () {
      let date = new Date()
      let timestr = date.getFullYear() + '' + this.addNum(date.getMonth() + 1) + '' + this.addNum(date.getDate()) + '' + this.addNum(date.getHours()) + '' + this.addNum(date.getMinutes()) + '' + this.addNum(date.getSeconds())
      return timestr
    },
    // 时间格式转换
    loadDateNow (value) {
      // 格式化日期字符串解决IE兼容
      let unittime = (value + '').replace(/-/g, '/')
      let date = new Date(unittime)
      let timestr = date.getFullYear() + this.addNum(date.getMonth() + 1) + this.addNum(date.getDate()) + this.addNum(date.getHours()) + this.addNum(date.getMinutes()) + this.addNum(date.getSeconds())
      return timestr
    },
    addNum (num) {
      return num < 10 ? '0' + num : num
    },
    nowTime () { // 获取当前时间与日期
      let date = new Date()
      this.date = fmtDate.formatDate(date, 'yyyy-MM-dd')
      this.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    }
  },
  watch: {},
  mounted () {
    this.loadData()
    this.nowTime()
    this.gettime = setInterval(this.nowTime, 1000)
  },
  beforeDestroy () {
    clearInterval(this.gettime)
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.leftthree {
  width: 414 * @px;
  overflow: hidden;
  box-shadow: 0 0 8px #999;
  -webkit-box-shadow: 0 0 8px #999;
  -moz-box-shadow: 0 0 8px #999;
  -ms-box-shadow: 0 0 8px #999;
  -o-box-shadow: 0 0 8px #999;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
  background: white;
  letter-spacing: 2 * @px;
}
.tq {
  width: 414 * @px;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
}
.tq > h3 {
  padding-left: 14 * @px;
  width: 414 * @px;
  font-size: 18 * @px;
  border-top-left-radius: 5 * @px;
  -webkit-border-top-left-radius: 5 * @px;
  -moz-border-top-left-radius: 5 * @px;
  -ms-border-top-left-radius: 5 * @px;
  -o-border-top-left-radius: 5 * @px;
  border-top-right-radius: 5 * @px;
  -webkit-border-top-right-radius: 5 * @px;
  -moz-border-top-right-radius: 5 * @px;
  -ms-border-top-right-radius: 5 * @px;
  -o-border-top-right-radius: 5 * @px;
  line-height: 40 * @px;
  font-weight: bold;
  color: white;
  background: url("../../../static/assets/img/zyjcyzt/title-bg1.png") no-repeat
    center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
}
.weather {
  width: 386 * @px;
  height: 136 * @px;
  margin-left: 32 * @px;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
  background: white;
}
.weatherBox > li:nth-child(1) p {
  line-height: 44 * @px;
  font-size: 16 * @px;
  font-weight: bold;
}
.details {
  width: 100%;
  display: flex;
  align-items: center;
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  img {
    width: 56 * @px;
    height: 41 * @px;
    vertical-align: 8 * @px;
  }
}
.details p:nth-child(2) {
  width: 50 * @px;
  overflow: hidden;
  // text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 24 * @px;
  color: #0a7bc7;
  margin: 0 5 * @px;
}
.details > p:nth-child(3) {
  font-size: 24 * @px;
  color: #0a7bc7;
  margin: 0 5 * @px;
}
.details > p:nth-child(4) {
  width: 80 * @px;
  height: 20 * @px;
  border-radius: 10 * @px;
  -webkit-border-radius: 10 * @px;
  -moz-border-radius: 10 * @px;
  -ms-border-radius: 10 * @px;
  -o-border-radius: 10 * @px;
  font-size: 14 * @px;
  text-align: center;
  padding-left: 24 * @px;
  line-height: 20 * @px;
  color: white;
  background: #edaa31 url("../../../static/assets/img/zyjcyzt/yz.png") no-repeat
    10 * @px center;
  margin: 0 5 * @px;
}
.details > p:nth-child(5) {
  width: 80 * @px;
  height: 20 * @px;
  border-radius: 10 * @px;
  -webkit-border-radius: 10 * @px;
  -moz-border-radius: 10 * @px;
  -ms-border-radius: 10 * @px;
  -o-border-radius: 10 * @px;
  font-size: 14 * @px;
  text-align: center;
  line-height: 20 * @px;
  color: white;
  background: #f6541b;
  margin-left: 7 * @px;
}

.details2 {
  width: 100%;
  display: flex;
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  margin-top: 5 * @px;
  overflow: hidden;
}
.details2 > p {
  font-size: 14 * @px;
  margin-bottom: 10 * @px;
  overflow: hidden;
}
.details2 > p:nth-child(1) {
  background: url("../../../static/assets/img/zyjcyzt/fx.png") left center
    no-repeat;
  padding-left: 20 * @px;
}
.details2 > p:nth-child(2) {
  background: url("../../../static/assets/img/zyjcyzt/sd.png") left center
    no-repeat;
  padding-left: 15 * @px;
  margin-left: 28 * @px;
}
.details2 > p:nth-child(3) {
  background: url("../../../static/assets/img/zyjcyzt/qy.png") 0 * @px center
    no-repeat;
  padding-left: 20 * @px;
  margin-left: 20 * @px;
}
.weatherBox2 {
  width: 414 * @px;
  overflow: hidden;
  height: 175 * @px;
}
.weatherBox2 > div {
  float: left;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
  box-shadow: 0 0 10px #999;
  -webkit-box-shadow: 0 0 10px #999;
  -moz-box-shadow: 0 0 10px #999;
  -ms-box-shadow: 0 0 10px #999;
  -o-box-shadow: 0 0 10px #999;
  background: white;
  margin-top: 16 * @px;
}
.weatherBox2left {
  width: 180 * @px;
  height: 140 * @px;
  margin-left: 14 * @px;
}
.weatherBox2left > p:nth-child(1) {
  line-height: 44 * @px;
  color: #999999;
  font-size: 16 * @px;
  margin-left: 12 * @px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weatherBox2left > p:nth-child(2) {
  font-size: 36 * @px;
  line-height: 36 * @px;
  color: #0a7bc7;
  margin-left: 15 * @px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weatherBox2left > div {
  display: flex;
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  margin-top: 22 * @px;
}
.weatherBox2left > div > p:nth-child(1) {
  width: 45%;
  text-align: center;
  font-size: 16 * @px;
  line-height: 16 * @px;
  color: #0a7bc7;
  font-weight: bold;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weatherBox2left > div > p:nth-child(2) {
  font-size: 12 * @px;
  width: 68 * @px;
  height: 20 * @px;
  border-radius: 19 * @px;
  -webkit-border-radius: 19 * @px;
  -moz-border-radius: 19 * @px;
  -ms-border-radius: 19 * @px;
  -o-border-radius: 19 * @px;
  background: #edaa31 url("../../../static/assets/img/zyjcyzt/yz.png") no-repeat
    5 * @px center;
  text-align: center;
  color: white;
  padding-left: 15 * @px;
}
.weatherBox2right {
  width: 180 * @px;
  height: 140 * @px;
  margin-left: 26 * @px;
}
.weatherBox2right > div {
  display: flex;
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  margin-top: 22 * @px;
}
.weatherBox2right > p:nth-child(1) {
  line-height: 44 * @px;
  color: #999999;
  font-size: 16 * @px;
  margin-left: 12 * @px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weatherBox2right > p:nth-child(2) {
  font-size: 36 * @px;
  line-height: 36 * @px;
  color: #0a7bc7;
  margin-left: 15 * @px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weatherBox2right > div > p:nth-child(1) {
  width: 45%;
  font-size: 16 * @px;
  line-height: 16 * @px;
  color: #0a7bc7;
  font-weight: bold;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weatherBox2right > div > p:nth-child(2) {
  font-size: 12 * @px;
  width: 68 * @px;
  height: 20 * @px;
  border-radius: 19 * @px;
  -webkit-border-radius: 19 * @px;
  -moz-border-radius: 19 * @px;
  -ms-border-radius: 19 * @px;
  -o-border-radius: 19 * @px;
  background: #edaa31 url("../../../static/assets/img/zyjcyzt/yz.png") no-repeat
    5 * @px center;
  text-align: center;
  color: white;
  padding-left: 15 * @px;
}
</style>
