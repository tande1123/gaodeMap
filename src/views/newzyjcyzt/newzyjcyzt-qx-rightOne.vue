<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:14:59
 -->

<!--气象  雨情 -->
<template>
  <div class="rightBox">
    <div class="yq">
      <h3>雨情</h3>
      <ul class="yqfl">
        <li class="yqfl-one">
          <p>雨情监测点</p>
          <p>
            <span>{{ yqjcdNum}}</span>
            <span>个</span>
          </p>
        </li>
        <li class="yqfl-two">
          <p>雨情阈值</p>
          <p>
            <span>70</span>
            <span>mm</span>
          </p>
        </li>
        <li class="yqfl-three">
          <p>超阈值站点</p>
          <p>
            <span>{{num}}</span>
            <span>个</span>
          </p>
        </li>
      </ul>
      <div class="ylfw">
        <div class="ylfw-one">
          <p>雨量范围</p>
          <p>(单位 ：mm)</p>
        </div>
        <div class="ylfw-two">
          <div class="wenzhi">
            <p>0.1</p>
            <p>10</p>
            <p>25</p>
            <p>50</p>
            <p>100</p>
            <p>250</p>
          </div>
          <ul class="yqBox">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="ejcd">
        <div class="cdtop">
          <p :class="{yuliang:currentSelect==='雨量信息'}" @click="changeData('雨量信息','1')">雨量信息</p>
          <p :class="{yuliang:currentSelect==='最大雨量'}" @click="changeData('最大雨量','2')">最大雨量</p>
          <p :class="{yuliang:currentSelect==='量级统计'}" @click="changeData('量级统计','3')">量级统计</p>
        </div>
        <ChildOne v-if="flag==='1'" />
        <ChildTwo v-if="flag==='2'" />
        <ChildThree v-if="flag==='3'" />
      </div>
    </div>
  </div>
