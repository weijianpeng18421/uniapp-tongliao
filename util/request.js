import Request from 'luch-request' // 下载的插件
import devConfig from '../api/config.js'
import {setToken, getToken, getByKey} from '../util/auth.js'
import TOKEN_MESSAGE_CONTANTS from '../constant/commonConstant.js'

const apiBaseUrl = getByKey('LOGINHOST') === '' ? devConfig.BASE_API : getByKey('LOGINHOST')
const http = new Request();

var config = {
	baseURL: apiBaseUrl
}
http.setConfig((config)=>{
	config.baseURL = apiBaseUrl
	return config
})

/**
 * @param { Function} cancel - 取消请求,调用cancel 会取消本次请求，但是该函数的catch() 仍会执行; 不会进入响应拦截器
 *
 * @param {String} text ['handle cancel'| any] - catch((err) => {}) err.errMsg === 'handle cancel'。非必传，默认'handle cancel'
 * @cancel {Object} config - catch((err) => {}) err.config === config; 非必传，默认为request拦截器修改之前的config
 * function cancel(text, config) {}
 */
 http.interceptors.request.use((config) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
    config.header = {
      ...config.header,
      userId: getToken(TOKEN_MESSAGE_CONTANTS.ACCESS_TOKEN_NAME) // 演示拦截器header加参
    }
    return config
  })
  http.interceptors.response.use((response) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
    return response.data
  }, (error) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
		console.log(JSON.stringify(http.config))
      uni.showToast({
          title:"无法连接服务器",
          position: 'bottom',
          icon: 'none',
          duration:1000
      })
    return error.data
  })
  export default http