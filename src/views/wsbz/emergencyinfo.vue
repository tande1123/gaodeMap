<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->

<!--基础数据一张图 底部告警信息-->
<template>
  <div>
    <div class="footerbox">
      <span>
        <img v-show="lampOn" src="../../../static/assets/img/wsbz/lampOn.png">
        <img v-show="!lampOn" src="../../../static/assets/img/wsbz/lampOn.png">
        <p class="time-box">
          <span>{{date}}</span>
          <span class="time">{{time}}</span>
        </p>
      </span>
      <div class="info">
        <p class="gundongList">
          <span>{{disaster}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import common from '../../utils/common.es'
export default {
  data () {
    return {
      lampOn: true, // 控制警报灯亮 灭
      date: '',
      time: '',
      gettime: '',
      meteorologyData: '',
      disaster: ''
    }
  },
  filters: {
    fmtStr (v) {
      let str = v
      let index = str.search(/预警信息来源/)
      if (index > 0) {
        str = str.substr(0, index - 1)
      }
      return str
    }
  },
  props: [],
  computed: {},
  methods: {

    // 时间格式转换
    loadDateNow (value) {
      // 格式化日期字符串解决IE兼容
      let unittime = (value + '').replace(/-/g, '/')
      let date = new Date(unittime)
      let timestr = date.getFullYear() + '' + this.addNum(date.getMonth() + 1) + '' + this.addNum(date.getDate()) + '' + this.addNum(date.getHours()) + '' + this.addNum(date.getMinutes()) + '' + this.addNum(date.getSeconds())
      return timestr
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
    addNum (num) {
      return num < 10 ? '0' + num : num
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let vmthis = this
    this.gettime = setInterval(() => {
      let date = new Date()
      vmthis.date = date.getFullYear() + '/' + (date.getMonth() * 1 + 1) + '/' + date.getDate()
      vmthis.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    }, 1000)
    let requestdata = { // 预提交数据
      parameter: {
        DoAction: 'queryweawarningaction'// 天气预警
      },
      token: 'string'
    }
    this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', requestdata).then(res => {
      let warnWeather = common.convertTable2objects(res.data.QuerySafetyResult) // 预警数据
      let currentTime = this.getCurrentTime()
      let StopTime = this.loadDateNow(warnWeather[0].WARN_DATE_TO)
      if (this.CompareDate(currentTime, StopTime)) {
        this.disaster = '今日无天气预警信息'
      } else {
        this.disaster = warnWeather[0].EVENTTYPENAME + ',' + warnWeather[0].NAME + ',来源：' + warnWeather[0].SENDWAY + ',发布时间：' + warnWeather[0].WARN_DATE_FROM + ',结束时间：' + warnWeather[0].WARN_DATE_TO
      }
    }).catch(err => {
      console.log(err)
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {
    clearInterval(this.gettime)
    console.log('清除计时器')
  },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.footerbox {
  height: 42 * @px;
  width: 100%;
  background: rgba(243, 71, 71, 0.7);
  text-align: center;
  color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 42 * @px;
}
.footerbox > span {
  display: block;
  position: absolute;
  width: 270 * @px;
  height: 42 * @px;
  color: #ffffff;
  background: url("../../../static/assets/img/wsbz/footerInfo.png") no-repeat
    100%;
  left: 0;
  bottom: 0;
}
.footerbox {
  width: 100%;
  height: 42 * @px;
  line-height: 42 * @px;
  font-weight: 700;
}
.footerbox > span > img {
  position: absolute;
  bottom: 0;
  width: 57 * @px;
  height: 55 * @px;
  left: 14 * @px;
}
.time-box {
  margin-left: 64 * @px;
  font-size: 16 * @px;
}

.time {
  margin-left: 10 * @px;
}
.info {
  font-size: 16 * @px;
  font-weight: 600;
  letter-spacing: 2 * @px;
  white-space: nowrap;
  width: 1660 * @px;
  margin-left: 260 * @px;
  box-sizing: border-box;
  overflow: hidden;
}
.info span {
  padding: 0 20 * @px;
}
.gundongList {
  display: inline-block;
  animation: geiwogun 10s linear infinite;
  padding-left: 270 * @px;
  transition: 3s;
}
@keyframes geiwogun {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-50%, 0);
  }
}
</style>
