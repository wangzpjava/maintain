import env from './env.js'

export const getApiRoot = function (urlRoot) {
  let apiRoot = 'http://localhost:8888/frontend-app';
  if (urlRoot) {
    apiRoot = apiRoot + urlRoot
  }
  return apiRoot
}
