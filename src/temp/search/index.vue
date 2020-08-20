<!--  -->
<template>
  <div>
    <div class="search-wrapper">
      <div class="search-container">
        <input type="text" v-model="searchTxt">
        <button @click="search">搜索</button>
      </div>
      <div class="search-container">
        经度：<input type="number" v-model="lng">
        纬度：<input type="number" v-model="lat">
        <button @click="location">定位</button>
      </div>
      <ul>
        <li v-for="(searchResult,index) in searchList" :key="index" @click="select(searchResult)">{{searchResult.name}}</li>
      </ul>
    </div>
    <map-search ref="searchMap"></map-search>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mapSearch from '@/gis/map/map-search'
export default {
  components: {
    mapSearch
  },
  computed: {
    ...mapGetters(['map', 'symbol'])
  },
  data () {
    return {
      searchTxt: '',
      searchList: [],
      currentMarker: null,
      resultTemplate: '',
      lng: 114.316200103,
      lat: 30.5810841269
    }
  },
  methods: {
    ...mapActions(['getTemplate']),
    async search () {
      this.searchList = await this.$refs.searchMap.search(this.searchTxt)
    },
    select (item) {
      if (this.currentMarker) {
        this.map.clear(this.currentMarker)
        this.currentMarker = null
      }
      item = {...item, ...item.location}
      this.currentMarker = this.map.addPoints([item], {
        x: 'lng',
        y: 'lat',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols['bluepoint']
        },
        click: (e) => {
          this.processClick(e)
        }
      })[0]
    },
    processClick (e) {
      const item = e.target.getExtData() || {}
      const offset = e.target.getOffset() || {}
      this.map.showInfoWindow({
        x: item.lng,
        y: item.lat,
        dx: -offset.x,
        dy: offset.y * 2,
        title: item.name,
        data: item,
        methods: {
          test: this.processPopClick
        },
        content: this.resultTemplate
      })
    },
    processPopClick (name) {
      alert(name)
    },
    location () {
      if (this.currentMarker) {
        this.map.clear(this.currentMarker)
        this.currentMarker = null
      }
      let item = {lng: this.lng, lat: this.lat}
      this.currentMarker = this.map.addPoints([item], {
        x: 'lng',
        y: 'lat',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols['bluepoint']
        }
      })[0]
    }
  },
  mounted () {
    this.getTemplate('searchresult').then((res) => {
      this.resultTemplate = res
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.search-wrapper{
  position: absolute;
  top:0;
  left: 0;
  z-index: 1;
  padding: 5*@px;
  background: #fff;
}
.search-container{
  margin-top: 5*@px;
  display: inline-block;
}
input{
  border: 1px solid #ccc;
}
</style>
