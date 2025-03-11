import axios from 'axios'
import { getCurrentInstance } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import router from '@/router'
const loading = {
  //loading加载对象
  loadingInstance: null,
  //打开加载
  open() {
    if (this.loadingInstance === null) {
      // 如果实例 为空，则创建
      this.loadingInstance = ElLoading.service({
        text: '加载中...', //加载图标下的文字
        lock: true,
        background: 'rgba(255,255,255, 0.2)', //背景色
        customClass: 'loading', //自定义样式的类名
      })
    }
  },
  //关闭加载
  close() {
    // 不为空时, 则关闭加载窗口
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  },
}

const baseURL = '/api'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
})
const controller = new AbortController()
const apiMap = new Map()
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = token

    //防抖
    const apiKey = `${config.method}-${config.url}`
    console.log('发送请求', apiKey)
    const apied = apiMap.get(apiKey)
    if (apied) {
      controller.abort() //取消请求
    }
    loading.open()
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(config)
      }, 800)
      apiMap.set(apiKey, () => {
        clearTimeout(timer)
        resolve(new Error('取消请求'))
      })
    })
  },
  (err) => Promise.reject(err),
)
//节流
// let lastTime = new Date().getTime()
instance.interceptors.request.use(
  (config) => {
    // const nowTime = new Date().getTime()
    // if (nowTime - lastTime < 100) {
    //   return Promise.reject(new Error('节流处理中，稍后再试'))
    // }
    // lastTime = nowTime
    return config
  },
  (err) => Promise.reject(err),
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    loading.close() //关闭加载窗口
    if (res.data.code != 200) {
      ElMessage.error(res.data.msg)
      if (res.data.code == 401) {
        router.push('/login')
      }
      return Promise.reject(res.data)
    }
    // console.log('正确响应', res)
    return res.data
  },
  (err) => {
    loading.close()
    console.log('错误响应', err)

    return Promise.reject(err)
  },
)

export default instance
