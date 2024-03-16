<template>
    <div class="avatarUpload-container" :class="{pointer: is_unmounted}">
        <div class="box box--overlay d-flex flex-column">
            <div class="box-header">
                <div class="header-content">
                    <h3 class="box-title">裁剪新的个人头像</h3>
                    <button class="close-button" @click="leaveAvatarCropping">
                        ×
                    </button>
                </div>
            </div>
            <p class="error-message" v-if="fileError">{{ fileError }}</p>
            <div class="box-body overflow-auto">
                <!-- <p v-if="fileError" class="error-message">{{ fileError }}</p> -->
                <div class="box-container">
                    <canvas
                        ref="canvas"
                        width="400"
                        height="400"
                        @mousedown="onMouseDown"
                        @mousemove="onMouseMove"
                        @mouseup="onMouseUp"
                        @mouseleave="onMouseUp"
                        @wheel="onWheel"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                        @touchend="onTouchEnd"
                    ></canvas>
                    <div
                        data-crop-box
                        class="crop-box"
                        style="left: 0px; top: 0px; width: 400px; height: 400px"
                    ></div>
                </div>
            </div>
            <div class="box-footer">
                <button class="upload-button" @click="onFileChange">
                    选择头像
                </button>
                <button class="save-button" @click="saveImage">保存头像</button>
                <linePrompt
                    :opacity="error"
                    style="width: 260px; position: absolute; top: -20%"
                    :data_left="error"
                    :type="prompt_type"
                ></linePrompt>
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    @change="onFileSelected"
                    style="display: none"
                />
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/assets/js/utils.js";
import connector from "@/assets/js/connector/connector";
import store from "@/store/index.js";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import code from "@/assets/js/code/code";
export default {
    components: {
        linePrompt,
    },
    data() {
        return {
            context: null,
            image: null,
            dragging: false,
            lastX: 0,
            lastY: 0,
            scale: 1,
            translateX: 0,
            translateY: 0,
            touches: [],
            fileError: "",
            can_save: false,
            avatar_base64: "",
            error: "",
            prompt_type: "default",
            is_unmounted:false
        };
    },
    mounted() {
        this.context = this.$refs.canvas.getContext("2d");
        this.image = this.createWhiteImage(); // Replace with your own base64-encoded white image
        this.drawImageToCanvas();
    },
    props: ["exit"],
    methods: {
        leaveAvatarCropping() {
            if (!store.state.can_click_button) return;
            this.is_unmounted = true;
            try {
                this.exit();
            } catch {
                //
            }
        },
        createWhiteImage() {
            let canvas = document.createElement("canvas");
            canvas.width = 400;
            canvas.height = 400;
            let context = canvas.getContext("2d");
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            return canvas;
        },
        onFileChange() {
            if (!store.state.can_click_button) return;
            this.$emit("uploadAvatarCropping");
            console.log("uploadAvatarCropping");
            document.getElementById("file-input").click();
        },
        onFileSelected(e) {
            this.can_save = true;
            let file = e.target.files[0];
            if (file.size > 3000000) {
                this.fileError = "文件大小超过3MB。请选择较小的文件。";
                return;
            }
            this.fileError = "";
            let reader = new FileReader();

            reader.onload = (e) => {
                this.image = new Image();
                this.image.onload = () => {
                    this.scale = Math.max(
                        this.$refs.canvas.width / this.image.width,
                        this.$refs.canvas.height / this.image.height
                    );
                    this.drawImageToCanvas();
                };
                this.image.src = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        drawImageToCanvas() {
            let canvas = this.$refs.canvas;
            let context = this.context;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.translate(this.translateX, this.translateY);
            context.scale(this.scale, this.scale);
            context.drawImage(
                this.image,
                0,
                0,
                this.image.width,
                this.image.height
            );
            context.restore();
            // this.drawCircle();
        },
        onMouseDown(e) {
            if(this.is_unmounted) return;
            this.dragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        },
        onMouseMove(e) {
            if(this.is_unmounted) return;
            if (!this.dragging) return;
            let newTranslateX = this.translateX + e.clientX - this.lastX;
            let newTranslateY = this.translateY + e.clientY - this.lastY;
            // Bound check...
            if (newTranslateX > 0) newTranslateX = 0;
            if (newTranslateY > 0) newTranslateY = 0;
            if (
                newTranslateX <
                this.$refs.canvas.width - this.image.width * this.scale
            )
                newTranslateX =
                    this.$refs.canvas.width - this.image.width * this.scale;
            if (
                newTranslateY <
                this.$refs.canvas.height - this.image.height * this.scale
            )
                newTranslateY =
                    this.$refs.canvas.height - this.image.height * this.scale;

            this.translateX = newTranslateX;
            this.translateY = newTranslateY;

            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.drawImageToCanvas();
        },
        onMouseUp(e) {
            if(this.is_unmounted) return;
            this.dragging = false;
        },
        onWheel(e) {
            if(this.is_unmounted) return;
            let newScale = this.scale * (e.deltaY < 0 ? 1.1 : 0.9);
            let newTranslateX = this.translateX + newScale * this.image.width;
            let newTranslateY = this.translateY + newScale * this.image.height;
            // If scaled image size is smaller than canvas size, do not scale
            if (
                newTranslateX < this.$refs.canvas.width ||
                newTranslateY < this.$refs.canvas.height
            )
                return;
            this.scale = newScale;

            this.drawImageToCanvas();
        },
        onTouchStart(e) {
            if(this.is_unmounted) return;
            this.touches = Array.from(e.touches);
        },
        onTouchEnd(e) {
            if(this.is_unmounted) return;
            this.touches = Array.from(e.touches);
        },
        saveImage() {
            if (!store.state.can_click_button) return;
            if (!this.can_save) return;
            let avatar = this.$refs.canvas.toDataURL();
            this.avatar_base64 = avatar;
            let user_msg = utils.getUserMsg();
            let id = user_msg.id;
            let token = utils.getToken();
            id = id.toString();
            if(token === undefined) token = "tokenIsNone";
            console.log(id);
            console.log(token);
            console.log("avatarUpload", avatar);
            let link = document.createElement("a");
            link.download = "image.png";
            link.href = avatar;
            // link.click();
            avatar = code.Base64.encode(avatar);
            console.log("发送", avatar);
            connector.send(
                [id, token, avatar],
                "updateAvatar",
                this.saveImageCallback,
                this.saveImageWaiting,
                this.saveImageTimeout
            );
        },
        saveImageCallback(msg) {
            if (msg.success) {
                this.prompt_type = "success";
                this.error = "上传成功";
                let user_msg = utils.getUserMsg();
                user_msg.avatar = this.avatar_base64;
                utils.saveUserMsg(user_msg);
            } else {
                this.prompt_type = "error";
                this.error = "上传失败";
            }
        },
        saveImageWaiting(is_waiting) {
            if (is_waiting) {
                store.state.can_click_button = false;
                this.prompt_type = "waiting";
                this.error = "上传中";
            }else{
                store.state.can_click_button = true;
                this.prompt_type = "default";
                this.error = "";
            }
        },
        saveImageTimeout() {
            this.prompt_type = "error";
            this.error = "上传失败";
        },
    },
};
</script>

<style scoped>
.avatarUpload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-y: auto;
}
.pointer{
    pointer-events: none;
}
.box {
    border: 1px solid black;
    margin: auto;
    max-width: 500px;
}
.box--overlay {
    background: var(--box--overlay--background-color);
    padding: 20px;
    border-radius: var(--borderRadius-medium, 6px);
    box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
}
.box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--box-header-bottom-border-color);
    margin-bottom: 10px;
    font-family: "FZZJ-WHJZTJW", sans-serif;
    font-weight: 10;
    color: var(--box-header-color);
    font-size: 20px;
    letter-spacing: 10px;
}
.header-content {
    display: flex;
    align-items: center;
}
.box-title {
    margin: 0;
    line-height: 1;
    margin-left: 65px;
}
.box-body {
    /* border: 1px solid red; */
    height: 400px;
    width: 400px;
    position: relative;
    margin: 0 auto; /* New: Center the canvas horizontally */
    margin-bottom: 20px;
}
.box-footer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.box-container {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 400px;
    height: 400px;
    overflow: hidden;
    border-radius: var(--borderRadius-medium, 6px);
}

.crop-box {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px dashed #fff;
    cursor: move;
    border-radius: 50%;
    box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);/* 正方形减圆 */
    pointer-events: none;
}

.save-button {
    margin: 20px;
    background-color: var(--upload-button-background-color); /* Green */
    align-items: center;
    border: none;
    color: var(--upload-button-font-color);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: var(--borderRadius-medium, 6px);
    margin-right: 30px;
    font-family: "FZZJ-WHJZTJW", sans-serif;
    font-weight: 10;
}

.save-button:hover {
    background-color: var(--upload-button-hover-background-color); /* Dark green */
    color: var(--upload-button-hover-font-color);
}

.upload-button {
    margin: 20px;
    background-color: var(--upload-button-background-color); /* Green */
    align-items: center;
    border: none;
    color: var(--upload-button-font-color);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: var(--borderRadius-medium, 6px);
    margin-left: 30px;
    font-family: "FZZJ-WHJZTJW", sans-serif;
    font-weight: 10;
}

.upload-button:hover {
    background-color: var(--upload-button-hover-background-color); /* Dark green */
    color: var(--upload-button-hover-font-color);
}
.close-button {
    background: none;
    border: none;
    color: #822269;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin-left: 30px;
}

.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}
</style>
