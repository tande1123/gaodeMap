<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-10-14 14:35:28
 -->
<!-- 交通 军运村实时车流-->
<template>
  <div class="jycsscl">
    <p class='title'>3号停车场今日车流量统计</p>
    <div class="car">
      <div class="enterCar">
        <div class="imgBox">
          <p><span>{{entry}}</span>辆</p>
        </div>
        <p>进入车辆</p>
      </div>
      <div class="outCar">
        <div class="imgBox">
          <p><span>{{out}}</span>辆</p>
        </div>
        <p>出去车辆</p>
      </div>
    </div>
  </div>
</template>
<script>
import common from '../../utils/common.es'
import fmtDate from '@/utils/formatdate.es'
export default {
  data () {
    return {
      entry: 0,
      out: 0
    }
  },
  props: [],
  computed: {},
  methods: {
    initData (time1) { // 初始化获取对应位置的数据集合
      let parameters = {
        parameter: {
          'DoAction': 'queryhkbms',
          'Conditions': [
            [
              {
                'Column': 'TIMEDAY',
                'ColumnDataType': 'string',
                'Mode': 'IS',
                'Value': time1
              }
              // ,
              // {
              //   'Column': 'TIMEHOUR',
              //   'ColumnDataType': 'string',
              //   'Mode': 'IS',
              //   'Value': time2
              // }
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
    classfiyData (res) {
      res.forEach((ele, index, array) => {
        if (ele.INANDOUT === '0') {
          this.entry++
        } else if (ele.INANDOUT === '1') {
          this.out++
        }
      })
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    let date = new Date()
    let date1 = fmtDate.formatDate(date, 'yyyyMMdd')
    // let time1 = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + '' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + '' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
    this.initData(date1)
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
.jycsscl {
  width: 414 * @px;
  height: 210 * @px;
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
  .car {
    margin: 14 * @px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &.enterCar .imgBox,
      &.outCar .imgBox {
        width: 114 * @px;
        height: 112 * @px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        p {
          margin-top: 6 * @px;
          span {
            font-size: 20 * @px;
            font-weight: bold;
          }
        }
      }
      &.enterCar .imgBox {
        background: url("../../../static/assets/img/newzyjcyzt/enterCar.png")
          center center no-repeat;
        background-size: 100% 100%;
      }
      &.outCar .imgBox {
        background: url("../../../static/assets/img/newzyjcyzt/outCar.png")
          center center no-repeat;
        background-size: 100% 100%;
      }
      p {
        font-size: 16 * @px;
        margin-top: 7 * @px;
        font-weight: bold;
      }
    }
  }
}
</style>
