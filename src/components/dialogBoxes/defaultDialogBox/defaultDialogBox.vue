<template>
    <div
        class="dialog_container"
        :class="{
            dialog_left: is_left,
            dialog_right: is_right,
        }"
    >
        <div class="dialog_text">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        };
    },
    mounted() {
    },
    setup() {},
    props:["is_right", "is_left"]
};
</script>
<style scoped>
.dialog_container {
    /* display: flex; */
    display: block;
    margin: 10px 30px 10px 30px;
    padding: 10px 10px 10px 15px;
    font-size: 25px;
    line-height: 25px;
    font-family: ZKKLT;
    position: relative;
    border: 3px solid var(--dialog-container-border-color);
    color: var(--dialog-container-font-color);
    z-index: 1;
    min-width: 100px;
    max-width: 330px;
    min-height: 33px;
    /* height: auto; */
    word-wrap:break-word
}
.dialog_text{
    width: auto;
    height: auto;
}
.dialog_right{
    border-radius: 20px 0px 20px 20px;
}
.dialog_left{
    border-radius: 0px 20px 20px 20px;
}
.dialog_right::after,
.dialog_left::after {
    position: absolute;
    top: 0px;
    content: " ";
    background-color: var(--dialog-container-border-color);
    mask-image: url("./img/arrow.png");
    -webkit-mask-image: url("./img/arrow.png");
    -webkit-mask-size: 40px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    z-index: -1;
}
.dialog_left::after{
    rotate: -90deg;
    right: 100.5%;
    width: 40px;
    height: 40px;
    -webkit-mask-position: bottom;
}
.dialog_right::after{
    rotate: 90deg;
    left: 100.5%;
    width: 40px;
    height: 40px;
    -webkit-mask-position: bottom;
}
</style>
