<template>
<!--数据审核员界面-->
  <MainHeader/>
  <el-menu
      class="menu"
      default-active="1"
      background-color="#f1f5f8">
    <el-menu-item index="1" :class="class_obj1" @click="changeContent(0)">
      <el-icon class="menu_icon"><Edit /></el-icon>
      <span class="menu_text">数据审核</span>
    </el-menu-item>
    <el-menu-item index="2" :class="class_obj2" @click="changeContent(1)">
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
import {onMounted, reactive, ref, watchEffect} from "vue";

const router = useRouter()
const route = useRoute()
const nowPage = ref(0)
let currentPage = 0

const class_obj1 = reactive({
  menu_item: true,
  is_active: nowPage.value === 0
})
const class_obj2 = reactive({
  menu_item: true,
  is_active: nowPage.value !== 0
})

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

watchEffect(()=>{
  if (route.path==="history"){
    changeContent(1)
  }else{
    changeContent(0)
  }
})
</script>

<style scoped lang="less">
@import '@/assets/css/DataAuditor/DataAuditor.less';
</style>