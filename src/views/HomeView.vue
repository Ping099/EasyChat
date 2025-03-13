<script setup>
import { UserFilled, ChatDotRound, Tools } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { ref } from 'vue'
const url = ref(userStore.Url)
</script>

<template>
  <div class="container">
    <div class="layout">
      <el-container>
        <!-- 导航栏 -->
        <el-aside class="nav" width="200px">
          <el-space direction="vertical" alignment="center" :size="30">
            <el-avatar shape="square" :src="url" />

            <el-icon color="#fff" size="30px" :onclick="() => router.push('/chat')"
              ><ChatDotRound
            /></el-icon>
            <el-icon color="#fff" size="30px" :onclick="() => router.push('/friend')"
              ><UserFilled
            /></el-icon>
            <el-icon color="#fff" size="30px" :onclick="() => router.push('/set')">
              <Tools
            /></el-icon>
            <el-icon color="#fff" size="30px" :onclick="() => router.push('/function')">
              <Tools
            /></el-icon>
          </el-space>
        </el-aside>
        <!-- 列表 -->
        <div class="main-box">
          <RouterView></RouterView>
        </div>
      </el-container>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout {
  background-color: aliceblue;
  width: 800px;
  height: 600px;
  margin: auto;

  display: flex;
  .nav {
    flex: 1;
    background-color: rgb(81, 81, 81);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main-box {
    /* background-color: antiquewhite; */
    flex: 11;
  }
}
.el-icon:hover {
  /* color: aqua; */
  color: #f56c6c;

  box-shadow: 5px 5px 5px rgb(38, 38, 38);
}
</style>