</template>
<script>
import ChildOne from './newzyjcyzt-qx-rightOneChild.vue'
import ChildTwo from './newzyjcyzt-qx-rightOneChildTwo.vue'
import ChildThree from './newzyjcyzt-qx-rightOneChildThree.vue'
import common from '@/utils/common.es'
export default {
  data () {
    return {
      currentSelect: '雨量信息',
      flag: 1,
      yqjcdNum: '',
      num: 0
    }
  },
  props: [],
  computed: {},
  methods: {
    loadData () {
      let that = this
      this.axios({// 获取雨情监测点数量
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafetyCount',
        data: {
          parameter: {
            'DoAction': 'queryst_pptn_r'
          },
          'token': 'string'
        }
      }).then(res => {
        let num = common.convertTable2objects(res.data.QuerySafetyCountResult)[0]
        that.yqjcdNum = num.COUNT
      })
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
        let numList = common.convertTable2objects(res.data.QuerySafetyResult)
        let keyNum = []// 取出每个数组中的雨量值并放进keyNum这个数组中
        numList.map(item => {
          keyNum.push(item.DRP)
        })
        for (let i = 0; i < keyNum.length; i++) {
          if (keyNum[i] > 70) { // keyNum这个数组中有大于70的num就加1
            that.num++
          }
        }
      })
    },
    changeData (item, index) {
      this.currentSelect = item
      this.flag = index
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.loadData()
    this.changeData('雨量信息', '1')
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { },
  components: {
    ChildOne, ChildTwo, ChildThree
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.rightBox {
  overflow: hidden;
  width: 414 * @px;
  height: 448 * @px;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
  box-shadow: 0 0 8px #999;
  -webkit-box-shadow: 0 0 8px #999;
  -moz-box-shadow: 0 0 8px #999;
  -ms-box-shadow: 0 0 8px #999;
  -o-box-shadow: 0 0 8px #999;
  background: white;
}
.yq {
  width: 414 * @px;
  height: 470 * @px;
}
.yq > h3 {
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
  letter-spacing: 2 * @px;
}
.yqfl {
  margin: 14 * @px;
  // width: 372 * @px;
  height: 80 * @px;
  font-size: 16 * @px;
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
}
.yqfl-one {
  width: 157 * @px;
  height: 80 * @px;
}
.yqfl-one > p:nth-child(1) {
  height: 40 * @px;
  text-align: center;
  background: #c6defd;
  line-height: 40 * @px;
  font-size: 16 * @px;
  font-weight: bold;
}
.yqfl-one > p:nth-child(2) {
  height: 36 * @px;
  text-align: center;
  background: #e5e5e5;
  line-height: 36 * @px;
  margin-top: 1px;
}
.yqfl-one > p:nth-child(2) span:nth-child(1) {
  font-size: 22 * @px;
  font-weight: bold;
}
.yqfl-two {
  width: 120 * @px;
  height: 80 * @px;
  margin-left: 1 * @px;
}
.yqfl-two > p:nth-child(1) {
  height: 40 * @px;
  text-align: center;
  background: #c6defd;
  line-height: 40 * @px;
  font-size: 16 * @px;
}
.yqfl-two > p:nth-child(2) {
  height: 36 * @px;
  text-align: center;
  background: #e5e5e5;
  line-height: 36 * @px;
  color: #2486f5;
  margin-top: 1px;
}
.yqfl-two > p:nth-child(2) span:nth-child(1) {
  font-size: 22 * @px;
  font-weight: bold;
}
.yqfl-three {
  width: 106 * @px;
  height: 80 * @px;
  margin-left: 1 * @px;
}
.yqfl-three > p:nth-child(1) {
  height: 40 * @px;
  text-align: center;
  background: #c6defd;
  line-height: 40 * @px;
  font-size: 16 * @px;
}
.yqfl-three > p:nth-child(2) {
  height: 36 * @px;
  text-align: center;
  background: #e5e5e5;
  line-height: 36 * @px;
  color: #f6541b;
  margin-top: 1px;
}
.yqfl-three > p:nth-child(2) span:nth-child(1) {
  font-size: 22 * @px;
  font-weight: bold;
}
.ylfw {
  margin: 14 * @px 14 * @px 18 * @px;
}
.ylfw-one {
  font-weight: bold;
  overflow: hidden;
}
.ylfw-one > p:nth-child(1) {
  font-size: 16 * @px;
  color: #0a7bc7;
  float: left;
  padding-left: 8 * @px;
  border-left: 2px solid #0a7bc7;
  line-height: 16 * @px;
}
.ylfw-one > p:nth-child(2) {
  font-size: 16 * @px;
  color: #0a7bc7;
  float: left;
  padding-left: 8 * @px;
  line-height: 16 * @px;
  margin-top: 1px;
}

.ylfw-two {
  margin-left: 8 * @px;
  overflow: hidden;
}
.yqBox {
  margin-top: 5 * @px;
  width: 372 * @px;
  height: 30 * @px;
  background: #165296;
  border-radius: 15 * @px;
  -webkit-border-radius: 15 * @px;
  -moz-border-radius: 15 * @px;
  -ms-border-radius: 15 * @px;
  -o-border-radius: 15 * @px;
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
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
}
.yqBox > li:nth-child(1) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/1.png") no-repeat center
    center;
  border-right: 2px solid white;
}
.yqBox > li:nth-child(2) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/2.png") no-repeat center
    center;
  border-right: 2px solid white;
}
.yqBox > li:nth-child(3) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/3.png") no-repeat center
    center;
  border-right: 2px solid white;
}
.yqBox > li:nth-child(4) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/4.png") no-repeat center
    center;
  border-right: 2px solid white;
}
.yqBox > li:nth-child(5) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/5.png") no-repeat center
    center;
  border-right: 2px solid white;
}
.yqBox > li:nth-child(6) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/6.png") no-repeat center
    center;
  border-right: 2px solid white;
}
.yqBox > li:nth-child(7) {
  width: 14.28%;
  height: 16 * @px;
  background: url("../../../static/assets/img/zyjcyzt/7.png") no-repeat center
    center;
}
.wenzhi {
  width: 372 * @px;
  font-size: 16 * @px;
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
  margin-top: 10 * @px;
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
}
.wenzhi > p {
  width: 52 * @px;
  line-height: 14 * @px;
  text-align: center;
  font-size: 14 * @px;
}

//二级菜单
.ejcd {
  margin: 14 * @px 14 * @px 14 * @px 22 * @px;
  width: 372 * @px;
}
.cdtop {
  width: 372 * @px;
  background: #e5e5e5;
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
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
}
.cdtop > p {
  width: 33.33%;
  height: 30 * @px;
  font-size: 16 * @px;
  line-height: 30 * @px;
  color: #959595;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e5e5e5;
}
.yuliang {
  color: #fff !important;
  background: #2a90f5;
  position: relative;
}
.yuliang::after {
  width: 0;
  height: 0;
  border-left: 8 * @px solid transparent;
  border-right: 8 * @px solid transparent;
  border-top: 8 * @px solid #2a90f5;
  position: absolute;
  top: 28 * @px;
  left: 56 * @px;
  content: "";
}
</style>
