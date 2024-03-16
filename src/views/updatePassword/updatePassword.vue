<template>
    <baseBox title="重新设置密码">
        <template #body_container>
            <forgetPasswordBody />
        </template>
    </baseBox>
</template>

<script>
import baseBox from "@/components/baseBox/baseBox.vue";
import forgetPasswordBody from "./components/updatePasswordBody.vue";
export default {
    components:{
        baseBox,
        forgetPasswordBody
    }
};
</script>

<style></style>
