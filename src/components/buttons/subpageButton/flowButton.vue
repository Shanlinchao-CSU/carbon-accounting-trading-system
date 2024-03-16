<template>
    <button class="button_unSelected"
            :class="{ button_isSelected: judge_isSelected }">
        <div class="button_text" :data-text='content_text'>
            {{ content_text }}
        </div>
    </button>
</template>
<script>
export default {
    props: ["judge_isSelected", "content_text"],
};
</script>
<style scoped>
.button_unSelected {
    margin-top: 20px;
    margin-bottom: 20px;
    /* width: 150px; */
    /* height: 50px; */
    background: none;
    border: 4px solid var(--flowButton-border-color);
    color: var(--flowButton-color);
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-transform: uppercase; 大写文本 */
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
}
.button_unSelected::before,
.button_unSelected::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: var(--flowButton-after-background-color);
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.button_unSelected::before {
    top: -4px;
    left: 10%;
}
.button_unSelected::after {
    bottom: -4px;
    right: 10%;
}
.button_unSelected:hover::before {
    left: 80%;
}
.button_unSelected:hover::after {
    right: 80%;
}
.button_unSelected:hover {
    /* color: #3498db; */
}
.button_isSelected {
    margin-top: 20px;
    margin-bottom: 20px;
    /* width: 150px; */
    /* height: 50px; */
    background-color: var(--flowButton-selected-background-color);
    border: 4px solid var(--flowButton-selected-border-color);
    color: var(--flowButton-selected-color);
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-transform: uppercase; 大写文本 */
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
}
.button_isSelected::before,
.button_isSelected::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: var(--flowButton-selected-after-background-color);
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.button_isSelected::before {
    top: -4px;
    left: 80%;
}
.button_isSelected::after {
    bottom: -4px;
    right: 80%;
}
.button_text {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.button_unSelected:hover > .button_text {
    color: var(--flowButton-hover-button-color);
}
.button_unSelected:hover > .button_text::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-text-stroke: 6px var(--flowButton-hover-button-after-webkit-text-stroke-color);
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
