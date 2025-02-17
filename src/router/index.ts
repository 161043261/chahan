import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/route_table'

const router = createRouter(
  {
    history: createWebHistory(),
    routes,
  } /** RouterOptions */,
)

export default router
