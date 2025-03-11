<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
const message = ref('')
const tableData = ref()

const send = () => {
  console.log('发送内容', message.value)
  sendWs(message.value)
}
//即时通讯
var ws = new WebSocket('ws://localhost:8080/broad')
const openHand = (e) => {
  console.log('ws连接成功！', e)
}
const closeHand = (e) => {
  console.log('ws关闭！', e)
}
const messageHand = (e) => {
  // console.log(e)
  const res = JSON.parse(e.data)
  console.log('chat后端消息:', res)
  //处理在线用户
  if (res.type == 'online') {
    console.log('11111111111')
    showList(res.msg)
  } else {
    open2(res.msg)
  }
}
const errorHand = (e) => {
  console.log('ws出错', e)
}
ws.addEventListener('open', openHand) //连接
ws.addEventListener('close', closeHand) //关闭
ws.addEventListener('message', messageHand) //接收消息
ws.addEventListener('error', errorHand) //出错
//发送消息
const sendWs = (msg) => {
  const json = JSON.stringify(msg)
  console.log('前端开始向后端发送消息', json)
  ws.send(json)
}
const showList = (nowList) => {
  tableData.value = nowList
  console.log('当前在线人数', nowList.length)
}
//关闭连接
var isClose = false
const closeWs = () => {
  ws.close()
}
// 重连
const restart = () => {
  console.log('客户端与服务端连接失败准备重连')
  //卸载
  onUnmounted(() => {})
  const timer = setInterval(() => {
    ws = new WebSocket('ws://localhost:8080/broad')
    if (ws.readyState === 0) {
      clearInterval(timer)
      ws.addEventListener('open', openHand)
      ws.addEventListener('close', closeHand)
      ws.addEventListener('message', messageHand)
      ws.addEventListener('error', errorHand)
    }
  }, 1000)
}

const open2 = (msg) => {
  ElNotification({
    title: 'Prompt',
    message: msg,
    duration: 0,
  })
}
</script>

<template>
  <el-container>
    <el-button plain @click="open2"> 1</el-button>
    <el-aside width="60%">
      <el-table :data="tableData" height="90vh" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column type="selection" :selectable="selectable" width="55" /> -->
        <el-table-column prop="id" label="用户id" width="180" />
        <el-table-column prop="username" label="昵称" width="180" />
        <el-table-column prop="type" label="身份" width="180" />
        <el-table-column prop="phone" label="电话号码" />
        <el-table-column prop="adress" label="地址" /> </el-table
    ></el-aside>
    <el-main>
      <h3>广播消息</h3>

      <el-input
        v-model="message"
        style="width: 100%"
        :rows="22"
        type="textarea"
        placeholder="请输入您要广播的内容"
      /><el-button type="primary" @click="send">发送</el-button></el-main
    >
  </el-container>
</template>
<style scoped>
h3 {
  color: gray;
  font-weight: 900;
  height: 40px;
  line-height: 40px;
  margin: 10px 0px;
  margin: auto;
  text-align: center;
}
.el-main {
  padding: 0px;
}
</style>
