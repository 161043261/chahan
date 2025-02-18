<script setup lang="ts">
import { ref } from 'vue'
import { Play } from '@icon-park/vue-next'

const playing = ref<boolean>(false)

</script>

<template>
  <main class="flex h-[80vh] items-center justify-center">
    <div
      class="flex h-[520px] w-[520px] translate-y-[-5vh] items-center justify-center rounded-full bg-linear-to-t from-blue-900 to-sky-50"
      :class="{ playing: playing }"
    >
      <Play
        theme="outline"
        size="48"
        fill="#fff"
        :strokeWidth="3"
        class="scale-[3] cursor-pointer opacity-50"
        @click="handleClick"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.playing {
  animation: spin 10s linear infinite;
}
</style>
