<template>
  <div class="home-title-common-wrapper">
    <div class="title-text">{{title}}</div>
    <div class="search-wrapper">
      <div class="input-div">
        <Cascader :data="categoryCascader" trigger="hover" @on-change="cascaderChange"
                  style="width:400px;" v-if="categoryCascaderShow"></Cascader>
      </div>
      <div class="search-div">
        <input type="text" placeholder="搜索你感兴趣的内容" maxlength="100" v-model="queryKey">
        <a class="search-icon" @click="queryInstruments()">
          <Icon type="android-search"></Icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    props: ['categoryCascaderShow', 'title'],
    computed: mapGetters({
      categoryCascader: 'categoryCascaderGetter'
    }),
    data () {
      return {
        queryKey: ''
      }
    },
    created () {
      this.$store.commit('categoryCascader')//加载下拉框
    },
    methods: {
      queryInstruments () {
        this.$emit('search', this.queryKey)
      },
      cascaderChange (value, selectedData) {
        this.$emit('on-change', value)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "home-title.styl";
</style>
