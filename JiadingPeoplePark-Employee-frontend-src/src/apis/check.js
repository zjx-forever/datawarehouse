import request from "@/utils/request";

export function getAdoptionInfo(params) {
    return request({
        url: '/api/adoptionInfo/getAdoptionInfoByPage',
        method: 'post',
        params
    })
}

export function updateAdoptionInfo(params) {
    return request({
        url: '/api/adoptionInfo/updateAdoptionInfo',
        method: 'post',
        params
    })
}

export function getBookingInfo(params) {
    return request({
        url: '/api/groupAppointmentAdmission/getGroupAppointmentAdmissionByPage',
        method: 'post',
        params
    })
}

export function updateBookingInfo(params) {
    return request({
        url: '/api/groupAppointmentAdmission/updateGroupAppointmentAdmission',
        method: 'post',
        params
    })
}

export function downloadFile(data) {
    return request({
        url: '/api/groupAppointmentAdmission/updateGroupAppointmentAdmission',
        method: 'post',
        data
    })
}
