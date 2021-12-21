import request from '@/utils/request'

export function getInformation(params) {
  return request({
    url: '/api/showInfo/getShowInfoByPage',
    method: 'post',
    params
  })
}

export function createInformation(params) {
  return request({
    url: '/api/showInfo/createShowInfo',
    method: 'post',
    params
  })
}

export function updateInformation(params) {
  return request({
    url: '/api/showInfo/updateShowInfo',
    method: 'post',
    params
  })
}

export function deleteInformation(params) {
  return request({
    url: '/api/showInfo/deleteShowInfo',
    method: 'post',
    params
  })
}