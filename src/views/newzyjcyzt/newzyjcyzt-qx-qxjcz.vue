<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:14:54
 -->

<!-- 气象  气象监测站 -->
<template>
  <div class="qxjcz">
    <p class='title'>气象监测站</p>
    <div class="table">
      <div class="th">
        <div class="td">序号</div>
        <div class="td">名称</div>
        <div class="td">温度℃</div>
        <div class="td">相对湿度</div>
        <div class="td">风力风向</div>
      </div>
      <div class="list">
        <el-scrollbar style="height:100%">
          <div class="tr" v-for="(item,index) in initData" :key="index">
            <div class="td">
              <p>{{index+1}}</p>
            </div>
            <div class="td">{{item.CENTERNAME}}</div>
            <div class="td">{{Math.ceil(item.TEMNOW)}}℃</div>
            <div class="td">{{item.HUMIDITY==='暂无实况'?'--':item.HUMIDITY}}</div>
            <div class="td">{{item.WINDDIR==='暂无实况'?'--':item.WINDDIR}}{{item.WINDPOWER==='暂无实况'?'--':item.WINDPOWER}}</div>
          </div>
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
      data: [],
      initData: []
    }
  },
  props: [],
  computed: {},
  methods: {
    loadData (data) {
      return this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', data)
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let data = {
      parameter: {
        DoAction: 'querygiswebdataweatherinfo',
        Offset: {
          Start: 0,
          Count: 6
        },
        OrderBy: {
          Column: 'TM',
          Order: 'desc'
        }
      }
    }
    this.loadData(data).then(res => {
      this.initData = common.convertTable2objects(res.data.QuerySafetyResult)
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
<style lang='less' scoped>
@px: 30rem/1920;
.qxjcz {
  width: 414 * @px;
  height: 369 * @px;
  border-radius: 5 * @px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
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
  .table {
    margin: 14 * @px;
    border: 1px solid #d3d8df;
    .th {
      height: 47 * @px;
      line-height: 47 * @px;
      background: #e1e4e7;
      display: flex;
      align-content: center;
      .td {
        font-size: 16 * @px;
        font-weight: bold;
        text-align: center;
        &:nth-child(1) {
          width: 58 * @px;
        }
        &:nth-child(2) {
          width: 86 * @px;
        }
        &:nth-child(3) {
          width: 71 * @px;
        }
        &:nth-child(4) {
          width: 80 * @px;
        }
        &:nth-child(5) {
          flex: 1;
        }
      }
    }
    .list {
      height: 252 * @px;
      .tr {
        height: 42 * @px;
        line-height: 42 * @px;
        display: flex;
        align-content: center;
        cursor: pointer;
        .td {
          font-size: 14 * @px;
          text-align: center;
          &:nth-child(1) {
            width: 58 * @px;
            font-size: 16 * @px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            p {
              width: 20 * @px;
              height: 20 * @px;
              border-radius: 50%;
              background: #609bd6;
              color: #fff;
              text-align: center;
              line-height: 20 * @px;
            }
          }
          &:nth-child(2) {
            width: 86 * @px;
          }
          &:nth-child(3) {
            width: 71 * @px;
          }
          &:nth-child(4) {
            width: 80 * @px;
          }
          &:nth-child(5) {
            flex: 1;
          }
        }
        &:nth-child(even) {
          background: #e5f0fa;
          margin-right: 1px;
        }
        &:hover {
          background: #cccfd3;
          // margin-right: 1px;
        }
      }
    }
  }
}
</style>
<style>
.list .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
