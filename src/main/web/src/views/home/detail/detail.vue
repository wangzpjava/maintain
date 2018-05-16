<template>
  <div class="home-topic-detail-wrapper">
    <div class="topic-detail-title">{{detail.title}}</div>
    <div class="topic-detail-user-wrapper">
      <img :src="detail.userHeadImg" class="head-img" v-if="detail.userHeadImg">
      <img :src="headImg" class="head-img" v-if="!detail.userHeadImg">
      <div>
        <span class="author">{{detail.userName}}</span>
        <span class="publish-time">发布于 {{detail.updatedAt | timestamp('YYYY-MM-DD HH:mm:ss')}}</span>
      </div>
      <div class="detail-favorite">
        <ins-favorite :favoriteStatus="detail.favoriteStatus" :entityId="detail.id" :domainType="'TOPIC'" @call-back="getTopicDetail()"></ins-favorite>
      </div>
    </div>
    <div class="topic-detail-content" v-html="detail.content"></div>

    <div class="topic-comment-wrapper">
      <comment :domainType="'TOPIC'" :entityId="detail.id" :userId="detail.userId" v-if="detail.id"></comment>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import comment from '../components/comment/comment.vue'
  import {personalClickImgList} from '../../../commons/js/static'
  import {defualt} from '../../../commons/js/default'
  import * as topicRest from '../../../api/instrumentApi'
  export default{
    name: 'home-topic-detail',
    components: {
      comment
    },
    data () {
      return {
        headImg: personalClickImgList[0],
        publishTime: new Date(),
        detail: {},
        params: {
          id: this.$route.params.id
        }
      }
    },
    mounted () {
      this.getTopicDetail()
    },
    methods: {
      getTopicDetail () {
        this.$get(topicRest.TOPIC_DETAIL_REST, this.params).then(res => {
          this.detail = res.data
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "detail.styl";
</style>
