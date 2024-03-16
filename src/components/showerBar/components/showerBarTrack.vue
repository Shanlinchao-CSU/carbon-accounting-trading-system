<template>
    <div class="shower_bar_track" ref="bar_track">
        <div class="shower_bar_container" ref="shower_bar_container">
            <showerBarEle
                v-for="(item, index) in ele_list"
                :key="index"
                :title="$t(item.title)"
                :type="item.type"
                @click="clickBarEle(index)"
                ref="shower_bar_elements"
            ></showerBarEle>
        </div>
    </div>
</template>

<script>
import showerBarEle from "./showerBarEle.vue";
import store from "@/store/index.js";
import storage from "@/assets/js/storage/storage";
export default {
    data() {
        return {
            ele_list: [
                {
                    title: "views.shower_page.bar.back.title",
                    type: "back",
                    detail: "",
                },
                {
                    title: "views.shower_page.bar.entity_recognition.title",
                    type: "default",
                    detail: "views.shower_page.bar.entity_recognition.detail",
                },
                {
                    title: "views.shower_page.bar.entity_query.title",
                    type: "default",
                    detail: "views.shower_page.bar.entity_query.detail",
                },
                {
                    title: "views.shower_page.bar.relationship_query.title",
                    type: "default",
                    detail: "views.shower_page.bar.relationship_query.detail",
                },

                {
                    title: "views.shower_page.bar.other.title",
                    type: "other",
                    detail: "views.shower_page.bar.other.detail",
                },
            ],
            container_top: 0,
            container_index: 0,
            timer:null
        };
    },
    components: {
        showerBarEle,
    },
    methods: {
        wheelEvent(event) {
            if (!store.state.can_click_button) return;
            let len = this.ele_list.length;
            if (event.deltaY < 0) {
                if (this.container_index - 1 >= 0) {
                    this.container_index--;
                    this.$refs.shower_bar_elements[this.container_index+1].setSelected(false);
                    this.$refs.shower_bar_elements[this.container_index].setSelected(true);
                    this.container_top = this.container_top + 70;
                }
            } else if (event.deltaY > 0) {
                if (this.container_index + 1 < len) {
                    this.container_index++;
                    this.$refs.shower_bar_elements[this.container_index-1].setSelected(false);
                    this.$refs.shower_bar_elements[this.container_index].setSelected(true);
                    this.container_top = this.container_top - 70;
                }
            }
            if(this.container_index!==0&&this.container_index!==this.ele_list.length-1){
                storage.set(0, "METHODS", this.container_index); // 改变
                this.$emit("goToSubpage", this.container_index);
            }
        },
        eleInit() {
            let len = this.ele_list.length;
            let cen = len / 2;
            let delta_ele = cen - 1;
            let top = 0;
            if (len % 2 === 0) {
                top = delta_ele * 70 - 70 / 2;
            } else {
                top = delta_ele * 70 - 70 / 2;
            }
            this.container_top = top;
            this.container_index = 1;
            this.$refs.shower_bar_elements[this.container_index].setSelected(true);
            let index = parseInt(storage.get(0, "METHODS", 1));
            if(index<=0||index>=this.ele_list.length){
                storage.set(0, "METHODS", 1);
            }else{
                this.clickBarEle(index, true);
            }
        },
        clickBarEle(index, no_animation) {
            if (!store.state.can_click_button) return;
            if(index===0){
                this.$emit("backToHome");
            }else if(index === this.ele_list.length - 1){
                // 点击其他
                this.$emit("goToOther");
            }else{
                if(index===1){
                    this.$emit("goToGuide");
                }
                else{
                    this.$emit("goToNoGuide");
                }
                storage.set(0, "METHODS", index); // 改变
                this.$emit("goToSubpage", index);
                let delta = index - this.container_index;
                if(no_animation){
                    this.container_top -= delta * 70;
                    this.$refs.shower_bar_elements[this.container_index].setSelected(false);
                    this.container_index = index;
                    this.$refs.shower_bar_elements[index].setSelected(true);
                }else{
                    this.ease(this.container_top - delta * 70, index);
                }
            }
            // console.log(this.container_index);
        },
        ease(target, target_index) {
            store.state.can_click_button = false;
            let begin = this.container_top;
            let begin_index = this.container_index;
            this.$refs.shower_bar_elements[begin_index].setSelected(false);
            this.timer = setInterval(() => {
                //回弹算法为  当前位置 减 目标位置 取2个百分点 递减
                this.container_top -= (this.container_top - target) * 0.1;
                let i = parseInt(-(this.container_top - begin) / 70);
                if (Math.abs(this.container_top - target) < 15){
                    this.container_index = target_index;
                }else{
                    this.container_index = begin_index + i;
                }
                if (Math.abs(this.container_top - target) < 1) {
                    //减到 当前位置 与 目标位置相差小于1 之后直接归位
                    store.state.can_click_button = true;
                    this.container_top = target;
                    this.$refs.shower_bar_elements[this.container_index].setSelected(true);
                    clearInterval(this.timer);
                }
            }, 10);
        },
    },
    mounted() {
        this.eleInit();
        // this.$refs.bar_track.addEventListener("wheel", this.wheelEvent);
    },
    watch: {
        container_top() {
            this.$refs.shower_bar_container.style.top =
                this.container_top.toString() + "px";
        },
        container_index(newValue, oldValue) {
            this.$emit(
                "setSelected",
                this.ele_list[newValue].title,
                this.ele_list[newValue].type,
                this.ele_list[newValue].detail
            );
        },
    },
};
</script>

<style scoped>
.shower_bar_track {
    position: relative;
    width: 90%;
    height: 100%;
    background-color: #8222964f;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.shower_bar_container {
    position: relative;
}
</style>
