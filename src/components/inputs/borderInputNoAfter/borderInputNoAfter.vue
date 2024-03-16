<template>
    <label class="border_input" :data-text="title">
        <input
            class="input_ele"
            :type="input_type"
            v-model="input_msg"
            :onfocus="focus"
            :onblur="blur"
            :placeholder="placeholder"
            :readonly="disabled"
        />
        <View :color="eye_color" v-if="view&&is_password" @click="viewClick" style="width: 20px;height: 20px;position: absolute;right: 10px;" />
        <Hide :color="eye_color" v-if="!view&&is_password" @click="viewClick" style="width: 20px;height: 20px;position: absolute;right: 10px;" />
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
            is_password:false,
            view:false,
            eye_color:"black"
        };
    },
    props: ["title", "focus", "blur", "msg", "placeholder", "disabled", "password"],
    mounted() {
        if (this.msg !== "") this.input_msg = this.msg;
        if(this.password){
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
        viewClick(){
            this.view = !this.view;
            this.input_type = this.input_type === "text" ? "password" : "text";
        },
        setMsg(msg){
            console.log(msg);
            this.input_msg = this.input_msg === msg ? this.input_msg : msg;
        }
    },
    watch: {
        input_msg() {
            this.msgChange();
        },
    },
};
</script>
<style scoped>
.border_input {
    font-family: Heiti;
    position: relative;
    width: 260px !important;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(144, 119, 149, 0.5);
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: var(--login-background-color);
}
.border_input:has(.input_ele:focus)::after {
    /* color: var(--input-focus-color); */
    color: var(--input-focus-color);
}
.border_input:has(.input_ele:focus) {
    border: 2px solid var(--input-focus-color)
}
.border_input:has(.input_ele:hover) {
    box-shadow: 0px 0px 2px var(--input-focus-color)
}
.input_ele {
    position: relative;
    width: 240px !important;
    height: 40px;
    border: 0; /*清除自带的2px的边框*/
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    z-index: 0;
    font-size: 20px;
    /* background-color: var(--login-background-color); */
    color: var(--input_ele-font-color);
    background-color: var(--input-ele-background-color);
}
.input_ele:focus {
    caret-color: var(--input-focus-color)
}
input::placeholder {
    font-size: 20px;
    color: rgba(144, 119, 149, 0.5);
}
</style>
