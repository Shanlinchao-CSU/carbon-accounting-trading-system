<template>
    <div class="c_guide_subpage_container" ref="container">
        <div class="select_type">
            <div
                v-for="(item, index) in son_pages_name"
                :key="index"
                class="page_nav"
                :class="{ page_nav_selected: son_pages[index] }"
                @click="clickNav(index)"
            >
                {{ item }}
            </div>
        </div>
        <div
            style="
                position: relative;
                /* border: 1px solid red; */
                width: 100%;
                height: calc(100% - 30px);
                display: flex;
                overflow: hidden;
            "
        >
            <div ref="son_0" class="son_subpage">
                <h1 class="c_guide_subpage_title" title="指导视频">指导视频</h1>
                <div class="video-container">
                    <video controls ref="videoPlayer">
                        <source src="./resource/test.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <h1 class="c_guide_subpage_title">
                    您的企业类型是:{{ company_type_name }}
                </h1>
                <el-link style="font-size: 20px;color: rgb(139,48,157);" :href="guide_url">
                    点此获取指导材料
                </el-link>
            </div>
        </div>
    </div>
</template>
<script>
import textInput from "@/components/inputs/textInput/textInput.vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import Storage from "@/assets/js/storage/storage.js";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import connector from "@/assets/js/connector/connector";
import Checker from "@/assets/js/checker/checker.js";
import modelSelect from "@/components/selects/borderSelect/modelSelect.vue";
import store from "@/store/index.js";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    data() {
        return {
            son_pages: [true, false],
            son_pages_name: ["碳核算指导视频", "碳核算指导材料"],
            guide_video_config: {
                videoUrl: "./resource/test.mp4",
                posterUrl: "https://www.w3school.com.cn/i/movie.jpg",
                volume: 0.5,
                autoplay: true,
                controls: true,
            },
            guide_url: "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1429",
            company_type_name: "发电企业",
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        clickNav(index) {
            if (index === 1) {
                this.videoPause();
            }
            this.son_pages = [false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        videoPause() {
            // const videoPlayer = this.$refs.videoPlayer;
            // if (videoPlayer.paused){
            //     return;
            // }
            // videoPlayer.pause();
        },
        videoDelete() {
            // const videoPlayer = this.$refs.videoPlayer;
            // videoPlayer.style.display = "none";
            // console.log("删除");
        },
        videoAppear() {
            // const videoPlayer = this.$refs.videoPlayer;
            // videoPlayer.style.display = "block";
        },
    },
    mounted() {
        let enterprisetype = Storage.get("enterprisetype");//存在本地数据库
        switch (enterprisetype) {
            case 1: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1429";
                this.type_name = "发电企业";
                return;
            }
            case 2: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1430";
                this.type_name = "电网企业";
                return;
            }
            case 3: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1438";
                this.type_name = "钢铁生产企业";
                return;
            }
            case 4: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1431";
                this.type_name = "化工生产企业";
                return;
            }
            case 5: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1432";
                this.type_name = "电解铝生产企业";
                return;
            }
            case 6: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1433";
                this.type_name = "镁冶炼企业";
                return;
            }
            case 7: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1434";
                this.type_name = "平板玻璃生产";
                return;
            }
            case 8: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1435";
                this.type_name = "水泥生产企业";
                return;
            }
            case 9: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1436";
                this.type_name = "陶瓷生产企业";
                return;
            }
            case 10: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1437";
                this.type_name = "民航企业";
                return;
            }
            default: {
                this.guide_url =
                    "https://zfxxgk.ndrc.gov.cn/web/fileread.jsp?id=1429";
                this.type_name = "发电企业";
                return;
            }
        }
    },
    components: {
        textInput,
        dialogAvatarBox,
        linePrompt,
        modelSelect,
    },

    created() {},
};
</script>

<style scoped>
.select_type {
    user-select: none;
    position: relative;
    display: flex;
    border-bottom: 2px solid #8222966f;
    width: 100%;
    height: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}
.c_guide_subpage_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.c_guide_subpage_title {
    /* background-color: red; */
    width: 100%;
    position: relative;
    font-weight: 600;
    overflow: hidden;
    font-size: 25px;
}
.page_nav {
    cursor: pointer;
    padding: 0px 10px 0px 10px;
    border-left: 1px solid #822296;
    border-right: 1px solid #822296;
    color: rgba(0, 0, 0, 0.679);
    font-size: 17px;
    transition: all 0.1s linear;
}
.page_nav_selected {
    transition: all 0.1s linear;
    color: #822296;
}
.video-container {
    /* border: solid 1px red; */
    width: 80%; /* 设置视频容器的宽度 */
    height: 80%; /* 设置视频容器的高度 */
}

video {
    width: 100%; /* 设置视频元素的宽度为父容器的宽度 */
    height: 100%; /* 设置视频元素的高度为父容器的高度 */
}
.son_subpage {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-out;
    /* border: 1px solid red; */
}
</style>
