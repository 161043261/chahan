import type { ILoginReqData, ILoginResData } from '@/types/user'
import { post } from '@/utils/http'

enum Api {
  Login = '/login',
}

async function loginApi(data: ILoginReqData): Promise<ILoginResData> {
  return post(Api.Login, data)
}

export { loginApi }
