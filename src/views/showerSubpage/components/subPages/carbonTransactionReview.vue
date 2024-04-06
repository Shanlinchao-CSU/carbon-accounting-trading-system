<!-- 碳交易历史查看 -->
<template>
    <div class="container" ref="container">
        <div class="main_title">碳交易历史查看</div>
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
                    prop="date"
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
                ></el-table-column>
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
        getSellMsgCallback(msg) {
            if (msg.data.code === 0) {
                // 请求数据成功
                this.prompt_type = "success";
                this.error = "请求信息成功";
                console.log(
                    "msg.data.AccountingRecordDto",
                    msg.data.AccountingRecordDto
                );
                this.tableData = msg.data.AccountingRecordDto;
                this.total = msg.data.AccountingRecordDto.length;
                // this.reminder_exist = false;
                // console.log(this.tableData);
            } else {
                this.prompt_type = "error";
                this.error = "请求信息失败";
                this.tableData = [];
                this.total = 0;
            }
        },
        getSellMsgWaiting(is_waiting) {
            if (is_waiting) {
                // this.reminder_exist = true;
                this.prompt_type = "waiting";
                this.error = "请求信息中";
            } else {
                // this.reminder_exist = true;
                this.prompt_type = "default";
                this.error = "";
            }
        },
        getSellMsgSellTimeout() {
            this.prompt_type = "error";
            this.error = "请求失败";
        },
    },
    mounted() {
        // 测试用
        connector.test(
            this.getSellMsgCallback, // 发送消息成功的回调函数
            this.getSellMsgWaiting, // 发送消息等待中调用函数
            this.getSellMsgSellTimeout, // 当发送消息超调用的函数
            2000, // 超时等待时间 当且仅当success=false有效
            true, // 此次测试是按照成功测试还是按照超时测试
            5000, // 成功等待时间 当且仅当success=true有效
            {
                data: {
                    code: 0,
                    AccountingRecordDto:[
                        {
                            date:1,
                            id:1,
                            state:1,
                            conductor_id:1,
                            account_name:1,
                            enterprise_type:1,

                        }
                    ]
                },
            }
        );
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
    border: solid 1px red;
    overflow: scroll;
}
</style>
