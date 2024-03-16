<template>
    <div class="forget_password_container">
        <div class="body">
            <updateEmailInput></updateEmailInput>
            <updateEmailPasswordInput></updateEmailPasswordInput>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import updateEmailInput from "./inputs/updateEmailInput.vue";
import updateEmailPasswordInput from "./inputs/updateEmailPasswordInput.vue";
export default {
    components:{
        updateEmailInput,
        updateEmailPasswordInput
    }
};
</script>

<style scoped>
.forget_password_container{
    width: 100%;
    height: 100%;
    position: relative;
}
.body{
    width: 100%;
    height: 80%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid red;
}
</style>
