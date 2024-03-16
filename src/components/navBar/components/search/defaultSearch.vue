<template>
    <div class="default_search_container">
        <div class="default_search_body">
            <Search
                :color="icon_color"
                class="search_icon"
                @click="this.$refs.default_search_input.focus()"
                @mouseover="mouseOver"
                @mouseout="mouseOut"
            />
            <input
                class="default_search_input"
                ref="default_search_input"
                type="text"
                placeholder="搜索数据"
                v-model="input_msg"
                :onfocus="focus"
                :onblur="blur"
            />
            <Close
                :color="icon_color"
                class="close_icon"
                @click="clear"
                @mouseover="mouseOver"
                @mouseout="mouseOut"
            />
            <transition name="opacity300">
                <div
                    ref="ref_list"
                    class="res_list"
                    v-if="is_focus || judge"
                    @mouseover="mouseOver"
                    @mouseout="mouseOut"
                >
                    <div class="res_subpage" v-if="subpage[2]"></div>
                    <div class="waiting_subpage" v-if="subpage[1]">
                        <div class="mascot_container_waiting">
                            <harvest
                                style="position: absolute; bottom: 30px"
                                type="password"
                            ></harvest>
                            <linePrompt
                                :opacity="error"
                                style="
                                    width: 260px;
                                    position: absolute;
                                    bottom: 0px;
                                "
                                :data_left="error"
                                :type="prompt_type"
                            ></linePrompt>
                        </div>
                    </div>
                    <div class="his_subpage" v-if="subpage[0]">
                        <historyElement
                            v-for="(element, index) in his_list"
                            :key="index"
                            :content="element.content"
                            @deleteHisByContent="deleteHisByContent"
                            @searchByContent="searchByContent"
                        ></historyElement>
                        <div class="mascot_container">
                            <harvest
                                style="position: absolute; bottom: 30px"
                            ></harvest>
                            <div
                                style="
                                    width: 100%;
                                    height: 30px;
                                    font-size: 16px;
                                    line-height: 30px;
                                    position: absolute;
                                    bottom: 0;
                                "
                                :style="{
                                    color:
                                        prompt_text ===
                                        '输入非法或超过100个字符'
                                            ? 'red'
                                            : 'rgba(0, 0, 0, 0.6)',
                                }"
                            >
                                {{ prompt_text }}
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div
            class="search_button"
            @click="search"
            @mouseover="mouseOver"
            @mouseout="mouseOut"
        >
            搜索
        </div>
    </div>
</template>

<script>
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Storage from "@/assets/js/storage/storage";
import harvest from "@/components/mascots/harvest/probe/probeForLAR.vue";
import historyElement from "../historyElement/historyElement.vue";

