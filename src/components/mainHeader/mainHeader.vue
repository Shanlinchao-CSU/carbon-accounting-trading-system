<template>
    <el-affix>
        <el-header class="header">
            <div class="logo_and_search">
                <div class="logo">
                    <el-image
                        style="height: 40px; width: auto"
                        title="CNTS首页"
                        :fit="'cover'"
                        :src="require('./img/logo.png')"
                    >
                    </el-image>
                </div>
                <div class="global_search">
                    <el-input
                        v-model="GlobalSearch"
                        placeholder="在此处进行全局搜索"
                        class="input"
                    />
                    <el-icon class="search_icon" :size="40">
                        <Search />
                    </el-icon>
                </div>
            </div>
            <div class="personal_operate">
                <div class="msg_box">
                    <el-icon class="msg_icon" title="系统消息" :size="50">
                        <Message />
                    </el-icon>
                    <span class="dot"></span>
                </div>
                <el-dropdown size="large">
                    <el-avatar
                        :src="require('./img/account.jpg')"
                        :size="50"
                        class="account_icon"
                    />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="accountDetail"
                                >账户详情</el-dropdown-item
                            >
                            <el-dropdown-item @click="logOut"
                                >注销登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>
    </el-affix>
</template>

<script setup>
import { ref } from "vue";
import { Search, Message, Picture } from "@element-plus/icons-vue";

const GlobalSearch = ref("");
const accountDetail = () => {};

const logOut = () => {};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding-top: 10px;
  padding-bottom: 15px;
  height: 50px;
}
.logo_and_search {
    display: flex;
}
.logo {
    height: fit-content;
    margin-right: 200px;
    cursor: pointer;
}
.global_search {
    display: flex;
    align-items: center;
    width: 580px;
    cursor: pointer;
}
.input {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
}
.search_icon {
    margin-left: -50px;
}
.search_icon:hover {
    color: @pointer_on;
}
.personal_operate {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-left: 160px;
}
.msg_box {
    display: flex;
}
.msg_icon {
    cursor: pointer;
    z-index: @msgIcon;
}
.msg_icon:hover {
    color: @pointer_on;
}
.dot {
    height: 15px;
    width: 15px;
    background-color: red;
    border-radius: 50%;
    margin-left: -15px;
    margin-top: 2px;
    z-index: @msgDot;
}
.account_icon {
      margin-left: 40px;
    }
</style>
