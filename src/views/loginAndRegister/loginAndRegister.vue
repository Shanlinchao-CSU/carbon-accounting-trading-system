<template>
    <div class="login">
        <div class="login_container">
            <!-- <img id="login_container_girl_1" src="" alt="" class="login_container_girl_1" draggable="false"> -->
            <transition name="login_register">
                <div class="login_area">
                    <div
                        class="login_msg"
                        id="login_msg"
                        onselectstart="return false"
                    >
                        <!-- <div class="login_msg_girl">
                            <img v-show="!is_password" src="" alt="" class="login_msg_girl_0_0" draggable="false">
                            <img v-show="is_password" src="" alt="" class="login_msg_girl_0_1" draggable="false">
                            <img v-show="!is_password" src="" alt="" class="login_msg_girl_0_l_h" draggable="false">
                            <img v-show="!is_password" src="" alt="" class="login_msg_girl_0_r_h" draggable="false">
                            <img v-show="is_password" src="" alt="" class="login_msg_girl_0_l_h login_msg_girl_0_l_h_p" draggable="false">
                            <img v-show="is_password" src="" alt="" class="login_msg_girl_0_r_h login_msg_girl_0_r_h_p" draggable="false">
                        </div> -->
                        <div class="login_msg_title" data-text="农业知识图谱">
                            农业知识图谱
                        </div>
                        <!-- <transition name="login_register" mode="out-in">
                            
                        </transition> -->
                        <transition name="login_register">
                            <loginMsg
                                class="login_msg_register"
                                v-if="is_login"
                                @buttonClick="toRegisterArea"
                            ></loginMsg>
                            <registerMsg
                                class="login_msg_register"
                                v-else-if="!is_login"
                                @buttonClick="toLoginArea"
                            ></registerMsg>
                        </transition>
                        <backButton
                            class="return_to_main"
                            @buttonClick="leaveLogin"
                            content="返回"
                        />
                        <probeForLARHarvest class="probe_for_LAR_harvest" :type="mascots_type"></probeForLARHarvest>
                    </div>
                    <probeForLARSnow class="probe_for_LAR_snow" :type="mascots_type"></probeForLARSnow>
                </div>
            </transition>
            <transition name="login_register" mode="out-in">
                <loginSubpage
                    v-show="is_login && no_setting"
                    class="login_area_container"
                    @passwordOnFocus="passwordOnFocus"
                    @passwordOnBlur="passwordOnBlur"
                    @exitPage = "leaveLogin"
                    @goToForgetPassword="goToForgetPassword"
                ></loginSubpage>
            </transition>
            <transition name="login_register" mode="out-in">
                <registerSubpage
                    v-show="is_register && no_setting"
                    class="register_area_container"
                    @passwordOnFocus="passwordOnFocus"
                    @passwordOnBlur="passwordOnBlur"
                    @exitPage = "leaveLogin"
                ></registerSubpage>
            </transition>
            <transition name="login_register">
                <personal v-if="!no_setting"></personal>
            </transition>
        </div>
    </div>
</template>
<script>
import probeForLARHarvest from "@/components/mascots/harvest/probe/probeForLAR.vue";
import probeForLARSnow from "@/components/mascots/snow/probe/probeForLAR.vue";
import backButton from "@/components/buttons/loginAndRegisterButton/backButton/backButton.vue";
import loginSubpage from "./components/loginSubpage.vue";
import registerSubpage from "./components/registerSubpage.vue";
import loginMsg from "./components/loginMsg.vue";
import registerMsg from "./components/registerMsg.vue";
import store from "@/store/index.js";

