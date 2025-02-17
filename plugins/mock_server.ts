import { type Plugin } from 'vite'
import url from 'node:url'

export default function mockServer(): Plugin {
  return {
    name: 'mock-server',
    configureServer(server) {
      server.middlewares.use('/login', (req, res) => {
        const parseUrl = url.parse(req.originalUrl!, true /* parseQueryString */).query
        console.log('parseUrl:', parseUrl)
        // res.setHeader('Content-Type', 'application/json')
        // const data = mockjs.mock({
        //   'list|1000': [
        //     {
        //       'id|+1': 1,
        //       name: parseUrl.keyword,
        //       address: '@county(true)',
        //     },
        //   ],
        // })
        res.end('JSON.stringify(data)')
      })
    },
  }
}
