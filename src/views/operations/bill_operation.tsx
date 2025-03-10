import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import { ElCard, ElCol, ElRow, ElInput } from 'element-plus'

export default defineComponent({
  // name: '',
  setup(props, ctx) {
    const { emit /** , slots */ } = ctx
    const handleInput = () => {
      emit('update:modelValue', {
        addrStr: addrStr.value,
      })
    }

    onMounted(() => {
      // 必须写在 onMounted 中
      watchEffect(() => console.log(addrStr.value))
    })

    const addrStr = ref('默认地址')
    return () => (
      <>
        <main>
          <ElCard>
            <ElRow>
              <ElCol span={6}>
                <ElInput
                  class="w-[80%]"
                  placeholder="请输入地址"
                  v-model={addrStr.value}
                  onInput={handleInput}
                ></ElInput>
              </ElCol>
            </ElRow>
          </ElCard>
        </main>
      </>
    )
  },
})
