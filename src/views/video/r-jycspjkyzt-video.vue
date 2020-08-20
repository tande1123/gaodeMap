<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:17:06
 -->

<!-- 军运村视频监控一张图视频 -->
<template>
  <div class="spvideo" v-show="flag">
    <div class="spvideobox">
      <div class="dw">
        <img src="../../../static/img/jycspjkyzt/sxt.png" alt="">
      </div>
      <div class="videoTop">
        <span>H区1卡口</span>
        <i v-on:click="closeVideo" >
          <img
            src="../../../static/img/jycspjkyzt/X.png"
            alt=""
          >
        </i>
      </div>
      <div
        class="videobox"
        ref="videobox"
      >
        <video
          autoplay="autoplay"
          :src="videoURL"
          id="video"
          class="videoOne"
          controls
        >
          您的浏览器不支持video标签
        </video>
        <!-- <img
          class="bj"
          src="../../../static/img/jycspjkyzt/qcbj.png"
          alt=""
        > -->
        <div class="zhidingyi">2019.2.10 星期三 15：25：26</div>
        <!-- <ul class="zhidingyi">
          <li class="iconplay">
            <i v-on:click="prevVideo">
              <img
                src="../../../static/img/jycspjkyzt/iconleft.png"
                alt=""
              >
            </i>
          </li>
          <li>
            <i v-on:click="play">
              <img
                src="../../../static/img/jycspjkyzt/iconplay.png"
                alt=""
              >
            </i>
          </li>
          <li>
            <i v-on:click="nextVideo">
              <img
                src="../../../static/img/jycspjkyzt/iconright.png"
                alt=""
              >
            </i>
          </li>
          <li>
            <i v-on:click="fd">
              <img
                src="../../../static/img/jycspjkyzt/fd.png"
                alt=""
              >
            </i>
          </li>
          <li>
            <i v-on:click="voice">
              <img
                src="../../../static/img/jycspjkyzt/voice.png"
                alt=""
              >
            </i>
          </li>
        </ul> -->
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
    // prevVideo: function () {

    // },
    // play: function () {
    //   let v = this.$refs.video
    //   if (this.videoPlay) {
    //     v.pause()
    //   } else {
    //     v.play()
    //   }
    //   this.videoPlay = !this.videoPlay
    // },
    // nextVideo: function () {

    // },
    // fd: function () {
    //   let itemHeight = document.body.clientHeight
    //   let itemWidth = document.body.clientWidth
    //   let v = this.$refs.videobox
    //   v.style.width = itemWidth + 'px'
    //   v.style.height = itemHeight + 'px'
    // },
    // voice: function () {

    // },
    print (value) {
      this.flag = true
    },
    closeVideo () {
      this.flag = false
    }
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
.spvideo,
.spvideobox {
  width: 730 * @px;
  height: 534 * @px;
  position: relative;
   background: #011f41;
}
.dw{
  position: absolute;
  bottom: -60 * @px;
  left: 350 * @px;
  content: "";
  z-index: 3;

}
.spvideobox::after{
  width: 0;
  height: 0;
  border-left: 8 * @px solid transparent;
  border-right: 8 * @px solid transparent;
  border-top: 8 * @px solid #f6541b;
  position: absolute;
  bottom: -10 * @px;
  left: 358 * @px;
  content: "";
  z-index: 3;
}
.spvideo::after{
  width: 0;
  height: 0;
  border-left: 18 * @px solid transparent;
  border-right: 18 * @px solid transparent;
  border-top: 18 * @px solid #011f41;
  position: absolute;
  bottom: -18* @px;
  left: 348 * @px;
  content: "";
}
.videoTop {
  width: 730 * @px;
  height: 54 * @px;
  margin-top: 18 * @px;
  position: relative;
}
.videoTop > span {
  width: 100%;
  display: inline-block;
  text-align: center;
  line-height: 54* @px;
  font-size: 18 * @px;
  font-weight: bolder;
  color: #00cdfe;
}
.videoTop > i {
  width: 13 * @px;
  height: 13 * @px;
  display: block;
  position: absolute;
  right: 22 * @px;
  top: 16* @px;
  cursor: pointer;
}
.videoTop > i > img {
  width: 13 * @px;
  height: 13 * @px;
}
.videobox {
  width: 705* @px;
  height: 466 * @px;
  margin-left: 14 * @px;
  position: relative;
  object-fit: fill;
}
.videoOne{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.zhidingyi {
  position: absolute;
  width: 662 * @px;
  height: 42 * @px;
  left: 0;
  right: 0;
  top:10*@px;
  color: white;
  margin: auto;
}
</style>
