
import request from '@/utils/request'
export function uploadPicture(params) {
  return request({
    url: '/api/uploadFile',
    method: 'post',
    params
  })
}
export function loadimg(params) {
  return request({
    url: '/api/getPicture',
    method: 'post',
    responseType:"arraybuffer",
    params
  })
}