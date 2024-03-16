/**
 * 行内函数
 */
const config = [
    {
        name:"attentions",
        attentions:[
            "type里面填写的内容是name里面的内容",
            "支持嵌套写法",
            "除了每个不可改变顺序的提示以外，参数没有先后顺序之分，也没有个数限制，后面设置的会覆盖前面的",
        ]
    },
    {
        name: "文本",
        paras: ["type", "content", "color", "size", "weight", "und", "del", "curtain", "blur", "title"],
        annotations: [
            "类型",
            "内容",
            "文本颜色",
            "文本大小",
            "文本粗细",
            "文本下划线，后面加=代表下划线颜色，默认是黑色",
            "文本删除线，设置同下划线",
            "设置遮罩，第一个参数代表鼠标提示词，默认值是：你知道的太多了",
            "设置模糊，第一个参数代表鼠标提示词，默认值是空（不显示）",
        ],
        attentions:[
            "type, content不可改变顺序",
            "当设置遮罩时，不建议给文本加入颜色",
            "不建议将模糊和遮罩一起使用（虽然不会出错",
        ],
        example:
            "这里是默认的{{文本|这是一个测试文本|color=red|siez=20|weight=800|und=rgb(0, 255, 0)|del|curtain=看啥看|blur|title=你只会看见这个}}这里是默认的",
    },
    {
        name: "引用",
        paras: ["type", "content", "from", "c_color", "c_weight", "c_size", "f_color", "f_size", "f_weight", "s_color", "no_italics"],
        annotations: [
            "类型",
            "内容",
            "来源",
            "内容文本颜色",
            "内容文本粗细",
            "内容文本大小",
            "来源文本颜色",
            "来源文本粗细",
            "来源文本大小",
            "符号文本颜色",
            "引用不为斜体"
        ],
        attentions:[
            "type, content, from不可改变顺序"
        ],
        example:"{{引用|这是一个引用，我觉得他不错|开发测试人员|c_color=red|c_weight=900|s_color=black|no_italics}}"
    },
    {
        name:"连接关系",
        parae:["type", "from", "to", "content"],
        annotations: [
            "类型",
            "实体1",
            "实体2",
            "连接线的显示词"
        ],
        attentions:["连接关系现在是"]
    }
];


export default config;