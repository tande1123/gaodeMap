<!--
 * 代表团
 -->
<template>
  <drag
    :fixed="false"
    class="plotbox-position"
  >
    <div class="plotbox">
      <div class="RTtP">
        代表团
      </div>
      <div class="content">
        <i
          class="close"
          @click="close"
        ></i>

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
.plotbox-position {
  bottom: 14px;
  left: 14px;
}
.plotbox {
  height: 262px;
  width: 440px;
  background: #fff;
  background: url("../assets/images/pop/SMT.png") center center no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.RTtP {
  width: 185px;
  height: 262px;
  margin-left: 20px;
  float: left;
  background: url("../assets/images/pop/rt.png") center center no-repeat;
}
.content {
  width: 200px;
  height: 262px;
  margin-left: 8px;
  float: left;
}
.ax {
  height: 50px;
  border-bottom: 1px dotted #00f0ff;
  margin-top: 36px;
}
.mbBox,
.xyBox,
.rrBox,
.wdBox {
  width: 36px;
  height: 46px;
  float: left;
  text-align: center;
  p {
    font-size: 16px;
    color: white;
  }
}
.mb {
  width: 19px;
  height: 18px;
  display: inline-block;
  background: url("../assets/images/pop/mb.png") center center no-repeat;
  background-size: 100% 100%;
}
.xy {
  width: 18px;
  height: 20px;
  display: inline-block;
  background: url("../assets/images/pop/xy.png") center center no-repeat;
  background-size: 100% 100%;
}
.zt {
  float: left;
  height: 20px;
  font-size: 32px;
  font-family: "Digiface";
  color: #d92435;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  span {
    font-size: 18px;
    color: #d92435;
    font-weight: bold;
    font-family: "";
  }
}
.zt_xy {
  color: #f7b53d;
  float: left;
  height: 20px;
  font-size: 32px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  span {
    font-size: 18px;
    color: #f7b53d;
    font-weight: bold;
    font-family: "";
  }
}
.xy_,
.rr_,
.wd_ {
  height: 50px;
  border-bottom: 1px dotted #00f0ff;
}
.zt_rr {
  color: #00abd7;
  float: left;
  height: 20px;
  font-size: 32px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  span {
    font-size: 18px;
    color: #00abd7;
    font-weight: bold;
    font-family: "";
  }
}
.rr {
  width: 18px;
  height: 20px;
  display: inline-block;
  background: url("../assets/images/pop/HX.png") center center no-repeat;
  background-size: 100% 100%;
}
.zt_wd {
  color: #db2232;
  float: left;
  height: 20px;
  font-size: 32px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  span {
    font-size: 18px;
    color: #db2232;
    font-weight: bold;
    font-family: "";
  }
}
.wd {
  width: 18px;
  height: 20px;
  display: inline-block;
  background: url("../assets/images/pop/wd.png") center center no-repeat;
  background-size: 100% 100%;
}
.close {
  width: 66px;
  height: 38px;
  position: absolute;
  right: 20px;
  top: 30px;
  background: url("../assets/images/pop/close.png") center center no-repeat;
  background-size: 100% 100%;
}
</style>
