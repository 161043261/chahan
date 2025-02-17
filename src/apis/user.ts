import type { ILoginReqData, ILoginResData } from '@/types/user'
import { get } from '@/utils/http'

enum Api {
  Login = '/login',
}

async function loginApi(data: ILoginReqData): Promise<ILoginResData> {
  // return post(Api.Login, data)
  return get(Api.Login, data)
}

export { loginApi }
