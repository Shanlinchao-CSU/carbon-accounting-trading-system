<template>
  <el-table
      :data="data_show"
      style="font-size: 2vh"
      :row-style="{height: '5.8vh'}"
      border="border">
    <el-table-column fixed="left" label="序号" width="160">
      <template #default="scope">
        {{scope.$index + onePageNumber*currentPage - onePageNumber + 1}}
      </template>
    </el-table-column>
    <el-table-column prop="account_name" label="注册名称" width="400"/>
    <el-table-column
        label="注册用户类型"
        width="240"
        :filter-method="filterHandler"
        :filters="[
            {text:'企业用户',value:'企业用户'},
            {text:'第三方监管机构',value:'第三方监管机构'}
        ]">
      <template #default="scope">
        {{scope.row.type === 1 ? "企业用户" : "第三方监管机构"}}
      </template>
    </el-table-column>
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
        {{scope.row.type === 1 ? scope.row.enterprise_type : "/"}}
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="手机号码" width="220"/>
    <el-table-column label="证明材料" width="200">
      <template #default="scope">
        <el-button link type="primary" @click="downloadFile(scope.row.id)">下载材料</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="220" align="center">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在碳核算历史中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        <div style="display: flex;justify-content: space-around">
          <el-button link type="success" @click="handle_register('POST',scope.row.data_id)" style="font-size: 18px">批准</el-button>
          <el-button link type="danger" @click="handle_register('DELETE',scope.row.data_id)" style="font-size: 18px">驳回</el-button>
        </div>
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
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const currentPage = ref(1)
const pageTotal = ref(0)
const data = ref([])
const all_data = ref([])
const data_show = ref([])
const search_input = ref("")
const onePageNumber = 15
let account = undefined

function getData(reload=true,real=true) {
  if (reload) {
    if (real) {
      axios
          .get(`http://localhost:8080/administrator/application/review`)
          .then(resp=>{
            if (resp.status === 200) {
              if (resp.data.code === 0) {
                console.log(resp.data.data)
                all_data.value = resp.data.data
                data.value = all_data.value
                pageTotal.value = data.value.length
                if (pageTotal.value <= currentPage.value*onePageNumber-onePageNumber) {
                  currentPage.value = pageTotal.value / onePageNumber + 1
                }
                data_show.value = get_data_for_show(currentPage.value)
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
      data.value = all_data.value
      pageTotal.value = data.value.length
      if (pageTotal.value <= currentPage.value*onePageNumber-onePageNumber) {
        currentPage.value = pageTotal.value / onePageNumber + 1
      }
      data_show.value = get_data_for_show(currentPage.value)
    }
  }else {
    pageTotal.value = data.value.length
    currentPage.value = 1
    data_show.value = get_data_for_show(currentPage.value)
  }
}
function get_data_for_show(page) {
  return data.value.slice(page*onePageNumber-onePageNumber,page*onePageNumber)
}
function filterHandler(value,row) {
  return row.enterprise_type === value
}
function Searching() {
  if (!search_input.value || !search_input.value.trim()){
    data.value = all_data.value
  }else {
    data.value = []
    all_data.value.forEach(item => {
      if (item.account_name.includes(search_input.value)
          || item.phone.includes(search_input.value)){
        data.value.push(item)
      }
    })
  }
  getData(false)
}
function downloadFile(id) {
  const link = document.createElement('a')
  link.href = 'http://localhost:8080/administrator/accounting_record/file?id='+id
  link.click()
}
function handle_register(method,id) {
  let url = 'http://localhost:8080/administrator/application?data_id='+id+'&account_id='+account.account_id
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
        all_data.value = all_data.value.filter(item => item.data_id === id)
        getData(false,false)
      }else {
        ElMessage({
          message: "失 败 , 正 在 重 新 加 载 !",
          type: 'error',
          offset: 70
        })
        getData()
      }
    }else {
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
onMounted(()=>{
  getData()
  account = JSON.parse(localStorage.getItem("account"))
})
</script>

<style scoped lang="less">

</style>