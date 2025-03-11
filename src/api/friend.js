import request from '@/utils/request'

//获取好友列表
export const getFriendApi = (userId) => {
  return request.get('/friend', {
    params: {
      userId,
    },
  })
}
//发送好友申请
export const postApplyApi = (data) => {
  return request.post('/friend/apply', data)
}
//获取好友申请列表
export const getApplyApi = (userId) => {
  return request.get('/friend/apply', {
    params: {
      userId,
    },
  })
}
//通过好友同意
export const putHandApplyApi = (data) => {
  return request.put('/friend/apply', data)
}
//获取好友资料详情
export const getFriendDetailApi = (friendId, myId) => {
  return request.get('/friend/detail', {
    params: {
      friendId,
      myId,
    },
  })
}
