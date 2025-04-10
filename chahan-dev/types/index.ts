import type { JWTPayload } from 'jose'
import type { ObjectId } from 'mongoose'

export interface IAuthPayload extends JWTPayload {
  // iss?: string            // JWT Issuer
  // sub?: string            // JWT Subject
  // aud?: string | string[] // JWT Audience
  // jti?: string            // JWT ID
  // nbf?: number            // JWT Not Before
  // exp?: number            // JWT Expiration Time
  // iat?: number            // JWT Issued At
  token?: string
}

export interface IUser {
  _id: ObjectId
  username: string
  password: string
}
