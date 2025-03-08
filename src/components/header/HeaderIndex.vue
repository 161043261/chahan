<script setup lang="ts">
import { Remind, User, Power } from '@icon-park/vue-next'
import { ElBadge, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import HeaderTabs from './HeaderTabs.vue'

const userStore = useUserStore()
const { nickname } = storeToRefs(userStore)
const router = useRouter()
const isAlive = ref(false)

const emit = defineEmits<{
  (e: 'switch-watermark', isAlive: boolean): void
}>()

// const emit = defineEmits<{
//   switchWatermark: [isAlive: boolean]
// }>()

// 节流 throttle
const animated = ref<boolean>(false)
let timer: number | null = null
const handleClick = () => {
  if (timer) {
    return
  }
  animated.value = true
  timer = setTimeout(() => {
    animated.value = false
    timer = null
  }, 1000)
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
  <main class="mt-[10px]">
    <div class="flex flex-row-reverse items-center">
      <div class="mr-[20px] flex gap-[20px]">
        <ElSwitch
          v-model="isAlive"
          inline-prompt
          style="--el-switch-on-color: var(--color-green); --el-switch-off-color: var(--color-1st)"
          active-text="水印开"
          inactive-text="水印关"
          @change="emit('switch-watermark', isAlive)"
        />

        <ElBadge
          :is-dot="true"
          class="item mt-[5px] cursor-pointer duration-1000"
          :class="{ animate__animated: animated, animate__swing: animated }"
          ><Remind theme="filled" size="25" fill="#b8e986" :strokeWidth="3" @click="handleClick"
        /></ElBadge>

        <ElDropdown @command="handleCommand">
          <span class="cursor-pointer text-lg outline-none"> 欢迎: {{ nickname }} </span>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem :icon="User" :command="Command.User">我的账号</ElDropdownItem>
              <ElDropdownItem :icon="Power" :command="Command.Logout">退出登录</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </div>
    </div>

    <HeaderTabs></HeaderTabs>
  </main>
</template>

<style scoped lang="css">
.el-card {
  border-radius: 50px;
  &:hover {
    background-color: var(--color-green-light);
  }
}
</style>
