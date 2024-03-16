<template>
    <baseBox title="重新设置密码" :leave_func="leaveForgetPassword">
        <template #body_container>
            <forgetPasswordBody />
        </template>
    </baseBox>
</template>

<script>
import baseBox from "@/components/baseBox/baseBox.vue";
import forgetPasswordBody from "./components/forgetPasswordBody.vue";
export default {
    components: {
        baseBox,
        forgetPasswordBody,
    },
    methods: {
        leaveForgetPassword() {
            console.log("password退出");
            this.$emit("leaveForgetPassword");
        },
    },
};
</script>

<style scoped></style>
