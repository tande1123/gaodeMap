<!--
 *  电话信息
 -->
<template>
  <!-- <drag :fixed="false" class="plotbox-position"> -->
  <div class="plotbox">
    <p class="title">
        <span>拨打电话</span>
        <span @click="close"></span>
      </p>
    <p class="pstatus">正在拨号中...</p>
    <div class="imgBox"></div>
  </div>
  <!-- </drag> -->
</template>
<script>
import drag from './drag'
export default {
  components: {
    drag
  },
  props: ['item'],
  data () {
    return {
      phoneNumber: ''
    }
  },
  watch: {
  },
  methods: {
    close () {
      this.$emit('close', false)
      this.closeTell()
    },
    // 挂电话
    closeTell () {
      this.$store.dispatch('clearPhone', this.item).then(res => {
        console.log('挂断电话', res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../fonts/font2/font.css";
@import "../assets/less/set.less";
.plotbox-position {
  bottom: 14px;
  left: 540px;
}
.plotbox {
  width: 373px;
  // height: 134px;
  background: #fff;
  // background: url("../assets/images/pop/tank.png") center center no-repeat;
  position: absolute;
  bottom: 214 * @px;
  right: 76px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
   .title {
      width: 100%;
  font-size: 22px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../static/assets/img/wsbz/headbg.png") center center
      no-repeat;
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
      width: 18 * @px;
      height: 18 * @px;
      background: url("../../static/assets/img/wsbz/x.png") no-repeat center
        center;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
.pstatus{
  width: 100%;
  font-size: 22px;
  height: 30px;
  font-weight: bold;
  line-height: 30px;
  color: #2db56d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  margin-top: 16px;
}
.imgBox {
  width: 288px;
  height: 32px;
  // background: url("../assets/images/pop/yjt.png") center center no-repeat;
  background-size: 100% 100%;
}
</style>
