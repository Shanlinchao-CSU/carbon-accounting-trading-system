import Template from "../../template";

class TableTemplate extends Template {
    default_title = "你知道的太多了";
    default_color = "black";
    default_curtain_color = "white";
    constructor(text) {
        super(text, "表格");
        // 特殊的
        this.paras = this.text.split("\n"); // 分割参数
        // console.log(this.paras);
    }
    decode() {
        // 重写
        if (this.paras[0].split("|")[0] !== this.type) {
            return false;
        }
        let table = document.createElement("table");
        table.classList.add("infobox_table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        let has_thead = false;
        // 开始遍历数组
        this.paras.forEach((element, index) => {
            if (element === "") return;
            if (index === 0) {
                table.style = element.split("|")[1];
            } else {
                let temp = element.replace(/^\||\|$/g, "");
                temp = temp.trim();
                // console.log(temp);
                if (index === 1 && temp[0] === "+" && temp[1] === " ") {
                    // 设置了thead
                    let tr = document.createElement("tr");
                    tr.classList.add("infobox_tr");
                    temp = temp.slice(2); // 删除前面的+和空格
                    let paras = temp.split("|"); // 拿到每一个单元格
                    has_thead = true;
                    thead.appendChild(tr);
                    paras.forEach((element_, index_) => {
                        // 对每一个单元格做处理
                        let t_text = element_.trim();
                        let temp_ = this.getConfig(t_text);
                        // console.log(temp_);
                        let td = document.createElement("td");
                        td.classList.add("infobox_td");
                        if (temp_.config) {
                            // 有配置
                            if (temp_.t) {
                                // 标题
                                td.classList.add("infobox_title");
                            }
                            td.setAttribute("colSpan", temp_.c);
                            td.setAttribute("rowSpan", temp_.r);
                        }
                        td.innerHTML = temp_.text;
                        tr.appendChild(td);
                    });
                } else {
                    // tbody
                    let tr = document.createElement("tr");
                    tr.classList.add("infobox_tr");
                    let paras = temp.split("|"); // 拿到每一个单元格
                    tbody.appendChild(tr);
                    paras.forEach((element_, index_) => {
                        // 对每一个单元格做处理
                        let t_text = element_.trim();
                        let temp_ = this.getConfig(t_text);
                        // console.log(temp);
                        let td = document.createElement("td");
                        td.classList.add("infobox_td");
                        if (temp_.config) {
                            // 有配置
                            if (temp_.t) {
                                // 标题
                                td.classList.add("infobox_title");
                            }
                            td.setAttribute("colSpan", temp_.c);
                            td.setAttribute("rowSpan", temp_.r);
                        }
                        td.innerHTML = temp_.text;
                        tr.appendChild(td);
                    });
                }
            }
        });
        if (has_thead) {
            table.appendChild(thead);
        }
        table.appendChild(tbody);

        return table.outerHTML;
    }
    getConfig(text) {
        let paras = text.split(" ");
        // 拆分参数 获取最后一个空格分割的参数
        let config_paras = paras.pop();
        config_paras = config_paras.split("/"); // 拿到具体的参数
        // c=1 r=1 t
        let res = {
            config: false,
            c: "1",
            r: "1",
            t: false,
            text: "",
        };
        config_paras.forEach((element, index) => {
            if (element === "t") {
                // 标题
                res.config = true;
                res.t = true;
            } else {
                let elements = element.split("=");
                if (elements[0] === "c" && elements[1] !== undefined) {
                    res.config = true;
                    res.c = elements[1].toString();
                } else if (elements[0] === "r" && elements[1] !== undefined) {
                    res.config = true;
                    res.r = elements[1].toString();
                }
            }
        });
        let res_text = "";
        if (res.config) {
            paras.forEach((element, index) => {
                res_text += index === 0 ? element : " " + element;
            });
        } else {
            res_text = text;
        }
        res.text = res_text;
        return res;
    }
}

export default TableTemplate;
