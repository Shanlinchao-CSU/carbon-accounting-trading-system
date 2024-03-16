import Template from "../../template";

class QuoteTemplate extends Template {
    default_title = "你知道的太多了";
    default_color = "black";
    default_curtain_color = "white";
    constructor(text) {
        super(text, "引用");
    }
    decode() {
        // 重写
        if (this.paras[0] !== this.type) {
            return false;
        }
        // console.log("引用");
        const default_color = "black";
        let content = this.paras[1]; // 文本内容
        let from = "——" + this.paras[2]; // 来源

        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let tr_t = document.createElement("tr");
        let tr_b = document.createElement("tr");
        let td_s_l = document.createElement("td");
        let td_s_r = document.createElement("td");
        let td_c = document.createElement("td");
        let td_f = document.createElement("td");
        let cite = document.createElement("cite");

        table.setAttribute("class", "quote_table");
        td_s_l.setAttribute("class", "quote_td_s");
        td_s_r.setAttribute("class", "quote_td_s");
        td_c.setAttribute("class", "quote_td_c");
        td_f.setAttribute("class", "quote_td_f");

        td_f.setAttribute("colspan", "3");

        td_c.innerHTML = content;
        cite.innerHTML = from;
        td_s_l.innerHTML = "“";
        td_s_r.innerHTML = "”";
        td_s_l.style.verticalAlign = "top";
        td_s_r.style.verticalAlign = "bottom";
        this.paras.forEach((element, index) => {
            if (index === 0 || index === 1 || index === 2) {
                return;
            } else {
                let para = element.split(/(?<!{{[^}]*?)=/g);
                switch (para[0]) {
                    case "c_color":
                        td_c.style.color =
                            para[1] !== undefined ? para[1] : default_color;
                        break;
                    case "c_weight":
                        td_c.style.fontWeight =
                            para[1] !== undefined ? para[1] : "500";
                        break;
                    case "c_size":
                        td_c.style.fontSize =
                            para[1] !== undefined ? para[1] + "px" : "25";
                        break;
                    case "f_color":
                        td_f.style.color =
                            para[1] !== undefined ? para[1] : default_color;
                        break;
                    case "f_weight":
                        td_f.style.fontWeight =
                            para[1] !== undefined ? para[1] : "500";
                        break;
                    case "f_size":
                        td_f.style.fontSize =
                            para[1] !== undefined ? para[1] + "px" : "15";
                        break;
                    case "s_color":
                        td_s_l.style.color =
                            para[1] !== undefined ? para[1] : default_color;
                        td_s_r.style.color =
                            para[1] !== undefined ? para[1] : default_color;
                        break;
                    case "no_italics":
                        cite.style.fontStyle = "normal";
                        break;
                }
            }
        });
        let res = {};
        tr_t.appendChild(td_s_l);
        tr_t.appendChild(td_c);
        tr_t.appendChild(td_s_r);
        tbody.appendChild(tr_t);
        td_f.appendChild(cite);
        tr_b.appendChild(td_f);
        tbody.appendChild(tr_b);
        table.appendChild(tbody);
        res = table;
        // console.log(res.outerHTML);
        return res.outerHTML;
    }
}

export default QuoteTemplate;
