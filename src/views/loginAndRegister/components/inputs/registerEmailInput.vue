<template>
    <div class="container">
        <borderInput
            title="邮箱"
            @msgChange="emailChange"
            ref="borderInput"
            placeholder="请输入需要绑定的邮箱"
            :disabled="disabled"
        ></borderInput>
        <linePrompt
            :opacity="error"
            style="width: 260px"
            :data_left="error"
            :data_right="error_right"
            type="error"
        ></linePrompt>
    </div>
</template>

<script>
// import ref from "vue";
// import store from "@/store/index.js";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    data() {
        return {
            error: "",
            is_email: true,
            email: {
                email: "",
            }
        };
    },
    components: {
        borderInput,
        linePrompt,
    },
    props:["disabled"],
    methods: {
        get() {
            this.error_right = "";
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
        }
    },
};
</script>

<style scoped>
</style>
