<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:17:02
 -->

<!-- 军运村视频监控一张图左部模块 -->
<template>
  <div class="jycso">
    <div class="inputOne">
      <input
        type="text"
        placeholder="输入关键字查询监控视频"
      >
      <!-- 搜索按钮可以添加事件 -->
      <div class="shousuo">
        <img
          src="../../../static/img/jycspjkyzt/ssicon.png"
          alt=""
        >
      </div>
    </div>
    <!-- 监控区部分 -->
    <div class="jiankong">
      <ul class="daohan">
        <li :class="{color:indexTabe==='村内'}" v-on:click="changeTabe('村内')">
          <p>村内</p>
        </li>
        <li :class="{color:indexTabe==='道路'}" v-on:click="changeTabe('道路')">
          <p>道路</p>
        </li>
        <li :class="{color:indexTabe==='接驳'}" v-on:click="changeTabe('接驳')">
          <p>接驳</p>
        </li>
        <li :class="{color:indexTabe==='119'}" v-on:click="changeTabe('119')">
          <p>119</p>
        </li>
        <li :class="{color:indexTabe==='120'}" v-on:click="changeTabe('120')">
          <p>120</p>
        </li>
        <li :class="{color:indexTabe==='单兵'}" v-on:click="changeTabe('单兵')">
          <p>单兵</p>
        </li>
      </ul>
      <ul class="jctabe">
        <li v-for="(item,index) in list"  :key="index"  v-on:click="changeLi(index)" :class=" newItem===index?'dcjk':''">
          <p>{{item[8]}}</p>
          <ul class="dcc" v-if="flag===index">
            <li :class="{dc_color:indexKey===1}" v-on:click.stop="change(1)">
              <p>A-123停车场</p>
            </li>
            <li :class="{dc_color:indexKey===2}" v-on:click.stop="change(2)">
              <p>B-123停车场</p>
            </li>
            <li :class="{dc_color:indexKey===3}" v-on:click.stop="change(3)">
              <p>C-123停车场</p>
            </li>
            <li :class="{dc_color:indexKey===4}" v-on:click.stop="change(4)">
              <p>D-123停车场</p>
            </li>
          </ul>
        </li>
      </ul>
      <div class="paging">
              <span class="paging_span">共{{total}}条</span>
                  <input
                class="numb"
                type="text"
                ref="numb"
              />
              <input
                value="确定"
                class="submit"
                type="button"
                @click="jump"
              />
              <el-pagination
              background
              layout="prev, pager, next"
              :pager-count="5"
              :page-size="13"
              :total='total'
              class="video"
              @current-change="pagechange"
              @next-click="pagechange"
              @prev-click="pagechange"
              >
            </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: 0,
      indexKey: 1,
      newItem: 0,
      indexTabe: '村内',
      key: '',
      list: [],
      num: 1,
      total: 0
    }
  },
  props: [],
  computed: {},
  methods: {
    initData () { // 初始化数据
      let that = this
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': 'queryrescamerapt',
            'Conditions': [
              [
                {
                  'Column': 'CHARGEDEPT',
                  'ColumnDataType': 'string',
                  'Mode': 'LIKE',
                  'Value': this.key
                }
              ]
            ],
            'Offset': {
              'Start': this.num * 13 - 13,
              'Count': 13
            },
            'OrderBy': {
              'Column': 'CAMERAID',
              'Order': 'desc'
            }
          },
          'token': 'string'
        }
      }).then(res => {
        that.list = res.data.QuerySafetyResult.Values
      })
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafetyCount',
        data: {
          parameter: {
            'DoAction': 'queryrescamerapt',
            'Conditions': [
              [
                {
                  'Column': 'CHARGEDEPT',
                  'ColumnDataType': 'string',
                  'Mode': 'LIKE',
                  'Value': this.key
                }
              ]
            ]
          },
          'token': 'string'
        }
      }).then(res => {
        res.data.QuerySafetyCountResult.Values[0].map(item => {
          that.total = item * 1
        })
      })
    },
    change (item) {
      this.indexKey = item
    },
    changeLi (key) {
      if (key === this.flag) {
        this.flag = false
        this.newItem = ''
        this.change(1)
      } else {
        this.flag = key
        this.newItem = key
        this.change(1)
      }
    },
    changeTabe (index) {
      this.indexTabe = index
      this.flag = 0
      switch (index) {
        case '村内':
          this.key = 'JYC'
          break
        case '道路':
          this.key = 'DL'
          break
        case '接驳':
          this.key = 'JB'
          break
        case '119':
          this.key = '119'
          break
        case '120':
          this.key = '120'
          break
        case '单兵':
          this.key = 'DB'
          break
      }
      this.total = 0
      this.pagechange(1)
      this.initData()
    },
    pagechange (val) {
      this.num = val
      this.initData()
    },
    jump () {
      let inputValue = this.$refs.numb.value * 1
      this.inputNum = inputValue
      this.pagechange(inputValue)
      this.$refs.numb.value = ''
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.changeTabe('村内')
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
.video{
  width: 58%!important;
  position: absolute;
  left:1.2rem!important;
  top:0.15625rem!important;
  border-radius: 0.05rem!important;
  overflow:hidden!important;
  padding:0px!important;
}
.video .number{
  background:white!important;
}
.video .el-pager li{
  width: 0.46666rem!important;
  height: 0.46666rem!important;
  margin: 0 0.03rem!important;
  line-height: 0.46666rem!important;
  /* border: 0.01666rem solid Gainsboro!important; */
  border-radius: 4px!important;
}
.video .el-icon,.video .more,.video .btn-quicknext,.video .btn-quickprev{
  width: 0.46666rem!important;
  height: 0.46666rem!important;
  line-height: 0.46666rem!important;
  background:white!important;
}
.video .active{
  background:#0a7bc7!important;
  border: none!important;

}
.video .btn-prev {
  display: none;
}
.video .el-icon-arrow-right{
  background:white url("../../../static/assets/img/zyjcyzt/jiantou002.jpg") no-repeat center center!important;
  width: 0.46666rem!important;
  height: 0.46666rem!important;
  line-height: 0.46666rem!important;
  border: 0.01666rem solid Gainsboro!important;
  border-radius: 4px!important;
}
</style>
<style lang="less" scoped>
@import "../../assets/less/set.less";
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.jycso {
  width: 414 * @px;
  height: 500 * @px;
}
.inputOne {
  width: 414 * @px;
  height: 40 * @px;
  border-radius: 5 * @px;
  position: relative;
}
.inputOne input {
  width: 414 * @px;
  height: 40 * @px;
  padding-left: 26 * @px;
  background: url("../../../static/img/jycspjkyzt/input.png") no-repeat center
    center;
  background-size: 100%;
  border-radius: 5 * @px;
  color: white;
  font-size: 14*@px;
  line-height: 40*@px;
}
.shousuo {
  width: 22 * @px;
  height: 23 * @px;
  position: absolute;
  top: 10 * @px;
  right: 14 * @px;
}
.shousuo img {
  width: 22 * @px;
  height: 23 * @px;
}
.jiankong {
  width: 414 * @px;
  margin-top: 14 * @px;
  border: 1 * @px solid #001a37;
  background: #001a37;
  border-radius: 5 * @px;
  padding-bottom: 20 * @px;
  box-shadow: 0px 0px 15 * @px #002044;
}
.daohan {
  width: 414 * @px;
  display: flex;
  flex-direction: row;
  border-bottom:1*@px solid #124775;
}
.daohan li {
  width: 69 * @px;
  height: 36 * @px;
}
.daohan li p{
  color: white;
  text-align: center;
  font-size: 16 * @px;
  line-height: 36 * @px;
}
.color {
  background: url("../../../static/img/jycspjkyzt/videobg_03.png") no-repeat center
    center;
  background-size: 100%;
}
.daohan li:hover {
  background: url("../../../static/img/jycspjkyzt/videobg_03.png") no-repeat center
    center;
  background-size: 100%;
  cursor: pointer;
}
.jctabe {
  width: 414 * @px;
}
.jctabe > li {
  width: 379 * @px;
  margin-left: 18 * @px;
  cursor: pointer;
}
.jctabe > li:nth-child(2n + 1) {
   background-color:#193955;
}
.jctabe > li > p {
  height: 40 * @px;
  font-size: 14 * @px;
  font-weight: bolder;
  color: white;
  line-height: 40 * @px;
  padding-left: 20 * @px;
}
.dcjk{
  width: 379 * @px;
  border: 1 * @px solid #143a61;
  margin: 2* @px 0 2* @px 18 * @px;
}
.dcjk>p{
    height: 40 * @px;
  font-size: 14 * @px;
  font-weight: bolder;
  color: white;
  line-height: 40 * @px;
   background-color: #043056!important;
}
.jctabe > li:first-child {
  width: 379 * @px;
  margin: 18 * @px 0 0 18 * @px;
}
.dcc {
  width: 377 * @px;
  overflow: hidden;
  background: #001a37;
}
 .dcc li {
  width: 136 * @px;
  height: 40 * @px;
  color: white;
  font-size: 14 * @px;
  text-align: center;
  line-height: 40 * @px;
  float: left;
}
.dcc li:nth-child(2n) {
  margin-left: 60 * @px;
}
.dcc li:nth-child(2n-1) {
  margin-left: 20 * @px;
}
.dc_color p {
  color: #00cdfe!important;
}
.paging {
  width: 100%;
  box-sizing: border-box;
  padding: 0 2%;
  height: 40 * @px;
  line-height: 40 * @px;
  text-align: right;
  margin-top: 8 * @px;
  position: relative;
}
.paging_span{
  float: left;
  height: 30 * @px;
  width: 60*@px;
  line-height: 30 * @px;
  margin-top: 10* @px;
  font-size: 14 * @px;
  color:white;
  font-weight: bold;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.submit {
  width: 40 * @px !important;
  height: 30*@px;
  background: #124775 !important;
  color: #fff;
  border-radius: 4 * @px;
  font-size: 12 * @px;
  margin-top: 8*@px;
}
.numb {
  width: 40 * @px;
  height: 30 * @px;
  vertical-align: middle;
  background: #fff;
  box-sizing: border-box;
  border: 1 * @px solid #ccc;
  cursor: pointer;
  border-radius: 4 * @px;
  text-align: center;
  margin-top: 8*@px;
}
</style>
