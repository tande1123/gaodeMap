/*
 * @Description: axois封装
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-25 22:12:22
 * @LastEditors: wsw
 * @LastEditTime: 2019-01-11 13:07:09
 */

import Axios from 'axios'

const axios = Axios.create({
  baseURL: '',
  timeout: 60000
})
const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  throw new Error(res.statusText)
}
const request = async (url, config = {}) => {
  try {
    const res = await axios.request({ url, ...config })
    checkStatus(res)
    return await res.data
  } catch (err) {
    alert('数据加载失败...')
    console.error('request failed with error:', err)
  }
}
const requestAll = async (urls) => {
  let requests = urls.map(makeRequest)
  const res = await Axios.all(requests)
  return res
}
const makeRequest = url => {
  return Axios.get(url)
}
export default {
  request,
  requestAll
}
