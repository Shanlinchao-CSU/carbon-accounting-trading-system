<template>
  <!--管理员界面-->
  <MainHeader/>
  <el-menu
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      router="router"
      :default-active="route.path.match(/\/.*?\/(.*)/)[1]" popper-effect="dark">

      <el-menu-item index="handle_register">
        <el-icon><EditPen /></el-icon>
        <span class="menu_text">注册申请</span>
      </el-menu-item>

    <el-menu-item index="user_information">
      <el-icon class="menu_icon"><UserFilled /></el-icon>
      <span class="menu_text">用户信息</span>
    </el-menu-item>

    <el-menu-item index="illegality_query">
      <el-icon class="menu_icon"><WarnTriangleFilled /></el-icon>
      <span class="menu_text">企业超额查询</span>
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