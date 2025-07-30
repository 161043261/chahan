import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import viteServer from './plugins/vite-server'
import { visualizer } from 'rollup-plugin-visualizer'
import createJsonFiles from './plugins/create-json'

// https://vite.dev/config/
export default defineConfig((/** { command, mode } */) => {
  // console.log('command:', command) // command: serve
  // console.log('mode:', mode) // mode: development
  // const envDir = process.cwd()
  // const env = loadEnv(mode, envDir, 'CHAHAN')
  //// env: { CHAHAN_PROJECT_ID: '161043261' }
  // console.log('env:', env)

  return {
    plugins: [
      viteServer(),
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
      // ./plugins/assets/robot-list.json
      // ./plugins/assets/order-list.json
      createJsonFiles(),
      visualizer({ open: true }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern', // 清除 legacy-js-api 警告
        },
      },
    },
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:5173',
          // changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, '/api'),
        },
      },
    },
    build: {
      // 代码块 (chunk) 大小 >2000 KiB 时警告
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: true, // 开启 CSS 拆分
      sourcemap: false, // 不生成源代码映射文件 sourcemap
      minify: 'esbuild', // 最小化混淆, esbuild 打包速度最快, terser 打包体积最小
      cssMinify: 'esbuild', // CSS 最小化混淆
      assetsInlineLimit: 5000, // 静态资源大小 <5000 Bytes 时, 将打包为 base64
    },
  }
})
