<template>
  <canvas id="code_pic" class="code_pic" :width="canvasWidth" :height="canvasHeight" @click="refresh"></canvas>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";

interface IProps {
  fontSizeMin?: number; // 字体最小值
  fontSizeMax?: number; // 字体最大值
  backgroundColorMin?: number; // 验证码图片背景色最小值
  backgroundColorMax?: number; // 验证码图片背景色最小值
  dotColorMin?: number; // 背景干扰点最小值
  dotColorMax?: number; // 背景干扰点最小值
  contentWidth?: number; // 容器宽度
  contentHeight?: number; // 容器高度
}

const props = withDefaults(defineProps<IProps>(), {
  fontSizeMin: 25,
  fontSizeMax: 35,
  backgroundColorMin: 200,
  backgroundColorMax: 220,
  dotColorMin: 60,
  dotColorMax: 120,
  contentWidth: 200,
  contentHeight: 70
})

const code = ref("")
const codes = ref("1234567890abcdefjhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

const canvasWidth = computed(() => {
  return `${props.contentWidth}px`
})

const canvasHeight = computed(() => {
  return `${props.contentHeight}px`
})

// 生成一个随机数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 生成一个随机的颜色
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const makeCode = () => {
  let tempCode = ""
  for (let i = 0;i < 4;i++){
    tempCode+=codes.value[randomNum(0,62)]
  }
  code.value = tempCode
}

const drawPic = () => {
  let canvas = document.getElementById("code_pic") as HTMLCanvasElement;
  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.textBaseline = "bottom";
  // 绘制背景
  ctx.fillStyle = "#e6ecfd";
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);
  // 绘制文字
  for (let i = 0; i < code.value.length; i++) {
    drawText(ctx, code.value[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
};

const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
  ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
  ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei"; // 随机生成字体大小
  let x = (i + 1) * (props.contentWidth / (code.value.length + 1));
  let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
  const deg = randomNum(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
};

const drawLine = (ctx: any) => {
  // 绘制干扰线
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
    ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
    ctx.stroke();
  }
};

const drawDot = (ctx: any) => {
  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
};

const refresh = () => {
  makeCode()
  drawPic()
}

onMounted(() => {
  refresh()
});

defineExpose({code,refresh})
</script>

<style scoped>

</style>