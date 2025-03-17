# <em>chahan</em>

## Current Migration

- [EmptyIndex.vue](src/views/EmptyIndex.vue)
- [LoginIndex.vue](src/views/LoginIndex.vue) -> [login_index.tsx](src/views/login_index.tsx)
- [NotFound.vue](src/views/NotFound.vue) -> [not_found.tsx](src/views/not_found.tsx)

### components

- [AsideMenu.vue](src/components/aside/AsideMenu.vue) -> [aside_menu.tsx](src/components/aside/aside_menu.tsx)
- [RecursiveChild.vue](src/components/aside/RecursiveChild.vue) -> [recursive_child.tsx](src/components/aside/recursive_child.tsx)
- [HeaderIndex.vue](src/components/header/HeaderIndex.vue) -> [header_index.tsx](src/components/header/header_index.tsx)
- [HeaderTabs.vue](src/components/header/HeaderTabs.vue) -> [header_tabs.tsx](src/components/header/header_tabs.tsx)
- [MapContainer.vue](src/components/map/MapContainer.vue)
- [ToastIndex.vue](src/components/toast/ToastIndex.vue) -> [toast_index.tsx](src/components/toast/toast_index.tsx)
- [ProgressBar.vue](src/components/ProgressBar.vue)
- [VirtualList.vue](src/components/VirtualList.vue) -> [virtual_list.tsx](src/components/virtual_list.tsx)

### layouts

- [LayoutIndex.vue](src/layouts/LayoutIndex.vue) -> [layout_index.tsx](src/layouts/layout_index.tsx)
- [LayoutTab.vue](src/layouts/LayoutTab.vue) -> [layout_tab.tsx](src/layouts/layout_tab.tsx)

### views

- [AdsIndex.vue](src/views/ads/AdsIndex.vue)
- [RobotGrid.vue](src/views/chahan/RobotGrid.vue)
- [ChahanIndex.vue](src/views/chahan/ChahanIndex.vue)
- [RobotGrid.vue](src/views/chahan/RobotGrid.vue)
- [ChahanDialog.vue](src/views/chahan/components/ChahanDialog.vue)
- [RobotCard.vue](src/views/chahan/components/RobotCard.vue)
- [DashboardIndex.vue](src/views/dashboard/DashboardIndex.vue) -> [dashboard_index.tsx](src/views/dashboard/dashboard_index.tsx)
- [RecursiveChild.vue](src/views/dashboard/RecursiveChild.vue) -> [recursive_child.tsx](src/views/dashboard/recursive_child.tsx)
- [MapIndex.vue](src/views/map/MapIndex.vue)
- OrderAdd.vue [TODO] -> [order_add.tsx](src/views/order/order_add.tsx)
- OrderDetail.vue [TODO] -> [order_detail.tsx](src/views/order/order_detail.tsx)
- [OrderIndex.vue](src/views/order/OrderIndex.vue)
- [DraggableWindow.vue](src/views/order/components/DraggableWindow.vue) -> [draggable_window.tsx](src/views/order/components/draggable_window.tsx)
- [PersonalIndex.vue](src/views/personal/PersonalIndex.vue)
- [SystemIndex.vue](src/views/system/SystemIndex.vue)

### Canvas

- [CanvasDemo.vue](src/assets/CanvasDemo.vue)

## Vue 项目使用 tsx

- [layout_tab.tsx](src/layouts/layout_tab.tsx) h 函数, 插槽
- [order_detail.tsx](src/views/order/order_detail.tsx) 插槽

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

## 亮点

1. vue3, vue-router@4, pinia, tailwindcss, animate.css, element-plus, echarts, 高德地图
2. 手写事件总线, 发布/订阅
3. 手写 vite 插件
4. 虚拟滚动列表, tsx, h 函数
5. 左侧菜单后端动态渲染
6. 递归组件
7. 网格布局, 缓存滚动位置
8. web_worker, 参考 [web_worker.js](public/web_worker.js)
9. 全局 toast (两种方式)
10. 迁移到 tsx (进行中)
11. 迁移到 Nuxt (进行中)

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

## 全局 toast

两种方式: `app.config.globalProperties/vuePlugin` 和 `app.provide/inject` 实现全局 toast, 参考

- [toast.ts](./src/components/toast/toast.ts)
- [ToastIndex.ts](./src/components/toast/ToastIndex.vue)
- [main.ts](./src/main.ts)
- [使用示例](./src/views/dashboard/DashboardIndex.vue)

## 路由传参

### query

```ts
router.push({
  path: '/register',
  // name: 'Register', // 不需要指定路由组件的名字
  // query: URL 查询参数 http://localhost:5173/register?name=item1&price=1000&id=1
  query: item,
  state: item, // window.history.state = item
})
```

### params

```ts
router.push({
  name: 'RegisterWithId', // 必须指定路由组件的名字
  // params: URL 路径参数 http://localhost:5173/register/1
  params: {
    id: item.id,
  },
})
```

## 自定义指令: 可拖拽窗口

参考 [DraggableWindow.vue](src/views/order/components/DraggableWindow.vue), [draggable_window.tsx](src/views/order/components/draggable_window.tsx)
