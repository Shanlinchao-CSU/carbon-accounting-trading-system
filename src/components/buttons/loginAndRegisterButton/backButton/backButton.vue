<template>
    <div class="login_msg_return" @click="buttonClick" :data-text="content">
        {{ content }}
        <div class="login_msg_return_logo"></div>
    </div>
</template>

<script>
export default {
    props:["content"],
    methods:{
        buttonClick(){
            this.$emit("buttonClick");
        }
    }
};
</script>

<style scoped>
.login_msg_return{
    position: relative;
    cursor:pointer;
    width: 80px;
    height: 30px;
    line-height: 30px;
    /* background-image: url("./img/back.png"); */
    background-size: auto 80%;
    background-repeat: no-repeat;
    background-position: center;
    font-family: FZZJ-WHJZTJW;
    font-size: 25px;
    border: 3px solid #8222966F;
    border-radius: 30px;
    z-index: 1;
}
.login_msg_return:hover{
    /* background-image: url("./img/back.png"); */
    color: #d5b4dc00;
    border: 3px solid rgba(199, 14, 250, .5);
    box-shadow: inset 0px 0px 8px rgba(199, 14, 250, .3), 0px 0px 8px rgba(199, 14, 250, .3);
}
.login_msg_return:hover::after{
    -webkit-text-stroke: 0px white;
}
.login_msg_return:hover > .login_msg_return_logo{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgb(199, 14, 250) 40%, rgb(255, 255, 255) 70%);
    -webkit-mask-image: url("./img/back.png");
    -webkit-mask-size: 30px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
</style>
