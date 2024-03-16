import Element from "../element";
class DefaultPrompt extends Element {
    default_width = "400px";
    default_height = "200px";
    is_over_p = false;
    get_is_over_func = null;
    that_ele = null;
    timer = null;
    constructor(parent_node) {
        super(parent_node, "div");
        this.element.setAttribute("class", "prompt");
        // this.element.style.width = this.default_width;
        // this.element.style.height = this.default_height;
        this.text = ""; // 内容
        //
        this.element.innerHTML = this.text;
        let that = this;
        this.element.addEventListener(
            "mouseover",
            (function (that) {
                return function () {
                    that.mouseOver(that);
                };
            })(that)
        );
        this.element.addEventListener(
            "mouseout",
            (function (that) {
                return function () {
                    that.mouseOut(that);
                };
            })(that)
        );
    }
    setPos(x, y) {
        this.element.style.left = x.toString() + "px";
        this.element.style.top = y.toString() + "px";
    }
    setPosByPrecent(x, y) {
        this.element.style.left = x.toString() + "%";
        this.element.style.top = y.toString() + "%";
    }
    setText(text) {
        this.text = text; // 内容
        this.element.innerHTML = this.text;
    }
    init() {}
    setGetIsOverFunc(get_is_over_func, that_ele) {
        this.get_is_over_func = get_is_over_func;
        this.that_ele = that_ele;
    }
    getIsOver() {
        return this.is_over_p;
    }
    mouseOver(that) {
        console.log("prompt over");
        clearTimeout(that.timer);
        that.is_over_p = true;
    }
    mouseOut(that) {
        console.log("prompt out");
        that.is_over_p = false;
        clearTimeout(that.timer);
        that.timer = setTimeout(() => {
            let is_over = that.that_ele.getIsOver();
            if (!is_over) {
                that.remove();
            }
        }, 50);
    }
}

export default DefaultPrompt;
