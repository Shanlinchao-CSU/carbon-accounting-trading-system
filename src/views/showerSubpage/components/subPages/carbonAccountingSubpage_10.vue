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
        <div class="main_title">碳核算：{{ companyTypeName }}</div>
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
                    <el-form-item
                        v-for="(item, index) in fuelNameArr"
                        :key="index"
                        :label="`请输入${fuelNameArr[index]}的消耗量`"
                        :ref="`fuelComponent_${index}`"
                    >
                        <el-input-number
                            v-model="fuelValueArr[index]"
                            :precision="3"
                            :min="0"
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
                    <el-form-item label="请输入生物质混合燃料种类数量">
                        <el-input-number
                            v-model="bioFuelCount"
                            :min="0"
                            :precision="0"
                            @change="BioFuelHandleChange"
                        />
                    </el-form-item>
                    <template v-for="(item, index) in bioFuelValueArr">
                        <el-form-item
                            :label="`请输入生物质燃料${index + 1}的种类名`"
                        >
                            <el-input
                                v-model="bioFuelNameArr[index]"
                                style="width: 240px"
                                :placeholder="`生物质燃料${index + 1}的种类名`"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="`请输入生物质燃料${index + 1}的消耗量`"
                        >
                            <el-input-number
                                v-model="bioFuelValueArr[index]"
                                :precision="3"
                                :min="0"
                                @change=""
                            />
                        </el-form-item>
                        <el-form-item
                            :label="`请输入生物质燃料${index + 1}的低位发热值`"
                        >
                            <el-input-number
                                v-model="bioFuelNCVArr[index]"
                                :precision="3"
                                :min="0"
                                @change=""
                            />
                        </el-form-item>
                        <el-form-item
                            :label="`请输入生物质燃料${index + 1}的生物质含量`"
                        >
                            <el-input-number
                                v-model="bioFuelBFArr[index]"
                                :precision="3"
                                :min="0"
                                @change=""
                            />
                        </el-form-item>
                    </template>
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
                    <el-form-item label="请输入国内化石燃料消耗量">
                        <el-input-number
                            v-model="interFuelValue"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国际化石燃料消耗量">
                        <el-input-number
                            v-model="nationalFuelValue"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国内生物质混合燃料的消耗量">
                        <el-input-number
                            v-model="interBioFuelValue"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国内生物质混合燃料低位发热值">
                        <el-input-number
                            v-model="interBioFuelNCV"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国内生物质混合燃料的生物质含量">
                        <el-input-number
                            v-model="interBioFuelBF"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国际生物质混合燃料的消耗量">
                        <el-input-number
                            v-model="nationalBioFuelValue"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国际生物质混合燃料的低位发热值">
                        <el-input-number
                            v-model="nationalBioFuelNCV"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入国际生物质混合燃料的生物质含量">
                        <el-input-number
                            v-model="nationalBioFuelBF"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入企业净购入的热力(GJ)">
                        <el-input-number
                            v-model="ADHeat"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入企业的净购入电量(MWh)">
                        <el-input-number
                            v-model="ADElec"
                            :precision="3"
                            :min="0"
                            @change=""
                        />
                    </el-form-item>
                    <el-form-item label="请输入您的碳核算结果">
                        <el-input-number v-model="user_result" :precision="2" />
                    </el-form-item>
                    <el-form-item label="请选择企业生产地址所属电网区域">
                        <el-select
                            v-model="region"
                            placeholder="Select"
                            style="width: 200px"
                        >
                            <el-option
                                v-for="item in region_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            />
                        </el-select>
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
import $target from "@/main";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    data() {
        return {
            dialogVisible: false,
            companyTypeName: "民航企业",
            fuelNameArr: [
                "无烟煤",
                "烟煤",
                "褐煤",
                "型煤",
                "焦炭",
                "原油",
                "燃料油",
                "汽油",
                "柴油",
                "一般煤油",
                "航空汽油(国内)",
                "航空汽油(国际)",
                "航空煤油(国内)",
                "航空煤油(国际)",
                "液化天然气",
                "液化石油气",
                "炼厂干气",
                "石脑油",
                "石油焦",
                "其他石油制品",
                "天然气",
                "焦炉煤气",
                "其他煤气",
            ],
            fuelValueArr: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0,
            ], //化石燃料消耗量数组
            bioFuelCount: 0, //生物质混合燃料数量
            bioFuelNameArr: [], //生物质混合燃料种类名称
            bioFuelValueArr: [], //生物质混合燃料消耗量数组
            bioFuelNCVArr: [], //生物质混合燃料低位发热值数组
            bioFuelBFArr: [], //生物质混合燃料生物质含量数组
            interFuelValue: 0, //国内化石燃料消耗量
            nationalFuelValue: 0, //国际化石燃料消耗量
            interBioFuelValue: 0, //国内生物质混合燃料的消耗量
            interBioFuelNCV: 0, //国内生物质混合燃料低位发热值
            interBioFuelBF: 0, //国内生物质混合燃料的生物质含量
            nationalBioFuelValue: 0, //国际生物质混合燃料的消耗量
            nationalBioFuelNCV: 0, //国际生物质混合燃料的低位发热值
            nationalBioFuelBF: 0, //国际生物质混合燃料的生物质含量
            ADHeat:0,//企业净购入热力
            ADElec:0,//企业净购入电量
            region: "",//所属区域
            user_result:0,//用户输入的核算结果
            region_options:[
                {
                    value: 0,
                    label: "东北电网"
                },
                {
                    value: 1,
                    label:"华北电网"
                },
                {
                    value: 2,
                    label:"华东电网"
                },
                {
                    value: 3,
                    label:"华中电网"
                },
                {
                    value: 4,
                    label:"西北电网"
                },
                {
                    value: 5,
                    label:"南方电网"
                }
            ]
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
        BioFuelHandleChange() {
            let newVal = this.bioFuelCount;
            if (newVal > this.bioFuelValueArr.length) {
                // 在数组末尾添加新元素
                const diff = newVal - this.bioFuelValueArr.length;
                for (let i = 0; i < diff; i++) {
                    this.bioFuelValueArr.push(0);
                    this.bioFuelNameArr.push("");
                    this.bioFuelNCVArr.push(0);
                    this.bioFuelBFArr.push(0);
                }
            } else if (newVal < this.bioFuelValueArr.length) {
                // 在数组末尾删除元素
                const diff = this.bioFuelValueArr.length - newVal;
                this.bioFuelValueArr.splice(-diff, diff);
                this.bioFuelNameArr.splice(-diff, diff);
                this.bioFuelNCVArr.splice(-diff, diff);
                this.bioFuelBFArr.splice(-diff, diff);
            }
        },
        test() {
            console.log(123);
        },
        upload(fileObject) {
            let params = new FormData();
            let url = `${$target.$target}/enterprise/accounting_record`;
            let enterprise_id = JSON.parse(
                localStorage.getItem("account")
            ).account_id;
            let variable_json = {
                fuelValueArr: this.fuelValueArr,
                bioFuelCount:this.bioFuelCount,
                bioFuelNameArr:this.bioFuelNameArr, //生物质混合燃料种类名称
            bioFuelValueArr:this.bioFuelValueArr,//生物质混合燃料消耗量数组
            bioFuelNCVArr:this.bioFuelNCVArr,//生物质混合燃料低位发热值数组
            bioFuelBFArr:this.bioFuelBFArr,//生物质混合燃料生物质含量数组
            interFuelValue:this.interFuelValue,
            nationalFuelValue:this.nationalFuelValue,
            interBioFuelValue:this.interBioFuelValue,
            interBioFuelNCV:this.interBioFuelNCV,
            interBioFuelBF:this.interBioFuelBF,
            nationalBioFuelValue:this.nationalBioFuelValue,
            nationalBioFuelNCV:this.nationalBioFuelNCV,
            nationalBioFuelBF:this.nationalBioFuelBF,
            ADHeat:this.ADHeat,
            ADElec:this.ADElec,
            region:this.region,
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
                //TODO /enterprise/accounting_record
            }).then((resp) => {
                if (resp.status === 200) {
                    if (resp.data.code === 0) {
                        // 提交成功
                        // console.log("提交核算申请成功 !");
                        ElMessage({
                            message: resp.data.message,
                            type: "success",
                        });
                    } else {
                        // console.log("提交核算申请失败，请检查网络!");
                        ElMessage({
                            message: resp.data.message,
                            type: "error",
                        });
                    }
                }
            });
        },
        clearData() {
            for(let i=0;i<this.fuelValueArr.length;i++){
                this.fuelValueArr[i] = 0;
            }
            this.bioFuelCount = 0;
            this.bioFuelNameArr = []; //生物质混合燃料种类名称
            this.bioFuelValueArr = []; //生物质混合燃料消耗量数组
            this.bioFuelNCVArr = []; //生物质混合燃料低位发热值数组
            this.bioFuelBFArr = []; //生物质混合燃料生物质含量数组
            this.interFuelValue = 0; //国内化石燃料消耗量
            this.nationalFuelValue = 0; //国际化石燃料消耗量
            this.interBioFuelValue=  0; //国内生物质混合燃料的消耗量
            this.interBioFuelNCV= 0; //国内生物质混合燃料低位发热值
            this.interBioFuelBF= 0; //国内生物质混合燃料的生物质含量
            this.nationalBioFuelValue= 0; //国际生物质混合燃料的消耗量
            this.nationalBioFuelNCV= 0; //国际生物质混合燃料的低位发热值
            this.nationalBioFuelBF= 0; //国际生物质混合燃料的生物质含量
            this.ADHeat=0;//企业净购入热力
            this.ADElec=0;//企业净购入电量
            this.region= 0;//所属区域
            this.user_result=0;//用户输入的核算结果
        },
        submitData() {
            this.$refs.uploadBox.submit();}
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
    width: 33.3%;
    height: 92%;
    /* flex-grow: 1; */
    /* flex-basis: 0; */
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
