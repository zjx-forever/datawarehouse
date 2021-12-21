import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  // baseURL: 'http://47.118.78.110:8088/',
  // baseURL:'http://localhost:9010',
  baseURL:'http://101.34.157.75:9020/',
  // withCredentials: true, 
  timeout: 20000 
})

// request interceptor
request.interceptors.request.use(
  config => {
    let lsToken = localStorage.getItem('Token')
    if (lsToken!=''&&lsToken!=null) {
      config.headers['token'] = lsToken
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    console.log ("请求已经响应")
    const res = response.data
    console.log(response.data)
    return res
    
    // if (res.code != 200) {
    //   console.log ("服务端成功响应，但业务逻辑不成功。")
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   console.log("请求正常返回")
    //   console.log(res)
    //   return res
    // }
  },
  error => {
    if(error.response){
      if(error.response.status===401){
        localStorage.setItem('Token','')
        window.location.href='/'
      }
    }
    console.log('错误发生：' + error) // for debug
    return Promise.reject(error)
  }
)

export default request