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
pnpm i prettier-plugin-tailwindcss -D
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

1. 前端不创建完整路由表, 前端根据后端返回的路由权限, 动态添加路由 `router.addRoute()`,
2. 前端创建完整路由表 [route_table.ts](./src/router/route_table.ts), 使用路由元信息 `meta` 指定路由权限, 并在路由守卫中校验权限

## 响应式布局

|     |             |                   |
| --- | ----------- | ----------------- |
| xs  | extra small | <768px 超小屏幕   |
| sm  | small       | >=768px 小屏幕    |
| md  | middle      | >=992px 中等屏幕  |
| lg  | large       | >=1200px 大屏幕   |
| xl  | extra large | >=1920px 超大屏幕 |

## ttf2woff2

```bash
pnpm install ttf2woff2 -g
cat Chahan.ttf | ttf2woff2 > Chahan.woff2
```

## 亮点

1. vue3, vue-router@4, pinia, tailwindcss, animate.css, element-plus, echarts
2. 手写事件总线, 发布/订阅
3. 手写 vite 插件
4. 虚拟滚动列表
5. 自定义 hooks: useChart, usePagination
6. 左侧菜单是后端动态渲染的
7. 递归组件
8. 网格布局

```bash
find . \( -name "*.js" -o -name "*.ts" -o -name "*.vue" -o -name "*.css" -o -name "*.sass" \) \
  -and \( -not -path "./node_modules/*" -and -not -path "./dist/*" \) \
  -exec wc -l {} + | awk '{ sum += $1 } END { print sum }'
```

## provide/inject

### 祖先组件

```ts
const virtualListSize = ref(0);
provide("virtual-list-size" /** key */, virtualListSize /** value */);
```

### 子孙组件

```ts
const virtualListSize = inject<Ref<number>>('virtual-list-size', ref(0) /** defaultVal */)

const largeList = ref(await props.getLargeList())
virtualListSize.value = largeList.value.length
```
