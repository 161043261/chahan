import type { IOrderData } from '@/types/order'
import { ref, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDate, getTime } from '@/utils'
import type { IRobotData } from '@/types/robot'
import { orderQueryApi } from '@/apis/order'
import { robotQueryApi } from '@/apis/chahan'
import { ElCard, ElDescriptions, ElDescriptionsItem, ElDivider, ElImage, ElTag } from 'element-plus'
import robotSvg from '@/assets/robot.svg'
import { robot_state2text_and_type } from '@/constants'

export default defineComponent({
  setup(/** props, { emit, slots } */) {
    const route = useRoute()
    const { orderId, robotId } = route.query
    const orderData = ref<IOrderData>({
      id: '0',
      state: 0,
      robotId: 0,
      robotName: '',
      date: getDate(),
    })

    const robotData = ref<IRobotData>({
      id: 0,
      state: 0,
      name: '',
      failureNum: 0,
      admin: '',
      email: '',
      address: '',
    })

    onMounted(async () => {
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

    const slots = {
      header: () => '订单详情',
      footer: () => <p class="text-slate-500">{`查询时间 ${getDate()} ${getTime()}`}</p>,
    }
    return () => (
      <main>
        <ElCard class="!rounded-3xl" v-slots={slots /** 传递插槽 */}>
          <ElDescriptions title={`订单 ${orderData.value.id} 详情`}></ElDescriptions>
          <ElDivider></ElDivider>
          <ElDescriptions
            title={`订单 ${orderData.value.id} 的机器人详情`}
            direction="vertical"
            border
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
                type={robot_state2text_and_type.get(robotData.value.state)?.type}
                class="!text-[14px]"
              >
                {robot_state2text_and_type.get(robotData.value.state)?.text}
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
