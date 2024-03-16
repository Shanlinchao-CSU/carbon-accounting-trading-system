import Element from "../element.js";

class DefaultTitle extends Element{
    constructor(refs, type, title, index){
        super(refs, type, true);
        this.title = title;
        this.element.setAttribute("class", "default_title");
        this.element.innerHTML = this.title;
        this.index =index;
        this.id = index.toString() + title;
        this.element.setAttribute("id", this.id);
    }
}

export default DefaultTitle;