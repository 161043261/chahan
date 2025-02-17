import { type Plugin } from 'vite'
import url from 'node:url'
import adminMenu from './admin_menu.json'
import userMenu from './user_menu.json'

interface IResData {
  code: number
  message: string
  data?: {
    token: string
    user: {
      nickname: string
      auths: string[]
    }
    menuList: typeof adminMenu | typeof userMenu
  }
}

export default function viteServer(): Plugin {
  return {
    name: 'vite-server',
    configureServer(server) {
      server.middlewares.use('/login', (req, res) => {
        const parseUrl = url.parse(req.originalUrl!, true /* parseQueryString */).query
        const { username, password } = parseUrl
        console.log(`plugins/vite_server.ts: username: ${username}, password: ${password}`)
        res.setHeader('Content-Type', 'application/json')
        let resData: IResData
        if (username === 'admin' && password === '1111') {
          resData = {
            code: 200,
            message: '登录成功',
            data: {
              // todo: JWT
              token: 'localhost:5173',
              user: {
                nickname: '蛋炒饭之神',
                auths: ['admin'],
              },
              menuList: adminMenu,
            },
          }
        } else if (username === 'user' && password === '1111') {
          resData = {
            code: 200,
            message: '登录成功',
            data: {
              token: 'localhost:5173',
              user: {
                nickname: '菜鸟',
                auths: ['user'],
              },
              menuList: userMenu,
            },
          }
        } else {
          resData = {
            code: 401,
            message: '账号或密码错误',
          }
        }
        res.end(JSON.stringify(resData))
      })
    },
  }
}
