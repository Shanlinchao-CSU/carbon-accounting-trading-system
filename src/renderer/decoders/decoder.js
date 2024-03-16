import BodyDecoder from "./bodyDecoder";
import MapDecoder from "./mapDecoder";
/**
 * 文本数据解码器
 * decoder的作用是划分区域
 */
class Decoder {
    /*
    解码
    1. 先格式化代码
    2. 根据-分割出config、external、body
    */
    decode_res = [];
    constructor(text, type) {
        this.type = type.toLowerCase(); // 类型 ensy：百科 map：图
        this.text = text.toString(); // 转字符串
        this.text = this.text.trim(); // 去掉首位空格和换行符
        this.text_arr = this.text.split(/\n- .*\n/);
        this.config = this.text_arr[0];
        if (this.type === "ency") {
            this.external = this.text_arr[1];
            this.body = this.text_arr[2];
            console.log(this.text_arr);
            this.body_decoder = new BodyDecoder(this.body);
        } else if (this.type === "map") {
            this.map = this.text_arr[1];

            this.map_decoder = new MapDecoder(this.map);
        }
    }
    decode() {
        if (this.type === "ency") {
            this.decode_res = this.body_decoder.decode();
        } else if (this.type === "map") {
            this.decode_res = this.map_decoder.decode();
        }
        return this.decode_res;
    }
}

export default Decoder;
