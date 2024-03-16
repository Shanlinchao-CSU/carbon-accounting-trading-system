<template>
    <div
        style="
            display: flex;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 90%;
        "
        ref="three_subpage"
    >
        <transition name="opacity400">
            <languageSubpage v-if="subpageSelected[0]"></languageSubpage>
            <aboutSubpage v-else-if="subpageSelected[1]"></aboutSubpage>
            <preferenceSubpage
                v-else-if="subpageSelected[2]"
            ></preferenceSubpage
        ></transition>
    </div>
</template>

<script>
import languageSubpage from "./languageSubpage.vue";
import aboutSubpage from "./aboutSubpage.vue";
import preferenceSubpage from "./preferenceSubpage.vue";
export default {
    props: {
        subpageSelected: {
            type: Array,
        },
    },
    methods: {
    },
    data() {},
    components: {
        languageSubpage,
        aboutSubpage,
        preferenceSubpage,
    },
    mounted() {
    },
};
</script>

<style scoped></style>
