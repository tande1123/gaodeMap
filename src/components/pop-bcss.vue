<!--班车赛事和交通专项的弹窗-->
<template>
  <div class="bcssInfo2">
    <div class="all">
      <p class="bcxxTitle">班车信息</p>
      <i @click="closeTk"></i>
    </div>
    <div>
      <span>车牌号</span>
      <p>{{fmtCarNum(MarkerData.BUS_NUM ||'')}}</p>
    </div>
    <div>
      <span>地址</span>
      <p :title="MarkerData.END_STATION">{{MarkerData.END_STATION}}</p>
    </div>
    <div>
      <span>{{text}}</span>
      <p>{{fmtDate(time)}}</p>
    </div>
    <div class="peopleCount">
      <span>最大载客量</span>
      <p>{{MarkerData.CAPACITY_NUM}} 人</p>
      <!-- <i @click="showVideo"></i> -->
    </div>
    <div>
      <span>搭载人数</span>
      <p>{{MarkerData.CAPACITY_NUM}} 人</p>
    </div>
    <div class="telphone">
      <span>司机联系方式</span>
      <p>{{MarkerData.DRIVER_MOBILE}}</p>
      <i @click="showPhone"></i>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  // props: ['MarkerData'],
  data () {
    return {
      text: '',
      time: '',
      MarkerData: ''
    }
  },
  computed: {
    ...mapState(['popBcss', 'clickMarkerData']),
    ...mapGetters(['panel'])
  },
  methods: {
    showVideo () {
      this.panel.getPopVideo().openPanel()
    },
    showPhone () {
      this.panel.getVediocall2().openPanel()
    },
    closeTk () {
      this.$store.commit('setPopBcss', false)
    },
    fmtDate (date) {
      let item = date.slice(0, 4)
      let result = ''
      for (let i = 0; i < item.length; i++) {
        result += item[i]
        if (i === 1) {
          result += ':'
        }
      }
      return result
    },
    fmtCarNum (str) { // 格式化车牌号
      return str.slice(0, 2) + ' ' + str.slice(2)
    }
  },
  watch: {
    clickMarkerData () {
      this.MarkerData = this.clickMarkerData
    },
    MarkerData () {
      switch (this.MarkerData.RUNNING_STATUS) {
        case 'DRIVING':
          this.text = '预计抵达时间'
          this.time = this.MarkerData.PLAN_ARRIVAL_TIME
          break
        case 'ARRIVED':
          this.text = '实际抵达时间'
          this.time = this.MarkerData.REAL_ARRIVAL_TIME
          break
        case 'UNSTARTED':
          this.text = '预计发车时间'
          this.time = this.MarkerData.PLAN_LEAVE_TIME
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.MarkerData = this.clickMarkerData
  },
  beforeDestroy () {

  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/set.less";
.bcssInfo2 {
  width: 372px;
  margin: auto;
  background: url("../assets/images/pop/tank.png") center center no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
  padding-bottom: 16px;
  z-index: 999;
  div {
    display: flex;
    align-items: center;
    &:nth-child(1) {
      position: relative;
      .bcxxTitle {
        display: inline-block;
        width: 280px;
        font-size: 18px;
        font-weight: bold;
        color: #00f0ff;
        height: 40px;
        line-height: 40px;
        padding-left: 16px;
        padding-top: 6px;
      }
      i {
        display: inline-block;
        width: 66px;
        height: 41px;
        background: url("../assets/images/pop/close.png") center center
          no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
        margin-top: 4px;
        cursor: pointer;
      }
      &::after {
        content: "";
        display: inline-block;
        width: 340px;
        height: 5px;
        background: url("../assets/images/pop/bor.png") center center no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 16px;
        top: 45px;
      }
    }
    &:nth-child(2) {
      margin-left: 80px;
      margin-top: 8px;
    }
    &:nth-child(3) {
      margin-left: 100px;
    }
    &:nth-child(4),
    &:nth-child(7) {
      margin-left: 26px;
    }
    &:nth-child(6) {
      margin-left: 64px;
    }
    &:nth-child(5) {
      margin-left: 46px;
    }
    p {
      width: 176px;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      color: #00effe;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      display: inline-block;
      color: #fff;
      position: relative;
      padding-right: 20px;
      letter-spacing: 3px;
      &::before {
        position: absolute;
        top: 0;
        right: 11px;
        color: #92b1dd;
        content: ":";
        height: 30px;
        display: inline-block;
      }
    }
  }
  .peopleCount {
    position: relative;
    i {
      width: 52px;
      height: 40px;
      position: absolute;
      right: 10px;
      top: -20px;
      background: url("../assets/images/pop/camera.png") center center no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .telphone {
    position: relative;
    i {
      width: 52px;
      height: 40px;
      position: absolute;
      right: 10px;
      top: -20px;
      background: url("../assets/images/pop/tel.png") center center no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
</style>
