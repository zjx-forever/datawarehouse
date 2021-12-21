import request from '@/utils/request'

export function getInformation(params) {
  return request({
    url: '/api/animalsSciencePopulation/getAnimalsSciencePopulationByPage',
    method: 'post',
    params
  })
}

export function createInformation(params) {
  return request({
    url: '/api/animalsSciencePopulation/createAnimalsSciencePopulation',
    method: 'post',
    params
  })
}

export function updateInformation(params) {
  return request({
    url: '/api/animalsSciencePopulation/updateAnimalsSciencePopulation',
    method: 'post',
    params
  })
}

export function deleteInformation(params) {
  return request({
    url: '/api/animalsSciencePopulation/deleteAnimalsSciencePopulation',
    method: 'post',
    params
  })
}
