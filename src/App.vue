<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import DevicePixelRatio from "@/util/evice"
import {onMounted} from "vue";

const bodyScale = () => {
  const devicewidth = document.documentElement.clientWidth;//获取当前分辨率下的可是区域宽度
  const scale = devicewidth / 1920; // 分母——设计稿的尺寸
  document.body.style.zoom = scale;//放大缩小相应倍数
}

onMounted(()=>{
  new DevicePixelRatio().init()
  bodyScale()
})
</script>
<style scoped lang="less">
html,body,#app{
  height: 100%;
}
</style>
