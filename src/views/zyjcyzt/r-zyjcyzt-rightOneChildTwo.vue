<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:19:07
 -->

<!--专业监测一张图 右侧第一模块子模块二-->
<template>
<div>
    <div class="cdtop2">
          <p>地区</p>
          <p>最大雨量</p>
        </div>
        <ul class="sidebar-menu">
          <li
            v-for="(item,index) in listTwo"
            :key="index"
          >
            <p>{{item[4]}}</p>
            <p>{{item[3]}}mm</p>
          </li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      listTwo: [ ]
    }
  },
  props: [],
  computed: {},
  methods: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let that = this
    this.axios({// 获取雨情监测点最大雨量
      method: 'post',
      url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
      data: {
        parameter: {
          'DoAction': 'queryst_pptn_r',
          'Conditions': [
            null
          ],
          'Offset': {
            'Start': 0,
            'Count': 5
          },
          'OrderBy': {
            'Column': 'DRP',
            'Order': 'desc'
          }
        },
        'token': 'string'
      }
    }).then(res => {
      that.listTwo = res.data.QuerySafetyResult.Values
      console.log(res)
    })
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
.cdtop2 {
  height: 28 * @px;
  width: 100%;
  background: #b8d8ff;
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
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  -o-justify-content: space-between;
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
}
.cdtop2 > p {
  width: 33.33%;
  font-size: 16 * @px;
  padding-left: 16 * @px;
  line-height: 28*@px;
  text-align: center;
  color: #666666;
}
.sidebar-menu {
  width: 372 * @px;
  height: 125 * @px;
}
.sidebar-menu > li {
  height: 26* @px;
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
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  -o-justify-content: space-between;
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
}
.sidebar-menu > li:nth-child(2n + 1) {
  background: #f4f8fc;
}
.sidebar-menu>li>p:nth-child(1){
  color:#919394;
  line-height: 26*@px;
  padding-left: 35 * @px;
}
.sidebar-menu > li > :nth-child(2){
  width: 33.33%;
  padding-left: 16 * @px;
  text-align: center;
  color:#919394;
  line-height: 26*@px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;

}
</style>
