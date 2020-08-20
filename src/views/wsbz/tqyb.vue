<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:17:44
 -->

<!-- 天气预报 -->
<template>
  <div class='zbqxts-bottom-box'>
    <p class="title">
      <span>天气预报</span>
      <i class="show" @click="openPop"></i>
    </p>
    <ul class='weather'>
      <li v-for="(data,index) in  datas" v-bind:key="data.index">
        <span class="dateweek">{{timeName[index]}}</span>
        <span class="datetime">{{data.TM|fmttqybTime}}</span>
        <img src="../../../static/assets/img/zyjcyzt/d阴.png">
        <span class="dateweather">{{data.WEATHER}}</span>
        <span class="timperaturemin">{{data.TEMPERATUREMIN}}℃~{{data.TEMPERATUREMAX}}℃</span>
      </li>
    </ul>
    <div class="taybPop" v-if="showPop">
      <p class="title">
        <span>天气预报</span>
        <i class="show" @click="closePop"></i>
      </p>
      <div class="address">
        <span>武汉</span>
        <span>{{datastwo[0].TM|fmttqybTime}}</span>
      </div>
      <ul class='weather'>
        <li v-for="(data,index) in  datastwo" v-bind:key="data.index">
          <span class="dateweek">{{timeName[index]}}</span>
          <span class="datetime">{{data.TM|fmttqybTime}}</span>
          <img src="../../../static/assets/img/zyjcyzt/d阴.png">
          <span class="dateweather">{{data.WEATHER}}</span>
          <span class="timperaturemin">{{data.TEMPERATUREMIN}}℃~{{data.TEMPERATUREMAX}}℃</span>
          <span class="wind">{{data.WIND}}级</span>
          <p class="wlzs"><span>{{quality.AQI}} {{quality.QUALITY}}</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import common from '@/utils/common.es'
