import request from '@/utils/request'
export const getFriendChatApi = (id) => {
  return request.get('/chat', {
    params: {
      id,
    },
  })
}
export const getChatDetailApi = (myId, fId) => {
  return request.get('/chat/detail', {
    params: {
      myId,
      fId,
    },
  })
}
