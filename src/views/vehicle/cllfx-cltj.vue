<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 交通 军运村车辆统计-->
<template>
  <div class="jyccltj">
    <p class='title'>军运村车流量统计</p>
    <div class="chartBox">
      <div class="myChart" ref="myChart">
      </div>
      <div class="detaik-car">
        <p>
          <img src="../../../static/assets/img/newzyjcyzt/enterLine.png" alt="">
          <span>流入车辆</span>
        </p>
        <p>
          <img src="../../../static/assets/img/newzyjcyzt/outLine.png" alt="">
          <span>流出车辆</span>
        </p>
      </div>
      <div class="echar-hour">
        <p>(</p>
        <p>小时</p>
        <p>)</p>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () { return {} },
  props: [],
  computed: {},
  methods: {
    initEchart () {
      let chart = echarts.init(this.$refs.myChart)
      chart.setOption({
        label: {
          normal: {
            textStyle: { color: '#999999', fontSize: '10' }
          }
        },
        color: ['#3dc991', '#1a84cb'],
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        calculable: true,
        grid: { left: '2%', right: '8%', top: '18%', bottom: '3%', containLabel: true },
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
            splitLine: { show: false },
            axisTick: { show: false },
            data: ['', 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            axisLabel: {// 字体样式
              show: true,
              color: '#8e8e8e',
              interval: 0,
              inside: false,
              formatter: null,
              showMinLabel: null,
              showMaxLabel: null
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: false },
            axisTick: { show: false },
            // splitNumber: 3,
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
            name: '车流量 ( 辆 ) ',
            nameTextStyle: {
              align: 'left',
              padding: [0, 0, 0, 50],
              color: '#000',
              fontWeight: 'bold'
            }
          }
        ],
        series: [
          {
            name: '流入车辆',
            type: 'line',
            areaStyle: {},
            symbol: 'circle',
            data: ['', 117, 116, 115, 112, 106, 105, 101, 80, 60, 40, 30, 20, 10],
            lineStyle: {
              color: '#3dc991' // 设置折线色颜色
            },
            itemStyle: { // 设置折线折点的颜色
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#3fcc91' // 0% 处的颜色
                }, {
                  offset: 0.4, color: '#6dd7ab' // 100% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
                ) // 背景渐变色
              }
            }
          },
          {
            name: '流出车辆',
            type: 'line',
            areaStyle: {},
            symbol: 'circle',
            data: ['', 107, 106, 105, 102, 96, 95, 91, 70, 50, 30, 20, 10, 5],
            lineStyle: { // 设置折线色颜色
              color: '#1a84cb'
            },
            itemStyle: { // 设置折线折点的颜色
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#257aca' // 0% 处的颜色
                }, {
                  offset: 0.4, color: '#4593ca' // 100% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
                ) // 背景渐变色
              }
            }
          }
        ]
      })
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
.jyccltj {
  width: 414 * @px;
  height: 280 * @px;
  border-radius: 5 * @px;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
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
  .chartBox {
    position: relative;
    .myChart {
      width: 100%;
      height: 222 * @px;
      margin: 5 * @px 0;
    }
    .detaik-car {
      position: absolute;
      top: 4 * @px;
      right: 14 * @px;
      display: flex;
      flex-direction: column;
      font-size: 12 * @px;
      color: #7a7b7c;
    }
    .echar-hour {
      width: 42 * @px;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: rotate(90deg);
      -ms-transform: rotate(90deg); /* IE 9 */
      -moz-transform: rotate(90deg); /* Firefox */
      -webkit-transform: rotate(90deg);
      color: #b2b2b2;
      display: flex;
      p:nth-child(1) {
        position: absolute;
        top: -16 * @px;
        right: 56 * @px;
      }
      p:nth-child(3) {
        position: absolute;
        top: -16 * @px;
        right: 20 * @px;
      }
      p:nth-child(2) {
        line-height: 1.1;
        position: absolute;
        top: -19 * @px;
        right: 33 * @px;
        width: 14 * @px;
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg); /* IE 9 */
        -moz-transform: rotate(-90deg); /* Firefox */
        -webkit-transform: rotate(-90deg);
      }
    }
  }
}
</style>
