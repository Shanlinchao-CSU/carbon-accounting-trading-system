<template>
  <el-table
      :data="data_show"
      style="font-size: 1.6vh"
      :row-style="{height: '5.8vh'}"
      @sort-change="sortChange"
      border="border">
    <el-table-column fixed="left" label="序号" width="160">
      <template #default="scope">
        {{scope.$index + onePageNumber*currentPage - onePageNumber + 1}}
      </template>
    </el-table-column>
    <el-table-column prop="account_id" label="企业ID" width="240"/>
    <el-table-column prop="account_name" label="企业名称" width="280"/>
    <el-table-column
        label="企业类型"
        width="240"
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
            {text:'其它企业',value:'其它企业'}
        ]">
      <template #default="scope">
        {{scope.row.enterprise_type}}
      </template>
    </el-table-column>
    <el-table-column prop="month" label="合算月份" width="220" sortable="custom"/>
    <el-table-column prop="result" label="核算结果" width="180" sortable="custom">
      <template #default="scope">
        <span @click="showDialog(scope.row.variable_json)" class="table_result">{{scope.row.result}}</span>
      </template>
    </el-table-column>
    <el-table-column label="证明材料" width="200" fixed="right">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在核算历史中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        <el-button link type="primary" @click="downloadFile(scope.row.id)">下载材料</el-button>
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
import App from "@/chainUtil/CarbonCredits"

const currentPage = ref(1)
const pageTotal = ref(0)
const data = ref([])
const all_data = ref([])
const data_show = ref([])
const search_input = ref("")
const onePageNumber = 15
const dialog_show = ref(false)
const dialog_list = ref([])
let account = undefined
let jsonObject = undefined

async function getData(reload = true, real = true) {
  if (reload) {
    if (real) {
      all_data.value = await App.getCarbonReport()
      data.value = all_data.value
      pageTotal.value = data.value.length
      if (pageTotal.value <= currentPage.value * onePageNumber - onePageNumber) {
        currentPage.value = pageTotal.value / onePageNumber + 1
      }
      data_show.value = get_data_for_show(currentPage.value)
    } else {
      data.value = all_data.value
      pageTotal.value = data.value.length
      if (pageTotal.value <= currentPage.value * onePageNumber - onePageNumber) {
        currentPage.value = pageTotal.value / onePageNumber + 1
      }
      data_show.value = get_data_for_show(currentPage.value)
    }
  } else {
    pageTotal.value = data.value.length
    currentPage.value = 1
    data_show.value = get_data_for_show(currentPage.value)
  }
}

function get_data_for_show(page) {
  return data.value.slice(page * onePageNumber - onePageNumber, page * onePageNumber)
}

function filterHandler(value, row) {
  return row.enterprise_type === value
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
function Searching() {
  if (!search_input.value || !search_input.value.trim()) {
    data.value = all_data.value
  } else {
    data.value = []
    all_data.value.forEach(item => {
      if (item.account_name.includes(search_input.value)
          || String(item.account_id).includes(search_input.value)) {
        data.value.push(item)
      }
    })
  }
  getData(false)
}
function sortChange(column) {
  let order = column.order
  let prop = column.prop
  if (order === "ascending") {
    data.value = data.value.sort((a,b) => {
      if (prop === "month") {
        let time_a = new Date(a[prop])
        let time_b = new Date(b[prop])
        if (time_a.getTime() === time_b.getTime()) {
          return 0
        }else {
          return time_a-time_b
        }
      }else {
        return (parseInt(a[prop])-parseInt(b[prop]))
      }
    })
  }else if (order === "descending") {
    data.value = data.value.sort((a,b) => {
      if (prop === "month") {
        if (a === null) {
          return -1
        }
        if (b === null) {
          return 1
        }
        let time_a = new Date(a[prop])
        let time_b = new Date(b[prop])
        if (time_a.getTime() === time_b.getTime()) {
          return 0
        }else {
          return time_b-time_a
        }
      }else {
        return (parseInt(b[prop])-parseInt(a[prop]))
      }
    })
  }
  getData(false,false)
}

function downloadFile(id) {
  const link = document.createElement('a')
  link.href = 'http://localhost:8080/administrator/accounting_record/file?id=' + id
  link.click()
}

function handle_register(method, id) {
  let url = 'http://localhost:8080/administrator/application?register_application_id=' + id + '&account_id=' + account.account_id
  axios({
    method: method,
    url: url
  }).then(resp => {
    if (resp.status === 200) {
      if (resp.data.code === 0) {
        ElMessage({
          message: "操 作 成 功 !",
          type: 'success',
          offset: 70
        })
        all_data.value = all_data.value.filter(item => item.register_application_id !== id)
        getData(true, false)
      } else {
        ElMessage({
          message: "失 败 , 正 在 重 新 加 载 !",
          type: 'error',
          offset: 70
        })
        getData()
      }
    } else {
      ElMessage({
        message: "失 败 , 请 检 查 网 络 !",
        type: 'error',
        offset: 70
      })
    }
  })
}

function changePage(page) {
  data_show.value = get_data_for_show(page)
  currentPage.value = page
}

onMounted(() => {
  getData()
  account = JSON.parse(localStorage.getItem("account"))
})
</script>

<style scoped lang="less">
.cell {
  background: black;
}
</style>