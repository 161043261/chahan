<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let map = null
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
        center: [121.3912291, 31.2513263],
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
