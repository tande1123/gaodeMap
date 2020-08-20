<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:19:12
 -->

<!--专业监测一张图 右侧第二模块 -->
<template>
  <div class="rightBox2">
    <div class="sq">
      <h3>水情</h3>
      <ul class="sqfl">
        <li class="sqfl-one">
          <p>水情监测点</p>
          <p>
            <span>{{count}}</span>
            <span>个</span>
          </p>
        </li>
        <li class="sqfl-two">
          <p>报警点</p>
          <p>
            <span>0</span>
            <span>个</span>
          </p>
        </li>
      </ul>
      <div class="leibie">
        <p>类别</p>
      </div>
      <div class="shuihe">
        <p :class="{xuanzhong:className==='水库'}" v-on:click="change('水库')">
          水库
          <img :src="className==='水库'?'./static/assets/img/zyjcyzt/shuiku-1.png':'./static/assets/img/zyjcyzt/shuiku-2.png'" alt="">
        </p>
        <p :class="{xuanzhong2:className==='河道'}" v-on:click="change('河道')">
          河道
          <img :src="className==='河道'?'./static/assets/img/zyjcyzt/hedao-1.png':'./static/assets/img/zyjcyzt/hedao-2.png'" alt="">
        </p>

      </div>
      <div class="jcz">
        <div class="jcztitle">
          <p>站名</p>
          <p>水位(m)</p>
          <p>警戒/汛位(m)</p>
        </div>
        <ul class="jczbox">
          <li v-for="(item,index) in list" :key="index">
            <p>{{className== '水库'?item[2]:item[3]}}</p>
            <p>{{className== '水库'?item[6]:item[5]}}</p>
            <p>{{className== '水库'?item[10]:item[5]}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="paging">
      <span class="paging_span">共{{total}}条</span>
      <input class="numb" type="text" ref="numb" />
      <input value="确定" class="submit" type="button" @click="jump" />
      <el-pagination background layout="prev, pager, next" :pager-count="5" :page-size="5" :total="total" class="zyjcyzt_rightTwo" @current-change="pagechange" @next-click="pagechange" @prev-click="pagechange" :current-page="inputNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      className: '水库',
      list: [],
      total: null,
      num: 1,
      count: 0,
      inputNum: null
    }
  },
  props: [],
  computed: {},
  methods: {
    change (item) { // table切换事件
      this.className = item
      this.total = 0
      this.num = 1
      this.initData()
    },
    initData () { // 初始化数据
      let that = this
      this.axios({// 异步获取水库数据并赋值给list
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': this.className === '水库' ? 'querygisstreservoirr' : 'querygisstriverr',
            'Conditions': [
              null
            ],
            'Offset': {
              'Start': this.num * 5 - 5,
              'Count': 5
            }
          },
          'token': 'string'
        }
      }).then(res => {
        console.log(res.data.QuerySafetyResult.Values)
        that.list = res.data.QuerySafetyResult.Values
      })
      this.axios({// 异步获取水库数量异步获取河道数量
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QueryMoreSafetyCount',
        data: {
          'parameterList': [
            {
              'DoAction': 'querystriverr'
            },
            {
              'DoAction': 'querystrsvrr'
            }
          ]
        }
      }).then(res => {
        let numArray = res.data.QueryMoreSafetyCountResult
        let countArray = []
        let totalCount = 0
        numArray.forEach(element => {
          countArray.push(element.Values[0] * 1)
          totalCount += element.Values[0] * 1
        })
        that.count = totalCount
        if (that.className === '水库') {
          that.total = 100
        } else {
          that.total = 100
        }
      })
    },
    pagechange (val) { // 分页事件
      this.num = val
      this.initData()
    },
    jump () { // 点击确定按钮跳转到对应的页面
      let inputValue = this.$refs.numb.value * 1
      if (inputValue > Math.ceil(this.total / 5)) {

      } else {
        this.inputNum = inputValue
        this.pagechange(inputValue)
      }
      this.$refs.numb.value = ''
    }
  },
  watch: {},
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
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style >
.zyjcyzt_rightTwo {
  width: 62% !important;
  position: absolute;
  left: 1rem !important;
  top: 0.07333rem !important;
  border-radius: 0.05rem !important;
  overflow: hidden !important;
}
.zyjcyzt_rightTwo .number {
  background: white !important;
}
.zyjcyzt_rightTwo .el-pager li {
  width: 0.46666rem !important;
  height: 0.46666rem !important;
  margin: 0 0.04rem !important;
  border-radius: 0.07rem !important;
  line-height: 0.46666rem !important;
  overflow: hidden !important;
  text-overflow: clip;
  border: 0.01666rem solid Gainsboro !important;
}
.zyjcyzt_rightTwo .el-icon,
.zyjcyzt_rightTwo .more,
.zyjcyzt_rightTwo .btn-quicknext,
.zyjcyzt_rightTwo .btn-quickprev {
  width: 0.46666rem !important;
  height: 0.46666rem !important;
  line-height: 0.46666rem !important;
  background: white !important;
}
.zyjcyzt_rightTwo .el-icon::before,
.zyjcyzt_rightTwo .more::before {
  width: 0.46666rem !important;
  height: 0.46666rem !important;
  line-height: 0.46666rem !important;
}
.zyjcyzt_rightTwo .active {
  background: #0a7bc7 !important;
  border: 0.01666rem solid Gainsboro !important;
}
.zyjcyzt_rightTwo .btn-prev {
  display: none;
}
.zyjcyzt_rightTwo .btn-next {
  margin-left: 0.04rem !important;
}
.zyjcyzt_rightTwo .el-icon-arrow-right {
  background: white url('../../../static/assets/img/zyjcyzt/jiantou002.jpg') no-repeat center center !important;
  width: 0.46666rem !important;
  height: 0.46666rem !important;
  line-height: 0.46666rem !important;
  border: 0.01666rem solid Gainsboro !important;
  border-radius: 0.07rem !important;
}
</style>
<style lang="less" scoped>
@import '../../assets/less/set.less';
.rightBox2 {
  overflow: hidden;
  width: 414 * @px;
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
  margin: 18 * @px 0 0 3 * @px;
}
.sq {
  width: 402 * @px;
  // height: 400 * @px;
}
.sq > h3 {
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
  background: url('../../../static/assets/img/zyjcyzt/title-bg1.png') no-repeat center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
}
.sqfl {
  margin: 10 * @px 0 0 18 * @px;
  width: 370 * @px;
  height: 80 * @px;
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
.sqfl > li {
  width: 50%;
  height: 40 * @px;
}
.sqfl > li:nth-child(2) {
  margin-left: 2 * @px;
}
.sqfl-one > p:nth-child(1) {
  height: 40 * @px;
  text-align: center;
  background: #c6defd;
  line-height: 40 * @px;
  font-size: 18 * @px;
}
.sqfl-one > p:nth-child(2) {
  height: 40 * @px;
  text-align: center;
  background: #e5e5e5;
  line-height: 40 * @px;
  font-weight: bold;
}
.sqfl-one > p:nth-child(2) span:nth-child(1) {
  font-size: 22 * @px;
}
.sqfl-two > p:nth-child(1) {
  height: 40 * @px;
  text-align: center;
  background: #c6defd;
  line-height: 40 * @px;
  font-size: 18 * @px;
}
.sqfl-two > p:nth-child(1) {
  height: 40 * @px;
  text-align: center;
  background: #c6defd;
  line-height: 40 * @px;
  font-size: 18 * @px;
}
.sqfl-two > p:nth-child(2) {
  height: 40 * @px;
  text-align: center;
  background: #e5e5e5;
  line-height: 40 * @px;
  color: #ff0202;
  font-weight: bold;
}
.sqfl-two > p:nth-child(2) span:nth-child(1) {
  font-size: 22 * @px;
}
.leibie {
  margin: 14 * @px 0 0 18 * @px;
  width: 370 * @px;
  height: 18 * @px;
}
.leibie p {
  width: 100%;
  font-size: 18 * @px;
  line-height: 18 * @px;
  border-left: 2px solid #0a7bc7;
  padding-left: 6 * @px;
  color: #0a7bc7;
}
.shuihe {
  margin: 14 * @px 0 0 18 * @px;
  width: 370 * @px;
  height: 30 * @px;
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
  border-radius: 20 * @px;
  -webkit-border-radius: 20 * @px;
  -moz-border-radius: 20 * @px;
  -ms-border-radius: 20 * @px;
  -o-border-radius: 20 * @px;
}
.shuihe > p:nth-child(1) {
  width: 195 * @px;
  background: #e3e3e3;
  font-size: 16 * @px;
  font-weight: bold;
  text-align: center;
  line-height: 30 * @px;
  border-top-left-radius: 20 * @px;
  -webkit-border-top-left-radius: 20 * @px;
  -moz-border-top-left-radius: 20 * @px;
  -ms-border-top-left-radius: 20 * @px;
  -o-border-top-left-radius: 20 * @px;
  border-bottom-left-radius: 20 * @px;
  -webkit-border-bottom-left-radius: 20 * @px;
  -moz-border-bottom-left-radius: 20 * @px;
  -ms-border-bottom-left-radius: 20 * @px;
  -o-border-bottom-left-radius: 20 * @px;
  position: relative;
  cursor: pointer;
}
.xuanzhong {
  width: 195 * @px;
  background: #04887a !important;
  font-size: 16 * @px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 30 * @px;
  border-top-left-radius: 20 * @px;
  -webkit-border-top-left-radius: 20 * @px;
  -moz-border-top-left-radius: 20 * @px;
  -ms-border-top-left-radius: 20 * @px;
  -o-border-top-left-radius: 20 * @px;
  border-bottom-left-radius: 20 * @px;
  -webkit-border-bottom-left-radius: 20 * @px;
  -moz-border-bottom-left-radius: 20 * @px;
  -ms-border-bottom-left-radius: 20 * @px;
  -o-border-bottom-left-radius: 20 * @px;
  position: relative;
}
.xuanzhong2 {
  width: 195 * @px;
  background: #04887a !important;
  font-size: 16 * @px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 30 * @px;
  border-top-right-radius: 20 * @px;
  -webkit-border-top-right-radius: 20 * @px;
  -moz-border-top-right-radius: 20 * @px;
  -ms-border-top-right-radius: 20 * @px;
  -o-border-top-right-radius: 20 * @px;
  border-bottom-right-radius: 20 * @px;
  -webkit-border-bottom-right-radius: 20 * @px;
  -moz-border-bottom-right-radius: 20 * @px;
  -ms-border-bottom-right-radius: 20 * @px;
  -o-border-bottom-right-radius: 20 * @px;
  position: relative;
}
.shuihe > p:nth-child(1) > img {
  width: 22 * @px;
  height: 22 * @px;
  position: absolute;
  top: 4 * @px;
  left: 120 * @px;
}
.shuihe > p:nth-child(2) {
  width: 195 * @px;
  background: #e3e3e3;
  font-size: 16 * @px;
  font-weight: bold;
  text-align: center;
  line-height: 30 * @px;
  border-top-right-radius: 20 * @px;
  -moz-border-top-right-radius: 20 * @px;
  -ms-border-top-right-radius: 20 * @px;
  -o-border-top-right-radius: 20 * @px;
  border-bottom-right-radius: 20 * @px;
  border-bottom-right-radius: 20 * @px;
  -webkit-border-bottom-right-radius: 20 * @px;
  -moz-border-bottom-right-radius: 20 * @px;
  -ms-border-bottom-right-radius: 20 * @px;
  -o-border-bottom-right-radius: 20 * @px;
  position: relative;
  cursor: pointer;
}
.shuihe > p:nth-child(2) > img {
  width: 22 * @px;
  height: 22 * @px;
  position: absolute;
  top: 4 * @px;
  left: 120 * @px;
}
.jcz {
  margin: 20 * @px 0 0 18 * @px;
  width: 370 * @px;
}
.jcztitle {
  display: flex;
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  width: 370 * @px;
  height: 30 * @px;
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
  background: #b8d8ff;
}
.jcztitle > p {
  width: 33.33%;
  font-size: 16 * @px;
  line-height: 30 * @px;
  text-align: center;
  color: #666666;
}
.jczbox > li {
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
  height: 26 * @px;
}
.jczbox > li:nth-child(2n + 1) {
  background: #ebf2fa;
}
.jczbox > li > p {
  width: 33.33%;
  font-size: 16 * @px;
  height: 26 * @px;
  text-align: center;
  line-height: 26 * @px;
  color: #8e9193;
}
.paging {
  width: 100%;
  box-sizing: border-box;
  padding: 0 2%;
  height: 50 * @px;
  line-height: 40 * @px;
  text-align: right;
  position: relative;
  margin-top: 4 * @px;
}
.paging_span {
  float: left;
  height: 30 * @px;
  line-height: 30 * @px;
  margin-top: 8 * @px;
  font-size: 14 * @px;
  color: #4d4d4d;
  font-weight: bold;
}
.submit {
  width: 40 * @px !important;
  height: 30 * @px;
  background: #0a7bc7 !important;
  color: #fff;
  border-radius: 3 * @px;
  font-size: 12 * @px;
}
.numb {
  width: 40 * @px;
  height: 30 * @px;
  vertical-align: middle;
  background: #fff;
  box-sizing: border-box;
  border: 1 * @px solid #ccc;
  cursor: pointer;
  border-radius: 3 * @px;
  transition: 0.2s;
  -ms-transition: 0.2s;
  -moz-transition: 0.2s;
  -webkit-transition: 0.2s;
  text-align: center;
  margin-right: 3 * @px;
}
</style>
