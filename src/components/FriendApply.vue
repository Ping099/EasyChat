<script setup>
import { Check, ArrowRightBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const go = () => {
  console.log('go!')
  router.push('/friend/applymsg')
}
</script>

<template>
  <el-card shadow="always">
    <div class="content">
      <div class="title">好友通知</div>
      <div class="go">
        <el-icon><ArrowRightBold /></el-icon>
      </div>
    </div>
  </el-card>
</template>
<style scoped>
.el-card {
  margin: 5px 0px;
}
.content {
  display: flex;
  .title {
    flex: 10;
  }
  .go {
    flex: 1;
  }
}
</style>
