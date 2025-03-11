import type { IResData } from './dashboard'
export type { IResData }

export interface ITreeData {
  label: string
  value?: string
  children?: ITreeData[]
}

export type ITreeList = {
  data: {
    list: ITreeData[]
  }
} & IResData
