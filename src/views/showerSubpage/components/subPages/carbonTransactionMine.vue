<template>
    <div class="container">
        <div class="main_title">我的出售</div>
        <div class="edit_power_reminder_1" v-if="!isLogin">
            在进行查看操作前，您必须<button class="login_button">
                登录账号
            </button>
        </div>
        <linePrompt
            v-if="reminder_exist && isLogin"
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
                    prop="id"
                    label="ID"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="quota"
                    label="额度"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="seller_id"
                    label="出售者ID"
                    fit="true"
                ></el-table-column>
                <el-table-column
                    prop="unit_price"
                    label="单价"
                    fit="true"
                    :sortable="true"
                ></el-table-column>
                <el-table-column
                    prop="month"
                    label="月份"
                    fit="true"
                ></el-table-column>
                <el-table-column :align="right">
                    <!-- <template #header>
                        <el-input
                            v-model="searchKeyword"
                            size="small"
                            placeholder="Type to search"
                        />
                    </template> -->
                    <template #default="scope">
                        <el-button size="small" @click="handlePurchase(scope.row)"
                            >修改单价</el-button
                        >
                        <el-button size="small" @click="handleCancle(scope.row)"
                            >取消出售</el-button
                        >
                    </template>
                </el-table-column>
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
        <el-dialog
            v-model="changeDialogVisible"
            title="碳交易:额度单价修改"
            width="800px"
        >
            <div class="dialog_container">
                <el-scrollbar>
                    <h1>
                        您正在修改单价的额度ID为:
                        <span style="color: red">{{ dialogData.id }}</span>
                    </h1>
                    <h2>
                        当前额度单价:
                        <span style="color: red">{{ purchase_price }}</span>
                    </h2>
                    <el-form
                        ref="form"
                        style="
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                        "
                    >
                        <el-form-item label="请输入您欲修改的单价">
                            <el-input-number
                                v-model="changed_price"
                                :min="0.01"
                                :step="0.01"
                                :precision="2"
                            />
                        </el-form-item>
                    </el-form>
                    <el-button
                        class="carbon_sell_button"
                        @click="carbonChangeSubmit"
                        type="primary"
                        color="rgb(216, 187, 222)"
                        :disabled="
                            !carbon_button_can_click || !isLogin
                        "
                    >
                        确定
                    </el-button>
                    <linePrompt
                        :opacity="purchase_submit_error"
                        :data_left="purchase_submit_error"
                        :type="purchase_submit_prompt_type"
                        class="line_reminder"
                    ></linePrompt>
                </el-scrollbar>
            </div>
        </el-dialog>
        <el-dialog
            v-model="cancleDialogVisible"
            title="碳交易:取消额度出售"
            width="800px"
        >
            <div class="dialog_container">
                <el-scrollbar>
                    <h1>
                        您正在试图取消的的额度出售ID为:
                        <span style="color: red">{{ dialogData.id }}</span>
                    </h1>
                    <h2>
                        当前待出售额度:
                        <span style="color: red">{{ dialogData.quota }}</span>
                    </h2>

                    <el-button
                        class="carbon_sell_button"
                        @click="carbonCancelSubmit"
                        type="primary"
                        color="rgb(216, 187, 222)"
                        :disabled="
                            !carbon_button_can_click || !isLogin
                        "
                    >
                        确定
                    </el-button>
                    <linePrompt
                        :opacity="purchase_submit_error"
                        :data_left="purchase_submit_error"
                        :type="purchase_submit_prompt_type"
                        class="line_reminder"
                    ></linePrompt>
                </el-scrollbar>
            </div>
        </el-dialog>
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
import { ElMessage, ElMessageBox } from "element-plus";
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 1, // 数据量
            isLogin: true, //是否已经登录
            carbon_button_can_click: true,
            prompt_type: "",
            error: "",
            reminder_exist: true,
            searchKeyword: "",
            cancleDialogVisible: false,
            changeDialogVisible: false,
            dialogData: {
                id: 0,
                quota: 0,
                unit_price: 0,
                seller_id:0,
            }, // 用于存储传递给对话框的数据
            purchase_quota: 1, //购买的份额
            purchase_price: 0, //购买的价格
            sort: {
                prop: "price",
                order: "ascending", // 'ascending' 或 'descending'
            },
            purchase_submit_error: "",
            purchase_submit_prompt_type: "",
            changed_price:0.01
        };
    },
    computed: {
        currentTableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
        },
        purchase_price() {
            return this.purchase_quota * this.dialogData.unit_price;
        },
    },
    methods: {
        handleSizeChange(newSize) {
            // this.pageSize = newSize;
            // this.currentPage = 1; // 重置当前页码为第一页
            // this.fetchData();
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            // this.fetchData();
        },
        fetchData() {
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
                    QuotaSale: [
                        {
                            id:1,
                            quota:1,
                            seller_id:1,
                            unit_price:1,
                            month:1,
                        },
                        {
                            id:1,
                            quota:1,
                            seller_id:1,
                            unit_price:1,
                            month:1,
                        },
                        
                    ],
                },
            }
        );
        // 实际用
        // let id = ""; // 获得用户ID
        // connector.send(
        //                     [id],//获得上月额度api的传参依次是用户ID
        //                     "", //api名字
        //                     this.submitPurchaseMsgCallback,
        //                     this.submitPurchaseMsgWaiting,
        //                     this.submitPurchaseMsgWaiting,
        //                     60000 //限时
        //                 );
        },
        generateData(pageSize, offset) {
            const data = [];
            for (let i = 0; i < pageSize; i++) {
                const index = offset + i;
                data.push({
                    date: `2016-05-02 ${index + 1}`,
                    name: `王小s虎 ${index + 1}`,
                    address: "上海市普陀区金沙江路 1518 弄",
                });
            }
            return data;
        },
        getSellMsgCallback(msg) {
            if (msg.data.code === 0) {
                // 请求数据成功
                this.prompt_type = "success";
                this.error = "请求信息成功";
                // console.log("msg.data.QuotaSale", msg.data.QuotaSale);
                this.tableData = msg.data.QuotaSale;
                this.total = msg.data.QuotaSale.length;
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
        handleSortChange({ column, prop, order }) {
            // 根据点击的列和排序方式更新tableData
            this.sort.prop = prop;
            this.sort.order = order;
            this.tableData = this.tableData.sort((a, b) => {
                if (order === "ascending") {
                    return a[prop] - b[prop];
                } else {
                    return b[prop] - a[prop];
                }
            });
        },
        handlePurchase(row) {
            //初始化购买提交提示
            this.purchase_submit_error = "";
            this.purchase_submit_prompt_type = "",
            // 传递当前行的id和额度给对话框
            this.dialogData = {
                id: row.id,
                quota: row.quota,
                unit_price: row.unit_price,
                seller_id: row.seller_id,
            };
            // 打开对话框
            this.changeDialogVisible = true;
        },
        handleCancle(row) {
            //初始化购买提交提示
            this.purchase_submit_error = "";
            this.purchase_submit_prompt_type = "",
            // 传递当前行的id和额度给对话框
            this.dialogData = {
                id: row.id,
                quota: row.quota,
                unit_price: row.unit_price,
                seller_id: row.seller_id,
            };
            // 打开对话框
            this.cancleDialogVisible = true;
        },
        submitChangeMsgCallback(msg) {
            if (msg.data.code === 0) {
                // 发送购买请求数据成功
                this.purchase_submit_prompt_type = "success";
                this.purchase_submit_error = "修改成功";
                this.carbon_button_can_click = true;
            } else {
                this.purchase_submit_prompt_type = "error";
                this.purchase_submit_error = "修改失败";
                this.carbon_button_can_click = true;
            }
        },
        submitChangeMsgWaiting(is_waiting) {
            if (is_waiting) {
                this.carbon_button_can_click = false;
                this.purchase_submit_prompt_type = "waiting";
                this.purchase_submit_error = "发送修改请求中";
            } else {
                // this.reminder_exist = true;
                this.purchase_submit_prompt_type = "default";
                this.purchase_submit_error = "";
                this.carbon_button_can_click = true;
            }
        },
        submitChangeMsgTimeout() {
            this.purchase_submit_prompt_type = "error";
            this.purchase_submit_error = "修改失败";
            this.carbon_button_can_click = true;
        },
        submitCancelMsgCallback(msg) {
            if (msg.data.code === 0) {
                // 发送购买请求数据成功
                this.purchase_submit_prompt_type = "success";
                this.purchase_submit_error = "取消出售成功";
                this.carbon_button_can_click = true;
            } else {
                this.purchase_submit_prompt_type = "error";
                this.purchase_submit_error = "取消出售失败";
                this.carbon_button_can_click = true;
            }
        },
        submitCancelMsgWaiting(is_waiting) {
            if (is_waiting) {
                this.carbon_button_can_click = false;
                this.purchase_submit_prompt_type = "waiting";
                this.purchase_submit_error = "发送取消出售请求中";
            } else {
                // this.reminder_exist = true;
                this.purchase_submit_prompt_type = "default";
                this.purchase_submit_error = "";
                this.carbon_button_can_click = true;
            }
        },
        submitCancelMsgTimeout() {
            this.purchase_submit_prompt_type = "error";
            this.purchase_submit_error = "取消出售失败";
            this.carbon_button_can_click = true;
        },
        carbonChangeSubmit(){
            // 修改单价提交事件
            // 测试用
            connector.test(
            this.submitChangeMsgCallback, // 发送消息成功的回调函数
            this.submitChangeMsgWaiting, // 发送消息等待中调用函数
            this.submitChangeMsgWaiting, // 当发送消息超调用的函数
            2000, // 超时等待时间 当且仅当success=false有效
            true, // 此次测试是按照成功测试还是按照超时测试
            5000, // 成功等待时间 当且仅当success=true有效
            {
                data:{
                    code: 0,
                }
            }
            )
            let id = ""; //获取买家ID，具体方法待定
            //实际用
            // connector.send(
            //                 [this.dialogData.id, this.changed_price],//单价修改api的传参依次是交易信息ID，修改后的单价
            //                 "", //api名字
            //                 this.submitPurchaseMsgCallback,
            //                 this.submitPurchaseMsgWaiting,
            //                 this.submitPurchaseMsgWaiting,
            //                 60000 //限时
            //             );
        },
        carbonCancelSubmit(){
            // 取消出售提交事件
            // 测试用
            connector.test(
            this.submitCancelMsgCallback, // 发送消息成功的回调函数
            this.submitCancelMsgWaiting, // 发送消息等待中调用函数
            this.submitCancelMsgTimeout, // 当发送消息超调用的函数
            2000, // 超时等待时间 当且仅当success=false有效
            true, // 此次测试是按照成功测试还是按照超时测试
            5000, // 成功等待时间 当且仅当success=true有效
            {
                data:{
                    code: 0,
                }
            }
            )
            let id = ""; //获取买家ID，具体方法待定
            //实际用
            // connector.send(
            //                 [this.dialogData.id],//删除出售信息购买api的传参依次是交易信息ID
            //                 "", //api名字
            //                 this.submitPurchaseMsgCallback,
            //                 this.submitPurchaseMsgWaiting,
            //                 this.submitPurchaseMsgWaiting,
            //                 60000 //限时
            //             );
        }
    },
    mounted() {
        this.fetchData(); // 组件挂载完成后获取数据
    },
    components: {
        linePrompt,
    },
};
</script>
<style scoped>
.container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.table_container {
    width: 100%;
    height: 98%;
    border: solid 1px red;
    overflow: scroll;
}
.line_reminder {
    position: relative;
    width: 50%;
}
.dialog_container {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.carbon_sell_button {
    width: 100px;
    height: 40px;
    cursor: pointer;
    /* background-color: rgb(207, 159, 216); */
    font-size: 18px;
    color: white;
    border-radius: 6px;
    border: none;
}
.carbon_sell_button:hover {
    background-color: rgb(204, 121, 221);
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
</style>
