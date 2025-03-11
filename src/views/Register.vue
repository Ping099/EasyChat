<script setup>
import { getUserApi, postUserRegisterApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'

const getUser = async () => {
  const res = await getUserApi()
  console.log(res, '?')
}
import { ref } from 'vue'
// const rules = reactive({
//   password: [{ validator: validatePass2, trigger: 'blur' }],
//   username: [{ validator: validatePass1, trigger: 'blur' }],
// })
const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 18, message: '长度在2-18', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
  ],
  repassword: [
    {
      required: true,
      message: '密码不能为空',
    },
  ],
  phone: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blue',
    },
  ],
})
const ruleFormRef = ref()
const ruleForm = ref({ username: '', password: '', repassword: '', phone: '', type: 'user' })

const submitForm = (formEl) => {
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
//注册用户
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { useRouter } from 'vue-router'
const router = useRouter()
// const message = instance.appContext.config.globalProperties.message
const register = async (el) => {
  console.log('注册信息->后端', ruleForm.value)
  const res = await postUserRegisterApi(ruleForm.value)
  console.log('注册相应信息', res)

  proxy.$message.success('注册成功！')
  router.push('/login')
}
</script>
<template>
  <div class="container">
    <div class="form-box">
      <h1>注册</h1>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="login-form"
      >
        <el-form-item label="昵称" prop="username">
          <el-input v-model="ruleForm.username" type="text" placeholder="请输入您的用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入您的密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input
            v-model="ruleForm.repassword"
            type="password"
            placeholder="请再次输入您的密码"
          />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" type="password" placeholder="请输入您的电话号码" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" plain @click="submitForm(ruleFormRef)"> 登录 </el-button>
          <el-button type="danger" @click="register(ruleFormRef)">注册</el-button>
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
  /* background-image: url(../assets/img/bg2.png); */
  background-position: -450px 5px;
  background-size: cover;
}
.form-box {
  width: 500px;
  height: 400px;
  background-image: url(../assets/img/bg3.png);
  /* background-position: 130px 485px; */
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
