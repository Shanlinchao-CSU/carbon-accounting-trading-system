<template>
    <div class="verify">
        <transition name="opacity400">
            <div class="container" v-if="show">
                <bg></bg>
                <div
                    :class="{
                        error: error,
                        verify_text: !error,
                        waiting: is_waiting,
                        success: success,
                    }"
                    :data-text="msg"
                    @click="clickVerify"
                >
                    {{ msg }}
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import bg from "@/components/bg/defaultBg.vue";
import Code from "@/assets/js/code/code.js";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
import Storage from "@/assets/js/storage/storage.js";
import store from "@/store/index.js";
export default {
    data() {
        return {
            show: false,
            code: "",
            msg: "验证",
            error: false,
            is_waiting: false,
            success: false,
        };
    },
    components: {
        bg,
    },
    methods: {
        clickVerify() {
            if (!store.state.can_click_button) return;
            if (
                this.code.email === undefined ||
                this.code.email === null ||
                this.code.vcode === undefined ||
                this.code.vcode === null ||
                this.code.timestamp === undefined ||
                this.code.timestamp === null
            ) {
                this.error = true;
                this.msg = "验证信息错误";
                return;
            }
            this.code.vcode = parseInt(this.code.vcode);
            this.code.timestamp = parseInt(this.code.timestamp);
            if (
                new Date().getTime() - this.code.timestamp >= 1000 * 60 * 10 ||
                new Date().getTime() - this.code.timestamp <= 0
            ) {
                this.error = true;
                this.msg = "验证信息错误";
                return;
            }
            // Connector.test(
            //     this.verifyCallback,
            //     this.verifyWaiting,
            //     this.verifyTimeout,
            //     2000,
            //     true,
            //     2000,
            //     {
            //         success: false,
            //     }
            // );
            Connector.send(
                [
                    Code.Base64.encode(Code.CryptoJS.encrypt(this.code.email)),
                    Code.Base64.encode(Code.CryptoJS.encrypt(this.code.vcode)),
                ],
                "verify",
                this.verifyCallback,
                this.verifyWaiting,
                this.verifyTimeout
            );
            console.log(this.code.email);
            console.log(this.code.vcode);
            console.log(this.code.timestamp);
        },
        verifyCallback(msg) {
            if (msg.success) {
                this.success = true;
                this.msg = "验证成功";
            } else {
                this.error = true;
                this.msg = "验证失败";
            }
        },
        verifyWaiting(is_waiting) {
            this.msg = "验证中";
            this.is_waiting = is_waiting;
        },
        verifyTimeout() {
            this.error = true;
            this.msg = "验证超时";
        },
    },
    mounted() {
        // const test =
        //     "MnJ2ssPGZZ/d+r3nUg8AGvyHtcwHz095lQ32zpwXVJfYrUS2JDA+2k5hqyn+Dtqrzm8728/TvBlXPbvz67RuTkocYV4LLDaXv5/9UbAoo7ScDW8n18s35C4tkbhfSvdY";
        // let a = {
        //     email: "2112794@mail.nankai.edu.cn",
        //     vcode: "123456",
        //     timestamp: 1689142103710,
        // };
        // console.log(Code.CryptoJS.decrypt(test));
        // console.log(
        //     Code.Base64.encode(
        //         Code.CryptoJS.encrypt(JSON.stringify(a).toString())
        //     )
        // );
        try {
            this.code = Code.CryptoJS.decrypt(
                Code.Base64.decode(this.$route.params.code.toString())
            ).replace("'", "\"");
            this.code = JSON.parse(this.code);
        } catch {
            this.code = "";
            console.log("读取失败");
        }
        setTimeout(() => {
            this.show = true;
        }, 500);
    },
};
</script>
<style scoped>
.verify,
.container {
    width: 100%;
    height: 100%;
    user-select: none;
    /* background-color: rgba(0, 128, 255, 0.5); */
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.verify_text,
.error {
    position: relative;
    width: 250px;
    height: 250px;
    border: 3px solid #8222968f;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    z-index: 1;
    color: #8222968f;
}
.verify_text:hover {
    color: white;
    box-shadow: 0px 0px 250px #8222968f, inset 0px 0px 80px #8222968f;
}
.verify_text:hover::after {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    content: attr(data-text);
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-text-stroke: 4px #8222968f;
}
.error {
    border: 3px solid rgb(255, 65, 65);
    color: rgb(255, 65, 65);
}
.waiting {
    pointer-events: none;
}
.waiting::before {
    content: " ";
    width: 10px;
    height: 10px;
    position: absolute;
    top: -6.5px; /* -1.5 - w / 2 */
    background-color: #8222968f;
    border-radius: 50%;
    animation: waiting_moving;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    transform-origin: 50% 131.5px;
}
@keyframes waiting_moving {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(-360deg);
    }
}
.success {
    pointer-events: none;
    color: rgb(0, 255, 34);
    border: 3px solid rgb(0, 255, 34);
}
</style>
