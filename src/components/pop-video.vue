<!--右下角视频弹窗-->
<template>
  <drag :fixed="false" class="position-video">
    <div class="video-img">
      <div class="clos" @click="closeVideo">
        <img src="../assets/images/pop/close.png" alt="">
      </div>
    </div>
  </drag>
</template>
<script>
import drag from './drag'
export default {
  components: {
    drag
  },
  methods: {
    closeVideo () {
      this.$emit('close-pop-video')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/set.less";
.position-video {
  width: 372 * @px;
  height: 253 * @px;
  right: 40 * @px;
  top: 304 * @px;
  background: #fff;
  background: url("../assets/images/pop/video-img.png") center center no-repeat;
  background-size: 100% 100%;
  .video-img {
    position: relative;
    padding: 30 * @px 20 * @px;
    .clos {
      position: absolute;
      top: 0;
      right: 5 * @px;
      font-size: 18 * @px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      img {
        width: 66 * @px;
        height: 40 * @px;
        vertical-align: -3 * @px;
      }
    }
    img {
      width: 332 * @px;
      height: 173 * @px;
    }
  }
}
</style>
