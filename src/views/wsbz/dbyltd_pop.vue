<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 代表医疗团队弹框 -->
<template>
  <div class="dbylBox" v-if="show">
    <p class="title">
      <span>卫生保障值班信息</span>
      <span @click="closedPop"></span>
    </p>
    <div class="text">
      <ul class="textbox">
        <li>
          <p>国家</p>
          <p>医疗站位置</p>
          <p>接待联系人</p>
          <p>联系人电话</p>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
        </li>
        <li>
          <p>中国</p>
          <p>14-1-1001</p>
          <p>张辉</p>
          <p>13971414017</p>
          <i></i>
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
      show: false,
      loadedData: []
    }
  },
  methods: {
    closedPop () {
      this.$store.commit('setPopdbtylz', false)
    },
    loadData () {
      if (this.loadedData.length < 1 && this.mapLoaded) {
        this.$store.dispatch('getEnsurePlan').then(data => {
          this.loadedData = data.filter(e => e.ADDRESSTYPE === 'G03')
          console.log(this.loadedData)
        })
      }
    }
  },
  computed: {
    ...mapState(['popkey', 'mapLoaded'])
  },
  mounted () {
    this.show = this.popkey.dbtylz
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.show = this.popkey.dbtylz
        this.loadData()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
@px: 30rem/1920;
.dbylBox {
  width: 490 * @px;
  height: 416 * @px;
  border-radius: 4 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 180 * @px;
  margin: auto;
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
  .text {
    padding: 16 * @px 14 * @px 0 * @px 19 * @px;
    .textbox {
      border: 1px solid #d8dde3;
      width: 452 * @px;
      height: 344 * @px;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 43 * @px;
        &:nth-child(1) {
          width: 100%;
          p {
            line-height: 46 * @px;
            font-size: 16 * @px;
            &:nth-child(1) {
              width: 70 * @px;
              text-align: center;
            }
            &:nth-child(2),
            &:nth-child(3) {
              width: 108 * @px;
              text-align: center;
            }
            &:nth-child(4) {
              flex: 1;
              text-align: center;
            }
          }
        }
        &:nth-child(2n + 1) {
          width: 100%;
          background: #edf0f5;
        }
        p {
          font-size: 14 * @px;
          line-height: 43 * @px;
          &:nth-child(1) {
            width: 70 * @px;
            text-align: center;
          }
          &:nth-child(2),
          &:nth-child(3) {
            width: 108 * @px;
            text-align: center;
          }
          &:nth-child(4) {
            width: 118 * @px;
            text-align: center;
          }
        }
        i {
          display: inline-block;
          width: 20 * @px;
          height: 20 * @px;
          background: url("../../../static/assets/img/wsbz/phone02.png")
            no-repeat center center;
          background-size: 100% 100%;
          margin-left: 5 * @px;
        }
      }
    }
  }
}
</style>
