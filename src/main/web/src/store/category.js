import * as category from '../api/instrumentApi'
import * as http from '../axiosConfig'

// 这个也是可以直接调用的:this.$store.state.category.categoryCascader, category为这个文件在store中注册的缓存的key

const state = {
  categoryCascader: undefined
}

// getters ,直接调用:this.$store.getters['categoryCascaderGetter']
const getters = {
  categoryCascaderGetter: state => state.categoryCascader,
}

// mutations 这个是最终执行，可以当成事务提交，在外部也可以直接调用：this.$store.commit('categoryCascader', params)
const mutations = {
  categoryCascader (state, param) {
    if (state.categoryCascader) {
      return
    }
    http.get(category.CATEGORY_CASCADER_REST).then(response => {
      state.categoryCascader = response
    })
  }
}

// actions 这个是对外接口方法，直接调用:this.$store.dispatch('categoryCascader', params)
const actions = {
  // such as 调用上面mutations中的categoryCascader这个方法
  // categoryCascader ({commit}, param) {
  //   http.get(category.CATEGORY_CASCADER_REST).then(response => {
  //     commit('categoryCascader', response)
  //   })
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
