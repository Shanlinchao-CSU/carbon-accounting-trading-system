<template>
<!--数据审核员界面-->
  <div class="largest_box">
    <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        router="router"
        :default-active="route.path.match(/\/.*?\/(.*)/)[1]">
      <el-menu-item index="auditing" class="menu_item">
        <el-icon class="menu_icon"><Edit /></el-icon>
        <span class="menu_text">数据审核</span>
      </el-menu-item>
      <el-menu-item index="history" class="menu_item">
        <el-icon class="menu_icon"><Tickets /></el-icon>
        <span class="menu_text">审核记录</span>
      </el-menu-item>
    </el-menu>
    <div class="content_box">
      <div class="position_box">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<style scoped lang="less">
@import '@/assets/css/BackStage.less';
</style>