import TemplateSelector from "@/renderer/templates/templateSelector";
import Entity from "@/renderer/entity/entity";
/**
 * 判断是不是title，是还返回title的数据
 */

class TitleDecoder {
    constructor(text) {
        this.text = text;
    }
    decode(index) {
        let res = {
            index:index,
            success: false,
            res: {
                type: "",
                para: [""],
            },
        };
        let arr = this.text.split(" ");
        if (
            arr[0].length === arr[arr.length - 1].length &&
            (arr[0].match(/=/g) || []).length ===
                (arr[arr.length - 1].match(/=/g) || []).length
        ) {
            if (arr[0].length === (arr[0].match(/=/g) || []).length) {
                let l = arr[0].length.toString();
                l = l > 6 ? 6 : l;
                res.success = true;
                res.res.type = "h" + l;
                arr.forEach((element, index) => {
                    if (index === 0 || index === arr.length - 1) {
                        return;
                    }
                    if (index >= 2) {
                        res.res.para[0] += " ";
                    }
                    res.res.para[0] += element;
                });
            }
        }
        res.res.para[0] = new TemplateSelector(res.res.para[0]).decode();
        res.res.para[0] = new Entity("as").decodeText(res.res.para[0]);
        return res;
    }
}

export default TitleDecoder;
