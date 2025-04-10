import { defineEventHandler, getRequestURL } from '#imports'
import { getTime } from '~/utils'

export default defineEventHandler((event) => {
  console.log(`[${getTime()}] Request URL:`, getRequestURL(event).href)
})
