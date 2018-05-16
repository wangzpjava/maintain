import * as currentApi from '../api/instrumentApi'
import * as http from '../axiosConfig'
import Cookies from 'js-cookie'

const state = {
  currentUser: undefined,
  isLogin: false,
  routerName: undefined
}

const getters = {
  currentUserGetter: state => state.currentUser,
  isLoginGetter: state => state.isLogin,
}

// mutations
const mutations = {
  queryCurrentInfo (state, param) {
    if (!Cookies.get('auth-token')) {
      return
    }
    http.get(currentApi.LOGIN_USER_INFO_REST).then(response => {
      if (!response) {
        console.log('you have not login!!!')
      }
      state.currentUser = response
      state.isLogin = true
    })
  },
  logout (state, param) {
    state.currentUser = undefined
    state.isLogin = false
  }
}

const actions = {
  logout ({commit}, param) {
    http.get(currentApi.LOGOUT_REST).then(response => {
      if (response) {
        commit('logout', param)
      }
    })
  },
}
export default {
  state,
  getters,
  mutations,
  actions
}
