<template>
    <div class="overview_ele">{{ data }}</div>  
</template>

<script>
export default {
    props:["data"]
};
</script>

<style scoped>
.overview_ele{
    position: relative;
    width: 200px !important;
    height: 25px;
    /* border: 1px solid red; */
    line-height: 25px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
</style>