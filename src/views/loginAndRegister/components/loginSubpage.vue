<template>
    <div class="login_comp" onselectstart="return false">
        <div class="login_text">L O G I N</div>
        <div class="input_container">
            <loginEmailInput ref="loginEmailInput"></loginEmailInput>
            <loginPasswordInput
                ref="loginPasswordInput"
                @passwordOnFocus="passwordOnFocus"
                @passwordOnBlur="passwordOnBlur"
            ></loginPasswordInput>
        </div>
        <confirmButton
            @confirmClick="loginClick"
            content="登录"
        ></confirmButton>
        <div class="login_forget_password" @click="forgetPassword">
            忘记密码?
        </div>
    </div>
</template>
<script>
import ref from "vue";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
import store from "@/store/index.js";

import loginEmailInput from "./inputs/loginEmailInput.vue";
import loginPasswordInput from "./inputs/loginPasswordInput.vue";
import confirmButton from "@/components/buttons/loginAndRegisterButton/confirmButton/confirmButton.vue";
import Code from "@/assets/js/code/code.js";
import Storage from "@/assets/js/storage/storage.js";
import utils from "@/assets/js/utils.js";
export default {
    data() {
        return {
            login_msg: "",
            password_msg: "",
            login_id_or_email: "",
            password: "",
            check: {
                id_or_email: false,
                password: false,
            },
            back_error: {
                has_error: false,
                content: "",
            },
            waiting: {
                content: "登录中",
                is_waiting: false,
            },
        };
    },
    components: {
        loginEmailInput,
        loginPasswordInput,
        confirmButton,
    },
    mounted() {
        // store.state.is_login = !store.state.is_login;
    },
    methods: {
        forgetPassword() {
            console.log("点击忘记密码");
            this.$emit("goToForgetPassword");
        },
        passwordOnFocus(){
            this.$emit("passwordOnFocus");
        },
        passwordOnBlur(){
            this.$emit("passwordOnBlur");
        },
        /**
         * 点击登录按钮
         */
        loginClick() {
            /* 检查字符串 */
            if (!store.state.can_click_button) return;
            let id_email = this.$refs.loginEmailInput.get();
            let password = this.$refs.loginPasswordInput.get();
            if (!id_email) return;
            if (!password) return;

            this.login(id_email, password);
        },
        login(id_email, password) {
            console.log(id_email);
            console.log(password);
            console.log("pass: ", Code.MD5.encrypt(password));
            let is_id = id_email.type === "id";
            let send_id_email = id_email.msg;
            let send_password = Code.MD5.encrypt(password);
            let user_msg = utils.getUserMsg();
            // 此时会把密码存入本地数据库
            user_msg.password = send_password;
            utils.saveUserMsg(user_msg);
            send_password = Code.CryptoJS.encrypt(send_password);
            send_password = Code.Base64.encode(send_password);
            console.log("发送之前密码保存", utils.getUserMsg());
            Connector.send(
                [send_id_email, is_id, send_password],
                "login",
                this.loginCallback,
                this.loginWaiting,
                this.loginTimeout
            );
            // Connector.test(
            //     this.loginCallback,
            //     this.loginWaiting,
            //     this.loginTimeout,
            //     200,
            //     true,
            //     1000,
            //     {
            //         "success":true
            //     }
            // );
        },
        loginCallback(msg) {
            if (msg.success) {
                // 用户登录成功 数据存入本地数据库
                let user_msg = utils.getUserMsg();
                // 存入token
                utils.saveToken(msg.token);
                user_msg.name = msg.content.login_name;
                user_msg.avatar = Code.Base64.decode(msg.content.avatar);
                user_msg.sex = msg.content.sex;
                user_msg.born = msg.content.born_time;
                user_msg.occu = msg.content.occupation;
                user_msg.id = msg.content.id;
                user_msg.email = msg.content.email;
                user_msg.avatar = msg.content.avatar;
                console.log(msg.content.avatar);
                if (
                    msg.content.name !== undefined ||
                    msg.content.name != null
                ) {
                    user_msg.real = true;
                    user_msg.real_name = Code.CryptoJS.decrypt(
                        Code.Base64.decode(msg.content.name)
                    );
                    user_msg.tel = Code.CryptoJS.decrypt(
                        Code.Base64.decode(msg.content.tel)
                    );
                    user_msg.card_type = Code.CryptoJS.decrypt(
                        Code.Base64.decode(msg.content.card_type)
                    );
                    user_msg.id_card = Code.CryptoJS.decrypt(
                        Code.Base64.decode(msg.content.idCard)
                    );
                } else {
                    user_msg.real = false;
                    user_msg.real_name = "";
                    user_msg.tel = "";
                    user_msg.card_type = "";
                    user_msg.id_card = "";
                }
                utils.saveUserMsg(user_msg);
                // 更改登录状态
                Storage.set(0, "IS_LOGIN", Code.CryptoJS.encrypt("true"));
                store.state.is_login = true;
                // 退出此页面
                this.$emit("exitPage");
            } else {
                if (msg.log === "fail_to_connect_server") {
                    this.$refs.loginPasswordInput.setError("服务器拒绝");
                } else {
                    this.$refs.loginPasswordInput.setError(
                        "用户不存在或密码错误"
                    );
                }
            }
            // console.log("aaaaaaa");
        },
        loginWaiting(is_waiting) {
            this.$refs.loginPasswordInput.setWaiting(is_waiting);
            if (is_waiting) {
                store.state.can_click_button = false;
            } else {
                store.state.can_click_button = true;
            }
        },
        loginTimeout() {
            console.log("超时");
            this.$refs.loginPasswordInput.setError("服务器连接异常");
        },
    },
};
</script>
<style scoped>
.input_container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% - 20px);
    height: 50%;
    padding-top: 20px;
}
.login_comp {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    font-family: FZZJ-WHJZTJW;
    /* background-color: red; */
}
.login_text {
    font-size: 40px;
    position: relative;
    margin-top: 50px;
    width: 100%;
    height: 10%;
}
.login_forget_password {
    position: relative;
    cursor: pointer;
    margin-top: 20px;
    font-size: 18px;
}
.login_forget_password:hover {
    color: rgb(175, 123, 186);
}
</style>
<style></style>
