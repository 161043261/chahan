# <em>chahan</em>

## 按需引入 element-plus

```bash
pnpm add -D element-plus
pnpm add -D unplugin-vue-components unplugin-auto-import
```

vite.config.ts

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

main.ts

```ts
import 'element-plus/dist/index.css'
```

## Vite 项目集成 tailwind-css

```bash
pnpm install tailwindcss @tailwindcss/vite -D
```

vite.config.ts

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss()],
})
```

@/assets/style.css

```css
@import 'tailwindcss';
```

main.ts

```css
import '@/assets/style.css'
```

## Vite 项目使用 mock.js

```bash
pnpm add mockjs @types/mockjs -D
```

## 路由权限控制

1. 前端不创建完整路由表, 在包含路由信息的 JSON 文件 [menu_table.jsonc](./src/mock/menu_table.jsonc) 中, 使用路由元信息 `meta` 指定路由权限, 前端根据后端返回的权限, 过滤对应权限的路由, 动态添加路由 `router.addRoute()`, 
2. 前端创建完整路由表 [router_table.ts](./src/router/route_table.ts), 并使用路由元信息 `meta` 指定路由权限; 在路由守卫中校验权限
