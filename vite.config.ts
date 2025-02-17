import { fileURLToPath, URL } from 'node:url'

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import url from 'node:url'
// import mockServer from './plugins/mock_server'

function mockServer(): Plugin {
  return {
    name: 'mock-server',
    configureServer(server) {
      server.middlewares.use('/login', (req, res) => {
        const parseUrl = url.parse(req.originalUrl!, true /* parseQueryString */).query
        console.log('parseUrl:', parseUrl)
        // res.setHeader('Content-Type', 'application/json')
        // const data = mockjs.mock({
        //   'list|1000': [
        //     {
        //       'id|+1': 1,
        //       name: parseUrl.keyword,
        //       address: '@county(true)',
        //     },
        //   ],
        // })
        res.end('JSON.stringify(data)')
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mockServer(),
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    tailwindcss(),
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
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5173',
  //       // changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //   },
  // },
})
