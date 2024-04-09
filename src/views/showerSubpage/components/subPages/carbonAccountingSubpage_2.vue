<template>
    <div class="container" ref="container">
        <el-dialog v-model="dialogVisible" title="提交成功!" width="500">
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <div class="main_title">碳核算：{{ company_type_name }}</div>
        <div class="part">
            <el-scrollbar>
                <el-form
                    ref="form"
                    style="
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    "
                >
                    <el-form-item label="请输入企业退役设备数量">
                        <el-input-number
                            v-model="rec_num"
                            :min="1"
                            :precision="0"
                            @change="recHandleChange"
                        />
                    </el-form-item>
                    <!--输入退役设备数量-->
                    <el-form-item
                        v-for="(item, index) in rec_num"
                        :key="index"
                        :label="`请输入退役设备${index + 1}的六氟化硫容量`"
                    >
                        <el-input-number
                            v-model="rec_cap_arr[index]"
                            :precision="3"
                            :min="0"
                            @change="recHandleChange"
                        />
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in rec_num"
                        :key="index"
                        :label="`请输入退役设备${
                            index + 1
                        }的六氟化硫实际回收量`"
                    >
                        <el-input-number
                            v-model="rec_pra_arr[index]"
                            :precision="3"
                            :min="0"
                            @change="recHandleChange"
                        />
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <div class="part">
            <el-scrollbar>
                <el-form
                    ref="form"
                    style="
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    "
                >
                    <el-form-item label="请输入企业修理设备数量">
                        <el-input-number
                            v-model="rep_num"
                            :min="1"
                            :precision="0"
                            @change="repHandleChange"
                        />
                    </el-form-item>
                    <!--输入退役设备数量-->
                    <el-form-item
                        v-for="(item, index) in rep_num"
                        :key="index"
                        :label="`请输入修理设备${index + 1}的六氟化硫容量`"
                    >
                        <el-input-number
                            v-model="rep_cap_arr[index]"
                            :precision="3"
                            :min="0"
                            @change="repHandleChange"
                        />
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in rep_num"
                        :key="index"
                        :label="`请输入修理设备${
                            index + 1
                        }的六氟化硫实际回收量`"
                    >
                        <el-input-number
                            v-model="rep_pra_arr[index]"
                            :precision="3"
                            :min="0"
                            @change="repHandleChange"
                        />
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <div class="part">
            <el-scrollbar>
                <el-form
                    ref="form"
                    style="
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    "
                >
                    <el-form-item label="请输入电厂上网电量">
                        <el-input-number
                            v-model="el_net"
                            :min="0"
                            :precision="2"
                        />
                    </el-form-item>
                    <el-form-item label="请输入自外省输入电量">
                        <el-input-number
                            v-model="el_input"
                            :min="0"
                            :precision="2"
                        />
                    </el-form-item>
                    <el-form-item label="请输入自外省输出电量">
                        <el-input-number
                            v-model="el_output"
                            :min="0"
                            :precision="2"
                        />
                    </el-form-item>
                    <el-form-item label="请输入售电量">
                        <el-input-number
                            v-model="el_sell"
                            :min="0"
                            :precision="2"
                        />
                    </el-form-item>
                    <el-form-item label="请输入区域电网年平均供电排放因子">
                        <el-input-number v-model="ef" :min="0" :precision="2" />
                    </el-form-item>
                    <el-form-item label="请输入您的碳核算结果">
                        <el-input-number v-model="user_result" :precision="2" />
                    </el-form-item>
                </el-form>
                <el-upload
                    action="#"
                    ref="uploadBox"
                    :limit="1"
                    :auto-upload="false"
                    :http-request="upload"
                >
                    <el-button class="choose_file_btn">提交证明材料</el-button>
                </el-upload>
                <el-button @click="clearData">清空</el-button>
                <el-button @click="submitData">提交</el-button>
            </el-scrollbar>
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
import {ElMessage} from "element-plus";
import $target from "@/main";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    data() {
        return {
            dialogVisible: false,
            company_type_name: "电网企业",
            rec_cap_arr: [0], //退役设备六氟化硫容量数组
            rec_pra_arr: [0], //退役设备六氟化硫实际回收量数组
            rep_cap_arr: [0], //修理设备六氟化硫容量数组
            rep_pra_arr: [0], //修理设备六氟化硫实际回收量数组
            rec_num: 1, //退役设备数量
            rep_num: 1, //修理设备数量
            el_net: 0, //电厂上网电量
            el_input: 0, //自外省输入电量
            el_output: 0, //自外省输出电量
            el_sell: 0, // 售电量
            ef: 0, //区域电网年平均供电排放因子
            user_result: 0, //用户自己核算的结果
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        clickNav(index) {
            if (index === 1) {
                this.videoPause();
            }
            this.son_pages = [false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        recHandleChange() {
            let newVal = this.rec_num;
            if (newVal > this.rec_cap_arr.length) {
                // 在数组末尾添加新元素
                const diff = newVal - this.rec_cap_arr.length;
                for (let i = 0; i < diff; i++) {
                    this.rec_cap_arr.push(0);
                    this.rec_pra_arr.push(0);
                }
            } else if (newVal < this.rec_cap_arr.length) {
                // 在数组末尾删除元素
                const diff = this.rec_cap_arr.length - newVal;
                this.rec_cap_arr.splice(-diff, diff);
                this.rec_pra_arr.splice(-diff, diff);
            }
            // console.log("rec_cap_arr", this.rec_cap_arr);
            // console.log("rec_pra_arr", this.rec_pra_arr);
        },
        repHandleChange() {
            let newVal = this.rep_num;
            if (newVal > this.rep_cap_arr.length) {
                // 在数组末尾添加新元素
                const diff = newVal - this.rep_cap_arr.length;
                for (let i = 0; i < diff; i++) {
                    this.rep_cap_arr.push(0);
                    this.rep_pra_arr.push(0);
                }
            } else if (newVal < this.rep_cap_arr.length) {
                // 在数组末尾删除元素
                const diff = this.rep_cap_arr.length - newVal;
                this.rep_cap_arr.splice(-diff, diff);
                this.rep_pra_arr.splice(-diff, diff);
            }
            // console.log("rep_cap_arr", this.rep_cap_arr);
            // console.log("rep_pra_arr", this.rep_pra_arr);
        },
        upload(fileObject) {
            let params = new FormData();
            let url = `${$target}/enterprise/accounting_record`;
            let enterprise_id = JSON.parse(
                localStorage.getItem("account")
            ).account_id;
            let variable_json = {
                rec_cap_arr: this.rec_cap_arr,
                rec_pra_arr: this.rec_pra_arr,
                rep_cap_arr: this.rep_cap_arr,
                rep_pra_arr: this.rep_pra_arr,
                rec_num: this.rec_num,
                rep_num: this.rep_num,
                el_net: this.el_net,
                el_input: this.el_input,
                el_output: this.el_output,
                el_sell: this.el_sell,
                ef: this.ef,
            };
            let result = this.user_result;
            let file = fileObject.file;
            params.append("enterprise_id", enterprise_id);
            params.append("variable_json", JSON.stringify(variable_json));
            params.append("result", result);
            params.append("file", file);
            axios({
                url: url,
                method: "POST",
                data: params,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((resp) => {
                if (resp.status === 200) {
                    if (resp.data.code === 0) {
                        // 提交成功
                        ElMessage({
                            message: resp.data.message,
                            type: "success",
                        });
                    } else {
                        ElMessage({
                            message: resp.data.message,
                            type: "error",
                        });
                    }
                }
            });
        },
        clearData() {
            this.rec_num = 1;
            this.rep_num = 1;
            this.el_net = 0;
            this.el_input = 0;
            this.el_output = 0;
            this.el_sell = 0;
            this.ef = 0;
            this.user_result = 0;
            this.rec_cap_arr = [0];
            this.rep_cap_arr = [0];
            this.rec_pra_arr = [0];
            this.rep_pra_arr = [0];
            this.$refs.uploadBox.clearFiles();
        },
        submitData() {
            this.$refs.uploadBox.submit();
        },
        async sendData(fileObject) {
            try {
                // 定义要发送的四个参数
                const enterprise_id = JSON.parse(
                    localStorage.getItem("account")
                ).account_id;
                const variable_json = {
                    rec_cap_arr: this.rec_cap_arr,
                    rec_pra_arr: this.rec_pra_arr,
                    rep_cap_arr: this.rep_cap_arr,
                    rep_pra_arr: this.rep_pra_arr,
                    rec_num: this.rec_num,
                    rep_num: this.rep_num,
                    el_net: this.el_net,
                    el_input: this.el_input,
                    el_output: this.el_output,
                    el_sell: this.el_sell,
                    ef: this.ef,
                };
                const result = this.user_result;
                const file = fileObject.file;

                // 使用axios发送POST请求
                const response = await axios.post(
                    "http://localhost:8080/enterprise/transaction/remain",
                    {
                        enterprise_id,
                        variable_json,
                        result,
                        file,
                    }
                );

                // 处理请求成功的响应
                console.log("Response:", response.data);
            } catch (error) {
                // 处理请求失败的情况
                console.error("Error:", error);
            }
        },
    },
    mounted() {
        // let enterprisetype = Storage.get("enterprisetype"); //存在本地数据库
        // switch (enterprisetype) {
        //     case 1: {
        //         this.company_type_name = "发电企业";
        //         return;
        //     }
        //     case 2: {
        //         this.company_type_name = "电网企业";
        //         return;
        //     }
        //     case 3: {
        //         this.company_type_name = "钢铁生产企业";
        //         return;
        //     }
        //     case 4: {
        //         this.company_type_name = "化工生产企业";
        //         return;
        //     }
        //     case 5: {
        //         this.company_type_name = "电解铝生产企业";
        //         return;
        //     }
        //     case 6: {
        //         this.company_type_name = "镁冶炼企业";
        //         return;
        //     }
        //     case 7: {
        //         this.company_type_name = "平板玻璃生产";
        //         return;
        //     }
        //     case 8: {
        //         this.company_type_name = "水泥生产企业";
        //         return;
        //     }
        //     case 9: {
        //         this.company_type_name = "陶瓷生产企业";
        //         return;
        //     }
        //     case 10: {
        //         this.company_type_name = "民航企业";
        //         return;
        //     }
        //     default: {
        //         this.company_type_name = "发电企业";
        //         return;
        //     }
        // }
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
    flex-direction: row;
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
.main_title {
    position: absolute;
    width: 100%;
    /* height: 60px; */
    color: black;
    font-size: 27px;
    font-weight: 800;
    line-height: 60px;
}
</style>
