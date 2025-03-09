import type { IOrderData } from '@/types/order'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

interface IProps {
  orderData?: IOrderData
}

export default defineComponent({
  setup(props: IProps, { /** emit, */ slots } /** ctx */) {
    console.log(props)
    console.log(slots)
    const route = useRoute()
    console.log(route.params)

    return () => (
      <div>
        <div class="fixed top-[50%] left-[50%] z-10 translate-[-50%] border-1">DraggableWindow</div>
      </div>
    )
  },
})
