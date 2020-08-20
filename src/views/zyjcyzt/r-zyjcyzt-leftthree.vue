<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:18:38
 -->

<!--专业监测一张图 左侧第三模块 -->
<template>
  <div class="leftthree">
    <div class="tq">
      <h3>天气预报</h3>
      <div class="weather">
        <ul class="weatherBox">
          <li>
            <p>{{rqyf[0]}} {{xqWeek[0]}}</p>
          </li>
          <li class="details">
            <p>{{weatherList[3]}} ~ {{weatherList[4]}}℃</p>
            <p>{{weatherList[7]}}</p>
            <p>89 良</p>
            <p>{{ yuJingList[6]}}预警</p>
          </li>
          <li class="details2">
            <p>东南风 3级</p>
            <p>湿度 76%</p>
            <p>气压 1024hpa</p>
          </li>
        </ul>
      </div>
      <div class="weatherBox2">
        <div class="weatherBox2left">
          <p>{{rqyf[1]}} {{xqWeek[1]}}</p>
          <p>{{weatherList2[3]}} ~ {{weatherList2[4]}}℃</p>
          <div>
            <p>{{weatherList2[7]}}</p>
            <p>89 良</p>
          </div>
        </div>
        <div class="weatherBox2right">
          <p>{{rqyf[2]}} {{xqWeek[2]}}</p>
          <p>{{weatherList3[3]}} ~ {{weatherList3[4]}}℃</p>
          <div>
            <p>{{weatherList3[7]}}</p>
            <p>89 良</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      weatherList: [],
      weatherList2: [],
      weatherList3: [],
      rqyf: [],
      xqWeek: [],
      yuJingList: []
    }
  },
  computed: {
  },
  methods: {
    loadData () {
      // this.$store
      //   .dispatch('getTableBySql', { tag: 'WEATHER_FORECAST_NOW' })
      //   .then(res => {
      //     console.log(res)
      //     if (res && res.length > 0) this.today = res[0]
      //   })
      // this.$store
      //   .dispatch('getTableBySql', { tag: 'AQI_STATION' })
      //   .then(res => {
      //     console.log(res)
      //     let arr = res.sort((a, b) => b.AQI - a.AQI)
      //     this.airdata = arr
      //     this.statisticsData(arr)
      //   })
      let that = this
      this.axios({// 异步请求武汉市三天天气
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
              'Count': 3
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
        that.weatherList2 = res.data.QuerySafetyResult.Values[1]
        that.weatherList3 = res.data.QuerySafetyResult.Values[2]
      })
      this.axios({// 异步请求武汉市预警
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': 'querygiswebdatadisaster',
            'Conditions': [
              [
                {
                  'Column': 'STATIONNAME',
                  'ColumnDataType': 'string',
                  'Mode': 'LIKE',
                  'Value': '武汉市'
                }
              ]
            ],
            'Offset': {
              'Start': 0,
              'Count': 1
            },
            'OrderBy': {
              'Column': 'ISSUETIME',
              'Order': 'desc'
            }
          }
        }
      }).then(function (res) {
        console.log(res)
        that.yuJingList = res.data.QuerySafetyResult.Values[0]
      })
    },
    // statisticsData (data) {
    //   let station = 0
    //   let total = 0
    //   let comment = []
    //   data.forEach(element => {
    //     if (element.TYPE_POINT === '国控点') {
    //       station++
    //       total += element.AQI
    //       let i = Math.floor(element.AQI / 50)
    //       comment[i] = {
    //         primary_pollutant: element.PRIMARY_POLLUTANT,
    //         health_tip: element.HEALTH_TIP,
    //         recommended_measure: element.RECOMMENDED_MEASURE
    //       }
    //     }
    //   })
    //   let time = data[0] ? data[0].TIME_POINT : new Date()
    //   let num = Math.floor(total / station)
    //   let qa = ['优', '良', '轻度', '中度', '重度', '有毒']
    //   let index = Math.floor(num / 50)
    //   let level = index > qa.length - 1 ? qa.length - 1 : index
    //   let name = qa[level]
    //   let tips = comment[level]
    //   this.currentair = { num, level, name, time, tips }
    // }
    timer () { // 获取未来三天对应月份日期以及星期几
      let that = this
      let date = new Date()
      let timeList = [date.getMonth() + 1 + '月' + date.getDate() + '日']
      for (let i = 1; i <= 2; i++) {
        timeList.push(date.getMonth() + 1 + '月' + (date.getDate() * 1 + i * 1) + '日')
      }
      that.rqyf = timeList
      let week = []
      let weekList = []
      for (let i = 0; i <= 2; i++) {
        week.push(date.getFullYear() + '/' + date.getMonth() + 1 + '/' + (date.getDate() * 1 + i * 1))
      }
      for (let i = 0; i <= 2; i++) {
        var dateObject = new Date(week[i])
        switch (dateObject.getDay()) {
          case 1:
            weekList.push('周一')
            break
          case 2:
            weekList.push('周二')
            break
          case 3:
            weekList.push('周三')
            break
          case 4:
            weekList.push('周四')
            break
          case 5:
            weekList.push('周五')
            break
          case 6:
            weekList.push('周六')
            break
          case 0:
            weekList.push('周日')
            break
        }
      }
      that.xqWeek = weekList
    }
  },
  watch: {

  },
  mounted () {
    this.loadData()
    this.timer()
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
  margin-top: 49 * @px;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius:5 * @px;
  -ms-border-radius:5 * @px;
  -o-border-radius:5 * @px;
  background: white;
}
.tq {
  width: 414 * @px;
  height: 364 * @px;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius:5 * @px;
  -ms-border-radius:5 * @px;
  -o-border-radius:5 * @px;
}
.tq > h3 {
  padding-left: 10 * @px;
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
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.weather {
  width: 386 * @px;
  margin: 30 * @px 0 0 14 * @px;
  border-radius:5*@px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius:5 * @px;
  -ms-border-radius:5 * @px;
  -o-border-radius:5 * @px;
  box-shadow: 0 0 10px #999;
  -webkit-box-shadow: 0 0 8px #999;
  -moz-box-shadow: 0 0 8px #999;
  -ms-box-shadow: 0 0 8px #999;
  -o-box-shadow: 0 0 8px #999;
   background: white;
}
.weatherBox > li:nth-child(1) p {
  line-height: 44 * @px;
  color: #999999;
  font-size: 16 * @px;
  margin-left: 12 * @px;
  font-weight: bold;
}
.details {
  width: 100%;
  display: flex;
  display: box;
  display: -webkit-box;
  display:-webkit-flex;
  display:-moz-box;
  display:-ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
}
.details > p:nth-child(1) {
  font-size: 36 * @px;
  line-height: 36 * @px;
  color: #0a7bc7;
  margin-left: 15 * @px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-align: center;
}
.details > p:nth-child(2) {
  width: 32*@px;
  text-align: center;
  font-size: 16 * @px;
  line-height: 16 * @px;
  color: #0a7bc7;
  font-weight: bold;
  margin: 20 * @px 0 0 6 * @px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.details > p:nth-child(3) {
  width: 80 * @px;
  height: 20 * @px;
  border-radius: 10 * @px;
  -webkit-border-radius: 10 * @px;
  -moz-border-radius:10 * @px;
  -ms-border-radius:10* @px;
  -o-border-radius:10 * @px;
  font-size: 14 * @px;
  text-align: center;
  padding-left: 24 * @px;
  line-height: 20 * @px;
  color: white;
  font-weight: bold;
  background: #edaa31 url("../../../static/assets/img/zyjcyzt/yz.png") no-repeat
    10 * @px center;
  margin: 14 * @px 0 0 6 * @px;
}
.details > p:nth-child(4) {
  width: 80 * @px;
  height: 20 * @px;
  border-radius: 10 * @px;
  -webkit-border-radius: 10 * @px;
  -moz-border-radius:10 * @px;
  -ms-border-radius:10* @px;
  -o-border-radius:10 * @px;
  font-size: 14 * @px;
  text-align: center;
  line-height: 20 * @px;
  color: white;
  font-weight: bold;
  background: #f6541b;
  margin: 14 * @px 0 0 6 * @px;
}

.details2 {
  width: 100%;
  display: flex;
  display: box;
  display: -webkit-box;
  display:-webkit-flex;
  display:-moz-box;
  display:-ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  margin-top: 10 * @px;
  overflow: hidden;
}
.details2 > p {
  width: 33.33%;
  font-size: 14 * @px;
  margin-bottom: 10 * @px;
  overflow: hidden;
}
.details2 > p:nth-child(1) {
  background: url("../../../static/assets/img/zyjcyzt/fx.png") 20 * @px center
    no-repeat;
  padding-left: 34 * @px;
}
.details2 > p:nth-child(2) {
  width: 33%;
  background: url("../../../static/assets/img/zyjcyzt/sd.png") 10 * @px center
    no-repeat;
  padding-left: 30 * @px;
}
.details2 > p:nth-child(3) {
  width: 36%;
  background: url("../../../static/assets/img/zyjcyzt/qy.png") 0 * @px center
    no-repeat;
  padding-left: 20 * @px;
}
.weatherBox2 {
  width: 414 * @px;
  overflow: hidden;
  height: 175 * @px;
}
.weatherBox2 > div {
  float: left;
  border-radius:5*@px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius:5 * @px;
  -ms-border-radius:5 * @px;
  -o-border-radius:5 * @px;
  box-shadow: 0 0 10px #999;
  -webkit-box-shadow: 0 0 10px #999;
  -moz-box-shadow: 0 0 10px #999;
  -ms-box-shadow: 0 0 10px #999;
  -o-box-shadow: 0 0 10px #999;
  background:white;
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
  text-overflow:ellipsis;
  white-space: nowrap;
}
.weatherBox2left > p:nth-child(2) {
  font-size: 36 * @px;
  line-height: 36 * @px;
  color: #0a7bc7;
  margin-left: 15 * @px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.weatherBox2left > div {
  display: flex;
  display: box;
  display: -webkit-box;
  display:-webkit-flex;
  display:-moz-box;
  display:-ms-flexbox;
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
  text-overflow:ellipsis;
  white-space: nowrap;
}
.weatherBox2left > div > p:nth-child(2) {
  font-size: 12 * @px;
  width: 68 * @px;
  height: 20 * @px;
  border-radius: 19 * @px;
  -webkit-border-radius: 19 * @px;
  -moz-border-radius:19 * @px;
  -ms-border-radius:19 * @px;
  -o-border-radius:19 * @px;
  background: #edaa31 url("../../../static/assets/img/zyjcyzt/yz.png") no-repeat
    5 * @px center;
  text-align: center;
  color: white;
 padding-left:15*@px;
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
  display:-webkit-flex;
  display:-moz-box;
  display:-ms-flexbox;
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
  text-overflow:ellipsis;
  white-space: nowrap;
}
.weatherBox2right > p:nth-child(2) {
  font-size: 36 * @px;
  line-height: 36 * @px;
  color: #0a7bc7;
  margin-left: 15 * @px;
  overflow: hidden;
  text-overflow:ellipsis;
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
  text-overflow:ellipsis;
  white-space: nowrap;
}
.weatherBox2right > div > p:nth-child(2) {
  font-size: 12 * @px;
  width: 68 * @px;
  height: 20 * @px;
  border-radius: 19 * @px;
  -webkit-border-radius: 19 * @px;
  -moz-border-radius:19 * @px;
  -ms-border-radius:19 * @px;
  -o-border-radius:19 * @px;
  background: #edaa31 url("../../../static/assets/img/zyjcyzt/yz.png") no-repeat
    5 * @px center;
  text-align: center;
  color: white;
  padding-left:15*@px;
}
</style>
