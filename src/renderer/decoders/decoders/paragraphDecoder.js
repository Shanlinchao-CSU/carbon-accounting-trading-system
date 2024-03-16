import selector from "../inlineFuncs/selector";
import TemplateSelector from "@/renderer/templates/templateSelector";
import Entity from "@/renderer/entity/entity";
/**
 * 判断是不是p，是还返回p的数据
 */
const paragraph_ignore = ["=", "<"];
class ParagraphDecoder {
    constructor(text) {
        this.text = text;
    }
    decode(index) {
        let res = {
            index:index,
            success: false,
            res: {
                type: "p",
                para: [""],
            },
        };
        if(paragraph_ignore.indexOf(this.text[0]) === -1){
            res.success = true;
            // res.res.para[0] = selector(this.text.replace(/\n/g, ""));
            res.res.para[0] = this.text;
        }
        res.res.para[0] = new TemplateSelector(res.res.para[0]).decode();
        res.res.para[0] = new Entity("as").decodeText(res.res.para[0]);
        return res;
    }
}

export default ParagraphDecoder;
