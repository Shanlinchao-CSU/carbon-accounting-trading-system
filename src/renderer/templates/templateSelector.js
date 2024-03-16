import templates from "./templates";
/**
 * 模板选择器
 * 每一个段落都会过一遍模板选择器
 */
class TemplateSelector{
    regex_replace = /(?<!<code>){{([^{}]*?)}}/g; // 匹配最里层的{{}}里面的内容但是不匹配<code></code>里面的内容 /(?<!<code>){{([^{}]*?)}}/g
    // 这个正则表达式不能匹配{{<code>{{}}</code>}}这样的模板，还需要修改
    constructor(text){
        this.text = text.toString(); // 啥都没处理的文本
        this.pro_text = ""; // 处理完的文本
        // 需要循环处理
    }
    decode(){
        let temp = this.text;
        // console.log("t=", temp);
        this.pro_text = temp.replace(this.regex_replace, this.replaceText);
        // 检查 正则表达式匹配的是最内部的
        // 循环从内到外检查
        while(temp !== this.pro_text){
            temp = this.pro_text;
            this.pro_text = temp.replace(this.regex_replace, this.replaceText);
        }
        this.pro_text = this.pro_text.replace(/\n/g, "");
        return this.pro_text;
    }
    replaceText(match, p){
        // 选择
        // console.log("p=", p);
        for(let i = 0;i<templates.templates.length;i++){
            let temp = new templates.templates[i](p).decode();
            if(temp){
                p = temp;
                break;
            }
        }
        return p;
    }
}

export default TemplateSelector;