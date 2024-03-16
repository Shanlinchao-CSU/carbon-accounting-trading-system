import config from "./config.js";
/**
 * 
 * @param {string} text 文本内容（不包含{{}}）
 */
const textFunc = (text) => {
    const default_title = "你知道的太多了";
    const default_color = "black";
    const default_curtain_color = "white";
    let arr = text.split(/(?<!{{[^}]*?)\|/g);
    let content = arr[1]; // 文本内容
    let span = document.createElement("span");
    let und = document.createElement("u");
    let del = document.createElement("del");
    let has_und = false;
    let has_del = false;
    span.innerHTML = content;
    span.style.color = default_color;
    if(arr[0] !== "文本") return text;
    arr.forEach((element, index)=>{
        if(index === 0 || index === 1){
            return;
        }else{
            let para = element.split("=");
            switch(para[0]){
                case "color":
                    span.style.color = para[1] !== undefined ? para[1] : default_color;
                    break;
                case "weight":
                    span.style.fontWeight = para[1] !== undefined ? para[1] : "500";
                    break;
                case "und":
                    has_und = true;
                    und.style.color = para[1] !== undefined ? para[1] : default_color;
                    break;
                case "del":
                    has_del = true;
                    del.style.color = para[1] !== undefined ? para[1] : default_color;
                    break;
                case "curtain":
                    span.setAttribute("data-text", content);
                    span.classList.add("curtain");
                    span.title = para[1] !== undefined ? para[1] : default_title;
                    span.style.color = default_curtain_color;
                    break;
                case "title":
                    span.title = para[1] !== undefined ? para[1] : "";
                    break;
                case "blur":
                    span.classList.add("blur");
                    span.title = para[1] !== undefined ? para[1] : "";
                    break;
            }
        }
    });
    let res = {};
    if(has_del&&has_und){
        und.appendChild(span);
        del.appendChild(und);
        res = del;
    }else if(!has_del&&has_und){
        und.appendChild(span);
        res = und;
    }else if(has_del&&!has_und){
        del.appendChild(span);
        res = del;
    }else{
        res = span;
    }
    return res.outerHTML;
};

export default textFunc;