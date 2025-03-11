<script setup>
import { defineProps, ref, onMounted, reactive } from 'vue'
//接收父组件参数
const props = defineProps({
  userName: String,
  userNote: String,
  content: String,
  url: String,
})
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const url = ref(props.url)
const userName = ref(props.userName)
const userNote = ref(props.userNote)
const content = ref(props.content)
</script>
<template>
  <div class="card-box">
    <div class="card-left">
      <el-avatar shape="square" :src="url" />
    </div>
    <div class="card-right">
      <div class="card-header">{{ userNote ? userNote : userName }}</div>
      <el-divider />
      <div class="card-content">{{ content }}</div>
    </div>
  </div>
</template>
<style scoped>
.card-box {
  display: flex;
  background-color: #ffffff;
  font-size: 12px;
  padding: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.325);
  box-sizing: border-box;
  .card-left {
    flex: 2;
    box-sizing: border-box;
    padding: 5px;
  }
  .card-right {
    flex: 8;
    box-sizing: border-box;
    padding: 5px;
  }
}
.el-divider--horizontal {
  margin: 6px 0px 10px 0px;
}
.card-header {
  font-weight: bolder;
}
.card-content {
  color: grey;
}
</style>
