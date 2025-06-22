<template>
  功能
  <div class="function-box">
    <section class="file-section">
      下载后端传输文件
      <input type="file" @change="fileChange" placeholder="请选择需要上传的文件" />
    </section>
    <section class="copy-section">文件复制粘贴拖拽</section>
    <section class="preview-section">文件预览</section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// 定义一个异步函数 clipboardImage，用于将图片复制到剪贴板
async function clipboardImage(imageBlob) {
  // 检查 imageBlob 是否存在，如果不存在则直接返回
  try {
    if (!imageBlob) return

    // 创建一个 ClipboardItem 对象，指定数据类型为 'image/png' 并传入 imageBlob
    const clipboardItem = new ClipboardItem({ 'image/png': imageBlob })

    // 使用 navigator.clipboard.write 方法将 ClipboardItem 写入系统剪贴板
    await navigator.clipboard.write([clipboardItem])

    // 如果写入成功，使用 ElMessage 组件显示成功提示信息
    ElMessage({
      message: '照片已复制到剪贴板',
      type: 'success',
    })
  } catch (error) {
    // 如果发生错误，打印错误信息到控制台
    console.error('复制照片失败:', error)

    // 使用 ElMessage 组件显示错误提示信息
    ElMessage({
      message: '复制照片失败',
      type: 'error',
    })
  }
}

// 获取文件
const fileChange = (e) => {
  console.log(e.target.files[0])
  const file = e.target.files[0]
  console.log('文件类型', file.type)
  if (file.type === 'image/png') {
    clipboardImage(file) // 使用浏览器粘贴到剪贴板的时候目前只支持 image/png 格式的图片
    return
  }
  const img = new Image()
  const url = URL.createObjectURL(blob)
  img.src = url

  img.onload = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('无法获取Canvas上下文')
    }

    ctx.drawImage(img, 0, 0)

    canvas.toBlob(async (canvasBlob) => {
      if (!canvasBlob) {
        throw new Error('无法将Canvas内容转换为Blob')
      }

      clipboardImage(canvasBlob)

      URL.revokeObjectURL(url)
    }, 'image/png')
  }
  img.onerror = () => {
    URL.revokeObjectURL(url)
    ElMessage({
      message: '加载图像失败',
      type: 'error',
    })
  }
}
</script>
<style scoped>
.function-box {
  display: flex;
  justify-content: center;
}
.file-section,
.copy-section,
.preview-section {
  width: 200px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 20px;
}
</style>
