import './login.scss'

import { Lock, Rice, User } from '@icon-park/vue-next'
import { ElButton, ElForm, ElFormItem, ElInput, type FormRules } from 'element-plus'
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/toast'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  setup: (/** props, ctx */) => {
    // const { emit } = ctx

    defineComponent({
      name: 'LoginIndex',
    })

    interface IFormData {
      username: string
      password: string
    }

    const formData = reactive<IFormData>({
      username: 'admin',
      password: '1111',
    })

    const formRules = reactive<FormRules<IFormData>>({
      username: [
        { required: true, message: '账号是必填项', trigger: 'blur' },
        { min: 4, max: 16, message: '账号是4到16个字符', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '账号格式错误', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '密码是必填项', trigger: 'blur' },
        { min: 4, max: 16, message: '密码是4到16个字符', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '密码格式错误', trigger: 'blur' },
      ],
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    // ref<InstanceType<typeof ElForm>>()

    const userStore = useUserStore()
    const router = useRouter()

    const handleInput = () => {
      if (import.meta.env.DEV) {
        console.log(formData.username, formData.password)
      }
      // emit('update:modelValue', {
      //   formData,
      // })
    }

    if (import.meta.env.DEV) {
      // watchEffect 浅层侦听
      watchEffect(() => console.log(formData.username, formData.password))
    }
    const handleLogin = () => {
      // 如果不使用 async...await
      // 则 router.replace({ name: 'Home' }) 可能先于 userStore.login(formData) 执行
      // 第一次点击登录按钮时, sessionStorage 未存储 token, 被前置守卫重定向到登录页面
      // 第二次点击登录按钮时, sessionStorage 已存储 token, 才可以正常跳转
      formRef.value?.validate(async (isValid: boolean) => {
        if (isValid) {
          await userStore.login(formData)
          router.replace({ name: 'Home' })
        }
      })
    }

    const handleRegister = () => {
      const toast = useToast()
      toast.error('开发中')
    }

    // const handleDebug = () => {
    //   formData.username += 'n'
    // }

    return () => (
      <div class="bg h-dvh bg-cover bg-center bg-no-repeat">
        <div class="glass-container absolute top-[50%] left-[10%] h-[300px] w-[500px] translate-y-[-50%] rounded-3xl p-[50px]">
          <div class="mb-[20px] flex items-center justify-center gap-[10px]">
            <Rice theme="filled" size="48" fill="#b8e986" strokeWidth={3} />
            <h1 class="text-3xl text-slate-500">炒饭机器人管理平台</h1>
          </div>

          <ElForm
            class="w-[80%]"
            model={formData}
            labelWidth={'auto'}
            rules={formRules}
            ref={formRef}
          >
            <ElFormItem label="账号" prop="username">
              <ElInput
                v-model={formData.username}
                placeholder="请输入账号"
                prefixIcon={User}
                onInput={handleInput}
              />
            </ElFormItem>

            <ElFormItem label="密码" prop="password">
              <ElInput
                v-model={formData.password}
                placeholder="请输入密码"
                prefixIcon={Lock}
                type="password"
                onInput={handleInput}
              />
            </ElFormItem>

            <div class="flex flex-row-reverse gap-[20px]">
              <ElButton type="default" class="!w-[100px]" onClick={handleRegister}>
                注册
              </ElButton>

              <ElButton type="success" class="!w-[100px]" onClick={handleLogin}>
                登录
              </ElButton>

              {/* <ElButton
                v-if={import.meta.env.DEV}
                type="warning"
                class="!w-[100px]"
                onClick={handleDebug}
              >
                Debug
              </ElButton> */}
            </div>
          </ElForm>
        </div>
      </div>
    )
  },
})
