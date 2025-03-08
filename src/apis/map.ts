import { Api } from '@/constants/apis'
import type { IRobotList } from '@/types/robot'
import { get } from '@/utils/http'

export function mapListApi(): Promise<IRobotList> {
  return get(Api.MapList)
}
