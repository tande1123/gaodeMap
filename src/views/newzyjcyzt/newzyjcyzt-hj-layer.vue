<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 环境 弹窗-->
<template>
  <div class="layer">
    <div class="head">
      <p>重点污染企业</p>
      <img src="../../../static/assets/img/newzyjcyzt/x.png" alt="" @click="close">
    </div>
    <div class="container">
      <div class="tabList">
        <div :class="activeTab==1?'active':''" @click="tabClick(1)">企业详情</div>
        <div :class="activeTab==2?'active':''" @click="tabClick(2)">监控结果</div>
        <div :class="activeTab==3?'active':''" @click="tabClick(3)">历史对比</div>
      </div>
      <!-- 企业详情 -->
      <div v-if="activeTab==1" class="massage">
        <p style="font-weight: bold;margin-top: 20px;">武汉重工铸锻有限责任公司</p>
        <p>地 &nbsp;&nbsp;址：武汉市青山区武东路1号</p>
        <p>联系人：刘中山</p>
        <p>
          <span>电 &nbsp;&nbsp;话：027-68861968</span>
          <span><img src="../../../static/assets/img/newzyjcyzt/tel.png" alt=""></span>
        </p>
        <p>
          <span>手 &nbsp;&nbsp;机：13687592934</span>
          <span><img src="../../../static/assets/img/newzyjcyzt/phone.png" alt=""></span>
        </p>
      </div>
      <!-- 监测结果 -->
      <div v-if="activeTab==2" class="dateTime">
        <div class="date">
          <p>监测日期：2018/12/18</p>
          <p>分布日期：2018/12/18</p>
        </div>
        <div class="table">
          <div class="th">
            <div class="td">污染值</div>
            <div class="td">监测值</div>
            <div class="td">标准值</div>
            <div class="td">单位</div>
            <div class="td">状态</div>
          </div>
          <div class="tr">
            <div class="td">氨氮</div>
            <div class="td">2.88</div>
            <div class="td">0-8</div>
            <div class="td">mg/l</div>
            <div class="td" style="color:#33c769">正常</div>
          </div>
          <div class="tr">
            <div class="td">化学需氧量</div>
            <div class="td">56</div>
            <div class="td">0-50</div>
            <div class="td">mg/l</div>
            <div class="td" style="color:#db612c">异常</div>
          </div>
        </div>
      </div>
      <!-- 历史对比 -->
      <div class="history">
        <p>一周数据对比</p>
        <div class="myChart" ref="myChart"></div>
        <div class="detaik-pollute">
          <p>
            <img src="../../../static/assets/img/newzyjcyzt/andan.png" alt="">
            <span>氨氮</span>
          </p>
          <p>
            <img src="../../../static/assets/img/newzyjcyzt/huaxue.png" alt="">
            <span>化学需氧量</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
