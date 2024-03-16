import TitleDecoder from "./decoders/titleDecoder";
import ParagraphDecoder from "./decoders/paragraphDecoder";
/**
 * 主体解码器
 * 主体解码器的作用是根据\n\n分割段落
 */
class BodyDecoder{
    decode_res = [];
    constructor(text){
        this.text = text;
        this.text = this.text.trim(); // 去掉首尾空格和换行符
        this.text_arr = this.text.split("\n\n"); // 根据\n\n分割段落
        this.text_arr.forEach((element, index) => {
            this.text_arr[index] = element.trim(); // 去掉首尾空格和换行符
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
            let temp = new TitleDecoder(element).decode(index);
            if(this.pushToRes(temp)) return;
            temp = new ParagraphDecoder(element).decode(index);
            if(this.pushToRes(temp)) return;
        });
        return this.decode_res;
    }
}

export default BodyDecoder;