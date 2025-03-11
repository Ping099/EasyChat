import { EventDispatcher } from './dispatcher'

export class WebSocketClient extends EventDispatcher {
  // #socket链接
  url = ''
  // #socket实例
  socket = null
  // #重连次数
  reconnectAttempts = 0
  // #最大重连数
  maxReconnectAttempts = 5
  // #重连间隔
  reconnectInterval = 10000 // 10 seconds
  // #发送心跳数据间隔
  heartbeatInterval = 1000 * 30
  // #计时器id
  heartbeatTimer = undefined
  // #彻底终止ws
  stopWs = false
  // *构造函数
  constructor(url) {
    super()
    this.url = url
  }
  // >生命周期钩子
  onopen(callBack) {
    this.addEventListener('open', callBack)
  }
  onmessage(callBack) {
    this.addEventListener('message', callBack)
  }
  onclose(callBack) {
    this.addEventListener('close', callBack)
  }
  onerror(callBack) {
    this.addEventListener('error', callBack)
  }
  // >消息发送
  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message)
    } else {
      console.error('[WebSocket] 未连接')
    }
  }

  // !初始化连接
  connect() {
    if (this.reconnectAttempts === 0) {
      console.log('WebSocket', `初始化连接中...          ${this.url}`)
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return
    }
    this.socket = new WebSocket(this.url)

    // !websocket连接成功
    this.socket.onopen = (event) => {
      this.stopWs = false
      // 重置重连尝试成功连接
      this.reconnectAttempts = 0
      // 在连接成功时停止当前的心跳检测并重新启动
      this.startHeartbeat()

      console.log('WebSocket', `连接成功,等待服务端数据推送[onopen]...     ${this.url}`)
      this.dispatchEvent('open', event)
    }

    this.socket.onmessage = (event) => {
      this.dispatchEvent('message', event)
      this.startHeartbeat()
    }

    this.socket.onclose = (event) => {
      if (this.reconnectAttempts === 0) {
        console.log('WebSocket', `连接断开[onclose]...    ${this.url}`)
      }
      if (!this.stopWs) {
        this.handleReconnect()
      }
      this.dispatchEvent('close', event)
    }

    this.socket.onerror = (event) => {
      if (this.reconnectAttempts === 0) {
        console.log('WebSocket', `连接异常[onerror]...    ${this.url}`)
      }
      this.closeHeartbeat()
      this.dispatchEvent('error', event)
    }
  }

  // > 断网重连逻辑
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(
        'WebSocket',
        `尝试重连... (${this.reconnectAttempts}/${this.maxReconnectAttempts})       ${this.url}`,
      )
      setTimeout(() => {
        this.connect()
      }, this.reconnectInterval)
    } else {
      this.closeHeartbeat()
      console.log('WebSocket', `最大重连失败，终止重连: ${this.url}`)
    }
  }

  // >关闭连接
  close() {
    if (this.socket) {
      this.stopWs = true
      this.socket.close()
      this.socket = null
      this.removeEventListener('open')
      this.removeEventListener('message')
      this.removeEventListener('close')
      this.removeEventListener('error')
    }
    this.closeHeartbeat()
  }

  // >开始心跳检测 -> 定时发送心跳消息
  startHeartbeat() {
    if (this.stopWs) return
    if (this.heartbeatTimer) {
      this.closeHeartbeat()
    }
    this.heartbeatTimer = setInterval(() => {
      if (this.socket) {
        this.socket.send(JSON.stringify({ type: 'heartBeat', data: {} }))
        console.log('WebSocket', '送心跳数据...')
      } else {
        console.error('[WebSocket] 未连接')
      }
    }, this.heartbeatInterval)
  }

  // >关闭心跳
  closeHeartbeat() {
    clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = undefined
  }
}

//即时通讯
// var ws = new WebSocket('ws://localhost:8080/chat')
// const openHand = (e) => {
//   console.log('ws连接成功！', e)
// }
// const closeHand = (e) => {
//   console.log('ws关闭！', e)
// }
// const messageHand = (e) => {
//   // console.log(e)
//   const res = JSON.parse(e.data).msg
//   console.log('chat后端消息:', res)
//   handleScroll()
//   if (res) mesList.push(res)
// }
// const errorHand = (e) => {
//   console.log('ws出错', e)
// }
// ws.addEventListener('open', openHand) //连接
// ws.addEventListener('close', closeHand) //关闭
// ws.addEventListener('message', messageHand) //接收消息
// ws.addEventListener('error', errorHand) //出错
// //发送消息
// const sendWs = (Msg) => {
//   const obj = {
//     content: Msg,
//     toId: fId.value,
//     fromId: myId.value,
//   }
//   console.log('obj', fId.value)
//   const json = JSON.stringify(obj)
//   console.log('前端开始向后端发送消息', json)
//   ws.send(json)
// }
// //关闭连接
// var isClose = false
// const closeWs = () => {
//   ws.close()
// }
// // 重连
// const restart = () => {
//   console.log('客户端与服务端连接失败准备重连')
//   //卸载
//   onUnmounted(() => {})
//   const timer = setInterval(() => {
//     ws = new WebSocket('ws://localhost:8080/chat')
//     if (ws.readyState === 0) {
//       clearInterval(timer)
//       ws.addEventListener('open', openHand)
//       ws.addEventListener('close', closeHand)
//       ws.addEventListener('message', messageHand)
//       ws.addEventListener('error', errorHand)
//     }
//   }, 1000)
// }
