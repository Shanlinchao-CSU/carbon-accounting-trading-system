<template>
    <div
        v-opacity="opacity"
        class="line_prompts"
        :class="{
            has_left: data_left,
            has_right: data_right,
            default_theme: theme.default,
            error: theme.error,
            warning: theme.warning,
            success: theme.success,
            waiting: theme.waiting,
        }"
        :data-left="data_left"
        :data-right="data_right"
    ></div>
</template>

<script>
const opacity = {
    created: (el, binding) => {
        if(binding.value){
            el.style.opacity = "1";
        }else{
            el.style.opacity = "0";
        }
    },
    updated:(el, binding) => {
        if(binding.value===binding.oldValue){
            return;
        }else if(binding.value){
            el.style.animationName = "opacity01400";
        }else{
            el.style.animationName = "opacity10400";
        }
    },
};
export default {
    directives:{
        opacity
    },
    data() {
        return {
            test:"333",
            theme: {
                default: true,
                error: false,
                warning: false,
                success: false,
                waiting: false,
            },
        };
    },
    watch: {
        type() {
            this.themeInit();
        },
    },
    mounted() {
        this.themeInit();
    },
    methods: {
        themeInit() {
            if (this.type === "default") {
                this.theme.default = true;
                this.theme.error = false;
                this.theme.warning = false;
                this.theme.success = false;
                this.theme.waiting = false;
            } else if (this.type === "error") {
                this.theme.default = false;
                this.theme.error = true;
                this.theme.warning = false;
                this.theme.success = false;
                this.theme.waiting = false;
            } else if (this.type === "warning") {
                this.theme.default = false;
                this.theme.error = false;
                this.theme.warning = true;
                this.theme.success = false;
                this.theme.waiting = false;
            } else if (this.type === "success") {
                this.theme.default = false;
                this.theme.error = false;
                this.theme.warning = false;
                this.theme.success = true;
                this.theme.waiting = false;
            } else if (this.type === "waiting") {
                this.theme.default = false;
                this.theme.error = false;
                this.theme.warning = false;
                this.theme.success = false;
                this.theme.waiting = true;
            }
        },
    },
    props: ["data_left", "data_right", "type", "opacity"],
};
</script>

<style scoped>
.line_prompts {
    pointer-events: all;
    position: relative;
    /* position: absolute;
    top: 39%; */
    /* color: rgb(144, 119, 149); */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
    height: 0px;
    margin-top: 20px;
    margin-bottom: 10px;
    /* border: 1px solid rgb(255, 61, 61); */
    background-color: white;
    font-size: 17px;
    z-index: 10;

    animation: none;
    animation-duration: 400ms;
    animation-fill-mode: forwards;
}
.default_theme,
.waiting {
    border: 1px solid rgb(144, 119, 149);
}
.default_theme::after,
.waiting::after,
.default_theme::before{
    color: rgb(144, 119, 149);
}
.error {
    border: 1px solid var(--error-color)
}
.error::after,
.error::before {
    color: var(--error-color);
}
.warning {
    border: 1px solid rgb(248, 208, 9);
}
.warning::after,
.warning::before {
    color: rgb(248, 208, 9);
}
.success {
    border: 1px solid rgb(4, 255, 0);
}
.success::after,
.success::before {
    color: rgb(4, 255, 0);
}
.has_left::after,
.has_right::before {
    font-weight: 600;
    position: absolute;
    left: 5%;
    top: -15px;
    content: attr(data-left);
    background-color: var(--login-background-color);
    width: auto;
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
}
.has_right::before {
    content: attr(data-right);
    left: auto;
    right: 5%;
}
.waiting::before {
    visibility: visible;
    content: " ";
    width: 6px;
    height: 6px;
    position: absolute;
    left: 0%;
    top: -3px;
    border-radius: 6px;
    background-color: rgb(144, 119, 149);

    animation: waiting_moving;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
</style>
<style>
@keyframes waiting_moving {
    0% {
        left: 0%;
        width: 6px;
    }
    50% {
        width: 36px;
    }
    100% {
        left: 99%;
        width: 6px;
    }
}
@keyframes opacity01400 {
    from{
        opacity: 0;
    }to{
        opacity: 1;
    }
}
@keyframes opacity10400 {
    from{
        opacity: 1;
    }to{
        opacity: 0;
    }
}
</style>
