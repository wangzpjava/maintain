import Vue from 'vue'
import iView from 'iview'
import {router} from './router/index.js'
import store from './store/index'
import App from './app.vue'
import {axiosUse} from './axiosConfig.js'
import {directivesInit} from '../src/directives/directives-init'
import {componentInit} from '../src/components/componentInit.js'

axiosUse(Vue)
Vue.use(iView)

directivesInit(Vue) //初始化vue自定义指令(非组件，元素内部指令,例如v-zhanglu)
componentInit(Vue) //初始化所有自定义组件

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
