import type { IAuthPayload } from '~/types'
import { SignJWT, jwtVerify } from 'jose'
import { useRuntimeConfig } from '#imports'

const { auth } = useRuntimeConfig()

// auth.password 必须是长度为 32 的字符串
const uint8ArrayKey: Uint8Array = new TextEncoder().encode(auth.password)

/**
 * @description 使用 auth.password 对 token 签名
 */
export function createJwt(username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(username)
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(uint8ArrayKey)
}

export async function verifyJwt(token: string) {
  return (await jwtVerify(token, uint8ArrayKey)).payload as IAuthPayload
}
