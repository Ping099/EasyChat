<script setup>
import { Check, ArrowRightBold, CloseBold, Select } from '@element-plus/icons-vue'
import { getApplyApi, putHandApplyApi } from '@/api/friend.js'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
const userStore = useUserStore()
const userId = userStore.id
//获取申请列表
const applyList = ref([])
const getApplyList = async () => {
  const res = await getApplyApi(userId)
  console.log('获取申请列表', res)
  applyList.value = res.data
}
getApplyList()
const formateDate = (date) => {
  return date.toString().substring(0, 10)
}
//处理好友申请
const hangApply = async (apply, isagree) => {
  console.log('处理好友申请', apply)
  const applyid = apply.applyid

  const appliedid = apply.appliedid
  const id = apply.id
  console.log('测试', applyid, appliedid, id)
  const res = await putHandApplyApi({ applyid, appliedid, isagree, id })
  console.log('处理好友申请结果响应', res)
  getApplyList()
}
</script>
<template>
  <el-card style="max-width: 480px" v-for="item in applyList" :key="item.id">
    <el-container>
      <el-aside width="50px"><el-avatar :size="50" :src="item.applyUser.urlavatar" /></el-aside>
      <el-main>
        <p>
          <el-space alignment="start" :size="10">
            <span class="name">{{ item.applyUser.username }}</span>
            <span>请求加为好友</span>
            <span class="time">{{ formateDate(item.time) }}</span>
          </el-space>
        </p>
        <p class="say">留言：{{ item.checkmsg }}</p>
      </el-main>
      <el-aside width="70px" class="hand">
        <div v-if="item.ishand" class="agree">
          <span>{{ item.isagree ? '已同意' : '未同意' }}</span>
        </div>
        <el-space v-else>
          <el-button
            type="danger"
            :icon="CloseBold"
            circle
            size="small"
            :onClick="() => hangApply(item, false)" />
          <el-button
            type="success"
            :icon="Select"
            circle
            size="small"
            :onclick="() => hangApply(item, true)"
        /></el-space>
      </el-aside>
    </el-container>
  </el-card>
</template>
<style scoped>
.el-main {
  --el-main-padding: 7px;
  font-size: 15px;
  line-height: 20px;
  margin-left: 5px;
  .name {
    color: brown;
  }
  .time {
    color: gray;
    font-size: 12px;
  }
  .say {
    color: gray;
    font-size: 12px;
  }
  .hand {
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
p {
  margin-bottom: 5px;
  box-sizing: border-box;
}
.el-aside {
  margin: auto;
}
.agree {
  color: gray;
  height: 20px;
  font-size: 12px;
}
</style>
