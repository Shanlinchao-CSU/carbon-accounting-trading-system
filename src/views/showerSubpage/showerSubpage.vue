<template>
    <div class="shower_subpage" ref="shower_subpage">
        <carbonGuideSubpage ref="son_0"></carbonGuideSubpage>
        <!-- <carbonAccountingSubpage_2 ref="son_1"></carbonAccountingSubpage_2> -->
        <!-- <carbonAccountingSubpage_10 ref="son_1"></carbonAccountingSubpage_10> -->
        <carbonAccounting ref="son_1"></carbonAccounting>
        <carbonTransaction :goToCarbonAccounting = "goToCarbonAccounting"
            ref="son_2"
        ></carbonTransaction>
    </div>
</template>

<script>
import carbonAccounting from "./components/carbonAccounting.vue";
import carbonAccountingSubpage_2 from "./components/subPages/carbonAccountingSubpage_2.vue";
import carbonAccountingSubpage_10 from "./components/subPages/carbonAccountingSubpage_10.vue";
import carbonGuideSubpage from "./components/carbonGuideSubpage.vue";
import carbonTransaction from "./components/carbonTransaction.vue";
import overviewSubpage from "./components/functionSubpage.vue";

export default {
    data() {
        return {
            show_catalogue: true,
            renderer: null,
            sct: 0,
        };
    },
    components: {
        carbonTransaction,
        carbonAccountingSubpage_2,
        carbonAccountingSubpage_10,
        carbonGuideSubpage,
        carbonAccounting
    },
    mounted() {
        this.scrollTo(0);
    },
    methods: {
        scrollTo(index) {
            if (index === 0 || index === 4) return; // 修改
            index--;
            this.$refs.shower_subpage.scrollTo({
                top: this.$refs["son_" + index.toString()].getOffsetTop(),
                behavior: "smooth",
            });
        },
        searchId(id) {
            this.$emit("goToSubpageByIndex", 2);
            this.$refs.son_1.fromRelation(id);
        },
        goToCarbonAccounting(){
            this.$emit("goToSubpageByIndex", 2);
        },
        videoPause(){
            // this.$refs.son_0.videoPause();
        },
        videoDelete(){
            // this.$refs.son_0.videoDelete();
        },
        videoAppear(){
            // this.$refs.son_0.videoAppear();
        }

    },
};
</script>

<style scoped>
.shower_subpage {
    user-select: text;
    width: 100%;
    height: 100%;
    position: absolute;
    /* border: 1px solid pink; */
    /* background-color: red; */
    font-family: Songti;
    font-size: 20px;
    overflow: hidden;
}
</style>
