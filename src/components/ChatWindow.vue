<script setup>
import { onMounted, onUnmounted } from 'vue'
import tinymce from 'tinymce'
import MyChat from '@/components/MyChat.vue'
import OtherChat from './OtherChat.vue'
import { useRoute } from 'vue-router'
import { defineProps, reactive } from 'vue'

import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
const props = defineProps({
  note: String,
  username: String,
  urlavatar: String,
  getFriendChat: Function,
  fId: Number,
})
var num = 0
const userStore = useUserStore()
const route = useRoute()
console.log('当前路由', route.params.id)
const fId = ref(route.params.id)
const myId = ref(userStore.id)
// props.getFriendChat()

const url = ref(userStore.Url)
//获取历史消息记录模块
import { getChatDetailApi } from '@/api/chat'
var mesList = ref()
const getChatDetail = async () => {
  console.log('当前id', fId.value)
  if (fId.value) {
    console.log('发送请求fid', fId.value)
    const res = await getChatDetailApi(myId.value, fId.value)
    console.log('历史消息记录', res.data)
    mesList.value = res.data

    console.log('当前历史记录', mesList.value)
  }
}
getChatDetail()
//获取对话框好友的详细资料
import { getFriendDetailApi } from '@/api/friend'
const getFriendDetail = async () => {
  const res = await getFriendDetailApi(fId.value, myId.value)
  console.log('好友详细资料', res)
  return res.data
}

//即时通讯封装版
import { WebSocketClient } from '@/utils/ws'
const ws = new WebSocketClient('ws://localhost:8080/chat')

// 连接
ws.connect()

ws.onclose(() => {})

ws.onerror(() => {})

const sendWs = (Msg) => {
  const obj = {
    content: Msg,
    toId: fId.value,
    fromId: myId.value,
  }
  const json = JSON.stringify(obj)
  console.log('前端开始向后端发送消息[封装版]:', json)
  ws.send(json)
  mesList.value.push(Msg)
  tinymce.activeEditor.setContent('')
}

// 同原生方法
ws.onmessage((e) => {
  // console.log(e)
  const res = JSON.parse(e.data).msg
  console.log('chat后端消息:', res)

  if (res) mesList.value.push(res)
})

ws.onopen(() => {
  console.log('ws连接成功！(封装版)')
})
const note = ref('')
watch(
  () => route.params,
  async (newParams, oldParams) => {
    console.log('路由变化', newParams, oldParams)
    fId.value = newParams.id
    const res = await getFriendDetail()
    if (res && res.note != undefined && res.note != null) {
      console.log('好友备注', res.note)
      note.value = res.note
    }

    const chat = await getChatDetail()
    tinymce.init(options)
  },
  { deep: true },
)
const but = ref(null)
const options = {
  selector: '#mytiny',

  license_key: 'gpl',
  // branding: false,
  //状态栏
  statusbar: false,
  // menubar: false,
  toolbar: true,
  //皮肤
  skin: 'myskin',
  // skin_url: '/chat/myskin', //mysin/skin.min.css  myskin/content.min.css
  // content_css: '/mycontent.css',
  language: 'zh_CN',
  height: '200px',
  plugins: 'image table',
  toolbar: 'undo redo |copy |cut    |upload|table| image|code | bold',
  menubar: true,
  menubar: 'file edit insert view format table tools help',
  menu: {
    file: {
      title: 'File',
      items:
        'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations',
    },
    edit: {
      title: 'Edit',
      items: 'undo redo | cut copy paste pastetext | selectall | searchreplace',
    },
    view: {
      title: 'View',
      items:
        'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments',
    },
    insert: {
      title: 'Insert',
      items:
        'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
    },
    format: {
      title: 'Format',
      items:
        'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat',
    },
    tools: {
      title: 'Tools',
      items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount',
    },
    table: {
      title: 'Table',
      items: 'inserttable | cell row column | advtablesort | tableprops deletetable',
    },
  },
  plugins: ' image code table ',
  setup(editor) {
    console.log('编辑器', editor)
    editor.ui.registry.addButton('upload', {
      icon: 'new-document',
      tooltip: '大文件上传',
      onAction: () => {
        console.log('点击触发')
        but.value.click()
      },
    })
  },
}

import { nextTick } from 'vue'
const isEditorVisible = ref(false)
onMounted(() => {
  console.log('编辑器初始化！！！！！！！')
  tinymce.init(options)
  isEditorVisible.value = true
})

onUnmounted(() => {
  // tinymce.destroy()
})
//发送
const send = () => {
  //获取富文本编辑器内容
  const sendMsg = tinymce.activeEditor.getContent({ format: 'text' })
  console.log('点击发送', sendMsg)
  sendWs(sendMsg)
}

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview = (file) => {
  console.log(file)
}
const scrollContent = ref()
// const handleScroll = () => {
//   const content = scrollContent.value
//   const scrollTop = content.scrollTop
//   const clientHeight = content.clientHeight
//   const scrollHeight = content.scrollHeight
//   if (scrollTop + clientHeight === scrollHeight) {
//     // 滚动条已经滚动到底部，可以执行相关操作
//   }
// }
//文件合并
import { getMergeApi } from '@/api/file'
const merge = async (id, fileName, silceNum) => {
  console.log('开始合并-----')
  console.log('合并', fileName, silceNum)
  const res = await getMergeApi(id, fileName, silceNum)
  console.log('合并结果', res)
}
//文件上传
import axios from 'axios'
const isFile = ref(false)
const sel = () => {
  isFile.value = !isFile.value
}
var formData = new FormData()
import { postFileUploadApi } from '@/api/file'

