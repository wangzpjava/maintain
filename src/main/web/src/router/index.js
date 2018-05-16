import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {home_router} from './homeRouter.js'
Vue.use(Router)

const routers = [
  ...home_router
]

export const router = new Router({
  routes: routers
})

/***************路由处理******************/
// router.beforeEach((to, from, next) => {
//
// })

// router.afterEach((to, from, next) => {
//
// });
