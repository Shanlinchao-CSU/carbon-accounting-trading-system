<template>
    <div class="his_ele">
        <span class="his_ele_span" @click="clickEle">{{ content }}</span>
        <Close class="close_icon" @click="clear" />
    </div>
</template>

<script>
export default {
    props: ["content"],
    methods:{
        clear(){
            this.$emit("deleteHisByContent", this.content);
        },
        clickEle(){
            this.$emit("searchByContent", this.content);
        }
    }
};
</script>

<style scoped>
.his_ele {
    margin: 5px;
    position: relative;
    float: left;
    max-width: calc(140px - 8px - 18px);
    height: 23px;
    border-radius: 23px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 23px;
    padding-left: 8px;
    padding-right: 18px;
    display: flex;
    align-items: center;
    background-color: rgb(238, 210, 243);
    border: 1.5px solid rgb(163, 110, 172);
}
.close_icon {
    position: absolute;
    width: 15px;
    height: 15px;
    right: 1px;
    cursor: pointer;
}
.his_ele_span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
</style>
