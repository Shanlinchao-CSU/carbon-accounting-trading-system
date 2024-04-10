import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementPlus from 'element-plus';
import Storage from "@/assets/js/storage/storage";
import i18n from "@/assets/i18n/index.js";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .mount('#app');

(function() {
    const default_theme = {
        theme: "light",
        color: "",
        font_size: {
            base: "",
            button: "",
        },
    };
    let link_base = document.createElement("link");
    link_base.type = "text/css";
    link_base.id = "theme";
    link_base.rel = "stylesheet";
    link_base.href = "./theme/base.css";

    document.getElementsByTagName("head")[0].appendChild(link_base);
    let theme = Storage.get(0, "THEME", default_theme, "JSON");
    let link_suit = document.createElement("link");
    link_suit.type = "text/css";
    link_suit.id = "link_suit";
    link_suit.rel = "stylesheet";
    link_suit.href = theme.theme === "light" ? "./theme/light.css" : "./theme/dark.css";
    document.getElementsByTagName("head")[0].appendChild(link_suit);
})();

let $target = "http://localhost:8080/api";
let $node_target = "http://localhost:8888";
export default $target
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$target = "http://localhost:8080";
app.config.globalProperties.$config = {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
};
