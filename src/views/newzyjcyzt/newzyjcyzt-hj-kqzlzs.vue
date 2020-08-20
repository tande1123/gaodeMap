<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:13:56
 -->

<!--环境  空气质量指数-->
<template>
  <div class="qkzlzsbox">
    <p class="title">整点空气质量</p>
    <div class="tabbox">
      <!-- <nav class="tabbar">
        <p :class="activebar?'tabbaractive':''" @click="tab(true)">未来七天</p>
        <p :class="!activebar?'tabbaractive':''" @click="tab(false)">过去十天</p>
      </nav> -->
      <div :class="activebar?'echartsbox zindexshow':'echartsbox'" ref="echartsbox">
        <div ref="echarts" style="width:100%;height:100%">
        </div>
      </div>
      <!-- <div :class="activebar?'echartsbox ':'echartsbox zindexshow'" ref="towechartsbox">
        <div ref="towecharts" style="width:100%;height:100%">
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import common from '@/utils/common.es'
// 引入基本模板
let echarts = require('echarts')
export default {
  data () {
    return {
      echartsdom: null,
      echartstime: null,
      activebar: true,
      towechartsdom: null,
      echarsdata: {
        title: {
          right: 20,
          top: 0,
          text: 'asss',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal'
          },
          backgroundColor: '#bcb9b9',
          borderRadius: 5
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 20,
          height: '70%'
        },
        axisLine: {
          show: false
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月28日', '1月28日', '1月28日', '1月28日', '1月28日', '1月28日', '1月29日'],
            axisLabel: {
              show: true, interval: 0, inside: false, rotate: 0, margin: 8, formatter: null, showMinLabel: null, showMaxLabel: null, textStyle: { color: '#999999' }
            },
            axisTick: {
              show: false
            },
            axisLine: {show: false}
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                width: 0.5
              }
            },
            type: 'value',
            // name: '( 单位：μg/m3 ) ',
            nameTextStyle: {
              align: 'center',
              padding: [0, 0, 0, 50],
              color: '#999'
            },
            axisTick: {
              show: false
            },
            max: 500,
            min: 0,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#999999'
              }
            },
            axisLine: {show: false}
          }
        ],
        series: [
          {
            barWidth: 10,
            type: 'bar',
            data: [1, 2, 3, 4, 5, 6, 7], // aqi
            itemStyle: {

              normal: {
                label: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    color: '#4d4d4d',
                    fontSize: 14
                  }
                },
                // borderColor: '#f7b43e',
                borderWidth: 1,
                legendHoverLink: true,
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //   offset: 0,
                //   color: '#ffb967'
                // },
                // {
                //   offset: 1,
                //   color: '#f7e9d0'
                // }])
                color: function (params) {
                  if (params.value <= 50) {
                    return '#9dca80'
                  } else if (params.value <= 100) {
                    return '#f7da64'
                  } else if (params.value <= 150) {
                    return '#f29e39'
                  } else if (params.value <= 200) {
                    return '#e1767c'
                  } else if (params.value <= 300) {
                    return '#c65d93'
                  } else {
                    return '#881326'
                  }
                }
              }
            }
          }
        ]
      } // echar 数据配置
    }
  },
  props: [],
  computed: {},
  methods: {
    tab (type) {
      this.activebar = type
      setTimeout(() => { // echar动画结束后调用适配
        this.resizeechar()
      }, 100)
    },
    yugi (data, n) { // 传入数组和日期天数 返回未来或过去的日期 負數為過去天  正數為未來天
      let d = Math.abs(n)
      var now = new Date()
      if (n === 0) {
        data[0] = now.getMonth() + 1 + '月' + (now.getDate())
        return
      }
      for (let i = 1; i <= d; i++) {
        var tnow = new Date()
        if (n < 0) {
          tnow.setDate(now.getDate() - (i))
        } else {
          tnow.setDate(now.getDate() + (i))
        }
        data[i - 1] = tnow.getMonth() + 1 + '月' + (tnow.getDate()) + '日'
      }
    },
    resizeechar () {
      this.echartsdom.resize()
      this.towechartsdom.resize()
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let option = this.echarsdata // 未来七天
    // let tenDays = this.echarsdata // 过去十天
    // let wlqt = []
    // let gqst = []
    // // 请求内容 未来七天
    // let data = {
    //   parameter: {
    //     DoAction: 'querygiswebdatahbaqi',
    //     Conditions: [
    //       null
    //     ],
    //     Offset: {
    //       Start: 0,
    //       Count: 7
    //     },
    //     OrderBy: {
    //       Column: 'TIME_POINT',
    //       Order: 'desc'
    //     }
    //   },
    //   token: 'string'
    // }
    // // 过去十天
    // let gqdata = {
    //   parameter: {
    //     DoAction: 'querygiswebdatahbaqi',
    //     Conditions: [
    //       null
    //     ],
    //     Offset: {
    //       Start: 0,
    //       Count: 10
    //     },
    //     OrderBy: {
    //       Column: 'TIME_POINT',
    //       Order: 'asc'
    //     }
    //   },
    //   token: 'string'
    // }
    let currentData = {
      parameter: {
        DoAction: 'querygiswebdatapm25citysummary',
        Offset: {
          Start: 0,
          Count: 12
        },
        OrderBy: {
          Column: 'TIME_POINT',
          Order: 'desc'
        }
      },
      token: 'string'
    }
    // 查询
    this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', currentData).then((res) => {
      let datas = common.convertTable2objects(res.data.QuerySafetyResult).reverse()
      let seriesData = datas.map(item => {
        return item.AQI
      })
      console.log(seriesData)
      let timeSeries = datas.map(item => {
        //  IE11里面不能直接转换带"-",必须先替换成"/"
        let strTime = item.TIME_POINT.replace('-', '/')
        let timeItem = new Date(strTime)
        return checkTime(timeItem.getHours())
      })
      console.log(timeSeries)
      option.xAxis[0].data = timeSeries
      option.series[0].data = seriesData
      option.yAxis[0].max = Math.max(...seriesData) + 2
      option.yAxis[0].min = Math.min(...seriesData) - 2
      option.title.text = '过去12小时AQI最高值： ' + Math.max(...seriesData).toString()
      this.echartsdom.setOption(option)
      //   let arr = []
      //   for (let i = 0; i < 7; i++) {
      //     arr[i] = common.convertTable2objects(res.data.QuerySafetyResult)[i].AQI
      //   }
      //   this.yugi(wlqt, 7)
      //   option.xAxis[0].data = wlqt
      //   option.series[0].data = arr // 数据赋值
      // this.echartsdom.setOption(option)
    // }).catch((err) => { console.log(err) })
    // // 过去十天
    // this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', gqdata).then((res) => {
    //   let arr = []
    //   for (let i = 0; i < 10; i++) {
    //     arr[i] = common.convertTable2objects(res.data.QuerySafetyResult)[i].AQI
    //   }
    //   this.yugi(gqst, (-10))
    //   tenDays.xAxis[0].data = gqst.reverse()
    //   tenDays.series[0].data = arr.reverse() // 数据赋值
    //   this.towechartsdom.setOption(tenDays)
    }).catch((err) => { console.log(err) })
    // echar渲染
    this.echartsdom = echarts.init(this.$refs.echarts)
    // this.towechartsdom = echarts.init(this.$refs.towecharts)
    // this.echartsdom.setOption(option)
    // this.towechartsdom.setOption(tenDays)
    /* 改变图表尺寸 自适应 */
    var that = this
    window.addEventListener('resize', function () {
      that.resizeechar()
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {
    clearInterval(this.echartstime)
  },
  destroyed () { },
  errorCaptured () { }
}
// 格式化时间，如果不足2位，前面补0
function checkTime (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.qkzlzsbox {
  width: 414 * @px;
  height: 330 * @px;
  border-radius: 4 * @px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  .title {
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../../static/assets/img/newzyjcyzt/headbg.png") center
      100% no-repeat;
    font-size: 18 * @px;
    font-weight: bold;
    text-indent: 13 * @px;
    overflow: hidden;
    letter-spacing: 2 * @px;
  }
  .tabbox {
    height: 290 * @px;
    width: 414 * @px;
    padding: 14 * @px;
  }
  .tabbar {
    width: 100%;
    height: 26 * @px;
    border-radius: 4 * @px;
    overflow: hidden;
    p {
      width: 50%;
      float: left;
      height: 26 * @px;
      line-height: 26 * @px;
      text-align: center;
      background: #b8d4ef;
      color: #fff;
      font-size: 14 * @px;
      cursor: pointer;
      transition: 0.3s;
    }
    .tabbaractive {
      background: #0987cf !important;
    }
  }
}
.echartsbox {
  width: 100%;
  height: 236 * @px;
  position: absolute;
  left: 0;
  background: #fff;
  padding-left: 14 * @px;
}
.zindexshow {
  z-index: 999;
}
</style>
