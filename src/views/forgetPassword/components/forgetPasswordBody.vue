<template>
    <div class="forget_password_container">
        <div class="body">
            <forgetEmailInput ref="forget_email_input" :disabled="disabled"></forgetEmailInput>
            <forgetPasswordsInput ref="forget_passwords_input" :disabled="disabled"></forgetPasswordsInput>
        </div>
        <div class="bottom">
            <confirmButton style="margin: 0px;" content="重置" @confirmClick="confirmClick"></confirmButton>
        </div>
    </div>
</template>

<script>
import confirmButton from "@/components/buttons/loginAndRegisterButton/confirmButton/confirmButton.vue";
import forgetEmailInput from "./inputs/forgetEmailInput.vue";
import forgetPasswordsInput from "./inputs/forgetPasswordsInput.vue";
import Connector from "@/assets/js/connector/connector";
import Code from "@/assets/js/code/code";
import utils from "@/assets/js/utils";
import store from "@/store/index.js";
export default {
    data(){
        return{
            disabled:null
        };
    },
    components:{
        forgetEmailInput,
        forgetPasswordsInput,
        confirmButton
    },
    methods:{
        confirmClick(){
            // 重置按钮点击
            let email = this.$refs.forget_email_input.get();
            let password = this.$refs.forget_passwords_input.get();
            console.log(email);
            console.log(password);
            if(!email || !password){
                return;
            }else{
                // 执行忘记密码的重置操作
                email = Code.CryptoJS.encrypt(email);
                email = Code.Base64.encode(email);
                password = Code.MD5.encrypt(password);
                password = Code.CryptoJS.encrypt(password);
                password = Code.Base64.encode(password);
                console.log(email);
                Connector.send(
                    [email, "2", password],
                    "forgetPassword",
                    this.forgetPasswordCallback,
                    this.forgetPasswordWaiting,
                    this.forgetPasswordTimeout
                );
            }
        },
        forgetPasswordCallback(msg){
            if(msg.success){
                // 发送成功
                this.disabled = "disabled";
                this.$refs.forget_passwords_input.setWaiting(
                    true,
                    "点击邮箱链接完成重置"
                );
            }else{
                if(msg.log === "mailbox_not_exist"){
                    this.$refs.forget_passwords_input.setError("邮箱不存在");
                }else{
                    this.$refs.forget_passwords_input.setError("无法完成验证");
                }
            }
        },
        forgetPasswordWaiting(is_waiting){
            if(is_waiting){
                store.state.can_click_button = false;
                this.$refs.forget_passwords_input.setWaiting(
                    is_waiting,
                    "验证中"
                );
            }else{
                store.state.can_click_button = true;
                this.$refs.forget_passwords_input.setWaiting(is_waiting);
            }
        },
        forgetPasswordTimeout(){
            // 超时
            this.$refs.forget_passwords_input.setError("访问服务器超时");
        }
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
    /* border: 1px solid red; */
}
.bottom{
    width: 100%;
    height: 20%;
    position: relative;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
