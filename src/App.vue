<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import MainHeader from "@/components/common/MainHeader.vue"
</script>
<style scoped lang="less">
html,body,#app{
  height: 100%;
}
</style>
