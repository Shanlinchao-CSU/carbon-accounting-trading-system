import { createI18n } from "vue-i18n"; // 与vue2的VueI18n使用方式不同
import enLocale from "./en"; // 导入项目中用到的英文语言包
import zhLocale from "./zh-Hans"; // 导入项目中用到的中文语言包
const i18n = createI18n({
    locale: "zh-Hans",
    globalInjection: true,
    messages:{
        "zh-Hans":zhLocale,
        en: enLocale,
    },
});
export default i18n;
