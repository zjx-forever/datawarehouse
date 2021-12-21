import request from '@/utils/request'


export function getInformation(params) {
  return request({
      url: '/api/employee/queryAll',
      method: 'post',
      params
  })
}

export function createInformation(params) {
    return request({
        url: '/api/employee/createEmployee',
        method: 'post',
        params
    })
}

export function updateInformation(params) {
    return request({
      url: '/api/employee/updateEmployee',
      method: 'post',
      params
    })
  }

export function deleteInformation(params) {
  return request({
    url: '/api/employee/deleteEmployeeByUsername',
    method: 'post',
    params
  })
}

export function getEmployeeCount(params) {
  return request({
    url: '/api/commonModule/getEmployeeCount',
    method: 'post',
    params
  })
}

export function getAdminCount(params) {
  return request({
    url: '/api/commonModule/getAdminCount',
    method: 'post',
    params
  })
}

export function getMaleEmployeeCount(params) {
  return request({
    url: '/api/commonModule/getMaleEmployeeCount',
    method: 'post',
    params
  })
}

export function getFemaleEmployeeCount(params) {
  return request({
    url: '/api/commonModule/getFemaleEmployeeCount',
    method: 'post',
    params
  })
}
