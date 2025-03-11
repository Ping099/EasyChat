<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { StarFilled, Edit, User, EditPen } from '@element-plus/icons-vue'
const route = useRoute()
const msg = ref()
const username = ref()
const phone = ref()
const note = ref()
const group = ref()
const motto = ref()
const url = ref()
const fid = ref()
watch(
  () => route.query,
  (newParams, oldParams) => {
    console.log('路由变化', newParams, oldParams)
    msg.value = JSON.parse(newParams.Msg)
    username.value = msg.value.username
    phone.value = msg.value.phone
    note.value = msg.value.note
    group.value = msg.value.group
    motto.value = msg.value.motto
    url.value = msg.value.urlavatar
    fid.value = msg.value.id
    console.log(msg.value)
  },
)
onMounted(() => {
  msg.value = JSON.parse(route.query.Msg)
  username.value = msg.value.username
  phone.value = msg.value.phone
  note.value = msg.value.note
  group.value = msg.value.group
  motto.value = msg.value.motto
  url.value = msg.value.urlavatar
  fid.value = msg.value.id
  console.log(msg.value)
})

const router = useRouter()
const send = () => {
  router.push(`/chat/${fid.value}`)
}
</script>
<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-container>
        <el-aside width="200px"> <el-avatar :size="70" :src="url" /></el-aside>
        <el-main class="main">
          <h3>{{ username }}</h3>
          <p class="phone">电话：{{ phone }}</p>
        </el-main>
      </el-container>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <el-main class="main-msg">
        <el-row :gutter="20">
          <el-icon><Edit /></el-icon>
          <el-col :span="18"
            ><div />
            备注</el-col
          >
          <el-col :span="4"
            ><div />
            {{ note }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-icon><User /></el-icon>
          <el-col :span="18"
            ><div />
            好友分组</el-col
          >
          <el-col :span="4"
            ><div />
            {{ group }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-icon><EditPen /></el-icon>
          <el-col :span="14"
            ><div />
            签名</el-col
          >
          <el-col :span="8" class="motto"
            ><div />
            {{ motto }}</el-col
          >
        </el-row>
        <el-divider
      /></el-main>
      <el-footer
        ><el-button>分享</el-button>
        <el-button type="primary" @click="send">发消息</el-button></el-footer
      ></el-main
    >
  </el-container>
</template>
<style scoped>
.el-aside {
  width: auto;
}
.main {
  text-align: left;
  h3 {
    font-weight: bolder;
    font-size: 20px;
  }
  p {
    padding: 10px 0px;
    box-sizing: border-box;
  }
}
.main-msg {
  font-size: 15px;
}
.el-row {
  height: 25px;
}
.motto {
  text-align: right;
}
</style>
