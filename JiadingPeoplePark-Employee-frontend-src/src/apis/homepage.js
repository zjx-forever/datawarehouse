import request from '@/utils/request'

export function getNotice(params) {
    return request({
        url: '/api/commonModule/getNotice',
        method: 'post',
        params
    })
}


export function getRegisteredTouristCnt(params) {
    return request({
        url: '/api/commonModule/getRegisterTouristCount',
        method: 'post',
        params
    })
}

export function getAnimalCount(params) {
    return request({
        url: '/api/commonModule/getAnimalCount',
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

export function getShowCount(params) {
    return request({
        url: '/api/commonModule/getShowCount',
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
export function getNotAdoptedAnimalCount(params) {
    return request({
        url: '/api/commonModule/getNotAdoptedAnimalCount',
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