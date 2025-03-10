import type { IOrderData } from '@/types/order'
import { CloseOne } from '@icon-park/vue-next'
import { ElTag } from 'element-plus'
import { defineComponent, toRefs, type Directive, type DirectiveBinding } from 'vue'
import { order_state2text_and_type } from '@/constants'
interface IProps {
  orderData: IOrderData
}

export default defineComponent({
  props: ['orderData'],
  emits: ['closeWindow'],

  setup(props: IProps, { emit, slots } /** ctx */) {
    const vDrag: Directive<HTMLElement, void> = (el: HTMLElement, binding: DirectiveBinding) => {
      const dragEl = el.firstElementChild as HTMLDivElement
      if (import.meta.env.DEV) {
        console.log(dragEl, binding)
      }
      dragEl.addEventListener('mousedown', (downEv: MouseEvent) => {
        const dx = downEv.clientX - el.offsetLeft
        const dy = downEv.clientY - el.offsetTop
        const onMousemove = (moveEv: MouseEvent) => {
          el.style.left = `${moveEv.clientX - dx}px`
          el.style.top = `${moveEv.clientY - dy}px`
        }
        document.addEventListener('mousemove', onMousemove)
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', onMousemove)
        })
      })
    }

    const handleClose = () => {
      emit('closeWindow')
    }
    const { orderData } = toRefs(props)

    return () => (
      <>
        <div
          class="border-green fixed top-[50%] left-[50%] z-10 translate-[-50%] !rounded-3xl border-3 px-[20px] pb-[20px]"
          v-drag={vDrag}
        >
          <div class="flex cursor-pointer items-center justify-between py-[20px]">
            <>{slots.header ? slots.header() : ''}</>
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
                class="ml-[20px] !text-[14px]"
                size="large"
              >
                {order_state2text_and_type.get(orderData.value.state)?.text}
              </ElTag>
            </li>
            <li>机器人 ID: {orderData.value.robotId}</li>
            <li>机器人名字: {orderData.value.robotName}</li>
          </ul>
          <div class="flex justify-center text-slate-500">{slots.footer ? slots.footer() : ''}</div>
        </div>
      </>
    )
  },
})
