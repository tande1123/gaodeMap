<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:13:32
 -->

<!--环境  各区空气质量排名-->
<template>
  <div class="gekqzlpmbox">
    <p class="title">各区空气质量排名</p>
    <div class="infobox">
      <nav class="navbar">
        <span class="pm">排名</span>
        <span class="dm">地区</span>
        <span class="kqzl">空气质量（单位：μg/m3）</span>
      </nav>
      <div class="tablebox elementsiyou">
        <el-scrollbar class="elscrollbarwrap" style="height:100%">
          <ul>
            <li v-for="(data,index) in datas" :key="index">
              <div class="pmbox"> <span :class="index<3?'spanpm tpm':'spanpm '">{{index+1}}</span></div>
              <div class="dq">{{data.NAME}}</div>
              <div class="linkbox">
                <span class="jdt"><b :class="classObject(data.AQI)" :style="{width: (data.AQI*100/300)+'%' }"></b></span>
                <span class="jdtnumb">{{data.AQI}}</span>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
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
    _load (request) { // 加载数据
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', request).then(res => {
        this.datas = common.convertTable2objects(res.data.QuerySafetyResult)
      })
    },
    classObject (aqi) {
      let tclassname = ''
      for (let i = 50, j = 1; i < 350; i = i + 50, j++) { // 判断污染等级返回对应渐变效果
        if (aqi < i) {
          tclassname = 'kqzl' + j
          break
        }
      }
      return tclassname
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let requestdata = {
      parameter: {
        DoAction: 'queryaqiaction',
        OrderBy: {
          Column: 'AQI',
          Order: 'asc'
        },
        'token': 'string'
      }
    }
    this._load(requestdata)
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style>
.elscrollbarwrap > .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.gekqzlpmbox {
  width: 414 * @px;
  height: 300 * @px;
  border-radius: 4 * @px;
  overflow: hidden;
  background: #ffffff;
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
}
.infobox {
  width: 100%;
  height: 260px;
  padding: 14 * @px;
  box-sizing: border-box;
  position: relative;
}
.navbar {
  height: 29 * @px;
  line-height: 14 * @px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pm {
  display: inline-block;
  width: 63 * @px;
  height: 14 * @px;
  text-indent: 13 * @px;
  font-size: 14 * @px;
  overflow: hidden;
}
.dm {
  display: inline-block;
  width: 90 * @px;
  text-align: left;
  height: 14 * @px;
  overflow: hidden;
  font-size: 14 * @px;
}
.kqzl {
  display: inline-block;
  text-align: left;
  height: 14 * @px;
  font-size: 14 * @px;
}
.tablebox {
  width: 386 * @px;
  height: 203 * @px;
  border-top: 1 * @px solid #cccccc;
  overflow: hidden;
  position: relative;
  overflow-x: hidden;
}
.tablebox ul {
  width: 100%;
  overflow: hidden;
  padding-top: 2 * @px;
}
.tablebox ul > li {
  width: 386 * @px;
  display: block;
  height: 25 * @px;
  transition: 0.8s;
  line-height: 25 * @px;
  padding-left: 14 * @px;
  box-sizing: border-box;
}
.scroll {
  position: absolute;
  width: 5 * @px;
  height: 95 * @px;
  background: #ccc;
  display: block;
  border-radius: 4 * @px;
  right: 12 * @px;
  top: 44 * @px;
  z-index: 999;
}
.tablebox ul > li:hover {
  background: #ededed;
}
.tablebox ul > li > div {
  float: left;
  height: 25 * @px;
  line-height: 25 * @px;
}
.pmbox {
  width: 18 * @px;
  float: left;
}
.spanpm {
  width: 18 * @px;
  height: 18 * @px;
  border-radius: 18 * @px;
  display: inline-block;
  background: #0a7bc7;
  line-height: 18 * @px;
  vertical-align: middle;
  color: #fff;
  font-size: 12 * @px;
  text-align: center;
}
.dq {
  width: 120 * @px;
  font-size: 14 * @px;
  overflow: hidden;
  padding-left: 20 * @px;
}
.linkbox {
  width: 229 * @px;
}
.jdt {
  display: inline-block;
  width: 173 * @px;
  height: 6 * @px;
  background: #ccc;
  border-radius: 3 * @px;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}
.jdt > b {
  display: block;
  height: 6 * @px;
  position: absolute;
  background: #0a7bc7;
  border-radius: 3 * @px;
}
.jdtnumb {
  display: inline-block;
  text-indent: 20 * @px;
  width: 45 * @px;
}
.tpm {
  background: #3ace74 !important;
}
/* 进度条渐变样式 */
.kqzl1 {
  background: -webkit-linear-gradient(left, #0fbe75, #53f87f) !important;
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
