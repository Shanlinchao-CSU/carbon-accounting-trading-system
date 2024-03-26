<template>
  <router-view></router-view>
</template>
<script>
import Storage from "@/assets/js/storage/storage.js";
import autofit from "autofit.js"
// const debounce = (fn, delay) => {
//   let timer = null;
//   return function () {
//     let context = this;
//     let args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//     }, delay);
//   };
// };
//
// const _ResizeObserver = window.ResizeObserver;
// window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
//   constructor(callback) {
//     callback = debounce(callback, 16);
//     super(callback);
//   }
// };
export default {
  mounted() {
    this.$i18n.locale = Storage.get(0, "LANGUAGE", "zh-Hans");
    autofit.init({resize:false})
  },
};
</script>
