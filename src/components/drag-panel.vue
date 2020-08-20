<!-- 通用弹出 拖动面板 -->
<template>
  <div>
    <pop-detail @close-pop-detail="closePopDetail" v-show="showPopDetail" v-on:closePop='closePopDetail'></pop-detail>
    <sxt @close-pop-detail="closesxt" v-if="showSxt"></sxt>
    <popVideo @close-pop-video="closePopVideo" v-show="showPopVideo"></popVideo>
    <videoPop @close="closePopTwo" v-show="showPop2"></videoPop>
    <yiliaozu @close="closeYiliaozu" v-show="showYiliaozu" :item="yiliaozuData"></yiliaozu>
    <shebei @close="closeShebei" v-show="showShebei" :item="shebeiData"></shebei>
    <yaopin @close="closeYaopin" v-show="showYaopin" :item="yaopinData"></yaopin>
    <vediocall @close="closeVediocall" v-show="showVediocall" :item="vediocallData"></vediocall>
    <vediocall2 @close="closeVediocall2" v-show="showVediocall2" :item="vediocallData"></vediocall2>
    <jiuhuche @close="closeJiuhuche" v-show="showJiuhuche" :item="jiuhucheData"></jiuhuche>
    <luxian @close="closeLuxian" v-show="showLuxian" :item="luxianData"></luxian>
    <shipin @close="closeShipin" v-show="showShipin" :item="shipinData"></shipin>
    <daibiaotuan @close="closeDaibiaotuan" v-show="showDaibiaotuan" :item="daibiaotuanData"></daibiaotuan>
  </div>
</template>

<script>
import popDetail from './pop-detail'
import sxt from './sxt'
import popVideo from './pop-video'
import videoPop from './videoPop'
import yiliaozu from './yiliaozu'
import shebei from './shebei'
import yaopin from './yaopin'
import vediocall from './vediocall'
import vediocall2 from './vediocall2'
import jiuhuche from './jiuhuche'
import luxian from './luxian'
import shipin from './shipin'
import daibiaotuan from './daibiaotuan'
export default {
  components: {
    popDetail,
    sxt,
    popVideo,
    videoPop,
    yiliaozu,
    yaopin,
    shebei,
    vediocall,
    vediocall2,
    jiuhuche,
    luxian,
    shipin,
    daibiaotuan
  },
  methods: {
    openDaibiaotuan (obj) {
      this.showDaibiaotuan = true
      this.daibiaotuanData = obj
    },
    closeDaibiaotuan () {
      this.showDaibiaotuan = false
    },
    openShipin (obj) {
      this.showShipin = true
      this.shipinData = obj
    },
    closeShipin () {
      this.showShipin = false
    },
    openLuxian (obj) {
      this.showLuxian = true
      this.luxianData = obj
    },
    closeLuxian () {
      this.showLuxian = false
    },
    openJiuhuche (obj) {
      this.showJiuhuche = true
      this.jiuhucheData = obj
    },
    closeJiuhuche () {
      this.showJiuhuche = false
    },
    openVediocall (obj) {
      this.showVediocall = true
      this.vediocallData = obj
    },
    closeVediocall () {
      this.showVediocall = false
    },
    openVediocall2 (obj) {
      this.showVediocall2 = true
      this.vediocallData = obj
    },
    closeVediocall2 () {
      this.showVediocall2 = false
    },
    openShebei (obj) {
      this.showShebei = true
      this.shebeiData = obj
    },
    closeShebei () {
      this.showShebei = false
    },
    openYaopin (obj) {
      this.showYaopin = true
      this.yaopinData = obj
    },
    closeYaopin () {
      this.showYaopin = false
    },
    openYiliaozu (obj) {
      this.showYiliaozu = true
      this.yiliaozuData = obj
    },
    closeYiliaozu () {
      this.showYiliaozu = false
    },
    openPopDetail (obj) {
      this.showPopDetail = true
    },
    closePopDetail () {
      this.showPopDetail = false
    },
    opensxt (obj) {
      this.showSxt = true
    },
    closesxt () {
      this.showSxt = false
    },
    openPopVideo (obj) {
      this.showPopVideo = true
    },
    closePopVideo () {
      this.showPopVideo = false
    },
    openPop2 (obj) {
      this.showPop2 = true
    },
    closePopTwo () {
      this.showPop2 = false
    }
  },
  data () {
    return {
      showPopDetail: false,
      showSxt: false,
      showPopVideo: false,
      showPop2: false,
      showYiliaozu: false,
      yiliaozuData: null,
      showYaopin: false,
      yaopinData: null,
      showShebei: false,
      shebeiData: null,
      showVediocall: false,
      showVediocall2: false,
      vediocallData: null,
      showJiuhuche: false,
      jiuhucheData: null,
      showLuxian: false,
      luxianData: null,
      showShipin: false,
      shipinData: null,
      showDaibiaotuan: false,
      daibiaotuanData: null
    }
  },
  mounted () {
    let self = this
    this.$store.commit('setPanel', {
      // 标绘
      getPopDetail () {
        return {
          openPanel: self.openPopDetail,
          closePanel: self.closePopDetail
        }
      },
      getSxt () {
        return {
          openSxt: self.opensxt,
          closeSxt: self.closesxt
        }
      },
      getPopVideo () {
        return {
          openPanel: self.openPopVideo,
          closePanel: self.closePopVideo
        }
      },
      keyvideo () {
        return {
          openPanel: self.openPop2,
          closePanel: self.closePopTwo
        }
      },
      getYiliaozu () {
        return {
          openPanel: self.openYiliaozu,
          closePanel: self.closeYiliaozu
        }
      },
      getYaopin () {
        return {
          openPanel: self.openYaopin,
          closePanel: self.closeYaopin
        }
      },
      getShebei () {
        return {
          openPanel: self.openShebei,
          closePanel: self.closeShebei
        }
      },
      getVediocall () {
        return {
          openPanel: self.openVediocall,
          closePanel: self.closeVediocall
        }
      },
      getVediocall2 () {
        return {
          openPanel: self.openVediocall2,
          closePanel: self.closeVediocall2
        }
      },
      getJiuhuche () {
        return {
          openPanel: self.openJiuhuche,
          closePanel: self.closeJiuhuche
        }
      },
      getLuxian () {
        return {
          openPanel: self.openLuxian,
          closePanel: self.closeLuxian
        }
      },
      getShipin () {
        return {
          openPanel: self.openShipin,
          closePanel: self.closeShipin
        }
      },
      getDaibiaotuan () {
        return {
          openPanel: self.openDaibiaotuan,
          closePanel: self.closeDaibiaotuan
        }
      }
    })
  }
}
</script>
<style lang='less' scoped>
</style>
