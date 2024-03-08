<template>
<!--数据审核员界面-->
  <MainHeader/>
  <el-menu
      class="menu"
      default-active="1"
      background-color="#f1f5f8">
    <el-menu-item index="1" class="menu_item" @click="changeContent(0)">
      <el-icon class="menu_icon"><Edit /></el-icon>
      <span class="menu_text">数据审核</span>
    </el-menu-item>
    <el-menu-item index="2" class="menu_item" @click="changeContent(1)">
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
import {useRoute,useRouter} from "vue-router";

const router = useRouter()
let currentPage = 0;


function changeContent(page) {
  if (page !== currentPage) {
    if (page === 0) {
      router.push('/auditing')
    }else {
      router.push('/history')
    }
  }
  currentPage = page
}

</script>

<style scoped lang="less">
@import '@/assets/css/DataAuditor/DataAuditor.less';
</style>