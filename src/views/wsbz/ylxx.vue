<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:17:59
 -->
<!-- 右侧面板信息 -->
<template>
  <div class="ylxxbox">
    <div class="title2">
      <i></i>
      <span>医疗信息</span>
      <span @click="openYlxx" :class="showYlxx?'active':''"></span>
    </div>
    <div class="theOverview" v-show="showYlxx">
      <div class="hzxx">
        <ul class="ulbox">
          <li>
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
            <input type="text" v-model="name">
          </li>
          <li>
            <span>国&nbsp;&nbsp;&nbsp;&nbsp;籍:</span>
            <input type="text" v-model="nationality">
          </li>
          <li>
            <span>性&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
            <select id="sex" v-model="sexuality">
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </li>
          <li>
            <span>身&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
            <select id="sex" v-model="patienttype">
              <option value="1">内宾</option>
              <option value="2">外宾</option>
              <option value="9">一般</option>
            </select>
          </li>
          <li>
            <span>病&nbsp;&nbsp;&nbsp;&nbsp;情:</span>
            <input type="text" v-model="description">
          </li>
        </ul>
      </div>
      <div class="zyxx">
        <ul class="zyxxbox">
          <li>
            <span>出发场所:&nbsp;&nbsp;&nbsp;</span>
            <input type="text" v-model="complace">
            <!-- <select id="sex" v-model="complace">
              <option value="场馆1">场馆1</option>
              <option value="场馆2">场馆2</option>
            </select> -->
          </li>
          <li>
            <span>定点医院:&nbsp;&nbsp;&nbsp;</span>
            <select id="sex" v-model="tohospital">
              <option :value="h" v-for="(h,ind) in hospitals" :key="ind">{{h}}</option>
              <!-- <option value="医院2">医院2</option> -->
            </select>
          </li>
          <li>
            <span>转运车辆:&nbsp;&nbsp;&nbsp;</span>
            <select id="sex" v-model="carvin">
              <option :value="am" v-for="(am,index) in ambulance" :key="index">{{am}}</option>
              <!-- <option value="车2">车2</option> -->
            </select>
          </li>
          <li class="clzt">
            <span>车辆状态:&nbsp;&nbsp;&nbsp;</span>
            <select id="sex" v-model="vehicleState">
              <option value="1">出勤</option>
              <option value="2">待命</option>
            </select>
          </li>
          <li>
            <span>送达医院:&nbsp;&nbsp;&nbsp;</span>
            <div class="yelss">
              <el-radio v-model="arriveflag" label="1">是</el-radio>
            </div>
            <div class="No">
              <el-radio v-model="arriveflag" label="0">否</el-radio>
            </div>
          </li>
        </ul>
      </div>
      <div class="hzzlzt">
        <ul class="zlztbox">
          <li>
            <span>药&emsp;&emsp;品:</span>
            <textarea name="" id="" cols="34" rows="4" class="inputone" v-model="drugs"></textarea>
          </li>
          <li>
            <span>诊疗项目:</span>
            <textarea name="" id="" cols="34" rows="4" class="inputone" v-model="clinicitems"></textarea>
          </li>
          <li>
            <span>完成治疗:</span>
            <div class="yelss">
              <el-radio v-model="treatmentfinish" label="1">是</el-radio>
            </div>
            <div class="No">
              <el-radio v-model="treatmentfinish" label="0">否</el-radio>
            </div>
          </li>
          <li>
            <span>诊治时间:</span>
            <div class="rl">
              <el-date-picker v-model="treatmenttime" type="date" placeholder="" style='width:100%;height:100%' value-format="yyyy-MM-dd" align="center" prefix-icon='tubiao'>
              </el-date-picker>
              <img src="../../../static/assets/img/wsbz/rili.png" alt="">
            </div>
          </li>
        </ul>
        <div class="tj">
          <span @click="submit">提交</span>
          <span @click="openYlxx">返回</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import formatdate from '@/utils/formatdate.es.js'
