<template>
    <div class="divSelect">
        <label class="select" @click="openValue" :data-text="title">
            <input
                class="input_ele"
                type="text"
                v-model="input_value"
                :placeholder="placeholder"
                disabled
            />
            <span ref="arrow" class="arrow" :class="{ rotate: show }"></span>
        </label>
        <transition name="slide-down">
            <div class="list" v-show="show">
                <ul>
                    <li
                        @click="getvalue(item)"
                        v-for="item in items"
                        :key="item.index"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        items: Array, // 选择元素的数组
        title: String,
        placeholder: String,
        index: Number, // 开始默认选择的元素序号（不赋值则默认选择为空）
        value:String,//默认的值
        select_type:String,//
    },
    data() {
        return {
            show: false,
            input_value: "",
        };
    },
    methods: {
        openValue() {
            this.show = !this.show;
            // const arrow = document.querySelector(".arrow");
            this.$refs.arrow.classList.toggle("rotate");
        },
        getvalue(item) {
            this.input_value = item;
            this.show = false;
        },
        get() {
            // console.log(typeof this.input_value);
            return this.input_value;
        },
    },
    mounted() {
        if (this.value !== "") this.input_value = this.value;
        // this.input_value = "你在干什";
        // console.log("现在被选中的是：",this.input_value);
        if (this.items[this.index] !== undefined)
            this.input_value = this.items[this.index];
    },
    watch:{
        input_value(newValue,oldValue) {
            // console.log("旧：",oldValue);
            // console.log("新：",newValue);
            // console.log("钙片就是好吃");
            if(oldValue!==""&&this.select_type==="sex"){
                this.$emit("sexChanged");
            }
            else if(oldValue!==""&&this.select_type==="occu"){
                this.$emit("occuChanged");
            }
        }
    }
};
</script>

<style scoped>
.divSelect {
    position: relative; /* 添加这行样式 */
    width: 260px;
    display: block;
}
.select {
    font-family: Heiti;
    position: relative;
    width: 260px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(144, 119, 149, 0.5);
    margin-top: 10px;
    background-color: var(--login-background-color);
}

.select::after {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 17px;
    display: flex;
    align-items: center;
    width: auto;
    height: 20px;
    position: absolute;
    left: 5%;
    top: -12px;
    background-color: var(--input-ele-background-color);
    content: attr(data-text);
    z-index: 1;
    color: rgb(144, 119, 149);
}
.select:has(.input_ele:focus)::after {
    color: var(--input-focus-color);
}
.select:has(.input_ele:focus) {
    border: 2px solid var(--input-focus-color);
}
.select:has(.input_ele:hover) {
    box-shadow: 0px 0px 2px var(--input-focus-color);
}

.select input::placeholder {
    font-size: 16px;
    color: rgba(144, 119, 149, 0.5);
}

.input_ele {
    cursor: default;
    position: relative;
    width: 240px;
    height: 40px;
    border: 0; /*清除自带的2px的边框*/
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    /* border: 1px solid red; */
    z-index: 0;
    font-size: 24px;
    color: black;
    text-indent: 12px;
    background-color: var(--input-ele-background-color);
    color: var(--input_ele-font-color);
}
.input_ele:focus {
    caret-color: var(--input-focus-color);
}

.arrow {
    position: relative;
    left: -5px;
    background: url("./img/arrow.png") no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.rotate {
    transform: rotate(90deg);
}

.list {
    position:absolute;
    width: 261px;
    border: 1px solid var(--input-focus-color);
    background-color: var(--login-background-color);
    color: var(--input_ele-font-color);
    overflow: hidden;
    z-index: 100;
}

.list ul {
    padding: 0;
    margin: 0;
}

.list ul li {
    list-style: none;
    width: 100%;
    margin: 0;
    cursor: pointer;
    line-height: 30px;
    animation: slideDown 0.07s forwards;
    /* border: solid 1px red; */
    /* right: 25px; */
}

.list ul li:hover {
    background-color: var(--border-select-list-hover-background-color)
}

@keyframes slideDown {
    0% {
        height: 0;
    }
    100% {
        height: auto;
    }
}
</style>
