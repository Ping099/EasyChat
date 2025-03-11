<script setup>
import { getUserApi } from '@/api/user'

import { reactive } from 'vue'
const getUser = async () => {
  const res = await getUserApi()
  console.log(res, '?')
}
import { ref } from 'vue'
// const rules = reactive({
//   password: [{ validator: validatePass2, trigger: 'blur' }],
//   name: [{ validator: validatePass1, trigger: 'blur' }],
// })
const rules = reactive({
  phone: [
    { required: true, message: '请输入您的手机号', trigger: 'blur' },
    { min: 5, max: 20, message: '长度在5-20', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
  ],
})
const ruleFormRef = ref()
const ruleForm = ref({ phone: '', password: '', type: '' })
//登录模块

import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { postLoginApi } from '@/api/login'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const router = useRouter()
const submitForm = async (formEl) => {
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const type = ruleForm.value.type
      const phone = ruleForm.value.phone
      const password = ruleForm.value.password
      if (type == 'admin') {
        if (phone == 'admin' && password == 'admin') {
          const res = await postLoginApi(phone, password)
          console.log('登录返回结果', res)
          console.log('获得token', res.data.token)
          localStorage.setItem('token', res.data.token)
          router.push('/admin/user')
        } else {
          proxy.$message.error('账号或密码错误')
        }
      } else {
        const res = await postLoginApi(phone, password)
        console.log('登录返回结果', res)
        console.log('获得token', res.data.token)
        localStorage.setItem('token', res.data.token)
        // 存入pinia
        const { id, username } = res.data

        userStore.getUser(id)
        proxy.$message.success('登录成功')

        router.push('/')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = () => {}
// getUser()
</script>
<template>
  <div class="container">
    <div class="form-box">
      <h1>登录</h1>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="login-form"
      >
        <el-form-item label="账号" prop="phone">
          <el-input v-model="ruleForm.phone" type="text" placeholder="请输入您的用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入您的密码" />
        </el-form-item>
        <el-form-item label="身份">
          <el-radio-group v-model="ruleForm.type">
            <el-radio value="user">用户</el-radio>
            <el-radio value="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="router.push('/register')">注册</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
h1 {
  margin: 10px 0 20px 0;
}
.container {
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/img/bg2.png);
  background-position: -450px 5px;
  background-size: cover;
}
.form-box {
  width: 400px;
  height: 300px;
  background-image: url(../assets/img/bg7.png);
  background-position: 130px 485px;
  background-size: cover;
  flex-direction: column;
  background-color: azure;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-button {
    margin: auto;
  }
  border: 2px solid black;
  border-radius: 15px;
}
</style>
