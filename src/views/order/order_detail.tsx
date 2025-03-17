import type { IOrderData } from '@/types/order'
import { ref, defineComponent, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDate, getTime } from '@/utils'
import type { IRobotData } from '@/types/robot'
import { orderQueryApi } from '@/apis/order'
import { robotQueryApi } from '@/apis/chahan'
import { ElCard, ElDescriptions, ElDescriptionsItem, ElDivider, ElImage, ElTag } from 'element-plus'
import robotSvg from '@/assets/robot.svg'
import { ORDER_STATE2TEXT_AND_TYPE, ROBOT_STATE2TEXT_AND_TYPE } from '@/constants'
import { ListNumbers, Order, Time } from '@icon-park/vue-next'

// 注意: @/views/operations/order_detail.tsx 是 tsx 文件, 不是 vue 文件
// 需要在 defineComponent 时指定组件名
export default defineComponent({
  name: 'OrderDetail',
  setup(/** props, { emit, slots } */) {
    const route = useRoute()
    const { orderId, robotId } = route.query

    const orderData = ref<IOrderData>({
      id: '',
      state: 1,
      robotId: 0,
      robotName: '',
      date: getDate(),
    })

    const robotData = ref<IRobotData>({
      id: 0,
      state: 1,
      name: '',
      failureNum: 0,
      admin: '',
      email: '',
      address: '',
    })

    onMounted(async () => {
      if (!orderId || !robotId) {
        return
      }
      try {
        const p1 = orderQueryApi({ id: orderId as string }).then((res) => res.data.list)
        const p2 = robotQueryApi({ id: Number.parseInt(robotId as string) }).then(
          (res) => res.data.list,
        )
        const [orderData_, robotData_] = await Promise.all([p1, p2])
        orderData.value = orderData_[0]
        robotData.value = robotData_[0]
      } catch (err) {
        console.error(err)
      }
    })

    // tsx 插槽的第一种写法
    const slots = {
      header: () => <div class="text-[20px]">订单详情</div>,
      footer: () => <p class="text-slate-500">{`查询时间 ${getDate()} ${getTime()}`}</p>,
    }

    if (import.meta.env.DEV) {
      watch(
        () => route.path,
        (newVal, oldVal) => {
          console.log(newVal, '<==', oldVal)
        },
      )
    }

    return () => (
      <main>
        {/* tsx 插槽的第一种写法 */}
        <ElCard class="!rounded-3xl" v-slots={slots /** 传递插槽 */}>
          {/* FIXME */}
          <ElDescriptions title={`订单 ${orderData.value.id} 详情`} column={3} border>
            <ElDescriptionsItem align="center">
              {/* tsx 插槽的第二种写法 */}
              {{
                label: () => (
                  <div class="flex items-center justify-center gap-[10px]">
                    <ListNumbers theme="outline" size="20" fill="#7ed321" strokeWidth={3} />
                    订单号
                  </div>
                ),
                default: () => orderData.value.id,
              }}
            </ElDescriptionsItem>

            <ElDescriptionsItem align="center">
              {{
                label: () => (
                  <div class="flex items-center justify-center gap-[10px]">
                    <Order theme="outline" size="20" fill="#7ed321" strokeWidth={3} />
                    订单状态
                  </div>
                ),
                default: () => (
                  <ElTag
                    size="large"
                    type={ORDER_STATE2TEXT_AND_TYPE.get(orderData.value.state)?.type}
                    class="!text-[14px]"
                  >
                    {ORDER_STATE2TEXT_AND_TYPE.get(orderData.value.state)?.text}
                  </ElTag>
                ),
              }}
            </ElDescriptionsItem>

            <ElDescriptionsItem align="center">
              {{
                label: () => (
                  <div class="flex-center flex items-center justify-center gap-[10px]">
                    <Time theme="outline" size="20" fill="#7ed321" strokeWidth={3} />
                    订单日期
                  </div>
                ),
                default: () => orderData.value.date,
              }}
            </ElDescriptionsItem>
          </ElDescriptions>

          <ElDivider />

          <ElDescriptions
            title={`处理订单 ${orderData.value.id} 的机器人详情`}
            direction="vertical"
            border={true}
            column={4}
          >
            <ElDescriptionsItem rowspan={2} width={140} label="机器人图像" align="center">
              <ElImage class="w-[100px]" src={robotSvg} />
            </ElDescriptionsItem>

            <ElDescriptionsItem label="机器人名字" align="center">
              {robotData.value.name}
            </ElDescriptionsItem>

            <ElDescriptionsItem label="机器人状态" align="center">
              <ElTag
                size="large"
                type={ROBOT_STATE2TEXT_AND_TYPE.get(robotData.value.state)?.type}
                class="!text-[14px]"
              >
                {ROBOT_STATE2TEXT_AND_TYPE.get(robotData.value.state)?.text}
              </ElTag>
            </ElDescriptionsItem>

            <ElDescriptionsItem label="零件故障数" align="center">
              {robotData.value.failureNum}
            </ElDescriptionsItem>

            <ElDescriptionsItem label="管理员名字" align="center">
              {robotData.value.admin}
            </ElDescriptionsItem>

            <ElDescriptionsItem label="管理员邮箱" align="center">
              {robotData.value.email}
            </ElDescriptionsItem>
          </ElDescriptions>
        </ElCard>
      </main>
    )
  },
})
