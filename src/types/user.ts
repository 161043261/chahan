export interface IMenuItem {
  name: string
  url: string
  icon: string
  children?: IMenuItem[]
}

export interface ILoginReqData {
  username: string
  password: string
}

export interface ILoginResData {
  code: number
  data: {
    menuList: IMenuItem[]
    token: string
    user: {
      nickname: string
      auths: string[]
    }
  }
  message: string
}
