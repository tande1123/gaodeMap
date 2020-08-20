<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:15:39
 -->

<!-- 新版专业检测一张图 停车场统计-->
<template>
  <div class="tcctj">
    <p class="title">军运村停车场统计</p>
    <div class="bg">
      <div ref="ssyqEchar" id="ssyqEchar" class="ssyqEchar"></div>
    </div>
    <!-- <div class="infobox">
      <p class="tagging"><span class="ytcw">已停车位</span><span class="kxcw">空闲车位</span></p>
      <div class="detailsbox" v-for="(item,index) in dataList" :key="index">
        <h1>{{item.name}}</h1>
        <div class="total">
          <div class="left" :style="{width:(item.count1*100/(item.count1+item.count2))+'%'}">
            <p>{{item.count1}}</p>
            <p></p>
          </div>
          <div class="right" :style="{width:(item.count2*100/(item.count1+item.count2))+'%'}">
            <p>{{item.count2}}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import common from '../../utils/common.es'
export default {
  data () {
    return {
      MVS_PARKINGLOTList: [],
      chart: null
    }
  },
  props: [],
  computed: {},
  methods: {
    loadData () {
      let self = this
      let parameters = {// 获取对应位置的数据集合
        parameter: {
          'DoAction': 'getparkingaction'
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', parameters).then(res => {
        let result = common.convertTable2objects(res.data.QuerySafetyResult)
        self.MVS_PARKINGLOTList = result
        self.initChart(result)
      })
    },
    initChart (parkingList) {
      let park = 0
      let free = 0
      let total = 0
      parkingList.forEach(element => {
        if (element.NAME === 'VIP停车场') {
          total = parseInt(element['TOTAL_NUM'])
          park = parseInt(element['TOTAL_NUM']) - parseInt(element['FREE_NUM'])
          free = parseInt(element['FREE_NUM'])
        }
      })
      this.chart = echarts.init(this.$refs.ssyqEchar)
      let rqtjChar2 = echarts.init(this.$refs.ssyqEchar)
      window.addEventListener('resize', function () {
        rqtjChar2.resize()
      })
      this.chart.setOption({
        title: {
          text: 'vip停车场',
          left: 20,
          top: 20
        },
        tooltip: {
          trigger: 'item'
        },
        graphic: [{
          type: 'text',
          left: '47%',
          top: '43%',
          z: 10,
          style: {
            text: (total + '个'),
            font: '22px Microsoft YaHei',
            color: '#64d3b2',
            fill: '#64d3b2'
          }
        },
        {
          type: 'text',
          left: '43%',
          top: '53%',
          style: {
            fill: '#686868',
            text: '总停车位',
            font: '22px Microsoft YaHei'
          }
        }],
        series: [
          {
            name: '军运村车辆类型分布',
            type: 'pie',
            labelLine: { // 设置延长线的长度
              normal: {
                length: 20, // 设置延长线的长度
                length2: 60 // 设置第二段延长线的长度
              }
            },
            radius: ['46%', '54%'],
            center: ['54%', '50%'],
            color: ['#f8ba57', '#69a5e1'],
            data: [
              { value: free, name: '空闲车位' },
              { value: park, name: '已占用停车位' }
            ],
            label: {
              normal: {
                // \n\n可让文字居于牵引线上方，很关键
                //  {b}  代表显示的内容标题
                // {d}代表数据
                formatter: '{c}个\n{b}\n\n\n',
                borderWidth: 20,
                borderRadius: 4,
                padding: [4, -52],
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16
                }
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
    this.loadData()
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { },
  components: {
  }
}
</script>
<style lang='less' scoped>
@px: 30rem/1920;
.tcctj {
  width: 414 * @px;
  height: 385 * @px;
  background: #fff;
  border-radius: 5 * @px;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  letter-spacing: 2 * @px;
  .bg {
    height: 345 * @px;
    width: 100%;
    .ssyqEchar {
      width: 100%;
      height: 100%;
    }
  }
}
.tcctj > .title {
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  background: url("../../../static/assets/img/newzyjcyzt/title-bg1.png")
    no-repeat;
  background-size: 100% 100%;
  height: 40 * @px;
  line-height: 40 * @px;
  text-indent: 12 * @px;
}
.tcctj > .infobox {
  height: 345 * @px;
  width: 100%;
  padding: 14 * @px;
  box-sizing: border-box;
}
.tagging {
  text-align: right;
  height: 16 * @px;
  line-height: 16 * @px;
  overflow: hidden;
}
.tagging > span {
  position: relative;
  font-size: 16 * @px;
  color: #999999;
}
.kxcw,
.ytcw {
  padding: 0 0 0 35 * @px;
}
.kxcw::after,
.ytcw::after {
  content: "";
  position: absolute;
  width: 8 * @px;
  height: 8 * @px;
  background: #39e375;
  top: 50%;
  margin-top: -4px;
  left: 23 * @px;
}
.ytcw::after {
  background: #ea4404;
}
.detailsbox {
  width: 100%;
  padding-top: 19 * @px;
  box-sizing: border-box;
  &:nth-child(2) {
    padding-top: 9 * @px;
  }
  .total {
    display: flex;
    justify-content: space-between;
    font-size: 18 * @px;
    font-weight: bold;
    text-align: center;
    .left {
      height: 19 * @px;
      p:nth-child(2) {
        height: 19 * @px;
        background: #eb4403;
        position: relative;
        &::after {
          content: "";
          width: 14 * @px;
          height: 19 * @px;
          position: absolute;
          top: 0;
          right: -10 * @px;
          background: url("../../../static/assets/img/newzyjcyzt/bg-after.png")
            center center no-repeat;
        }
      }
    }
    .right {
      p:nth-child(2) {
        height: 19 * @px;
        background: rgba(37, 209, 117, 0.75);
      }
    }
    p:nth-child(1) {
      padding-left: 14 * @px;
      line-height: 24 * @px;
    }
  }
}
.detailsbox > h1 {
  font-size: 16 * @px;
  color: #4d4d4d;
  position: relative;
  text-indent: 10 * @px;
  height: 16 * @px;
  line-height: 16 * @px;
}
.detailsbox > h1::after {
  content: "";
  width: 3 * @px;
  height: 13 * @px;
  background: #069adc;
  position: absolute;
  top: 50%;
  margin-top: -7 * @px;
  left: 0;
}
</style>
