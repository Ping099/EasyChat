<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <el-empty>
    <el-button type="primary" :onclick="() => router.push('/')">返回</el-button>
    <template #description>
      <div>对不起，您访问的页面不存在</div>
    </template>
  </el-empty>
</template>
<style scoped>
div {
  font-weight: bold;
  color: gray;
}
</style>
