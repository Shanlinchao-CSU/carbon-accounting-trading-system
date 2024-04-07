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
    <el-table-column prop="account_id" label="账户ID" width="200"/>
    <el-table-column prop="account_name" label="企业名称" width="400"/>
    <el-table-column
        prop="enterprise_type"
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
        ]"/>
    <el-table-column prop="t_limit" label="排放限额" width="140" sortable="custom">
      <template #default="scope">
        <span v-if="scope.row.account_id !== chosen_id">{{scope.row.t_limit}}</span>
        <el-input
            size="small"
            type="number"
            style="height: 3vh;line-height: 2.8vh;font-size: 1.8vh"
            v-model="chosen_limit"
            v-else/>
      </template>
    </el-table-column>
    <el-table-column prop="limit_next_month" label="排放限额预期修改" width="200">
      <template #default="scope">
        {{scope.limit_next_month === "" ? "无修改" : scope.limit_next_month}}
      </template>
    </el-table-column>
    <el-table-column prop="t_coin" label="炭币余额" width="140" sortable="custom"/>
    <el-table-column prop="phone" label="手机号码" width="220"/>
    <el-table-column prop="email" label="电子邮箱" width="300"/>
    <el-table-column fixed="right" width="220" align="center">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在企业用户中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        <div style="display: flex;justify-content: space-around">
          <el-button
              link
              type="success"
              @click="chosen_limit='';chosen_id = scope.row.account_id"
              style="font-size: 18px"
              v-if="chosen_id !== scope.row.account_id">修改额度</el-button>
          <el-button
              link
              type="success"
              @click="changeLimit(scope.row)"
              style="font-size: 18px"
              v-else>保存</el-button>
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
import $target from "@/main";

const currentPage = ref(1)
const pageTotal = ref(0)
const data = ref([])
const all_data = ref([])
const data_show = ref([])
const search_input = ref("")
const onePageNumber = 15
let account = undefined
// 当前选中的账户ID
const chosen_id = ref()
// 当前选中的账户的额度
const chosen_limit = ref()

function getData(reload=true,real=true) {
  if (reload) {
    if (real) {
      axios
          .get(`${$target}/administrator/enterprise/accounts`)
          .then(resp=>{
            if (resp.status === 200) {
              if (resp.data.code === 0) {
                all_data.value = resp.data.data
                console.log(all_data.value)
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
      if (String(item.account_id).includes(search_input.value)
          || item.account_name.includes(search_input.value)
          || String(item.phone).includes(search_input.value)
          || item.email.includes(search_input.value)){
        data.value.push(item)
      }
    })
  }
  getData(false,false)
}

function changePage(page) {
  data_show.value = get_data_for_show(page)
  currentPage.value = page
}
function changeLimit(row) {
  if (chosen_limit.value === "" || chosen_limit.value === null || chosen_limit.value<0 || chosen_limit.value === String(row.t_limit)) {
    chosen_id.value = ""
  }else {
    axios
        .patch(`${$target}/administrator/enterprise/t_limit?account_id=`+row.account_id+"&t_limit="+chosen_limit.value)
        .then(resp=>{
          if (resp.status === 200) {
            if (resp.data.code === 0) {
              ElMessage({
                message: "修改成功,将于下月进行核算时生效!",
                type: 'success',
                offset: 70
              })
              let account = all_data.value.find(obj => String(obj.account_id) === String(row.account_id))
              account.limit_next_month = chosen_limit.value
            }else {
              ElMessage({
                message: "修 改 失 败 !",
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
          chosen_id.value = ""
          getData(true,false)
        })
  }
}
function sortChange(column) {
  let order = column.order
  let prop = column.prop
  if (order === "ascending") {
    data.value = data.value.sort((a,b) => {
      return (a[prop]-b[prop])
    })
  }else if (order === "descending") {
    data.value = data.value.sort((a,b) => {
      return (b[prop]-a[prop])
    })
  }
  getData(false,false)
}
onMounted(()=>{
  getData()
  account = JSON.parse(localStorage.getItem("account"))
})
</script>

<style scoped lang="less">

</style>