<template>
  <Row class="ins-comment-wrapper">
    <ins-loading :loading="loading"></ins-loading>
    <div class="comment-header-count">
      <span class="count">{{total}}条评论</span>
    </div>
    <div class="comment-content-wrapper">
      <div class="comment-lv1-wrapper" v-for="comment in lvCommentList">
        <div class="comment-property">
          <img :src="comment.userHeadImg" class="comment-head-img"
               v-if="comment.userHeadImg && comment.userHeadImg.length>0">
          <img :src="headImg" class="comment-head-img" v-else>
          <span class="user-name">{{comment.userName}}</span>
          <span class="comment-publish-time">发布于 {{comment.updatedAt | timestamp('YYYY-MM-DD HH:mm:ss')}}</span>
        </div>
        <div class="comment-content">
          {{comment.content}}
        </div>
        <div class="comment-click-function">
          <div class="comment-thumb">
            <ins-thumb-up :thumbStatus="comment.thumbUpStatus" :entityId="comment.id"
                          :thumbUpCount="comment.thumbUpTotal"
                          :domainType="'COMMENT'" @call-back="queryLv1Comment"></ins-thumb-up>
          </div>
          <div class="comment-click" @click="queryLv2CommentFromLv1Click(comment)">
            <span class="comment-icon-font" :class="{'already-comment':comment.commentStatus==='ACTIVE'}">
              <Icon type="ios-chatbubble"></Icon>
            </span>
            <span class="comment-icon-des">
              共{{comment.commentTotal}}条评论
            </span>
          </div>
        </div>
        <div class="comment-lv2-reply-wrapper" v-if="comment.showLv1Reply">
          <textarea class="lv1-reply-textarea" v-model="comment.replyContent"
                    placeholder="写下你的评论...评论内容不允许超过200字!!"></textarea>
          <div class="lv2-comment">
            <Button type="ghost" @click="comment.replyContent=undefined;comment.showLv1Reply=false">取消</Button>
            <Button type="ghost" @click="addLv2Comment(comment, false)">评论</Button>
          </div>
        </div>
        <div class="comment-lv2-wrapper" v-for="lv2 in comment.lv2List"
             v-if="comment.showLv1Reply && comment.lv2List.length > 0">
          <div class="lv-content-wrapper">
            <span class="user-name">{{lv2.userName}}:&nbsp;</span>
            <span v-if="lv2.mentionUserId" class="mention-user">@{{lv2.mentionUserName}}&nbsp;&nbsp;</span>
            <span class="lv2-content">{{lv2.content}}</span>
          </div>
          <div class="lv2-comment-property">
            <div class="lv2-publish-time-wrapper">
              发布于 {{lv2.updatedAt | timestamp('YYYY-MM-DD HH:mm:ss')}}
            </div>
            <div class="reply-button" @click="lv2.showReplyTextarea=!lv2.showReplyTextarea">
              <span class="comment-icon-font">
                <Icon type="ios-chatbubble"></Icon>
              </span>
              <span class="comment-icon-des">
                回复
              </span>
            </div>
            <div>
              <ins-thumb-up :thumbStatus="lv2.thumbUpStatus" :entityId="lv2.id"
                            :thumbUpCount="lv2.thumbUpTotal"
                            :domainType="'COMMENT'" @call-back="queryLv2Comment(comment, true)"></ins-thumb-up>
            </div>
          </div>
          <div class="reply-wrapper" v-if="lv2.showReplyTextarea">
            <textarea class="lv2-reply-textarea" v-model="lv2.replyContent"
                      placeholder="写下你的评论...评论内容不允许超过200字!!"></textarea>
          </div>
          <div class="lv2-comment" v-if="lv2.showReplyTextarea">
            <Button type="ghost" @click="lv2.replyContent=undefined;lv2.showReplyTextarea=false">取消</Button>
            <Button type="ghost" @click="addLv2Comment(lv2, true, comment.id)">评论</Button>
          </div>
        </div>
        <div style="text-align: center;margin-top: 20px;cursor: pointer;" v-if="comment.showLv1Reply">
          <div v-if="comment.lastReply">暂无更多</div>
          <div v-else @click="queryLv2Comment(comment, false)">点击更多</div>
        </div>
      </div>
    </div>

    <ins-page :current="params.page" :total="total" :location="'right'" :page-size="params.rows"
              :show-elevator="true" :show-sizer="true" :show-total="true"
              @on-change="pageChange" @on-page-size-change="onPageSizeChange"></ins-page>

    <div class="comment-write-wrapper">
      <textarea placeholder="写下你的评论...评论内容不允许超过200字!!" v-model="lv1Content"></textarea>
      <div class="comment-write-button">
        <Button type="ghost" style="min-width: 100px" @click="addLv1Comment()">评论</Button>
      </div>
    </div>
  </Row>
