<template>
<!--审核核算结果组件-->
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
    <el-table-column prop="result" label="核算结果" width="180">
      <template #default="scope">
        <span @click="showDialog(scope.row.variable_json)" class="table_result">{{scope.row.result}}</span>
      </template>
    </el-table-column>
    <el-table-column label="证明材料" width="200">
      <template #default="scope">
        <el-button link type="primary" @click="downloadFile(scope.row.enterprise_id)">下载材料</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button link type="success" @click="handle_record(true)">批准</el-button>
        <el-button link type="danger" @click="handle_record(false)">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev,pager,next"
      :total="pageTotal"
      :current-page="currentPage"
      @update:current-page="changePage"
      :page-size="10"
      style="position: absolute;right: 200px;margin-top: 10px"/>
  <el-dialog v-model="dialog_show" width="520" center>
    <el-table
        :data="dialog_list"
        :row-style="{height: '60px'}"
        max-height="600px"
        style="font-size: 22px"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
      <el-table-column label="参数名" width="180">
        <template #default="scope">
          <div class="dialog_cell">{{scope.row.key}}</div>
        </template>
      </el-table-column>
      <el-table-column label="属性值" width="330">
        <template #default="scope">
          <div class="dialog_cell">{{scope.row.value}}</div>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import {ref, reactive, watch, onMounted, computed} from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from "axios";

const currentPage = ref(1)
const pageTotal = ref(0)
const accounting_record = ref([])
const record_show = ref([])
const dialog_show = ref(false)
const dialog_list = ref([])
let jsonObject = undefined

function downloadFile(enterprise_id) {
  const link = document.createElement('a')
  //TODO 完成下载后端链接
  link.href = 'http'
  link.download = enterprise_id+'-证明材料'
  link.click()
}
function getData() {
  //TODO 获取所有数据
  for (let i=0;i<64;i++) {
    accounting_record.value.push({
      enterprise_name: "北京三快在线科技有限公司",
      enterprise_id: i+"",
      month: "9",
      time: "2024-3-5 18:44",
      result: "4396",
      enterprise_type: "煤炭型企业",
      variable_json: `{
        "name": "John Doe",
        "age": "30",
        "city": "New York",
        "occupation": "Software Engineer"
      }`
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
function handle_record(state) {
  if (state) {
    ElMessageBox.confirm(
        '审批后永久无法更改,确定批准吗?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )
        .then(() => {
          //TODO 向后端发送处理申请请求
          axios
              .get("")
              .then(res => {
                if (res.data.code === 0) {
                  ElMessage({
                    type: 'success',
                    message: '审核通过!',
                  })
                }else {
                  ElMessage({
                    type: 'error',
                    message: '该申请已被处理!',
                  })
                }
              })
        })
  }else {
    //TODO 向后端发送处理申请请求
    axios
        .get("")
        .then(res => {
          if (res.data.code === 0) {
            ElMessage({
              type: 'success',
              message: '驳回申请成功!'
            })
          }else {
            ElMessage({
              type: 'error',
              message: '该申请已被处理!',
            })
          }
        })
  }
  getData()
}
function showDialog(json) {
  jsonObject = JSON.parse(json)
  dialog_list.value = Object.keys(jsonObject).map(key => {
    return {
      key: key,
      value: jsonObject[key]
    };
  });
  dialog_show.value = true
}

onMounted(()=>{
  getData()
})
</script>

<style scoped lang="less">
@import '@/assets/css/DataAuditor/AuditData.less';
</style>