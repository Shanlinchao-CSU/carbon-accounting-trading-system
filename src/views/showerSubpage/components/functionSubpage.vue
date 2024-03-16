<!-- 知识概览子页面 -->
<template>
    <div class="fs_subpage_container" ref="container">
        <div class="overview_subpage" ref="container">
            <div class="overview_head">
                <span>类型：</span>
                <el-select
                    v-model="type_selected"
                    placeholder=""
                    style="width: 80px; font-size: 15px"
                    :disabled="is_waiting"
                >
                    <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <div
                    class="goto_button"
                    :class="{
                        goto_button_disabled: is_waiting,
                    }"
                    @click="changeSearchType"
                >
                    检索
                </div>
                <span>&nbsp;区间：</span>
                <el-select
                    v-model="page_section"
                    placeholder=""
                    style="width: 80px; font-size: 15px"
                    :disabled="is_waiting || all_page === 0"
                >
                    <el-option
                        v-for="item in page_sections"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <span>&nbsp;页码：</span>
                <el-select
                    v-model="page"
                    placeholder=""
                    style="width: 80px; font-size: 15px"
                    :disabled="is_waiting || all_page === 0"
                >
                    <el-option
                        v-for="item in pages"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <div
                    class="goto_button"
                    :class="{
                        goto_button_disabled: is_waiting || all_page === 0,
                    }"
                    @click="goToPageBySetIndex"
                >
                    跳转
                </div>
                <div class="page_msg">
                    <span>第{{ now_page }}页</span>
                    &nbsp;&nbsp;
                    <span>共有{{ all_page }}页</span>
                    <br />
                    <span>共有{{ all_amount }}条记录</span>
                </div>
            </div>
            <div class="overview_list">
                <overviewList
                    v-for="(item, index) in data_for_overview"
                    :key="index"
                    :data="item"
                ></overviewList>
            </div>
        </div>
    </div>
