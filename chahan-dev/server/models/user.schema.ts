// import { defineMongooseModel } from '~/node_modules/nuxt-mongoose/dist/runtime/server/services/model'
import type { Schema } from 'mongoose'
import type { IUser } from '~/types'
import { defineMongooseModel } from '~/server/utils/mongoose'

export const UserSchema = defineMongooseModel<IUser>({
  name: 'User',
  schema: {
    username: {
      type: 'string',
      unique: true,
    },
    password: {
      type: 'string',
    },
  },

  hooks(schema: Schema) {
    schema.pre('save', function (this, next) {
      if (this.username && this.password) {
        next()
      }
      throw createError({
        statusCode: 500,
        message: '账号或密码为空',
      })
    })
  },
})
