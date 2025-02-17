import Mock, { type MockjsRequestOptions } from 'mockjs'
import adminMenu from '@/mock/admin_menu.json'
import userMenu from '@/mock/user_menu.json'

Mock.setup({
  timeout: '200-600', // 设置延迟时间
})

// 登录接口
Mock.mock('https://chahan.com/login', 'post', (options: MockjsRequestOptions) => {
  const { username, password } = JSON.parse(options.body)
  if (username === 'admin' && password === '1111') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        // todo: JWT
        token: 'chahan.com',
        user: {
          nickname: '蛋炒饭之神',
          roles: ['admin'],
        },
        menuList: adminMenu,
      },
    }
  } else if (username === 'user' && password === '1111') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'chahan.com',
        user: {
          nickname: '',
          roles: ['user'],
        },
        menuList: userMenu,
      },
    }
  } else {
    return {
      code: 401,
      message: '账号或密码错误',
    }
  }
})
