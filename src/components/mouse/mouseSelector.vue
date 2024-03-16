<template>
    <div class="mouse_selector">
        <div class="mouse_selector_body">
            <div class="mouse_prompt">
                <div class="mouse_img"></div>
                <div class="arrows">
                    <ArrowLeft color="#FFF" style="width: 30px;height: 30px;position: absolute;left: 0px;top: 35px;" />
                    <ArrowRight color="#FFF" style="width: 30px;height: 30px;position: absolute;right: 0px;top: 35px;" />
                    <ArrowUp color="#FFF" style="width: 30px;height: 30px;position: absolute;left: 35px;top: 0px;" />
                    <ArrowDown color="#FFF" style="width: 30px;height: 30px;position: absolute;left: 35px;bottom: 0px;" />
                </div>
            </div>
            <div class="has_mask">
                <div class="selected_container" ref="selected_container">
                    <div class="circle" v-if="!selected"></div>
                    <div class="semicircle sc1" v-if="selected"></div>
                    <div class="semicircle sc2" v-if="selected"></div>
                </div>
                <div class="selector_line">
                    <div
                        v-for="(item, index) in lines"
                        :key="index"
                        :style="{ rotate: item.deg }"
                    ></div>
                </div>
                <div class="select_ele_icons">
                    <HomeFilled style="width: 50px;height: 50px;position: absolute;left: 185px;top: 15px;"/>
                    <Setting style="width: 50px;height: 50px;position: absolute;left: 65px;top: 65px;"/>
                    <DataAnalysis style="width: 50px;height: 50px;position: absolute;left: 15px;top: 185px;"/>
                    <List style="width: 50px;height: 50px;position: absolute;left: 65px;bottom: 65px;"/>
                    <Search style="width: 50px;height: 50px;position: absolute;left: 185px;bottom: 15px;"/>
                    <Collection style="width: 50px;height: 50px;position: absolute;right: 65px;bottom: 65px;"/>
                    <ChatDotRound style="width: 50px;height: 50px;position: absolute;right: 15px;top: 185px;"/>
                    <User style="width: 50px;height: 50px;position: absolute;right: 65px;top: 65px;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: false,
            selected_ele: 0,
            lines: [
                {
                    deg: "22.5deg",
                },
                {
                    deg: "67.5deg",
                },
                {
                    deg: "112.5deg",
                },
                {
                    deg: "157.5deg",
                },
            ],
        };
    },
    props: ["mouse_down", "mouse_now"],
    methods: {
        /**
         * 根据传入的鼠标坐标判断显示情况
         * @param {int} x 鼠标x
         * @param {int} y 鼠标y
         */
        mouseNowPos(x, y) {
            let c_r = 200;
            let w = window.innerWidth;
            let h = window.innerHeight;
            let cen_x = w / 2;
            let cen_y = h / 2;
            if (x < 0 || y < 0 || x > w || y > h) {
                this.selected = false;
                return;
            }
            // console.log(x, y);
            if (
                x > cen_x - c_r / 2 &&
                x < cen_x + c_r / 2 &&
                y > cen_y - c_r / 2 &&
                y < cen_y + c_r / 2
            ) {
                this.selected_ele = 0;
                this.selected = false;
            } else {
                this.selected = true;
                // 计算角度
                let l = Math.sqrt(
                    (x - cen_x) * (x - cen_x) + (y - cen_y) * (y - cen_y)
                );
                let s = cen_y - y;
                let sin = s / l;
                let angle = (Math.asin(sin) / Math.PI) * 180;
                if (angle <= 22.5 && angle > -22.5 && x < cen_x) {
                    // 西
                    this.selected_ele = 1;
                    this.$refs.selected_container.style.rotate = "22.5deg";
                } else if (angle <= 67.5 && angle >= 22.5 && x < cen_x) {
                    // 西北
                    this.selected_ele = 2;
                    this.$refs.selected_container.style.rotate = "67.5deg";
                } else if (angle > 67.5) {
                    // 北
                    this.selected_ele = 3;
                    this.$refs.selected_container.style.rotate = "112.5deg";
                } else if (angle <= 67.5 && angle >= 22.5 && x > cen_x) {
                    // 东北
                    this.selected_ele = 4;
                    this.$refs.selected_container.style.rotate = "157.5deg";
                } else if (angle <= 22.5 && angle > -22.5 && x > cen_x) {
                    // 东
                    this.selected_ele = 5;
                    this.$refs.selected_container.style.rotate = "202.5deg";
                } else if (angle > -67.5 && angle <= -22.5 && x > cen_x) {
                    // 东南
                    this.selected_ele = 6;
                    this.$refs.selected_container.style.rotate = "247.5deg";
                } else if (angle <= -67.5) {
                    // 南
                    this.selected_ele = 7;
                    this.$refs.selected_container.style.rotate = "292.5deg";
                } else {
                    // 西南
                    this.selected_ele = 8;
                    this.$refs.selected_container.style.rotate = "337.5deg";
                }
            }
        },
        /**
         * 鼠标滚轮抬起，判断选中情况
         * @returns 返回选中情况
         */
        mouseCenterUp() {
            return this.selected_ele;
        },
    },
    mounted() {
        // console.log("打开控制界面");
    },
};
</script>

<style>
.mouse_selector {
    cursor: default !important;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: all;
    z-index: 20000;

    display: flex;
    justify-content: center;
    align-items: center;
}
.mouse_selector_body {
    position: relative;
    width: 420px;
    height: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mouse_prompt{
    position: relative;
    width: 120px;
    height: 120px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #8222965F;
    box-shadow: 0px 0px 100px #822296;
}
.mouse_img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    -webkit-mask-image: url("./img/mouse.png");
    -webkit-mask-size: 50px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
.arrows{
    position: relative;
    width: 100px;
    height: 100px;
}
.has_mask{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* background-color: rgb(255, 255, 255); */
    background-color: #e594f5;
    box-shadow: inset 0px 0px 20px #822296, 0px 0px 10px #822296;
    mask: radial-gradient(transparent 125px, #000 130px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.selected_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
}
.semicircle {
    position: relative;
    width: 100%;
    height: 50%;
    /* border: 1px solid red; */
    border-radius: 220px 220px 0 0;
    transform-origin: 50% 100%;
    background-color: white;
}
.sc1 {
}
.sc2 {
    border-radius: 0 0 220px 220px;
    transform-origin: 50% 0%;
    rotate: -45deg;
}
.select_ele_icons{
    position: relative;
    width: 420px;
    height: 420px;
    left: 0;
    top: 0;
    z-index: 10;
}
.selector_line {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.selector_line > div {
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(
        to right,
        #822296 0%,
        #822296 20%,
        #00000000 20%,
        #00000000 80%,
        #822296 80%,
        #822296 100%
    );
    left: 0;
}
</style>