export default {
  data () {
    return {
      patienttype: 9,
      vehicleState: 1,
      sexuality: 1,
      name: '',
      arriveflag: '0',
      treatmentfinish: '0',
      complaint: '',
      description: '',
      carvin: '',
      tohospital: '',
      complace: '',
      contacter: '',
      doctor: '',
      age: 0,
      drugs: '',
      clinicitems: '',
      treatmenttime: '',
      treatmentadvice: '',
      nationality: '中国',
      ambulance: [],
      hospitals: [],
      showYlxx: false
    }
  },
  methods: {
    openYlxx () {
      this.showYlxx = !this.showYlxx
      this.$store.commit('setPopxzylxx', this.showYlxx)
      this.$store.commit('setPopylxxlb', false)
    },
    submit () {
      let patientInfo = {
        id: +new Date(),
        name: this.name, // '张三',
        patienttype: this.patienttype, // '9',
        sexuality: this.sexuality, // '1',
        complaint: this.description !== '' ? this.description : '.', // '123456yyhh',
        description: '', // '3eedd',
        arriveflag: this.arriveflag, // '0',
        carvin: this.carvin, // '鄂A 12345',
        tohospital: this.tohospital, // '江南医院',
        complace: this.complace, // '场馆1',
        contacter: this.contacter, // '李四',
        doctor: this.doctor, // '王五',
        age: this.age, // 23,
        vehicleState: this.vehicleState, // '0',
        drugs: this.drugs, // '阿莫西林',
        clinicitems: this.clinicitems, // '不知道',
        treatmentfinish: this.treatmentfinish, // '0',
        treatmenttime: formatdate.toDotNetString(this.treatmenttime === '' ? new Date() : new Date(this.treatmenttime)),
        treatmentadvice: this.treatmentadvice, //  '多喝水',
        nationality: this.nationality // '地球'
      }
      console.log(patientInfo)
      this.$store.dispatch('AddPatientInfo', patientInfo).then(e => {
        console.log('AddPatientInfo: ', e)
        if (e === 1) {
          alert('保存成功')
          this.$emit('SavePatientInfo', true)
        } else {
          alert('保存失败')
        }
      })
      this.openYlxx()
    },
    loadData () {
      this.configLoaded && this.$store.dispatch('getAllAmbulance').then(data => {
        let ambulance = []
        for (var i = 0; i < data.length; i++) {
          ambulance.push(data[i].CARVIN)
        }
        this.ambulance = ambulance
        this.carvin = ambulance[0]
      })
      this.$store.dispatch('getEnsurePlanHospital').then(data => {
        let hospital = []
        for (var i = 0; i < data.length; i++) {
          hospital.push(data[i].NAME)
        }
        this.hospitals = hospital
        this.tohospital = hospital[0]
      })
    }
  },
  computed: {
    ...mapState(['popkey', 'configLoaded', 'mapLoaded'])
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.showYlxx = this.popkey.xzylxx
      },
      immediate: true,
      deep: true
    },
    configLoaded () {
      this.loadData()
    },
    mapLoaded () {
      this.loadData()
    }
  },
  mounted () {
    if (this.mapLoaded) {
      this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>
@px: 30rem/1920;
* {
  margin: 0;
  padding: 0;
}
.ylxxbox {
  width: 414 * @px;
}
.title2 {
  width: 414 * @px;
  display: flex;
  justify-content: row;
  padding-right: 14 * @px;
  height: 48 * @px;
  color: #fff;
  align-items: center;
  background: url("../../../static/assets/img/wsbz/headbg.png") center center
    no-repeat;
  background-size: 100% 100%;
  border-top-left-radius: 5 * @px;
  border-bottom-left-radius: 5 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  i {
    display: inline-block;
    width: 37 * @px;
    height: 37 * @px;
    background: url("../../../static/assets/img/wsbz/bi2.png") no-repeat center
      center;
    background-size: 100% 100%;
    margin-left: 14 * @px;
  }
  span:nth-child(2) {
    font-weight: bold;
    font-size: 18 * @px;
    margin-left: 10 * @px;
    line-height: 48 * @px;
  }
  span:nth-child(3) {
    cursor: pointer;
    display: inline-block;
    width: 14 * @px;
    height: 24 * @px;
    background: url("../../../static/assets/img/wsbz/more.png") no-repeat center
      center;
    background-size: 100% 100%;
    transform: rotate(90deg);
    margin-left: 248 * @px;
  }
  .active {
    cursor: pointer;
    display: inline-block;
    width: 14 * @px;
    height: 24 * @px;
    background: url("../../../static/assets/img/wsbz/more.png") no-repeat center
      center;
    background-size: 100% 100%;
    transform: rotate(360deg) !important;
    margin-left: 210 * @px;
  }
}
.theOverview {
  margin-top: 8 * @px;
  background: #fff;
  border-radius: 5 * @px;
  .hzxx {
    padding-top: 16 * @px;
    padding-bottom: 14 * @px;
    .ulbox {
      margin-left: 14 * @px;
      width: 386 * @px;
      background: #fff;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8 * @px;
        &:nth-child(2n) {
          margin-left: 20 * @px;
        }
        &:nth-child(1),
        &:nth-child(2) {
          span {
            display: inline-block;
            width: 64 * @px;
            line-height: 40 * @px;
            text-align: justify;
            font-size: 16 * @px;
          }
          input {
            height: 40 * @px;
            display: inline-block;
            width: 106 * @px;
            line-height: 36 * @px;
            font-size: 16 * @px;
            border: 1px solid #ededed;
            border-radius: 3 * @px;
            background-color: #fcfdfe;
            margin-left: 12 * @px;
          }
        }
        &:nth-child(3),
        &:nth-child(4) {
          span {
            display: inline-block;
            width: 64 * @px;
            line-height: 40 * @px;
            text-align: justify;
            font-size: 16 * @px;
          }
          position: relative;
          #sex {
            height: 40 * @px;
            display: inline-block;
            width: 106 * @px;
            line-height: 36 * @px;
            margin-left: 12 * @px;
            font-size: 16 * @px;
            border: 1px solid #ededed;
            border-radius: 3 * @px;
            background-color: #fcfdfe;
            position: relative;
            appearance: none;
          }
          &:nth-child(3)::after,
          &:nth-child(4)::after {
            width: 36 * @px;
            height: 40 * @px;
            background: #d8dde3 url("../../../static/assets/img/wsbz/sj.png")
              center center no-repeat;
            position: absolute;
            border-bottom-right-radius: 3 * @px;
            border-top-right-radius: 3 * @px;
            right: 0;
            top: 0;
            pointer-events: none;
            content: "";
          }
        }
        &:nth-child(5) {
          span {
            display: inline-block;
            width: 64 * @px;
            line-height: 40 * @px;
            text-align: justify;
            font-size: 16 * @px;
          }
          input {
            height: 40 * @px;
            display: inline-block;
            width: 308 * @px;
            line-height: 36 * @px;
            font-size: 16 * @px;
            border: 1px solid #ededed;
            border-radius: 3 * @px;
            background-color: #fcfdfe;
            margin-left: 12 * @px;
          }
        }
      }
    }
  }
  .zyxx {
    border-top: 2 * @px solid #1e9edd;
    padding-bottom: 14 * @px;
    .zyxxbox {
      margin-top: 10 * @px;
      margin-left: 14 * @px;
      width: 386 * @px;
      overflow: hidden;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8 * @px;
        position: relative;
        #sex,
        input {
          height: 40 * @px;
          display: inline-block;
          width: 300 * @px;
          line-height: 36 * @px;
          padding-left: 10 * @px;
          font-size: 16 * @px;
          border: 1px solid #ededed;
          border-radius: 3 * @px;
          background-color: #fcfdfe;
          position: relative;
          appearance: none;
        }
        &:nth-child(2)::after,
        &:nth-child(3):after,
        &:nth-child(4):after {
          width: 36 * @px;
          height: 40 * @px;
          background: #d8dde3 url("../../../static/assets/img/wsbz/sj.png")
            center center no-repeat;
          position: absolute;
          border-bottom-right-radius: 3 * @px;
          border-top-right-radius: 3 * @px;
          right: 0;
          top: 0;
          pointer-events: none;
          content: "";
        }
        &:nth-child(5) {
          width: 180 * @px;
          float: left;
          margin-left: 16 * @px;
          .No {
            margin-left: 10 * @px;
          }
        }
        &:nth-child(5)::after {
          display: none;
        }
        span {
          display: inline-block;
          width: 86 * @px;
          line-height: 40 * @px;
          text-align: justify;
          font-size: 16 * @px;
        }
      }
      .clzt {
        width: 190 * @px;
        float: left;
        span {
          display: inline-block;
          width: 86 * @px;
          line-height: 40 * @px;
          text-align: justify;
          font-size: 16 * @px;
        }
        #sex {
          height: 40 * @px;
          display: inline-block;
          width: 106 * @px;
          line-height: 36 * @px;
          padding-left: 10 * @px;
          font-size: 16 * @px;
          border: 1px solid #ededed;
          border-radius: 3 * @px;
          background-color: #fcfdfe;
          position: relative;
          appearance: none;
          .clzt::after {
            width: 36 * @px;
            height: 40 * @px;
            background: #d8dde3 url("../../../static/assets/img/wsbz/sj.png")
              center center no-repeat;
            position: absolute;
            border-bottom-right-radius: 3 * @px;
            border-top-right-radius: 3 * @px;
            right: 0;
            top: 0;
            pointer-events: none;
            content: "";
          }
        }
      }
    }
  }
  .hzzlzt {
    border-top: 2 * @px solid #1e9edd;
    .zlztbox {
      margin-top: 16 * @px;
      margin-left: 14 * @px;
      width: 386 * @px;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-top: 14 * @px;
        span {
          font-size: 16px;
          width: 73 * @px;
          display: inline-block;
          overflow: hidden;
          line-height: 40 * @px;
          height: 62 * @px;
        }
        .inputone {
          outline: none;
          height: 62 * @px;
          display: inline-block;
          width: 298 * @px;
          font-size: 16 * @px;
          border: 1px solid #ededed;
          border-radius: 3 * @px;
          background-color: #fcfdfe;
          margin-left: 30 * @px;
        }
        &:nth-child(3) {
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            font-size: 16px;
            width: 73 * @px;
            display: inline-block;
            overflow: hidden;
            line-height: 40 * @px;
            height: 40 * @px;
          }
          .yelss {
            margin-left: 60 * @px;
          }
          .No {
            margin-left: 60 * @px;
          }
        }
        &:nth-child(4) {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 40 * @px;
          span {
            font-size: 16px;
            width: 73 * @px;
            display: inline-block;
            overflow: hidden;
            line-height: 40 * @px;
            height: 40 * @px;
          }
          .rl {
            display: inline-block;
            width: 286 * @px;
            line-height: 40 * @px;
            font-size: 16 * @px;
            background-color: #fcfdfe;
            margin-left: 30 * @px;
            position: relative;
            img {
              width: 24 * @px;
              height: 23 * @px;
              position: absolute;
              right: 4 * @px;
              top: calc((100%-23 * @px) / 4);
              pointer-events: none;
              cursor: pointer;
            }
          }
        }
        &:nth-child(5) {
          display: flex;
          flex-direction: row;
          .inputone {
            height: 86 * @px;
            display: inline-block;
            width: 298 * @px;
            font-size: 16 * @px;
            border: 1px solid #ededed;
            border-radius: 3 * @px;
            background-color: #fcfdfe;
            margin-left: 30 * @px;
          }
        }
      }
    }
  }

  .tj {
    margin-top: 40 * @px;
    margin-left: 14 * @px;
    padding-bottom: 46 * @px;
    width: 386 * @px;
    span {
      display: inline-block;
      width: 90 * @px;
      height: 90 * @px;
      height: 38 * @px;
      text-align: center;
      font-size: 16 * @px;
      border-radius: 4 * @px;
      color: white;
      line-height: 38 * @px;
      &:nth-child(1) {
        background: #01bbf4;
        margin-left: 130 * @px;
      }
      &:nth-child(2) {
        background: #f7b137;
        margin-left: 20 * @px;
      }
    }
  }
}
</style>
