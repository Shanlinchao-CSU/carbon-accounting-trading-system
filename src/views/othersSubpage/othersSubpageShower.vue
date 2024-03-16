<template>
    <defaultShutters has_right_girl="true" black_bg="true" :bg_click_func="leaveShutter">
        <template #show_child_page>
            <div
                style="
                    position: relative;
                    width: 100%;
                    height: 100%;
                "
            >
                <div class="subpageSelect">
                    <button
                        :class="{subpage_isSelected:subpageSelected_judge[0],subpage_unSelected:!subpageSelected_judge[0]}"
                        @click="changeSubButton(0)"
                    >
                        <div
                            class="button_text"
                            :data-text="$t('views.main_page.others_subpage.language_subpage.title')"
                        >
                            {{ $t("views.main_page.others_subpage.language_subpage.title") }}
                        </div>
                    </button>
                    <button
                    :class="{subpage_isSelected:subpageSelected_judge[1],subpage_unSelected:!subpageSelected_judge[1]}"
                        @click="changeSubButton(1)"
                    >
                        <div
                            class="button_text"
                            :data-text="$t('views.main_page.others_subpage.about_subpage.title')"
                        >
                            {{ $t("views.main_page.others_subpage.about_subpage.title") }}
                        </div>
                    </button>
                    <button
                    :class="{subpage_isSelected:subpageSelected_judge[2],subpage_unSelected:!subpageSelected_judge[2]}"
                        @click="changeSubButton(2)"
                    >
                        <div
                            class="button_text"
                            :data-text="$t('views.main_page.others_subpage.preference_subpage.title')"
                        >
                            {{ $t("views.main_page.others_subpage.preference_subpage.title") }}
                        </div>
                    </button>
                </div>
                <threeSubpage
                    :subpageSelected="subpageSelected_judge"
                ></threeSubpage>
            </div>
        </template>
    </defaultShutters>
</template>
<script>
import threeSubpage from "@/views/othersSubpage/components/threeSubpage.vue";
import defaultShutters from "@/components/shutter/defaultShutter.vue";
export default {
    data() {
        return {
            subpageSelected_judge: [true, false, false],
        };
    },
    methods: {
        changeSubButton(page) {
            this.subpageSelected_judge.forEach((element, index)=>{
                this.subpageSelected_judge[index] = index === page ? true : false;
            });
        },
        leaveShutter(){
            this.$emit("leaveOtherShower");
        }
    },
    components: {
        threeSubpage,
        defaultShutters,
    },
};
</script>

<style>
.subpageSelect {
    position: relative;
    width: 84%;
    height: 10%;
    left: 8%;
    top: 0;
    /* border: solid 1px red; */
    display: flex;
    flex-direction: row;
    pointer-events: all;
    z-index: 100;
}
.subpage_isSelected {
    width: 33.3%;
    height: 100%;
    cursor: pointer;
    border: var(--subpage-button-selected-border);
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    background-color: var(--subpage-button-selected-background-color);
    position: relative;
    color: var(--subpage-button-selected-color);
    /* border: none; */
}
.subpage_unSelected {
    width: 33.3%;
    height: 100%;
    cursor: pointer;
    border: var(--subpage-button-unselected-border);
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    position: relative;
    color: var(--subpage-button-unselected-color);
    background-color: var(--subpage-button-unselected-background-color);
    /* border: none; */
}
.subpage_isSelected:hover {
    /* background-color: #d5b4dc; */
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
.subpage_unSelected:hover > .button_text {
    color: var(--subpage-button-unselected-hover-color);
}
.subpage_unSelected:hover > .button_text::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-text-stroke: var(--subpage-button-webkit-text-stroke);
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
