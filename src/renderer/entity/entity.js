/**
 * 根据文本，匹配[[]]，转换为实体
 */
class Entity{
    regex =  /\[\[([^[\]]*?)\]\]/g; // 匹配[[]]之间的内容
    constructor(prompt_parent_id){
        this.index = 0; // 实体组件id序列号
        this.text_arr = []; // 文本的历史纪录
        this.prompt_parent_id = prompt_parent_id; // 信息提示框的id
    }
    decodeText(text){
        this.text_arr.push(text);
        let temp = text;
        temp = temp.replace(this.regex, this.replaceFunc);
        // console.log(temp);
        return temp;
    }
    replaceFunc(match, p){
        // 替换函数
        let m = match;
        m = m.replace("[[", "<entity-link>");
        m = m.replace("]]", "</entity-link>");
        return m;
    }
}

export default Entity;