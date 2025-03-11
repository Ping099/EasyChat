<script setup>
import { defineProps, ref, onMounted, reactive, toRef } from 'vue'
const props = defineProps({
  content: String,
  urlavatar: String,
})
var content = props.content
</script>
<template>
  <div class="box">
    <el-space alignment="start" :size="20">
      <el-avatar
        :size="50"
        :src="
          urlavatar
            ? urlavatar
            : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        "
      />
      <div class="content">
        {{ content }}
      </div></el-space
    >
  </div>
</template>
<style scoped>
.box {
  margin: 5px 0;
  height: auto;
  width: 100%;
  float: left;
  .content {
    max-width: 250px;
    overflow-wrap: break-word;
    white-space: normal;
    min-height: 40px;
    line-height: 40px;
    background-color: rgb(182, 182, 182);
    border-radius: 50px;
    box-sizing: border-box;
    padding: 13px 18px;
  }
}
</style>
