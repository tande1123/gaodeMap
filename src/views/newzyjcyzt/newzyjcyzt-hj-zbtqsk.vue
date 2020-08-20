<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:14:07
 -->

<!--环境  天气实况-->
<template>
  <div class="tqskBox">
    <p class="title">天气实况
      <span class="time">{{date}} {{time}}</span>
    </p>
    <div class="innerBox">
      <div class="infoBox">
        <div class="leftinfo">
          <p class="leftinfotitle">空气质量指数</p>
          <div class="infoimgbox">
            <p class="kqzs">{{zywrw.AQI}}</p>
            <p class="kxzl">{{zywrw.QUALITY}}</p>
          </div>
        </div>
        <div class="rightbox">
          <p class="righttitle">主要污染物</p>
          <div class="sjxs">
            <p v-for="(wrw, index) in 6" :key="index" class="list">
              <span class="sjxxname">{{wrwlist[index][0]}}</span>
              <span class="jdtbox">
                <b class="jd" :class="classObject(zywrw[list[index][0]])" :style="{width: (zywrw[list[index][0]]*100/300)+'%' }"></b>
              </span>
              <span class="number">{{zywrw[list[index][0]]}}</span>
            </p>
          </div>
        </div>
        <!-- 指标 -->
        <div class="zsbbox">
          <img src="../../../static/assets/img/newzyjcyzt/zst.png">
          <ul class="zsbnumber">
            <li>0</li>
            <li>50</li>
            <li>100</li>
            <li>150</li>
            <li>200</li>
            <li>300</li>
            <li>500</li>
          </ul>
        </div>
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
      wrwlist: [['PM2.5', 13], ['PM10', 11], ['NO2', 5], ['SO2', 16], ['CO', 3], ['O3', 7]],
      zywrw: [],
      list: [['PM2_5'], ['PM10'], ['NO2'], ['SO2'], ['CO'], ['O3']],
      date: '',
      time: '',
      gettime: ''
    }
  },
  computed: {
  },
  methods: {
    _load () {
      let request = {
        parameter: {
          DoAction: 'querygiswebdatapm25citysummary',
          Offset: {
            Start: 0,
            Count: 1
          },
          OrderBy: {
            Column: 'TIME_POINT',
            Order: 'desc'
          }
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', request).then(
        res => {
          console.log('空气质量指数----------------')
          console.log(res)
          this.zywrw = common.convertTable2objects(res.data.QuerySafetyResult)[0]
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    classObject (aqi) {
      let tclassname = ''
      for (let i = 50, j = 1; i < 350; i = i + 50, j++) { // 判断污染等级返回对应渐变效果
        if (aqi < i) {
          tclassname = 'kqzl' + j + '  jd'
          break
        }
      }
      return tclassname
    },
    nowTime () { // 获取当前时间与日期
      let date = new Date()
      this.date = fmtDate.formatDate(date, 'yyyy-MM-dd')
      this.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    }
  },
  watch: {},
  mounted () {
    this._load()
    this.nowTime()
    this.gettime = setInterval(this.nowTime, 1000)
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.tqskBox {
  height: 270 * @px;
  width: 414 * @px;
  background: #fff;
  border-radius: 5 * @px;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
}
.title {
  height: 40 * @px;
  line-height: 40 * @px;
  color: #fff;
  background: url("../../../static/assets/img/newzyjcyzt/headbg.png") center
    100% no-repeat;
  font-size: 18 * @px;
  font-weight: bold;
  text-indent: 13 * @px;
  overflow: hidden;
  letter-spacing: 2 * @px;
  span {
    letter-spacing: 1 * @px;
  }
}
.time {
  font-size: 14 * @px;
  font-weight: 400;
  float: right;
  margin-right: 14 * @px;
  overflow: hidden;
}
.innerBox {
  width: 414 * @px;
  height: 230 * @px;
  padding: 14 * @px;
  box-sizing: border-box;
}
.infoBox {
  width: 100%;
  height: 174 * @px;
}
.leftinfo {
  width: 132 * @px;
  height: 100%;
  float: left;
  position: relative;
}
.rightbox {
  height: 100%;
  margin-left: 132 * @px;
  padding-left: 30 * @px;
  box-sizing: border-box;
}
.leftinfotitle {
  text-align: left;
  font-size: 16 * @px;
  height: 16 * @px;
  line-height: 16 * @px;
  width: 100%;
  overflow: hidden;
}
.infoimgbox {
  width: 132 * @px;
  height: 132 * @px;
  background: url("../../../static/assets/img/newzyjcyzt/kqzl98.png") no-repeat
    center;
  background-size: 100% 100%;
  position: absolute;
  bottom: 12 * @px;
}
.kqzs {
  color: #ffad00;
  font-size: 38 * @px;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  text-align: center;
  height: 38 * @px;
  line-height: 38 * @px;
  position: absolute;
  top: 50%;
  margin-top: -32 * @px;
}
.kxzl {
  text-align: center;
  font-size: 16.8 * @px;
  color: #333;
  position: absolute;
  width: 100%;
  bottom: 31 * @px;
  height: 16.8 * @px;
}
.righttitle {
  text-align: left;
  font-size: 16 * @px;
  overflow: hidden;
  height: 16 * @px;
  line-height: 16 * @px;
}
.sjxs {
  width: 225 * @px;
  height: 130 * @px;
  margin-top: 15 * @px;
}
.sjxxname {
  width: 58 * @px;
  font-size: 14 * @px;
  line-height: 22 * @px;
  display: inline-block;
}
.list {
  height: 22 * @px;
  line-height: 22 * @px;
}
.jdtbox {
  display: inline-block;
  height: 6 * @px;
  width: 100 * @px;
  background: #dde9f6;
  border-radius: 3 * @px;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
}
.number {
  padding-left: 1 * @px;
  font-size: 16 * @px;
}
.jd {
  height: 6 * @px;
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  border-radius: 3 * @px;
  background: #0a7bc7;
}
.zsbbox {
  width: 100%;
  height: 28 * @px;
  position: relative;
}
.zsbbox > img {
  position: absolute;
  width: 100%;
  height: 8 * @px;
  top: 0;
  left: 0;
}
.zsbnumber {
  width: 100%;
  height: 14 * @px;
  line-height: 14 * @px;
  text-align: justify;
  text-align-last: justify;
  list-style: none;
  position: absolute;
  bottom: 0;
}
.zsbnumber > li {
  display: inline-block;
}
/* 进度条渐变样式 */
.kqzl1 {
  background: -webkit-linear-gradient(left, #0fbe75, #53f87f) !important;
  background: -o-linear-gradient(left, #0fbe75, #53f87f) !important;
  background: -moz-linear-gradient(left, #0fbe75, #53f87f) !important;
  background: linear-gradient(left, #0fbe75, #53f87f) !important;
}
.kqzl2 {
  background: -webkit-linear-gradient(left, #e2c817, #ffb800) !important;
}
.kqzl3 {
  background: -webkit-linear-gradient(left, #ff9c00, #ff6900) !important;
}
.kqzl4 {
  background: -webkit-linear-gradient(left, #e7001c, #cd0017) !important;
}
.kqzl5 {
  background: -webkit-linear-gradient(left, #b00016, #93032c) !important;
}
.kqzl6 {
  background: -webkit-linear-gradient(left, #94022b, #7c0549) !important;
}
</style>
