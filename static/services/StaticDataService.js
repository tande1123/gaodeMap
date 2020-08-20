// 加载静态文件
import request from '@/store/request'
export class StaticDataService {
  constructor (opt) {
    this.opt = opt
  }
  async getStaticData () {
    let urls = [
      './static/config/map.config.js',
      './static/config/symbol.config.js',
      './static/config/layer.tree.config.js'
    ]
    let res = await request.requestAll(urls)
    let arr = []
    res.forEach(element => {
      arr.push(element.data)
    })
    return arr
  }
}
