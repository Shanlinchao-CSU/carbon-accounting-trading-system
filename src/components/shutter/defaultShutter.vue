<template>
    <div
        class="shutter"
        :class="{ black_bg: black_bg, transparent_bg: transparent_bg }"
        @resize="pageResize"
        @click="clickBg"
    >
        <img alt="" class="shutter_top" ref="shutter_top" />
        <div
            key="con"
            class="shutter_top_container"
            ref="shutter_top_container"
        >
            <div style="position: relative;">
                <harvestProbe></harvestProbe>
            </div>
            <div></div>
            <div
                :class="[
                    has_right_girl
                        ? 'shutter_top_container_4block_leftbot'
                        : 'shutter_top_container_3block_leftbot',
                ]"
            >
                <!-- <p>{{ t("message.save") }}</p>
                <button @click="change">change</button> -->
                <slot name="show_child_page" style="position: relative"
                    >用户</slot
                >
            </div>
            <div v-if="has_right_girl" style="position: relative;">
                <snowProbe></snowProbe>
            </div>
        </div>
        <img alt="" class="shutter_bottom" ref="shutter_bottom" />
    </div>
</template>
<script>
import harvestProbe from "../mascots/harvest/probe/defaultProbe.vue";
import snowProbe from "../mascots/snow/probe/defaultProbe.vue";
export default {
    components:{
        harvestProbe,
        snowProbe
    },
    props: ["has_right_girl", "black_bg", "transparent_bg", "bg_click_func"],
    mounted() {
        window.addEventListener("resize", this.pageResize);
        this.pageResize();
        this.eventInit();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.pageResize);
    },
    methods: {
        eventInit(){
            if(this.black_bg || this.transparent_bg){
                const eventStop = (e) => {
                    e = e || window.Event;
                    try{
                        e.stopPropagation();
                    }catch{
                        e.cancelBubble = true;
                    }
                };
                this.$refs.shutter_top.addEventListener("click", eventStop);
                this.$refs.shutter_top_container.addEventListener("click", eventStop);
                this.$refs.shutter_bottom.addEventListener("click", eventStop);
            }
        },
        clickBg() {
            try {
                this.bg_click_func();
            } catch {
                // no func
            }
        },
        pageResize() {
            // h=714 t_w=812 b_w=288 r=550 550
            // h=442 t_w=502 b_w=178 r=330
            // h=600 r=430 min
            // h_=272 r_=220 h_/r_=1.24
            // 929 1057 375 700
            // h_=215 150 1.43
            let ratio = {
                h: 714,
                r: 550,
                ra: 0.8,
                ra_: 0.8,
            };
            let top_r = 1.14;
            let bot_r = 0.4;
            let shutter_height = this.$refs.shutter_top.clientHeight;
            let shutter_top_w = this.$refs.shutter_top.clientWidth;
            let shutter_bottom_w = this.$refs.shutter_bottom.clientWidth;
            shutter_top_w =
                shutter_top_w === 0 ? shutter_height * top_r : shutter_top_w;
            shutter_bottom_w =
                shutter_bottom_w === 0
                    ? shutter_height * bot_r
                    : shutter_bottom_w;

            this.$refs.shutter_bottom.style.right =
                ((shutter_height - ratio.h) * ratio.ra + ratio.r).toString() +
                "px";
            if (shutter_top_w * 0.85 > shutter_height * 0.95) {
                this.$refs.shutter_top_container.style.width =
                    (shutter_height * 0.95).toString() + "px";
                this.$refs.shutter_top_container.style.height =
                    (shutter_height * 0.95).toString() + "px";
            } else {
                this.$refs.shutter_top_container.style.width =
                    (shutter_top_w * 0.85).toString() + "px";
                this.$refs.shutter_top_container.style.height =
                    (shutter_top_w * 0.85).toString() + "px";
            }
            // this.$refs.shutter_top_container.style.height = "400px";
            let num =
                ((shutter_height - ratio.h) * ratio.ra_ + ratio.r).toString() +
                "px";
            let str_0 = num.toString() + " auto";
            let str_1 = "auto " + num.toString();

            this.$refs.shutter_top_container.style.gridTemplateColumns = str_0;
            this.$refs.shutter_top_container.style.gridTemplateRows = str_1;
        },
    },
};
</script>
<!-- <script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
let change = () => {
    if (locale.value === "en") {
        locale.value = "ch";
    } else {
        locale.value = "en";
    }
};
</script> -->
<style scoped>
.shutter {
    filter: none;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 0px;
    /* width: 1000px; */
    /* height: 879px; */
    width: 100%;
    height: 100%;
    z-index: 9999;
    /* border: 1px solid red; */
    /* min-height: 600px; */
}
.black_bg {
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.3);
}
.transparent_bg {
    pointer-events: all;
}
.pointer {
    pointer-events: all;
    transform: translateX(0px);
}
.shutter_top {
    position: absolute;
    top: 0%;
    right: 0%;
    pointer-events: all;
    height: 100%;
    content: var(--shutter-top-img-src);
}
.shutter_bottom {
    z-index: -1;
    height: 100%;
    position: absolute;
    right: 550px;
    content: var(--shutter-bottom-img-src);
}
.shutter_top_container {
    pointer-events: all;
    position: absolute;
    right: 0%;
    /* border: 1px solid green; */
    width: 80%;
    height: 100%;

    display: grid;
    grid:
        ". ."
        ". .";
    grid-template-columns: 550px auto;
    grid-template-rows: auto 550px;
}
.shutter_top_container_4block_right {
    display: block;
}
.shutter_top_container_3block_right {
    display: none;
}
.shutter_top_container_3block_leftbot {
    position: relative;
    grid-column-start: 1;
    grid-column-end: 3;
    display: flex;
    justify-content: center;
    align-items: center;
}

.shutter_top_container_4block_leftbot {
    position: relative;
    grid-column-start: 1;
    grid-column-end: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