</template>

<script type="text/ecmascript-6">
  import {personalClickImgList} from '../../../../commons/js/static'
  import {DomainTypeEnum} from '../../../../commons/js/common'
  import * as commentRest from '../../../../api/instrumentApi'
  export default {
    props: ['entityId', 'domainType', 'userId'],
    data () {
      return {
        loading: true,
        headImg: personalClickImgList[2],
        params: {
          domainType: this.domainType,
          entityId: this.entityId,
          page: 1,
          rows: 10,
        },
        lvCommentList: [],
        total: 0,
        lv1Content: undefined,
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.params.page = 1
        this.queryLv1Comment()
        this.queryLv1CommentCount()
      },
      queryLv1Comment () {
        this.loading = true
        this.$get(commentRest.COMMENT_LIST_REST, this.params).then(res => {
          this.loading = false
          this.lvCommentList = res.data.map(c => {
            c.showLv1Reply = false
            return c
          })
        })
      },
      queryLv1CommentCount () {

      },
      pageChange (page) {
        this.params.page = page
        this.queryLv1Comment()
      },
      onPageSizeChange (rows) {
        this.params.rows = rows
        this.init()
      },
      queryLv2CommentFromLv1Click (comment) {
        comment.showLv1Reply = !comment.showLv1Reply
        if (!comment.showLv1Reply) {
          return
        }
        comment.lv2List = []
        comment.lv2Page = 0
        comment.lv2Rows = 1
        this.queryLv2Comment(comment)
      },
      queryLv2Comment (comment, refresh) {
        if (!refresh) { //这里判定是事件刷新查询还是点击下一页查询
          comment.lv2Page = comment.lv2Page + 1
        } else {
          comment.lv2List = []
        }
        this.loading = true
        let param = {
          domainType: DomainTypeEnum.comment,
          entityId: comment.id,
          page: comment.lv2Page,
          rows: comment.lv2Rows,
        }
        this.$get(commentRest.COMMENT_LV2_LIST_REST, param).then(res => {
          this.loading = false
          if (res.data) {
            res.data.lv2List.forEach(lv2 => {
              comment.lv2List.push(lv2)
            })
            comment.lastReply = res.data.lastReply
          }
        })
      },
      addLv1Comment () {
        let params = {
          entityId: this.entityId,
          domainType: this.domainType,
          level: 1,
          content: this.lv1Content,
        }
        console.log(params)
        this.addComment(params)
      },
      addLv2Comment (c, isReply, entityId) {
        let params = {
          entityId: entityId ? entityId : c.id,
          domainType: DomainTypeEnum.comment,
          level: 2,
          mentionUserId: isReply ? c.userId : undefined,
          content: c.replyContent,
        }
        this.addComment(params)
      },
      addComment (params) {
        if (!params.content) {
          this.$Message.warning('评论内容不能为空!')
          return
        }
        if (params.content > 200) {
          this.$Message.warning('评论内容不能超过200个字!')
          return
        }
        this.$put(commentRest.COMMENT_ADD_REST, params).then(res => {
          if (res.data) {
            this.$Message.success('评论成功!')
            this.lv1Content = ''
            this.init()
          } else {
            this.$Message.error('评论失败!')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "comment.styl";
</style>
