<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-09-17 11:49:26
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-09-17 11:49:26
 -->
<!-- 交通 军运村车辆统计-实时车流量统计的 详细信息弹窗-->
<template>
    <div class="detailMain">
        <p class='title'>车辆识别详情<span class="xiangqing" @click="closeDetil">关闭</span></p>
        <div class="boxText">
      <div class="topBox">
        <div class="searchbox">
          <input type="text" class="search" placeholder="请输入车牌查询" v-model="inputKey">
          <i class="icon"></i>
          <div class="gjSearch">
            <p>搜索</p>
          </div>
        </div>
      </div>
      <div class="topBar">
        <div class="tableBox">
          <ul class="top">
            <li>车牌号</li>
             <li>记录时间</li>
            <li>停车场名称</li>
          </ul>
          <ul class="text" v-for="(item,index) in list" :key="index">
            <li>{{item.PLATE_INFO}}</li>
             <li>{{item.PASS_TIME_STR | fmtTqskTime}}</li>
            <li>{{item.PARKING}}</li>
          </ul>
        </div>
      </div>
      <div class="fyBox1_">
        <span>{{currentpage}}/{{pageNumber}}页</span>
        <span>共{{pageTotal}}条</span>
        <el-pagination background layout="prev, pager, next" :total="pageTotal" :page-size="pagesize" :pager-count="5" :current-page="num" @current-change="pagechange" @next-click="pagechange" @prev-click="pagechange">
        </el-pagination>
        <input type="text" class="shulu" v-model="inputVal">
        <span @click="determine">确定</span>
      </div>
    </div>
    </div>
