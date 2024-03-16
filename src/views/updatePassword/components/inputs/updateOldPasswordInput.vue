<template>
    <div>
        <borderInput
            title="密码"
            @msgChange="change"
            ref="borderInput"
            :focus="onFoucs"
            :blur="onBlur"
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
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    data() {
        return {
            error: "",
            prompt_type:"error"
        };
    },
    components: {
        borderInput,
        linePrompt,
    },
    methods: {
        onFoucs() {
            console.log("foucs");
        },
        onBlur() {
            console.log("blur");
        },
        change(msg) {
            // console.log(msg);
        },
        get() {
            let str = this.$refs.borderInput.get();
            if (new Checker(str, ["no-null"]).check()) {
                if (
                    new Checker(str, [
                        "@length-min=6",
                        "@length-max=20",
                    ]).check()
                ) {
                    if (
                        new Checker(str, [
                            "sql-check",
                            "no-zh-Hans",
                            "no-spacing",
                            "no-base-symbols",
                        ]).check()
                    ) {
                        this.error = "";
                        return str;
                    } else {
                        this.error = "请填写合法密码";
                        return false;
                    }
                } else {
                    this.error = "密码长度在6~20位之间";
                    return false;
                }
            } else {
                this.error = "密码不能为空";
                return false;
            }
        },
        setError(error){
            this.error = error;
        },
        setWaiting(is_waiting){
            if(is_waiting){
                this.prompt_type = "waiting";
                this.error = "登录中";
            }else{
                this.prompt_type = "error";
                this.error = "";
            }
        }
    },
};
</script>

<style></style>
