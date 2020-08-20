<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:14:24
 -->
<!--环境  重点监控单位-->
<!--目前两种方式实现圆环进度 echarts 渲染时有一点动画缩放过程 css较复杂-->
<template>
  <div class="box">
    <div v-if="type==1">
      <p class="title">
        <span>重点监控单位</span>
        <span @click="typeClick(2)">切换列表</span>
      </p>
      <div class="xxjkxx">
        <ul>
          <li>
            <div class="canvasBox">
              <div class="imgbox bgimg" ref="canvasthree">
                <div class="canvasbox" ref="threebox">
                  <div ref="threeEcharts" style="width:100%;height:100%">
                  </div>
                </div>
                <p class="zs zsthree">{{effluent.COUNT}}</p>
              </div>
            </div>
            <p class="type">
              <span class="skybar"></span>废水排放企业</p>
            <div class="bottombox">
              <div>
                <div class="info">
                  <div>超标</div>
                  <div>{{effluentnumber}}
                    <span>家</span>
                  </div>
                </div>
                <div>
                  <p class="jdt">
                    <b :style="{width:(effluentnumber/effluent.count*100+'%')}"></b>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="canvasBox">
              <div class="imgbox bgimg" ref="tcanvasthree">
                <div class="canvasbox" ref="tthreebox">
                  <div ref="gtfqwEcharts" style="width:100%;height:100%">
                  </div>
                </div>
                <p class="zs zsthree">20</p>
              </div>
            </div>
            <p class="type">
              <span></span>固体废弃物企业</p>
            <div class="bottombox">
              <!-- <div class="fs"> 固体废弃物</div> -->
              <div>
                <div class="info">
                  <div>超标</div>
                  <div>6
                    <span>家</span>
                  </div>
                </div>
                <div>
                  <p class="jdt">
                    <b></b>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="canvasBox">
              <div class="imgbox bgimg" ref="rcanvasthree">
                <div class="canvasbox" ref="rthreebox">
                  <div ref="fqEcharts" style="width:100%;height:100%">
                  </div>
                </div>
                <p class="zs zsthree">20</p>
              </div>
            </div>
            <p class="type">
              <span class="yellowbar"></span>废气排放企业</p>
            <div class="bottombox">
              <!-- <div class="fs"> 废气</div> -->
              <div>
                <div class="info">
                  <div>超标</div>
                  <div>6
                    <span>家</span>
                  </div>
                </div>
                <div>
                  <p class="jdt">
                    <b></b>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="type==2">
      <p class="title">
        <span>重点监控单位</span>
        <span @click="typeClick(1)">切换统计表</span>
      </p>
      <div class="xxjkxx">
        <div class="tr">
          <div class="td">序号</div>
          <div class="td">重污染企业名称</div>
        </div>
        <div class="table">
          <div class="tr" v-for="(item,index) in comList" :key="index" @click="showOnMap(item)">
            <div class="td"><span>{{index+1}}</span></div>
            <div class="td">{{item.COMPANYNAME}}</div>
          </div>
        </div>
        <div class="paging">
          <span class="paging_span">{{total}}条结果,{{currentpage}}/{{parse(total/4)}}页</span>
          <el-pagination background layout="prev, pager, next" :pager-count="5" :page-size="4" :total="total" class="enterprise" @current-change="pagechange" @next-click="pagechange" @prev-click="pagechange" :current-page='currentpage'>
          </el-pagination>
        </div>
      </div>
    </div>
    <com-map-handler ref="comMapH"></com-map-handler>
  </div>
</template>
<script>
// 引入基本模板
import common from '@/utils/common.es'
import { mapActions } from 'vuex'
import comMapHandler from '@/ctrls/com-map-handler'

