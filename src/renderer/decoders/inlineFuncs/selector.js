import textFunc from "./text";
import quoteFunc from "./quote";

const selector = (text) => {
    // console.log(text);
    // 定义一个函数来处理匹配到的字符串
    function replaceFunc(match, p) {
        // console.log(p);
        if (p === "") return false;
        switch (p.split(/(?<!{{[^}]*?)\|/g)[0]) {
            case "文本":
                // p = textFunc(p);
                break;
            case "引用":
                p = quoteFunc(p);
                break;
        }
        return p;
    }

    // 使用正则表达式和函数来替换字符串
    let result = text.replace(/{{([^{}]*?)}}/g, replaceFunc); //  /{{([^{}]*?)}}/g
    let temp = text;
    // console.log(result);
    // console.log(text);
    // 检查内嵌 回溯处理
    while(result !== temp){
        // console.log(result);
        temp = result;
        result = result.replace(/{{([^{}]*?)}}/g, replaceFunc);
    }
    return result;
};

export default selector;
