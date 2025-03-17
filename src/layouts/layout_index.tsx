import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import AsideMenu from '@/components/aside/aside_menu'
import HeaderIndex from '@/components/header/header_index'
import LayoutTab from './layout_tab'
import { ref, useTemplateRef } from 'vue'
import bus from '@/utils/bus'

export default defineComponent({
  setup() {
    const watermarked = ref(false)
    const tabContainerRef = useTemplateRef<InstanceType<typeof ElMain>>('tabContainerRef')
    bus.subscribe('store-scrollTop', () => {
      sessionStorage.setItem('scroll-top', tabContainerRef.value?.$el.scrollTop.toString())
      tabContainerRef.value!.$el.scrollTop = 0
    })
    bus.subscribe('set-scrollTop', () => {
      tabContainerRef.value!.$el.scrollTop = Number.parseFloat(
        sessionStorage.getItem('scroll-top')!,
      )
    })
    return () => (
      <ElContainer>
        <ElAside class="!h-dvh !w-[200px] bg-white shadow-lg">
          <AsideMenu></AsideMenu>
        </ElAside>
        <ElContainer>
          <ElHeader class="z-10 !h-[10vh] !p-0">
            <HeaderIndex
              onSwitchWatermark={(isAlive: boolean) => (watermarked.value = isAlive)}
            ></HeaderIndex>
          </ElHeader>
          <ElMain class="!h-[90vh]" ref="tabContainerRef">
            <LayoutTab watermarked={watermarked.value}></LayoutTab>
          </ElMain>
        </ElContainer>
      </ElContainer>
    )
  },
})
