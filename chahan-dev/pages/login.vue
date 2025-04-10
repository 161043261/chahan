<script setup lang="ts">
import { Lock, Rice, User } from '@icon-park/vue-next'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, type FormRules } from 'element-plus'
import { useUserState } from '~/composables/useUserStore'
import type { Res } from '~/types/resp'

// macros
definePageMeta({
  layout: false, // 不使用布局
  // layout: 'default', // 使用默认布局
})

// const emit = defineEmits(['update:modelValue'])
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

const userState = useUserState()
const router = useRouter()
const handleLogin = () => {
  formRef.value?.validate(async (isValid: boolean) => {
    if (!isValid) {
      return
    }
    try {
      await userState.login(formData)
      ElMessage.success({ message: '登录成功', grouping: true })
      router.push('/')
    } catch (err) {
      if (import.meta.dev) {
        console.error(err)
      }
      ElMessage.error({ message: '登录失败, 账号或密码错误', grouping: true })
      clearError()
    }
  })
}

const handleRegister = () => {
  formRef.value?.validate(async (isValid: boolean) => {
    if (!isValid) {
      return
    }
    try {
      const data = await $fetch<Res<string>>('/api/user/register', {
        method: 'POST',
        body: formData,
      })
      ElMessage.success({ message: data?.msg, grouping: true })
    } catch (err) {
      if (import.meta.dev) {
        console.error(err)
      }
      ElMessage.error({ message: '注册失败, 账号已存在', grouping: true })
      clearError()
    }
  })
}
</script>

<template>
  <main class="bg h-dvh bg-cover bg-center bg-no-repeat">
    <div
      class="glass-container absolute left-[10%] top-[50%] h-[300px] w-[456px] translate-y-[-50%] rounded-3xl p-[50px]"
    >
      <div class="mb-[20px] flex items-center justify-center gap-[10px]">
        <Rice theme="filled" size="48" fill="#b8e986" :stroke-width="3" />
        <h1 class="text-3xl text-slate-500">炒饭机器人管理平台</h1>
      </div>

      <ElForm ref="formRef" :model="formData" label-width="auto" :rules="formRules">
        <ElFormItem label="账号" prop="username">
          <ElInput v-model="formData.username" placeholder="请输入账号" :prefix-icon="User" />
        </ElFormItem>

        <ElFormItem label="密码" prop="password">
          <ElInput
            v-model="formData.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
          />
        </ElFormItem>

        <div class="flex flex-row-reverse gap-[20px]">
          <ElButton type="default" class="!w-[100px]" @click="handleRegister">注册</ElButton>
          <ElButton type="success" class="!w-[100px]" @click="handleLogin">登录</ElButton>
        </div>
      </ElForm>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/scss/global.scss';

.el-button {
  border: none;
}

.el-button--success {
  background-color: var(--color-green);
}

.bg {
  background-image: url('~/assets/img/bg.jpg');
}

.glass-container {
  position: absolute;
  @include global.glass-container(5px /** blurVal */);
}
</style>
