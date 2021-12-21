import request from '@/utils/request'

export function userAuth(params) {
    return request({
      //url: '/user/authenticate',
      url:'/api/jwtUser/login',
      method: 'post',
      params
    })
  }

  export function userAuthTest(params) {
    return request({
      url: '/api/jwtUser/test',
      method: 'post',
      params
    })
}

export function getEmployeeInfo(params) {
  return request({
    url: '/api/employee/getEmployeeById',
    method: 'post',
    params
  })
}