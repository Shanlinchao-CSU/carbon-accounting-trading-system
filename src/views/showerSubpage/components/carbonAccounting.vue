<template>
    <div class="c_guide_subpage_container" ref="container">
        <div class="select_type">
            <div
                v-for="(item, index) in son_pages_name"
                :key="index"
                class="page_nav"
                :class="{ page_nav_selected: son_pages[index] }"
                @click="clickNav(index)"
            >
                {{ item }}
            </div>
        </div>
        <div
            style="
                position: relative;
                /* border: 1px solid red; */
                width: 100%;
                height: calc(100% - 30px);
                display: flex;
                overflow: hidden;
            "
        >
            <div ref="son_0" class="son_subpage">
                <carbonAccountingSubpage_2 v-if="choose_page == 2"></carbonAccountingSubpage_2>
                <carbonAccountingSubpage_10 v-if="choose_page == 10"></carbonAccountingSubpage_10>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <carbonAccountingReview ref="accounting_review"></carbonAccountingReview>
            </div>
        </div>
    </div>
</template>
<script>
import carbonAccountingReview from "./subPages/carbonAccountingReview.vue";
import carbonAccountingSubpage_2 from "./subPages/carbonAccountingSubpage_2.vue";
import carbonAccountingSubpage_10 from "./subPages/carbonAccountingSubpage_10.vue";
import textInput from "@/components/inputs/textInput/textInput.vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import Storage from "@/assets/js/storage/storage.js";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import connector from "@/assets/js/connector/connector";
import Checker from "@/assets/js/checker/checker.js";
import modelSelect from "@/components/selects/borderSelect/modelSelect.vue";
import carbonTransaction_sell from "@/views/showerSubpage/components/subPages/carbonTransaction_sell.vue"
import carbonTransaction_purchase from "@/views/showerSubpage/components/subPages/carbonTransaction_purchase.vue"
import store from "@/store/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    props: ['goToCarbonAccounting','goToLogin'],
    data() {
        return {
            son_pages: [true, false],
            son_pages_name: ["进行碳核算", "查看碳核算历史"],
            company_type_name: "发电企业",
            choose_page: 2,
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        clickNav(index) {
          if (index === 1){
            let enterpriseId = JSON.parse(localStorage.getItem("account")).account_id
            this.$refs.accounting_review.getSellMsg(enterpriseId)
          }
            this.son_pages = [false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        
    },
    mounted() {
        let company_type_name = JSON.parse(
            localStorage.getItem("account")
        ).enterprise_type;
        switch (company_type_name) {
            case "发电企业": {
                this.choose_page =
                    1;
                break;
            }
            case "电网企业": {
                this.choose_page =
                    2;
                break;
            }
            case "钢铁生产企业": {
                this.choose_page =
                    3;
                break;
            }
            case "化工生产企业": {
                this.choose_page =
                    4;
                break;
            }
            case "电解铝生产企业": {
                this.choose_page =
                    5;
                break;
            }
            case "镁冶炼企业": {
                this.choose_page =
                    6;
                break;
            }
            case "平板玻璃生产企业": {
                this.choose_page =
                    7;
                break;
            }
            case "水泥生产企业": {
                this.choose_page =
                   8;
                break;
            }
            case "陶瓷生产企业": {
                this.choose_page =
                    9;
                break;
            }
            case "民航企业": {
                this.choose_page =
                    10;
                break;
            }
            default: {
                this.choose_page =
                    0;
                break;
            }
        }
    },
    components: {
        textInput,
        dialogAvatarBox,
        linePrompt,
        modelSelect,
        carbonTransaction_sell,
        carbonTransaction_purchase,
        carbonAccountingSubpage_2,
        carbonAccountingSubpage_10,
        carbonAccountingReview
    },

    created() {},
};
</script>

<style scoped>
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
.c_guide_subpage_container {
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
.c_guide_subpage_title {
    /* background-color: red; */
    width: 100%;
    position: relative;
    font-weight: 600;
    overflow: hidden;
    font-size: 25px;
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
.son_subpage {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-out;
    /* border: 1px solid red; */
}

</style>
