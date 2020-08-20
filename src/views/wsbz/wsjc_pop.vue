<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:17:51
 -->
<!-- 卫生检测弹框 -->
<template>
  <div class="wsjcPop" v-show="show">
    <p class="title">
      <span>卫生检测</span>
      <span @click="closePop"></span>
    </p>
    <div class="subject">
      <ul class="sp">
        <li>
          <img src="../../../static/assets/img/wsbz/spjc.png" alt="">
          <p>食品检测</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/sply.png" alt="">
          <p>食品来源</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/spxk.png" alt="">
          <p>食品许可</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/lssp.png" alt="">
          <p>绿色食品</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/bjsp.png" alt="">
          <p>保健食品</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/tjj.png" alt="">
          <p>添加剂</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/bz.png" alt="">
          <p>包装</p>
          <p>合格</p>
        </li>
      </ul>
      <div class="timebox">
        <p>10月20日卫生检查状况</p>
        <p>
          100%
          <span>合格</span>
        </p>
      </div>
      <div class="clbbox">
        <div>
          <img src="../../../static/assets/img/wsbz/clb.png" alt="">
          <p>传染病</p>
        </div>
        <p>医疗中心今日接诊共132例,无传染病</p>
        <p>
          0
          <span>例</span>
        </p>
      </div>
      <ul class="yys">
        <li>
          <img src="../../../static/assets/img/wsbz/yys.png" alt="">
          <p>饮用水检测</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/wswzp.png" alt="">
          <p>微生物指标</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/dlzb.png" alt="">
          <p>毒理指标</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/ggx.png" alt="">
          <p>感光性状和</p>
          <p>合格</p>
        </li>
        <li>
          <img src="../../../static/assets/img/wsbz/yphx.png" alt="">
          <p>一般化学指标</p>
          <p>合格</p>
        </li>
      </ul>
      <ul class="ggcsws">
        <li>
          <div class="ggcs">
            <img src="../../../static/assets/img/wsbz/ggr.png" alt="">
            <p>饮用水检测</p>
          </div>
          <span>垃圾</span>
          <span>消毒</span>
          <span>空气质量</span>
          <span>病媒检查</span>
        </li>
        <li>
          <div class="ggcs">
            <img src="../../../static/assets/img/wsbz/ggr.png" alt="">
            <p>居住区</p>
          </div>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
        </li>
        <li>
          <div class="ggcs">
            <img src="../../../static/assets/img/wsbz/ggr.png" alt="">
            <p>运行区</p>
          </div>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
        </li>
        <li>
          <div class="ggcs">
            <img src="../../../static/assets/img/wsbz/ggr.png" alt="">
            <p>后勤区</p>
          </div>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
        </li>
        <li>
          <div class="ggcs">
            <img src="../../../static/assets/img/wsbz/ggr.png" alt="">
            <p>公共区</p>
          </div>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
          <span>达标</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      show: null
    }
  },
  methods: {
    closePop () {
      this.$store.commit('setPopkey', false)
    }
  },
  computed: {
    ...mapState(['popkey'])
  },
  mounted () {
    this.show = this.popkey.wsjc
    console.log(this.show)
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.show = this.popkey.wsjc
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
@px: 30rem/1920;
.wsjcPop {
  width: 640 * @px;
  height: 600 * @px;
  background: #fff;
  border-radius: 5 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  .title {
    display: flex;
    justify-content: space-between;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    align-items: center;
    background: url("../../../static/assets/img/wsbz/headbg.png") center center
      no-repeat;
    background-size: 100% 100%;
    font-size: 18 * @px;
    text-indent: 14 * @px;
    overflow: hidden;
    letter-spacing: 2 * @px;
    border-top-left-radius: 5 * @px;
    border-top-right-radius: 5 * @px;
    span:nth-child(1) {
      font-weight: bold;
    }
    span:nth-child(2) {
      cursor: pointer;
      display: inline-block;
      width: 14 * @px;
      height: 14 * @px;
      background: url("../../../static/assets/img/wsbz/x.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
  .subject {
    margin: 14 * @px;
    width: 612 * @px;
    height: 532 * @px;
    position: relative;
    .sp {
      width: 224 * @px;
      height: 300 * @px;
      border-left: 1 * @px solid #d8dde3;
      border-right: 1 * @px solid #d8dde3;
      box-shadow: 0 0 * @px 15 * @px #d8dde3;
      float: left;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 42 * @px;
        img {
          width: 16 * @px;
          height: 16 * @px;
          margin-left: 14 * @px;
        }
        &:nth-child(2n + 1) {
          background: #f4f7fc;
        }
        &:nth-child(1) {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background: #edf0f5;
          height: 48 * @px;
          img {
            width: 20 * @px;
            height: 20 * @px;
          }
        }
        p:nth-child(2) {
          width: 60 * @px;
          margin-left: 10 * @px;
        }
        p:nth-child(3) {
          margin-left: 66 * @px;
        }
      }
    }
  }
}
.timebox {
  float: left;
  height: 148 * @px;
  width: 376 * @px;
  margin-left: 10 * @px;
  border-top: 2 * @px solid #d8dde3;
  p:nth-child(1) {
    width: 100%;
    text-align: center;
    font-size: 14 * @px;
    margin-top: 18 * @px;
  }
  p:nth-child(2) {
    width: 100%;
    text-align: center;
    font-size: 42 * @px;
    color: #0bc67f;
    span {
      font-size: 14 * @px;
      color: #0bc67f;
    }
  }
}
.clbbox {
  float: left;
  height: 150 * @px;
  width: 376 * @px;
  margin-left: 10 * @px;
  border: 1 * @px solid #d8dde3;
  & > p:nth-child(2) {
    width: 100%;
    text-align: center;
    font-size: 14 * @px;
    line-height: 46 * @px;
  }
  & > p:nth-child(3) {
    width: 100%;
    text-align: center;
    font-size: 44 * @px;
    font-weight: bold;
    span {
      font-size: 14 * @px;
    }
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #f4f7fc;
    height: 42 * @px;
    img {
      width: 20 * @px;
      height: 20 * @px;
    }
    p {
      font-size: 16 * @px;
      font-weight: bold;
      margin-left: 4 * @px;
    }
  }
}
.yys {
  width: 224 * @px;
  position: absolute;
  left: 0;
  top: 310 * @px;
  border-left: 1 * @px solid #d8dde3;
  border-right: 1 * @px solid #d8dde3;
  box-shadow: 0 0 * @px 15 * @px #d8dde3;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 42 * @px;
    img {
      width: 16 * @px;
      height: 16 * @px;
      margin-left: 14 * @px;
    }
    &:nth-child(2n + 1) {
      background: #f4f7fc;
    }
    &:nth-child(1) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #edf0f5;
      height: 48 * @px;
      img {
        width: 20 * @px;
        height: 20 * @px;
      }
    }
    &:nth-child(2),
    &:nth-child(4) {
      p:nth-child(3) {
        margin-left: 52 * @px;
      }
    }
    &:nth-child(5) {
      p:nth-child(3) {
        margin-left: 40 * @px;
      }
    }
    p:nth-child(2) {
      margin-left: 10 * @px;
    }
    p:nth-child(3) {
      margin-left: 66 * @px;
    }
  }
}
.ggcsws {
  width: 380 * @px;
  position: absolute;
  right: 0;
  top: 310 * @px;
  border: 1 * @px solid #d8dde3;
  box-shadow: 0 0 * @px 15 * @px #d8dde3;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 42 * @px;
    &:nth-child(2n + 1) {
      background: #f4f7fc;
    }
    .ggcs {
      width: 100px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-left: 4 * @px;
      img {
        width: 20 * @px;
        height: 20 * @px;
      }
      p {
        font-size: 14 * @px;
        margin-left: 4 * @px;
      }
    }
    span {
      &:nth-child(2),
      &:nth-child(3) {
        width: 60 * @px;
        text-align: center;
        font-size: 14 * @px;
      }
      width: 80 * @px;
      text-align: center;
      font-size: 14 * @px;
    }
  }
  & > li:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #edf0f5;
    height: 48 * @px;
    .ggcs {
      width: 100px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-left: 4 * @px;
      img {
        width: 20 * @px;
        height: 20 * @px;
      }
      p {
        font-size: 14 * @px;
        font-weight: 500;
        margin-left: 4 * @px;
      }
    }
    span {
      &:nth-child(2),
      &:nth-child(3) {
        width: 60 * @px;
        text-align: center;
        font-size: 14 * @px;
      }
      width: 80 * @px;
      text-align: center;
      font-size: 14 * @px;
    }
  }
}
</style>
