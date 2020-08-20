/*
 * @Description: 过滤器
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-25 22:12:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-08-08 10:59:37
 */
import Vue from 'vue'
import fmtDate from '@/utils/formatdate.es'
import GetWindEightDirection from '@/utils/GetWindEightDirection'
Vue.filter('fmtDotNetTime', function (value) {
  let time = fmtDate.convertDotNetString2Date(value)
  return fmtDate.formatDate(time, 'yyyy-MM-dd hh:mm')
})
Vue.filter('fmtDotNetDate', function (value) {
  let time = fmtDate.convertDotNetString2Date(value)
  return fmtDate.formatDate(time, 'yyyy-MM-dd')
})
Vue.filter('fmtDotNetHour', function (value) {
  let time = fmtDate.convertDotNetString2Date(value)
  return fmtDate.formatDate(time, 'hh:mm:ss')
})
Vue.filter('fmtTime', function (value) {
  if (!value || value === '' || value === ' ') {
    return ''
  } else {
    return fmtDate.convertDbDate(value, 'yyyy-MM-dd hh:mm')
  }
})
Vue.filter('fmtWeatherTime', function (value) {
  return fmtDate.convertDbDate(value, 'yyyy-MM-dd z')
})
Vue.filter('fmtWeatherTopicTime', function (value) {
  return fmtDate.convertDbDate(value, 'yyyy-MM-dd z hh:mm')
})
Vue.filter('fmtWeek', function (value) {
  return fmtDate.convertDbDate(value, 'z')
})
Vue.filter('fmtDateTime', function (value) {
  return fmtDate.convertDbDate(value, 'MM-dd')
})
Vue.filter('fmtTqskTime', function (value) {
  return fmtDate.convertDbDate(value, 'M月d日 hh:mm')
})
Vue.filter('fmtAQITime', function (value) {
  return fmtDate.convertDbDate(value, 'MM月dd日')
})
Vue.filter('fmtAQITimehh', function (value) {
  return fmtDate.convertDbDate(value, 'MM月dd日 hh:00')
})
Vue.filter('fmtLstqTime', function (value) {
  return fmtDate.convertDbDate(value, 'yyyy年M月d日')
})
Vue.filter('fmtTqTime', function (value) {
  return fmtDate.convertDbDate(value, 'yyyy-MM-dd hh:00')
})
Vue.filter('fmttqybTime', function (value) {
  return fmtDate.convertDbDate(value, 'M月d日')
})
Vue.filter('popTime', function (value) {
  return fmtDate.convertDbDate(value, 'h:mm')
})
Vue.filter('getFx', function (value) {
  return GetWindEightDirection.GetWindEightDirection(value)
})
