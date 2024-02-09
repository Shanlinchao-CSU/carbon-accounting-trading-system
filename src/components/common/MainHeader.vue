<template>
  <el-affix>
    <el-header class="header">
      <div class="logo_and_search">
        <div class="logo">
          <el-image
              style="height: 90px; width: auto"
              title="CNTS首页"
              :fit="'cover'"
              :src="require('@/assets/images/logo.png')">
          </el-image>
        </div>
        <div class="global_search">
          <el-input
              v-model="GlobalSearch"
              placeholder="在此处进行全局搜索"
              class="input"/>
          <el-icon
              class="search_icon"
              :size="40">
            <Search/>
          </el-icon>
        </div>
      </div>
      <div class="personal_operate">
        <div class="msg_box">
          <el-icon
              class="msg_icon"
              title="系统消息"
              :size="50">
            <Message/>
          </el-icon>
          <span class="dot"></span>
        </div>
        <el-dropdown size="large">
          <el-avatar
              :src="require('@/assets/images/account.jpg')"
              :size="50"
              class="account_icon"/>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="accountDetail">账户详情</el-dropdown-item>
              <el-dropdown-item @click="logOut">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </el-affix>
</template>

<script setup>
import { ref } from "vue"
import { Search,Message,Picture } from "@element-plus/icons-vue";

const GlobalSearch = ref('')
const accountDetail = ()=>{

}

const logOut = ()=>{

}
</script>

<style scoped lang="less">
@import '@/assets/css/MainHeader.less';
</style>