</template>
<script>
import common from '../../utils/common.es'
export default {
  data () {
    return {
      pagesize: 5,
      currentpage: 1,
      pageNumber: 1,
      pageTotal: 0,
      num: 1,
      num2: 1,
      list: [],
      inputVal: null,
      inputKey: '',
      tabindex: 1
    }
  },
  props: [],
  computed: {},
  methods: {
    closeDetil () {
      this.$emit('closeDetil', false)
    },
    changeTable (index) { // tab切换事件
      this.tabindex = index
    },
    initData () { // 初始化获取对应位置的数据集合
      let parameters = {
        parameter: {
          'DoAction': 'queryhkbms',
          'Offset': {
            'Start': this.num * 5 - 5,
            'Count': 5
          }
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', parameters).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyResult)
        this.list = result
      })
      let parametersTwo = {// 获取对应位置的数据集合
        parameter: {
          'DoAction': 'queryhkbms'
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafetyCount', parametersTwo).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyCountResult)
        this.pageTotal = result[0]['COUNT']
        this.pageNumber = Math.ceil(result[0]['COUNT'] / this.pagesize)
      })
    },
    searchData () { // 查询事件数据调取
      let key = this.inputKey
      this.axios({
        method: 'post',
        url: this.$store.state.baseServiceUrl + '/DataService/QuerySafety',
        data: {
          parameter: {
            'DoAction': 'queryhkbms',
            'Offset': {
              'Start': this.num2 * 5 - 5,
              'Count': 5
            },
            'Conditions': [
              [
                {
                  'Column': 'PLATE_INFO',
                  'ColumnDataType': 'string',
                  'Mode': 'LIKE',
                  'Value': key
                }
              ]
            ]
          }
        }
      }).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyResult)
        this.list = result
      })
      let parametersTwo = {// 获取对应位置的数据集合
        parameter: {
          'DoAction': 'queryhkbms',
          'Conditions': [
            [
              {
                'Column': 'PLATE_INFO',
                'ColumnDataType': 'string',
                'Mode': 'LIKE',
                'Value': key
              }
            ]
          ]
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafetyCount', parametersTwo).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyCountResult)
        this.pageTotal = result[0]['COUNT']
        this.pageNumber = Math.ceil(result[0]['COUNT'] / this.pagesize)
      })
    },
    pagechange (val) { // 分页跳转事件
      this.num = val
      this.num2 = val
      this.currentpage = val
      if (this.inputkey === '') {
        this.initData()
      } else {
        this.searchData()
      }
    },
    determine () { // 底部分页确定按钮
      if (this.inputVal > Math.ceil(this.pageTotal / 5) || this.inputVal === '') {
        return false
      } else {
        this.pagechange(this.inputVal)
      }
      this.inputVal = ''
    }
  },
  watch: {
    inputKey () {
      if (this.inputKey === '') {
        this.pagechange(1)
        this.initData()
      } else {
        this.searchData()
      }
    }
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
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang='less' scoped>
@px: 30rem/1920;
.detailMain{
    width: 800* @px;
    height: 600* @px;
    position: absolute;
    z-index: 999999;
    left: 30%;
    top: 150* @px;
    background-color: white;
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
    .xiangqing{
      float: right;
      margin-right: 20* @px;
      cursor: pointer;
    }
  }
  .boxText {
  width: 100%;
  height: calc(100% - 150 * @px);
  margin-top: 10 * @px;
  .topBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #e3edf7;
    align-items: center;
    height: 72 * @px;
    padding: 0 18 * @px;
    .searchbox {
      display: flex;
      flex-direction: row;
      .search {
        width: 384 * @px;
        height: 38 * @px;
        display: inline-block;
        font-size: 16 * @px;
        text-indent: 13 * @px;
        color: #7f91a6;
        background: #fff;
        border-radius: 5 * @px 0 0 5 * @px;
      }
      .icon {
        height: 38 * @px;
        width: 56 * @px;
        display: inline-block;
        background: url("../../../static/img/site/seachbtn.png") #0a7bc7
          no-repeat center center;
        background-size: 60% 60%;
        cursor: pointer;
        border-radius: 0 5 * @px 5 * @px 0;
      }
      .gjSearch {
        width: 90 * @px;
        margin: 0 20 * @px;
        line-height: 38 * @px;
        border: 1 * @px solid #85bbdb;
        display: inline-block;
        border-radius: 5 * @px;
        background: #0a7bc7;
        color: #fff;
        p {
          text-align: center;
          font-size: 16 * @px;
        }
      }
    }
  }
  .topBar {
    width: 100%;
    position: relative;
    padding: 0 18 * @px;
    height: 300 * @px;
    .tableBox {
      width: 100%;
      margin-top: 20 * @px;
      border: 2 * @px solid #d8dde3;
      .top {
        display: flex;
        flex-direction: row;
        background: #f4f8fc;
        li {
          line-height: 50 * @px;
          border-right: 1 * @px solid #d8dde3;
          font-size: 14 * @px;
          font-weight: bold;
          padding-left: 44 * @px;
          &:nth-child(1) {
            width: calc(33% - 1 * @px);
          }
          &:nth-child(2) {
            width: calc(33% - 1 * @px);
          }
          &:nth-child(3) {
            width: calc(33% - 1 * @px);
             border-right: 0 * @px solid #d8dde3;
          }
        }
      }
      .text {
        display: flex;
        flex-direction: row;
        border-top: 1 * @px solid #d8dde3;
        &:nth-child(2n + 1) {
          background: #f4f8fc;
        }
        li {
          padding-left: 44 * @px;
          font-size: 14 * @px;
          line-height: 50 * @px;
          border-right: 1 * @px solid #d8dde3;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-child(1) {
            width: calc(33% - 1 * @px);
          }
          &:nth-child(2) {
            width: calc(33% - 1 * @px);
          }
          &:nth-child(3) {
            width: calc(33% - 1 * @px);
             border-right: 0 * @px solid #d8dde3;
          }
        }
      }
    }
  }
  .fyBox1_ {
    float: right;
    margin-top: 46 * @px;
    margin-right: 18 * @px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    .shulu {
      width: 40 * @px;
      height: 28 * @px;
      text-align: center;
      border: 1 * @px solid #eee;
    }
    span {
      &:nth-child(1) {
        font-size: 14 * @px;
        color: #000;
      }
      &:nth-child(2) {
        font-size: 14 * @px;
        color: #000;
        margin-left: 6 * @px;
      }
      &:nth-child(5) {
        cursor: pointer;
        font-size: 14 * @px;
        color: #fff;
        margin-left: 6 * @px;
        display: inline-block;
        width: 62 * @px;
        height: 28 * @px;
        line-height: 28 * @px;
        border-radius: 5 * @px;
        text-align: center;
        background: #097ac7;
      }
    }
  }
}

}
</style>
