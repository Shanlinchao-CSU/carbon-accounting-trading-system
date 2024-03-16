<template>
    <div class="rn-input-container">
        <div class="realname-bg"></div>
        <div>
            <realNameEdit
                :real_name="real_name"
                ref="realNameEdit"
                @msgChange="msgChange"
            />
            <realPhoneEdit
                :phonenumber="phonenumber"
                ref="realPhoneEdit"
                @msgChange="msgChange"
            />
            <realidTypeEdit
                :IDtype="IDtype"
                ref="realidTypeEdit"
                @msgChange="msgChange"
            />
            <realidEdit :ID="ID" ref="realidEdit" @msgChange="msgChange" />
            <button @click="leave" class="confirm-btn">退出</button>
            <button @click="toPersonal" class="confirm-btn" v-if="has_change">
                保存
            </button>
        </div>
    </div>
</template>

<script>
import store from "@/store/index.js";
import realNameEdit from "./realNameEdit.vue";
import realPhoneEdit from "./realPhoneEdit.vue";
import realidTypeEdit from "./realidTypeEdit.vue";
import realidEdit from "./realidEdit.vue";

export default {
    props: {
        real_name: String,
        phonenumber: String,
        IDtype: Number,
        ID: String,
    },
    data() {
        return {
            old: {
                real_name: "",
                phonenumber: "",
                IDtype: "",
                ID: "",
            },
            has_change: {
                change: false,
                real_name: false,
                phonenumber: false,
                IDtype: false,
                ID: false,
            },
        };
    },
    components: {
        realNameEdit,
        realPhoneEdit,
        realidTypeEdit,
        realidEdit,
    },
    mounted() {
        this.old.real_name = this.real_name;
        this.old.phonenumber = this.phonenumber;
        this.old.IDtype = this.IDtype;
        this.old.ID = this.ID;
    },
    methods: {
        msgChange(new_msg, type) {
            if (type === "name") {
                this.has_change.real_name =
                    new_msg === this.old.real_name ? false : true;
            } else if (type === "phone") {
                this.has_change.phonenumber =
                    new_msg === this.old.phonenumber ? false : true;
            } else if (type === "id") {
                this.has_change.ID = new_msg === this.old.ID ? false : true;
            }
            this.has_change.change =
                this.has_change.real_name ||
                this.has_change.phonenumber ||
                this.has_change.ID
                    ? true
                    : false;
        },
        toPersonal() {
            /* 检查字符串 */
            if (!store.state.can_click_button) return;
            let realname = this.$refs.realNameEdit.get();
            let realphone = this.$refs.realPhoneEdit.get();
            let realidtype = this.$refs.realidTypeEdit.get();
            let realid = this.$refs.realidEdit.get();
            if (!realname) return;
            if (!realphone) return;
            if (!realidtype) return;
            if (!realid) return;

            // 调用数据传入后台数据库的函数
            this.$emit("toPersonal");
        },
        leave() {
            this.$emit("toPersonal");
        },
    },
};
</script>

<style scoped>
.rn-input-container {
    display: flex;
}

.realname-bg {
    position: relative;
    background: url("../img/realname.png") no-repeat;
    background-size: contain;
    width: 200px;
    height: 150px;
}

.confirm-btn {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: solid 5px rgba(144, 119, 149, 0.5);
    border-radius: 100%;
    background: url("../img/tick.png") no-repeat;
    background-size: contain;
}

.confirm-btn:hover {
    border-color: rgb(144, 119, 149);
}
</style>
