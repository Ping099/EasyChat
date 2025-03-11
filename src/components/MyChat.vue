<script setup>
import { defineProps, ref, onMounted, reactive, watch } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

const url = ref(userStore.Url)
const props = defineProps({
  content: String,
})
const content = props.content
</script>
<template>
  <div class="my-box">
    <div></div>
    <el-space alignment="start" :size="20" class="main-box">
      <div class="content">{{ content }}</div>
      <el-avatar class="avatar" :size="50" :src="url" />
    </el-space>
  </div>
</template>
<style scoped>
.my-box {
  margin: 5px 0;
  height: auto;
  width: 100%;
  float: right;
  position: relative;
  .el-space {
    float: right;
  }
  .avatar {
    float: right;
  }
  .content {
    float: right;
    max-width: 250px;
    overflow-wrap: break-word;
    white-space: normal;
    min-height: 40px;
    line-height: 40px;
    background-color: rgb(91, 165, 108);
    border-radius: 50px;
    box-sizing: border-box;
    padding: 13px 18px;
  }
}
</style>
