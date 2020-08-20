<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:12:53
 -->

<!-- 军运村视频监控一张图视频 -->
<template>
  <div class="spvideo">
    <div class="spvideo-top">
       <div class="spvideo-top-title">
         <div class="spvideo-address">住宿监控-801室</div>
         <a href="javascript:;">×</a>
       </div>
       <div class="spvideo-play">
         <div class="spvideo-play-video">
           <video :src="videoURL" controls></video>
         </div>
       </div>
    </div>
    <div class="spvideo-bottom">
      <ul class="stay-people">
        <li><div class="stay-people-dian stay-people-tspan1 ">今日入住<span class="people-count">&nbsp;&nbsp;&nbsp;4</span> 人</div></li>
        <li><div class="stay-people-dian stay-people-tspan2">本周入住<span class="people-count">&nbsp;&nbsp;&nbsp;17</span> 人</div></li>
        <li><div class="stay-people-dian stay-people-tspan3">总入住<span class="people-count">&nbsp;&nbsp;&nbsp;24</span> 人</div></li>
      </ul>
      <div class="people-ratio">
        <!-- <div class="today-people-ratio"></div> -->
        <div class="week-people-ratio"></div>
        <div class="total-people-ratio"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      videoPlay: false,
      flag: false,
      videoURL: null
    }
  },
  props: ['show'],
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {

  },
  watch: {},
  beforeCreate () { },
  created () {
    this.$root.$on('eventName', value => {
      this.print(value)
    })
  },
  beforeMount () { },
  mounted () {
    this.videoURL = this.mapConfig.services.hkVideo
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { },
  components: {}

}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.spvideo {
  width: 725 * @px;
  height: 625 * @px;
  position: absolute;
}
.spvideo-top{
  box-shadow: 0px 0px 15 * @px #aaa;
  position: relative;
  height: 534 * @px;
  width: 100%;
  border-radius: 5 * @px;
  background-color: #F8FBFF;
  .spvideo-top-title {
    border-top-left-radius: 5 * @px;
    border-top-right-radius: 5 * @px;
    height: 40 * @px;
    width: 100%;
    background: url("../../../static/img/newjycspjkyzt/title-bg1.png") no-repeat center center;
    background-size: 100%
  }
  .spvideo-address {
    height: 40 * @px;
    line-height: 40 * @px;
    float: left;
    font-size: 20px;
    color: #F8FBFF;
    margin-left: 16px;
    font-weight: 600;
  }
  a {
    float: right;
    color: #F8FBFF;
    font-size: 24px;
    margin-right: 12px;
    height: 40 * @px;
    line-height: 40 * @px;
  }
  .spvideo-play {
    height: 494 * @px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .spvideo-play-video {
      width: 696 * @px;
      height: 468 * @px;
      border-radius: 5 * @px;
      video {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.spvideo-bottom {
  box-shadow: 0px 0px 15 * @px #aaa;
  position: absolute;
  border-radius: 5 * @px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80 * @px;
  padding: 15 * @px;
  padding-top: 10 * @px;
  background-color: #F8FBFF;
  .stay-people {
    display: flex;
    justify-content: space-between;
    text-align: center;
    li {
      .stay-people-dian {
        position: relative;
      }
      .stay-people-tspan1 {
        margin-left: 20px;
      }
      .stay-people-tspan1::before {
        background-color: #5A89F5;
      }
      .stay-people-tspan2::before {
        background-color: #00CCFE;
      }
      .stay-people-tspan3::before {
        background-color: #FCBE4D;
      }
      .stay-people-dian::before {
        content: '';
        display: inline-block;
        height: 10 * @px;
        width: 10 * @px;

        border-radius: 5 * @px;
        position: absolute;
        top: 16 * @px;
        left: -20 * @px;

      }
      font-size: 16 * @px;
      font-weight: 500;
      .people-count {
        font-size: 24 * @px;
      }
    }
  }
  .people-ratio {
    margin-top: 10 * @px;
    height: 11 * @px;
    width: 695 * @px;
    border-radius: 6 * @px;
    background-color: #5A89F5;
    position: relative;
    .week-people-ratio {
      position: absolute;
      right: 0;
      height: 11 * @px;
      width: 80%;
      border-radius: 6 * @px;
      background-color: #00CCFE;
    }
    .total-people-ratio {
      position: absolute;
      right: -2px;
      height: 11 * @px;
      width: 60%;
      border-radius: 6 * @px;
      background-color: #FCBE4D;
    }
  }

}
</style>
