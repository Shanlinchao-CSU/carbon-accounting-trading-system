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
                <carbonTransaction_sell :goToCarbonAccounting = "goToCarbonAccounting" ref="transaction_sell"></carbonTransaction_sell>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <carbonTransaction_purchase></carbonTransaction_purchase>
            </div>
            <div ref="son_2" class="son_subpage" style="left: 100%">
                <carbonTransactionMine ref="transaction_mine"></carbonTransactionMine>
            </div>
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
import carbonTransaction_sell from "@/views/showerSubpage/components/subPages/carbonTransaction_sell.vue"
import carbonTransaction_purchase from "@/views/showerSubpage/components/subPages/carbonTransaction_purchase.vue"
import carbonTransactionMine from "@/views/showerSubpage/components/subPages/carbonTransactionMine.vue"
import carbonTransactionReview from "@/views/showerSubpage/components/subPages/carbonTransactionReview.vue"
import store from "@/store/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    props: ['goToCarbonAccounting','goToLogin'],
    data() {
        return {
            son_pages: [true, false,false],
            son_pages_name: ["碳额度出售", "碳额度购买","我的出售"],
            company_type_name: "发电企业",
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        clickNav(index) {
          let enterpriseId = JSON.parse(
              localStorage.getItem("account")
          ).account_id;
          if (index === 0) {
            this.$refs.transaction_sell.getCarbonCount()
          }
          if (index === 2) {
            this.$refs.transaction_mine.getSellMsg(enterpriseId)
          }
            this.son_pages = [false, false,false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        
    },
    mounted() {
        // let enterprisetype = Storage.get("enterprisetype");
    },
    components: {
        textInput,
        dialogAvatarBox,
        linePrompt,
        modelSelect,
        carbonTransaction_sell,
        carbonTransaction_purchase,
        carbonTransactionMine,
        carbonTransactionReview
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
