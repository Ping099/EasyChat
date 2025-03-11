<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Plus,
  Male,
  Female,
  ChatRound,
} from '@element-plus/icons-vue'
//父组件传参
import { defineProps, ref, onMounted,reactive } from 'vue'
const props = defineProps({
  userMsg: Object,
})
const userMsg = ref(props.userMsg)
//向父组件传参
import { defineEmits } from 'vue';

const emit = defineEmits(['childEmit']);

function sendParent() {
  emit('childEmit', userMsg.value);
}
//用户信息

const username = ref()
const sex = ref(userMsg == '女' ? 1 : 0)
const phone=ref()
onMounted(() => {
  username.value = userMsg.value.username
  sex.value = userMsg.value.sex
  phone.value=userMsg.value.phone
})



</script>
<template>
  <div class="user-container">
    <div class="left">
      <el-avatar
        :size="50"
        :src="userMsg.urlavatar?userMsg.urlavatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
    </div>
    <div class="right">
      <p class="title">
        {{ username }}
        <div class="sex" v-if="sex!=null">
        <el-icon v-if="sex" style="color: #f56c6c"><Female /></el-icon>
        <el-icon v-else style="color: #409eff"><Male /></el-icon>
      </div>
      </p>
      <p class="msg">用户信息</p>
      <el-button type="primary" :icon="ChatRound" circle />
      <el-button type="success" :icon="Plus" circle :onclick="sendParent" />
    </div>
  </div>

</template>
<style scoped>
.user-container {
  border-radius: 15px;
  box-shadow: var(--el-box-shadow-light);
  background-color: antiquewhite;
  width: 200px;
  height: 100px;
  padding: 10px;
  box-sizing: 5px;
  display: flex;
  .left {
    flex: 3;
  }
  .right {
    flex: 4;
    /* background-color: aliceblue; */
    .msg {
      font-size: 12px;
      line-height: 12px;
      margin: 6px 0px;
      color: gray;
    }
  }
}
.sex{
  display: inline;
}

</style>
