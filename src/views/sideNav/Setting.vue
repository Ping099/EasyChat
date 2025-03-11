<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { StarFilled, Edit, User, EditPen, Message, Location } from '@element-plus/icons-vue'
const route = useRoute()
import { useUserStore } from '@/stores'
const userStore = useUserStore()

const username = ref(userStore.username)
const phone = ref(userStore.phone)
const avatar = ref(userStore.Url)
const email = ref(userStore.email)
const address = ref(userStore.address)
const motto = ref(userStore.motto)
const sex = ref(useUserStore.sex)
const id = userStore.id
import { ElMessageBox } from 'element-plus'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const drawer = ref(false)
const drawer2 = ref(false)

const radio1 = ref('Option 1')
const handleClose = (done) => {
  ElMessageBox.confirm('确认退出编辑吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive(userStore.user)

import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const imageUrl = ref(avatar.value)
const handleAvatarSuccess = (response, uploadFile) => {
  console.log('上传成功', response.data)
  console.log('上传成功2', uploadFile)
  //存入本地
  userStore.setUrl(imageUrl.value)
  // imageUrl.value = new URL('C:\\Users\\10200\Desktop\\img\\6.png', import.meta.url).href
  // URL.createObjectURL(uploadFile.raw)
}
// 图片显示
import { postAvatarApi } from '@/api/user'
// 创建一个FormData对象
const file = new FormData()
const handChange = async (nowfile) => {
  console.log('文件改变', nowfile.raw)

  // 将File对象添加到FormData中
  file.set('file', nowfile.raw)
  file.append('user', id)
  // imgUrl.value = URL.createObjectURL(file.raw)
  const reader = new FileReader()
  // FileReader对象的readAsDataURL方法可以将读取到的文件编码成Data URL。
  reader.readAsDataURL(nowfile.raw)

  reader.onload = () => {
    imageUrl.value = reader.result
    form.avatar = nowfile.raw
  }
}
const beforeAvatarUpload = (rawFile) => {}
//提交表单
import { putHandApplyApi } from '@/api/friend'
import { putUpdateUserApi } from '@/api/user'
const onSubmit = async () => {
  console.log('submit!', form)
  if (imageUrl.value) {
    const res1 = await postAvatarApi(id, file)
    console.log('上传头像请求', res1)
    imageUrl.value = res1.data
    userStore.setUrl(imageUrl.value)
  }
  const res = await putUpdateUserApi(form)
  console.log('修改结果', res)
  proxy.$message.success('修改成功！')
  drawer.value = false
  userStore.getUser(id)
}
const onClose = () => {
  drawer.value = false
}

const url = ref(userStore.Url)
onMounted(() => {})
</script>
<template>
  <el-container>
    <el-main>
      <el-container>
        <el-aside width="200px"> <el-avatar :size="100" :src="url" /></el-aside>
        <el-main class="main">
          <el-row :gutter="20">
            <el-col :span="4">
              {{ username }}
            </el-col>
            <el-col :span="14">
              <el-icon><Edit /></el-icon
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              {{ phone }}
            </el-col>
            <el-col :span="14"> </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-divider> </el-divider>
      <el-main class="main-msg">
        <el-row :gutter="5">
          <el-col :span="1">
            <el-icon><User /></el-icon
          ></el-col>
          <el-col :span="20"> {{ sex }}</el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="1">
            <el-icon><EditPen /></el-icon
          ></el-col>
          <el-col :span="20"> 个性签名：{{ motto ? motto : '天天开心' }}</el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="1">
            <el-icon><Location /></el-icon>
          </el-col>
          <el-col :span="20"> 地址：{{ address ? address : '湖南省株洲市' }}</el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="1">
            <el-icon><Message /></el-icon>
          </el-col>
          <el-col :span="20"> 邮箱：{{ email ? email : '1020067341@qq.com' }}</el-col>
        </el-row>
        <el-divider
      /></el-main>
      <el-footer
        ><el-button @click="drawer = true">编辑</el-button>
        <el-button type="primary" @click="drawer = true">确认</el-button></el-footer
      ></el-main
    >

    <el-drawer
      v-model="drawer"
      title="编辑个人信息"
      direction="ltr"
      :size="550"
      :inline="true"
      :before-close="handleClose"
    >
      <!-- :action="`http://localhost:8080/user/avatar/${id}`" -->
      <!-- 编辑内容 -->
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <div class="avatar-box" style="text-align: center; margin: 10px, 0">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-Change="handChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <el-form-item label="昵称">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="手机">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择您的性别">
            <el-option label="女" value="女" />
            <el-option label="男" value="男" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker
              v-model="form.day"
              type="date"
              placeholder="选择您的生日"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <!-- <el-form-item label="多选">
          <el-checkbox-group v-model="form.type">
            <el-checkbox value="Online activities" name="type"> Online activities </el-checkbox>
            <el-checkbox value="Promotion activities" name="type">
              Promotion activities
            </el-checkbox>
            <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
            <el-checkbox value="Simple brand exposure" name="type">
              Simple brand exposure
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="form.motto" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-container>
</template>
<style scoped>
.el-aside {
  width: auto;
}
.main {
  text-align: left;
  h3 {
    font-weight: bolder;
    font-size: 20px;
  }
  p {
    padding: 10px 0px;
    box-sizing: border-box;
  }
}
.main-msg {
  color: gray;

  font-size: 12px;
}
.el-row {
  height: 25px;
}
.motto {
  text-align: right;
}
.avatar-box {
  margin-bottom: 20px;
}
.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  display: block;
  margin: auto;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