export default {
    data() {
        return {
            no_setting: true,
            is_password: false,
            is_login: true,
            is_register: false,
            mascots_type:""
        };
    },
    components: {
        loginSubpage,
        registerSubpage,
        backButton,
        loginMsg,
        registerMsg,
        probeForLARHarvest,
        probeForLARSnow
    },
    methods: {
        goToForgetPassword(){
            this.$emit("goToForgetPassword");
        },
        leaveLogin() {
            if (!store.state.can_click_button) return;
            this.$emit("leaveLogin");
        },
        toRegisterArea() {
            if (!store.state.can_click_button) return;
            document.getElementById("login_msg").style.animationName =
                "login-goto-register";
            this.is_login = false;
            this.is_register = true;
        },
        toLoginArea() {
            if (!store.state.can_click_button) return;
            document.getElementById("login_msg").style.animationName =
                "register-goto-login";
            this.is_login = true;
            this.is_register = false;
        },
        passwordOnFocus() {
            this.mascots_type = "password";
        },
        passwordOnBlur() {
            this.mascots_type = "";
        },
    },
};
</script>
<style scoped>
.login_msg_register {
    position: absolute;
    top: 14%;
    margin-top: 20px;
    /* border: 1px solid blue; */
    width: 75%;
    height: 60%;
}
.login_msg_register_register {
    position: absolute;
    top: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
}
.login_msg_register_register_text {
    cursor: pointer;
    position: relative;
    font-size: 25px;
    font-family: Heiti;
    z-index: 1;
    color: rgb(217, 149, 230);
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    box-shadow: 1px 1px 5px rgba(199, 14, 250, 0.5);
    border: 2px solid rgba(199, 14, 250, 0.5);
}
.login_msg_register_register_text::after {
    content: attr(data-text);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    /* color: aqua; */
    -webkit-text-stroke: 3px rgba(199, 14, 250, 0.5);
}
.login_msg_register_register_text:hover {
    background-color: rgba(199, 14, 250, 0.3);
    color: rgba(199, 14, 250, 0.5);
}
.login_msg_register_register_text:hover::after {
    -webkit-text-stroke: 3px rgba(255, 255, 255, 0.7);
}
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
}
.login_area_container,
.register_area_container {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 5%;
    /* border: 1px solid red; */
}
.register_area_container {
    left: 5%;
    height: 90%;
    bottom: 0%;
}
.login_container {
    position: relative;
    width: var(--login-width);
    height: var(--login-height);
    background-color: var(--login-background-color);
    /* border-radius: 30px; */
    box-shadow: 0px 0px 20px var(--login_container-box-shadow);
    /* background-color: rgb(187, 86, 207); */
    /* border: 1px solid red; */
}
.login_area {
    position: absolute;
    width: var(--login-width);
    height: var(--login-height);
    background-color: var(--login-background-color);
}
.login_msg {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0.8%;
    top: -2%;
    width: 39.2%;
    height: 104%;
    background-color:var(--login-msg-background-color);
    border-radius: 2%;
    animation-duration: 0.8s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    z-index: 99;
}
.login_msg_title {
    position: relative;
    margin-top: 40px;
    font-family: FZZJ-WHJZTJW;
    font-size: 30px;
    z-index: 1;
}
.return_to_main {
    position: absolute !important;
    bottom: 10%;
}
.login_msg_title::after,
.login_msg_return::after {
    position: absolute;
    left: 0%;
    top: 0%;
    z-index: -1;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 2px white;
    content: attr(data-text);
}
.probe_for_LAR_harvest{
    position: absolute !important;
    z-index: 100;
    bottom: 100%;
}
.probe_for_LAR_snow{
    position: absolute !important;
    z-index: -1;
    left: 100%;
}
</style>
<style>
.login_label {
    font-family: Heiti;
    position: relative;
    width: 260px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(144, 119, 149);
    margin-top: 10px;
    margin-bottom: 10px;
}
.login_label::after {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 17px;
    display: flex;
    align-items: center;
    width: auto;
    height: 20px;
    position: absolute;
    left: 5%;
    top: -12px;
    background-color: white;
    content: attr(data-text);
    z-index: 1;
    color: rgb(144, 119, 149);
}
.login_label:has(.login_input:focus)::after {
    color: #e77ffb;
}
.login_label:has(.login_input:focus) {
    border: 2px solid #e77ffb;
}
.login_label:has(.login_input:hover) {
    box-shadow: 0px 0px 2px #e77ffb;
}
.login_input {
    position: relative;
    width: 240px;
    height: 40px;
    border: 0; /*清除自带的2px的边框*/
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    /* border: 1px solid red; */
    z-index: 0;
    font-size: 24px;
}
.login_input:focus {
    caret-color: #e77ffb;
}
@keyframes login-msg-login-goto-register {
    from {
        rotate: 0deg;
    }
    to {
        rotate: 360deg;
    }
}
@keyframes login-goto-register {
    from {
        left: 0.8%;
    }
    to {
        left: 59.2%;
    }
}
@keyframes register-goto-login {
    from {
        left: 59.2%;
    }
    to {
        left: 0.8%;
    }
}
@keyframes login_container_girl_hide {
    from {
        left: 93%;
    }
    to {
        left: 73%;
    }
}
@keyframes login_container_girl_show {
    from {
        left: 73%;
    }
    to {
        left: 93%;
    }
}
.login_register-enter-active,
.login_register-leave-active {
    transition: opacity 0.8s ease;
}
.login_register-enter-from,
.login_register-leave-to {
    opacity: 0;
}
</style>
