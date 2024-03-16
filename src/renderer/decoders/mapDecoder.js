/**
 * 图解码器
 * 根据\n分割
 * 返回data
 */
class MapDecoder {
    default_size = 30;
    x = 600;
    y = 450;
    constructor(text) {
        this.text = text.trim(); // 去掉行首行尾的空格和换行符
        this.relations = this.text.split("\n"); // 其实这里的\n是不对{{}}包裹的分割的，但是正则表达式不会写（
        this.nodes_data = [];
        this.relations_data = [];
        this.categories_data = [];
        this.main_node_name = "";
        this.next_id = 0; // 新节点可用的id
    }
    decode() {
        // 根据 = 分割
        let every_data = [];
        this.relations.forEach((element, index) => {
            element = element.replace(/\[|\]/g, ""); // 删除[]
            if (index === 0 && element.indexOf("=") === -1) {
                // 匹配主实体
                // index === 0时可能不是主实体，也有可能是关系
                // 先简单写了，之后这里要改
                this.main_node_name =
                    element.split("|").length === 2
                        ? element.split("|")[1]
                        : element;
                let id = element.split("|").length === 2 ? element.split("|")[0] : "";
                this.createNode(this.main_node_name, "主实体", id);
            } else {
                every_data = element.split("=");
                let cata = every_data[1]; // 分类
                let data = every_data[2]; // 文字内容
                let from = every_data[3] === undefined ? "" : "AI编写、未校验";
                data = from === "" ? data : data + "<br>" + from;
                let nodes = every_data[0].split("--");
                let node_from = nodes[0];
                let node_to = nodes[1];
                let from_id = node_from.split("|").length === 2 ? node_from.split("|")[0] : "";
                let to_id = node_to.split("|").length === 2 ? node_to.split("|")[0] : "";
                node_from =
                    node_from.split("|").length === 2
                        ? node_from.split("|")[1]
                        : node_from;
                node_to =
                    node_to.split("|").length === 2
                        ? node_to.split("|")[1]
                        : node_to;
                let has_node_from = false;
                let has_node_to = false;
                for (let i = 0; i < this.nodes_data.length; i++) {
                    // 检查实体是否存在
                    if (has_node_from && has_node_to) break;
                    if (this.nodes_data[i].name === node_from) {
                        has_node_from = true;
                    }
                    if (this.nodes_data[i].name === node_to) {
                        has_node_to = true;
                    }
                }
                // 不存在就插入
                if (!has_node_from) {
                    this.createNode(node_from, cata, from_id);
                }
                if (!has_node_to) {
                    this.createNode(node_to, cata, to_id);
                }
                // 创建联系
                this.createLink(node_from, node_to, data);
            }
        });
        // console.log(this.nodes_data);
        let res = {
            nodes: this.nodes_data,
            links: this.relations_data,
            categories: this.categories_data,
        };
        return {
            res: res,
            name: this.main_node_name,
        };
    }
    createNode(name, cata, node_id) {
        // console.log(name);
        let t_node = {
            id: "0",
            name: "",
            symbolSize: this.default_size,
            x: 0,
            y: 0,
            value: 10,
            category: 0,
            node_id:""
        };
        let t_cata = {
            name: "",
        };
        let id = this.next_id.toString();
        this.next_id++;
        t_node.id = id;
        t_node.name = name;
        t_node.node_id = node_id;
        if (cata !== "主实体") {
            let cata_index = -1;
            this.categories_data.forEach((element, index) => {
                if (element.name === cata) {
                    cata_index = index;
                }
            });
            if (cata_index === -1) {
                // 插入新的
                cata_index = this.categories_data.length;
                t_cata.name = cata;
                this.categories_data.push(t_cata);
            }
            let x = Math.floor(-this.x + Math.random() * (this.x * 2));
            let y = Math.floor(-this.y + Math.random() * (this.y * 2));
            t_node.x = x;
            t_node.y = y;
            t_node.category = cata_index;
            this.nodes_data.push(t_node);
        } else {
            t_cata.name = cata;
            this.categories_data.push(t_cata);
            this.nodes_data.push(t_node);
        }
    }
    createLink(from, to, data) {
        let t_link = {
            source: "",
            target: "",
            data: "",
        };
        let from_id = this.nodes_data.find((element) => {
            return element.name === from;
        }).id;
        let to_id = this.nodes_data.find((element) => {
            return element.name === to;
        }).id;
        t_link.source = from_id;
        t_link.target = to_id;
        t_link.data = data;
        let has_link = this.relations_data.find((element) => {
            return (
                (element.source === from_id && element.target === to_id) ||
                (element.source === to_id && element.target === from_id)
            );
        });
        if (has_link === undefined) {
            // 不存在此连接
            this.relations_data.push(t_link);
        }
    }
}

export default MapDecoder;
