<template>
    <div class="container">
        <div class="box box--overlay d-flex flex-column">
            <div class="box-header">
                <h3 class="box-title">裁剪新的个人头像</h3>
                <p class="error-message" v-if="fileError">{{ fileError }}</p>
            </div>
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
                    <div data-crop-box class="crop-box" style="left: 0px; top: 0px; width: 400px; height: 400px;"></div>
                </div>
            </div>
            <div class="box-footer">
                <button class="upload-button" @click="onFileChange">上传头像</button>
                <button class="save-button" @click="saveImage">保存头像</button>
                <input type="file" id="file-input" accept="image/*" @change="onFileSelected" style="display: none;">
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
        };
    },
    mounted() {
        this.context = this.$refs.canvas.getContext("2d");
    },
    methods: {
        onFileChange() {
            document.getElementById("file-input").click();
        },
        onFileSelected(e) {
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
                        this.$refs.canvas.height / this.image.height,
                    );
                    this.lastX=0,
                    this.lastY=0,
                    this.translateX=0,
                    this.translateY=0;
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
            this.dragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        },
        onMouseMove(e) {
            if (!this.dragging) return;
            let newTranslateX = this.translateX + e.clientX - this.lastX;
            let newTranslateY = this.translateY + e.clientY - this.lastY;
            // Bound check...
            if (newTranslateX > 0) newTranslateX = 0;
            if (newTranslateY > 0) newTranslateY = 0;
            if (newTranslateX < this.$refs.canvas.width - this.image.width * this.scale)
                newTranslateX = this.$refs.canvas.width - this.image.width * this.scale;
            if (newTranslateY < this.$refs.canvas.height - this.image.height * this.scale)
                newTranslateY = this.$refs.canvas.height - this.image.height * this.scale;

            this.translateX = newTranslateX;
            this.translateY = newTranslateY;

            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.drawImageToCanvas();
        },
        onMouseUp(e) {
            this.dragging = false;
        },
        onWheel(e) {
            let newScale = this.scale * (e.deltaY < 0 ? 1.1 : 0.9);
            let newTranslateX = this.translateX + newScale*this.image.width;
            let newTranslateY = this.translateY + newScale*this.image.height;
            // If scaled image size is smaller than canvas size, do not scale
            if (newTranslateX  < this.$refs.canvas.width || newTranslateY < this.$refs.canvas.height)
                return;
            this.scale = newScale;
            
            this.drawImageToCanvas();
        },
        onTouchStart(e) {
            this.touches = Array.from(e.touches);
        },
        onTouchEnd(e) {
            this.touches = Array.from(e.touches);
        },
        saveImage() {
            let link = document.createElement("a");
            link.download = "image.png";
            link.href = this.$refs.canvas.toDataURL();
            link.click();
        },
    },
};
</script>

<style scoped>

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.box {
    border: 1px solid black;
    margin: auto;
    max-width: 500px;
    
    
}
.box--overlay {
    background: white;
    padding: 20px;
    border-radius: var(--borderRadius-medium, 6px);
    box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
}
.box-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #000000;
    margin-bottom: 10px;
    font-family: "FZZJ-WHJZTJW", sans-serif;
    font-weight: 10;
    color: #822269;
    font-size:20px; /* 设置字体大小为16像素 */
    letter-spacing: 10px; /* 设置字间距为2像素 */
    font-weight: 1px;
}
.box-title {
    margin: 0;
    line-height: 1;
}
.box-body {
    height: 400px;
    width: 400px;
    position: relative;
    margin: 0 auto; /* New: Center the canvas horizontally */
    margin-bottom: 20px;
}
.box-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
.error-message {
    color: red;
    font-size:1px;
    margin-bottom: 0px;
    letter-spacing: 1px; /* 设置字间距为2像素 */
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
    box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
    pointer-events: none;
}

.save-button {
    background-color: #822269; /* Green */
    align-items: center;
    border: none;
    color: white;
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
  background-color: #621b6b; /* Dark green */
}

.upload-button {
    background-color: #822269; /* Green */
    align-items: center;
    border: none;
    color: white;
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
  background-color: #621b6b; /* Dark green */
}
</style>