import fmtDate from '@/utils/formatdate.es'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      datas: '',
      datastwo: '',
      futureOneDay: '',
      timeName: ['今天', '明天', 0, 0, 0],
      showPop: false,
      quality: []
    }
  },
  props: [],
  computed: {
    ...mapState(['popkey'])
  },
  methods: {
    initdata () {
      let that = this
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': 'querygiswebdatapm25citysummary',
            Offset: {
              Start: 0,
              Count: 1
            },
            OrderBy: {
              Column: 'TIME_POINT',
              Order: 'desc'
            }
          }
        }
      }).then(res => {
        console.log('风向-----------')
        console.log(res)
        that.quality = common.convertTable2objects(res.data.QuerySafetyResult)[0]
      })
    },
    _load (request) {
      return this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', request)
    },
    openPop () {
      this.showPop = !this.showPop
      this.$store.commit('setPoptqyb', this.showPop)
      this.$store.commit('setPopkey', false)
      this.$store.commit('setPopwsbz', false)
    },
    closePop () {
      this.$store.commit('setPoptqyb', false)
    }
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.showPop = this.popkey.tqyb
      },
      immediate: true,
      deep: true
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.initdata()
    this.showPop = this.popkey.tqyb
    let time = new Date()
    let obj = new Date(time.getTime())
    this.futureOneDay = obj.getFullYear() + '-' + (obj.getMonth() + 1 > 9 ? obj.getMonth() + 1 : '0' + (obj.getMonth() + 1)) + '-' + (obj.getDate() > 9 ? obj.getDate() : '0' + obj.getDate()) // 未来第一天
    let requestdata = {
      parameter: {
        DoAction: 'querygiswebdataweathercityt',
        Conditions: [
          [
            {
              Column: 'TYPE',
              ColumnDataType: 'string',
              Mode: 'IS',
              Value: 1
            },
            {
              Column: 'TM',
              ColumnDataType: 'DateTime',
              Mode: 'GTE', // 大于或等于
              Value: this.futureOneDay
            }
          ]
        ],
        OrderBy: {
          Column: 'TM',
          Order: 'asc'
        },
        token: 'string'
      }
    }
    this._load(requestdata).then(res => {
      console.log('未来三天天气预报-------------------')
      console.log(res)
      this.datas = common.convertTable2objects(res.data.QuerySafetyResult).splice(0, 3)
      this.datastwo = common.convertTable2objects(res.data.QuerySafetyResult).splice(0, 5)
      for (let i = 2; i < this.datastwo.length; i++) {
        let ww = fmtDate.convertDbDate(this.datastwo[i].TM, 'z')
        this.$set(this.timeName, i, ww)
      }
      console.log(this.datastwo)
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
* {
  margin: 0;
  padding: 0;
}
.zbqxts-bottom-box {
  width: 414 * @px;
  height: 234 * @px;
  border-radius: 5 * @px;
  // overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  position: relative;
}
.weather {
  width: 100%;
  list-style: none;
}
.weather > li {
  width: 120 * @px;
  height: 164 * @px;
  background: white;
  border-radius: 5 * @px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 36 * @px;
  box-sizing: border-box;
  margin: 15 * @px 0 0 14 * @px;
  box-shadow: 0 0 * @px 15 * @px #d4f0fb;
}
.weather > li > img {
  width: 58 * @px;
  height: 50 * @px;
  text-align: center;
  vertical-align: middle;
}
.weather > li > span {
  display: block;
  text-align: center;
}
.state {
  color: #b2b2b2;
}
.title {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40 * @px;
  background: url("../../../static/assets/img/newzyjcyzt/headbg.png") center
    center;
  border-top-left-radius: 5 * @px;
  border-top-right-radius: 5 * @px;
  span {
    line-height: 40 * @px;
    text-indent: 14 * @px;
    color: #fff;
    font-weight: bold;
    font-size: 18 * @px;
  }
}
.show {
  display: inline-block;
  width: 10 * @px;
  height: 18 * @px;
  background: url("../../../static/assets/img/wsbz/more.png") no-repeat center
    center;
  background-size: 100% 100%;
  margin-left: 300 * @px;
  cursor: pointer;
}
.weather > li > span {
  font-size: 16 * @px;
  color: #4d4d4d;
}
.dateweek {
  font-size: 16 * @px;
  height: 28 * @px;
}
.datetime {
  height: 28 * @px;
  overflow: hidden;
}
.dateweather {
  font-size: 16 * @px;
  height: 28 * @px;
}
// 弹框样式
.taybPop {
  position: absolute;
  left: 428px;
  top: 40px;
  width: 700 * @px;
  height: 310 * @px;
  background: white;
  border-radius: 5 * @px;
  box-sizing: border-box;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
}
.address {
  padding-left: 14 * @px;
  padding-top: 4 * @px;
  span:nth-child(1) {
    width: 40 * @px;
    display: inline-block;
    font-size: 16 * @px;
    font-weight: bold;
    border-right: 1px solid #ccccce;
  }
  span:nth-child(2) {
    display: inline-block;
    font-size: 14 * @px;
    margin-left: 2 * @px;
  }
}
.taybPop > .title > i {
  cursor: pointer;
  display: inline-block;
  width: 14 * @px;
  height: 14 * @px;
  background: url("../../../static/assets/img/wsbz/x.png") no-repeat center
    center;
  background-size: 100% 100%;
  margin-left: 585 * @px;
}
.taybPop > .weather {
  width: 100%;
  height: 216 * @px;
  list-style: none;
  margin-top: 8 * @px;
  li {
    width: 120 * @px;
    height: 222 * @px;
    background: white;
    border-radius: 5 * @px;
    float: left;
    box-sizing: border-box;
    margin: 0 0 0 17 * @px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 * @px 15 * @px #d4f0fb;
    .timperaturemin {
      font-size: 16 * @px;
      height: 24 * @px;
    }
    .wind {
      font-size: 16 * @px;
      height: 18 * @px;
    }
  }
}
.wlzs {
  width: 68 * @px;
  height: 24 * @px;
  border-radius: 4 * @px;
  margin-top: 8 * @px;
  background: #41c057 url("../../../static/assets/img/zyjcyzt/d阴.png")
    no-repeat 4 * @px center;
  background-size: 30% 40%;
  span {
    font-size: 14 * @px;
    color: white;
    line-height: 24 * @px;
    float: right;
    margin-right: 8 * @px;
  }
}
</style>
