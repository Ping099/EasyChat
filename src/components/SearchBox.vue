<script setup>
import { Calendar, Search, CirclePlusFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <el-affix :offset="0">
    <el-card>
      <el-space alignment="start" :size="12" style="width: 100%">
        <el-input v-model="input" tyle="width: 100%" placeholder="搜索" :prefix-icon="Search" />
        <slot name="add"></slot>
      </el-space>
    </el-card>
  </el-affix>
</template>
