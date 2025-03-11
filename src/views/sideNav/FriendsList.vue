<script setup>
// import UserCard from '@/components/UserCard.vue'
// const UserCard = () => import('@/components/UserCard.vue')
import { defineAsyncComponent } from 'vue'
const UserCard = defineAsyncComponent(
  () => import('@/components/UserCard.vue'), // 异步加载组件
)

const SearchBox = defineAsyncComponent(
  () => import('@/components/SearchBox.vue'), // 异步加载组件
)
import FriendApply from '@/components/FriendApply.vue'
import { Calendar, Search, CirclePlusFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { getFriendApi } from '@/api/friend'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
//获取好友列表
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const userId = userStore.id
const friends = ref()
const getFriend = async () => {
  console.log('当前用户id', userId)
  const res = await getFriendApi(userId)
  console.log('好友列表', res)
  friends.value = res.data
  console.log(friends)
}
getFriend()
const router = useRouter()
const go = (item) => {
  console.log('go', item)
  router.push({ path: '/friend/detail', query: { Msg: JSON.stringify(item) } })
}
//即时通讯
let ws = new WebSocket('ws://localhost:8080/login')
const openHand = (e) => {
  console.log('ws连接成功！', e)
}
const closeHand = (e) => {
  console.log('ws关闭！', e)
}

const messageHand = (e) => {
  // console.log(e)
  console.log('login接收后端的消息', JSON.parse(e.data))

  const res = JSON.parse(e.data)
  if (res.type == 'login' && res.msg.id != userId) open(res.msg.username)
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
  ws.send(msg)
}
//关闭连接
var isClose = false
const closeWs = () => {
  ws.close()
}
//重连
const restart = () => {
  console.log('客户端与服务端连接失败准备重连')
  //卸载
  onUnmounted(() => {})
  const timer = setInterval(() => {
    ws = new WebSocket('ws://localhost:8080/login')
    if (ws.readyState === 0) {
      clearInterval(timer)
      ws.addEventListener('open', openHand)
      ws.addEventListener('close', closeHand)
      ws.addEventListener('message', messageHand)
      ws.addEventListener('error', errorHand)
    }
  }, 1000)
}
onMounted(() => {
  restart()
})
//消息弹出框
import { h } from 'vue'
import { ElNotification } from 'element-plus'

const open = (msg) => {
  ElNotification({
    title: '温馨提示',
    dangerouslyUseHTMLString: true,
    message: `用户${msg}上线啦，快找他聊天吧`,
    type: 'success',
  })
}
</script>
<template>
  <div class="friend-container">
    <el-scrollbar class="left" height="598px">
      <SearchBox class="search-box">
        <template #add>
          <el-button
            type="danger"
            :icon="CirclePlusFilled"
            :onclick="() => router.push('/friend/add')"
          />
        </template>
      </SearchBox>
      <FriendApply :onclick="() => router.push('/friend/applymsg')"></FriendApply>
      <UserCard
        class="user-card"
        v-for="item in friends"
        :userName="item.username"
        :userNote="item.note"
        :content="item.motto"
        :url="item.urlavatar"
        :onClick="() => go(item)"
      ></UserCard>
    </el-scrollbar>

    <div class="right">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
<style scoped>
.friend-container {
  display: flex;
  height: 100%;

  /* background-color: rgb(23, 67, 105); */
  .left {
    flex: 5;
    padding-top: 80px;
    box-sizing: border-box;
    /* background-color: aliceblue; */
    height: auto;
    min-height: 100%;
  }
  .right {
    flex: 8;
    /* background-color: rgb(255, 149, 149); */
  }
}
.user-card {
  /* margin: 3px 0px; */
}
.search-box {
  position: absolute;
  top: 0;
  z-index: 10000;
}
</style>
