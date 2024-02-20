import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementPlus from 'element-plus';
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import MainHeader from "@/components/common/MainHeader.vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')

app.component("MainHeader",MainHeader)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$target = "http://localhost:8080";
app.config.globalProperties.$config = {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
};
