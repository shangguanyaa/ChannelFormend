<template>
  <div class="big-box">
    <div class="content">
      <div class="top">
        <h1>物流渠道比价系统(定制)</h1>
      </div>
      <div class="select">
        <el-card class="box-card">
          <div class="text item">
            <span>目的地国家: </span>
            <el-select v-model="selectCountry" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-divider direction="vertical"></el-divider>
            <span>物品重量: </span>
            <el-input placeholder="请输入内容" v-model="weight" class="input-with-select">
              <span slot="append" class="append-span" @click="changeUnit">{{ unit }}</span>
            </el-input>
            <el-divider direction="vertical"></el-divider>
            <span>长宽高: </span>
            <el-input class="long-input" v-model="long" placeholder="长"></el-input><el-divider
              direction="vertical"></el-divider>
            <el-input class="long-input" v-model="wide" placeholder="宽"></el-input><el-divider
              direction="vertical"></el-divider>
            <el-input class="long-input" v-model="high" placeholder="高"></el-input>
          </div>
          <div class="search">
            <el-button type="primary" icon="el-icon-search" @click="search" :loading="searchLoading">搜索</el-button>
          </div>
        </el-card>
      </div>
      <div class="list-box">
        <channelList :list="channels" :weight="unit === 'KG' ? (weight * 1000) : weight" />
        <!-- <div class="no-data" v-if="this.channels.length === 0">
          <h2>暂无数据</h2>
        </div>
        <template v-else>
          <div class="item-channel" v-for="(item, i) in channels" :key="item.channelID + i">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="title-left">
                  <span class="channel-icon" :style="{ 'background-color': 'red' }"></span>
                  <span>{{ item.channelName }}</span>
                </div>
                <div class="total-price">￥ {{ item.totalPrice }}</div>
              </div>
              <el-collapse class="item-collapse">
                <el-collapse-item>
                  <template slot="title">打开更多该渠道设置<i class="header-icon el-icon-info"></i>
                  </template>
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </div>
        </template> -->

      </div>
    </div>
  </div>
</template>

<script>

const { country } = require('../utils/country')
import axios from "axios";
import channelList from './channelView'

export default {
  name: 'HomeView',
  components: { channelList },
  data: () => ({
    options: country,
    selectCountry: '',
    weight: 0,
    unit: 'KG',
    searchLoading: false,
    channels: [],
    long: null,
    wide: null,
    high: null,
  }),
  methods: {
    changeUnit() {
      if (this.unit === 'KG') {
        this.weight = this.weight * 1000
        this.unit = "G"
      } else {
        this.weight = this.weight / 1000
        this.unit = "KG"
      }
    },
    search() {
      if (!this.selectCountry) {
        this.$message({
          message: '请先选择目的地国家.',
          type: 'warning'
        })
        return
      }
      if (!this.weight) {
        this.$message({
          message: '物品重量不能为空或0.',
          type: 'warning'
        })
        return
      }
      this.searchLoading = true
      this.channels = []
      this.getList()
    },
    getList() {
      let data = {}
      data.country = this.selectCountry
      data.weight = this.unit === 'KG' ? this.weight * 1000 : this.weight
      axios.post('http://home.olbing.cn/channel/conformList', data).then((res) => {
        console.log(res.data.results);
        this.channels = res.data.results || []
        this.searchLoading = false
      })
    }
  }
}
</script>

<style>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 3px;
}

.input-with-select {
  width: 200px !important;
}

.el-input-group__append,
.el-input-group__prepend {
  padding: 0;
  width: 50px;
  text-align: center;
}

.long-input {
  width: 60px !important;
}

.long-input>>>.el-input__inner {
  border-right: none;
}

.append-span {
  cursor: pointer;
}

.el-card__body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.list-box {
  flex: 1;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  padding: 20px;
}
</style>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
}
</style>
