<template>
<!--审核核算结果组件-->
  <el-table
      :data="record_show"
      style="font-size: 1.6vh"
      :row-style="{height: '5.8vh'}"
      @sort-change="sortChange"
      border="border">
    <el-table-column fixed="left" label="序号" width="120">
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
    <el-table-column label="证明材料" width="200">
      <template #default="scope">
        <el-button link type="primary" @click="downloadFile(scope.row.id)">下载材料</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="240" align="right">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在碳核算申请中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        <div style="display: flex;justify-content: space-around">
          <el-button link @click="verify(scope.row.id)" style="font-size: 18px">验证</el-button>
          <el-button link type="success" @click="handle_record(true,scope.row)" style="font-size: 18px">批准</el-button>
          <el-button link type="danger" @click="handle_record(false,scope.row)" style="font-size: 18px">驳回</el-button>
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
import {ref, reactive, watch, onMounted, computed} from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from "axios";
import $target from "@/main";
import $node_target from "@/main"

const currentPage = ref(1)
const pageTotal = ref(0)
const accounting_record = ref([])
const all_accounting_record = ref([])
const record_show = ref([])
const dialog_show = ref(false)
const dialog_list = ref([])
let jsonObject = undefined
const search_input = ref("")
// 设置一页多少条记录
let onePageNumber = 15
let account = undefined

function getData(reload=true,real=true) {
  //reload用于删除数据的情况,非reload用于查询的情况
  if (reload) {
    if (real) {
      axios
          .get(`${$target.$target}/administrator/accounting_record/review`)
          .then(resp=>{
            if (resp.status === 200) {
              if (resp.data.code === 0) {
                console.log(resp.data.data)
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

function downloadFile(id) {
  const link = document.createElement('a')
  link.href = `${$target.$target}/administrator/accounting_record/file?id=`+id
  link.click()
}
function get_data_for_show(page) {
  return accounting_record.value.slice(page*onePageNumber-onePageNumber,page*onePageNumber)
}
function changePage(page) {
  record_show.value = get_data_for_show(page)
  currentPage.value = page
}
function verify(id) {
  axios
      .get(`${$target.$target}/dataAuditors/verify_result?id=`+id)
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          if (res.data.code === 0) {
            ElMessage({
              type: 'success',
              message: '通过验证,核算结果正确!',
            })
          }else {
            ElMessage({
              message: "审核未通过,计算结果为"+res.data.data,
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
}
function handle_record(state,row) {
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
          axios
              .post(`${$target.$target}/dataAuditors/carbon_accounting?id=`+row.id+"&approve="+state+"&conductor_id="+account.account_id)
              .then(async res => {
                if (res.status === 200) {
                  if (res.data.code === 0) {
                    axios
                        .post(`${$node_target.$node_target}/api/submitCarbonReport?report=`+generateCarbonReport(row)+"&amount="+row.result+"&publicKey="+row.public_key+"&account_id="+row.enterprise_id)
                        .then(resp=>{
                          if (resp.status === 200) {
                            ElMessage({
                              type: 'success',
                              message: '审核通过,已生成报告并上链!',
                            })
                            all_accounting_record.value = all_accounting_record.value.filter(item => item.id !== row.id)
                            getData(true, false)
                          }
                        })
                  } else {
                    ElMessage({
                      type: 'error',
                      message: '该申请已被处理!',
                    })
                    all_accounting_record.value = all_accounting_record.value.filter(item => item.id !== row.id)
                    getData(true, false)
                  }
                } else {
                  ElMessage({
                    message: "失 败 , 请 检 查 网 络 !",
                    type: 'error',
                    offset: 70
                  })
                }
              })
        })
  }else {
    axios
        .post(`${$target.$target}/dataAuditors/carbon_accounting?id=`+row.id+"&approve="+state+"&conductor_id="+account.account_id)
        .then(res => {
          if (res.status === 200) {
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
            all_accounting_record.value = all_accounting_record.value.filter(item => item.id !== row.id)
            getData(true,false)
          }else {
            ElMessage({
              message: "失 败 , 请 检 查 网 络 !",
              type: 'error',
              offset: 70
            })
          }
        })
  }
}
function generateCarbonReport(row) {
  let report = {}
  report.account_id = row.enterprise_id
  report.account_name = row.account_name
  report.enterprise_type = row.enterprise_type
  report.conductor_id = row.conductor_id
  report.month = row.month
  report.result = row.result
  report.variable_json = JSON.parse(row.variable_json)
  return JSON.stringify(report)
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
  account = JSON.parse(localStorage.getItem("account"))
})
</script>

<style scoped lang="less">
@import '@/assets/css/AuditData.less';
</style>