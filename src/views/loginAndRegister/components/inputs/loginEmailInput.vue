<template>
    <div>
        <borderInput
            title="登录邮箱或ID"
            @msgChange="change"
            ref="borderInput"
        ></borderInput>
        <!-- <transition name="opacity400">
            <linePrompt
                v-visible="888"
                style="width: 260px"
                :data_left="error"
                type="error"
            ></linePrompt>
        </transition> -->
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
                        return { msg: str, type: "email" };
                    } else {
                        this.error = "请填写合法邮箱";
                        return false;
                    }
                } else {
                    if (
                        new Checker(str, [
                            "is-num",
                            "@length-max=9",
                            "@length-min=9",
                        ]).check()
                    ) {
                        this.error = "";
                        return { msg: str, type: "id" };
                    } else {
                        this.error = "ID是9位数字";
                        return false;
                    }
                }
            } else {
                this.error = "邮箱或ID不能为空";
                return false;
            }
        },
    },
};
</script>

<style></style>
