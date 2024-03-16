<template>
    <div>
        <borderInput
            title="登录邮箱"
            @msgChange="change"
            ref="borderInput"
            :disabled="disabled"
            placeholder="请输入你的邮箱"
        ></borderInput>
        <linePrompt
            :opacity="error"
            style="width: 260px"
            :data_left="error"
            type="error"
        ></linePrompt>
    </div>
</template>

<script>
// import ref from "vue";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    data() {
        return {
            error: "",
        };
    },
    props:["disabled"],
    components: {
        borderInput,
        linePrompt,
    },
    methods: {
        // change(msg) {
        //     // console.log(msg);
        // },
        get() {
            let str = this.$refs.borderInput.get();
            if (new Checker(str, ["no-null"]).check()) {
                if (new Checker(str, ["is-email"]).check()) {
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
                        this.error = "请填写合法邮箱";
                        return false;
                    }
                } else {
                    this.error = "请填写邮箱";
                    return false;
                }
            } else {
                this.error = "邮箱不能为空";
                return false;
            }
        },
    },
};
</script>

<style></style>