import Checker from "@/assets/js/checker/checker";
import store from "@/store/index.js";
export default {
    data() {
        return {
            icon_color: "gary",
            input_msg: "",
            is_focus: false,
            judge: false,
            is_over: false,
            subpage: [true, false, false],
            all_his_list: [],
            his_list: [],
            default_show: 20,
            error: "搜索中",
            prompt_type: "waiting",
            res_list: [],
            prompt_text: "请输入关键词来搜索",
        };
    },
    props: ["is_stock"],
    components: {
        harvest,
        historyElement,
        linePrompt,
    },
    watch: {
        input_msg() {
            this.prompt_text = "请输入关键词来搜索";
        },
    },
    mounted() {
        let index = 0;
        if (this.is_stock) {
            this.all_his_list = Storage.get(
                0,
                "STOCK_SEARCH",
                this.all_his_list,
                "JSON"
            );
        } else {
            this.all_his_list = Storage.get(
                0,
                "HISTORY_SEARCH",
                this.all_his_list,
                "JSON"
            );
        }
        for (let i = this.all_his_list.length - 1; i >= 0; i--) {
            if (index >= this.default_show) break;
            this.his_list.push(this.all_his_list[i]);
        }
        this.$refs.default_search_input.addEventListener(
            "keydown",
            this.onKeyDown
        );
        this.$refs.default_search_input.addEventListener("keyup", this.onKeyUp);
        document
            .getElementById("html")
            .addEventListener("click", this.clickBody);
    },
    beforeUnmount() {
        this.$refs.default_search_input.removeEventListener(
            "keydown",
            this.onKeyDown
        );
        this.$refs.default_search_input.removeEventListener(
            "keyup",
            this.onKeyUp
        );
        document
            .getElementById("html")
            .removeEventListener("click", this.clickBody);
    },
    methods: {
        onKeyDown(e) {
            // console.log(e.key);
        },
        onKeyUp(e) {
            // console.log(e.key);
            if (e.key === "Enter") {
                this.search();
            }
        },
        search() {
            if (!store.state.can_click_button) return;
            this.$refs.default_search_input.focus();
            if (this.input_msg === "") return;
            // 检查字符串
            if (
                !new Checker(this.input_msg, [
                    "no-base-symbols",
                    "sql-check",
                    "no-null",
                    "@length-max=100",
                    "no-only-spacing",
                ]).check()
            ) {
                this.prompt_text = "输入非法或超过100个字符";
                return;
            }
            // 检查历史
            let text = this.input_msg;
            let temp = {
                content: text,
            };
            let index = this.all_his_list.findIndex((element) => {
                return element.content === text;
            });
            if (index !== -1) {
                // 数据存在在历史记录里面
                this.all_his_list.push(this.all_his_list.splice(index, 1)[0]);
                let i = this.his_list.findIndex((element) => {
                    // 检查显示的数组
                    return element.content === text;
                });
                if (i !== -1) {
                    // 数据存在在显示数组里面
                    this.his_list.unshift(this.his_list.splice(i, 1)[0]);
                } else {
                    if (this.his_list.length >= 20) this.his_list.pop(); // 删除尾元素
                    this.his_list.unshift(temp); // 插入首位
                }
            } else {
                // 数据不存在历史记录里面
                if (this.all_his_list.length >= 20) this.all_his_list.shift();
                // 删除首元素 这个其实用一个就行了（当时想错了，这样设计可以存更多的数据，但是显示可以不显示完，但是感觉没必要这样）
                //但是不想改了（
                this.all_his_list.push(temp);
                if (this.his_list.length >= 20) this.his_list.pop(); // 删除尾元素
                this.his_list.unshift(temp); // 插入首位
            }
            this.is_over = false;
            this.subpage = [false, true, false];
            if(this.is_stock){
                Storage.set(0, "STOCK_SEARCH", this.all_his_list, "JSON");
            }else{
                Storage.set(0, "HISTORY_SEARCH", this.all_his_list, "JSON");
            }

            this.$emit("search", this.input_msg);
        },
        clear() {
            this.input_msg = "";
            this.$refs.default_search_input.focus();
            this.subpage = [true, false, false];
        },
        focus() {
            this.is_focus = true;
        },
        blur() {
            this.is_focus = false;
        },
        mouseOver() {
            this.is_over = true;
            if (this.is_focus) this.judge = true;
        },
        mouseOut() {
            this.is_over = false;
        },
        clickBody() {
            this.judge = this.is_over;
        },
        deleteHisByContent(content) {
            let i = this.his_list.findIndex((element) => {
                // 检查显示的数组
                return element.content === content;
            });
            if (i !== -1) {
                this.his_list.splice(i, 1);
            }
            i = this.all_his_list.findIndex((element) => {
                // 检查显示的数组
                return element.content === content;
            });
            if (i !== -1) {
                this.all_his_list.splice(i, 1);
            }
            // Storage.set(0, "HISTORY_SEARCH", this.all_his_list, "JSON");
            if(this.is_stock){
                Storage.set(0, "STOCK_SEARCH", this.all_his_list, "JSON");
            }else{
                Storage.set(0, "HISTORY_SEARCH", this.all_his_list, "JSON");
            }
        },
        searchByContent(content) {
            this.input_msg = content;
            this.search();
        },
        setWaiting() {
            this.subpage = [false, true, false];
            this.judge = true;
        },
        getMsg() {
            this.judge = false;
            this.is_focus = false;
            this.$refs.default_search_input.blur();
            this.subpage = [true, false, false];
        },
        getInput(){
            return this.input_msg;
        }
    },
};
</script>

<style scoped>
.default_search_container {
    pointer-events: all;
    position: relative;
    width: 500px;
    height: 100%;
    /* border: 1px solid red; */
    /* right: 350px; */
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.default_search_body {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 70%;
    height: 30px;
    border: 1px solid rgba(128, 128, 128, 0.544);
    border-radius: 30px;
    background-color: white;
    transition: all 0.1s ease-out;
}
.res_list {
    border-radius: 10px;
    position: absolute;
    top: 150%;
    width: 90%;
    min-width: 315px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}
.his_subpage,
.waiting_subpage {
    position: relative;
    display: block;
    height: auto;
}
.mascot_container_waiting {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
}
.mascot_container {
    /* border: 1px solid red; */
    width: 100%;
    position: relative;
    text-align: center;
    font-family: Heiti;
    height: 200px;
    overflow: hidden;
}
.default_search_body:hover {
    border: 1px solid #822296;
}
.search_icon,
.close_icon {
    position: absolute;
    width: 6%;
    height: auto;
}
.search_icon {
    left: 1%;
}
.close_icon {
    cursor: pointer;
    right: 1%;
}
.default_search_input {
    width: 85%;
    height: 100%;
    line-height: 100%;
    font-size: 18px;
}
.default_search_body:has(.default_search_input:focus) {
    border: 1px solid #822296;
    box-shadow: 0px 0px 7px #8222966f;
}
.default_search_input::placeholder {
    line-height: 100%;
    font-size: 18px;
    color: gray;
}
.search_button {
    user-select: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    width: 12%;
    height: 35px;
    font-size: 16px;
    font-weight: 600;
    background-color: rgb(207, 159, 216);
    color: white;
    line-height: 35px;
    text-align: center;
    border-radius: 10px;
}
.search_button:hover {
    background-color: rgb(204, 121, 221);
}
</style>
