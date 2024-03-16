<template>
    <defaultShutter transparent_bg="true">
        <template #show_child_page>
            <div class="realname-container">
                <realNameContent
                    v-bind="getRealNameMsg()"
                    @toPersonal="toPersonal"
                />
            </div>
        </template>
    </defaultShutter>
</template>

<script>
import defaultShutter from "@/components/shutter/defaultShutter.vue";
import realNameContent from "./components/realNameContent.vue";
import store from "@/store/index.js";
import utils from "@/assets/js/utils.js";
export default {
    data() {
        return {};
    },
    components: {
        realNameContent,
        defaultShutter,
    },
    methods: {
        getRealNameMsg() {
            // 获取用户原有的实名认证信息
            let user_msg = utils.getUserMsg();
            if (user_msg.id === "") {
                utils.setLogOut();
                store.state.is_login = false;
            }
            // 看效果用的，可忽略
            return {
                real_name: user_msg.real_name,
                phonenumber: user_msg.tel,
                IDtype: user_msg.card_type,
                ID: user_msg.id_card,
            };
        },
        toPersonal() {
            if (!store.state.can_click_button) return;
            this.$emit("toPersonal");
        },
    },
};
</script>

<style></style>
