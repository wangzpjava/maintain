<template>
  <div id="main" class="app-main">
    <BackTop :height="100" :bottom="20" style="z-index: 1000;">
      <div class="top">返回顶端</div>
    </BackTop>
    <router-view></router-view>
    <footer class="footer">
      Copyright ©2017 All Rights Reserved.
      <a href="http://www.miitbeian.gov.cn" target="_blank">备案号</a>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted () {
      this.$store.commit('queryCurrentInfo')
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .app-main {
    width: 100%;
    height: 100%;
  }

  .top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }

  footer {
    color: rgb(153, 153, 153);
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    padding: 8px 0px 10px 0px;
    border-top: 1px solid rgb(217, 217, 217);
    overflow: hidden;
    text-align: center;
    width: 100%;
  }
</style>
