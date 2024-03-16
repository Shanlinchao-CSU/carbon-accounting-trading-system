<template>
    <div class="personal-profile-container">
        <div class="profile_top_container">
            <div class="profile_top_body">
                <avatar
                    class="profile-avatar"
                    style="pointer-events: none !important"
                />
                <div class="profile_name">
                    <div
                        class="profile-ele-ele"
                        style="font-size: 35px; font-weight: 600"
                    >
                        {{ name }}
                    </div>
                    <!-- <div class="profile-ele-ele">
                        IP: {{ getProfess(occu) }}
                    </div> -->
                </div>
            </div>
        </div>
        <div class="profile_body_container">

        </div>
        <div class="profile_bottom_container">
            <personalEdit title="个人信息编辑" @clickFunc="toEditPersonal"></personalEdit>
            <personalEdit title="实名信息编辑" @clickFunc="toEditRealName"></personalEdit>
            <div class="logout_button" @click="logOut">登出</div>
        </div>
    </div>
</template>

<script>
import avatar from "@/components/avatar/defaultAvatar.vue";
import realNameEdit from "./realNameEdit.vue";
import Storage from "@/assets/js/storage/storage";
import personalEdit from "./personalEdit.vue";
const default_theme = {
    theme: "light",
    color: "",
    font_size: {
        base: "",
        button: "",
    },
};
export default {
    props: {
        avatar: String,
        born: String,
        card_type: String,
        email: String,
        id: String,
        id_card: String,
        name: String,
        occu: String,
        password: String,
        real: Boolean,
        real_name: String,
        sex: Number,
        tel: String,
    },
    data() {
        return {};
    },
    components: {
        // realNameEdit,
        personalEdit,
        avatar,
    },
    methods: {
        logOut(){
            this.$emit("logOut");
        },
        toEditRealName() {
            this.$emit("toEditRealName");
        },
        toEditPersonal(){
            this.$emit("toEditPersonal");
        },
        getProfess(str) {
            switch (str) {
                case "O00":
                    return "未知";
                case "O01":
                    return "无";
                case "O02":
                    return "不愿意透露的高级职业";
                case "O03":
                    return "教师";
                case "O04":
                    return "农民";
                case "O05":
                    return "学生";
                default:
                    return "error";
            }
        },
        getCardType(str) {
            if (str === "C01") {
                return "居民身份证";
            } else {
                return "暂未设置该类型";
            }
        },
        getSex(t) {
            if (t === 0) {
                return "男";
            } else {
                return "女";
            }
        },
        getTheme() {
            /* 访问数据库 */
            this.theme_json = Storage.get(0, "THEME", default_theme, "JSON");
            return this.theme_json.theme;
        },
    },
    mounted() {
        // console.log(this.name);
    },
};
</script>

<style scoped>
.personal-profile-container {
    position: relative;
    left: 0;
    top: 0;
    /* left: 50px; */
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    overflow-y: auto;
    overflow-x: hidden;
}
.profile_top_container {
    position: relative;
    width: 100%;
    height: 40%;
    min-height: 120px;
    /* border: 1px solid red; */
}
.profile_body_container{
    position: relative;
    width: 100%;
    height: calc(60% - 100px);
    /* border: 1px solid red; */
    min-height: 70px;
}
.profile_bottom_container{
    position: relative;
    width: 100%;
    height: 100px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.profile_top_body {
    width: 85%;
    height: 90%;
    position: absolute;
    bottom: 0;
    left: 5%;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
}
.profile-container {
    border: 1px solid red;
}
.profile-ele {
    display: flex;
    left: 40%;
}
.profile_name {
    width: calc(100% - 150px);
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    margin-left: 30px;
    font-family: Heiti;
    overflow-x: auto;
}
.profile-avatar {
    position: relative;
    z-index: 100;
    width: 100px !important;
    height: 100px !important;
    margin-right: 10px;
    pointer-events: none !important;
    cursor: auto !important;
    /* border: 1px solid red; */
}

.profile-ele-ele {
    /* margin-top: 15px; */
    /* border: 1px solid red; */
    margin: 5px 0px 5px 0px;
}

.profile-tags {
    margin-top: 15px;
    margin-bottom: 15px;
    left: 15%;
}

.el-tag {
    margin: 5px;
}

.realname-edit-btn {
    cursor: pointer;
    position: relative;
    top: 7px;
    left: 10px;
    background: url("../img/realnameedit.png") no-repeat;
    background-size: contain;
    width: 27px;
    height: 27px;
    border-radius: 100%;
    border: solid 3px #907795;
}
.realname-collapse {
    width: 230px;
}

.profile-realname >>> .el-collapse {
    border-color: var(--homeview-bg-color) !important;
}

.profile-realname >>> .el-collapse-item__header {
    border-color: var(--homeview-bg-color) !important;
    background-color: var(--homeview-bg-color) !important;
}

.profile-realname >>> .el-collapse-item__wrap {
    border-color: var(--homeview-bg-color) !important;
    background-color: var(--homeview-bg-color) !important;
}
.exit-btn {
    cursor: pointer;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
}

.exit-btn-bg {
    position: absolute;
    background: url("../img/back.png") no-repeat;
    background-size: contain;
    width: 60px;
    height: 60px;
    transition: transform 0.3s ease;
}

.exit-btn-text {
    line-height: 60px;
    text-indent: 15px;
}

.exit-btn-bg:hover {
    transform: rotate(360deg);
}
.logout_button{
    font-weight: 600;
    font-size: 25px;
    font-family: Heiti;
}
.logout_button:hover{
    text-shadow: 0px 0px 8px #d084df;
}
</style>