</template>
<script>
import store from "@/store/index";
import overviewList from "@/components/overview/overviewList.vue";
import Connector from "@/assets/js/connector/connector";
export default {
    data() {
        return {
            data_list: [
                {
                    name: "平安银行",
                },
            ],
            data_for_overview: [],
            type_selected: "",
            types: [
                {
                    label: "公司",
                    value: "公司",
                },
                {
                    label: "个人",
                    value: "个人",
                },
                {
                    label: "产业",
                    value: "产业",
                },
                {
                    label: "产品",
                    value: "产品",
                },
            ],
            page_section: "",
            page_sections: [],
            page: "",
            pages: [],
            now_page: 1,
            all_page: 0,
            now_type: "",
            all_amount: 0,
            need_init: false,
            is_waiting: false,
        };
    },
    components: {
        overviewList,
    },
    watch: {
        page_section() {
            this.pageListInit();
        },
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        dataToUse(data_list) {
            const amount = 80;
            this.data_list = [];
            this.data_list = data_list;
            let l = this.data_list.length;
            let i = parseInt(l / 80);
            let j = l % 80;
            i = j !== 0 ? i + 1 : i;
            console.log(i);
            console.log(j);
            this.data_for_overview = [];
            for (let a = 0; a < i; a++) {
                let temp = [];
                if (a !== i - 1 || j === 0) {
                    for (let b = 0; b < amount; b++) {
                        temp.push(this.data_list[a * amount + b]);
                    }
                } else {
                    for (let b = 0; b < j; b++) {
                        temp.push(this.data_list[a * amount + b]);
                    }
                }
                this.data_for_overview.push(temp);
            }
            console.log(this.data_for_overview);
        },
        setAmount(amount) {
            this.all_amount = amount;
        },
        pageSection() {
            let l = this.all_amount; // 总数
            console.log("l", parseInt(l / 320));
            this.all_page = parseInt(l / 320); // 总页数
            this.all_page =
                this.all_page % 10 === 0 ? this.all_page : this.all_page + 1; // 总数不是10的倍数要加一
            let c = parseInt(this.all_page / 10); // 一个区间10页，区间个数
            let p = this.all_page % 10; // 余数
            console.log("all_page", this.all_page);
            for (let i = 0; i < c; i++) {
                let ele = {
                    label: "",
                    value: "",
                    i: 0,
                };
                let s = "";
                s = (i * 10 + 1).toString() + "~" + ((i + 1) * 10).toString();
                ele.label = s;
                ele.value = s;
                ele.i = i;
                this.page_sections.push(ele);
            }
            let ele = {
                label: "",
                value: "",
                i: 0,
            };
            let s = "";
            s = (c * 10 + 1).toString() + "~" + (c * 10 + p).toString();
            if (p !== 0) {
                ele.label = s;
                ele.value = s;
                ele.i = c;
            }
            this.page_sections.push(ele);
            this.page_section = this.page_sections[0].value;
            this.pageListInit();
        },
        pageListInit() {
            console.log("刷新");
            if (this.page_section === "") return;
            this.pages = [];
            let value = this.page_section;
            let i = this.page_sections.findIndex((element) => {
                return value === element.value;
            });
            for (let j = i * 10 + 1; j <= i * 10 + 10; j++) {
                if (j > this.all_page) break;
                let ele = {
                    label: j.toString(),
                    value: j.toString(),
                    i: j,
                };
                this.pages.push(ele);
            }
            console.log(this.pages[0].value);
            this.page = this.pages[0].value;
        },
        goToPageBySetIndex() {
            if (this.type_selected === "") {
                return;
            }
            let index = this.pages.find((element) => {
                return element.value === this.page;
            }).i;
            this.now_page = index;
            let type_index = this.types.findIndex((element) => {
                return this.type_selected === element.value;
            });
            Connector.send(
                [type_index.toString(), index.toString()],
                "getOverview",
                this.overviewCallback,
                this.overviewWaiting,
                this.overviewTimeout,
                5000
            );
        },
        changeSearchType() {
            if (
                this.type_selected === this.now_type ||
                this.type_selected === ""
            ) {
                return;
            }
            this.now_type = this.type_selected;
            this.need_init = true;
            let index = this.types.findIndex((element) => {
                return this.type_selected === element.value;
            });
            Connector.send(
                [index.toString(), "1"],
                "getOverview",
                this.overviewCallback,
                this.overviewWaiting,
                this.overviewTimeout,
                5000
            );
            // 检索
        },
        overviewCallback(msg) {
            if (msg.success) {
                // 目录初始化
                if (this.need_init) {
                    this.all_page = 0;
                    this.now_page = 1;
                    this.page = "";
                    this.pages = [];
                    this.page_section = "";
                    this.page_sections = [];
                    this.data_list = [];
                    this.data_for_overview = [];
                }
                let data_use = msg.content.result;
                let all_amount = msg.content.amount;
                this.dataToUse(data_use);
                this.setAmount(all_amount);
                if (this.need_init) {
                    this.need_init = false;
                    this.pageSection();
                }
            } else {
                console.log("查询失败");
            }
        },
        overviewWaiting(is_waiting) {
            if (is_waiting) {
                //
            }
        },
        overviewTimeout() {
            console.log("超时");
        },
    },
};
</script>

<style scoped>
.fs_subpage_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
}
.select_type {
    user-select: none;
    position: relative;
    display: flex;
    border-bottom: 2px solid #8222966f;
    width: 100%;
    height: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}
.page_nav {
    cursor: pointer;
    padding: 0px 10px 0px 10px;
    border-left: 1px solid #822296;
    border-right: 1px solid #822296;
    color: rgba(0, 0, 0, 0.679);
    font-size: 17px;
    transition: all 0.1s linear;
}
.page_nav_selected {
    transition: all 0.1s linear;
    color: #822296;
}
.fs_subpage_body {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    /* border: 1px solid red; */
    overflow: hidden;
}
.son_subpage {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-out;
    /* border: 1px solid red; */
}
.overview_subpage {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
}
.overview_head {
    position: relative;
    width: 100%;
    height: 50px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
}
.overview_list {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    /* border: 1px solid red; */
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    justify-content: center;
}
.page_msg {
    position: absolute;
    top: 0;
    right: 20px;
    width: auto;
    height: 100%;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
}
.goto_button {
    user-select: none;
    cursor: pointer;
    position: relative;
    width: 60px;
    height: 35px;
    font-size: 16px;
    font-weight: 600;
    background-color: rgb(207, 159, 216);
    color: white;
    line-height: 35px;
    text-align: center;
    border-radius: 10px;
    margin-left: 10px;
    float: right;
}
.goto_button:hover {
    background-color: rgb(204, 121, 221);
}
.goto_button_disabled {
    cursor: not-allowed !important;
}
.goto_button_disabled:hover {
    background-color: rgb(207, 159, 216);
}
</style>
