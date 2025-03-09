import type { IOrderData } from '@/types/order'
import { CloseOne } from '@icon-park/vue-next'
import { ElCard } from 'element-plus'
import { defineComponent } from 'vue'

interface IProps {
  orderData?: IOrderData
}

export default defineComponent({
  props: ['orderData'],
  emits: ['closeWindow'],
  setup(props: IProps, { emit, slots } /** ctx */) {
    const handleClose = () => {
      emit('closeWindow')
    }

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
          {JSON.stringify(props.orderData)}

          <div class="flex justify-center text-slate-500">{slots.footer ? slots.footer() : ''}</div>
        </ElCard>
      </>
    )
  },
})
