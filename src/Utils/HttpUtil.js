import axios from 'axios'
// import { getCacheItem } from './Tools'
import { message } from 'antd'

const config = {
  // baseURL: '/',
  timeout: 30000,
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml,application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }
}
const $http = axios.create(config)

const $httpUpload = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

/**
 * 请求之前拦截动作
 */
$http.interceptors.request.use(
  response => {
    return response
  },
  error => {
    console.log(error)
  }
)

/**
 * 请求之后拦截动作
 */
$http.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.data.code === 200) {
      return response.data
    } else {
      message.error(response.data.message)
      return Promise.reject(response.data)
    }
  },
  function(error) {
    // 对响应错误做点什么
    message.error('系统异常')
    return Promise.reject(error)
  }
)

const $httpRequest = function({ url, type, data, method }) {
  let options = {}
  options.url = url
  options.method = method || 'get'
  options.headers = {
    // Authorization: getCacheItem('token', 'cookie')
  }
  if (type === 'query') {
    options.params = data || {}
  } else {
    options.data = data || {}
  }
  return $http(options)
}

export function httpRequest(component) {
  component.prototype.$http = $http
  component.prototype.$httpRequest = $httpRequest
  component.prototype.$httpUpload = $httpUpload
  return component
}
