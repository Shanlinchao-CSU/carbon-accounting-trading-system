<template>
    <div class="base_box">
        <div class="container">
            <div class="title">{{ title }}</div>
            <div class="body">
                <slot name="body_container"></slot>
            </div>
            <div class="bottom">
                <backButton content="退出" @buttonClick="leaveBox"></backButton>
            </div>
        </div>
    </div>
</template>

<script>
import backButton from "@/components/buttons/loginAndRegisterButton/backButton/backButton.vue";
export default {
    props: ["title", "leave_func"],
    components: {
        backButton,
    },
    methods: {
        leaveBox() {
            console.log("点击退出");
            this.leave_func();
        },
    },
};
</script>

<style scoped>
.base_box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10050;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
.container {
    position: relative;
    width: 400px;
    height: 647px;
    /* background-color: white; */
    background-color: var(--baseBox-container-background-color);
}
.title,
.bottom {
    position: relative;
    width: 100%;
    height: 10%;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
}
.body {
    position: relative;
    width: 100%;
    height: 80%;
}
.title {
    font-size: 30px;
}
@media screen and (max-height: 700px) {
    .container {
        position: absolute;
        top: 0;
        width: 350px;
        height: 566px;
        background-color: white;
    }
}
</style>
