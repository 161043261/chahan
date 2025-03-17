import { ElWatermark } from 'element-plus'
import { defineComponent, h, KeepAlive, toRefs, Transition, type Component } from 'vue'
import { useUserStore } from '@/stores/user'
import { RouterView } from 'vue-router'

interface IProps {
  watermarked: boolean
}
export default defineComponent({
  props: ['watermarked'],

  setup(props: IProps) {
    // 相同的, 直接解构会失去响应式
    // const { watermarked } = props
    // 使用 toRef 或 toRefs 解构
    const { watermarked } = toRefs(props)
    const userStore = useUserStore()

    return () => (
      <div>
        <ElWatermark
          content={watermarked.value ? userStore.nickname : ''}
          font={{ fontSize: 28, fontFamily: 'Iosevka, YouYuan, Yuanti SC' }}
        >
          <RouterView>
            {{
              default: ({ Component }: { Component: Component }) => (
                <Transition enterActiveClass="animate__animated animate__fadeInLeft">
                  <KeepAlive include={['ChahanRobot', 'OrderDetail']}>{h(Component)}</KeepAlive>
                </Transition>
              ),
            }}
          </RouterView>
        </ElWatermark>
      </div>
    )
  },
})
