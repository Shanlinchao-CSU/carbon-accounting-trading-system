<template>
  <!--第三方监管机构界面-->
  <el-menu
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      router="router"
      :default-active="route.path.match(/\/.*?\/(.*)/)[1]">
    <el-menu-item index="transaction_monitor">
      <el-icon class="menu_icon"><Edit /></el-icon>
      <span class="menu_text">用户交易记录</span>
    </el-menu-item>
    <el-menu-item index="accounting_monitor">
      <el-image
          style="height: 18px; width: auto"
          :fit="'cover'"
          :src="require('@/assets/images/transaction.png')">
      </el-image>
      <span class="menu_text">企业碳核算记录</span>
    </el-menu-item>
  </el-menu>
  <div class="content_box">
    <router-view/>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
const route = useRoute()
</script>

<style scoped lang="less">
@import "@/assets/css/DataAuditor/DataAuditor.less";
</style>