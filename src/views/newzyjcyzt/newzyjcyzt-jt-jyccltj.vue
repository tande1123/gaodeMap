<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-10-14 15:29:12
 -->
<!-- 交通 军运村车辆统计-->
<template>
  <div class="jyccltj">
    <p class='title'>3号停车场车流量统计<span class="xiangqing" @click="ShowDetil">详情</span></p>
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
import common from '../../utils/common.es'
import fmtDate from '@/utils/formatdate.es'
export default {
  data () {
    return {
      car_in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 进村车辆0
      car_out: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]// 出村车辆1
    }
  },
  props: [],
  computed: {},
  methods: {
    initData (preday, today, time2) { // 初始化获取对应位置的数据集合
      let parameters = {
        parameter: {
          'DoAction': 'queryhkbms',
          'Conditions': [
            [
              {
                'Column': 'TIMEDAY',
                'ColumnDataType': 'string',
                'Mode': 'IS',
                'Value': preday
              },
              {
                'Column': 'TIMEHOUR',
                'ColumnDataType': 'string',
                'Mode': 'GTE', // 大于或等于
                'Value': time2
              }
            ],
            [
              {
                'Column': 'TIMEDAY',
                'ColumnDataType': 'string',
                'Mode': 'IS',
                'Value': today
              },
              {
                'Column': 'TIMEHOUR',
                'ColumnDataType': 'string',
                'Mode': 'LTE', // 小于或等于
                'Value': time2
              }
            ]

          ]

        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', parameters).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyResult)
        this.classfiyData(result)
      })
    },
    initEchart () {
      var y1 = this.car_in
      var y2 = this.car_out
      let xdata = this.setEchartXdata()
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
            data: xdata,
            axisLabel: {// 字体样式
              show: true,
              color: '#8e8e8e',
              interval: 1,
              inside: false,
              formatter: null,
              showMinLabel: null,
              showMaxLabel: null
            }
          }
        ],
        yAxis: [
          {
            minInterval: 1,
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
            data: y1,
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
            data: y2,
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
    },
    classfiyData (result) {
      result.forEach(ele => {
        let hour = ele.PASS_TIME_STR.split(' ')[1].split(':')[0]
        if (ele.INANDOUT === '0') {
          this.car_in[hour - 1]++
        } else if (ele.INANDOUT === '1') {
          this.car_out[hour - 1]++
        }
      })
      this.initEchart()
    },
    ShowDetil () {
      this.$emit('showDetail', true)
    },
    // 设置x轴数据
    setEchartXdata () {
      let date = new Date()
      let arr1 = []
      let arr2 = []
      let result = []
      let hour = date.getHours()
      if (hour === 24) {
        for (let i = 0; i < 24; i++) {
          result.push(i)
        }
      } else {
        for (let i = hour + 1; i <= 24; i++) {
          arr1.push(i)
        }
        for (let i = 1; i <= hour; i++) {
          arr2.push(i)
        }
        result = arr1.concat(arr2)
      }
      return result
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let date = new Date()
    var preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000) // 前一天
    let preday = fmtDate.formatDate(preDate, 'yyyyMMdd')
    let today = fmtDate.formatDate(date, 'yyyyMMdd')
    let time1 = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + '' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + '' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
    console.log(preday, time1)
    // this.initData('20190904', '130754')
    this.initData(preday, today, time1)
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
    .xiangqing{
      float: right;
      margin-right: 20* @px;
      cursor: pointer;
    }
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
