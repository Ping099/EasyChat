// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/resize.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import pinia from '@/stores/index'
import tinymce from 'tinymce'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 全局挂载Message方法
app.config.globalProperties.$message = ElMessage
// app.use(ElementPlusIconsVue)
app.mount('#app')
