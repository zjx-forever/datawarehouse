import request from '@/utils/request'

export function getInformation(params) {
  return request({
    url: '/api/animal/queryAllAdoptableByPage',
    method: 'post',
    params
  })
}

export function createInformation(params) {
  return request({
    url: '/api/animal/createAnimal',
    method: 'post',
    params
  })
}

export function updateInformation(params) {
  return request({
    url: '/api/animal/updateAnimal',
    method: 'post',
    params
  })
}

export function deleteInformation(params) {
  return request({
    url: '/api/animal/deleteAnimal',
    method: 'post',
    params
  })
}



export function getHandleAdoptionCount(params) {
  return request({
    url: '/api/commonModule/getHandleAdoptionCount',
    method: 'post',
    params
  })
}

export function getNotHandleAdoptionCount(params) {
  return request({
    url: '/api/commonModule/getNotHandleAdoptionCount',
    method: 'post',
    params
  })
}

export function getNotAdoptedAnimalCount(params) {
  return request({
    url: '/api/commonModule/getNotAdoptedAnimalCount',
    method: 'post',
    params
  })
}

export function getAdoptedAnimalCount(params) {
  return request({
    url: '/api/commonModule/getAdoptedAnimalCount',
    method: 'post',
    params
  })
}