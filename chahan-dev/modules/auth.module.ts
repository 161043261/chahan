import { defineNuxtModule } from '@nuxt/kit'
import type { Nuxt } from 'nuxt/schema'
import { hash } from 'ohash'
import { WHITE_LIST } from '~/constants'

//////////////////////////////////////////////////
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { promises as fs } from 'node:fs'
import { getDate, getTime } from '~/utils'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

if (import.meta.dev) {
  console.log('[~/modules/auth.module.ts] __dirname:', __dirname)
}
//////////////////////////////////////////////////

export interface ModuleOptions {
  password: string
  whitelist: string[]
}

export default defineNuxtModule<ModuleOptions>({
  defaults: {
    // auth.password 必须是长度为 32 的字符串
    password: hash(`${Date.now() + Math.random()}`).slice(0, 32),
    whitelist: WHITE_LIST,
  },

  async setup(moduleOptions: ModuleOptions, nuxt: Nuxt) {
    const runtimeConfig = nuxt.options.runtimeConfig

    runtimeConfig.auth = {
      password: moduleOptions.password,
      whitelist: moduleOptions.whitelist,
    }
    runtimeConfig.public.whitelist = moduleOptions.whitelist
    try {
      // 创建目录
      // 目录存在则删除目录, 目录下的所有子目录和文件
      // 目录不存在则创建目录
      await fs
        .rm(join(__dirname, '../logs'), { recursive: true, force: true })
        .then(() => fs.mkdir(join(__dirname, '../logs')))
        .then(() =>
          // 写文件
          // 文件不存在则创建
          // 文件存在则追加
          fs.appendFile(
            join(__dirname, `../logs/${getDate()}.log`),
            `[${getTime()}] moduleOptions: ${JSON.stringify(moduleOptions)}\n`,
          ),
        )
        .then(() =>
          fs.appendFile(
            join(__dirname, `../logs/${getDate()}.log`),
            `[${getTime()}] runtimeConfig.auth: ${JSON.stringify(runtimeConfig.auth)}\n`,
          ),
        )
        .then(() =>
          fs.appendFile(
            join(__dirname, `../logs/${getDate()}.log`),
            `[${getTime()}] runtimeConfig.public: ${JSON.stringify(runtimeConfig.public)}\n`,
          ),
        )
    } catch (err) {
      console.error(err)
    }
  },
})
