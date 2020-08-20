<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:09:46
 -->

<!-- 今日班车统计 -->
<template>
  <div class="bctj-box">
    <h3>今日班车统计</h3>
    <div class="bctj-wrap">
      <div class="title">单位：辆</div>
      <div class="chart" ref="echarts">
      </div>
    </div>
  </div>
</template>
<script>
import common from '../../utils/common.es'
let echarts = require('echarts')
export default {
  data () {
    return {
      bcData: { 'ARRIVE': [], 'DRIVING': [], 'UNSTARTED': [] },
      list: {}
    }
  },
  methods: {
    classfyData (result) { // 数据分组组织
      var resultdata = {}
      result.forEach(element => {
        var cartype = element.RUNNING_STATUS
        if (!resultdata[cartype]) {
          resultdata[cartype] = []
        }
        resultdata[cartype].push(element)
      })
      return resultdata
    },
    init () {
      let parameters = {
        parameter: {
          'DoAction': 'querymvsbusmanage'
        }
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', parameters).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyResult)
        this.bcData = this.classfyData(result)
        for (var key in this.bcData) {
          var gameData = [] // 赛事班车
          var arriveData = [] // 抵达班车
          var leaveData = [] // 离开班车
          var ceremonyData = [] // 开闭幕式班车
          let element = this.bcData[key]
          for (var j = 0; j < element.length; j++) {
            if (element[j].SHUTTLE_TYPE.includes('GAME')) {
              gameData.push(element)
            }
            if (element[j].SHUTTLE_TYPE.includes('ARRIVE')) {
              arriveData.push(element)
            }
            if (element[j].SHUTTLE_TYPE.includes('LEAVE')) {
              leaveData.push(element)
            }
            if (element[j].SHUTTLE_TYPE.includes('CEREMONY')) {
              ceremonyData.push(element)
            }
          }
          this.list[key] = [arriveData.length, leaveData.length, gameData.length, ceremonyData.length]
        }
        this.chart()
      })
    },
    chart () {
      let chart = echarts.init(this.$refs.echarts)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#2696c4', '#ffca30', '#f90000'],
        legend: {
          orient: 'horizontal',
          y: 'bottom',
          data: ['已发车', '已到达', '未发车'],
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#aec7e5'
          }
        },
        grid: { right: '5%' },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['抵达迎宾', '离开送宾', '赛时', '开闭幕式'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#bad5f0'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#bad5f0'
              }
            },
            axisTick: { // 去掉y轴刻度线
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#475c79'],
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '已发车',
            type: 'bar',
            data: this.list['DRIVING'] ? this.list['DRIVING'] : [0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#f8b435'
                }, {
                  offset: 1,
                  color: '#051e35'
                }]),
                borderType: 'solid',
                borderWidth: 2,
                borderColor: '#1d97a6'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#f8b435',
                formatter: function (params) {
                  if (params.value > 0) {
                    return params.value
                  } else {
                    return ''
                  }
                }
              }
            }
          },
          {
            name: '已到达',
            type: 'bar',
            data: this.list['ARRIVED'] ? this.list['ARRIVED'] : [0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#2abf6e'
                }, {
                  offset: 1,
                  color: '#0f212d'
                }]),
                borderType: 'solid',
                borderWidth: 2,
                borderColor: '#60bd60'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#2abf6e',
                formatter: function (params) {
                  if (params.value > 0) {
                    return params.value
                  } else {
                    return ''
                  }
                }
              }
            }
          },
          {
            name: '未发车',
            type: 'bar',
            barGap: '30%',
            data: this.list['UNSTARTED'] ? this.list['UNSTARTED'] : [0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00cdfe'
                }, {
                  offset: 1,
                  color: '#202423'
                }]),
                borderType: 'solid',
                borderWidth: 2,
                borderColor: '#00cdfe'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#00cdfe',
                formatter: function (params) {
                  if (params.value > 0) {
                    return params.value
                  } else {
                    return ''
                  }
                }
              }
            }
          }
        ]
      })
    }
  },
  mounted () {
    let chart = echarts.init(this.$refs.echarts)
    window.addEventListener('resize', function (params) {
      chart.resize()
    })
    this.init()
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.bctj-box {
  height: 274 * @px;
  background: url("../../../static/assets/img/jtzx/border2.png") center center
    no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  h3 {
    color: #00effe;
    letter-spacing: 1px;
    text-indent: 16px;
    font-weight: bold;
    font-size: 18 * @px;
    line-height: 24 * @px;
    margin-top: 14 * @px;
    border-left: 5 * @px solid #00cdfe;
    background: rgba(17, 70, 124, 0.6);
  }
  .bctj-wrap {
    width: 100%;
    background: rgba(9, 24, 66, 0.2);
    position: relative;
    .title {
      position: absolute;
      top: 20 * @px;
      right: 18 * @px;
      font-size: 14 * @px;
      font-weight: bold;
      color: #b1cff3;
    }
    .chart {
      width: 100%;
      height: 220 * @px;
    }
  }
}
</style>
