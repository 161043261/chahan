<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, ref } from 'vue'
import { mapListApi } from '@/apis/map'
import type { IMapList } from '@/types/robot'

//! import.meta.glob
const pngList: Record<string, { default: string }> = import.meta.glob('@/assets/*.png', {
  eager: true,
})

let map: any = null

const mapList = ref<IMapList['data']['list']>()
onMounted(() => {
  AMapLoader.load({
    key: 'e5e46a8ca6baad8f8c9b5c52af11bed1',
    version: '2.0',
    plugins: [
      /** 'AMap.Scale' */
    ],
  })
    .then((AMap) => {
      map = new AMap.Map('map-container', {
        viewMode: '3D',
        zoom: 11,
        center: [121.3912291 /** lat */, 31.2513263 /** lng */],
      })

      mapListApi().then(({ data: { list } }) => {
        mapList.value = list
        mapList.value.forEach((item) => {
          const { lng, lat } = item
          const marker = new AMap.Marker({
            position: [lat, lng],
            title: item.address,
            icon: Object.keys(pngList)[0],
          })
          map.add(marker)
        })
      })
    })
    .catch((err) => {
      console.error(err)
    })
})
</script>

<template>
  <div id="map-container" class="h-[80vh] w-[100%]"></div>
</template>

<style scoped lang="scss"></style>
