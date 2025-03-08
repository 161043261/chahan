<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules } from 'element-plus'
import { Lock, Rice, User } from '@icon-park/vue-next'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
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

const formRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()

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
</script>

<template>
  <!-- <main class="h-dvh bg-linear-to-r from-white to-green-100 bg-cover bg-center bg-no-repeat">
     -->
  <main class="bg h-dvh bg-cover bg-center bg-no-repeat">
    <div
      class="glass-container absolute top-[50%] left-[10%] h-[300px] w-[500px] translate-y-[-50%] rounded-3xl p-[50px]"
    >
      <!-- gap: 20px; -->
      <div class="mb-[20px] flex items-center justify-center gap-[10px]">
        <!-- <img src="@/assets/logo.svg" alt="logo" class="w-[70px] h-[70px]" />
          -->
        <Rice theme="filled" size="48" fill="#b8e986" :strokeWidth="3" />
        <h1 class="text-3xl text-slate-100">炒饭机器人管理平台</h1>
      </div>

      <ElForm
        class="m-auto w-[80%]"
        :model="formData"
        label-width="auto"
        :rules="formRules"
        ref="formRef"
      >
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

        <div class="flex w-[100%] justify-between">
          <ElButton type="default" class="w-[150px]">注册</ElButton>
          <ElButton type="success" class="w-[150px]" @click="handleLogin">登录</ElButton>
        </div>
      </ElForm>
    </div>
  </main>
</template>

<style scoped lang="scss">
.el-button {
  border: none;
}
.el-button--success {
  background-color: var(--color-green);
}

.bg {
  background-image: url(../assets/bg.png);
}

@mixin glass-container {
  position: relative; // 父元素相对定位, 参考点: 原位置
  z-index: 1;
  &::before {
    content: '';
    position: absolute; // 子元素绝对定位, 参考点: 包含块
    top: 0;
    left: 0;
    // right: 0;
    // bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    z-index: -1;
    border-radius: 24px;
  }
}

.glass-container {
  @include glass-container;
}

:deep(.el-form-item__label) {
  color: #f1f5f9;
}
</style>
