# <em>chahan</em>

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

1. vue3, vue-router@4, pinia, tailwindcss, animate.css, element-plus, echarts, 高德地图
2. 手写事件总线, 发布/订阅
3. 手写 vite 插件
4. 虚拟滚动列表
5. 左侧菜单是后端动态渲染的
6. 递归组件
7. 网格布局
8. web_worker
9. 缓存滚动位置
10. 全局 toast

## provide/inject

### 祖先组件

```ts
const virtualListSize = ref(0)
provide('virtual-list-size' /** key */, virtualListSize /** value */)
```

### 子孙组件

```ts
const virtualListSize = inject<Ref<number>>('virtual-list-size', ref(0) /** defaultVal */)

const largeList = ref(await props.getLargeList())
virtualListSize.value = largeList.value.length
```

## husky

husky 是一个 git hook 工具

- preinstall -> install -> postinstall
- prestart -> start -> poststart
- pretest -> test -> posttest
- prebuild -> build -> postbuild
- prepublish/prepare -> prepublishonly -> publish -> postpublish
- preuninstall -> uninstall -> postuninstall
- prestop -> stop -> poststop
- prepublish/prepare: 在 publish 或 install 时执行

- prepublishonly: 只在 publish 时执行
- 可以使用 -- 传递参数
- 对于 npm, 预定义脚本不需要加 run, 自定义脚本需要加 run

```bash
pnpm add husky -D
pnpm exec husky init
```

## 全局 toast

两种方式: `app.config.globalProperties/vuePlugin` 和 `app.provide/inject` 实现全局 toast, 参考

- [toast.ts](./src/components/toast/toast.ts)
- [ToastIndex.ts](./src/components/toast/ToastIndex.vue)
- [main.ts](./src/main.ts)
- [使用示例](./src/view/dashboard/DashboardIndex.vue)
