const 根据 = 0;
const 匹配 = 1;
const 中间的内容 = 2;
const 自己 = 3;
const 但是忽略被 = 4;
const 包围的内容 = 5;
/**
 * 处理字符串
 * methods: ["根据", ["{{", "}}"], "匹配", "中间的内容", "但是忽略被", [["<code>", "</code>"]], "包围的内容"]
 * methods: ["根据", ["acd"], "匹配", "自己", "但是忽略被", [["<code>", "</code>"]], "包围的内容"]
 * methods: ["根据", ["{{", "}}"], "匹配", "中间的内容"]
 * @param {Array} methods 处理方法
 * @param {String} str 待处理字符串
 * @param {Function} func 处理函数，会传入匹配的参数
 */
const replace = (methods, str, func) => {
    // 此函数会先写项目需要的部分
    let methods_length = methods.length;  // 获得方法的长度
    if(methods_length !== 4 || methods_length !== 7){
        return str;  // 长度不对 直接返回字符串
    }
    let match_by = methods[1];  // 根据什么进行匹配 必须是数组 长度要和后面的内容统一
    let match_position = methods[3];  // 匹配的位置
    if(match_by.length === 2 && match_position === "中间的内容"){
        // 匹配中间的内容
        let match_left = match_by[0];  // 左侧的匹配
        let match_right = match_by[1];  // 右侧的匹配
        let ignore_left = [];
        let ignore_right = [];
        let has_ignore = false;
        // 检查是不是有忽略
        if(methods_length === 7){
            // 存在忽略
            has_ignore = true;
            methods[5].forEach((element)=>{
                // 可能有多个
                ignore_left.push(element[0]);
                ignore_right.push(element[1]);
            });
        }
    }
};