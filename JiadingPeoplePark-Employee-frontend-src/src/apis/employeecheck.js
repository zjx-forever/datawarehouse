import request from '@/utils/request'

export function getInformation(params) {
    return request({
        url: '/api/employeeCheck/getEmployeeCheckByPage',
        method: 'post',
        params
    })
}

export function createInformation(params) {
    return request({
      url: '/api/employeeCheck/createEmployeeCheck',
      method: 'post',
      params
    })
  }


export function updateInformation(params) {
    return request({
        url: '/api/employeeCheck/updateEmployeeCheck',
        method: 'post',
        params
    })
}

export function deleteInformation(params) {
    return request({
        url: '/api/employeeCheck/deleteEmployeeCheck',
        method: 'post',
        params
    })
}

