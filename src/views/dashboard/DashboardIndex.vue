<script setup lang="ts">
import { onMounted } from 'vue'

if (import.meta.env.DEV) {
  onMounted(() => {
    console.log('@/views/dashboard/DashboardIndex.vue: Mounted')
  })
}
</script>

<template>
  <main>DashboardIndex</main>
</template>

<style scoped lang="css"></style>
