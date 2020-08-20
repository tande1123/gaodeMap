<!-- 全局导航 -->
<template>
  <div>
    <div class="testNav">
      <router-link to="/video">
        军运村视频监控一张图NO
      </router-link>
      <router-link to="/jycspjkyzt">
        新军运村视频监控一张图NO
      </router-link>
      <br> <br>

      <router-link to="/vehicle">
        综合分析研判系统——区域管理-区域热点分析
      </router-link>
      <br> <br>
      <router-link to="/site">
        周边态势感知——周边交通态势
      </router-link>
      <br> <br>
      <router-link to="/zyjcyzt">
        专业监测一张图NO
      </router-link>
      <router-link to="/newzyjcyzt">
        新专业检测一张图
      </router-link>
      <br> <br>
      <router-link to="/zsfwxx">
        住宿服务信息
      </router-link>
      <router-link to="/r-rcyxcj-bcss">
        日常运行场景-班车赛事
      </router-link>
      <router-link to="/r-rcyxcj-ylss">
        日常运行场景-医疗赛事
      </router-link>
      <br> <br>
      <router-link to="/wsbz">
        卫生保障
      </router-link>
      <router-link to="/jtzx">
        交通专项
      </router-link>
       <router-link to="/zbsjtgl">
        总值班室-交通管理
      </router-link>
      <br> <br>
       <router-link to="/r-trsx-rywz">
        铁人三项人员车辆位置展示
      </router-link>
        <br> <br>
       <router-link to="/r-dxyy-rywz">
        定向越野人员车辆位置展示
      </router-link>
    </div>
    <br>
    <div>
      <router-link to="/menu">
        demo
      </router-link>
      <router-link to="/r-line">
        LINE
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['configLoaded', 'mapLoaded', 'config', 'map', 'symbol', 'mapConfig'])
  },
  mounted () {
    if (this.mapLoaded && this.map) {
      // this.map.getInstance().setZoomAndCenter(10, [114.316200103, 30.5810841269])
      // this.map.getInstance().setMapStyle('')
      this.map.clear()
    }
  }
}
</script>
<style lang="less" scoped>
.testNav * {
  background-color: lightgrey;
}
</style>
