<script setup lang="ts">
import MapContainer from '@/components/map/MapContainer.vue'
import { ElRow, ElCol, ElCard } from 'element-plus'
</script>

<template>
  <main>
    <ElRow :gutter="20">
      <ElCol :span="18">
        <ElCard class="!rounded-3xl">
          <MapContainer></MapContainer>
        </ElCard>
      </ElCol>
      <ElCol :span="6"></ElCol>
    </ElRow>
  </main>
</template>

<style scoped lang="css"></style>
