<template>
    <div @click="toEditRealName" class="realname-edit-btn"></div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        toEditRealName() {
            this.$emit("toEditRealName");
        },
    },
};
</script>

<style></style>
