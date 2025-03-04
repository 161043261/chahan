import type { IMapList } from '@/types/robot'
import { get } from '@/utils/http'

enum Api {
  MapList = '/mapList',
}

export function mapListApi(): Promise<IMapList> {
  return get(Api.MapList)
}
