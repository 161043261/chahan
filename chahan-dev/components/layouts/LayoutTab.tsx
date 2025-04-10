import { ElWatermark } from 'element-plus'
import { defineComponent, KeepAlive, toRefs, Transition } from 'vue'
import { useUserState } from '~/composables/useUserStore'

interface IProps {
  watermarked: boolean
}
export default defineComponent({
  props: ['watermarked'],

  setup(props: IProps, { slots }) {
    const { watermarked } = toRefs(props)
    const userState = useUserState()

    return () => (
      <div>
        <ElWatermark
          content={watermarked.value ? userState.username.value : ''}
          font={{ fontSize: 28, fontFamily: 'Iosevka, YouYuan, Yuanti SC' }}
        >
          <Transition enterActiveClass="animate__animated animate__fadeInLeft">
            <KeepAlive include={['ChahanRobot', 'OrderDetail']}>
              {slots.default ? slots.default() : <></>}
            </KeepAlive>
          </Transition>
        </ElWatermark>
      </div>
    )
  },
})
