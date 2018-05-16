//引入axios
import axios from 'axios'
import env from '../build/env'

axios.defaults.withCredentials = true

/**
 * @description  两种方案做登陆拦截
 * 1.这里直接url访问之前拦截（不推荐）
 * 2。后台security返回403。直接response拦截
 */
axios.interceptors.request.use(request => {
  // before
  if (env === 'development') {
    request.headers.env = env
  }
  return request;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  //after
  return response;
}, error => {

});

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export const get = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export const del = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const post = function (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data);
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const put = function (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response.data);
    }, err => {
      reject(err)
    })
  })
}

export const message = function (code) {
  switch (code) {
    case 400:
      this.$Message.success('错误请求!')
      break;
    case 401:
      this.$Message.success('登录信息错误!')
      break;
    case 403:
      this.$Message.success('没有权限,拒绝访问!')
      break;
    case 404:
      this.$Message.success('请求错误,未找到该资源!')
      break;
    case 405:
      this.$Message.success('请求方法未允许!')
      break;
    case 408:
      this.$Message.success('请求超时!')
      break;
    case 500:
      this.$Message.success('服务器端发生异常!')
      break;
    case 501:
      this.$Message.success('网络未实现!')
      break;
    case 502:
      this.$Message.success('网络错误!')
      break;
    case 503:
      this.$Message.success('服务不可用!')
      break;
    case 504:
      this.$Message.success('网络超时!')
      break;
    case 505:
      this.$Message.success('http版本不支持该请求!')
      break;
    default:
      this.$Message.success('连接错误! ' + code)
  }
}

/***********上面是初始化，直接导入使用，下面是引入vue内存中使用。************/
const httpGet = function (url, params) {
  return axios.get(url, {params: params})
}
const httpDel = function (url, params) {
  return axios.delete(url, {params: params})
}
const httpPost = function (url, params) {
  return axios.post(url, params)
}
const httpPut = function (url, params) {
  return axios.put(url, params)
}

export const axiosUse = function (vue) {
  vue.prototype.$http = axios
  vue.prototype.$get = httpGet
  vue.prototype.$del = httpDel
  vue.prototype.$post = httpPost
  vue.prototype.$put = httpPut
}
