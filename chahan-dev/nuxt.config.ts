// https://nuxt.com/docs/api/configuration/nuxt-config
import type { ViteConfig } from 'nuxt/schema'

export const viteConfig: ViteConfig = {
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@use "~/assets/scss/global.scss";',
      },
    },
  },
}

// Nuxt 配置
export default defineNuxtConfig({
  imports: {
    autoImport: true,
    // 为自己的代码禁用自动导入
    scan: false,
  },

  devtools: { enabled: true },

  typescript: {
    strict: true,
  },

  $production: {
    /** 生产环境的环境变量 */
  },

  $development: {
    /** 开发环境的环境变量 */
  },

  $meta: {
    /** 元数据 */
  },

  // 使用 const runtimeConfig = useRuntimeConfig() 获取
  // nuxt.config.ts 中定义的 runtimeConfig
  runtimeConfig: {
    // 只在服务器端可用的私有键
    myServerToken: '',

    public: {
      // public 中的键在客户端也可用
      myToken: '',
    },

    redis: {
      host: '',
      port: 0,
    },

    mongoose: {
      uri: process.env.MONGODB_URI,
      devtools: true,
      // server/models, 用于 autoImport
      modelsDir: 'models',
    },
  },

  //! nuxt 使用 tailwindcss
  //! 导入 element-plus 样式表
  css: [
    'animate.css',
    'element-plus/dist/index.css',
    '~/assets/css/tailwind.css',
    '~/assets/scss/global.scss',
  ],

  vite: viteConfig,

  // Nuxt 自带 postcss
  postcss: {
    plugins: {},
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    // 开启布局过渡
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    'nuxt-mongoose',
    './modules/auth.module',
  ],
  compatibilityDate: '2025-03-14',
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },
})
