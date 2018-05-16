# ln-instrument开发手册
技术栈使用的是:springboot+mybatis,vue+webpack+stylus,前端ui框架使用[iview](https://www.iviewui.com/components/grid)
## 目录
* [开发环境](#开发环境)
* [开发注意事项](#开发注意事项)
* [vue开发规范](#vue开发规范)
* [vue 开篇](#vue-开篇)
* [vue 基础设施](#vue-基础设施)
* [vue 组件命名](#vue-组件命名)
* [vue 组件结构化](#vue-组件结构化)
* [api封装](#api封装)
* [css规范](#css规范)
* [基于模块开发](#基于模块开发,容器化以及组件化)
* [组件耦合以及通信](#组件耦合以及通信)
* [项目结构](#项目分包)

## 开发环境
后端:
* **springboot**: 2.0.1
* **jdk**: 1.8以上

前端:
* **node**: 7.8.0以上
* **npm**: 4.2.0以上
* **vue全家桶**: 2.5.16
* **stylus**: 0.54.5

注意:开发时候前后端完全分离,使用双服务进行开发整个项目
* **前端开发**:在项目src/main/web下面npm run dev，启动前端即可，打包执行npm run build
* **后端开发**:在根目录执行mvn spring-boot:run启动后台服务即可.
* **打包发布**:在项目src/main/web下面npm run build。打包后的静态文件会存放在src/main/resource/static目录下
[↑ 回到目录](#目录)

## 开发注意事项
注意一下前端:
* 在src/main/web下面执行npm run dev启动前端，样式和代码随时热刷新，不需要刷新页面
* 在src/main/web下面执行npm run build是打包前端项目成一个html和一些静态资源，打包在src/main/resources/static下面
* 无论dev还是build都会改变web/build/env.js，如果项目启动的时候会预读取这个文件内容，所以大家提交代码的时候，尽可能不要提交这个文件
  如果别人在启动项目，这个文件有不同会被pull下来，会导致代码冲突。当然，一般情况下build完没问题之后，还会执行npm run dev, 所以尽可能保持这个文件内部值为dev即可
* 如果引外部js资源。直接在  npm install xxx --save即可，具体引入可自行百度，非常方便
* 目前我没有加入全局资源引入，所以公共样式使用需要大家自行@import styl文件即可
* 如果要做全局注册的自定义组件，放在web/components下面，所有自定义组件均以ins-开头
* 所有自定义指令都在web/src/directives下面
[↑ 回到目录](#目录)

## vue开发规范
* 其它开发者或是团队成员更容易阅读和理解。
* IDEs 更容易理解代码，从而提供高亮、格式化等辅助功能
* 更容易使用现有的工具
* 更容易实现缓存以及代码包的分拆

本文编写参考[这篇vue规范的readMe](https://github.com/pablohpsilva/vuejs-component-style-guide/blob/master/README-CN.md)
[↑ 回到目录](#目录)

## vue-开篇
vue是一个mvvm并且基于组件化的前端架构，所以请丢弃传统模块耦合、组件耦合的思想来进行开发，否则后面会越走越累。针对于vue来说，越轻量级越好.
Vue.js 的设计初衷是为了帮助更好的实现界面交互和体验，更专注于前端组件开发，而不是用于实现大量业务。
[↑ 回到目录](#目录)

## vue-基础设施
切入主题，我们需要vue+axios+vuex+vue-router这样的全家桶技术栈来实现我们的开发，至于第三方的库，根据需求引入。这里不对全家桶做过多介绍，
不明白的小伙伴自行[官网](https://cn.vuejs.org/v2/guide/)，或者在项目中获取极致体验。

[↑ 回到目录](#目录)

## vue-组件命名
组件的命名需遵从以下原则：
* **有意义的**: 不过于具体，也不过于抽象
* **简短描述性**: 用更少的单词描述这个组件
* **具有可读性**: 以便于沟通交流
* 使用连字符分隔单词，而非驼峰,切勿使用保留字。
* 可以使用通用前缀做命名空间,如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。比如<app-header></app-header>,<app-footer></app-footer>
* vue是基于组件化编程，所以一切都以组件为主。好的命名规范能就如同restAPI一样，让人极致享受。所以绝对避免如<test></test>、<fuck></fuck>这样的单词拼接

[↑ 回到目录](#目录)

## vue-组件结构化
* 将vue内部结构按照固定顺序排列，以方便可读性（下面贴出）(特此声明，本条不做强制要求),如果使用idea开发，可以直接定义vue模板创建
* **必须具有name属性**: name属性代表了这个组件，无论在路由还是使用其他组件，都可以用name来代替整个vue文件
* 直接导入css样式，让组件和你的style直接耦合，当然，公用提出。以组件名称为容器命名你的style,将任何一个vue都做成一个独立组件
* 任何情况下都使用.vue作为编程文件
```html
<template lang="html">
  <div class="RangeSlider-Wrapper">
    <!-- ... -->
  </div>
</template>

<script type="text/javascript">
  export default {
    // 不要忘记了 name 属性
    name: 'RangeSlider',
    // 使用组件 mixins 共享通用功能
    mixins: [],
    // 组成新的组件
    extends: {},
    // 组件属性、变量
    props: {
      bar: {}, // 按字母顺序
      foo: {},
      fooBar: {},
    },
    // 变量
    data() {},
    computed: {},
    // 使用其它组件
    components: {},
    // 方法
    watch: {},
    methods: {},
    // 生命周期函数
    beforeCreate() {},
    mounted() {},
  };
</script>

<style scoped>
  .Ranger-Wrapper { /* ... */ }
</style>
```

[↑ 回到目录](#目录)

## api封装
为了让vue更好的服务于view模型层，我们需要对api进行封装和抽离，无论是restAPI还是vuex的事件API，目的是为了抽离后台访问层和数据共享层。
* restAPI统一用大写下划线并且带上_API后缀来封装，如： HELLO_DEMO_API='/a/b/c'
* vuex的数据和事件封装统一用驼峰，如： getQuoteList='getQuoteList',这样会让代码变得非常简单
* api的封装按照模块划分即可,所以一开始要确定展示模块和业务模块
* vuex也按照模块进行设置
```
如vuex的封装：
methods: {
  ...mapActions([personalApi.personalDynamicList])
}
那么在html中只需要调用personalDynamicList()就能执行方法，简直方便
```
下面是api的例子
```

import {getApiRoot} from '../../../build/apiConfig.js'

const rootApi = getApiRoot('/personal')

export const PERSONAL_ALL_GETTER = 'personal_all_getter'//this KV has been used by test only

/******************************************************
 * dynamic module
 ******************************************************/
export const PERSONAL_DYNAMIC_API = rootApi + '/dynamic'
export const personalDynamicList = 'personalDynamicList'
export const personalDynamicListGetter = 'personalDynamicListGetter'
```

[↑ 回到目录](#目录)

## css规范
* 与vue比较搭配的是stylus、sass等。我们需要将写好的css直接进行导入，style容器以组件进行命名，公用方法提出去，当任何地方使用，直接导入使用即可
如:
```
<style lang="stylus" rel="stylesheet/stylus">
  @import "home.styl";
</style>

@import "../../commons/style/common.styl"
.personal-blog-home-wrapper
  background-color #fff
  margin 15px auto
  .personal-info-wrapper
    margin-bottom 20px
    .head-a
      float left
      width 80px
      height 80px
      margin-left -2px
      display block
      cursor pointer
      margin-top: 5px;
```
* 需要注意的是，对于布局以及响应式代码，必须提出作为公用代码，推荐编写自定义组件，而非@media来直接进行编写。
当然，自定义组件无法适用，则需要在style里面写@media,但是必须提出作为公用样式存在,如:
```
.home-wrapper-common
  @media screen and (min-width 1200px)
    width 1200px
    margin 15px auto
  .home-common-module
    margin-bottom 20px
    .ivu-card-bordered
      border-top-left-radius 25px
      border-top-right-radius 25px
      
上面是style，下面是自定义组件:
export const phoneAdaptWrapper = function (vue) {
  vue.directive('phone-adapt-wrapper', function (el) {
    if (document.body.offsetWidth < 765) {
      el.style.display = 'none'
    }
  })
}

```

[↑ 回到目录](#目录)

## 基于模块开发,容器化以及组件化
始终基于模块开发，这里的模块并不是你的业务模块和展示模块，而是最小单位的组件，只做一件事情，并且尽可能的可以独立存在，如果需要数据共享，则可以使用vuex
而我们真正的展示界面则是拼装这些独立的模块和组件，做容器化。使得我们所有的模块和组件解耦,比如我要展示一个list列表，但是这个界面还会有
评论、热门博客等等，如何进行编写，切忌不要把所有东西直接写进一个文件,而是用一个容器进行对模块的耦合和布局展示：(当然，纯粹的后台管理界面可以忽略这点)
```
<template>
  <div>
    <Row>
      <Col :lg="18" style="padding: 25px 30px 36px;background-color: white;">
      <carousel-head></carousel-head>
      <home-menu></home-menu>
      <div style="margin-top: 20px">
        <blog-list-wrapper></blog-list-wrapper>
      </div>
      </Col>
      <Col :lg="6" style="padding: 10px" v-phone-adapt-wrapper>
      <div class="home-common-module">
        <announcement></announcement>
      </div>
      <div class="home-common-module">
        <thumbs-up></thumbs-up>
      </div>
      <div class="home-common-module">
        <hot-blog></hot-blog>
      </div>
      </Col>
    </Row>
  </div>
</template>
```
我们的展示层不生产代码，只是模块和组件的搬运工 QAQ~

[↑ 回到目录](#目录)

## 组件耦合以及通信
组件直接通信可以使用很多种方式:
* 直接传递数据和方法(@callback="callBack")，利用props,如:
````
props: ['nickname', 'orderColumn', 'orderType'],
    data () {
      return {
        blogList: [],
        blogTotal: 1,
        params: {
          nickname: this.nickname,
          orderColumn: this.orderColumn,
          orderType: this.orderType,
          page: 1,
          rows: 20,
        },
        tagsContentShow: false
      }
    },
上面这个组件接受了nickname等三个属性，下面是调用
<blog-list v-bind="personalBlog"></blog-list>
注释：personalBlog={nickname:1,orderColumn:2,orderType:3}
也可以:
<blog-list :nickname="1" :orderColumn="'hello'"></blog-list>
当然也可以直接传递一个对象:
<blog-list :demo=demo></blog-list>
这个和第一个非常类似，不同点在于v-bind并不是传递对象，而是传递了三个参数，而:demo=demo 传递了demo这个对象，所以
在组件接受的时候，第一个接受三个参数，而最后这一个接收的是一个demo对象,并不推荐这种使用，会让组件的交互变得不透明
````
* 通过this.$refs,这种方法是真的走投无路，并且是父子组件的情况下，想轻量级的调用一下子组件内部方法，而不想通过回调这种增加复杂度的方式，如：
````
<demo-add-or-update ref="demoAddOrUpdateComponent"></demo-add-or-update>
````
当demoAddOrUpdate组件里面有一个test()方法的时候，调用如下:
````
this.$refs['demoAddOrUpdateComponent'].test()
或者
this.$refs.demoAddOrUpdateComponent.test()
````
* 当遇到平行组件通信的时候，显然上面都不行，这个时候需要用到vuex，简单来说，A组件有个数据，到B组件的时候，需要A的数据，那么这样:
````
A组件开始查询数据，利用vuex，吧数据放入共享区
mounted () {
  this.$store.dispatch(personalApi.personalInfo, this.params)
},
现在到了B组件，需要上面的数据，那么这样就能获取：
computed: mapGetters({
  titleTotalInfo: personalApi.personalInfoGetter
}),
````
* 当然以上组件都需要import或者设定为vue全局组件,参考[vue自定义指令和组件]

[↑ 回到目录](#目录)

## 项目结构
项目内部结构应为：
commons、components、directives、router、store、views（可自行扩充）
* commons放入所有公用的小工具以及样式等
* components放入所有自定义全局组件，如下:
````
import clickList from './click-list/click-list.vue'
import dynamic from '../views/personal/dynamic/dynamic.vue'
import homeHead from './home-head/home-head.vue'
import homeMenu from './home-menu/home-menu.vue'
import homeBlogList from './home-blog-list/home-blog-list.vue'
import announcement from './announcement/announcement.vue'

export const init = {
  install (Vue) {
    Vue.component('click-list', clickList)
    Vue.component('dynamic', dynamic)
    Vue.component('home-head', homeHead)
    Vue.component('home-menu', homeMenu)
    Vue.component('home-blog-list', homeBlogList)
    Vue.component('announcement', announcement)
  }
}

export const componentInit = function (vue) {
  vue.use(init)
}

````
* directives放入所有全局自定义指令，如下:
````
import {highlightInit} from './highlight/high-light'
import {dateFilter} from './date/date-fliter.js'
import {phoneAdaptWrapper} from './phone-adapt/phone-adapt.js'
import {iconHover} from './icon-hover/icon-hover.js'

export const directivesInit = function (vue) {
  highlightInit(vue)
  dateFilter(vue)
  phoneAdaptWrapper(vue)
  iconHover(vue)
}
````
* router编写所有前端相关路由，将来方便统一管理，或者做成数据库可配置,如下:
````
import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import * as adminApi from '../store/admin/adminApi'
import {blog_router} from './blogRouter.js'
Vue.use(Router)

const routers = [
  ...blog_router,
  ...demo_router,
  ...login_router,
]

export const router = new Router({
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {}
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }
})

router.afterEach((to, from, next) => {
  if (!Cookies.get(tokenName)) { //如果没有cookie，标示非登录，则删除vuex中用户信息
    console.log('you have not login, delete personal info in vuex!!!')
    router.app.$options.store.dispatch(adminApi.adminPersonalInfoClean)
  }
});
````
* store放入所有vuex的组件，如下:
````
import Vue from 'vue'
import Vuex from 'vuex'
import personal from './personal/personal'
import communities from './communities/communities'
import admin from './admin/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    personal,
    communities,
    admin
  }
})
````
* views 放入所有界面容器以及个别特殊组件，进行界面交互

[↑ 回到目录](#目录)
