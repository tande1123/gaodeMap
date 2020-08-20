/*
 * @Description: 路由文件
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-25 22:12:22
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-07-16 08:52:35
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * 临时路由区（后期删除）
 */
const Menu = () => import(/* webpackChunkName: 'Menu' */ '@/temp/menu/index.vue')
const Measure = () => import(/* webpackChunkName: 'Measure' */ '@/temp/measure/index.vue')
const Draw = () => import(/* webpackChunkName: 'Draw' */ '@/temp/draw/index.vue')
const Geometry = () => import(/* webpackChunkName: 'Geometry' */ '@/temp/geometry/index.vue')
const MapSwitch = () => import(/* webpackChunkName: 'MapSwitch' */ '@/temp/mapswitch/index.vue')
const Resource = () => import(/* webpackChunkName: 'Resource' */ '@/temp/resource/index.vue')
const Buffer = () => import(/* webpackChunkName: 'Buffer' */ '@/temp/buffer/index.vue')
const Search = () => import(/* webpackChunkName: 'Search' */ '@/temp/search/index.vue')

/**
 * 正式路由区
 */
const newTextNave = () => import(/* webpackChunkName: 'newTextNave' */ '@/views/testNav.vue')
const Line = () => import(/* webpackChunkName: 'newTextNave' */ '@/views/analysisline/r-line.vue')
// 视频
const Video = () => import(/* webpackChunkName: 'video' */ '@/views/video/r-index.vue')
const Jycspjkyzt = () => import(/* webpackChunkName: ' ThreeDmap' */ '@/views/newjycspjkyzt/r-index.vue')
// 综合分析研判
const Vehicle = () => import(/* webpackChunkName: 'vehicle' */ '@/views/vehicle/r-index.vue')
// 周边交通
const Site = () => import(/* webpackChunkName: 'site' */ '@/views/site/r-site.vue')
// 专车监测一张图
const Zyjcyzt = () => import(/* webpackChunkName: ' Zyjcyzt' */ '@/views/zyjcyzt/r-zyjcyzt.vue')
/* 2019312 新版本专业检测一张图 */
const newzyjcyzt = () => import(/* webpackChunkName: 'Search' */ '@/views/newzyjcyzt/r-newzyjcyzt-jt.vue')
const newzyjcyzthj = () => import(/* webpackChunkName: 'Search' */ '@/views/newzyjcyzt/r-newzyjcyzt-hj.vue')
const newzyjcyztqx = () => import(/* webpackChunkName: 'Search' */ '@/views/newzyjcyzt/r-newzyjcyzt-qx.vue')
// 住宿服务 (深色底图)
const Zsfwxx = () => import(/* webpackChunkName: ' ThreeDmap' */ '@/views/zsfwxx/3dmodel.vue')
// 卫生保障
const wsbz = () => import(/* webpackChunkName: 'Search' */ '@/views/wsbz/r-index.vue')
// 班车赛事  (深色底图)
const bcss = () => import(/* webpackChunkName: ' ThreeDmap' */ '@/views/bcss/r-index.vue')
// 医疗赛事  (深色底图)
const ylss = () => import(/* webpackChunkName: ' ThreeDmap' */ '@/views/ylss/r-index.vue')
// 交通专项  (深色底图)
const jtzx = () => import(/* webpackChunkName: ' ThreeDmap' */ '@/views/jtzx/r-index.vue')
// 总值班室-交通管理
const zbsjtgl = () => import(/* webpackChunkName: ' zbsjtgl' */ '@/views/zbs/r-index.vue')

// 定向越野 - 人员、车辆位置展示
const rdxyyrywz = () => import(/* webpackChunkName: 'r-dxyy-rywz' */ '@/views/dxyy/r-dxyy-rywz')
// 新铁人三项 - 人员、车辆位置展示
const trsxrywz = () => import(/* webpackChunkName: ' zbsjtgl' */ '@/views/trsx/r-trsx-rywz-new')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: newTextNave
    },
    {
      path: '/r-line',
      name: 'line',
      component: Line
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/measure',
      name: 'Measure',
      component: Measure
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    },
    {
      path: '/geo',
      name: 'Geometry',
      component: Geometry
    },
    {
      path: '/switch',
      name: 'MapSwitch',
      component: MapSwitch
    },
    {
      path: '/res',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/buffer',
      name: 'Buffer',
      component: Buffer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/jycspjkyzt',
      name: 'Jycspjkyzt',
      component: Jycspjkyzt
    },
    {
      path: '/vehicle',
      name: 'Vehicle',
      component: Vehicle
    },
    {
      path: '/site',
      name: 'Site',
      component: Site
    },
    {
      path: '/zyjcyzt',
      name: 'Zyjcyzt',
      component: Zyjcyzt
    },
    { // 新专业检测一张图
      path: '/newzyjcyzt',
      name: 'newzyjcyzt',
      component: newzyjcyzt
    },
    { // 新专业检测一张图 环境
      path: '/newzyjcyzthj',
      name: 'newzyjcyzthj',
      component: newzyjcyzthj
    },
    { // 新专业检测一张图 气象
      path: '/newzyjcyztqx',
      name: 'newzyjcyztqx',
      component: newzyjcyztqx
    },
    {
      path: '/zsfwxx',
      name: 'Zsfwxx',
      component: Zsfwxx
    },
    { // 卫生保障
      path: '/wsbz',
      name: 'wsbz',
      component: wsbz
    },
    { // 班车赛事
      path: '/r-rcyxcj-bcss',
      name: 'bcss',
      component: bcss
    },
    { // 医疗赛事
      path: '/r-rcyxcj-ylss',
      name: 'ylss',
      component: ylss
    },
    { // 交通专项
      path: '/jtzx',
      name: 'jtzx',
      component: jtzx
    },
    { // 总值班室-交通管理
      path: '/zbsjtgl',
      name: 'zbsjtgl',
      component: zbsjtgl
    },

    { // 新铁人三项 - 人员、车辆位置展示
      path: '/r-trsx-rywz',
      name: 'r-trsx-rywz',
      component: trsxrywz
    },
    { // 定向越野 - 人员、车辆位置展示
      path: '/r-dxyy-rywz',
      name: 'r-dxyy-rywz',
      component: rdxyyrywz
    }
  ]
})
