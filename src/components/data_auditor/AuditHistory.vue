<template>
<!--审核历史组件-->
  <el-table
      :data="record_show"
      style="font-size: 1.6vh"
      :row-style="{height: '5.8vh'}"
      @sort-change="sortChange"
      border="border">
    <el-table-column fixed="left" label="序号" width="160">
      <template #default="scope">
        {{scope.$index + onePageNumber*currentPage - onePageNumber + 1}}
      </template>
    </el-table-column>
    <el-table-column prop="enterprise_id" label="企业ID" width="200"/>
    <el-table-column prop="account_name" label="企业名称" width="400"/>
    <el-table-column
        prop="enterprise_type"
        label="企业类型"
        width="300"
        :filter-method="filterHandler"
        :filters="[
            {text:'电网企业',value:'电网企业'},
            {text:'化工生产企业',value:'化工生产企业'},
            {text:'电解铝生产企业',value:'电解铝生产企业'},
            {text:'镁冶炼企业',value:'镁冶炼企业'},
            {text:'平板玻璃生产企业',value:'平板玻璃生产企业'},
            {text:'水泥生产企业',value:'水泥生产企业'},
            {text:'陶瓷生产企业',value:'陶瓷生产企业'},
            {text:'民航企业',value:'民航企业'},
            {text:'钢铁生产企业',value:'钢铁生产企业'},
            {text:'发电企业',value:'发电企业'},
            {text:'其它企业',value:'其它企业'},
        ]"/>
    <el-table-column prop="month" label="核算月份" width="170" sortable="custom"/>
    <el-table-column prop="time" label="提交时间" width="280" sortable="custom"/>
    <el-table-column prop="result" label="核算结果" width="180" sortable="custom">
      <template #default="scope">
        <span @click="showDialog(scope.row.variable_json)" class="table_result">{{scope.row.result}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="240" align="center">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在碳核算历史中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        <el-button link type="primary" @click="downloadFile(scope.row.id)">下载证明材料</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination_box" style="display: flex;justify-content: right">
    <el-pagination
        background
        layout="prev,pager,next"
        :total="pageTotal"
        :current-page="currentPage"
        @update:current-page="changePage"
        :page-size="onePageNumber"
        style="margin-top: 1vh"/>
  </div>

  <el-dialog v-model="dialog_show" width="520" center>
    <el-table
        :data="dialog_list"
        :row-style="{height: '3vh'}"
        max-height="40vh"
        style="font-size: 1.6vh"
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
import {onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import $target from "@/main";

const currentPage = ref(1)
const pageTotal = ref(0)
const accounting_record = ref([])
const all_accounting_record = ref([])
const record_show = ref([])
let dialog_list = ref([])
const dialog_show = ref(false)
let jsonObject = undefined
const search_input = ref("")
let onePageNumber = 15

function getData(reload=true,real=true) {
  //reload用于删除数据的情况,非reload用于查询的情况
  if (reload) {
    if (real) {
      axios
          .get(`${$target.$target}/administrator/accounting_record`)
          .then(resp=>{
            if (resp.status === 200) {
              if (resp.data.code === 0) {
                all_accounting_record.value = resp.data.data
                accounting_record.value = all_accounting_record.value
                pageTotal.value = accounting_record.value.length
                if (pageTotal.value <= currentPage.value*onePageNumber-onePageNumber) {
                  currentPage.value = pageTotal.value / onePageNumber + 1
                }
                record_show.value = get_data_for_show(currentPage.value)
              }else {
                ElMessage({
                  message: "获 取 数 据 异 常 !",
                  type: 'error',
                  offset: 70
                })
              }
            }else {
              ElMessage({
                message: "失 败 , 请 检 查 网 络 !",
                type: 'error',
                offset: 70
              })
            }
          })
    }else {
      accounting_record.value = all_accounting_record.value
      pageTotal.value = accounting_record.value.length
      if (pageTotal.value <= currentPage.value*onePageNumber-onePageNumber) {
        currentPage.value = pageTotal.value / onePageNumber + 1
      }
      record_show.value = get_data_for_show(currentPage.value)
    }
  }else {
    pageTotal.value = accounting_record.value.length
    currentPage.value = 1
    record_show.value = get_data_for_show(currentPage.value)
  }
}

function get_data_for_show(page) {
  return accounting_record.value.slice(page*onePageNumber-onePageNumber,page*onePageNumber)
}
function changePage(page) {
  record_show.value = get_data_for_show(page)
  currentPage.value = page
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
function downloadFile(id) {
  const link = document.createElement('a')
  link.href = `${$target.$target}/administrator/accounting_record/file?id=`+id
  link.click()
}
function Searching() {
  if (!search_input.value || !search_input.value.trim()){
    accounting_record.value = all_accounting_record.value
  }else {
    accounting_record.value = []
    all_accounting_record.value.forEach(item => {
      if (item.account_name.includes(search_input.value)
          ||String(item.enterprise_id).includes(search_input.value)){
        accounting_record.value.push(item)
      }
    })
  }
  getData(false,false)
}
function sortChange(column) {
  let order = column.order
  let prop = column.prop
  if (order === "ascending") {
    accounting_record.value = accounting_record.value.sort((a,b) => {
      if (prop === "enterprise_id" || prop === "result") {
        let id_a = parseInt(a[prop])
        let id_b = parseInt(b[prop])
        if (id_a < id_b) return -1
        else if (id_a > id_b) return 1
        else return 0
      }else {
        let time_a = new Date(a[prop])
        let time_b = new Date(b[prop])
        if (time_a.getTime() === time_b.getTime()) {
          return 0
        }else {
          return time_a-time_b
        }
      }
    })
  }else if (order === "descending") {
    accounting_record.value = accounting_record.value.sort((a,b) => {
      if (prop === "enterprise_id" || prop === "result") {
        let id_a = parseInt(a[prop])
        let id_b = parseInt(b[prop])
        if (id_a < id_b) return 1
        else if (id_a > id_b) return -1
        else return 0
      }else {
        let time_a = new Date(a[prop])
        let time_b = new Date(b[prop])
        if (time_a.getTime() === time_b.getTime()) {
          return 0
        }else {
          return time_b-time_a
        }
      }
    })
  }
  getData(false)
}
function filterHandler(value,row) {
  return row.enterprise_type === value
}
onMounted(()=>{
  getData()
})
</script>

<style scoped lang="less">
@import "@/assets/css/AuditData.less";
</style>