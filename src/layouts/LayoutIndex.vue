<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import AsideMenu from '@/components/aside/AsideMenu.vue'
import HeaderIndex from '@/components/header/HeaderIndex.vue'
</script>

<template>
  <ElContainer>
    <ElAside class="h-dvh bg-white shadow-xl !w-[200px]">
      <AsideMenu></AsideMenu>
    </ElAside>
    <ElContainer>
      <ElHeader class="!p-0">
        <HeaderIndex></HeaderIndex>
      </ElHeader>
      <ElMain class="h-[80vh] overflow-auto">
        <RouterView></RouterView>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="css"></style>
