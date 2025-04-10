## <em>Deja Vu</em>

## _Despacito_

```bash
# element-plus
pnpm add element-plus @element-plus/nuxt -D

# eslint
pnpm add -D @nuxt/eslint-config eslint

# tailwindcss
pnpm add -D @nuxtjs/tailwindcss
```

### 当前存在的问题

- 空白页
- 导航条
- sessionStorage 缓存 menuList 等 (注意 SSR)

### Bug

> 使用 `import.meta.client` 判断是否为客户端

收到警告 Server rendered element contains fewer child nodes than client vdom.
