<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:58
 -->

<!-- 军运村视频监控一张图轮播 -->
<template>
  <div class="lunbo">
    <div class="lunbo_box">
      <p>A-123停车场监控</p>
    </div>
    <div class="box">
      <div class="swiperBox" ref="swiperBox">
        <div class="swiper-container" ref="swiper_container">
          <div
            class="swiper-wrapper"
            ref="swipewrapper"
          >
            <div
              class="swiper-slide"
              v-for="(item,index) in galleryList"
              :key="index"
              v-on:click='change(index)'
              ref='bk'
            >
              <img
                :src="item.img1"
                alt=""
              >
              <p>{{item.text}}</p>
            </div>
          </div>
        </div>
        <div
          class="swiper-button-prev"
          ref="prev"
        ></div>
        <div
          class="swiper-button-next"
          ref="next"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  data () {
    return {
      time: null,
      data: true,
      galleryList: [{ img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'H区1卡口' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'A停车场:H区' }, { img1: require('../../../static/img/jycspjkyzt/sp1.png'), text: 'H区1卡口' }]
    }
  },
  props: [],
  computed: {},
  methods: {
    initSwipe () {
      let that = this
      let swiper = new Swiper('.swiper-container', {
        slidesPerView: 7,
        centeredSlides: false,
        spaceBetween: 5.7,
        speed: 500,
        grabCursor: true,
        loopFillGroupWithBlank: true,
        on: {
          slideChangeTransitionStart: function () {
            let B = that.$refs.bk
            for (let i = 0; i < B.length; i++) {
              B[i].style.border = `0px solid #00cdfe`
            }
            that.$refs.bk[this.activeIndex].style.border = `1px solid #00cdfe`
            // alert(this.activeIndex)
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
      return swiper
    },
    change (index) {
      let B = this.$refs.bk
      for (let i = 0; i < B.length; i++) {
        B[i].style.border = `0px solid #00cdfe`
      }
      B[index].style.border = `1px solid #00cdfe`
      this.$root.$emit('eventName', true)
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.initSwipe()
  },
  beforeUpdate () {
    clearInterval(this.time)
  },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {

  },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang="less" scoped>
@import "../../../node_modules/swiper/dist/css/swiper.css";
@import "../../../node_modules/swiper/dist/css/swiper.min.css";
@import "../../assets/less/set.less";
.lunbo {
  width: 1433 * @px;
  height: 216 * @px;
  position: relative;
}
.lunbo_box {
  width: 1394 * @px;
  height: 36 * @px;
  margin: 16 * @px 0 0 16 * @px;
  line-height: 36 * @px;
}
.lunbo_box p {
  font-size: 18 * @px;
  font-weight: bolder;
  padding-left: 8 * @px;
  color:#01b5e3;
}
.box {
  width: 1398 * @px;
  height: 128 * @px;
  position: relative;
  overflow: hidden;
  margin-top: 5 * @px;
  margin-left: 6 * @px;
}
.swiperBox {
  width: 1310px;
  height: 2.2rem;
  margin-top: 8 * @px;
  margin-left: 55 * @px;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 100%;

}
.swiper-wrapper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: 115 * @px;
  margin-top: 5 * @px;
  text-align: center;
  font-size: 18 * @px;
  position: relative;
  box-sizing: border-box;
}
.swiper-slide p {
  width:100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 30 * @px;
  opacity: 0.8;
  background: #002044;
  text-align: center;
  font-size: 14 * @px;
  line-height: 30 * @px;
  color: white;
}
.swiper-slide img {
  width: 100%;
  height:100%;
  display: inline-block;
}
.swiper-button-prev {
  width: 26 * @px !important;
  height: 126 * @px!important;
  background: #0d2f55 url("../../../static/img/jycspjkyzt/jtleft.png") no-repeat
    center center;
  position: absolute;
  top: 32 * @px;
  left: 24 * @px;
}
.swiper-button-next {
  width: 26 * @px !important;
  height: 126 * @px!important;
  background: #0d2f55 url("../../../static/img/jycspjkyzt/jtright.png")
    no-repeat center center;
  position: absolute;
  top: 32 * @px;
  right: 0 * @px;
}
</style>
