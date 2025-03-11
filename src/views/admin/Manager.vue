<script setup>
import { getUserApi } from '@/api/user'
const tableData = ref()
const getUser = async () => {
  const res = await getUserApi()
  console.log('所有用户', res.data)
  tableData.value = res.data.filter((item) => item.type == 'admin')
}
getUser()
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const labelWidth = '140px'
import { ref, reactive } from 'vue'
const showForm = ref(false)
const add = () => {
  console.log('点击')
  showForm.value = true
}

const addForm = reactive({
  username: '',
  phone: '',
  type: '',
})
</script>

<template>
  <el-table :data="tableData" height="80vh" style="width: 100%">
    <el-table-column prop="id" label="id" width="100" />
    <el-table-column prop="username" label="用户昵称" width="180" />
    <el-table-column prop="phone" label="电话号码" width="180" />
    <el-table-column prop="password" label="密码" width="180" />
    <el-table-column prop="sex" label="性别" width="180" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="motto" label="个性签名" />
    <el-table-column prop="type" label="身份" width="180" />
    <el-table-column>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="add">添加管理员</el-button>
  <el-dialog v-model="showForm" title="注册账号" width="500">
    <el-form :model="addForm">
      <!-- 信息展示 -->

      <!-- 表单 -->
      <el-form-item label="昵称" :label-width="labelWidth">
        <el-input v-model="addForm.username" autocomplete="off" placeholder="" />
      </el-form-item>
      <el-form-item label="电话" :label-width="labelWidth">
        <el-input v-model="addForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分组" :label-width="labelWidth">
        <el-select v-model="addForm.type" placeholder="请选择身份">
          <el-option label="管理员" value="admin" />
          <el-option label="用户" value="user" />
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
</template>
