import request from '@/utils/request'
export const getUserApi = () => {
  return request.get('/user')
}
export const getUserByIdApi = (id) => {
  return request.get('/user/one', {
    params: {
      id,
    },
  })
}
export const postUserRegisterApi = (data) => {
  return request.post('/user', data)
}
export const putUpdateUserApi = (data) => {
  return request.put('/user', data)
}
export const delUserApi = (id) => {
  return request.delete('/user', {
    params: {
      id,
    },
  })
}
//修改头像
export const postAvatarApi = (id, file) => {
  return request.post('/user/avatar', file, {
    params: {
      id,
    },
  })
}
