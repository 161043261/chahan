<script setup lang="ts">
import { Remind, User, Power, DataUser } from '@icon-park/vue-next'
import { ElBadge, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const { nickname } = storeToRefs(userStore)
const router = useRouter()

// 节流 throttle
const animated = ref<boolean>(false)
let timer: number | null = null
const handleClick = () => {
  if (timer) {
    return
  }
  if (import.meta.env.DEV) {
    console.log('@/components/header/HeaderIndex.vue: throttle')
  }
  animated.value = true
  timer = setTimeout(() => {
    animated.value = false
    timer = null
  }, 2000)
}

const enum Command {
  User = 'user',
  Logout = 'Logout',
}

const handleCommand = async (command: Command) => {
  switch (command) {
    case Command.User:
      router.push({ name: 'Personal' })
      break

    case Command.Logout:
      userStore.logout()
      router.replace({ name: 'Login' })
  }
}
</script>

<template>
  <main class="h-[60px] px-[20px]">
    <div class="float-right h-[60px] flex items-center gap-[20px]">
      <ElBadge
        :is-dot="true"
        class="item mt-[5px] cursor-pointer"
        :class="{ animate__animated: animated, animate__swing: animated }"
        ><Remind
          theme="two-tone"
          size="25"
          :fill="['#333', '#b8e986']"
          :strokeWidth="3"
          @click="handleClick"
      /></ElBadge>

      <DataUser
        theme="two-tone"
        size="30"
        :fill="['#333', '#b8e986']"
        :strokeWidth="3"
        class="cursor-pointer"
      />

      <ElDropdown @command="handleCommand">
        <span class="cursor-pointer outline-none text-lg"> 欢迎: {{ nickname }} </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem :icon="User" :command="Command.User">我的账号</ElDropdownItem>
            <ElDropdownItem :icon="Power" :command="Command.Logout">退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </main>
</template>

<style scoped lang="css"></style>
