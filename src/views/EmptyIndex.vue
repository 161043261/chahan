<script setup lang="ts">
import { ElCard, ElDrawer } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const animated = ref(false)
let timer: number | null = null

const handleClick = () => {
  if (timer) {
    return
  }
  animated.value = true
  timer = setTimeout(() => {
    router.push({ name: 'Dashboard' })
    timer = null
  }, 2000)
}
/////////////////////////////////////////////////
const showDrawer = ref(true) // <----------------

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
  <main class="flex h-[80vh] items-center justify-center">
    <ElCard
      class="el-card flex h-[100px] w-[300px] cursor-pointer items-center justify-center duration-2000 hover:scale-150"
      :class="{ animate__animated: animated, animate__hinge: animated }"
      @click="handleClick"
    >
      <div class="!text-3xl text-slate-500">开始今天的工作</div>
    </ElCard>

    <ElDrawer
      v-model="showDrawer"
      title="我特别喜欢日本的一个小众乐队🤣 我比较推荐「チェリー」，「猫になりたい」，「愛のしるし」"
      direction="rtl"
      :before-close="handleClose"
    >
      <TransitionGroup move-class="mv" tag="div">
        <div v-for="song of songList" :key="song[0]">
          <a :href="song[0]" target="_blank" class="!underline">{{ song[1] }}</a>
        </div>
      </TransitionGroup>

      <ElTooltip content="我的心情不好😡" placement="right" effect="light">
        <button
          @click="shuffle"
          class="shuffle hover:bg- hover:bg-vue-green mt-[50px] rounded-full px-[10px] py-[5px] hover:cursor-pointer"
        >
          打乱😡
        </button>
      </ElTooltip>
    </ElDrawer>

    <Transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <ElCard
        v-if="isShow"
        class="fixed top-[50%] left-[50%] mt-[-114px] ml-[-260px] flex h-[200px] w-[520px] items-center justify-center text-5xl !text-slate-500"
        >我的心情不好🥺</ElCard
      >
    </Transition>
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
  text-decoration: none;
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
