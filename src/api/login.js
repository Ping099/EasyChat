import request from '@/utils/request'
//登录
export const postLoginApi = (phone, password) => {
  console.log('测试请求参数', phone, password)
  return request.post('/login', {
    phone,
    password,
  })
}
