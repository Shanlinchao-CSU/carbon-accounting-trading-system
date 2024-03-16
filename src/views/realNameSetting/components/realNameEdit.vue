<template>
    <div class="rn-input-ele">
        <borderInput
            @click="get"
            ref="borderInput"
            title="真实姓名"
            :msg="real_name"
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
        real_name: String,
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
            this.$emit("msgChange", new_msg, "name");
        },
        get() {
            let str = this.$refs.borderInput.get();
            // console.log(str);
            if (new Checker(str, ["no-null"]).check()) {
                if (
                    new Checker(str, [
                        "sql-check",
                        "no-spacing",
                        "no-base-symbols",
                    ]).check()
                ) {
                    if (new Checker(str, ["no-number"]).check()) {
                        this.error = "";
                        return { msg: str, type: "real_name" };
                    } else {
                        this.error = "姓名中不能包含数字";
                        return false;
                    }
                } else {
                    this.error = "姓名中不能包含非法字符";
                    return false;
                }
            } else {
                this.error = "姓名不能为空";
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
