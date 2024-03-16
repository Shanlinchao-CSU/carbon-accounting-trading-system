<template>
    <div class="container">
        <borderInput
            title="密码"
            @msgChange="passwordChange"
            ref="borderInput"
            :msg="password.password"
            placeholder="请输入6~20位密码"
            :disabled="disabled"
            password="true"
            :focus="passwordFocus"
            :blur="passwordBlur"
        ></borderInput>
        <borderInput
            title="确认密码"
            @msgChange="passwordConfirmChange"
            ref="borderInputConfirm"
            :msg="password.password_confirm"
            placeholder="请确认密码"
            class="border_input_2"
            :disabled="disabled"
            password="true"
            :focus="passwordFocus"
            :blur="passwordBlur"
        ></borderInput>
        <linePrompt
            :opacity="error"
            style="width: 260px"
            :data_left="error"
            :type="prompt_type"
        ></linePrompt>
    </div>
</template>

<script>
import ref from "vue";
import store from "@/store/index.js";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    data() {
        return {
            error: "",
            is_email: true,
            prompt_type:"error",
            password: {
                password: "",
                password_confirm: "",
            },
            vcode: {
                vcode: "",
            },
        };
    },
    components: {
        borderInput,
        linePrompt,
    },
    props:["disabled"],
    methods: {
        passwordFocus(){
            this.$emit("passwordOnFocus");
        },
        passwordBlur(){
            this.$emit("passwordOnBlur");
        },
        passwordChange(msg) {
            this.password.password = msg;
        },
        passwordConfirmChange(msg) {
            this.password.password_confirm = msg;
        },
        get() {
            if (
                (this.password.password === this.password.password_confirm &&
                    this.password.password_confirm == null) ||
                (this.password.password === this.password.password_confirm &&
                    this.password.password_confirm === "")
            ) {
                this.error = "密码不能为空";
                return false;
            } else {
                if (this.password.password !== this.password.password_confirm) {
                    this.error = "两次密码不相等";
                    return false;
                } else {
                    if (
                        new Checker(this.password.password, [
                            "@length-min=6",
                            "@lenght-max=20",
                        ]).check()
                    ) {
                        if (
                            new Checker(this.password.password, [
                                "no-zh-Hans",
                                "sql-check",
                                "no-base-symbols",
                            ]).check()
                        ) {
                            this.error = "";
                            return this.password.password;
                        } else {
                            this.error = "密码包含非法字符";
                            return false;
                        }
                    } else {
                        this.error = "密码长度为6~20";
                        return false;
                    }
                }
            }
        },
        setError(error){
            this.error = error;
        },
        setWaiting(is_waiting, msg){
            if(is_waiting){
                this.prompt_type = "waiting";
                this.error = msg;
            }else{
                this.prompt_type = "error";
                this.error = "";
            }
        }
    },
};
</script>

<style scoped>
.border_input_2{
    margin-top:20px ;
}
</style>
