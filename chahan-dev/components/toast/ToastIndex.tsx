import { Attention, Caution, CheckOne, CloseOne } from '@icon-park/vue-next'
import { defineComponent, onBeforeUnmount, ref, Transition } from 'vue'
import styles from './transition.module.scss'

interface IProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'default'
  duration: number //! duration >= 500 && duration <= 2500, default 1500
}

// export default defineComponent(() => () => <></>)
export default defineComponent(
  (props: IProps, ctx /** { attrs, slots, emit, expose } */) => {
    const isAlive = ref(false)
    let timer: number | null | NodeJS.Timeout = null

    // 资源清理
    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    })

    const mount = () => {
      //! throttle
      if (timer) {
        return
      }
      isAlive.value = true
      timer = setTimeout(() => {
        isAlive.value = false
        timer = null
      }, props.duration)
    }

    //! tsx `expose` (sfc `defineExpose`)
    ctx.expose({ mount, isAlive })
    return () => (
      <div>
        <Transition
          name="fade"
          enterActiveClass={styles['fade-enter-active']}
          leaveActiveClass={styles['fade-leave-active']}
          enterFromClass={styles['fade-enter-from']}
          leaveToClass={styles['fade-leave-to']}
        >
          {isAlive.value ? (
            <div class="z-100 fixed left-[50%] top-[10%] -translate-x-[50%] rounded-lg border-[3px] border-1st p-[5px]">
              <div class="flex items-center gap-[5px]">
                {
                  ((type: string) => {
                    switch (type) {
                      case 'success':
                        return <CheckOne theme="filled" size="24" fill="#7ed321" />
                      case 'error':
                        return <CloseOne theme="filled" size="24" fill="#d0021b" />
                      case 'warning':
                        return <Caution theme="filled" size="24" fill="#f5a623" />
                      default:
                        return <Attention theme="filled" size="24" fill="#4a90e2" />
                    }
                  })(props.type) /** IIFE, Immediately Invoked Function Expression */
                }
                <span>{props.message}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </Transition>
      </div>
    )
  } /** setup */,
  {
    props: ['duration', 'message', 'type'],
    // slots
    // emits
    name: 'ToastIndex',
  },
)
