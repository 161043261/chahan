export interface IMenuItem {
  name: string
  url: string
  icon: string
  children?: IMenuItem[]
}

export interface ILoginBody {
  username: string
  password: string
}
