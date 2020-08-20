<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!--周边交通态势-->
<template>
  <div>

    <!--头部菜单-->
    <zbtsgz-zbhjts-header :active="3" />
    <map-main></map-main>
    <!-- 班车信息 -->
    <zbtsgz-zbjtts-bc class="cgjs" v-show="ifshowBanChe"/>
    <!-- 公交车 -->
    <zbtsgz-zbjtts-gjc class="bc" v-show="ifshowGj"/>

    <!-- 底部菜单 -->
    <zbtsgz-zbjtts-toolbar :active="1" class="toolbar" @showLeftPane="showLeftPane" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mapMain from '@/gis/map/map-main'
import zbtsgzZbhjtsHeader from './zbjtts-header.vue'
import zbtsgzZbjttsBc from './zbjtts-banche.vue'
import zbtsgzZbjttsGjc from './zbjtts-gjc'
import zbtsgzZbjttsToolbar from './zbjtts-toolbar'
let self
export default {
  components: {
    mapMain,
    zbtsgzZbhjtsHeader,
    zbtsgzZbjttsBc,
    zbtsgzZbjttsGjc,
    zbtsgzZbjttsToolbar
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map'])
  },
  data () {
    return {
      ifshowBanChe: true,
      ifshowGj: false
    }
  },
  props: [],
  methods: {
    initMap () {
      this.map.getInstance().setZoomAndCenter(13, [114.29, 30.43])
      this.map.getInstance().setMapStyle('')

      var lyrs = this.map.getInstance().getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          if (lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
            lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
            lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet') {
            lyrs[l].show()
          }
        }
      }
    },
    showLeftPane (data) {
      switch (data) {
        case 'banche':
          this.ifshowBanChe = true
          this.ifshowGj = false
          break
        case 'gongjiao':
          this.ifshowBanChe = false
          this.ifshowGj = true
          break
        case 'ditie':
          this.ifshowBanChe = false
          this.ifshowGj = false
          break
      }
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.initMap()
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.initMap()
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () {
    // 退出时隐藏底图
    var lyrs = this.map.getInstance().getLayers()
    if (lyrs) {
      for (var l = 0; l < lyrs.length; l++) {
        if (lyrs[l].CLASS_NAME === 'AMap.TileLayer' ||
          lyrs[l].CLASS_NAME === 'AMap.TileLayer.Traffic' ||
          lyrs[l].CLASS_NAME === 'AMap.TileLayer.RoadNet') {
          lyrs[l].hide()
        }
      }
    }
    this.map.clear()
  },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang="less" scoped>
@px : 30rem/1920;
.real_weather {
  width: 410px;
  height: 42px;
  background: #10b7f2;
}
.rightbox {
  position: fixed;
  top: 85 * @px;
  right: 20 * @px;
}
.cgjs {
  position: fixed;
  top: 90 * @px;
  left: 20 * @px;
}
.bc {
  position: fixed;
  top: 90 * @px;
  right: 20 * @px;
}
.toolbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 66 * @px;
  margin: 0 auto;
}
</style>
