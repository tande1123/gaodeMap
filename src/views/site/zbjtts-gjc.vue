<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!--周边交通态势-公交车-->
<template>
  <div class="box">
    <h3 class="box_title">公交车详情</h3>
    <div class="seachinfo">
      <div class="info">
        <!-- 车辆信息 -->
        <el-scrollbar style="height:100%">
          <div class="carinfo" v-for="(item,index) in bus" :key="index">
            <div class="cardata">
              <p>{{item.name}}</p>
              <p>{{item.region}}</p>
              <p>{{item.bus}}</p>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
let self
export default {
  data () {
    return {
      bus: null
    }
  },
  props: [],
  computed: {},
  methods: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    self = this
    this.$store.dispatch('loadgongjiaoStation').then(e => {
      self.bus = e
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style >
.el-scrollbar {
  height: 100%;
  overflow-x: hidden;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
  overflow-x: hidden;
}
</style>
<style lang="less" scoped>
@import "../../assets/less/set.less";
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 414 * @px;
  height: auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4 * @px;
  -webkit-border-radius: 4 * @px;
  -ms-border-radius: 4 * @px;
  -o-border-radius: 4 * @px;
  -moz-border-radius: 4 * @px;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  .box_title {
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../../static/img/site/headbg.png") center center
      no-repeat;
    background-size: 100% 100%;
    font-size: 18 * @px;
    font-weight: bold;
    text-indent: 13 * @px;
    overflow: hidden;
  }
}
.seach {
  width: 100%;
  height: 40 * @px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 0 10 * @px #ccc;
  -webkit-box-shadow: 0 0 10 * @px #ccc;
  -ms-box-shadow: 0 0 10 * @px #ccc;
  -o-box-shadow: 0 0 10 * @px #ccc;
  -moz-box-shadow: 0 0 10 * @px #ccc;
  position: relative;
}
.seachinfo {
  height: 508 * @px;
  width: 100%;
  padding: 14 * @px;
  box-sizing: border-box;
  // background: rgba(243, 245, 248, 0.9);
}
.info {
  width: 100%;
  height: 500 * @px;
}
.carinfo {
  background: #ffffff;
  width: 100%;
  height: 160 * @px;
  padding: 0 14 * @px;
  box-sizing: border-box;
  border-top: 1 * @px solid #eee;
}
.cardata {
  height: 100%;
  margin-top: 28 * @px;
}
.cardata > p {
  height: 30 * @px;
  line-height: 30 * @px;
  text-indent: 19 * @px;
  color: #333;
  font-size: 16 * @px;
  vertical-align: bottom;
}
.cardata > p:nth-child(3),
.cardata > p:nth-child(2) {
  margin-top: 10 * @px;
}
.carimg > img {
  width: 100%;
  height: 100%;
}
table {
  width: 100%;
  text-align: center;
}
.flight {
  width: 386 * @px;
  height: 321 * @px;
  background: #fafcff;
  overflow: hidden;
}
tr {
  height: 42 * @px;
  line-height: 42 * @px;
}
th,
td {
  text-align: center;
}
th {
  font-size: 14 * @px;
  font-weight: bold;
  background: #edf1f5;
}
td {
  font-size: 14 * @px;
}
tbody > tr:nth-child(even) {
  background: #f4f8fc;
}
tr:hover {
  cursor: pointer;
  background: #e6e8eb !important;
}
</style>