export default {
  data () {
    return {
      activeTab: 1
    }
  },
  props: [],
  computed: {
    ...mapState(['zdwl'])
  },
  methods: {
    tabClick (index) {
      this.activeTab = index
    },
    initEchart () {
      let chart = echarts.init(this.$refs.myChart)
      chart.setOption({
        label: {
          normal: {
            textStyle: { color: '#999999', fontSize: '10' }
          }
        },
        color: ['#da5b1c', '#3fca72'],
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        calculable: true,
        grid: { left: '2%', right: '4%', top: '18%', bottom: '3%', containLabel: true },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: '#dbdddf'
              }
            },
            axisTick: { show: false },
            data: ['', '12月28日', '12月29日', '12月30日', '12月31日', '1月1日', '1月2日', '1月3日'],
            axisLabel: {// 字体样式
              show: true,
              color: '#8e8e8e',
              interval: 0,
              inside: false,
              formatter: null,
              showMinLabel: null,
              showMaxLabel: null,
              rotate: 45
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                // 设置Y轴颜色
                color: '#dbdddf'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#8e8e8e'
              }
            },
            name: '( 单位：mg/l ) ',
            max: 80,
            min: 0,
            nameTextStyle: {
              align: 'center',
              padding: [0, 0, 0, 50],
              color: '#999'
            }
          }
        ],
        series: [
          {
            name: '氨氮',
            type: 'line',
            symbol: 'none',
            data: [6, 5, 3, 6, 2, 1, 9, 7],
            lineStyle: {
              // 设置折线色颜色
              color: '#da5b1c'
            }
          },
          {
            name: '化学需氧量',
            type: 'line',
            symbol: 'none',
            data: [16, 15, 13, 16, 12, 11, 19, 17],
            lineStyle: {
              // 设置折线色颜色
              color: '#3fca72'
            }
          }
        ]
      })
    },
    close () {
      this.$store.commit('setZdwl', false)
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.initEchart()
    this.chart = echarts.init(this.$refs.myChart)
    let that = this
    window.addEventListener('resize', function (params) {
      that.chart.resize()
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
.layer {
  width: 406 * @px;
  font-size: 16 * @px;
  border-radius: 5 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  position: relative;
  letter-spacing: 1 * @px;
  &::after {
    position: absolute;
    display: inline-block;
    bottom: -6 * @px;
    left: calc(50% - 8 * @px);
    width: 0;
    height: 0;
    content: "";
    border-style: solid;
    border-width: 8 * @px;
    border-color: #fff #fff transparent transparent;
    transform: rotate(135deg);
  }
  .head {
    height: 40 * @px;
    background: url("../../../static/assets/img/newzyjcyzt/title-bg1.png")
      center center no-repeat;
    background-size: 100% 100%;
    padding: 0 14 * @px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18 * @px;
    font-weight: bold;
    color: #fff;
    border-radius: 5 * @px 5 * @px 0 0;
    letter-spacing: 2 * @px;
    img {
      width: 14 * @px;
      height: 13 * @px;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .container {
    padding: 11 * @px 14 * @px 26 * @px;
    background: #f7fbff;
    border-radius: 0 0 5 * @px 5 * @px;
    font-size: 16 * @px;
    height: 267 * @px;
    position: relative;
    .tabList {
      display: flex;
      box-sizing: border-box;
      div {
        flex: 1;
        height: 40 * @px;
        line-height: 40 * @px;
        text-align: center;
        background: #b3d0ed;
        color: #fff;
        cursor: pointer;
        border-radius: 4 * @px;
        &:nth-child(1),
        &:nth-child(2) {
          margin-right: 1px;
        }
        &.active {
          background: #0a7cc8;
          position: relative;
          &::after {
            position: absolute;
            display: inline-block;
            bottom: -6 * @px;
            left: calc(50% - 6 * @px);
            width: 0;
            height: 0;
            content: "";
            border-style: solid;
            border-width: 6 * @px;
            border-color: #fff #fff transparent transparent;
            transform: rotate(315deg);
          }
        }
      }
    }
    // 企业详情
    .massage {
      z-index: 999;
      position: absolute;
      background: #fff;
      height: 216 * @px;
      top: 50 * @px;
      left: 14 * @px;
      right: 14 * @px;
      background: #f7fbff;
      p:nth-child(1) {
        margin-top: 20 * @px;
      }
      p {
        line-height: 32 * @px;
        span {
          display: inline-block;
          &:last-child {
            margin-left: 12 * @px;
            img {
              width: 20 * @px;
              height: 20 * @px;
              vertical-align: -3 * @px;
            }
          }
        }
        &:last-child {
          span:last-child {
            margin-left: 17 * @px;
          }
        }
      }
    }
    // 监测结果
    .dateTime {
      z-index: 999;
      position: absolute;
      background: #fff;
      height: 216 * @px;
      top: 50 * @px;
      left: 14 * @px;
      right: 14 * @px;
      background: #f7fbff;
      .date {
        margin-top: 6 * @px;
        display: flex;
        padding-right: 7 * @px;
        justify-content: space-between;
        p {
          line-height: 30 * @px;
        }
      }
      .table {
        border: 1px solid #d3d8df;
        text-align: center;
        .th {
          height: 47 * @px;
          line-height: 47 * @px;
          font-weight: bold;
          background: #ebeff3;
          display: flex;
          .td:nth-child(1) {
            width: 86 * @px;
          }
          .td:nth-child(2) {
            width: 70 * @px;
          }
          .td:nth-child(3) {
            width: 81 * @px;
          }
          .td:nth-child(4) {
            width: 69 * @px;
          }
          .td:nth-child(5) {
            width: 70 * @px;
          }
        }
        .tr {
          height: 42 * @px;
          line-height: 42 * @px;
          display: flex;
          cursor: pointer;
          &:nth-child(2) {
            background: #fff;
            &:hover {
              background: #e0ecf8;
            }
          }
          &:nth-child(3) {
            background: #e0ecf8;
          }
          .td:nth-child(1) {
            width: 86 * @px;
          }
          .td:nth-child(2) {
            width: 70 * @px;
          }
          .td:nth-child(3) {
            width: 81 * @px;
          }
          .td:nth-child(4) {
            width: 69 * @px;
          }
          .td:nth-child(5) {
            width: 70 * @px;
          }
        }
      }
    }
    // 历史对比
    .history {
      z-index: 666;
      position: absolute;
      top: 50 * @px;
      left: 14 * @px;
      right: 14 * @px;
      background: #f7fbff;
      p {
        text-align: center;
        font-weight: bold;
        margin-top: 14 * @px;
      }
      .myChart {
        height: 180 * @px;
      }
      .detaik-pollute {
        position: absolute;
        top: 25 * @px;
        right: 14 * @px;
        display: flex;
        font-size: 12 * @px;
        color: #a1a1a1;
        p:nth-child(1) {
          margin-right: 8 * @px;
        }
      }
    }
  }
}
</style>
