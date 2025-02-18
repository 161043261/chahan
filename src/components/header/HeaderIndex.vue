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
    showDrawer.value = true
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

const showDrawer = ref(false)
const songList = ref([
  ['https://music.163.com/song?id=818468&userid=3259250437', '恋のうた'],
  ['https://music.163.com/song?id=817652&userid=3259250437', '愛のしるし'],
  ['https://music.163.com/song?id=817686&userid=3259250437', 'おっぱい'],
  ['https://music.163.com/song?id=482988529&userid=3259250437', 'ヘビーメロウ'],
  ['https://music.163.com/song?id=22800772&userid=3259250437', '青い车'],
  ['https://music.163.com/song?id=818186&userid=3259250437', '空も飛べるはず'],
  ['https://music.163.com/song?id=818073&userid=3259250437', 'ロビンソン'],
  ['https://music.163.com/song?id=817661&userid=3259250437', '猫になりたい'],
  ['https://music.163.com/song?id=817851&userid=3259250437', 'チェリー'],
  ['https://music.163.com/song?id=816448&userid=3259250437', 'さよなら大好きな人'],
])

const shuffle = () => {
  for (let i = songList.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[songList.value[i], songList.value[j]] = [songList.value[j], songList.value[i]]
  }
}

const isShow = ref(false)
const handleClose = (done: () => void) => {
  done()
  isShow.value = true
  setTimeout(() => (isShow.value = false), 2000)
}
</script>

<template>
  <main class="h-[60px] px-[20px]">
    <div class="float-right flex h-[60px] items-center gap-[20px]">
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
        <span class="cursor-pointer text-lg outline-none"> 欢迎: {{ nickname }} </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem :icon="User" :command="Command.User">我的账号</ElDropdownItem>
            <ElDropdownItem :icon="Power" :command="Command.Logout">退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>

    <ElDrawer
      v-model="showDrawer"
      title="我特别喜欢日本的一个小众乐队🤣"
      direction="rtl"
      :before-close="handleClose"
    >
      <TransitionGroup move-class="mv" tag="div">
        <div v-for="song of songList" :key="song[0]">
          <a :href="song[0]" target="_blank" class="!underline">{{ song[1] }}</a>
        </div>
      </TransitionGroup>

      <button
        @click="shuffle"
        class="shuffle hover:bg- hover:bg-vue-green mt-[50px] rounded-full px-[10px] py-[5px] hover:cursor-pointer"
      >
        打乱😡
      </button>
    </ElDrawer>
  </main>
</template>

<style scoped lang="css">
.el-card {
  border-radius: 50px;
  &:hover {
    background-color: var(--chahan-green-light);
  }
}
</style>

<style lang="css" scoped>
a {
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover,
  .shuffle:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.shuffle {
  border: 1px solid hsla(160, 100%, 37%, 1);
}

.mv {
  transition: all 1s;
}
</style>
