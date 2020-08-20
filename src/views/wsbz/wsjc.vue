<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 卫生保障   卫生检测 -->
<template>
  <div class="wsjc">
    <p class="title">
      <span>卫生检测</span>
      <span @click="showPop"></span>
    </p>
    <div class="list">
      <div class="kind">
        <div class="box-left">
          <img src="../../../static/assets/img/wsbz/sp.png" alt="">
          <p>食品</p>
        </div>
        <div class="box-right">
          <p>100%</p>
          <p>合格</p>
        </div>
      </div>
      <div class="kind">
        <div class="box-left">
          <img src="../../../static/assets/img/wsbz/yys.png" alt="">
          <p>饮用水</p>
        </div>
        <div class="box-right">
          <p>100%</p>
          <p>合格</p>
        </div>
      </div>
      <div class="kind" style="margin-top:10px;">
        <div class="box-left">
          <img src="../../../static/assets/img/wsbz/ggcs.png" alt="">
          <p>公共厕所</p>
        </div>
        <div class="box-right">
          <p>100%</p>
          <p>合格</p>
        </div>
      </div>
      <div class="kind" style="margin-top:10px;">
        <div class="box-left">
          <img src="../../../static/assets/img/wsbz/clb.png" alt="">
          <p>传染病</p>
        </div>
        <div class="crbox">
          <p>0</p>
          <span>例</span>
        </div>
      </div>
    </div>
    <wsjcPop class="Pop"></wsjcPop>
  </div>
</template>
<script>
import wsjcPop from './wsjc_pop.vue'
import { mapState } from 'vuex'
export default {
  components: {
    wsjcPop
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showPop () {
      this.show = !this.show
      this.$store.commit('setPopkey', this.show)
      this.$store.commit('setPoptqyb', false)
      this.$store.commit('setPopwsbz', false)
    }
  },
  computed: {
    ...mapState(['popkey'])
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
.wsjc {
  width: 414 * @px;
  height: 210 * @px;
  background: #fff;
  border-radius: 4 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  position: relative;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../../static/assets/img/wsbz/headbg.png") center center
      no-repeat;
    border-top-left-radius: 5 * @px;
    border-top-right-radius: 5 * @px;
    font-size: 18 * @px;
    text-indent: 14 * @px;
    overflow: hidden;
    letter-spacing: 2 * @px;
    span:nth-child(1) {
      font-weight: bold;
    }
    span:nth-child(2) {
      cursor: pointer;
      display: inline-block;
      width: 10 * @px;
      height: 18 * @px;
      background: url("../../../static/assets/img/wsbz/more.png") no-repeat
        center center;
      background-size: 100% 100%;
    }
  }
  .list {
    padding: 14 * @px 40 * @px 14 * @px 40 * @px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .kind {
      &:nth-child(1) {
        padding-left: 16 * @px;
        .box-right {
          padding-left: 16 * @px;
        }
      }
      &:nth-child(4) {
        .crbox {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          p {
            font-size: 24 * @px;
            font-weight: bold;
          }
          span {
            font-size: 14 * @px;
          }
        }
      }
      width: 156 * @px;
      height: 64 * @px;
      display: flex;
      border: 2px solid #2192d4;
      border-radius: 4 * @px;
      .box-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 12 * @px;
        p {
          font-size: 16 * @px;
          color: #2192d4;
          font-weight: bold;
          margin-top: 4 * @px;
        }
        img {
          width: 26 * @px;
          height: 26 * @px;
          margin-top: 4 * @px;
        }
      }
      .box-right {
        display: flex;
        flex: 1;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p:nth-child(1) {
          font-size: 24 * @px;
          font-weight: bold;
          height: 28 * @px;
        }
        p:nth-child(2) {
          font-size: 16 * @px;
          height: 24 * @px;
        }
      }
    }
  }
}
.Pop {
  position: absolute;
  top: -440 * @px;
  left: 570 * @px;
}
</style>
