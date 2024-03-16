<template>
    <div class="shower_bar_selected" :class="{has_pointer_event:type==='back'}">
        <div class="container" v-if="type!=='back'" :style="{cursor: type==='other' ? 'pointer' : 'default'}">
            <div class="title">{{ $t(title) }}</div>
            <div class="detail">{{ $t(detail) }}</div>
        </div>
        <div class="container back" v-if="type==='back'">
            <div class="back_title">{{ $t(title) }}</div>
            <div class="login_msg_return_logo"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:["title", "type", "detail"]
};
</script>

<style scoped>
.shower_bar_selected{
    font-family: Heiti;
    cursor: default;
    pointer-events: all;
    position: absolute;
    width: 100%;
    height: 70px;
    /* background-color: rgb(0, 0, 0, 0.8); */
    background-color: #822296DF;
    align-items: start;
}
.back{
    cursor: pointer;
}
.has_pointer_event{
    pointer-events: all !important;
}
.container{
    position: relative;
    width: 100%;
    height: 100%;
}
.title, .detail{
    position: relative;
    font-family: Heiti;
    font-weight: 600;
    color: var(--shower-bar-color);
    padding-left: 30px;
    text-align: left;
}
.title{
    line-height: 45px;
    height: 45px;
    font-size: 35px;
}
.detail{
    line-height: 25px;
    height: 25px;
    font-size: 15px;
}
.back_title{
    cursor: pointer;
    position: relative;
    font-family: Heiti;
    font-weight: 600;
    color: var(--shower-bar-color);
    text-align: center;
    line-height: 70px;
    height: 70px;
    font-size: 30px;
}
.container:hover > .login_msg_return_logo{
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
.container:hover > .back_title{
    /* background-image: url("./img/back.png"); */
    color: #82229600;
}
</style>
