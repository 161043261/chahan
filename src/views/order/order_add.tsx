import { defineComponent, onMounted, ref, watch } from 'vue'
import { ElCard, ElCol, ElRow, ElInput, ElTree } from 'element-plus'
import type { ITreeData } from '@/types/map'
import { addressListApi } from '@/apis/map'

export default defineComponent({
  // name: '',
  setup(props, ctx) {
    const { emit /** , slots */ } = ctx
    const addrList = ref<ITreeData[]>()

    const handleInput = () => {
      emit('update:modelValue', {
        addrStr: addrStr.value,
      })
    }

    onMounted(async () => {
      addrList.value = (await addressListApi()).data.list
    })

    const addrStr = ref('')
    const treeRef = ref<InstanceType<typeof ElTree>>()

    watch(
      () => addrStr.value,
      (newStr: string /** , oldStr: string */) => {
        treeRef.value?.filter(newStr)
      },
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeFilter = (value: string, data: { [key: string]: any }) => {
      if (!value) {
        return true
      }
      return data.label.includes(value)
    }

    return () => (
      <main>
        <ElCard class="!rounded-3xl">
          <ElRow gutter={20}>
            <ElCol span={6}>
              <ElInput
                placeholder="请输入地址"
                v-model={addrStr.value}
                onInput={handleInput}
              ></ElInput>

              <ElTree
                ref={treeRef}
                data={addrList.value}
                class="mt-[20px]"
                filterNodeMethod={nodeFilter}
              ></ElTree>
            </ElCol>

            <ElCol span={18}></ElCol>
          </ElRow>
        </ElCard>
      </main>
    )
  },
})
