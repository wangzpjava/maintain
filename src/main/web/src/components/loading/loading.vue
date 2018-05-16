<template>
  <div class="ins-loading-wrapper">
    <Spin fix v-if="loading">
      <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['loading'],
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
