<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:25
 -->
<!-- 卫生保障  底部btn -->
<template>
  <div class="footerNav">
    <div class="gongneng">
      <img src="../../../static/assets/img/trsx/tuopan.png" alt="">
      <ul class="daohan">
        <li :class="{xuanzhong1:currentSelect==='男子个人'}" v-on:click="change('男子个人')">
          <p>男子个人</p>
           <div class="tollbarbox">
              <ul class="tollbar">
            <li @click="loadFeatures('zxc')" :class="{activeLi:flag[0].state}">
              <a></a>自行车</li>
            <!-- <li >
              <a></a>物资装备</li> -->
            <li @click="loadFeatures('man')" :class="{activeLi:flag[1].state}">
              <a></a>人</li>
            <li @click="loadFeatures('manall')" :class="{activeLi:flag[2].state}">
              <a></a>全部</li>
          </ul>
        </div>
        </li>
        <li :class="{xuanzhong2:currentSelect==='男子团体'}" v-on:click="change('男子团体')">
          <p>男子团体</p>
          <div class="tollbarbox">
              <ul class="tollbar">
            <li @click="loadFeatures('zxc')" :class="{activeLi:flag[0].state}">
              <a></a>自行车</li>
            <!-- <li >
              <a></a>物资装备</li> -->
            <li @click="loadFeatures('manteam')" :class="{activeLi:flag[1].state}">
              <a></a>人</li>
            <li @click="loadFeatures('manteamall')" :class="{activeLi:flag[2].state}">
              <a></a>全部</li>
          </ul>
        </div>
        </li>
        <li :class="{xuanzhong3:currentSelect==='女子个人'}" v-on:click="change('女子个人')">
          <p>女子个人</p>
          <div class="tollbarbox">
              <ul class="tollbar">
            <li @click="loadFeatures('zxc')" :class="{activeLi:flag[0].state}">
              <a></a>自行车</li>
            <!-- <li >
              <a></a>物资装备</li> -->
            <li @click="loadFeatures('wuman')" :class="{activeLi:flag[1].state}">
              <a></a>人</li>
            <li @click="loadFeatures('wumanall')" :class="{activeLi:flag[2].state}">
              <a></a>全部</li>
          </ul>
        </div>
        </li>
        <li :class="{xuanzhong4:currentSelect==='女子团体'}" v-on:click="change('女子团体')">
          <p>女子团体</p>
          <div class="tollbarbox">
              <ul class="tollbar">
            <li @click="loadFeatures('zxc')" :class="{activeLi:flag[0].state}">
              <a></a>自行车</li>
            <!-- <li >
              <a></a>物资装备</li> -->
            <li @click="loadFeatures('wumanteam')" :class="{activeLi:flag[1].state}">
              <a></a>人</li>
            <li @click="loadFeatures('wumanteamall')" :class="{activeLi:flag[2].state}">
              <a></a>全部</li>
          </ul>
        </div>
        </li>
         <li :class="{xuanzhong5:currentSelect==='混合团体'}" v-on:click="change('混合团体')">
          <p>混合团体</p>
          <div class="tollbarbox">
              <ul class="tollbar">
            <li @click="loadFeatures('zxc')" :class="{activeLi:flag[0].state}">
              <a></a>自行车</li>
            <!-- <li >
              <a></a>物资装备</li> -->
            <li @click="loadFeatures('hunheteam')" :class="{activeLi:flag[1].state}">
              <a></a>人</li>
            <li @click="loadFeatures('hunheall')" :class="{activeLi:flag[2].state}">
              <a></a>全部</li>
          </ul>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
