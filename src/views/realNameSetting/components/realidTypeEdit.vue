<template>
    <div class="rn-input-ele">
        <borderSelect
            ref="borderSelect"
            style="margin-bottom: 30px"
            title="证件类型"
            :items="IDtypes"
            :index="getIDType(IDtype)"
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
import borderSelect from "@/components/selects/borderSelect/boderSelect.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    props: {
        IDtype: String,
    },
    data() {
        return {
            IDtypes: ["居民身份证"],
            error: "",
        };
    },
    components: {
        borderSelect,
        linePrompt,
    },
    methods: {
        get() {
            let str = this.$refs.borderSelect.get();
            if (new Checker(str, ["no-null"]).check()) {
                this.error = "";
                return { msg: str, type: "IDtype" };
            } else {
                this.error = "证件类型不能为空";
                return false;
            }
        },
        getIDType(str) {
            if (str === "C01") {
                return 0;
            } else {
                // console.log("证件类型错误");
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
