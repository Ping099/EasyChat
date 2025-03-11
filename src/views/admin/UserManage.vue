<script setup>
import { getUserApi } from '@/api/user'
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const tableData = ref()
const getUser = async () => {
  const res = await getUserApi()
  console.log('所有用户', res.data)
  tableData.value = res.data.filter((item) => item.type == 'user')
}
getUser()

const handleEdit = (index, row) => {
  console.log(index, row)
}
import { delUserApi } from '@/api/user'
const handleDelete = async (index, row) => {
  console.log(index, row)
  const res = await delUserApi(row.id)
  console.log('删除结果', res)

  proxy.$message.success('删除成功')
  getUser()
}
</script>

<template>
  <el-table :data="tableData" height="90vh" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="username" label="用户昵称" />
    <el-table-column prop="phone" label="电话号码" />
    <el-table-column prop="password" label="密码" />
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="motto" label="个性签名" />
    <el-table-column prop="type" label="身份" />
    <el-table-column>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
