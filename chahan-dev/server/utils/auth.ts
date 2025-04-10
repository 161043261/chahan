import type { H3Event } from 'h3'
import { useSessionManager } from './session'
import { createJwt, verifyJwt } from './jwt'
import { createError } from '#imports'
import { promises as fs } from 'fs'

//////////////////////////////////////////////////
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { getDate, getTime } from '~/utils'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
if (import.meta.dev) {
  console.log('[~/server/utils/auth.ts] __dirname:', __dirname)
}
//////////////////////////////////////////////////

export async function getAuth(event: H3Event) {
  //  return getCookie(event, 'authorization')
  return (await useSessionManager(event)).data.token
}

/**
 * @@description 使用 username 创建 token
 */
export async function setAuth(event: H3Event, username: string) {
  const token = await createJwt(username)
  await Promise.all([
    fs.appendFile(
      join(__dirname, `../../logs/${getDate()}.log`),
      `[${getTime()}] token: ${token}\n`,
    ),
    useSessionManager(event, token),
  ])
  return token
}

export async function clearAuth(event: H3Event) {
  // return deleteCookie(event, 'authorization')
  return (await useSessionManager(event)).clear()
}

export async function requireAuth(event: H3Event) {
  const token = await getAuth(event)
  if (!token)
    throw createError({
      statusCode: 401,
      statusText: 'Unauthorized',
    })
  const payload = await verifyJwt(token as string)
  return payload
}
