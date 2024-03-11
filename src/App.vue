<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>

</script>
<style scoped lang="less">
html,body,#app{
  height: 100%;
}
</style>
