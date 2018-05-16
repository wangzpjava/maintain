import homeMenu from './home-menu/home-menu.vue'
import loading from './loading/loading.vue'

export const init = {
  install (Vue) {
    Vue.component('ins-home-menu', homeMenu)
    // Vue.component('ins-loading', loading)
    // Vue.component('ins-post-total-count', postTotal)
    // Vue.component('ins-page', insPage)
    // Vue.component('ins-favorite', favorite)
    // Vue.component('ins-thumb-up', thumbUp)
  }
}

export const componentInit = function (vue) {
  vue.use(init)
}
