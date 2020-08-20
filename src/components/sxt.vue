<!--
 * 添加注释
 -->
<template>
  <!-- <drag :fixed="false" class="plotbox-sxt"> -->
  <div class="sxt_box">
    <i class="close" @click="closesxt"></i>
    <div class="videobox">
      <video autoplay="autoplay" :src="videoURL" id="video" class="videoOne" controls></video>
    </div>
  </div>
  <!-- </drag> -->
</template>
<script>
import drag from './drag'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      videoURL: ''
    }
  },
  components: {
    drag
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    closesxt () {
      this.$emit('close-pop-detail')
    }
  },
  mounted () {
    this.videoURL = this.mapConfig.services.hkVideo
  }
}
</script>

<style lang="less" scoped>
@import "../fonts/font2/font.css";
@import "../assets/less/set.less";
.plotbox-sxt {
  top: 14px;
  left: 14px;
}
.sxt_box {
  width: 285px;
  height: 204px;
  background: url("../assets/images/pop/SMT.png") center center no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 14px;
  left: 14px;
}
.close {
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 18px;
  width: 18px;
  height: 18px;
  background: url("../assets/images/pop/x.png") center center no-repeat;
  background-size: 100% 100%;
}
.videobox {
  width: 248px;
  height: 166px;
  padding-top: 20px;
}
.videoOne {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
