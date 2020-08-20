<!--
 * 周边视频
 -->
<template>
  <drag :fixed="false" class="plotbox-position">
    <div class="plotbox">
      <div class="RTtP">
        周边视频
      </div>
      <div class="content">
        <i class="close" @click="close"></i>

      </div>
    </div>
  </drag>
</template>
<script>
import drag from './drag'
import { mapGetters } from 'vuex'
export default {
  components: {
    drag
  },
  computed: {
    ...mapGetters(['panel'])
  },
  props: ['item'],
  data () {
    return {
      address: '',
      ensurePlanGroup: [],
      currentGroup: {},
      persons: []
    }
  },
  watch: {
    item () {

    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../fonts/font2/font.css";
@import "../assets/less/set.less";
.plotbox-position {
  bottom: 14 * @px;
  left: 14 * @px;
}
.plotbox {
  height: 262 * @px;
  width: 440 * @px;
  background: #fff;
  background: url("../assets/images/pop/SMT.png") center center no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.RTtP {
  width: 185 * @px;
  height: 262 * @px;
  margin-left: 20 * @px;
  float: left;
  background: url("../assets/images/pop/rt.png") center center no-repeat;
}
.content {
  width: 200 * @px;
  height: 262 * @px;
  margin-left: 8 * @px;
  float: left;
}
.ax {
  height: 50 * @px;
  border-bottom: 1 * @px dotted #00f0ff;
  margin-top: 36 * @px;
}
.mbBox,
.xyBox,
.rrBox,
.wdBox {
  width: 36 * @px;
  height: 46 * @px;
  float: left;
  text-align: center;
  p {
    font-size: 16 * @px;
    color: white;
  }
}
.mb {
  width: 19 * @px;
  height: 18 * @px;
  display: inline-block;
  background: url("../assets/images/pop/mb.png") center center no-repeat;
  background-size: 100% 100%;
}
.xy {
  width: 18 * @px;
  height: 20 * @px;
  display: inline-block;
  background: url("../assets/images/pop/xy.png") center center no-repeat;
  background-size: 100% 100%;
}
.zt {
  float: left;
  height: 20 * @px;
  font-size: 32 * @px;
  font-family: "Digiface";
  color: #d92435;
  font-weight: bold;
  margin-top: 4 * @px;
  margin-left: 10 * @px;
  span {
    font-size: 18 * @px;
    color: #d92435;
    font-weight: bold;
    font-family: "";
  }
}
.zt_xy {
  color: #f7b53d;
  float: left;
  height: 20 * @px;
  font-size: 32 * @px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4 * @px;
  margin-left: 10 * @px;
  span {
    font-size: 18 * @px;
    color: #f7b53d;
    font-weight: bold;
    font-family: "";
  }
}
.xy_,
.rr_,
.wd_ {
  height: 50 * @px;
  border-bottom: 1 * @px dotted #00f0ff;
}
.zt_rr {
  color: #00abd7;
  float: left;
  height: 20 * @px;
  font-size: 32 * @px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4 * @px;
  margin-left: 10 * @px;
  span {
    font-size: 18 * @px;
    color: #00abd7;
    font-weight: bold;
    font-family: "";
  }
}
.rr {
  width: 18 * @px;
  height: 20 * @px;
  display: inline-block;
  background: url("../assets/images/pop/HX.png") center center no-repeat;
  background-size: 100% 100%;
}
.zt_wd {
  color: #db2232;
  float: left;
  height: 20 * @px;
  font-size: 32 * @px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4 * @px;
  margin-left: 10 * @px;
  span {
    font-size: 18 * @px;
    color: #db2232;
    font-weight: bold;
    font-family: "";
  }
}
.wd {
  width: 18 * @px;
  height: 20 * @px;
  display: inline-block;
  background: url("../assets/images/pop/wd.png") center center no-repeat;
  background-size: 100% 100%;
}
.close {
  width: 66 * @px;
  height: 38 * @px;
  position: absolute;
  right: 20 * @px;
  top: 30 * @px;
  background: url("../assets/images/pop/close.png") center center no-repeat;
  background-size: 100% 100%;
}
</style>
