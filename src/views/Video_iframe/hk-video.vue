<!--
 * @Descripttion: 视频窗口
 * @version:
 * @Author: qiulongwen
 * @Date: 2019-09-24 11:40:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-24 10:14:51
 -->
<template>
    <div class="video_iframe">
        <div id="video"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  watch: {
  },
  computed: {
    ...mapGetters(['configLoaded', 'mapConfig', 'mapLoaded', 'map'])
  },
  mounted () {
    // this.testPlayer()
    let self = this
    this.bus.$on('PlayHKvideo', indexcode => {
      self.StartPlayerVideo(indexcode)
    })
  },
  methods: {
    StartPlayerVideo (indexcode) {
      let par = {
        urlO: this.mapConfig.misConfig.decodingVedio,
        id: indexcode
      }
      this.$store.dispatch('decodingVedio', par).then(res => {
        if (!res) { return }
        if (res.code === 200) {
          let URL = 'rtmp://219.140.220.68:10008/live/' + indexcode
          var videoObject = {
            container: '#video', // 容器的ID或className
            variable: 'player', // 播放函数名称
            autoplay: true,
            live: true,
            video: URL
          }
          /* eslint-disable*/
        let ss=new ckplayer(videoObject)
      }
    })
    },
    // 测试代码
    palyer(URL){
          var videoObject = {
            container: '#video', // 容器的ID或className
            variable: 'player', // 播放函数名称
            autoplay: true,
            live: true,
            video: URL
          }
          /* eslint-disable*/
        let ss=new ckplayer(videoObject)
    },
    //测试代码
    testPlayer(){
      this.bus.$on('PlayHKvideo', INDEX_CODE=>{
        let URL=''
        switch(INDEX_CODE){
            case '65000000001320017535':
            case '42011500001320020511' :
            case '42011500001320025083':
                URL='http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4'
                break
            case '65000000001320019250':
            case '65000000001320019274':
            case '42011500001320026977':
            case '42011568001320036859':
                URL='http://img.ksbbs.com/asset/Mon_1703/d30e02a5626c066.mp4'
                break
        } 
        this.palyer(URL)
    })
    }
  }
}
</script>
<style scoped>
#video{
  height: 100%;
  width: 100%;
}
</style>
