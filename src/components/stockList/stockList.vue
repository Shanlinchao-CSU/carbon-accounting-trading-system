<template>
    <div class="stock_list_container">
        <div class="stock_list_head">
            <div
                class="element"
                :class="{ selected: item.selected, sort: item.sort }"
                v-for="(item, index) in config"
                :key="index"
                @click="clickEle(index)"
            >
                <div style="width: 100%; height: 60%">
                    {{ item.name }}
                </div>
                <div
                    style="
                        width: 100%;
                        height: 40%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    "
                >
                    <CaretBottom
                        v-if="item.sort && !item.up"
                        class="ele_icon"
                        :class="{ disabled: !item.selected }"
                    />
                    <CaretTop
                        v-if="item.sort && item.up"
                        class="ele_icon"
                        :class="{ disabled: !item.selected }"
                    />
                </div>
            </div>
        </div>
        <div class="stock_lister" ref="stock_lister" :key="refresh">
            <el-scrollbar height="100%">
                <stockEle
                    v-for="(item, index) in stock_list"
                    :key="index"
                    :data="item"
                    :class="{ ele_selected: selected_ele === item.代码 }"
                    @click="clickStockEle(index)"
                ></stockEle>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import stockEle from "./stockEle.vue";
export default {
    components: {
        stockEle,
    },
    data() {
        return {
            stock_list: [],
            radio1: "",
            refresh: "1",
            config: [
                {
                    name: "代码",
                    sort: true,
                    selected: false,
                    up: false,
                },
                {
                    name: "名称",
                    sort: false,
                    selected: false,
                    up: false,
                },
                {
                    name: "现价",
                    sort: true,
                    selected: false,
                    up: false,
                },
                {
                    name: "涨跌幅",
                    sort: true,
                    selected: false,
                    up: false,
                },
                {
                    name: "成交金额",
                    sort: true,
                    selected: false,
                    up: false,
                },
                {
                    name: "成交量",
                    sort: true,
                    selected: false,
                    up: false,
                },
            ],
            selected_ele: "",
        };
    },
    mounted() {
        this.clickEle(0);
    },
    methods: {
        setListData(data) {
            this.stock_list = data;
            this.refresh = this.refresh === "1" ? "2" : "1";
            this.clickEle(0);
            this.clickStockEle(0);
        },
        clickEle(index) {
            if (this.config[index].selected) {
                this.config[index].up = !this.config[index].up;
                if (this.config[index].up) {
                    this.sortData(this.config[index].name, 0);
                } else {
                    this.sortData(this.config[index].name, 1);
                }
            } else {
                this.config.forEach((element, index) => {
                    this.config[index].selected = false;
                    this.config[index].up = false;
                });
                this.config[index].selected = true;
                this.sortData(this.config[index].name, 1);
            }
        },
        clickStockEle(index) {
            console.log(this.stock_list[index].代码);
            this.selected_ele = this.stock_list[index].代码;
            this.$emit("clickEle", this.stock_list[index].代码);
        },
        sortData(key_, type_) {
            this.refresh = this.refresh === "1" ? "2" : "1";
            let key = key_;
            let type = type_;
            let temp = [];
            this.stock_list.forEach((element) => {
                temp.push(element);
            });
            while (this.stock_list.length > 0) {
                this.stock_list.pop();
            }
            function sToL(a, b) {
                let a_ =
                    key === "现价" || key === "涨跌幅" ? a[key][0] : a[key];
                let b_ =
                    key === "现价" || key === "涨跌幅" ? b[key][0] : b[key];
                a_ =
                    key === "现价" || key === "涨跌幅"
                        ? parseFloat(a_)
                        : parseInt(a_);
                b_ =
                    key === "现价" || key === "涨跌幅"
                        ? parseFloat(b_)
                        : parseInt(b_);
                return a_ - b_;
            }
            function lToS(a, b) {
                let a_ =
                    key === "现价" || key === "涨跌幅" ? a[key][0] : a[key];
                let b_ =
                    key === "现价" || key === "涨跌幅" ? b[key][0] : b[key];
                a_ =
                    key === "现价" || key === "涨跌幅"
                        ? parseFloat(a_)
                        : parseInt(a_);
                b_ =
                    key === "现价" || key === "涨跌幅"
                        ? parseFloat(b_)
                        : parseInt(b_);
                return b_ - a_;
            }
            if (type === 0) {
                temp.sort(sToL);
            } else {
                temp.sort(lToS);
            }
            temp.forEach((element) => {
                this.stock_list.push(element);
            });
        },
    },
};
</script>

<style scoped>
.stock_list_container {
    width: 100%;
    height: 100%;
    position: relative;
    /* border: 1px solid red; */
    overflow: hidden;
}
.stock_list_head {
    user-select: none;
    position: relative;
    width: 100%;
    height: 50px;
    /* border: 1px solid red; */
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-size: 18px;
}
.element {
    position: relative;
    width: auto;
    /* border: 1px solid red; */
    height: 100%;
    pointer-events: none;
}
.stock_lister {
    width: 100%;
    height: calc(100% - 50px);
}
.ele_icon {
    position: absolute;
    width: 20px;
}
.sort {
    cursor: pointer;
    pointer-events: all !important;
}
.selected {
    background-color: #822296;
    color: white !important;
    border-radius: 15px 15px 0px 0px;
}
.disabled {
    color: gray !important;
}
.ele_selected {
    background-color: #8222965f;
}
</style>
