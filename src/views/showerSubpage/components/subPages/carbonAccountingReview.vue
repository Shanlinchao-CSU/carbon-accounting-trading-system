<!-- 碳核算历史查看 -->
<template>
    <div class="container" ref="container">
        <div class="main_title">碳核算历史查看</div>
        <div class="edit_power_reminder_1" v-if="!isLogin">
            在进行查看操作前，您必须<button class="login_button">
                登录账号
            </button>
        </div>
        <linePrompt
            v-if="isLogin"
            :opacity="error"
            :data_left="error"
            :type="prompt_type"
            class="line_reminder"
        ></linePrompt>
        <!-- 表格 -->
        <div class="table_container" v-if="isLogin">
            <el-table
                :data="currentTableData"
                style="width: 100%"
                @sort-change="handleSortChange"
            >
                <el-table-column
                    prop="month"
                    label="日期"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="id"
                    label="ID"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="conductor_id"
                    label="处理人ID"
                    fit="true"
                >
                  <template #default="scope">
                    {{scope.row.conductor_id === 0 ? "待处理" : scope.row.conductor_id}}
                  </template>
                </el-table-column>
                <el-table-column
                    prop="account_name"
                    label="用户名"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="enterprise_type"
                    label="企业类型"
                    fit="true"
                ></el-table-column>
            </el-table>

            <!-- 分页控件 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import textInput from "@/components/inputs/textInput/textInput.vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import Storage from "@/assets/js/storage/storage.js";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import connector from "@/assets/js/connector/connector";
import Checker from "@/assets/js/checker/checker.js";
import modelSelect from "@/components/selects/borderSelect/modelSelect.vue";
import store from "@/store/index.js";
import axios from "axios";
import $target from "@/main";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    data() {
        return {
            dialogVisible: false,
            isLogin: true,
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 1, // 假设总共有100条数据
            prompt_type: "",
            error: "",
        };
    },
    computed: {
        currentTableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
        },
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        handleSizeChange(newSize) {
            // this.pageSize = newSize;
            // this.currentPage = 1; // 重置当前页码为第一页
            // this.fetchData();
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            // this.fetchData();
        },
        getSellMsg(enterpriseId) {
            let url = `${$target}/enterprise/accounting_record/` + enterpriseId;
            axios
                .get(
                    url
                )
                .then((resp) => {
                    if (resp.status === 200) {
                        if (resp.data.code === 0) {
                            // 请求数据成功
                            this.prompt_type = "success";
                            this.error = "请求信息成功";
                            // console.log("resp.data.data", resp.data.data);
                            this.tableData = resp.data.data;
                            this.total = resp.data.data.length;
                        } else {
                            this.error = "请求信息失败";
                            this.prompt_type = "error";
                            this.tableData = [];
                            this.total = 0;
                        }
                    } else {
                        this.error = "请求信息失败";
                        this.prompt_type = "error";
                        this.tableData = [];
                        this.total = 0;
                    }
                })
                .catch((error) => {
                    this.error = "请求信息失败";
                    this.prompt_type = "error";
                    this.tableData = [];
                    this.total = 0;
                });
            this.prompt_type = "waiting";
            this.error = "请求信息中";
        },
    },
    mounted() {
        // 测试用
        let enterpriseId = JSON.parse(localStorage.getItem("account")).account_id;
        this.getSellMsg(enterpriseId);
    },
    components: {
        textInput,
        dialogAvatarBox,
        linePrompt,
        modelSelect,
    },

    created() {},
};
</script>

<style scoped>
.container {
    position: relative;
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    box-sizing: content-box;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    /* align-items: center; */
}
.title {
    top: 0;
    position: absolute;
    width: 100%;
    font-size: 30px;
    line-height: 30px;
}
.part {
    /* flex-grow: 1;
    flex-basis: 0; */
    width: 33.3%;
    height: 92%;
    border: solid 1px rgb(141, 53, 159);
    position: relative;
    top: 8%;
}
.login_button {
    width: 85px;
    height: 30px;
    position: relative;
    background-color: rgb(216, 187, 222);
    color: white;
    font-weight: 600;
    left: 5px;
    cursor: pointer;
    border: 1px solid pink;
}
.login_button:hover {
    background-color: rgb(141, 53, 159);
}
.main_title {
    position: relative;
    width: 100%;
    /* height: 60px; */
    color: black;
    font-size: 27px;
    font-weight: 800;
    /* border: 1px solid red; */
    line-height: 60px;
    /* background-color:red; */
}
.edit_power_reminder_1 {
    position: relative;
    width: 100%;
    /* height: 40px; */
    font-size: 15px;
    font-weight: 500;
    /* border: solid 1px red; */
    border-bottom: 1px solid black;
    line-height: 40px;
}
.table_container {
    width: 100%;
    height: 98%;
    overflow: scroll;
    border: 1px solid rgb(141,53,159);
}
</style>
