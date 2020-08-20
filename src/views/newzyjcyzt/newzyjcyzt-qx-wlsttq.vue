<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:15:32
 -->

<!--气象  未来三天天气预报-->
<template>
  <div class='zbqxts-bottom-box'>
    <p class='title'>未来三天天气预报</p>
    <ul class='weather'>
      <li v-for="data in  datas" v-bind:key="data.index">
        <span class="datetime">{{loadDateNow(data.TIME_DAY) | fmtLstqTime}}</span>
        <span>{{data.DICT_NAME}}</span>
        <img :src="'./static/assets/img/newzyjcyzt/'+('d'+data.DICT_NAME)+'.png'">
        <span>{{parseInt(data.TMIN24)}}~{{parseInt(data.TMAX24)}}°</span>
        <img :src="'./static/assets/img/newzyjcyzt/'+('d'+data.DICT_NAME)+'.png'">
        <span class="meteorological">{{data.DICT_NAME}}</span>
        <span class="wind">{{data.TEN_UV24_DIR*1 | getFx}}风{{data.TEN_UV24_SPEED}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import common from '@/utils/common.es'
export default {
  data () {
    return {
      datas: ''
    }
  },
  props: [],
  computed: {
  },
  methods: {
    _load (request) {
      return this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', request)
    },
    initData () {
      let requestdata = {
        parameter: {
          DoAction: 'querywea7dayaction',
          Offset: {
            Start: 0,
            Count: 3
          },
          OrderBy: {
            Column: 'TIME_DAY',
            Order: 'asc'
          },
          token: 'string'
        }
      }
      this._load(requestdata).then(res => {
        // console.log('未来三天天气预报-------------------')
        // console.log(res)
        this.datas = common.convertTable2objects(res.data.QuerySafetyResult)
      })
    },
    // 时间格式转换
    loadDateNow (value) {
      // 格式化日期字符串解决IE兼容
      let str = value.substring(0, 4)
      let str2 = value.substring(4, 6)
      let str3 = value.substring(6, 8)
      let all = str + '/' + str2 + '/' + str3
      return all
    }
  },
  watch: {
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
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
* {
  margin: 0;
  padding: 0;
}
.zbqxts-bottom-box {
  width: 414 * @px;
  height: 342 * @px;
  border-radius: 5 * @px;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
}
.weather {
  width: 100%;
  list-style: none;
  height: 326 * @px;
}
.weather > li {
  width: 120 * @px;
  height: 270 * @px;
  background: url("../../../static/assets/img/newzyjcyzt/lstqbg.png") center
    no-repeat;
  border-radius: 5 * @px;
  float: left;
  line-height: 36 * @px;
  box-sizing: border-box;
  margin: 15 * @px 0 0 14 * @px;
  text-align: center;
  color: #ffffff;
}
.weather > li > img {
  max-width: 30 * @px;
  max-height: 30 * @px;
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
  height: 40 * @px;
  background: url("../../../static/assets/img/newzyjcyzt/headbg.png") center
    center;
  line-height: 40 * @px;
  text-indent: 14 * @px;
  color: #fff;
  font-weight: bold;
  font-size: 18 * @px;
  letter-spacing: 2 * @px;
}
.weather > li > span {
  font-size: 16 * @px;
}
.wind {
  font-size: 14 * @px !important;
  height: 14 * @px;
  line-height: 14 * @px;
  margin-top: 32 * @px;
}
.datetime {
  text-align: justify;
  text-justify: inter-ideograph;
  height: 44 * @px;
  overflow: hidden;
  margin-top: 4 * @px;
}
.meteorological {
  height: 16 * @px;
  line-height: 16 * @px;
  overflow: hidden;
  margin-top: 0;
}
</style>