let self
export default {
  data () {
    return {
      currentSelect: '',
      flag: [
        { state: false }, { state: false }, { state: false }
      ],
      people: [
        {
          id: 1,
          x: 114.458811,
          y: 30.239571,
          typecode: 'trsx_man',
          name: '吴维',
          age: '29',
          guoji: '中国'
        },
        {
          id: 2,
          x: 114.458811,
          y: 30.239571,
          typecode: 'trsx_man_team',
          name: '张三，李四',
          age: '29',
          guoji: '中国'
        },
        {
          id: 3,
          x: 114.458811,
          y: 30.239571,
          typecode: 'trsx_wuman',
          name: '王小川',
          age: '29',
          guoji: '中国'
        },
        {
          id: 4,
          x: 114.458811,
          y: 30.239571,
          typecode: 'trsx_wuman_team',
          name: '杨帆，朱小丽',
          age: '29',
          guoji: '中国'
        },
        {
          id: 5,
          x: 114.458811,
          y: 30.239571,
          typecode: 'trsx_hunhe_team',
          name: '陈震,张洋',
          age: '29',
          guoji: '中国'
        }
      ],
      zixingche: [
        {
          id: 8,
          x: 114.45806,
          y: 30.242389,
          typecode: 'trsx_zixingche',
          name: '李松',
          age: '26',
          guoji: '中国'
        }],
      start_end: [{x: 114.461933, y: 30.239451, typecode: 'dxyy_start'}, {x: 114.459462, y: 30.242718, typecode: 'dxyy_end'}]
    }
  },
  methods: {
    ...mapActions(['getTemplate']),
    change (index) {
      this.currentSelect = index
      this.map.hideInfoWindow()
    },
    addBusPointToMap (data) {
      this.map.addPoints(data, {
        x: 'x',
        y: 'y',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols[item.typecode]
        },
        click: (e) => {
          this.processClick(e)
        }
      })
    },
    loadFeatures (type) {
      this.map.clear('marker')
      this.map.hideInfoWindow()
      switch (type) {
        case 'zxc':
          this.addBusPointToMap(this.zixingche)
          break
        case 'man' :
          this.addBusPointToMap([this.people[0]])
          break
        case 'manall' :
          this.addBusPointToMap([this.zixingche[0], this.people[0]])
          break
        case 'manteam' :
          this.addBusPointToMap([this.people[1]])
          break
        case 'manteamall' :
          this.addBusPointToMap([this.zixingche[0], this.people[1]])
          break
        case 'wuman' :
          this.addBusPointToMap([this.people[2]])
          break
        case 'wumanall' :
          this.addBusPointToMap([this.zixingche[0], this.people[2]])
          break
        case 'wumanteam' :
          this.addBusPointToMap([this.people[3]])
          break
        case 'wumanteamall' :
          this.addBusPointToMap([this.zixingche[0], this.people[3]])
          break
        case 'hunheteam' :
          this.addBusPointToMap([this.people[4]])
          break
        case 'hunheall' :
          this.addBusPointToMap([this.zixingche[0], this.people[4]])
          break
      }
      this.addBusPointToMap(this.start_end)
    },
    processClick (e) {
      const item = e.target.getExtData() || {}
      if (item.typecode === 'dxyy_start' || item.typecode === 'dxyy_end') {
        return
      }
      const offset = e.target.getOffset() || {}
      this.map.showInfoWindow({
        x: item.x,
        y: item.y,
        dx: -offset.x + 10,
        dy: offset.y - 10,
        title: item.name,
        data: item,
        content: this.resultTemplate
      })
      var markers = this.map.getInstance().getAllOverlays('marker')
      for (let i = 0; i < markers.length; i++) {
        var markersData = markers[i].C.extData
        let type = markersData.typecode
        if (markersData.typecode === 'dxyy_start' || markersData.typecode === 'dxyy_end') {
          return
        } else if (markersData.id === item.id) {
          switch (type) {
            case 'trsx_man':
              markers[i].setIcon('./static/assets/img/trsx/man_marker_active.png')
              break
            case 'trsx_man_team':
              markers[i].setIcon('./static/assets/img/trsx/man_team_marker_active.png')
              break
            case 'trsx_wuman':
              markers[i].setIcon('./static/assets/img/trsx/wuman_marker_active.png')
              break
            case 'trsx_wuman_team':
              markers[i].setIcon('./static/assets/img/trsx/wuman_team_marker_active.png')
              break
            case 'trsx_hunhe_team':
              markers[i].setIcon('./static/assets/img/trsx/hunhe_team_marker_active.png')
              break
            case 'trsx_zixingche':
              markers[i].setIcon('./static/assets/img/trsx/zixingche_marker_active.png')
              break
          }
        } else {
          switch (type) {
            case 'trsx_man':
              markers[i].setIcon('./static/assets/img/trsx/man_marker.png')
              break
            case 'trsx_man_team':
              markers[i].setIcon('./static/assets/img/trsx/man_team_marker.png')
              break
            case 'trsx_wuman':
              markers[i].setIcon('./static/assets/img/trsx/wuman_marker.png')
              break
            case 'trsx_wuman_team':
              markers[i].setIcon('./static/assets/img/trsx/wuman_team_marker.png')
              break
            case 'trsx_hunhe_team':
              markers[i].setIcon('./static/assets/img/trsx/hunhe_team_marker.png')
              break
            case 'trsx_zixingche':
              markers[i].setIcon('./static/assets/img/trsx/zixingche_marker.png')
              break
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['popkey']),
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig', 'panel'])
  },
  watch: {
  },
  mounted () {
    self = this
    this.getTemplate('dxyy_csry').then((res) => {
      self.resultTemplate = res
    })
  }
}
</script>
<style lang="less" scoped>
@px: 30rem/1920;
.footerNav {
  width: 880 * @px;
  height: 92 * @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gongneng {
  width: 896 * @px;
  position: relative;
  img {
    width: 896 * @px;
    height: 64 * @px;
  }
  .daohan {
    width: 896 * @px;
    position: absolute;
    top: -70 * @px;
    left: 0;
  }
  .daohan > li {
    float: left;
    width: 86 * @px;
    height: 86 * @px;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
  }
  .daohan > li:hover p {
    color: #edaa31;
    color: #edaa31;
  }
  .daohan > li > p {
    width: 100%;
    text-align: center;
    margin-top: 5 * @px;
    color: white;
    font-size: 14 * @px;
    position: absolute;
    left: 0;
    top: 80 * @px;
  }
  .xuanzhong1 p,
  .xuanzhong2 p,
  .xuanzhong3 p,
  .xuanzhong4 p,
  .xuanzhong5 p {
    color: #edaa31 !important;
  }
  .daohan > li:nth-child(1) {
    background: url("../../../static/assets/img/trsx/man.png") no-repeat
      center center;
    margin-left: 170 * @px;
  }
  .daohan > li:nth-child(1):hover {
    background: url("../../../static/assets/img/trsx/man_active.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(1):hover .tollbarbox {
    cursor: pointer;
    transition: 0.8s;
    display: block !important;
  }
  .xuanzhong1 {
    background: url("../../../static/assets/img/trsx/man_active.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(2) {
    background: url("../../../static/assets/img/trsx/man_team.png") no-repeat center
      center;
    margin-left: 30 * @px;
  }
  .daohan > li:nth-child(2):hover {
    background: url("../../../static/assets/img/trsx/man_team_active.png") no-repeat center
      center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(2):hover .tollbarbox {
    cursor: pointer;
    transition: 0.8s;
    display: block !important;
  }
  .xuanzhong2 {
    background: url("../../../static/assets/img/trsx/man_team_active.png") no-repeat center
      center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(3) {
    background: url("../../../static/assets/img/trsx/wuman.png") no-repeat
      center center;
    margin-left: 30 * @px;
  }
  .daohan > li:nth-child(3):hover {
    background: url("../../../static/assets/img/trsx/wuman_active.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(3):hover .tollbarbox {
    cursor: pointer;
    transition: 0.8s;
    display: block !important;
  }
  .xuanzhong3 {
    background: url("../../../static/assets/img/trsx/wuman_active.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(4) {
    background: url("../../../static/assets/img/trsx/wuman_team.png") no-repeat
      center center;
    margin-left: 30 * @px;
  }
  .daohan > li:nth-child(4):hover {
    background: url("../../../static/assets/img/trsx/wuman_team.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(4):hover .tollbarbox {
    cursor: pointer;
    transition: 0.8s;
    display: block !important;
  }
  .xuanzhong4 {
    background: url("../../../static/assets/img/trsx/wuman_team_active.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(5) {
    margin-left: 30 * @px;
    background: url("../../../static/assets/img/trsx/hunhe_team.png") no-repeat
      center center;
  }
  .daohan > li:nth-child(5):hover {
    background: url("../../../static/assets/img/trsx/hunhe_team_active.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(5):hover .tollbarbox {
    cursor: pointer;
    transition: 0.8s;
    display: block !important;
  }
  .xuanzhong5 {
    background: url("../../../static/assets/img/trsx/hunhe_team_active.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
}
 .tollbarbox {
  height: 145 * @px;
  overflow: hidden;
  position: absolute;
  bottom: 40 * @px;
  left: 50%;
  margin-left: -55 * @px;
  transition: 0.8s;
  display: none;
  box-sizing: border-box;
}
.tollbar {
  list-style: none;
  background: #ffffff;
  width: 110 * @px;
  border-radius: 5 * @px;
  overflow: hidden;
}
.tollbar > li {
  text-align: left;
  height: 33 * @px;
  width: 100%;
  line-height: 33 * @px;
  font-size: 14 * @px;
  text-indent: 30 * @px;
  overflow: hidden;
}
.activeLi {
  background: #d8dde3;
}
.tollbar > li:hover {
  background: #d8dde3;
}
.tollbar > li > a {
  transition: 0.8s;
  display: none;
  position: absolute;
  // background: url("../../../static/assets/img/jcsjyzt/jcsjyztTollBarCheck.png")
  //   center no-repeat;
  width: 30 * @px;
  height: 33 * @px;
  left: 0;
  text-align: center;
}
.tollbar > li:hover a {
  transition: 0.8s;
  display: block !important;
  position: absolute;
  // background: url("../../../static/assets/img/jcsjyzt/jcsjyztTollBarCheck.png")
  //   center no-repeat;
  width: 30 * @px;
  height: 33 * @px;
  left: 0;
  text-align: center;
}
</style>
