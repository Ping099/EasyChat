import request from '@/utils/request'

export const postFileUploadApi = (file) => {
  return request.post('/file/upload', file)
}
export const getMergeApi = (id, fileName, sliceNum) => {
  return request.get('/merge', { params: { id, fileName, sliceNum } })
}

export const getCheckApi = async (id, sliceIndex) => {
  return request.get('/check', {
    params: {
      id,
      sliceIndex,
    },
  })
}
