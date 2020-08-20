<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 综合分析研判系统列表 -->
<template>
  <div class="cllfx">
    <!-- <div class="nav">当前位置：首页&nbsp;>&nbsp;综合分析研判&nbsp;>&nbsp;重点区域管理&nbsp;>&nbsp;车流量分析</div> -->
    <div class="list">
      <div class="into">
        <div class="title">
          <h3>监控区今日实时流入</h3>
        </div>
        <div class="explain">
          <div class="carNum">
            <span>{{124345|NumFormat}}</span>
            <span>&nbsp;辆</span>
          </div>
          <div class="upDown">
            <span>
              <img src="../../../static/img/jycglpt/down.png" alt="">
              <span class="word">10%</span>
            </span>
            <span>&nbsp;同比上天</span>
          </div>
        </div>
      </div>
      <div class="out">
        <div class="title">
          <h3>监控区今日实时流出</h3>
        </div>
        <div class="explain">
          <div class="carNum">
            <span>{{124345|NumFormat}}</span>
            <span>&nbsp;辆</span>
          </div>
          <div class="upDown">
            <span>
              <img src="../../../static/img/jycglpt/up.png" alt="">
              <span class="word">10%</span>
            </span>
            <span>&nbsp;同比上天</span>
          </div>
        </div>
      </div>
      <div class="risk">
        <div class="title">
          <h3>武汉主城区</h3>
        </div>
        <div class="word">聚集风险</div>
        <div class="highLow">高</div>
        <div class="progress">
          <div class="date">平均通行时间：
            <span>1.86</span>s</div>
          <div class="strip">
            <img src="../../../static/img/jycglpt/progress.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <model></model>
  </div>
</template>
<script>
import model from './clfx-right-model'
export default {
  components: {
    model
  },
  data () {
    return {}
  },
  props: [],
  computed: {},
  methods: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { },
  filters: {
    NumFormat: function (value) {
      var intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
      return intPartFormat
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.cllfx {
  z-index: 999;
  top: 10px;
  position: absolute;
  width: 1630 * @px;
  padding: 18 * @px 20 * @px 21 * @px;
  .nav {
    color: #9f9f9f;
    font-size: 12 * @px;
    line-height: 1;
  }
  .list {
    padding: 8 * @px 0 21 * @px 3 * @px;
    display: flex;
    justify-content: space-between;
    .into,
    .out,
    .risk {
      width: 517 * @px;
      height: 222 * @px;
    }
    .into {
      background: url("../../../static/img/jycglpt/into.png") no-repeat center
        center;
      background-size: 100% 100%;
      -webkit-background-size: 100% 100%;
      -ms-background-size: 100% 100%;
      -o-background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      margin-right: 18 * @px;
      .upDown span:nth-child(1) {
        color: #00b662;
        .word {
          color: #00b662;
          font-size: 26 * @px;
          line-height: 1;
          vertical-align: text-bottom;
        }
      }
    }
    .title {
      border-bottom: 1px solid #e5e5e5;
      h3 {
        font-size: 16 * @px;
        line-height: 49 * @px;
        margin-left: 18 * @px;
        font-weight: bold;
      }
    }
    .explain {
      margin-top: 28 * @px;
      margin-left: 18 * @px;
      .carNum {
        margin-right: 49 * @px;
      }
      .carNum,
      .upDown {
        float: left;
      }
      .carNum span:nth-child(1),
      .upDown span:nth-child(1) {
        font-size: 26 * @px;
      }
      .carNum span:nth-child(2),
      .upDown span:nth-child(2) {
        font-size: 16 * @px;
        color: #4d4d4d;
      }
      .upDown img {
        width: 15 * @px;
        height: 22 * @px;
      }
    }
    .out {
      background: url("../../../static/img/jycglpt/out.png") no-repeat center
        center;
      background-size: 100% 100%;
      -webkit-background-size: 100% 100%;
      -ms-background-size: 100% 100%;
      -o-background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      margin-right: 18 * @px;
      .upDown span:nth-child(1) {
        color: #f6541b;
        .word {
          color: #f6541b;
          font-size: 26 * @px;
          line-height: 1;
          vertical-align: text-bottom;
        }
      }
    }
    .risk {
      background: url("../../../static/img/jycglpt/risk.png") no-repeat center
        center;
      background-size: 100% 100%;
      -webkit-background-size: 100% 100%;
      -ms-background-size: 100% 100%;
      -o-background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      .word {
        margin-top: 14 * @px;
        margin-left: 18 * @px;
        font-size: 20 * @px;
        line-height: 1;
      }
      .highLow {
        font-size: 42 * @px;
        margin-left: 243 * @px;
        font-weight: bold;
        color: #f6541b;
        line-height: 1;
      }
      .progress {
        margin-top: 24 * @px;
        margin-left: 18 * @px;
        .date {
          font-size: 16 * @px;
          line-height: 1;
        }
        .strip {
          width: 468 * @px;
          height: 14 * @px;
          border-radius: 14 * @px;
          -webkit-border-radius: 14 * @px;
          -ms-border-radius: 14 * @px;
          -o-border-radius: 14 * @px;
          -moz-border-radius: 14 * @px;
          background: #d9e2e9;
          margin-top: 17 * @px;
          img {
            width: 267 * @px;
            height: 10 * @px;
            vertical-align: top;
            margin-top: 2 * @px;
            margin-left: 5 * @px;
          }
        }
      }
    }
  }
}
</style>