let echarts = require('echarts')
export default {
  components: {
    comMapHandler
  },
  data () {
    return {
      canvasstyle: ['#0a7bc7', '#f7b434', '#00cdfe'],
      threeEcharts: null,
      echartstime: null,
      effluent: '', // 废水
      effluentnumber: '', // 废水超标单位
      type: 1,
      num: 1,
      total: 9,
      currentpage: 1,
      comList: []
    }
  },
  methods: {
    ...mapActions(['queryParamTable']),
    _load (url, request) { // 请求
      return this.axios.post(url, request)
    },
    countrequist (tabname) { // 返回计总请求参数
      let requiredata = {
        parameter: {
          DoAction: tabname
        }
      }
      return requiredata
    },
    overproofrequist (tabname, column) { // 返回超标查询请求参数
      let requiredata = {
        parameter: {
          DoAction: tabname,
          Conditions: [
            [
              {
                Column: column,
                ColumnDataType: 'NVARCHAR2',
                Mode: 'IS_NOT',
                Value: '0'
              }
            ]
          ],
          'token': 'string'
        }
      }
      return requiredata
    },
    returnOption (color, sum, data) { // echar表数据
      let optiondata = {
        tooltip: {
        },
        color: ['#00cdfe', '#deeaf6'], // 第一个圆环颜色 第二个底环颜色
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '61%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            silent: true,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              labelLine: {
                show: true,
                smooth: 0.2,
                length: 10,
                length2: 50
              },
              emphasis: {
                label: {
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: [ // 覆盖范围设置
              { value: 50, name: '1' }, // 颜色占比
              { value: 100 - 50, name: '5' } // 底色占比
            ]
          }
        ]
      }
      // 修改颜色
      optiondata.color[0] = color
      // 设置占比
      optiondata.series[0].data[0].value = data
      optiondata.series[0].data[1].value = sum
      return optiondata
    },
    typeClick (type) {
      // 点击切换按钮
      this.type = type
      // 显示重点监测单位的弹窗
      this.openPop()
    },
    pagechange (val) {
      this.num = val
    },
    parse (val) { // 总页数取整
      return Math.ceil(val)
    },
    openPop () {
      // this.$store.commit('setZdwl', true)
    },
    showOnMap (item) {
      this.$refs.comMapH && this.$refs.comMapH.selectorHandler(item)
    }
  },
  mounted () {
    let _counturl = this.$store.state.baseServiceUrl + '/DataService/QuerySafetyCount' // 计总url
    let _overproof = this.$store.state.baseServiceUrl + '/DataService/QuerySafety' // 条件查询URL
    // 废水
    this.threeEcharts = echarts.init(this.$refs.threeEcharts)
    this.threeEcharts.setOption(this.returnOption('#00cdef', 150, 70))
    // 固体废弃物
    this.fqwEcharts = echarts.init(this.$refs.gtfqwEcharts)
    this.fqwEcharts.setOption(this.returnOption('#0a7bc7', 150, 30))
    // 废气
    this.fqEcharts = echarts.init(this.$refs.fqEcharts)
    this.fqEcharts.setOption(this.returnOption('#f7b434 ', 150, 50))
    // 废水单位
    this._load(_counturl, this.countrequist('querygiswebdatampcompany')).then(res => {
      this.effluent = common.convertTable2objects(res.data.QuerySafetyCountResult)[0]
    })
    // 废水超标单位
    this._load(_overproof, this.overproofrequist('querygiswebdatampcompany', 'ISWARNING')).then(res => {
      this.effluentnumber = res.data.QuerySafetyResult.Values.length
    })
    // 废气单位
    this._load(_counturl, this.countrequist('querygiswebdatampcompany')).then(res => {
      this.effluent = common.convertTable2objects(res.data.QuerySafetyCountResult)[0]
    })
    // 图表适配
    let that = this
    window.addEventListener('resize', function (params) {
      that.threeEcharts.resize()
      that.fqwEcharts.resize()
      that.fqEcharts.resize()
    })

    // 企业名单
    const url = {
      tag: 'QuerySafety',
      param: {
        parameter: {
          'DoAction': 'querygiswebdatampcompany',
          'Conditions': []
        }
      }
    }
    this.queryParamTable(url).then(data => {
      console.log('data: 企业名单', data)
      this.total = data.length
      this.comList = data
    })
  }

}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.box {
  width: 415 * @px;
  height: 300 * @px;
  border-radius: 4 * @px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
}
.title {
  height: 40 * @px;
  line-height: 40 * @px;
  color: #fff;
  background-image: url("../../../static/assets/img/newzyjcyzt/headbg.png");
  background-size: 100% 100%;
  text-indent: 13 * @px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding-right: 14 * @px;
  letter-spacing: 2 * @px;
  span:nth-child(1) {
    font-size: 18 * @px;
    font-weight: bold;
  }
  span:nth-child(2) {
    font-size: 14 * @px;
    cursor: pointer;
  }
}
.xxjkxx {
  width: 415 * @px;
  height: 260 * @px;
  box-sizing: border-box;
  padding: 14 * @px;
}
.xxjkxx ul {
  width: 386 * @px;
  height: 232 * @px;
}
.xxjkxx ul > li {
  width: 120 * @px;
  height: 100%;
  margin-right: 13 * @px;
  float: left;
  position: relative;
  text-align: center;
  box-shadow: 0 * @px 0 * @px 10 * @px rgba(89, 200, 242, 0.35);
}
.xxjkxx ul > li:last-child {
  margin-right: 0 * @px;
}
.fs {
  text-align: left;
}
.bottombox {
  box-sizing: border-box;
  width: 100%;
  height: 82 * @px;
  border-radius: 4 * @px;
  // box-shadow: 0 * @px 0 * @px 10 * @px rgba(89, 200, 242, 0.35);
  position: absolute;
  bottom: 0;
  padding: 25 * @px 6 * @px 6 * @px;
  overflow: hidden;
}
.bottombox > div {
  height: 35 * @px;
  width: 100%;
  // line-height: 35 * @px;
  font-size: 14 * @px;
  box-sizing: border-box;
}
.xxjkxx img {
  width: 110 * @px;
  height: 110 * @px;
  vertical-align: middle;
}
.zs {
  font-size: 32 * @px;
  color: #0a7bc7;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  line-height: 32 * @px;
  height: 32 * @px;
  margin-top: -16 * @px;
}
.canvasBox {
  display: flex;
  justify-content: center;
}
.imgbox {
  width: 110 * @px;
  height: 110 * @px;
  margin-top: 24 * @px;
  position: relative;
}
.canvasbox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.canvasbox > div {
  width: 50%;
  height: 110 * @px;
  float: left;
  overflow: hidden;
  position: relative;
}
.leftarc {
  width: 69 * @px;
  height: 69 * @px;
  border: 5 * @px solid #0a7bc7;
  border-right: 5 * @px solid transparent;
  border-top: 5 * @px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -35 * @px;
  transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  right: 0;
  margin-right: -35 * @px;
  animation: jdt 2s /* infinite */ linear forwards;
  -moz-animation: jdt 2s /* infinite */ linear forwards;
  -webkit-animation: jdt 2s /* infinite */ linear forwards;
  -ms-zoom-animation: jdt 2s /* infinite */ linear forwards;
}
@keyframes jdt {
  0% {
    width: 69 * @px;
    height: 69 * @px;
    border: 5 * @px solid #0a7bc7;
    border-right: 5 * @px solid transparent;
    border-top: 5 * @px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -35 * @px;
    transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    right: 0;
    margin-right: -35 * @px;
  }
  50% {
    width: 69 * @px;
    height: 69 * @px;
    border: 5 * @px solid #0a7bc7;
    border-right: 5 * @px solid transparent;
    border-top: 5 * @px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -35 * @px;
    transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    right: 0;
    margin-right: -35 * @px;
  }
  100% {
    width: 69 * @px;
    height: 69 * @px;
    border: 5 * @px solid #0a7bc7;
    border-right: 5 * @px solid transparent;
    border-top: 5 * @px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -35 * @px;
    transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    right: 0;
    margin-right: -35 * @px;
  }
}
@keyframes jdtright {
  0% {
    width: 69 * @px;
    height: 69 * @px;
    border: 5 * @px solid #0a7bc7;
    border-left: 5 * @px solid transparent;
    border-bottom: 5 * @px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -35 * @px;
    transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    left: 0;
    margin-left: -35 * @px;
  }
  50% {
    width: 69 * @px;
    height: 69 * @px;
    border: 5 * @px solid #0a7bc7;
    border-left: 5 * @px solid transparent;
    border-bottom: 5 * @px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -35 * @px;
    transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    left: 0;
    margin-left: -35 * @px;
  }
  100% {
    width: 69 * @px;
    height: 69 * @px;
    border: 5 * @px solid #0a7bc7;
    border-left: 5 * @px solid transparent;
    border-bottom: 5 * @px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -35 * @px;
    transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    left: 0;
    margin-left: -35 * @px;
  }
}
.skyleftarc {
  width: 69 * @px;
  height: 69 * @px;
  border: 5 * @px solid #00cdfe;
  border-right: 5 * @px solid transparent;
  border-top: 5 * @px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -35 * @px;
  transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  right: 0;
  margin-right: -35 * @px;
}
.yellowborderleft {
  width: 69 * @px;
  height: 69 * @px;
  border: 5 * @px solid #f7b434;
  border-right: 5 * @px solid transparent;
  border-top: 5 * @px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -35 * @px;
  transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  right: 0;
  margin-right: -35 * @px;
}
.rightarc {
  width: 69 * @px;
  height: 69 * @px;
  border: 5 * @px solid #0a7bc7;
  border-left: 5 * @px solid transparent;
  border-bottom: 5 * @px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -35 * @px;
  transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  left: 0;
  margin-left: -35 * @px;
  animation: jdtright 2s /* infinite */ linear forwards;
}
.skyrightarc {
  width: 69 * @px;
  height: 69 * @px;
  border: 5 * @px solid #00cdfe;
  border-left: 5 * @px solid transparent;
  border-bottom: 5 * @px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -35 * @px;
  transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  left: 0;
  margin-left: -35 * @px;
}
.righyellowborder {
  width: 69 * @px;
  height: 69 * @px;
  border: 5 * @px solid #f7b434;
  border-left: 5 * @px solid transparent;
  border-bottom: 5 * @px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -35 * @px;
  transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  left: 0;
  margin-left: -35 * @px;
}
.bottombox > div:nth-child(2) > div {
  width: 100%;
  height: 16 * @px;
  line-height: 18 * @px;
  font-size: 14 * @px;
}
.info > div {
  width: 50%;
  color: #f6541b;
  font-size: 14 * @px;
  float: left;
}
.info > div:nth-child(1) {
  text-align: left;
}
.info > div:nth-child(2) {
  text-align: right;
  font-weight: bold;
}
.info > div:nth-child(2) > span {
  font-size: 12 * @px !important;
  color: #999 !important;
}
.jdt {
  width: 100%;
  height: 6 * @px;
  background: #dfebf7;
  border-radius: 4 * @px;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}
