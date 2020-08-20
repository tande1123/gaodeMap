/*
 * @Description: 主入口文件
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2019-01-11 12:55:50
 * @LastEditors: wsw
 * @LastEditTime: 2019-01-14 15:57:58
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/pop.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './filter'
import Axios from 'axios'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {staticDataService} from '../static/services/InstallService.js'
Vue.use(ElementUI)
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.axios = Axios
Vue.config.devtools = false
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/vehicle':
    case '/site':
    case '/newzyjcyzt':
    case '/wsbz':
    case '/jtzx':
      document.body.style.background = `white`
      if (document.getElementById('map_container')) { document.getElementById('map_container').style.background = `white` }
      break
    case '/zsfwxx':
    case '/r-rcyxcj-bcss':
    case '/r-rcyxcj-ylss':
      document.body.style.background = `#033447`
      if (document.getElementById('map_container')) { document.getElementById('map_container').style.background = `#033447` }
      break
    default:
      break
  }
  next()
})
new Vue({
  el: '#app',
  beforeCreate () {
    // 加载配置文件
    staticDataService.getStaticData().then(data => {
      try {
        data.forEach((config, index) => {
          /* eslint-disable*/
          let res = eval(config)
          /* eslint-enable */
          switch (index) {
            case 0:
              if (res.mapOptions.layers) {
                this.layers = res.mapOptions.layers
                delete res.mapOptions.layers
              }
              this.$store.commit('setMapConfig', res)
              this.$store.commit('setBaseServiceUrl', res.services.baseServiceUrl)
              break
            case 1:
              this.$store.commit('setSymbol', res)
              break
            case 2:
              this.$store.commit('setLayerTree', res)
              break
          }
        })
        this.$store.commit('setConfigLoaded', true)
        console.log('加载配置文件成功')
      } catch (error) {
        console.error('加载配置文件失败', error)
      }
    })
  },
  router,
  store,
  data: {
    Bus: new Vue()
  },
  components: {
    App
  },
  template: '<App/>'
})
