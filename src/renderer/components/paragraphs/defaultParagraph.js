import Element from "../element.js";

class DefaultParagraph extends Element{
    constructor(refs, title){
        super(refs, "p", true);
        this.title = title;
        this.element.setAttribute("class", "default_paragraph");
        this.element.innerHTML = this.title;
    }
}

export default DefaultParagraph;