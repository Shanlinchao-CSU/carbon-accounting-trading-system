<template>
    <div class="rn-input-ele">
        <borderInput
            ref="borderInput"
            title="证件号"
            :msg="ID"
            @msgChange="msgChange"
        />
        <linePrompt
            :opacity="error"
            style="width: 260px"
            :data_left="error"
            type="error"
        ></linePrompt>
    </div>
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    props: {
        ID: String,
    },
    data() {
        return { error: "" };
    },
    components: {
        borderInput,
        linePrompt,
    },
    methods: {
        msgChange(new_msg){
            this.$emit("msgChange", new_msg, "id");
        },
        get() {
            let str = this.$refs.borderInput.get();
            if (new Checker(str, ["no-null"]).check()) {
                if (
                    new Checker(str, [
                        "sql-check",
                        "no-zh-Hans",
                        "no-spacing",
                        "no-base-symbols",
                    ]).check()
                ) {
                    if (
                        new Checker(str, [
                            "@length-max=18",
                            "@length-min=18",
                        ]).check()
                    ) {
                        if (new Checker(str, ["is-num"]).check()) {
                            this.error = "";
                            return { msg: str, type: "ID" };
                        } else {
                            if (
                                str[16] === "X" &&
                                new Checker(str.slice(0, str.length - 1), [
                                    "is-num",
                                ]).check()
                            ) {
                                this.error = "";
                                return { msg: str, type: "ID" };
                            } else {
                                this.error = "证件号中不能包含非法字符";
                                return false;
                            }
                        }
                    } else {
                        this.error = "证件号码是18位数字";
                        return false;
                    }
                } else {
                    this.error = "证件号码不能包含非法字符";
                    return false;
                }
            } else {
                this.error = "证件号码不能为空";
                return false;
            }
        },
    },
};
</script>

<style scoped></style>
