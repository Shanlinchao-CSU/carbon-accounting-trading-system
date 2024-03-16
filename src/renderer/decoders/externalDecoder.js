import TitleDecoder from "./decoders/titleDecoder";
import ParagraphDecoder from "./decoders/paragraphDecoder";
/**
 * 实体解码器
 * 根据\n分割
 */
class ExternalDecoder{
    decode_res = [];
    constructor(text){
        this.text = text;
        this.text = this.text.replace(/^\n+|\n+$/g, "");
        this.text = this.text.replace(/^\s+|\s+$/g, "");
        this.text_arr = this.text.split("\n");
        this.text_arr.forEach((element, index) => {
            this.text_arr[index] = element.replace(/^\s+|\s+$/g, "");
        });
    }
    pushToRes(temp){
        if(temp.success){
            this.decode_res.push(temp);
            return true;
        }
        return false;
    }
    decode(){
        this.text_arr.forEach((element, index)=>{
            let t = element.split("=");
            let temp = null;
            switch(t[0]){
                case "TITLE":
                case "title":
                    temp = new TitleDecoder("= " + element + " =").decode(index); //
                    break;
            }
            if(this.pushToRes(temp)) return;
            temp = new ParagraphDecoder(element, index); //
            if(this.pushToRes(temp)) return;
        });
        return this.decode_res;
    }
}

export default ExternalDecoder;