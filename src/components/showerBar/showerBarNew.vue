<template>
    <div class="shower_bar" ref="shower_bar">
        <showerBarTrack
            ref="shower_bar_track"
            @setSelected="setSelected"
            @backToHome="backToHome"
            @goToGuide="goToGuide"
            @goToNoGuide="goToNoGuide"
            @goToOther="goToOther"
            @goToSubpage="goToSubpage"
        ></showerBarTrack>
        <showerBarSelected
            :title="selected.title"
            :type="selected.type"
            :detail="selected.detail"
            @click="clickSelected"
        ></showerBarSelected>
    </div>
</template>

<script>
import showerBarTrack from "./components/showerBarTrack.vue";
import showerBarSelected from "./components/showerBarSelected.vue";
import showerBarBack from "./components/showerBarBack.vue";
export default {
    data() {
        return {
            selected: {
                type: "",
                title: "",
                detail: "",
            },
            mouse_y: 0,
            can_wheel: false,
        };
    },
    components: {
        showerBarTrack,
        showerBarSelected,
    },
    methods: {
        clickSelected() {
            if (this.selected.type === "back") {
                this.$emit("backToHome");
            }else if(this.selected.type === "other"){
                // console.log("点击selected");
                this.$emit("goToShowerOther");
            }
        },
        backToHome() {
            this.$emit("backToHome");
        },
        goToOther() {
            this.$emit("goToShowerOther");
        },
        goToSubpage(index){
            this.$emit("goToSubpage", index);
        },
        goToGuide(){
            this.$emit("goToGuide");
        },
        goToNoGuide(){
            this.$emit("goToNoGuide");
        },
        wheelEvent(event) {
            if (this.can_wheel) {
                this.$refs.shower_bar_track.wheelEvent(event);
            }
        },
        goToSubpageByIndex(index){
            this.$refs.shower_bar_track.clickBarEle(index);
        },
        mouseMove(evevt) {
            if (evevt.clientY <= 50) {
                this.can_wheel = false;
            } else {
                this.can_wheel = true;
            }
        },
        setSelected(title, type, detail) {
            this.selected.title = title;
            this.selected.type = type;
            this.selected.detail = detail;
        }
    },
    mounted() {
        this.$refs.shower_bar.addEventListener("wheel", this.wheelEvent);
        this.$refs.shower_bar.addEventListener("mousemove", this.mouseMove);
    },
    beforeUnmount(){
        this.$refs.shower_bar.removeEventListener("wheel", this.wheelEvent);
        this.$refs.shower_bar.removeEventListener("mousemove", this.mouseMove);
    }
};
</script>

<style scoped>
.shower_bar {
    width: 100%;
    height: 100vh;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
</style>
