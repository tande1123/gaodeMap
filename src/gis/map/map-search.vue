<!--
 * @Description: 高德地图搜索服务
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-10 11:34:20
 * @LastEditors: wsw
 * @LastEditTime: 2018-12-10 15:18:28
 -->
<template>
  <div></div>
</template>

<script>
import AMap from 'AMap'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['map', 'mapLoaded'])
  },
  watch: {
    mapLoaded () {
      this.init()
    }
  },
  methods: {
    init () {
      AMap.service(['AMap.PlaceSearch'], () => {
      // 构造地点查询类
        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: '027', // 兴趣点城市
          citylimit: true // 是否强制限制在设置的城市内搜索
        })
      })
    },
    search (searchTxt = '武汉大学') {
      return new Promise((resolve, reject) => {
        // 关键字查询
        this.placeSearch.search(searchTxt, (status, result) => {
          if (result && result.info === 'OK') {
            resolve(result.poiList.pois)
          } else {
            reject(result.info)
          }
        })
      })
    }
  },
  data () {
    return {
      placeSearch: null
    }
  },
  mounted () {
    if (this.mapLoaded) {
      this.init()
    }
  }
}

</script>
<style scoped>
</style>
