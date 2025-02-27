<template>
    <div class="container">
        <div class="main_title">碳额度购买</div>
        <div class="edit_power_reminder_1" v-if="!isLogin">
            在进行购买操作前，您必须<button class="login_button">
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
                        <el-button size="small" @click="handleEdit(scope.row)"
                            >购买</el-button
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
            v-model="dialogVisible"
            title="碳交易: 额度购买"
            width="320"
        >
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 3%">
            <el-text style="margin-right: 10%">额度单价:</el-text>
            <el-text>{{dialogData.unit_price}}</el-text>
          </div>
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 6%">
            <el-text style="margin-right: 10%">额度总价:</el-text>
            <el-text>{{purchase_price}}</el-text>
          </div>
          <div style="display: flex;justify-content:center;width: 100%;margin-top: 6%;margin-bottom: 3%">
            <el-text style="margin-right: 5%">购买量:</el-text>
            <el-input-number
                v-model="purchase_quota"
                :min="1"
                :max="dialogData.quota"
                :precision="0"
            />
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="carbonSellSubmit" :disabled="!carbon_purchase_button_can_click || !isLogin">
                确认
              </el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
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
import App from "@/chainUtil/CarbonCredits";
import $target from "@/main";
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 1, // 假设总共有100条数据
            isLogin: true, //是否已经登录
            carbon_purchase_button_can_click: true,
            prompt_type: "",
            error: "",
            reminder_exist: true,
            searchKeyword: "",
            dialogVisible: false,
            dialogData: {
                id: 0,
                quota: 0,
                unit_price: 0,
                seller_id: 0,
                seller_public_key: "",
            }, // 用于存储传递给对话框的数据
            purchase_quota: 1, //购买的份额
            purchase_price: 0, //购买的价格
            sort: {
                prop: "price",
                order: "ascending", // 'ascending' 或 'descending'
            },
            purchase_submit_error: "",
            purchase_submit_prompt_type: "",
            seller_publicKey: "",
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
            // 根据当前页码和每页显示的数量生成数据
            this.tableData = this.generateData(this.pageSize, this.offset);
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
        handleEdit(row) {
            this.purchase_quota = 1; //初始化
            this.purchase_submit_error = "";
            (this.purchase_submit_prompt_type = ""),
                // 传递当前行的id和额度给对话框
                (this.dialogData = {
                    id: row.id,
                    quota: row.quota,
                    unit_price: row.unit_price,
                    seller_id: row.seller_id,
                    seller_public_key: row.public_key,
                });
            // 打开对话框
            this.dialogVisible = true;
        },
        submitPurchaseMsgCallback(msg) {
            if (msg.data.code === 0) {
                // 发送购买请求数据成功
                this.purchase_submit_prompt_type = "success";
                this.purchase_submit_error = "购买成功";
                this.carbon_purchase_button_can_click = true;
            } else {
                this.purchase_submit_prompt_type = "error";
                this.purchase_submit_error = "请求信息失败";
                this.carbon_purchase_button_can_click = true;
            }
        },
        submitPurchaseMsgWaiting(is_waiting) {
            if (is_waiting) {
                this.carbon_purchase_button_can_click = false;
                this.purchase_submit_prompt_type = "waiting";
                this.purchase_submit_error = "发送购买请求中";
            } else {
                // this.reminder_exist = true;
                this.purchase_submit_prompt_type = "default";
                this.purchase_submit_error = "";
                this.carbon_purchase_button_can_click = true;
            }
        },
        submitPurchaseMsgTimeout() {
            this.purchase_submit_prompt_type = "error";
            this.purchase_submit_error = "购买失败";
            this.carbon_purchase_button_can_click = true;
        },
        getCarbonCount() {
            let account_id = JSON.parse(
                localStorage.getItem("account")
            ).account_id;
            let url = `${$target.$target}/enterprise/transaction/remain/${account_id}/last`;
            axios
                .get(url)
                .then((resp) => {
                    if (resp.status === 200) {
                        if (resp.data.code === 0) {
                            // 获取成功
                            console.log("获取成功");
                            store.state.carbonCount = resp.data.data;
                            // this.carbonCount = resp.data.data;
                        } else {
                            ElMessage({
                                message: resp.data.message,
                                type: "error",
                            });
                        }
                    }
                })
                .catch(() => {
                    console.error("请求出错:", error);
                    if (error.response) {
                        // 请求已经发出，但服务器响应返回了状态码超出了 2xx 范围
                        console.error("状态码:", error.response.status);
                        console.error("响应数据:", error.response.data);
                    } else if (error.request) {
                        // 请求已经发出，但没有收到响应
                        console.error("请求未收到响应:", error.request);
                    } else {
                        // 其他错误
                        console.error("错误信息:", error.message);
                    }
                    ElMessage({
                        message: "查询剩余碳额度失败，请检查网络",
                        type: "error",
                    });
                });
        },
        async carbonSellSubmit() {
          this.dialogVisible = false
            let seller_publicKey = this.dialogData.seller_public_key;
            let amount = this.purchase_quota;
            let price = this.dialogData.unit_price;
            console.log(seller_publicKey)
            let result = await App.carbonTransaction(
                seller_publicKey,
                amount,
                price
            );
            if (result !== undefined) {
                let code = result.code;
                if (code === 0) {
                    let form = {}
                    let chain_data = ""
                    let buyer_public_key = JSON.parse(
                        localStorage.getItem("account")
                    ).public_key;
                    let seller_public_key = this.dialogData.seller_public_key;
                    let buyer_id = JSON.parse(
                        localStorage.getItem("account")
                    ).account_id;
                    let seller_id = this.dialogData.seller_id;
                    let buyer = await App.getCoinAmount(buyer_public_key);
                    chain_data = chain_data + buyer_id + "," + buyer.remain + "," + buyer.coin + ";"
                    let seller = await App.getCoinAmount(seller_public_key);
                    console.log(buyer,seller)
                    chain_data = chain_data + seller_id + "," + seller.remain + "," + seller.coin
                    form.block_data = chain_data
                    form.account_id =JSON.parse(localStorage.getItem("account")).account_id
                  form.quotaSale_id = this.dialogData.id
                  form.amount = this.purchase_quota
                    axios
                        .patch(
                            `${$target.$target}/enterprise/transaction/amount`,
                            JSON.stringify(form),
                            {
                                headers: {
                                    "Content-Type":
                                        "application/json;charset=utf-8",
                                },
                            }
                        )
                        .then((resp) => {
                            if (resp.status === 200) {
                                if (resp.data.code === 0) {
                                    // 请求数据成功
                                    this.purchase_submit_prompt_type =
                                        "success";
                                    this.purchase_submit_error = "购买成功";
                                    this.getCarbonCount();//更新额度
                                  this.getSellMsg();
                                } else {
                                    this.purchase_submit_error = "购买失败";
                                    this.purchase_submit_prompt_type = "error";
                                }
                            } else {
                                this.purchase_submit_error = "购买失败";
                                this.purchase_submit_prompt_type = "error";
                            }
                        });
                } else if (code === 1) {
                    //交易失败
                    this.purchase_submit_error = "交易失败";
                    this.purchase_submit_prompt_type = "error";
                } else if (code === 2) {
                    //授权失败
                    this.purchase_submit_error = "授权失败";
                    this.purchase_submit_prompt_type = "error";
                } else if (code === 3) {
                    //MetaMask未正确安装配置
                    this.purchase_submit_error = "MetaMask未正确安装配置";
                    this.purchase_submit_prompt_type = "error";
                }
            }
        },
        getSellMsg() {
            let url =  `${$target.$target}/enterprise/transaction/remain?account_id=`+JSON.parse(localStorage.getItem("account")).account_id
          console.log(url)
            axios
                .get(
                    url
                    ////TODO /enterprise/transaction/remain
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
        this.isLogin = localStorage.getItem("isLogin"); // 获取登录状态
        this.getSellMsg();
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
