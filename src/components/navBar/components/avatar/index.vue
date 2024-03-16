<template>
    <div style="width: 100%;height: 100%;flex-direction: row;display: flex;align-items: center;">
        <defaultAvatar class="nav_avatar">登录</defaultAvatar>
        <div class="nav_avatar_name">{{ user_name }}</div>
    </div>
</template>
<script>
import defaultAvatar from "@/components/avatar/defaultAvatar.vue";
import store from "@/store/index.js";
import utils from "@/assets/js/utils.js";
import { watch } from "vue";
import { useStore } from "vuex";
export default{
    components:{
        defaultAvatar
    },
    data(){
        return {
            is_login:false,
            user_name:"登录发现更多事物"
        };
    },
    created() {
        if (store.state.is_login) this.is_login = true;
        const $store = useStore();
        watch(
            () => $store.state.is_login,
            (val, old) => {
                this.is_login = val;
            }
        );
    },
    methods:{
    },
    watch:{
        "is_login"(){
            if(this.is_login){
                this.user_name = utils.getUserMsg().name;
            }else{
                this.user_name = "登录发现更多事物";
            }
        }
    }
};
</script>
<style scoped>
.nav_avatar{
    pointer-events: none;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
}
.nav_avatar_img{
    pointer-events: all;
    position: relative;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background-color: #8222965F;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-weight: 500;
    -webkit-text-stroke: 0.3px white;
    font-size: 15px;
}
.nav_avatar_img::after{
    content: " ";
    background-image: var(--avatar-border, " ");
    background-size: cover;
    width: 160%;
    height: 160%;
    position: absolute;
    left: -30%;
    top: -30%;
    overflow: hidden;
}
.nav_avatar_name{
    font-family: Heiti;
    padding-left: 20px;
    font-size: 20px;
    font-weight: 600;
    color: var(--nav-user-name-color, black);
}
</style>