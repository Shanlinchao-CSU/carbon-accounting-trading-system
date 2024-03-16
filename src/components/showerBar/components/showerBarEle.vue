<template>
    <div class="shower_bar_ele">
        <div
            class="container no_back"
            :data-text="title"
            :class="{ selected: selected }"
            v-if="type !== 'back'"
        >
            {{ title }}
        </div>
        <div
            class="container back"
            :class="{ selected: selected }"
            v-if="type === 'back'"
        >
            {{ title }}
            <div class="login_msg_return_logo"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: false,
        };
    },
    props: ["title", "type"],
    mounted() {},
    methods: {
        setSelected(selected) {
            this.selected = selected;
        },
    },
};
</script>

<style scoped>
.shower_bar_ele {
    cursor: pointer;
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    color: var(--shower-bar-color);
    /* border: 1px solid red; */
}
.container {
    position: relative;
    width: 100%;
    height: 100%;
}
.back:hover {
    color: #00000000;
}
.back:hover > .login_msg_return_logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--shower-bar-color);
    -webkit-mask-image: url("./img/back.png");
    -webkit-mask-size: 45px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}

.no_back{
    z-index: 0;
}
.no_back:hover::after {
    content: attr(data-text);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-text-stroke: 4px #8222968F;
    z-index: -1;
}
.selected {
    color: rgba(0, 0, 0, 0) !important;
}
.selected::after{
    -webkit-text-stroke: 2px #82229600 !important;
}
</style>
