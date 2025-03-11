<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  // router.push('/admin')
  router.push(key)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/admin/broad">广播消息</el-menu-item>
          <el-sub-menu index="2">
            <template #title>用户管理</template>
            <el-menu-item index="/admin/user">用户</el-menu-item>
            <el-menu-item index="/admin/manager">管理员</el-menu-item>
          </el-sub-menu>
        </el-menu></el-header
      >
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>
