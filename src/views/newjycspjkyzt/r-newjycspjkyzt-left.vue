<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 军运村视频监控一张图左部模块 -->
<template>
  <div class="jycspjkyzt">
    <div class="inputOne">
      <input
        type="text"
        placeholder="输入关键字查询监控视频"
      >
      <!-- 搜索按钮可以添加事件 -->
      <div class="shousuo">
        <img
          src="../../../static/img/jycspjkyzt/ssicon.png"
          alt=""
        >
      </div>
    </div>
    <!-- 监控区部分 -->
    <div class="jiankong">
      <ul class="daohang">
        <li :class="{'daohang-name-active':indexTabe==='村内'}" v-on:click="changeTabe('村内')">
          <div>村内<span class="daohang-active"></span></div>
        </li>
        <li :class="{'daohang-name-active':indexTabe==='道路'}" v-on:click="changeTabe('道路')">
          <div class="">道路 <span class="daohang-active"></span></div>
        </li>
        <li :class="{'daohang-name-active':indexTabe==='接驳'}" v-on:click="changeTabe('接驳')">
          <div class="">接驳<span class="daohang-active"></span></div>
        </li>
        <li :class="{'daohang-name-active':indexTabe==='119'}" v-on:click="changeTabe('119')">
          <div class="">119<span class="daohang-active"></span></div>
        </li>
        <li :class="{'daohang-name-active':indexTabe==='120'}" v-on:click="changeTabe('120')">
          <div class="">120<span class="daohang-active"></span></div>
        </li>
        <li :class="{'daohang-name-active':indexTabe==='单兵'}" v-on:click="changeTabe('单兵')">
          <div class="">单兵<span class="daohang-active"></span></div>
        </li>
      </ul>
      <!-- <div>
        <ul>
          <li>
            <div><div class="status-bg"></div><span>住宿监控</span><span class="daohang-status"></span></div>
            <ul>
              <li>
                <div>1栋</div>
                <ul>
                  <li><div class="">1-801层楼梯口<span class=""></span></div></li>
                  <li><div class="">1-801室<span class=""></span></div></li>
                  <li><div class="">1-802室<span class=""></span></div></li>
                </ul>
              </li>
              <li><div>2栋</div></li>
              <li><div>3栋</div></li>
            </ul>
          </li>
          <li>
            <div><div class="status-bg"></div><span>训练监控</span><span class="daohang-status"></span></div>
          </li>
        </ul>
      </div> -->

      <el-row class="tac">
        <el-col>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened= true
            >
            <el-submenu index="1">
              <template slot="title">
                <i class="zhushu-img zhushu-img1"></i>
                <div class="stay-name-zhu">住宿监控<span class="name-zhu-details"></span></div>
              </template>
              <el-submenu index="1-4">
                <template slot="title"><div class="stay-address-name">1栋</div></template>
                <el-menu-item index="1-4-1"><div class="video-name">1-801层楼梯口<span class="video-active">✔</span></div> </el-menu-item>
                <el-menu-item index="1-4-2"><div class="video-name">1-801室<span class="video-active">✔</span></div></el-menu-item>
                <el-menu-item index="1-4-3"><div class="video-name">1-802室<span class="video-active">✔</span></div></el-menu-item>
              </el-submenu>
            </el-submenu>
              <el-submenu index="2">
              <template slot="title">
                <i class="zhushu-img zhushu-img2"></i>
                <div class="stay-name-zhu">训练监控</div>
              </template>
              <el-submenu index="2-4">
                <template slot="title"><div class="stay-address-name">1</div></template>
                <el-menu-item index="2-4-1"><div class="video-name">12<span class="video-active">✔</span></div></el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="zhushu-img zhushu-img3"></i>
                <div class="stay-name-zhu">娱乐监控</div>
              </template>
              <el-submenu index="3-4">
                <template slot="title"><div class="stay-address-name">1</div></template>
                <el-menu-item index="3-4-1"><div class="video-name">12<span class="video-active">✔</span></div></el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="zhushu-img zhushu-img4"></i>
                <div class="stay-name-zhu">物业监控</div>
              </template>
              <el-submenu index="4-4">
                <template slot="title"><div class="stay-address-name">1</div></template>
                <el-menu-item index="4-4-1"><div class="video-name">12<span class="video-active">✔</span></div></el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="zhushu-img zhushu-img5"></i>
                <div class="stay-name-zhu">应急监控</div>
              </template>
              <el-submenu index="5-4">
                <template slot="title"><div class="stay-address-name">1</div></template>
                <el-menu-item index="5-4-1"><div class="video-name">12<span class="video-active">✔</span></div></el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: 0,
      indexKey: 1,
      newItem: 0,
      indexTabe: '村内',
      key: '',
      list: [],
      num: 1,
      total: 0
    }
  },
  props: [],
  computed: {},
  methods: {
    change (item) {
      this.indexKey = item
    },
    changeLi (key) {
      if (key === this.flag) {
        this.flag = false
        this.newItem = ''
        this.change(1)
      } else {
        this.flag = key
        this.newItem = key
        this.change(1)
      }
    },
    changeTabe (index) {
      this.indexTabe = index
      this.flag = 0
      switch (index) {
        case '村内':
          this.key = 'JYC'
          break
        case '道路':
          this.key = 'DL'
          break
        case '接驳':
          this.key = 'JB'
          break
        case '119':
          this.key = '119'
          break
        case '120':
          this.key = '120'
          break
        case '单兵':
          this.key = 'DB'
          break
      }
      this.total = 0
    },
    jump () {
      let inputValue = this.$refs.numb.value * 1
      this.inputNum = inputValue
      this.pagechange(inputValue)
      this.$refs.numb.value = ''
    },
    handleOpen () {
      // console.log(key, keyPath)
    },
    handleClose () {
      // console.log(key, keyPath)
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.changeTabe('村内')
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang="less">
@import "../../assets/less/set.less";
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.jycspjkyzt {
  width: 414 * @px;
  height: 547 * @px;
  // box-shadow: 0px 0px 15 * @px #aaa;
}
.jycspjkyzt {
  .inputOne {
    width: 414 * @px;
    height: 40 * @px;
    position: relative;
    border-radius: 5 * @px;

  }
  .inputOne input {
    width: 414 * @px;
    height: 42 * @px;
    padding-left: 12 * @px;
    background-size: 100%;
    border-top-left-radius: 5 * @px;
    border-top-right-radius: 5 * @px;
    border: 1px solid #ccc;
    font-size: 14*@px;
    line-height: 40*@px;
  }
  .shousuo {
    width: 42 * @px;
    height: 42 * @px;
    line-height: 42 * @px;
    position: absolute;
    border-top-right-radius: 5 * @px;
    top:  0;
    right: 0;
    background-color: #0886CE;
    text-align: center;
  }
  .shousuo img {
    width: 22 * @px;
    height: 23 * @px;
  }
  .jiankong {
    width: 414 * @px;
    background: #D8DDE3;
    position: relative;
  }
  .daohang {
    position: relative;
    width: 414 * @px;
    height: 36 * @px;
    display: flex;
    flex-direction: row;
    padding-left: 5 * @px;
  }
  .daohang li {
    flex: 1;
    cursor: pointer;
  }
  .daohang li >div{
    color: #4D4D4D;
    text-align: center;
    font-size: 14 * @px;
    line-height: 36 * @px;
  }

  .daohang .daohang-name-active {
    div {
      color: #0A7BC7;
    }
    .daohang-active {
      display: block;
      background: url("../../../static/img/newjycspjkyzt/dian.png") no-repeat center center;
      width: 16 * @px;
      height: 16 * @px;
      position: absolute;
      top: 10 * @px;
    }
  }
}
.zhushu-img {
    background: url("../../../static/img/newjycspjkyzt/house-a.png") no-repeat center center;
    width: 22 * @px;
    display: block;
    height: 20 * @px;
    position: absolute;
    top: 11 * @px;
    left: 15 * @px;
}
.zhushu-img2 {
    background: url("../../../static/img/newjycspjkyzt/drill.png") no-repeat center center;
}
.zhushu-img3 {
    background: url("../../../static/img/newjycspjkyzt/coffee.png") no-repeat center center;
}
.zhushu-img4 {
    background: url("../../../static/img/newjycspjkyzt/management.png") no-repeat center center;
}
.zhushu-img5 {
    background: url("../../../static/img/newjycspjkyzt/waringvideo.png") no-repeat center center;
}
.jiankong {
  .stay-name-zhu,
  .stay-address-name {
    margin-left: 25 * @px;
    & + i {
      display: none;
    }
  }
  .el-submenu.is-opened .stay-name-zhu::before {
      content: '▾';
      float: right;
      font-size: 22 * @px;
      margin-right: -15 * @px;
      color: #0A7BC7;
  }
  .stay-name-zhu::before {
      content: '▸';
      float: right;
      font-size: 22 * @px;
      margin-right: -15 * @px;
  }

  .video-name {
    margin-left: 30 * @px;
  }
  .video-active {
      float: right;
      margin-right: -32px;
      color: #fff;
      font-size: 18px;
      display: none;
  }
  .el-menu-item {
    background-color: #DCF1FF;
    &:hover {
    background-color: #DCF1FF;
    }
  }
  .el-menu-item.is-active {
      color: #fff;
      background-color: #0A7BC7;
  }
  .el-menu-item.is-active {
    .video-active {
      display: block;
    }
  }
  .el-menu-vertical-demo .el-submenu .el-menu .el-submenu .el-submenu__title {
    background-color: #F0F9FF;
  }
  .el-menu-item, .el-submenu__title {
      height: 43 * @px;
      line-height: 43 * @px;
  }
}
</style>
