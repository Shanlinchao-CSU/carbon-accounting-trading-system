<template>
    <div class="home">
        <!-- <div class="background_img"></div> -->
        <img alt="" class="background_img">
    </div>
</template>

<script>
export default {
    // name: "bg",
};
</script>

<style scoped>
.home {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* home组件的样式 */
}

.background_img {
    /* position: absolute; */
    width: 100%;
    content: var(--bg-img-src, "");
    /* height: 100%; */
    /* background-image: url("./img/white.png"); */
    /* background-size: cover; */
    /* 背景样式 */
    animation: rotateBackground 900s infinite linear;
}
@keyframes rotateBackground {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
