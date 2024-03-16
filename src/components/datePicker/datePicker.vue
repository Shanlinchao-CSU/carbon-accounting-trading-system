<template>
    <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        :disabledDate="disabledDate"
        @change="handleChange"
        format="YYYY年 M月 D日"
        class="custom-date-picker"
    ></el-date-picker>
</template>
<style>
.custom-date-picker {
    position: relative;
    /* border-radius: var(--borderRadius-medium, 6px); */
    /* color:aqua; */
}
.custom-date-picker .el-input__inner {
    /* color: #822269; */
    /* background-color: aqua; */
}
/* 图标 */
.el-input__icon{
    /* background-color: #822269; */
}
.el-popper{
    position: relative;
    z-index: 50000 !important;
}
</style>

<script>
import utils from "@/assets/js/utils.js";
export default {
    data() {
        const userBorn = utils.getUserMsg().born;
        return {
            date: userBorn ? new Date(userBorn) : Date.now(),
        };
    },
    methods: {
        handleChange(value) {
            console.log(value); // 选择的日期
            console.log(utils.getUserMsg()); 
        },
        disabledDate(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 设置时间为 00:00:00
            return date.getTime() > today.getTime(); // 返回是否禁用日期
        },
    },
};
</script>
