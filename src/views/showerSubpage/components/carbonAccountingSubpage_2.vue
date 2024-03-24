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
        <div class="title">您的企业类型是:{{ company_type_name }}</div>
        <div class="part">
            <el-scrollbar>
                <el-form ref="form" label-width="300px">
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
                <el-form ref="form" label-width="300px">
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
                <el-form ref="form" label-width="300px">
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
            let url;
            let enterprisetype = Storage.get("enterprisetype");
            params.append("file", fileObject.file);
            params.append("enterprise_type", enterprisetype);
            params.append("rec_cap_arr", this.rec_cap_arr);
            params.append("rec_pra_arr", this.rec_pra_arr);
            params.append("rep_cap_arr", this.rep_cap_arr);
            params.append("rep_pra_arr", this.rep_pra_arr);
            params.append("rec_num", this.rec_num);
            params.append("rep_num", this.rep_num);
            params.append("el_net", this.el_net);
            params.append("el_input", this.el_input);
            params.append("el_output", this.el_output);
            params.append("el_sell", this.el_sell);
            url = "http://localhost:8080/enterprise/info";
            axios({
                url: url,
                method: "POST",
                data: params,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((resp) => {});
        },
        clearData() {
            this.rec_num = 1;
            this.rep_num = 1;
            this.el_net = 0;
            this.el_input = 0;
            this.el_output = 0;
            this.el_sell = 0;
            this.rec_cap_arr = [0];
            this.rep_cap_arr = [0];
            this.rec_pra_arr = [0];
            this.rep_pra_arr = [0];
            this.$refs.uploadBox.clearFiles();
            // console.log("rec_cap_arr:",this.rec_cap_arr);
            // console.log("rec_pra_arr:",this.rec_pra_arr);
            // console.log("rep_cap_arr:",this.rep_cap_arr);
            // console.log("rep_pra_arr:",this.rep_pra_arr);
        },
        submitData() {
            this.$refs.uploadBox.submit();
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
    /* border: 1px solid red; */
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
    flex-grow: 1;
    flex-basis: 0;
    border: solid 1px rgb(141, 53, 159);
    position: relative;
    top: 8%;
}
</style>
