<template>
  <Row class="guide-wrapper">

    <home-title :categoryCascaderShow="true" :title="'仪器指南'"
                @on-change="cascaderChange" @search="init"></home-title>

    <div class="guide-list-wrapper" v-for="(ins,index) in instrumentList">
      <div class="data-wrapper">
        <div class="left-wrapper">
          <guide-card :guide="ins.left" v-if="ins && ins.left"></guide-card>
        </div>
        <div class="right-wrapper">
          <guide-card :guide="ins.right" v-if="ins && ins.right"></guide-card>
        </div>
      </div>
    </div>

    <ins-page :current="params.page" :total="total" :page-size="params.rows" :location="'right'"
              :show-elevator="true" :show-sizer="true" :show-total="true"
              @on-change="pageChange" @on-page-size-change="onPageSizeChange"></ins-page>
  </Row>
</template>

<script type="text/ecmascript-6">
  import * as instrumentApi from '../../../api/instrumentApi'
  import homeTitle from '../components/home-title/home-title.vue'
  import guideCard from '../components/guide/guide-card.vue'
  export default {
    name: 'guide-list',
    data () {
      return {
        loading: true,
        params: {
          firstCategoryId: '',
          secondCategoryId: '',
          queryKey: '',
          page: 1,
          rows: 10,
        },
        instrumentList: [],
        total: 0
      }
    },
    components: {
      homeTitle,
      guideCard
    },
    created () {
      this.init()
    },
    methods: {
      init (keywords) {
        this.params.queryKey = keywords
        this.params.page = 1
        this.queryInstruments()
        this.countInstruments()
      },
      queryInstruments () {

      },
      countInstruments () {

      },
      pageChange (page) {
        this.params.page = page
        this.queryInstruments()
      },
      onPageSizeChange (rows) {
        this.params.rows = rows
        this.init()
      },
      cascaderChange (value) {
        this.params.firstCategoryId = value[0]
        this.params.secondCategoryId = value[1]
        this.init()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "guide.styl";
</style>