.jdt > b {
  width: 20%;
  height: 6 * @px;
  background: #f6541b;
  float: left;
}
.type {
  color: #999;
  height: 39 * @px;
  line-height: 39 * @px;
  font-size: 12 * @px;
}
.type > span {
  height: 10 * @px;
  width: 10 * @px;
  background: #0a7bc7;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10 * @px;
}
.yellowbar {
  background: #f7b434 !important;
}
.skybar {
  background: #00cdfe !important;
}
.zstow {
  color: #f7b434 !important;
}
.zsthree {
  color: #00cdfe !important;
}
.bgimg {
  background: url("../../../static/assets/img/newzyjcyzt/imgbg.png");
  background-size: 100% 100%;
}
// 重污染企业
.tr {
  font-size: 14 * @px;
  display: flex;
  .td:nth-child(1) {
    width: 56 * @px;
    text-align: center;
  }
  .td:nth-child(2) {
    flex: 1;
    text-indent: 7 * @px;
  }
}
.table {
  // width: 364 * @px;
  margin-top: 9 * @px;
  border: 1px solid #d3d8df;
  .tr {
    height: 42 * @px;
    line-height: 42 * @px;
    cursor: pointer;
    &:nth-child(odd) {
      background: #f2f7fc;
    }
    &:nth-child(even):hover {
      background: #f2f7fc;
    }
    .td:nth-child(1) {
      width: 55 * @px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        display: inline-block;
        width: 20 * @px;
        height: 20 * @px;
        line-height: 20 * @px;
        text-align: center;
        border-radius: 50%;
        background: #0b70c0;
        color: #fff;
      }
    }
    .td:nth-child(2) {
      width: 225 * @px;
      text-indent: 7 * @px;
    }
  }
}

