<template>
  <el-button @click="test1">测试1</el-button>
  <el-button @click="test2">测试2</el-button>
  <el-button @click="test3">测试3</el-button>
  <el-table
      :data="data_show"
      style="font-size: 1.6vh"
      :row-style="{height: '5.8vh'}"
      @sort-change="sortChange"
      border="border">
    <el-table-column fixed="left" width="200">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在交易历史中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        {{scope.$index + onePageNumber*currentPage - onePageNumber + 1}}
      </template>
    </el-table-column>
    <el-table-column prop="_to_id" label="买家ID" width="160"/>
    <el-table-column prop="_to_name" label="买家名称" width="400"/>
    <el-table-column
        label="买家企业类型"
        width="200"
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
        {{scope.row._to_type}}
      </template>
    </el-table-column>
    <el-table-column prop="_from_id" label="卖家ID" width="160"/>
    <el-table-column prop="_from_name" label="卖家名称" width="400"/>
    <el-table-column
        label="卖家企业类型"
        width="200"
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
        {{scope.row._from_type}}
      </template>
    </el-table-column>
    <el-table-column prop="_amount" label="交易额度" width="200"/>
    <el-table-column prop="unit_price" label="交易单价" width="200"/>
    <el-table-column prop="_amount" label="交易总价" width="200"/>
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
import App from "@/chainUtil/CarbonCredits";
import axios from "axios";
import {ElMessage} from "element-plus";

const currentPage = ref(1)
const pageTotal = ref(0)
const data = ref([])
const all_data = ref([])
const data_show = ref([])
const search_input = ref("")
const onePageNumber = 15

let transaction_monitor = undefined

async function test1() {
  await App.uploadReport("123")
}
async function test2() {
  let temp = await App.getCarbonReport()
  console.log(temp)
}
async function test3() {
  const seller = "0x8b751a0226707Ef8Df389078B288D13A415343b7"
  let temp = await App.carbonTransaction(seller,200,50)
  console.log(temp)
}
async function getData(reload=true,real=true) {
  if (reload) {
    if (real) {
      let public_keys = []
      transaction_monitor = await App.getTransactionHistory()
      console.log(transaction_monitor)
      transaction_monitor.forEach(value => {
        console.log(value)
        all_data.value.push(value)
        public_keys.push(value._to,value._from) //卖家公钥,买家公钥
      })

      axios
          .post(`http://localhost:8080/enterprise/info/address`,JSON.stringify(public_keys),{
            headers: {
              "Content-Type":"application/json;charset=utf-8"
            }
          })
          .then(resp=>{
            console.log(resp)
            if (resp.status === 200) {
              if (resp.data.code === 0) {
                let res_data = resp.data.data
                for (let i=0;i<all_data.value.length;i++) {
                  all_data.value[i]._to_id = res_data[i*2].account_id
                  all_data.value[i]._to_name = res_data[i*2].account_name
                  all_data.value[i]._to_type = res_data[i*2].enterprise_type
                  all_data.value[i]._from_id = res_data[i*2+1].account_id
                  all_data.value[i]._from_name = res_data[i*2+1].account_name
                  all_data.value[i]._from_type = res_data[i*2+1].enterprise_type
                }
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

function sortChange(column) {
  let order = column.order
  let prop = column.prop
  if (order === "ascending") {
    data.value = data.value.sort((a,b) => {
      if (prop === "_time") {
        let time_a = new Date(a[prop])
        let time_b = new Date(b[prop])
        if (time_a.getTime() === time_b.getTime()) {
          return 0
        }else {
          return time_a-time_b
        }
      }else {
        return (a[prop]-b[prop])
      }
    })
  }else if (order === "descending") {
    data.value = data.value.sort((a,b) => {
      if (prop === "_time") {
        let time_a = new Date(a[prop])
        let time_b = new Date(b[prop])
        if (time_a.getTime() === time_b.getTime()) {
          return 0
        }else {
          return time_b-time_a
        }
      }else {
        return (b[prop]-a[prop])
      }
    })
  }
  getData(false,false)
}

function Searching() {
  if (!search_input.value || !search_input.value.trim()){
    data.value = all_data.value
  }else {
    data.value = []
    all_data.value.forEach(item => {
      if (item.account_name.includes(search_input.value)
          || String(item.account_id).includes(search_input.value)){
        data.value.push(item)
      }
    })
  }
  getData(false,false)
}

function filterHandler(value,row) {
  return row.enterprise_type === value
}

onMounted(async () => {
  await getData()
})
</script>

<style scoped>

</style>