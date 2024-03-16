<template>
    <label class="text_input">
        <textarea
            class="input_ele"
            :type="input_type"
            v-model="input_msg"
            :onfocus="focus"
            :onblur="blur"
            :placeholder="placeholder"
            :readonly="disabled"
            :class="{
                'custom-class': input_font_size === '10px',
                'custom-class-large': input_font_size === '20px',
                'custom-class-16px': input_font_size === '16px',
            }"
        >
        </textarea>
    </label>
</template>

<script>
import Storage from "@/assets/js/storage/storage.js";
const default_theme = {
    theme: "light",
    color: "",
    font_size: {
        base: "",
        button: "",
    },
};
export default {
    data() {
        return {
            input_msg: "",
            input_type: "text",
            is_password: false,
            view: false,
            eye_color: "black",
        };
    },
    props: [
        "title",
        "focus",
        "blur",
        "msg",
        "placeholder",
        "disabled",
        "input_font_size",
    ],
    mounted() {
        if (this.msg !== "") this.input_msg = this.msg;
        if (this.password) {
            this.is_password = true;
            this.input_type = "password";
        }
        let theme_json = Storage.get(0, "THEME", default_theme, "JSON");
        this.eye_color = theme_json.theme === "light" ? "black" : "#822296";
    },
    methods: {
        msgChange() {
            this.$emit("msgChange", this.input_msg);
        },
        get() {
            return this.input_msg;
        },
        viewClick() {
            this.view = !this.view;
            this.input_type = this.input_type === "text" ? "password" : "text";
        },
    },
    watch: {
        input_msg() {
            // this.input_msg = this.msg;
            this.msgChange();
        }
    },
};
</script>
<style scoped>
.text_input {
    font-family: Heiti;
    position: relative;
    width: 100%;
    height: auto;
    /* width: 260px;
    height: 50px; */
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    border: 2px solid rgba(144, 119, 149, 0.5);
    /* margin-top: 10px; */
    /* margin-bottom: 10px; */
    background-color: var(--login-background-color);
}

.text_input:has(.input_ele:focus)::after {
    /* color: var(--input-focus-color); */
    color: var(--input-focus-color);
}
.text_input:has(.input_ele:focus) {
    border: 2px solid var(--input-focus-color);
}
.text_input:has(.input_ele:hover) {
    box-shadow: 0px 0px 2px var(--input-focus-color);
}
.input_ele {
    /* resize: vertical; */
    resize: none;
    font-family: Heiti;
    position: relative;
    overflow: auto;
    width: calc(100% - 10px);
    /* min-height: 400px; */
    height: 100%;
    /* height: 100%; */
    border: 0; /*清除自带的2px的边框*/
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    /* border: 1px solid red; */
    z-index: 0;
    color: var(--input_ele-font-color);
    background-color: var(--input-ele-background-color);
    padding-left: 5px;
    padding-right: 5px;
    /* background-color:rgba(0,0,0,0); */
}
.input_ele:focus {
    caret-color: var(--input-focus-color);
}
input::placeholder {
    font-size: 16px;
    color: rgba(144, 119, 149, 0.5);
}
.custom-class {
    font-size: 10px;
}
.custom-class-large {
    font-size: 20px;
}
.custom-class-16px {
    font-size: 16px;
}
.input_ele::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.input_ele::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.input_ele::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
</style>
