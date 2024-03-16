<template>
    <div class="preference">
        <div style="width: 100%;height: 120px; display: flex;justify-content: center;align-items: center;position: relative;">
            <themeManager></themeManager>
        </div>
        <el-scrollbar class="introduce_container">
            <h1>使用方法</h1>
            <h4>1. 长按ctrl和~</h4>
            <p>如果操作正确，您将会看到界面上出现圆环菜单栏</p>
            <P>移动鼠标可以进行功能选择</P>
            <P>选中之后松开键盘即可进入对应界面</P>
            <h4>2. 当进入子页面时</h4>
            <p>2.1 主页菜单栏进入的子页面通过点击菜单栏按钮切换</p>
            <p>2.2 其余子页面不存在退出按钮时，点击左侧空白区域来进行退出</p>
            <p>2.3 其余子页面存在退出按钮时，点击退出按钮来进行退出</p>
        </el-scrollbar>
    </div>
</template>

<script>
import themeManager from "./themeManager/themeManager.vue";
export default {
    components: {
        themeManager,
    },
};
</script>

<style scoped>
.preference {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    /* border: 1px solid red; */
}
.introduce_container {
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
    /* border: 1px solid red; */
    font-family: Heiti;
    color: var(--subpage-aboutSubpage-color);
}
</style>
