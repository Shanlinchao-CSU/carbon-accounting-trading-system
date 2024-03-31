<template>
  <!--管理员界面-->
  <div class="largest_box">
    <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        router="router"
        :default-active="route.path.match(/\/.*?\/(.*)/)[1]" popper-effect="dark">
      <el-menu-item index="handle_register" class="menu_item">
        <el-icon class="menu_icon"><EditPen /></el-icon>
        <span class="menu_text">注册申请</span>
      </el-menu-item>
      <el-menu-item index="user_information" class="menu_item">
        <el-icon class="menu_icon"><UserFilled /></el-icon>
        <span class="menu_text">企业用户信息</span>
      </el-menu-item>
      <el-menu-item index="illegality_query" class="menu_item">
        <el-icon class="menu_icon"><WarnTriangleFilled /></el-icon>
        <span class="menu_text">企业超额查询</span>
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