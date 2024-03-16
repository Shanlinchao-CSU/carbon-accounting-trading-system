<template>
    <div class="login_msg_login">
        <div class="msg_login_register" @click="buttonClick">
            <div
                class="msg_login_register_text"
                data-text="没有账号？注册一个！"
            >
                没有账号？注册一个！
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        buttonClick(){
            this.$emit("buttonClick");
        }
    }
};
</script>

<style scoped>
.login_msg_register{
    /* position: absolute;
    top: 14%; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    /* border: 1px solid blue;
    width: 75%;
    height: 60%; */
}
.msg_login_register, .msg_login_register_text{
    cursor:pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: FZZJ-WHJZTJW;
    font-size: 18px;
    width: 220px;
    height: 30px;
    border: 1px solid var(--login-msg-background-color);
    border-radius: 20px;
    overflow: hidden;
    color: var(--msg_login_register_text-color)
}
.msg_login_register{
    position: absolute;
    bottom: 5%;
    
}
.msg_login_register_text{
    pointer-events: none;
    z-index: 1;
    width: 213px;
    height: 23px;
    background-color: var(--login-msg-background-color);
}
.msg_login_register::after{
    content: " ";
    position: absolute;
    width: 150%;
    height: 80%;
    background:linear-gradient(90deg, rgb(199, 14, 250) 40%, rgb(255, 255, 255) 70%);
    /* border-radius: 20px; */
}
.msg_login_register:hover::after{
    animation: login-msg-login-goto-register;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
</style>
