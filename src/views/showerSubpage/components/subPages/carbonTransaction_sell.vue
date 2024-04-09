<template>
    <div class="main_title">碳额度出售</div>
    <div class="edit_power_reminder_1" v-if="!isLogin">
        在进行出售操作前，您必须<button class="login_button">登录账号</button>
    </div>
    <div class="edit_power_reminder_1" v-if="!hasAccounted">
        在进行出售操作前，您必须<button
            class="login_button"
            @click="goToCarbonAccounting"
        >
            进行碳核算
        </button>
    </div>
    <div class="main_title">您当前的剩余额度为:{{ carbonCount }}</div>
    <div class="warning_reminder" style="color: red" v-if="warningVisible">
        您的剩余额度不足，请尽快购买额度！
    </div>
    <div class="input_container">
        <el-form style="display: flex; flex-direction: column">
            <el-form-item :label="`请输入您欲出售的额度`">
                <el-input-number
                    v-model="carbonValue"
                    :precision="2"
                    :min="0"
                    :max="carbonCount"
                />
            </el-form-item>
            <el-form-item :label="`请输入您欲出售的额度的单价( /元 )`">
                <el-input-number
                    v-model="carbonPrice"
                    :precision="2"
                    :min="0"
                />
            </el-form-item>
        </el-form>
        <div class="carbon_sell_botton_box">
            <el-button
                class="carbon_sell_button"
                @click="carbonSellSubmit"
                type="primary"
                color="rgb(216, 187, 222)"
                :disabled="
                    !carbon_sell_button_can_click || !isLogin || !hasAccounted
                "
            >
                发送
            </el-button>
            <linePrompt
                :opacity="error"
                :data_left="error"
                :type="prompt_type"
                class="line_reminder"
            ></linePrompt>
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
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
import $target from "@/main";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    props: ["goToCarbonAccounting", "goToLogin"],
    data() {
        return {
            isLogin: true, //是否已经登录
            hasAccounted: true, //是否已经进行过核算
            carbonCount: 0, //剩余碳额度,从后端得到
            carbonValue: 0, //用户输入的欲出售的碳额度
            carbonPrice: 0, //用户输入的碳额度出售价格
            carbon_sell_button_can_click: true,
            prompt_type: "",
            error: "",
            warningVisible: false,
        };
    },
    methods: {
        carbonSellCallback(msg) {
            // console.log("carbonSellCallback运行了");
            if (msg.success) {
                this.prompt_type = "success";
                this.error = "上传成功";
                ElMessage({
                    type: "success",
                    message: "上传出售信息成功",
                });
            } else {
                this.prompt_type = "error";
                this.error = "上传失败";
                ElMessage({
                    type: "success",
                    message: "上传出售信息成功",
                });
            }
        },
        carbonSellWaiting(is_waiting) {
            // console.log("carbonSellWaiting运行了");
            if (is_waiting) {
                this.carbon_sell_button_can_click = false;
                this.prompt_type = "waiting";
                this.error = "等待中";
            } else {
                this.carbon_sell_button_can_click = true;
                this.prompt_type = "default";
                this.error = "";
            }
        },
        getCarbonCount() {
            let account_id = JSON.parse(
                localStorage.getItem("account")
            ).account_id;
            let url = `${$target}/enterprise/transaction/remain/${account_id}/last`;
            axios
                .get(url)
                .then((resp) => {
                    if (resp.status === 200) {
                        if (resp.data.code === 0) {
                            // 获取成功
                            // console.log("获取成功");
                            // console.log(typeof resp.data.data);
                            this.carbonCount = resp.data.data;
                            if (carbonCount <= 0) {
                                this.warningVisible = true;
                            }
                            console.log(this.carbonCount, "this.carbonCount");
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
        carbonSellTimeout() {
            this.prompt_type = "error";
            this.error = "上传失败";
            ElMessage({
                type: "warning",
                message: "上传出售信息失败",
            });
        },
        carbonSellSubmit() {
            let account_id = JSON.parse(
                localStorage.getItem("account")
            ).account_id;
            let carbonValue = this.carbonValue;
            let carbonPrice = this.carbonPrice;
            let url =
                `${$target}/enterprise/transaction/publish?account_id=` +
                account_id +
                "&quota=" +
                carbonValue +
                "&unit_price=" +
                carbonPrice;
            const postData = {
                account_id: account_id,
                quota: carbonValue,
                unit_price: carbonPrice,
            };

            // 发送 POST 请求
            ElMessageBox.confirm("确定要发布此条碳出售信息吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
            }).then(() => {
                if (carbonValue == 0) {
                    ElMessage({
                        type: "warning",
                        message: "出售碳额度必须大于0",
                    });
                    return;
                } else if (carbonPrice == 0) {
                    ElMessage({
                        type: "warning",
                        message: "出售碳额度单价必须大于0",
                    });
                    return;
                } else {
                    //通过了格式检查，可以进行出售
                    // input-number设置了最大值最小值，只需要检查是否为0
                    axios
                        .post(url, null, {
                            params: postData,
                        })
                        .then((resp) => {
                            if (resp.status === 200) {
                                if (resp.data.code === 0) {
                                    // 提交成功
                                    ElMessage({
                                        message: "发布出售信息成功 !",
                                        type: "success",
                                    });
                                } else {
                                    ElMessage({
                                        message: resp.data.message,
                                        type: "error",
                                    });
                                }
                            }
                        })
                        .catch(() => {
                            ElMessage({
                                message: "发布出售信息失败，请检查网络",
                                type: "error",
                            });
                        });
                }
            });
        },
    },
    mounted() {
        this.getCarbonCount();
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
.edit_power_reminder_2 {
    position: relative;
    font-size: 16px;
    width: 100%;
    text-align: left;
    height: 25px;
    line-height: 25px;
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
.input_container {
    position: relative;
    width: 100%;
    display: block;
    /* border: solid 1px red; */
    display: flex;
    flex-direction: column;
    align-items: center;
}
.carbon_sell_botton_box {
    position: relative;
    width: auto;
    height: auto;
    /* border: solid 1px rebeccapurple; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.line_reminder {
    position: relative;
    /* border: solid 2px red; */
    width: 100%;
}
</style>
