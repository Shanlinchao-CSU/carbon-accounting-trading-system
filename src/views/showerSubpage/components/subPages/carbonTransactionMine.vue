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
                        <el-button size="small" @click="handleChange(scope.row)"
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
        <!-- <el-dialog
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
                                v-model="dialogData.changed_price"
                                :min="0.01"
                                :step="1"
                                :precision="2"
                            />
                        </el-form-item>
                    </el-form>
                    <el-button
                        class="carbon_sell_button"
                        @click="carbonChangeSubmit"
                        type="primary"
                        color="rgb(216, 187, 222)"
                        :disabled="!carbon_button_can_click || !isLogin"
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
        </el-dialog> -->
        <!-- <el-dialog
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
                        :disabled="!carbon_button_can_click || !isLogin"
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
        </el-dialog> -->
        <el-dialog
            v-model="changeDialogVisible"
            title="碳交易: 单价修改"
            width="320"
        >
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 3%">
            <el-text style="margin-right: 10%">当前额度单价:</el-text>
            <el-text>{{dialogData.unit_price}}</el-text>
          </div>
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 6%;margin-bottom: 3%">
            <el-text style="margin-right: 5%">请输入您欲修改的单价:</el-text>
            <el-input-number
                v-model="dialogData.changed_price"
                :min="0.01"
                :precision="2"
            />
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="carbonChangeSubmit" :disabled="!carbon_button_can_click || !isLogin">
                确认
              </el-button>
              <el-button @click="changeDialogVisible = false">取消</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog
            v-model="cancleDialogVisible"
            title="碳交易: 取消出售"
            width="320"
        >
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 3%">
            <el-text style="margin-right: 10%">当前额度ID:</el-text>
            <el-text>{{dialogData.id}}</el-text>
          </div>
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 6%;margin-bottom: 3%">
            <el-text style="margin-right: 5%">当前额度单价:</el-text>
            <el-text>{{dialogData.unit_price}}</el-text>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="carbonCancelSubmit" :disabled="!carbon_button_can_click || !isLogin">
                确认
              </el-button>
              <el-button @click="cancleDialogVisible = false">取消</el-button>
            </div>
          </template>
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
import axios from "axios";
import $target from "@/main";
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
                seller_id: 0,
                changed_price: 0,
            }, // 用于存储传递给对话框的数据
            sort: {
                prop: "price",
                order: "ascending", // 'ascending' 或 'descending'
            },
            purchase_submit_error: "",
            purchase_submit_prompt_type: "",
            changed_price: 0.01,
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
        handleSizeChange(newSize) {
            // this.pageSize = newSize;
            // this.currentPage = 1; // 重置当前页码为第一页
            // this.fetchData();
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            // this.fetchData();
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
        handleChange(row) {
            //初始化购买提交提示
            this.purchase_submit_error = "";
            (this.purchase_submit_prompt_type = ""),
                // 传递当前行的id和额度给对话框
                (this.dialogData = {
                    id: row.id,
                    quota: row.quota,
                    unit_price: row.unit_price,
                    seller_id: row.seller_id,
                    changed_price: row.unit_price,
                });
            // 打开对话框
            this.changeDialogVisible = true;
        },
        handleCancle(row) {
            //初始化购买提交提示
            this.purchase_submit_error = "";
            (this.purchase_submit_prompt_type = ""),
                // 传递当前行的id和额度给对话框
                (this.dialogData = {
                    id: row.id,
                    quota: row.quota,
                    unit_price: row.unit_price,
                    seller_id: row.seller_id,
                });
            // 打开对话框
            this.cancleDialogVisible = true;
        },
        getSellMsg(enterpriseId) {
            let url =
                `${$target.$target}/enterprise/transaction/remain/` +
                enterpriseId;
            axios
                .get(
                    url
                    //TODO /enterprise/transaction/remain/{account_id}
                )
                .then((resp) => {
                    if (resp.status === 200) {
                        // console.log("resp.data111", resp.data);
                        if (resp.data.code === 0) {
                            // 请求数据成功
                            this.prompt_type = "success";
                            this.error = resp.data.message;
                            this.tableData = resp.data.data;
                            this.total = resp.data.data.length;
                        } else {
                            this.error = resp.data.message;
                            this.prompt_type = "error";
                            this.tableData = [];
                            this.total = 0;
                        }
                    } else {
                        this.error = resp.data.message;
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
        submitCancelMsgTimeout() {
            this.purchase_submit_prompt_type = "error";
            this.purchase_submit_error = "取消出售失败";
            this.carbon_button_can_click = true;
        },
        carbonChangeSubmit() {
            // 修改单价提交事件
            let id = this.dialogData.id;
            let unit_price = this.dialogData.changed_price;
            let url =
                `${$target.$target}/enterprise/transaction/price?id=` +
                id +
                "&unit_price=" +
                unit_price;
            const patchData = {
                id: id,
                unit_price: unit_price,
            };
            ElMessageBox.confirm("确定要修改你的碳额度出售单价吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
            }).then(() => {
                if (unit_price == this.dialogData.unit_price) {
                    ElMessage({
                        type: "warning",
                        message: "修改后的单价不能等于原价",
                    });
                    return;
                } else {
                    //通过了格式检查，可以进行出售
                    axios
                        .patch(url, null, {
                            params: patchData,
                        })
                        .then((resp) => {
                            if (resp.status === 200) {
                                if (resp.data.code === 0) {
                                    // 提交成功
                                    ElMessage({
                                        message: "修改碳额度单价成功 !",
                                        type: "success",
                                    });
                                } else {
                                    ElMessage({
                                        message: resp.data.message,
                                        type: "error",
                                    });
                                }
                            }
                            this.changeDialogVisible = false;
                            let enterpriseId = JSON.parse(
                                localStorage.getItem("account")
                            ).account_id;
                            this.getSellMsg(enterpriseId);
                        })
                        .catch(() => {
                            ElMessage({
                                message: "修改额度单价失败，请检查网络",
                                type: "error",
                            });
                            this.changeDialogVisible = false;
                            let enterpriseId = JSON.parse(
                                localStorage.getItem("account")
                            ).account_id;
                            this.getSellMsg(enterpriseId);
                        });
                }
            });
        },
        carbonCancelSubmit() {
            // 取消出售提交事件
            let id = this.dialogData.id;
            console.log("id", id);
            let url = `${$target.$target}/enterprise/transaction/` + id;
            console.log("url", url);
            ElMessageBox.confirm("确定要取消这条额度出售吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
            }).then(() => {
                //通过了格式检查，可以进行出售
                axios
                    .delete(url)
                    .then((resp) => {
                        if (resp.status === 200) {
                            if (resp.data.code === 0) {
                                // 提交成功
                                ElMessage({
                                    message: "取消出售成功 !",
                                    type: "success",
                                });
                            } else {
                                ElMessage({
                                    message: resp.data.message,
                                    type: "error",
                                });
                            }
                        }
                        this.cancleDialogVisible = false;
                        let enterpriseId = JSON.parse(
                            localStorage.getItem("account")
                        ).account_id;
                        this.getSellMsg(enterpriseId);
                    })
                    .catch(() => {
                        ElMessage({
                            message: "取消出售失败，请检查网络",
                            type: "error",
                        });
                        this.cancleDialogVisible = false;
                        let enterpriseId = JSON.parse(
                            localStorage.getItem("account")
                        ).account_id;
                        this.getSellMsg(enterpriseId);
                    });
            });
        },
    },
    mounted() {
        // this.fetchData(); // 组件挂载完成后获取数据
        let enterpriseId = JSON.parse(
            localStorage.getItem("account")
        ).account_id;
        this.getSellMsg(enterpriseId);
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
    border: 1px solid rgb(141,53,159);
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
