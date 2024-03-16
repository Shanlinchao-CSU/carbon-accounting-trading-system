<template>
    <div class="search_element">
        <div
            class="res_body"
            @click="clickSearchRes"
            @mousemove="can_click=false"
            @mousedown="is_down = true;can_click=true"
            @mouseup="is_down = false"
        >
            <div class="image" v-if="image"></div>
            <div
                class="title"
                :class="{ has_image: image }"
                v-html="title"
            ></div>
            <div class="abstrack" :class="{ has_image: image }">
                <span v-html="abstract"></span>
            </div>
            <div class="show_index">
                <span>第{{ index }}条数据</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "abstract", "index", "image", "id"],
    data() {
        return {
            is_down: false,
            can_click:false,
        };
    },
    methods: {
        clickSearchRes() {
            if(!this.can_click) return;
            this.$emit("clickSearchRes", this.id);
        },
    },
};
</script>

<style scoped>
.search_element {
    /* border: 1px solid red; */
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    margin: 5px 0px 5px 0px;
}
.res_body {
    position: relative;
    cursor: pointer;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 700px;
    height: 100%;
    z-index: 1;
    overflow: hidden;
}
.show_index {
    display: block;
    position: absolute;
    right: 0%;
    bottom: 0%;
    color: black;
    height: auto;
    width: 100%;
    text-align: end;
    font-size: 13px;
    white-space: nowrap;
    padding: 2px 5px 2px 0px;
    z-index: 1000;
}
.image {
    position: relative;
    float: right;
    /* border: 1px solid red; */
    width: 150px;
    min-height: 200px;
}
.title {
    /* border: 1px solid red; */
    width: 100%;
    height: 50px;
    font-size: 28px;
    line-height: 50px;
    font-weight: 600 !important;
    padding-left: 10px;
}
.abstrack {
    padding: 10px;
    /* border: 1px solid red; */
    width: calc(100% - 20px);
    height: auto;
    font-size: 16px;
}
.has_image {
    width: calc(100% - 150px - 20px);
}
</style>