.paging {
  // width: 364 * @px;
  // padding: 0 14 * @px;
  height: 40 * @px;
  line-height: 40 * @px;
  // text-align: right;
  box-sizing: border-box;
  // margin-top: 25 * @px;
  > input {
    width: 32 * @px;
    height: 32 * @px;
    vertical-align: middle;
    background: #fff;
    box-sizing: border-box;
    border: 0.015625rem solid #ccc;
    cursor: pointer;
    border-radius: 0.046875rem;
    transition: 0.2s;
    -ms-transition: 0.2s;
    -moz-transition: 0.2s;
    margin-top: 1px;
    -webkit-transition: 0.2s;
  }
  > input[type="button"]:hover {
    background: #1ea1f9;
    color: #fff !important;
  }
  > span {
    float: left;
    font-size: 12 * @px;
    color: #969696;
  }
  table {
    table-layout: fixed;
  }
  td,
  th {
    white-space: nowrap;
    overflow: hidden;
  }
  .numb {
    width: 32 * @px !important;
    margin-right: 4px !important;
  }
  .submit {
    width: 35 * @px !important;
    background: #0a7bc7 !important;
    color: #fff;
    font-size: 12 * @px;
  }
  .btnactive {
    background: #0a7bc7 !important;
    color: #fff !important;
  }
  .pagenext {
    background: url("../../../static/img/site/pagenetx.png") no-repeat center !important;
  }
  .pagenext:hover {
    background: url("../../../static/img/site/pagenetx.png") no-repeat center
      #1ea1f9 !important;
  }
  .pagedown {
    background: url("../../../static/img/site/pagedown.png") no-repeat center !important;
  }
  .pagedown:hover {
    background: url("../../../static/img/site/pagedown.png") no-repeat center
      #1ea1f9 !important;
  }
  .eletab {
    width: 384 * @px;
    height: 753 * @px;
  }
  p {
    white-space: nowrap;
  }
  .thad {
    height: 42 * @px;
    font-size: 14 * @px;
    font-weight: bold;
    text-align: center !important;
    line-height: 42 * @px;
  }
  td,
  th {
    padding: 0 2 * @px;
  }
}
</style>
<style lang="less">
@import "../../assets/less/set.less";
.enterprise {
  display: inline-block;
  float: right;
  display: flex;
  align-items: center;
  padding: 0;
}
.enterprise .btn-prev {
  display: none;
}
.enterprise .btn-next {
  margin: 0 !important;
}
.enterprise .btn-next {
  width: 32 * @px!important;
  height: 32 * @px!important;
  border-radius: 4 * @px;
  -webkit-border-radius: 4 * @px;
  -ms-border-radius: 4 * @px;
  -o-border-radius: 4 * @px;
  -moz-border-radius: 4 * @px;
  line-height: 0.46875rem !important;
  margin-top: 0.1rem !important;
  border: 1px solid #ccc !important;
  background: #fff !important;
  padding-left: 6 * @px !important;
}
.enterprise .more,
.enterprise .number {
  width: 0.46875rem !important;
  height: 0.46875rem !important;
  line-height: 0.46875rem !important;
  margin-top: 0.1rem !important;
  border: 1px solid #ccc !important;
  background: #fff !important;
}
.enterprise .active {
  background: #0a7bc7 !important;
  color: #fff !important;
}
.enterprise .active:hover {
  background: #1ea1f9 !important;
}
.enterprise .el-pager li {
  width: 32 * @px!important;
  height: 32 * @px!important;
  margin-right: 11 * @px;
  border-radius: 4 * @px;
  -webkit-border-radius: 4 * @px;
  -ms-border-radius: 4 * @px;
  -o-border-radius: 4 * @px;
  -moz-border-radius: 4 * @px;
}
</style>
