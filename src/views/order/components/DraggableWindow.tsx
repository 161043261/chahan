import type { IOrderItem } from '@/types/order'
import { CloseOne } from '@icon-park/vue-next'
import { ElDivider, ElTag } from 'element-plus'
import { defineComponent, toRefs, type Directive } from 'vue'
import { ORDER_STATE2TEXT_AND_TYPE } from '@/constants'
interface IProps {
  orderData: IOrderItem
}

//! 能否在 tsx 文件中使用自定义指令?
export default defineComponent({
  props: ['orderData'],
  emits: ['closeWindow'],

  setup(props: IProps, { emit, slots } /** ctx */) {
    const vDrag: Directive<HTMLElement, void> = (
      el: HTMLElement /** , binding: DirectiveBinding */,
    ) => {
      const dragEl = el.firstElementChild as HTMLDivElement
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
          class="border-green fixed top-[50%] left-[50%] z-10 w-[300px] translate-[-50%] !rounded-3xl border-3 px-[20px] pb-[20px]"
          v-drag={vDrag}
        >
          <div class="flex cursor-pointer items-center justify-between pt-[20px]">
            <>{slots.header ? slots.header() : <></>}</>
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

          <ElDivider></ElDivider>

          <ul>
            <li>
              订单状态:
              <ElTag
                type={ORDER_STATE2TEXT_AND_TYPE.get(orderData.value.state)?.type}
                class="ml-[10px] !text-[14px]"
                size="large"
              >
                {ORDER_STATE2TEXT_AND_TYPE.get(orderData.value.state)?.text}
              </ElTag>
            </li>
            <li>机器人 ID: {orderData.value.robotId}</li>
            <li>机器人名字: {orderData.value.robotName}</li>
          </ul>
          <ElDivider></ElDivider>

          <div class="flex justify-center text-slate-500">
            {slots.footer ? slots.footer() : <></>}
          </div>
        </div>
      </>
    )
  },
})
