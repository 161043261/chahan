import type { ILoginReqData, ILoginResData } from '@/types/user'
import { get } from '@/utils/http'

enum Api {
  Login = '/login',
}

async function _loginApi(data: ILoginReqData): Promise<ILoginResData> {
  // return post(Api.Login, data)
  return get(Api.Login, data)
}

async function loginApi(data: ILoginReqData) {
  fetch(`/login?username=${data.username}&password=${data.password}`)
    .then((res) => console.log(res))
}

export { _loginApi, loginApi }