const handChange = async (file) => {
  file = file.raw
  console.log('文件改变', file)
  // // 将File对象添加到FormData中
  // formData.set('file', file.raw)
  // const res = await postFileUploadApi(formData)
  // console.log('文件上传结果', res)
  const silceList = []
  var totalFile = file.size //文件大小
  var sliceSize = 1024 * 300 //分片大小
  var silceNum = Math.ceil(totalFile / sliceSize)
  console.log('总分片数', silceNum)
  var start = 0
  while (start < totalFile) {
    const sliceFile = file.slice(start, start + sliceSize)
    silceList.push(sliceFile)
    start += sliceSize
  }

  sendFile(silceList, file, silceNum, sliceSize)
}
import { getCheckApi } from '@/api/file'
// import { tr } from 'element-plus/es/locale'
const sendFile = async (silceList, file, silceNum, sliceSize) => {
  console.log('总文件', file)
  //处理切片的数据格式
  let formDataList = silceList.map((item, index) => {
    let formData = new FormData()
    formData.append('file', item) //切片文件信息
    formData.append('sliceIndex', index) //切片下标索引
    formData.append('fileName', file.name) //完整文件名
    formData.append('sliceName', index) //切片名
    formData.append('silceNum', silceNum) //总分片数量
    formData.append('totalSize', file.size) //文件总大小
    formData.append('silceSize', sliceSize) //分片大小
    formData.append('id', file.lastModified) //最后修改的时间戳
    console.log('切片文件', index, item)
    console.log('分片数量', silceNum)
    console.log('文件id', file.lastModified)
    return formData
  })
  const newFormDataList = []
  for (let index = 0; index < formDataList.length; index++) {
    const item = formDataList[index]
    console.log('检查分片', index)
    const isUpload = await getCheckApi(file.lastModified, index)
    if (!isUpload.data) {
      newFormDataList.push(item)
    }
  }
  formDataList = newFormDataList
  //处理并发
  console.log('数组大小2', formDataList.length)
  const requestList = formDataList.map(async (item, index) => {
    // console.log('查看请求参数', item, index)
    // const res = await postFileUploadApi(item)
    // console.log('分别请求处理', res)
    // if (index == silceNum - 1) merge(file.lastModified, file.name, silceNum)
    return axios({
      url: 'http://localhost:8080/file/upload',
      data: item,
      method: 'POST',
    })
  })

  await Promise.all(requestList)
    .then((res) => {
      //切片上传成功 通知后端合并切片
      console.log('上传结果', res)
      merge(file.lastModified, file.name, silceNum)
      // merge(id, file.name, silceNum)
    })
    .catch((err) => {
      //上传出错
      // handFile()
    })
}

// const markSliceUpload=(index)=>{
//   return localStorage.setItem(`sliceFile_${index}`, "true");
// }
// const isSliceUpload=(index)=>{
//   return localStorage.getItem(`chunkUploaded_${index}`) === "true";
// }
// watch(route.params.id, (newId, oldId) => {
//   console.log('路由id变化', newId, oldId)
// })
</script>
<template>
  <el-container>
    <el-header>
      <el-card>
        {{ props.note ? props.note : props.username }}
      </el-card></el-header
    >
    <el-scrollbar height="340px">
      <el-main id="main" ref="scrollContent">
        <div v-for="(item, index) in mesList" :key="item.id">
          <MyChat v-if="item.fromId === myId" :content="item.content" :key="item.id"> </MyChat>
          <OtherChat
            v-if="item.fromId !== myId"
            :content="item.content"
            :urlavatar="urlavatar"
            :key="item.id"
          ></OtherChat>
        </div>
      </el-main>
    </el-scrollbar>

    <el-footer>
      <div class="file-area" v-show="isFile">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :on-Change="handChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
        >
          <button ref="but" style="opacity: 0">选择文件</button>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template>
        </el-upload>
      </div>
      <div id="mytiny" class="texft-area"></div>
      <el-button type="primary" class="file-but" :onclick="sel">文件列表</el-button>
      <el-button type="primary" class="but" :onclick="send">发送</el-button>
    </el-footer>
  </el-container>
</template>
<style scoped>
.el-container {
  margin: 0px;
  padding: 0px;
}
.el-header {
  padding: 0px;
  margin: 0px;
}
.el-footer {
  height: 200px;
  padding: 0px;
  /* background-color: rgb(176, 176, 176); */
  position: relative;
  .but {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .file-but {
    position: absolute;
    bottom: 20px;
    right: 90px;
  }
}
.my-box {
  margin: 5px 0;
  height: auto;
  width: 100%;
  float: right;
  position: relative;
  .el-space {
    float: right;
  }
  .avatar {
    float: right;
  }
  .content {
    float: right;
    max-width: 250px;
    overflow-wrap: break-word;
    white-space: normal;
    min-height: 40px;
    line-height: 40px;
    background-color: rgb(91, 165, 108);
    border-radius: 50px;
    box-sizing: border-box;
    padding: 13px 18px;
  }
}
</style>
