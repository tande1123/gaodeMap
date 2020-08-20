<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:19:01
 -->

<!--专业监测一张图 右侧第一模块子模块三-->
<template>
<div>
    <div class="cdtop2">
          <p>雨量范围</p>
          <p>雨量</p>
    </div>
    <el-scrollbar
    class="childThree"
      style="height:100%"
    >
        <ul class="sidebar-menu">
          <li
            v-for="(item,index) in listThree"
            :key="index"
          >
            <p>{{item[4]}}</p>
            <p>{{item[3]}}mm</p>
            <div :class="getclass(item[3])"></div>
          </li>
        </ul>
    </el-scrollbar>
</div>
</template>
<script>
export default {
  data () {
    return {
      listThree: [
      ]
    }
  },
  props: [],
  computed: {},
  methods: {
    getclass (data) { // 判断data值并返回对应class名
      if (data < 0.1) {
        return 'color1'
      }
      if (data >= 0.1 && data < 10) {
        return 'color2'
      } else if (data >= 10 && data < 25) {
        return 'color3'
      } else if (data >= 25 && data < 50) {
        return 'color4'
      } else if (data >= 50 && data < 100) {
        return 'color5'
      } else if (data >= 100 && data < 250) {
        return 'color6'
      } else if (data >= 250) {
        return 'color7'
      }
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let that = this
    this.axios({// 获取雨情监测点数据
      method: 'post',
      url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
      data: {
        parameter: {
          'DoAction': 'queryst_pptn_r'
        },
        'token': 'string'
      }
    }).then(res => {
      that.listThree = res.data.QuerySafetyResult.Values
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
<style>
.childThree {
    padding-bottom: 0.41666rem!important;
    }
.childThree .el-scrollbar__wrap {
    overflow-x:hidden!important;
    }
</style>
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
  position: relative;
}
.color1{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #9b9791;
}
.color2{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #02d0cd;
}
.color3{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #dfcd32;
}
.color4{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #18e14b;
}
.color5{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #7577fe;
}
.color6{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #fe41e4;
}
.color7{
  width: 5*@px;
  height: 5*@px;
  border-radius: 50%;
  position: absolute;
  top: 10 * @px;
  left:6 * @px;
  background: #ff3b3c;
}
.sidebar-menu > li:nth-child(2n + 1) {
  background: #f4f8fc;
}
.sidebar-menu>li>p:nth-child(1){
  color:#919394;
  line-height: 26*@px;
  padding-left: 26 * @px;
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
