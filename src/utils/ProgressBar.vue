<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(0)
const bar = ref<HTMLDivElement>()
let requestId = 0

const loadStart = () => {
  const barDom = bar.value!
  requestId = window.requestAnimationFrame(function fn() {
    if (progress.value < 100) {
      progress.value++
      barDom.style.width = progress.value + '%'
      requestId = window.requestAnimationFrame(fn)
    } else {
      progress.value = 0
      window.cancelAnimationFrame(requestId)
    }
  })
}

const loadEnd = () => {
  const barDom = bar.value!
  setTimeout(() => {
    requestId = window.requestAnimationFrame(() => {
      progress.value = 0
      barDom.style.width = progress.value + '%'
    })
  }, 3000)
}

defineExpose({
  loadStart,
  loadEnd,
})
</script>

<template>
  <main class="fixed top-[0] h-[5px] w-dvw">
    <div ref="bar" class="bg-green h-[5px] w-[0]"></div>
  </main>
</template>

<style scoped lang="scss"></style>
