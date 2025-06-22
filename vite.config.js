import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  //仅构建阶段的插件
  build: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
      manualChunks(id) {
        //静态资源分拆打包
        if (id.includes('node_modules/tinymce/')) return 'tinymce'
      },
      plugins: [
        visualizer({ open: true }), // 构建后生成打包分析报告
        //   // gzip压缩 生产环境生成 .gz 文件
        // viteCompression({
        //   verbose: true,
        //   disable: false,
        //   threshold: 10240,
        //   algorithm: 'gzip',
        //   ext: '.gz'
        // })
        viteCompression({
          algorithm: 'gzip',
          threshold: 10240,
          verbose: true, // 是否在控制台中输出压缩结果
          ext: '.gz',
          deleteOriginFile: true, // 源文件压缩后是否删除
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 配置服务器的代理设置
  server: {
    // 代理配置，用于重定向请求到其他服务器
    proxy: {
      // 定义一个代理规则，将/hello-world路径下的请求代理到指定的目标服务器
      '/api': {
        // 目标服务器的地址
        target: 'http://localhost:8080',
        // 更改请求的origin为代理服务器的origin，以便与目标服务器交互
        changeOrigin: true,
        // 重写请求路径，移除/hello-world前缀
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
