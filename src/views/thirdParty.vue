<template>
  <!--第三方监管机构界面-->
  <div class="largest_box">
    <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        router="router"
        :default-active="route.path.match(/\/.*?\/(.*)/)[1]">
      <el-menu-item index="transaction_monitor" class="menu_item">
        <el-icon class="menu_icon"><Edit /></el-icon>
        <span class="menu_text">用户交易记录</span>
      </el-menu-item>
      <el-menu-item index="accounting_monitor" class="menu_item">
        <el-icon class="menu_icon"><Coin /></el-icon>
        <span class="menu_text">企业碳核算记录</span>
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
@import "@/assets/css/BackStage.less";
</style>