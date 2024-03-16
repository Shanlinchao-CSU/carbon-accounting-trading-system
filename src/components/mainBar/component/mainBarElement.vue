<template>
    <div class="main_bar_element">
        <div class="img_container" :class="{ selected: type }">
            <img
                src="../img/arrow.png"
                alt=""
                draggable="false"
                class="main_bar_element_img"
                :class="{ no_animation: type }"
            />
        </div>
        <div class="main_bar_element_text" :class="{ selected_text: type }">
            {{ content }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["content", "type"],
};
</script>

<style scoped>
.main_bar_element {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 80px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0px 30px 0px;
}
.img_container {
    position: absolute;
    /* border: 1px solid red; */
    height: 50%;
    left: 10%;
    opacity: 0;
    transform: translateX(0px);
    transition: all 0.3s linear;
}
.main_bar_element_img {
    height: 100%;
}
.main_bar_element_text {
    position: absolute;
    left: 30%;
    font-size: 40px;
    color: var(--main-bar-font-color);
    transition: all 0.3s linear;
}
.main_bar_element:hover > .img_container {
    opacity: 1;
    transform: translateX(30px);
    transition: all 0.3s linear;
}
.main_bar_element:hover > .img_container > img {
    animation: moving 0.8s infinite linear 0.3s;
}
.main_bar_element:hover > .main_bar_element_text {
    transition: all 0.3s linear;
    transform: translateX(30px);
}
.selected {
    opacity: 1;
    transition: all 0.3s linear;
    transform: translateX(30px);
    animation: none !important;
}
.no_animation {
    animation: none !important;
}
.selected_text {
    transform: translateX(30px);
    transition: all 0.3s linear;
}
@keyframes moving {
    0% {
        transform: translateX(0px);
    }
    25% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(0px);
    }
    75% {
        transform: translateX(5px);
    }
    100% {
        transform: translateX(0px);
    }
}
</style>
