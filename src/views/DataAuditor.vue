<template>
<!--数据审核员界面-->
  <MainHeader/>
  <el-menu
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      router="router"
      :default-active="route.path.match(/\/.*?\/(.*)/)[1]">
    <el-menu-item index="auditing">
      <el-icon class="menu_icon"><Edit /></el-icon>
      <span class="menu_text">数据审核</span>
    </el-menu-item>
    <el-menu-item index="history">
      <el-icon class="menu_icon"><Tickets /></el-icon>
      <span class="menu_text">审核记录</span>
    </el-menu-item>
  </el-menu>
  <div class="content_box">
    <router-view/>
  </div>
</template>

<script setup>
import MainHeader from '@/components/common/MainHeader.vue'
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<style scoped lang="less">
@import '@/assets/css/DataAuditor/DataAuditor.less';
</style>