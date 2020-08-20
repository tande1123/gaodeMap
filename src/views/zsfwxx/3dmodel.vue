<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:18:15
 -->
<!-- 军运村住宿信息 -->
<template>
  <div>
    <map-3d ref="getModelJson"></map-3d>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import map3d from '@/gis/map/map-3d'
export default {
  components: {
    map3d
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['config', 'configLoaded'])
  },

  methods: {
    ...mapActions(['setConfig']),
    initLoad () {
      this.$refs.getModelJson.load3dModel()
    }
  },
  watch: {
    configLoaded () {
      this.initLoad()
    }
  },
  mounted () {
    if (this.configLoaded) {
      this.$nextTick(() => {
        this.initLoad()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/set.less';
</style>
