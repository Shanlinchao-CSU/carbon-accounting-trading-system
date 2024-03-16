<template>
    <baseBox title="重新绑定邮箱">
        <template #body_container>
            <updateEmailBody />
        </template>
    </baseBox>
</template>

<script>
import baseBox from "@/components/baseBox/baseBox.vue";
import updateEmailBody from "./components/updateEmailBody.vue";
export default {
    components:{
        baseBox,
        updateEmailBody
    }
};
</script>

<style></style>
