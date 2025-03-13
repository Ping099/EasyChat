<template>
  功能
  <div class="function-box">
    <section class="file-section">下载后端传输文件
      <input type="file" @change="fileChange" placeholder="请选择需要上传的文件"/>
    </section>
    <section class="copy-section">文件复制粘贴拖拽</section>
    <section class="preview-section">文件预览</section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
async function clipboardImage(imageBlob) {
  try {
    if (!imageBlob) return;
    const clipboardItem = new ClipboardItem({ 'image/png': imageBlob });

    await navigator.clipboard.write([clipboardItem]);

    ElMessage({
      message: '照片已复制到剪贴板',
      type: 'success',
    });
  } catch (error) {
    console.error('复制照片失败:', error);
    ElMessage({
      message: '复制照片失败',
      type: 'error',
    });
  }
}

// 获取文件
const fileChange = (e) => {

  console.log(e.target.files[0])
  const file = e.target.files[0]
  console.log("文件类型",file.type)
  if (file.type === 'image/png') {
  clipboardImage(file); // 使用浏览器粘贴到剪贴板的时候目前只支持 image/png 格式的图片
  return;
}
}
</script>
<style scoped>
.function-box {
  display: flex;
  justify-content: center
}
.file-section,.copy-section,.preview-section {
  width: 200px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 20px;
}
</style>
