<template>
    <div class="stock_ele_container">
        <div
            class="element"
            v-for="(item, index) in config"
            :key="index"
            :class="{
                red: item.color === 'red',
                green: item.color === 'green',
            }"
        >
            {{ item.value }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    data() {
        return {
            config: [
                {
                    name: "代码",
                    value: "",
                },
                {
                    name: "名称",
                    value: "",
                },
                {
                    name: "现价",
                    value: "",
                    color: "",
                },
                {
                    name: "涨跌幅",
                    value: "",
                    color: "",
                },
                {
                    name: "成交金额",
                    value: "",
                },
                {
                    name: "成交量",
                    value: "",
                },
            ],
        };
    },
    mounted() {
        // console.log(this.data);
        this.config.forEach((element, index) => {
            try {
                if (element.name === "现价" || element.name === "涨跌幅") {
                    this.config[index].value = this.data[element.name][0];
                    this.config[index].color = this.data[element.name][1];
                } else {
                    this.config[index].value = this.data[element.name];
                }
                if(element.name === "涨跌幅" ){
                    this.config[index].value += "%";
                }
                if(element.name === "现价" || element.name === "成交金额" || element.name === "成交量"){
                    this.config[index].value = this.moneyConversion(this.config[index].value);
                }
            } catch {
                this.config[index].value = "None";
            }
        });
    },
    methods:{
        moneyConversion(money){
            // 元
            money = parseFloat(money);
            let m = parseInt(money).toString();
            // 1234/5678/9
            if(m.length < 5){
                return money.toFixed(2);
            }
            else if(m.length >= 5 && m.length < 9){
                // 万
                m = (money / 10000).toFixed(2) + "万";
                return m;
            }else{
                // 亿
                m = (money / 100000000).toFixed(2) + "亿";
                return m;
            }
        }
    }
};
</script>

<style scoped>
.stock_ele_container {
    width: 100%;
    height: 40px;
    position: relative;
    /* border: 1px solid red; */
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    cursor: pointer;
}
.element {
    position: relative;
    width: 100%;
    /* border: 1px solid red; */
    text-align: center;
    line-height: 40px;
    height: 100%;
    font-size: 15px;
}
.red{
    color: red !important;
}
.green{
    color: green !important;
}
</style>
