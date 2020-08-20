<!--
 *  电话信息
 -->
<template>
  <!-- <drag :fixed="false" class="plotbox-position"> -->
  <div class="plotbox">
    <i class="close" @click="close"></i>
    <p>正在拨号中...</p>
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
  height: 134px;
  background: #fff;
  background: url("../assets/images/pop/tank.png") center center no-repeat;
  position: absolute;
  bottom: 214 * @px;
  right: 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.close {
  cursor: pointer;
  width: 66px;
  height: 38px;
  position: absolute;
  top: 0;
  right: 2px;
  background: url("../assets/images/pop/close.png") center center no-repeat;
  background-size: 100% 100%;
}
p {
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
  background: url("../assets/images/pop/yjt.png") center center no-repeat;
  background-size: 100% 100%;
}
</style>
