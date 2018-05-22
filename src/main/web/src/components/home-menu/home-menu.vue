<template>
  <div class="home-menu-wrapper">
    <div class="menu-content">
      <div class="ins-logo">
        <img src="../../img/logo.png" class="img">
      </div>
      <div class="menu-tab" @click="changeMenu(index)" :class="{'chose':menuType === index}" v-for="(m,index) in menu">
        <span>{{m}}</span>
      </div>
      <div class="ins-personal">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'home-menu',
    data () {
      return {
        menu: ['网站首页', '关于我们', '维修常识', '服务中心', '案例展示', '联系我们'],
        menuType: 0,
        menuRouterName: ['home-page', 'about-us', 'maintenance-knowledge', 'service-center', 'case-presentation', 'contact-us']
      }
    },
    computed: mapGetters({
      currentUser: 'currentUserGetter'
    }),
    mounted: function () {
      console.log()
      this.changeMenu()
    },
    methods: {
      ...mapActions(['logout']),
      changeMenu (type) {
        if (type === undefined) {
          this.menuType = this.menuRouterName.indexOf(this.$route.name)
        } else {
          this.menuType = type
        }
        this.go(this.menuRouterName[type])
      },
      go (routerName) {
        this.$router.push({
          name: routerName
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "home-menu.styl";
</style>
