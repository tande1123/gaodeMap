<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 交通 军运村内车辆类型分布-->
<template>
  <div class="cllxfb">
    <p class='title'>军运村内车辆类型分布</p>
    <div class="bg">
      <div ref="ssyqEchar" id="ssyqEchar" class="ssyqEchar"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: [],
  computed: {},
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.ssyqEchar)
      let rqtjChar2 = echarts.init(this.$refs.ssyqEchar)
      window.addEventListener('resize', function () {
        rqtjChar2.resize()
      })
      this.chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        graphic: [
          {
            type: 'image',
            style: {
              image: require('../../../static/assets/img/newzyjcyzt/che.png'),
              x: 150,
              y: 130,
              width: 130,
              height: 100
            }
          }
        ],
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
            center: ['52%', '50%'],
            color: ['#0a7bc7', '#3eca90', '#f7b43e'],
            data: [
              { value: 465, name: '班车' },
              { value: 230, name: 'vip车辆' },
              { value: 115, name: '特种车辆' }
            ],
            label: {
              normal: {
                // \n\n可让文字居于牵引线上方，很关键
                //  {b}  代表显示的内容标题
                // {d}代表数据
                formatter: ' {d}% \n{b}\n\n\n',
                borderWidth: 20,
                borderRadius: 4,
                padding: [0, -52],
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              borderWidth: 5, // 设置border的宽度有多大
              borderColor: '#fff',
              emphasis: {
                shadowBlur: 100,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
    this.initChart()
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
.cllxfb {
  width: 414 * @px;
  height: 400 * @px;
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
  .bg {
    width: 414 * @px;
    height: 357 * @px;
    .ssyqEchar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
