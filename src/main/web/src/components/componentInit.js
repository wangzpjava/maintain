import homeMenu from './home-menu/home-menu.vue'
import homeFooter from './footer/footer.vue'

export const init = {
  install (Vue) {
    Vue.component('main-home-menu', homeMenu)
    Vue.component('main-home-footer', homeFooter)
  }
}

export const componentInit = function (vue) {
  vue.use(init)
}
