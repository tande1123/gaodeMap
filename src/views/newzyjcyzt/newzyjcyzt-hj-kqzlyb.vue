<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->

<!--环境  空气质量预报-->
<template>
  <div class="qkzlybbox">
    <p class="title">空气质量预报</p>
    <div class="infobox">
      <div class="table">
        <div class="tr">
          <div class="tabletitle td">时间段</div>
          <div v-for="(data , index ) in datas" v-bind:key="index" class="td">{{data.TIME_POINT | fmtAQITimehh}}</div>
        </div>
        <div class="tr">
          <div class="tabletitle td">空气质量指数</div>

          <div v-for="(data , index ) in datas" v-bind:key="index" class="td">{{data.AQI}}</div>
        </div>
        <div class="tr">
          <div class="tabletitle td">首要污染物</div>
          <div v-for="(data , index ) in datas" v-bind:key="index" :title="data.PRIMARY_POLLUTANT" class="td">{{data.PRIMARY_POLLUTANT}}</div>
        </div>
        <div class="tr">
          <div class="tabletitle td">空气质量类别</div>
          <div v-for="(data , index ) in datas" v-bind:key="index" class="td">{{data.QUALITY}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import common from '@/utils/common.es'
// import format from '@/utils/formatdate.es'
export default {
  data () {
    return {
      datas: []
    }
  },
  props: [],
  computed: {},
  methods: {
    _load () {
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', {
        parameter: {
          DoAction: 'querygiswebdatapm25citysummary',
          Offset: {
            Start: 0,
            Count: 3
          },
          OrderBy: {
            Column: 'TIME_POINT',
            Order: 'desc'
          }
        },
        token: 'string'
      }).then(res => {
        this.datas = common.convertTable2objects(res.data.QuerySafetyResult).reverse()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this._load()
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
<style lang="less" scoped>
@import "../../assets/less/set.less";
.qkzlybbox {
  width: 415 * @px;
  height: 270 * @px;
  background: #fff;
  border-radius: 4 * @px;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
}
.title {
  height: 40 * @px;
  line-height: 40 * @px;
  color: #fff;
  background-image: url("../../../static/assets/img/newzyjcyzt/headbg.png");
  background-size: 100% 100%;
  font-size: 18 * @px;
  font-weight: bold;
  text-indent: 13 * @px;
  overflow: hidden;
  letter-spacing: 2 * @px;
}
.infobox {
  width: 100%;
  height: 230 * @px;
  padding: 14 * @px;
}
.infobox > .table {
  width: 100%;
  height: 100%;
  border: 1 * @px solid #eef0f3;
}
.infobox > .table > .tr {
  display: flex;
  height: 50 * @px;
  background: #fcfdfe;
  transition: 0.6s;
}
.infobox > .table > .tr > .td {
  width: 89 * @px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14 * @px;
  line-height: 1;
  border-left: 1 * @px solid #eef0f3;
}
.tabletitle {
  width: 119 * @px !important;
  font-size: 14 * @px;
  font-weight: 800 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.infobox > .table > .tr:nth-child(odd) {
  background: #f4f8fc !important;
}
.infobox > .table > .tr:hover {
  background: #eef0f3 !important;
  cursor: pointer;
}
</style>
