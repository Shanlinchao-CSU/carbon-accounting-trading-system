<template>
    <div class="confirm_button" :data-text="content" @click="loginClick">
        {{ content }}
    </div>
</template>

<script>
export default {
    methods:{
        loginClick(){
            this.$emit("confirmClick");
        }
    },
    props:["content"]
};
</script>

<style scoped>
.confirm_button {
    user-select: none;
    margin-top: 20px;
    cursor: pointer;
    position: relative;
    font-size: 25px;
    font-family: Heiti;
    z-index: 1;
    color: var(--confirm-button-color);
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    box-shadow: 1px 1px 5px rgb(217, 149, 230);
    border: 2px solid rgb(217, 149, 230);
}
.confirm_button::after {
    content: attr(data-text);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    /* color: aqua; */
    -webkit-text-stroke: 3px var(--confirm-hover-color);
}
.confirm_button:hover {
    background-color: var(--confirm-hover-color);
    color: var(--confirm-hover-color);
}
.confirm_button:hover::after {
    -webkit-text-stroke: 3px white;
}
</style>
