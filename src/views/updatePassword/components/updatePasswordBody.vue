<template>
    <div class="forget_password_container">
        <div class="body">
            <updateOldPasswordInput></updateOldPasswordInput>
            <forgetPasswordsInput></forgetPasswordsInput>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import updateOldPasswordInput from "./inputs/updateOldPasswordInput.vue";
import forgetPasswordsInput from "./inputs/forgetPasswordsInput.vue";
export default {
    components:{
        updateOldPasswordInput,
        forgetPasswordsInput
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
}
</style>
