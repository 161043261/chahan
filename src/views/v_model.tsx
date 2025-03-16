/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const NotFound = defineComponent(
  /** setup */ (props, ctx) => {
    const router = useRouter()
    // router.addRoute({
    //   path: '/notFound',
    //   // component: () => import('./not_found'),
    //   component: NotFound,
    // })
    const { attrs, slots, emit, expose } = ctx

    const refPrimaryData = ref('initialStr')

    const refData = ref({
      str: 'initialStr',
      num: 3,
    })

    const reactiveData = reactive({
      str: 'initialStr',
      num: 3,
    })

    watchEffect(() => console.log(refPrimaryData.value))
    watchEffect(() => console.log(refData.value))
    watchEffect(() => console.log(reactiveData.str))
    watchEffect(() => console.log(reactiveData.num))

    return () => (
      <div class="flex w-[500px] flex-col gap-[20px]">
        <div>refPrimaryData: {refPrimaryData.value}</div>
        <div>refData: {JSON.stringify(refData.value)}</div>
        <div>reactiveData: {JSON.stringify(reactiveData)}</div>
        <input class="p[10px] border-1" type="text" v-model={refPrimaryData.value} />
        <input class="p[10px] border-1" type="text" v-model={refData.value.str} />
        <input class="p[10px] border-1" type="text" v-model={reactiveData.str} />
        <input class="p[10px] border-1" type="number" v-model={refData.value.num} />
        <input class="p[10px] border-1" type="number" v-model={reactiveData.num} />
        <button class="border-1 p-[10px]" onClick={() => (refPrimaryData.value += '!')}>
          refPrimaryData.value += '!'
        </button>
        <button class="border-1 p-[10px]" onClick={() => (refData.value.str += '!')}>
          refData.value.str += '!'
        </button>
        <button class="border-1 p-[10px]" onClick={() => (reactiveData.str += '!')}>
          reactiveData.str += '!'
        </button>
        <button class="border-1 p-[10px]" onClick={() => (refData.value.num += 1)}>
          refData.value.num += 1
        </button>
        <button class="border-1 p-[10px]" onClick={() => (reactiveData.num += 1)}>
          reactiveData.num += 1
        </button>
      </div>
    )
  },
  {
    name: 'NotFound',
  },
)

export default NotFound
