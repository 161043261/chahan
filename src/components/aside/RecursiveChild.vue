<script setup lang="ts">
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { type IMenuItem } from '@/types/user'
import * as IconPark from '@icon-park/vue-next'
import type { Component } from 'vue'

defineOptions({
  name: 'RecursiveChild',
})

defineProps<{
  item: IMenuItem
}>()
</script>

<template>
  <ElSubMenu v-if="item.children" :index="item.url">
    <template #title>
      <ElIcon>
        <component :is="(IconPark as Record<string, Component>)[item.icon]"></component>
      </ElIcon>
      <span>{{ item.name }}</span>
    </template>
    <RecursiveChild v-for="child of item.children" :key="child.url" :item="child"> </RecursiveChild>
  </ElSubMenu>
  <ElMenuItem v-else :index="item.url" v-show="item.url !== '/operation/detail'">
    <ElIcon>
      <component :is="(IconPark as Record<string, Component>)[item.icon]"></component>
    </ElIcon>
    <span>{{ item.name }}</span>
  </ElMenuItem>
</template>

<style scoped lang="scss"></style>
