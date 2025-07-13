# chahan

## 路由权限控制

1. 前端不创建完整路由表, 前端根据后端返回的路由权限, 动态添加路由 `router.addRoute()`,
2. 前端创建完整路由表 [routes.ts](./src/router/routes.ts), 使用路由元信息 `meta` 指定路由权限, 并在路由守卫中校验权限

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
2. 手写单例模式的事件 bus, 发布/订阅
3. 手写 vite 插件
4. 虚拟滚动列表, h 函数
5. 左侧菜单后端动态渲染
6. 递归组件
7. grid 网格布局, 缓存滚动位置
8. web worker
9. 全局 toast (使用 vue 插件, 全局 provide/inject 两种方式实现)

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
- [ToastIndex.vue](./src/components/toast/ToastIndex.vue)
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

参考 [DraggableWindow](src/views/order/components/DraggableWindow.vue)
