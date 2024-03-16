<template>
    <defaultShutter black_bg="true" :bg_click_func="leavePersonal">
        <template #show_child_page>
            <div class="personal-container">
                <personalProfile
                    v-bind="msg"
                    @leavePersonal="leavePersonal"
                    @toEditRealName="toEditRealName"
                    @toEditPersonal="toEditPersonal"
                    @logOut="logOut"
                    style="height: 100%"
                ></personalProfile>
            </div>
        </template>
    </defaultShutter>
</template>

<script>
import defaultShutter from "@/components/shutter/defaultShutter.vue"; // 个人信息--子页面
import personalProfile from "./components/personalProfile.vue";
import personalEdit from "./components/personalEdit.vue";
import store from "@/store/index.js";
import utils from "@/assets/js/utils";

export default {
    data() {
        return {
            msg: {
                avatar: "",
                born: "",
                card_type: "",
                email: "",
                id: "",
                id_card: "",
                name: "",
                occu: "",
                password: "",
                real: false,
                real_name: "",
                sex: 0,
                tel: "",
            },
        };
    },
    components: {
        defaultShutter,
        personalProfile,
        // personalEdit,
    },
    methods: {
        logOut(){
            this.$emit("logOut");
        },
        leavePersonal() {
            if (!store.state.can_click_button) return;
            this.$emit("leavePersonal");
        },
        toEditRealName() {
            if (!store.state.can_click_button) return;
            this.$emit("toEditRealName");
        },
        toEditPersonal() {
            if (!store.state.can_click_button) return;
            this.$emit("toEditPersonal");
        },
        getPersonalMsg() {
            let user_msg = utils.getUserMsg();
            if (user_msg.id === "") {
                console.log("信息不完整");
                utils.setLogOut();
                store.state.is_login = false;
            } else {
                return user_msg;
            }
        },
    },
    mounted() {
        this.msg = this.getPersonalMsg();
        // console.log(this.msg);
    },
};
</script>

<style scoped>
.personal-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: all;
    /* border: 1px solid gold; */
}
</style>
