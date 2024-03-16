<template>
    <div class="rn-input-ele">
        <borderInput ref="borderInput" title="电话号码" :msg="phonenumber" @msgChange="msgChange" />
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
        phonenumber: String,
    },
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
        msgChange(new_msg){
            this.$emit("msgChange", new_msg, "phone");
        },
        get() {
            let str = this.$refs.borderInput.get();
            if (new Checker(str, ["no-null"]).check()) {
                if (
                    new Checker(str, [
                        "sql-check",
                        "no-zh-Hans",
                        "no-en",
                        "no-spacing",
                        "no-base-symbols",
                    ]).check()
                ) {
                    if (new Checker(str, ["is-num"]).check()) {
                        if (
                            new Checker(str, [
                                "is-num",
                                "@length-max=11",
                                "@length-min=11",
                            ]).check()
                        ) {
                            this.error = "";
                            return { msg: str, type: "phone_number" };
                        } else {
                            this.error = "电话号码长度必须为11位";
                            return false;
                        }
                    } else {
                        this.error = "电话号码只能含有数字";
                        return false;
                    }
                } else {
                    this.error = "电话号码中不能含有非法字符";
                    return false;
                }
            } else {
                this.error = "电话号码不能为空";
                return false;
            }
        },
    },
};
</script>

<style scoped>
.rn-input-ele {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>
