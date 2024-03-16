class Template{
    /*
    父类
    <p>/(?&lt;!<f>)(?!</f>)(|)/g</p>
    */
    regex_split = /\|(?![^<]*<\/code>)/g; // 根据|分割字符串，但不匹配<code></code>中的|
    constructor(text, type){
        this.type = type;
        this.text = text; // 文本，两边不包含{{}}
        this.paras = this.text.split(this.regex_split); // 分割参数
    }
    decode(){
        // 必须要重写，但是必须包含以下
        if(this.paras[0] !== this.type){
            return false;
        }
    }
}

export default Template;