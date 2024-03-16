<template>
    <div class="theme_container" @click="clickButton">
        <div
            class="sky"
            :style="{
                animationName: to_light ? 'sky-to-light' : 'sky-to-dark',
            }"
        >
            <div
                class="cloud"
                :style="{
                    animationName: to_light
                        ? 'cloud-to-light'
                        : 'cloud-to-dark',
                }"
            ></div>
            <div
                v-if="is_light"
                class="light"
                :style="{ animationName: to_light ? 'ele-in' : 'ele-out' }"
            ></div>
            <div
                v-if="is_dark"
                class="dark"
                :style="{ animationName: to_light ? 'ele-out' : 'ele-in' }"
            ></div>
        </div>
    </div>
</template>

<script>
import Storage from "@/assets/js/storage/storage";
const default_theme = {
    theme: "light",
    color: "",
    font_size: {
        base: "",
        button: "",
    },
};
export default {
    data() {
        return {
            timer: null,
            theme: "light",
            theme_json:{},
            is_light: false,
            is_dark: false,
            to_light: true,
        };
    },
    mounted() {
        // this.clickButton();
        // document.documentElement.style.setProperty("--test-font-color", "blue");    //js更改root
        if (this.isLight()) this.is_light = true;
        else this.is_dark = true;
        this.to_light = this.is_light;
        this.theme = this.is_light ? "light" : "dark";
    },
    methods: {
        /**
         * 确定主题
         */
        isLight() {
            /* 访问数据库 */
            this.theme_json = Storage.get(0, "THEME", default_theme, "JSON");
            if(this.theme_json.theme==="light"){
                return true;
            }else{
                return false;
            }
        },
        clickButton() {
            clearTimeout(this.timer);
            if (this.theme === "light") this.changeTheme("dark");
            else this.changeTheme("light");
            this.theme = this.theme === "light" ? "dark" : "light";
            this.theme_json.theme = this.theme;
            Storage.set(0, "THEME", this.theme_json, "JSON");
            this.is_light = true;
            this.is_dark = true;
            this.to_light = !this.to_light;
            this.timer = setTimeout(() => {
                this.is_light = this.to_light;
                this.is_dark = !this.to_light;
            }, 1200);
        },
    },
    setup() {
        let changeTheme = (theme) => {
            document.getElementById("link_suit").href =
                "./theme/" + theme.toString() + ".css";
            console.log(document.getElementById("link_suit").href);
        };
        return { changeTheme };
    },
};
</script>

<style scoped>
.theme_container {
    position: relative;
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 35px;
    border: 2px solid rgb(174, 174, 174);
}
.sky {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: rgb(95, 196, 255);
    display: flex;
    justify-content: center;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
.cloud {
    width: 90px;
    height: 40px;
    background-image: url("./img/cloud_0.png");
    background-size: cover;
    position: absolute;
    bottom: -15%;
    left: -10%;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
.light,
.dark {
    transform-origin: 50% 80px 0px;
    /* rotate: 40deg; */
    position: absolute;
    top: 5px;
    width: 35px;
    height: 35px;
    -webkit-mask-size: 35px;
    -webkit-mask-repeat: no-repeat;
    /* animation: ele-out; */
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
.light {
    background: linear-gradient(
        rgb(246, 250, 14) 0%,
        hsl(42, 100%, 70%) 45%,
        rgb(205, 163, 96) 80%
    );
    -webkit-mask-image: url("./img/light.png");
}
.dark {
    background: linear-gradient(
        rgb(253, 255, 205) 0%,
        hsl(61, 39%, 79%) 45%,
        rgb(194, 189, 149) 80%
    );
    -webkit-mask-image: url("./img/dark.png");
}
</style>
<style>
@keyframes cloud-to-light {
    from {
        filter: brightness(80%);
    }
    to {
        filter: brightness(100%);
    }
}
@keyframes cloud-to-dark {
    from {
        filter: brightness(100%);
    }
    to {
        filter: brightness(80%);
    }
}
@keyframes sky-to-dark {
    from {
        background-color: rgb(95, 196, 255);
    }
    to {
        background-color: rgb(12, 70, 103);
    }
}
@keyframes sky-to-light {
    from {
        background-color: rgb(12, 70, 103);
    }
    to {
        background-color: rgb(95, 196, 255);
    }
}
@keyframes ele-in {
    from {
        rotate: 90deg;
    }
    to {
        rotate: 0deg;
    }
}
@keyframes ele-out {
    from {
        rotate: 0deg;
    }
    to {
        rotate: -90deg;
    }
}
</style>
