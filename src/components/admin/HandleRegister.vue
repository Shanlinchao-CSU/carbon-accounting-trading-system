<template>
  <el-table
      :data="data_show"
      style="font-size: 1.6vh"
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
    <el-table-column prop="email" label="邮箱" width="220"/>
    <el-table-column label="证明材料" width="200">
      <template #default="scope">
        <el-button link type="primary" @click="downloadFile(scope.row.register_application_id)">下载材料</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="220" align="center">
      <template #header>
        <el-input
            v-model="search_input"
            size="default"
            placeholder="在注册申请中搜索"
            @keyup.enter="Searching"/>
      </template>
      <template #default="scope">
        <div style="display: flex;justify-content: space-around">
          <el-button link type="success" @click="handle_register('POST',scope.row.register_application_id,scope.row.public_key,scope.row.type,scope.row.account_name)" style="font-size: 18px">批准</el-button>
          <el-button link type="danger" @click="handle_register('DELETE',scope.row.register_application_id)" style="font-size: 18px">驳回</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialog_show" title="设置默认额度" width="360">
    <div style="display: flex;justify-content:center;width: 100%;margin-top: 3%">
      <el-text style="margin-right: 3%">企业名称:</el-text>
      <el-text>{{chosen_name}}</el-text>
    </div>
    <div style="display: flex;justify-content:center;width: 100%;margin-top: 6%">
      <el-text style="margin-right: 3%">默认额度:</el-text>
      <el-input v-model="default_amount" type="number" style="width: 60%"/>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog_show = false">取消</el-button>
        <el-button type="primary" @click="handle_enterprise_register">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
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
import $node_target from "@/main"
import App from "@/chainUtil/CarbonCredits"

const currentPage = ref(1)
const pageTotal = ref(0)
const data = ref([])
const all_data = ref([])
const data_show = ref([])
const search_input = ref("")
const dialog_show = ref(false)
const default_amount = ref(100)
const chosen_name = ref("")
const onePageNumber = 15
let account = undefined
let dialog_id = undefined
let dialog_publicKey = undefined

function getData(reload=true,real=true) {
  if (reload) {
    if (real) {
      axios
          .get(`${$target.$target}/administrator/application/review`)
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
          || String(item.phone).includes(search_input.value)){
        data.value.push(item)
      }
    })
  }
  getData(false)
}
function downloadFile(id) {
  const link = document.createElement('a')
  link.href = `${$target.$target}/administrator/application/file?id=`+id
  link.click()
}
async function handle_register(method, id, public_key, type, account_name) {
  let url = `${$target.$target}/administrator/application?register_application_id=` + id + '&account_id=' + account.account_id
  if (type === 1 && method === 'POST') {
    //企业用户
    default_amount.value = 100
    chosen_name.value = account_name
    dialog_id = id
    dialog_publicKey = public_key
    dialog_show.value = true
  }else {
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
}
function handle_enterprise_register() {
  if (default_amount.value > 0) {
    let url = `${$target.$target}/administrator/application?register_application_id=` + dialog_id + '&account_id=' + account.account_id + '&amount=' + default_amount.value
    axios({
      method: "POST",
      url: url
    }).then(async resp => {
      console.log("123123")
      if (resp.status === 200) {
        if (resp.data.code === 0) {
          //await App.issueAllowance(dialog_publicKey, default_amount.value)
          axios
              .post(`${$node_target.$node_target}/api/register?publicKey=${dialog_publicKey}&coin=50&amount=${default_amount.value}`)
              .then(resp => {
                if (resp.status === 200) {
                  ElMessage({
                    message: "操 作 成 功 !",
                    type: 'success',
                    offset: 70
                  })
                }
              })
          all_data.value = all_data.value.filter(item => item.register_application_id !== dialog_id)
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
      dialog_show.value = false
    })
  }else {
    ElMessage({
      message: "默认额度必须大于0!",
      type: 'error',
      offset: 70
    })
  }
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
.cell{
  background: black;
}
</style>