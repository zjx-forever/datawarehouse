import request from '@/utils/request'

export function getInformation(params) {
  return request({
    url: '/api/plantsSciencePopulation/getPlantsSciencePopulationByPage',
    method: 'post',
    params
  })
}

export function createInformation(params) {
  return request({
    url: '/api/plantsSciencePopulation/createPlantsSciencePopulation',
    method: 'post',
    params
  })
}

export function updateInformation(params) {
  return request({
    url: '/api/plantsSciencePopulation/updatePlantsSciencePopulation',
    method: 'post',
    params
  })
}

export function deleteInformation(params) {
  return request({
    url: '/api/plantsSciencePopulation/deletePlantsSciencePopulation',
    method: 'post',
    params
  })
}
