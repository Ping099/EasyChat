<script setup>
import ChatWindow from '@/components/ChatWindow.vue'
import tinymce from 'tinymce'
import UserCard from '@/components/UserCard.vue'
import Search from '@/components/SearchBox.vue'
import { ChatLineRound, CirclePlusFilled } from '@element-plus/icons-vue'
import { getFriendChatApi } from '@/api/chat'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const id = userStore.id
import { ref, onMounted, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
const route = useRoute()
const chatList = ref()

const getFriendChat = async () => {
  const res = await getFriendChatApi(id)
  console.log('获取聊天列表', res.data)
  chatList.value = res.data
}
const note = ref('')
onMounted(() => {
  getFriendChat()
})
const hand = ref(0)
const nowfid = ref()
const username = ref()
const urlavatar = ref()
const isShow = ref(false)
const go = (id, fnote, name, url) => {
  note.value = fnote
  hand.value = id
  nowfid.value = id
  username.value = name
  urlavatar.value = url
  router.push(`/chat/${id}`)
  isShow.value = true
  // window.location.reload()
}
</script>
<template>
  <el-container class="main-container">
    <KeepAlive>
      <el-aside class="list">
        <Search>
          <template #add> <el-button type="danger" plain :icon="ChatLineRound" /> </template
        ></Search>

        <UserCard
          class="mes-box"
          v-for="item in chatList"
          :userName="item.username"
          :userNote="item.note"
          :content="item.content"
          :url="item.urlavatar"
          :onclick="() => go(item.id, item.note, item.username, item.urlavatar)"
        >
        </UserCard>
      </el-aside>
    </KeepAlive>
    <el-main class="window">
      <ChatWindow
        v-if="isShow"
        :fId="nowfid"
        :note="note"
        :username="username"
        :urlavatar="urlavatar"
        :getFriendChat="getFriendChat"
      />
    </el-main>
  </el-container>
</template>
<style scoped>
.main-container {
  /* background-color: blue; */
  height: 100%;
  display: flex;
  .list {
    flex: 3;
    /* background-color: azure; */
  }
  .window {
    flex: 6;
    display: flex;
    padding: 0px;
    margin: 0px;
  }
}
.mes-box {
  margin-top: 10px;
}
</style>
