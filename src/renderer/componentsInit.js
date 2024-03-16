// 导入自定义标签
import DefaultTitle from "./components/titles/defaultTitle.js";
import DefaultParagraph from "./components/paragraphs/defaultParagraph.js";
import EntityLink from "./entity/entityLink.js";

window.customElements.define("entity-link", EntityLink);

class ElementSelector{
    constructor(ele_obj, refs_ele){
        this.ele_obj = ele_obj;
        this.refs_ele = refs_ele;
    }
    select(){
        if(this.ele_obj.res.type[0] === "h"){
            return new DefaultTitle(this.refs_ele, this.ele_obj.res.type, this.ele_obj.res.para[0], this.ele_obj.index);
        }else if(this.ele_obj.res.type === "p"){
            return new DefaultParagraph(this.refs_ele, this.ele_obj.res.para[0], this.ele_obj.index);
        }
    }
}
export default ElementSelector;