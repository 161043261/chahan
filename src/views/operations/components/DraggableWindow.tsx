import type { IOrderData } from '@/types/order'
import { CloseOne } from '@icon-park/vue-next'
import { ElCard, ElTag } from 'element-plus'
import { defineComponent, toRefs } from 'vue'
import { order_state2text_and_type } from '@/constants'
interface IProps {
  orderData: IOrderData
}

export default defineComponent({
  props: ['orderData'],
  emits: ['closeWindow'],
  setup(props: IProps, { emit, slots } /** ctx */) {
    const handleClose = () => {
      emit('closeWindow')
    }
    const { orderData } = toRefs(props)
    return () => (
      <>
        <ElCard class="fixed top-[50%] left-[50%] z-10 translate-[-50%] !rounded-3xl">
          <div class="mb-[20px] flex items-center justify-between">
            <div>{slots.header ? slots.header() : ''}</div>
            <span onClick={handleClose}>
              <CloseOne
                theme="filled"
                size="24"
                fill="#fb2c36"
                strokeWidth={3}
                class="cursor-pointer duration-500 hover:scale-150"
              />
            </span>
          </div>
          <ul>
            <li>
              订单状态
              <ElTag
                type={order_state2text_and_type.get(orderData.value.state)?.type}
                class="ml-[10px] !text-[14px]"
                size="large"
              >
                {order_state2text_and_type.get(orderData.value.state)?.text}
              </ElTag>
            </li>
            <li>机器人 ID {orderData.value.robotId}</li>
            <li>机器人名字 {orderData.value.robotName}</li>
          </ul>
          <div class="flex justify-center text-slate-500">{slots.footer ? slots.footer() : ''}</div>
        </ElCard>
      </>
    )
  },
})
