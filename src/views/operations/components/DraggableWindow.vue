<script setup lang="ts">
import type { IOrderData } from '@/types/order'
import { CloseOne } from '@icon-park/vue-next'
import { toRef, type Directive } from 'vue'
import { order_state2text_and_type } from '@/constants'

const props = defineProps<{
  orderData: IOrderData
}>()

const emit = defineEmits<{
  closeWindow: []
}>()

const vDrag: Directive<HTMLElement, void> = (
  el: HTMLElement /** , binding: DirectiveBinding */,
) => {
  const dragEl = el.firstElementChild as HTMLDivElement

  // todo: 是否可能资源泄露
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
const orderData = toRef(props, 'orderData')
</script>

<template>
  <main>
    <div
      class="glass-container border-green fixed top-[50%] left-[50%] z-10 w-[300px] translate-[-50%] !rounded-3xl border-3 px-[20px] pb-[20px]"
      v-drag
    >
      <!-- const dragEl = el.firstElementChild as HTMLDivElement -->
      <div class="flex cursor-pointer items-center justify-between pt-[20px]">
        <slot name="header"></slot>
        <CloseOne
          @click="handleClose"
          theme="filled"
          size="24"
          fill="#fb2c36"
          :strokeWidth="3"
          class="cursor-pointer duration-500 hover:scale-150"
        ></CloseOne>
      </div>
      <!-- const dragEl = el.firstElementChild as HTMLDivElement -->
      <ElDivider></ElDivider>

      <ul>
        <li>
          订单状态:
          <ElTag
            :type="order_state2text_and_type.get(orderData.state)?.type"
            class="ml-[10px] !text-[14px]"
            size="large"
          >
            {{ order_state2text_and_type.get(orderData.state)?.text }}
          </ElTag>
        </li>
        <li>机器人 ID: {{ orderData.robotId }}</li>
        <li>机器人名字: {{ orderData.robotName }}</li>
      </ul>
      <ElDivider></ElDivider>
      <div class="flex justify-center text-slate-500">
        <slot name="footer"></slot>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '../../../assets/global.scss';

.glass-container {
  @include global.glass-container(1px /** blurVal */);
}
</style>
