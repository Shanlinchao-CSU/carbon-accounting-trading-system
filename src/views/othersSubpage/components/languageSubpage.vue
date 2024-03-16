<template>
    <div
        style="
            display: flex;
            flex-direction: column;
            position: absolute;
            /* left: 40%; */
            justify-content: center;
            align-items: center;
            width: 70%;
            height: 80%;
            /* top:10%; */
        "
    >
        <flowButton :judge_isSelected="index_arr[0]" content_text='简体中文' @click="changeLanguage(0)" class="button_change_size"></flowButton>
        <flowButton :judge_isSelected="index_arr[1]" content_text='English' @click="changeLanguage(1)" class="button_change_size"></flowButton>
    </div>
</template>
<script>
import Storage from "@/assets/js/storage/storage.js";
import flowButton from "@/components/buttons/subpageButton/flowButton.vue";
const language_arr = ["zh-Hans", "en"];
export default {
    methods: {
        changeLanguage(index) {
            this.radio1 = language_arr[index];
            this.index_arr.forEach((element, index) => {
                this.index_arr[index] = false;
            });
            this.index_arr[index] = true;
            this.$i18n.locale = language_arr[index];
            // let a=this.$t("views.othersSubpage.language");
            // console.log(a);
        },
    },
    data() {
        return {
            radio1: "en",
            index_arr: [false, false],
        };
    },
    watch: {
        radio1() {
            Storage.set(0, "LANGUAGE", this.radio1);
            // console.log(t('views.othersSubpage.language'));
            // console.log(this.index_arr);
        },
    },
    mounted() {
        this.radio1 = Storage.get(0, "LANGUAGE", "en");
        this.changeLanguage(language_arr.indexOf(this.radio1));
    },
    components:{
        flowButton,
    }
};
</script>
<style scoped>
.button_change_size{
    width: 150px;
    height: 50px;
}
</style>
