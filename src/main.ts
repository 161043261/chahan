import '@/assets/style.css'
import '@/assets/global.scss'
import 'animate.css'

import 'element-plus/dist/index.css'
import '@icon-park/vue-next/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// 副作用导入路由守卫文件
import '@/router/guard'

// todo: 使用 vite 插件
// import '@/mock'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
