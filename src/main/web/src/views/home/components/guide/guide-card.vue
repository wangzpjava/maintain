<template>
  <div class="ins-guide-card">
    <div class="line"></div>
    <div class="data-top">
      <div class="content-wrapper">
        <div class="ins-img">
          <img :src="guide.imageLink" class="img-link" v-if="guide.imageLink" :class="{'left-right': isLeftAndRight}">
        </div>
        <div class="property">
          <div class="head-text">
            <span class="name" v-html="guide.chineseName"></span>
            <span class="open">打开 ></span>
          </div>
          <div class="des-text">
            <div class="des">
              <span class="left">分类名称:</span>
              <span class="right">{{guide.secondCategoryName}}</span>
            </div>
            <div class="des">
              <span class="left">型号</span>
              <span class="right">{{guide.type}}</span>
            </div>
            <div class="des">
              <span class="left">供应商</span>
              <span class="right">{{guide.supplierName}}</span>
            </div>

            <div class="data-content" v-if="isLeftAndRight" :class="{'left-right': isLeftAndRight}">
              <span v-if="guide.description" v-html="guide.description"></span>
              <span v-if="!guide.description">暂无描述</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-content" v-if="!isLeftAndRight">
      <span v-if="guide.description" v-html="guide.description"></span>
      <span v-if="!guide.description">暂无描述</span>
    </div>
    <div class="data-footer">
      <Button type="error" icon="android-star" size="small" v-if="guide.favoriteStatus==='ACTIVE'"
              @click="addOrCancelFavorites('INACTIVE')">已收藏
      </Button>
      <Button type="warning" icon="android-star" size="small" v-if="guide.favoriteStatus==='INACTIVE'"
              @click="addOrCancelFavorites('ACTIVE')">收藏
      </Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {StatusEnum, DomainTypeEnum} from '../../../../commons/js/common'
  import {FAVORITES_ADD_OR_CANCEL_REST} from '../../../../api/instrumentApi'
  export default {
    props: ['guide', 'isLeftAndRight'],
    methods: {
      addOrCancelFavorites (status) {
        let params = {
          entityId: this.guide.id,
          domainType: DomainTypeEnum.instrument,
          status: status
        }
        this.$post(FAVORITES_ADD_OR_CANCEL_REST, params).then(res => {
          if (res.data) {
            if (this.guide.favoriteStatus === StatusEnum.active) {
              this.guide.favoriteStatus = StatusEnum.inactive
            } else {
              this.guide.favoriteStatus = StatusEnum.active
            }
            this.$Message.success('操作成功!')
            this.$emit('call-back')
          } else {
            this.$Message.error('操作失败!')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "guide-card.styl";
</style>
