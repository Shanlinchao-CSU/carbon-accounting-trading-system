<template>
    <div class="shower_bar_back">
        <div class="title">返回</div>
        <div class="login_msg_return_logo"></div>
    </div>
</template>

<script>
export default {
    props:["title"]
};
</script>

<style scoped>
.shower_bar_back{
    cursor: pointer;
    pointer-events: all;
    position: absolute;
    top: 50px;
    width: 100%;
    height: 50px;
    /* background-color: rgb(0, 0, 0, 0.8); */
    background-color: #822296DF;
    align-items: start;
}
.title{
    position: relative;
    font-family: Heiti;
    font-weight: 600;
    color: white;
    text-align: center;
}
.title{
    line-height: 45px;
    height: 45px;
    font-size: 30px;
}
.shower_bar_back:hover > .login_msg_return_logo{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgb(255, 255, 255) 40%, rgb(255, 255, 255) 70%);
    -webkit-mask-image: url("./img/back.png");
    -webkit-mask-size: 45px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
.shower_bar_back:hover > .title{
    /* background-image: url("./img/back.png"); */
    color: #82229600;
}
</style>
