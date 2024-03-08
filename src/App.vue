<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const router = useRouter()
onMounted(() => {
  router.push("/auditing")
})
</script>
<style scoped lang="less">
html,body,#app{
  height: 100%;
}
</style>
