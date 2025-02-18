<script setup lang="ts">
import { ElCard } from 'element-plus'
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
  </main>
</template>

<style scoped lang="scss">
.el-card {
  border-radius: 50px;
  &:hover {
    background-color: var(--chahan-green-light);
  }
}
</style>
