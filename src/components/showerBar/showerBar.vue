<template>
    <div class="showerbar">
        <div class="shower_bar_cantainer">
            <div
                v-for="(item, index) in menuItems"
                :key="index"
                class="showerbar-ele"
                :class="{ selected: item.selected }"
                @click="selectItem(item, index)"
            >
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                { text: "回到首页", selected: false },
                { text: "实体查询", selected: false },
                { text: "关系查询", selected: false },
                { text: "知识概览", selected: false },
                { text: "知识问答", selected: false },
                { text: "关于我们", selected: false },
            ],
        };
    },
    methods: {
        backToHome() {
            // ...
            this.$emit("backToHome");
        },
        selectItem(curItem, index) {
            // 上一个选中的元素
            var lastItem = null;

            this.menuItems.forEach((item) => {
                if (item.selected === true) {
                    lastItem = item;
                    lastItem.selected = false;
                }
            });

            curItem.selected = true;
            // 根据index执行相应函数
            // ...
            switch (index) {
                case 0:
                    this.backToHome();
                    break;
            }
        },
    },
};
</script>

<style scoped>
.showerbar {
    position: absolute;
    bottom: 0;
    height: 100vh;
    border: 1px solid red;
    /* border: solid 1px black; */
}
.shower_bar_cantainer {
    position: relative;
    margin: 100px 20px 0px 20px;
    border: 1px solid red;
}
.showerbar-ele {
    cursor: pointer;
    font-family: "幼圆";
    font-size: 30px;
    color: #000;
    border: 2px solid transparent;
    margin: 20px 0px 20px 0px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(0, 55, 255);
    position: relative;
    overflow: hidden;
    transition: border-left-color 0.3s, transform 0.3s;
}

.showerbar-ele::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: rgba(153, 114, 161, 0.2);
    opacity: 0;
    transition: left 0.3s, opacity 0.3s;
    z-index: -1;
}

.showerbar-ele:hover::before,
.showerbar-ele.selected::before {
    left: 0;
    opacity: 1;
}

.showerbar-ele:hover {
    border-left-color: rgb(153, 114, 161);
    transform: scale(1.1);
}

.showerbar-ele.selected {
    background-color: rgba(153, 114, 161, 0.2);
    border-left-color: rgb(153, 114, 161);
    transform: scale(1.1);
}

.showerbar-ele:not(:hover) {
    transition: border-left-color 0.3s, transform 0.3s;
    border-left-color: transparent;
    transform: scale(1);
}
</style>
