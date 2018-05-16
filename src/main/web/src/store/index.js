import Vue from 'vue'
import Vuex from 'vuex'
import category from './category'
import current from './current'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    current
  }
})
