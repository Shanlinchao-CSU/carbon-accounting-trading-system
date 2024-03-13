<template>
<!--审核历史组件-->
  <el-table
      :data="record_show"
      style="font-size: 23px"
      :row-style="{height: '65px'}"
      @sort-change="sortChange">
    <el-table-column fixed="left" label="序号" width="160">
      <template #default="scope">
        {{scope.$index + 10*currentPage - 9}}
      </template>
    </el-table-column>
    <el-table-column prop="enterprise_id" label="企业ID" width="200" sortable="custom"/>
    <el-table-column prop="enterprise_name" label="企业名称" width="400"/>
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
        <el-button link type="primary" @click="downloadFile(scope.row.id,scope.row.enterprise_id,scope.row.month)">下载证明材料</el-button>
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
import {onMounted, ref} from "vue";
import {Search} from "@element-plus/icons-vue";

const currentPage = ref(1)
const pageTotal = ref(0)
const accounting_record = ref([])
const all_accounting_record = ref([])
const record_show = ref([])
let dialog_list = ref([])
const dialog_show = ref(false)
let jsonObject = undefined
const search_input = ref("")

function getData(reload=true) {
  if (reload){
    //TODO 获取所有数据
    for (let i=0;i<64;i++) {
      all_accounting_record.value.push({
        enterprise_name: "北京三快在线科技有限公司",
        enterprise_id: i+"",
        enterprise_type: "煤炭型企业",
        variable_json: `{"age":"30","url":"www.baidu.com"}`,
        month: "2024-9",
        time: "2024-3-5 18:44",
        result: "4396"
      })
    }
    accounting_record.value = all_accounting_record.value
  }
  pageTotal.value = accounting_record.value.length
  if (reload) {
    if (pageTotal.value <= currentPage.value*10-10) {
      currentPage.value = pageTotal.value / 10 + 1
    }
  }else {
    currentPage.value = 1
  }
  record_show.value = get_data_for_show(currentPage.value)
}
function get_data_for_show(page) {
  return accounting_record.value.slice(page*10-10,page*10)
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
function downloadFile(id,enterprise_id,month) {
  const link = document.createElement('a')
  //TODO 完成下载后端链接
  link.href = 'http'
  link.download = enterprise_id+" "+month
  link.click()
}
function Searching() {
  if (!search_input.value || !search_input.value.trim()){
    accounting_record.value = all_accounting_record.value
  }else {
    accounting_record.value = []
    all_accounting_record.value.forEach(item => {
      if (item.enterprise_name.includes(search_input.value)
          ||item.enterprise_id.includes(search_input.value)
          ||item.enterprise_type.includes(search_input.value)
          ||item.month.includes(search_input.value)){
        accounting_record.value.push(item)
      }
    })
  }
  getData(false)
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
@import "@/assets/css/DataAuditor/AuditData.less";
</style>