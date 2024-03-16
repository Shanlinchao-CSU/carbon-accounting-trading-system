<template>
    <div class="nav_bar">
        <div class="nav_bar_bg"></div>
        <div class="nav_bar_img">
            <div class="nav_bar_container">
                <!-- 网站名字   头像+昵称 -->
                <div class="nav_bar_title">碳中和交易平台</div>
                <div class="nav_bar_content">
                    <navLogin style="pointer-events: all;" @click="avatarClick"></navLogin>
                </div>
            </div>
            <div class="nav_bar_deco">
                <div class="nav_bar_deco_left"></div>
                <div class="nav_bar_deco_center"></div>
                <div class="nav_bar_deco_right"></div>
            </div>
        </div>
    </div>
</template>
<script>
import navLogin from "./components/avatar/index.vue";
import defaultSearch from "./components/search/defaultSearch.vue";
export default{
    components:{
        navLogin,
    },
    methods:{
        avatarClick(){
            this.$emit("avatarClick");
        }
    }
};
</script>
<style scoped>
.nav_bar{
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    /* border: 1px solid rgb(10, 10, 10); */
    width: 100%;
    height: 130px;
    min-width: 1024px;
}
.nav_bar_bg{
    position: absolute;
    width: 100%;
    height: 70%;
    background-image: var(--navbar-bg-bg-img);
    background-size: contain;
    background-repeat: repeat-x;
}
.nav_bar_img{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: var(--navbar-bar-bg-img);
    background-size: cover;
    /* background-repeat: repeat-x; */
}
.nav_bar_container{
    position: relative;
    width: 100%;
    height: 36%;
    /* border: 1px solid red; */
}
.nav_bar_deco{
    /* border: 1px solid red; */
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.nav_bar_deco_left,.nav_bar_deco_right{
    position: relative;
    right: 25%;
    width: 50px;
    height: 100%;
    /* border: 1px solid red; */
}
.nav_bar_deco_center{
    width: 400px;
    height: 100%;
    /* border: 1px solid red; */
}
.nav_bar_deco_right{
    left: 25%;
}
.nav_bar_title, .nav_bar_content{
    display: flex;
    position: absolute;
    right: 0px;
    margin-right: 50px;
    margin-left: 50px;
    width: 200px;
    height: 100%;
    /* border: 1px solid red; */
}
.nav_bar_title{
    width: 300px;
    left: 0px;
    justify-content: center;
    align-items: center;
    font-family: FZZJ-WHJZTJW;
    font-size: var(--nav-bar-font-size);
    color: var(--navbar-font-color);
}
.nav_bar_content{
    pointer-events: all;
    flex-direction: row;
    align-items: center;
    width:auto;
    padding-right: 20px;
    padding-left: 20px;
}
@media screen and (min-width: 1500px){
    .nav_bar_img{
        background-size: contain;
        background-repeat: repeat-x;
    }
}
</style>