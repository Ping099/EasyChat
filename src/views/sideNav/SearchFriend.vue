<script setup>
import SearchBox from '@/components/SearchBox.vue'
import UserItem from '@/components/UserItem.vue'
import { getUserApi } from '@/api/user'
import { onMounted, ref, reactive } from 'vue'

//获取用户信息
const userList = ref([]) //用户列表
const getUserList = async () => {
  console.log('发送请求')
  const res = await getUserApi()
  console.log('获取用户列表', res)
  userList.value = res.data
}
//处理申请

var applyUser = reactive()
const apply = (data) => {
  applyUser = data
  console.log('接收', applyUser)
  showForm.value = true
}

//添加好友
const addForm = reactive({
  checkmsg: '',
  note: '',
  group: '',
})
import { postApplyApi } from '@/api/friend'
import { useUserStore } from '@/stores'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const add = async () => {
  const applyid = userStore.id
  const appliedid = applyUser.id
  const data = { appliedid, applyid, ...addForm }

  console.log('请求参数', data)
  const res = await postApplyApi(data)
  console.log('添加好友响应', res)
  proxy.$message.success('修改成功成功！')
  showForm.value = false
}
//添加好友模块

const showForm = ref(false)
const labelWidth = '140px'

onMounted(() => {
  getUserList()
})
</script>
<template>
  <div class="search-box">
    <SearchBox class="input-box"
      ><template #add>
        <el-button type="primary" :icon="Search">搜索</el-button>
      </template></SearchBox
    >
    <el-scrollbar>
      <div class="search-main">
        <UserItem
          class="user-item"
          v-for="item in userList"
          :userMsg="item"
          @childEmit="apply"
        ></UserItem>
      </div>
    </el-scrollbar>
    <!-- 添加好友框 -->

    <el-dialog v-model="showForm" title="申请添加好友" width="500">
      <el-form :model="addForm">
        <!-- 信息展示 -->
        <div class="usemsg-box">
          <el-space alignment="start" :size="30">
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <div class="msg">
              <p>{{ applyUser.username }}</p>
              <p>{{ applyUser.phone }}</p>
            </div>
          </el-space>
        </div>

        <!-- 表单 -->
        <el-form-item label="填写验证消息" :label-width="labelWidth">
          <el-input v-model="addForm.checkmsg" autocomplete="off" placeholder="我是xxx" />
        </el-form-item>
        <el-form-item label="备注" :label-width="labelWidth">
          <el-input v-model="addForm.note" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分组" :label-width="labelWidth">
          <el-select v-model="addForm.group" placeholder="请选择好友分组">
            <el-option label="朋友" value="朋友" />
            <el-option label="家人" value="家人" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showForm = false">取消</el-button>
          <el-button type="primary" @click="add"> 申请 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.search-box {
  display: flex;
  flex-direction: column;
  /* background-color: brown; */
  height: 100%;
  .input-box {
    flex: 2;
  }
  .search-main {
    width: 100%;
    height: 100%;
    flex: 8;
    padding: 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    /* background-color: rgb(45, 38, 140); */
    justify-content: space-around;
    justify-content: space-between;
    display: flex;
  }
}
.user-item {
  margin: 10px 15px;
}
.usemsg-box {
  display: flex;

  margin-bottom: 10px;
  p {
    margin: 5px 0px;
  }
}
</style>
