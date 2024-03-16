import Template from "../../template";

class TextTemplate extends Template {
    default_title = "你知道的太多了";
    default_color = "black";
    default_curtain_color = "white";
    constructor(text) {
        super(text, "文本");
    }
    decode() {
        // 重写
        if (this.paras[0] !== this.type) {
            return false;
        }
        let span = document.createElement("span");
        let und = document.createElement("u");
        let del = document.createElement("del");
        let has_und = false;
        let has_del = false;
        span.innerHTML = this.paras[1]; // 文本内容
        span.style.color = this.default_color;
        this.paras.forEach((element, index) => {
            if (index === 0 || index === 1) {
                return;
            } else {
                let para = element.split("=");
                // console.log(para);
                switch (para[0]) {
                    case "color":
                        span.style.color =
                            para[1] !== undefined ? para[1] : this.default_color;
                        break;
                    case "weight":
                        span.style.fontWeight =
                            para[1] !== undefined ? para[1] : "500";
                        break;
                    case "und":
                        has_und = true;
                        und.style.color =
                            para[1] !== undefined ? para[1] : this.default_color;
                        break;
                    case "del":
                        has_del = true;
                        del.style.color =
                            para[1] !== undefined ? para[1] : this.default_color;
                        break;
                    case "curtain":
                        span.setAttribute("data-text", this.content);
                        span.classList.add("curtain");
                        span.title =
                            para[1] !== undefined ? para[1] : this.default_title;
                        span.style.color = this.default_curtain_color;
                        break;
                    case "title":
                        span.title = para[1] !== undefined ? para[1] : "";
                        break;
                    case "blur":
                        span.classList.add("blur");
                        span.title = para[1] !== undefined ? para[1] : "";
                        break;
                    case "size":
                        // console.log("size");
                        span.style.fontSize = para[1] !== undefined ? para[1].toString() + "px" : "16px";
                        break;
                }
            }
        });
        let res = {};
        if (has_del && has_und) {
            und.appendChild(span);
            del.appendChild(und);
            res = del;
        } else if (!has_del && has_und) {
            und.appendChild(span);
            res = und;
        } else if (has_del && !has_und) {
            del.appendChild(span);
            res = del;
        } else {
            res = span;
        }
        return res.outerHTML;
    }
}

export default TextTemplate;
