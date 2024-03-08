<template>
<!--审核历史组件-->
  <el-table :data="record_show" style="font-size: 23px" :row-style="{height: '80px'}">
    <el-table-column fixed="left" label="序号" width="160">
      <template #default="scope">
        {{scope.$index + 10*currentPage - 9}}
      </template>
    </el-table-column>
    <el-table-column prop="enterprise_id" label="企业ID" width="200"/>
    <el-table-column prop="enterprise_name" label="企业名称" width="400"/>
    <el-table-column prop="month" label="核算月份" width="170"/>
    <el-table-column prop="time" label="提交时间" width="280"/>
    <el-table-column prop="result" label="核算结果" width="180"/>
  </el-table>
  <el-pagination
      background
      layout="prev,pager,next"
      :total="pageTotal"
      :current-page="currentPage"
      @update:current-page="changePage"
      :page-size="10"
      style="position: absolute;right: 200px;margin-top: 10px"/>
</template>

<script setup>
import {ref} from "vue";

const currentPage = ref(1)
const pageTotal = ref(0)
const accounting_record = ref([])
const record_show = ref([])

function getData() {
  //TODO 获取所有数据
  for (let i=0;i<64;i++) {
    accounting_record.value.push({
      enterprise_name: "北京三快在线科技有限公司",
      enterprise_id: i+"",
      enterprise_type: "煤炭型企业",
      variable_json: "{age:30,url:'www.baidu.com'}",
      month: "9",
      time: "2024-3-5 18:44",
      result: "4396"
    })
  }
  pageTotal.value = accounting_record.value.length
  if (pageTotal.value <= currentPage.value*10-10) {
    currentPage.value = pageTotal.value / 10 + 1
  }
  record_show.value = get_data_for_show(currentPage.value)
  console.log(record_show.value)
}
function get_data_for_show(page) {
  return accounting_record.value.slice(page*10-10,page*10)
}
function changePage(page) {
  record_show.value = get_data_for_show(page)
  currentPage.value = page
}
</script>

<style scoped>

</style>