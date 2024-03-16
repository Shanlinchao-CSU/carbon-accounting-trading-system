"use strict";
import { API_CHECKER } from "../connector/api.js";
const ZH_HANS = 0; // 汉字编号
const EN = 1; // 英文编号
/**
 * 字符串检查器
 * @param {String} str 待检查的字符串
 * @param {Array} check_methods 字符串的检查方法
 */
class Checker {
    success = true;
    checker_eval = {
        "ignore": "ignore()",
        "no-zh-Hans": "noneLang(ZH_HANS)",
        "no-en": "noneLang(EN)",
        "no-base-symbols": "noneBaseSymbols()",
        "sql-check":"sqlCheck()",
        "no-spacing":"noSpacing()",
        "no-number":"noNumber()",
        "no-null":"noNull()",
        "is-email":"isEmail()",
        "is-num":"isNum()",
        "no-only-spacing":"noOnlySpacing()"
    };
    checker_data = {
        base_symbols: ["<", ">", "{", "}", "[", "]", "~", "`", "^", "(", ")","+"],
    };
    constructor(str, check_methods) {
        this.str = str;
        this.check_methods = check_methods;
    }
    /**
     * 进行字符串检查
     */
    check() {
        let checker = this;
        this.check_methods.forEach((element) => {
            if (!checker.success) return;
            let check_func = checker.checker_eval[element];
            if(check_func!==undefined)
                checker.success = eval("checker." + checker.checker_eval[element]);
            else{
                checker.success = checker.funcCheck(element);
            }
        });
        return this.success;
    }
    /**
     *
     * 跳过检查
     * @returns true
     */
    ignore() {
        return true;
    }
    /**
     * 检查是否不存在某种语言
     * @param {int} lang 不存在的语言的编号
     * @returns 是否不存在某种语言
     */
    noneLang(lang) {
        if (lang === 0) return !/.*[\u4e00-\u9fa5]+.*$/.test(this.str);
        else if (lang === 1) return !/.*[A-Za-z]+.*$/.test(this.str);
    }
    /**
     * 检查是否不存在基础字符
     * @returns 是否不存在基础字符
     */
    noneBaseSymbols() {
        let checker = this;
        let success = true;
        this.checker_data.base_symbols.forEach((element) => {
            if (!success) return;
            if (checker.str.indexOf(element) !== -1) success = false;
        });
        return success;
    }
    /**
     * 检查是否不存在sql注入
     * @returns 是否不存在sql注入
     */
    sqlCheck() {
        // let checker = this;
        let success = true;
        let sql_key_words =
            "select ,union ,asc ,desc ,in ,like ,into ,exec ,from ";
        sql_key_words +=
            ",update ,insert ,delete ,count ,asc( ,char( ,chr( ,drop ,table ,truncat ";
        sql_key_words += ",mid( ,abs( ,= ,-- ,<script ,/script ";
        sql_key_words +=
            ",where ,join ,create ,alter ,cast ,exists ,; , or , and ,order by ,group by ";
        //分割成数组
        let sqls = sql_key_words.split(",");
        let t_str = this.str.toLowerCase();
        sqls.forEach((element) => {
            if (!success) return;
            if (t_str.indexOf(element) !== -1) success = false;
        });
        return success;
    }
    /**
     * 检查字符串是否不存在空格
     * @returns false:存在空格
     */
    noSpacing() {
        if(this.str.indexOf(" ")!==-1) return false;
        else return true;
    }
    /**
     * 检查字符串是否不存在数字
     * @returns false:存在数字
     */
    noNumber() {
        return !/\d/.test(this.str);
    }
    /**
     * 检查字符串是不是空字符串
     * @returns false:空
     */
    noNull(){
        return this.str!=null&&this.str.length!==0&&this.str!==undefined;
    }
    /**
     * 检查字符串是不是email
     * @returns false:不是email的合法地址
     */
    isEmail(){
        if((this.str == null) || (this.str.length < 2)) return false ;
        // 需出现'@',且不在首字符.
        var aPos = this.str.indexOf("@" ,1) ;
        if(aPos < 0)
        {
            return false ;
        }
        // '@'后出现'.',且不紧跟其后.
        if(this.str.indexOf("." ,aPos+2) < 0)
        {
            return false ;
        }
        return true ;
    }
    /**
     * 检查字符串是不是数字
     * @returns false:含有非数字
     */
    isNum(){
        return /^[\d]+$/.test(this.str);
    }
    /**
     * 检查字符串是不是全部都是空格
     * @returns false:全是空格
     */
    noOnlySpacing(){
        return !(this.str.trim().length <= 0);
    }
    /**
     * 特殊方法检查
     * @param {string} method 
     * @returns 
     */
    funcCheck(method){
        if(method[0]!=="@")
            return true;
        else{
            let is_max = method.indexOf("max") !== -1 ? true : false;
            let is_length = method.indexOf("length") !== -1 ? true : false;
            let num = parseInt(method.substring(method.indexOf("=") + 1, method.length));
            if(is_length){
                if(is_max){
                    if(this.str.length>num) return false;
                }else{
                    if(this.str.length<num) return false;
                }
            }
        }
        return true;
    }
}

export default Checker;


/*  
    示例：
    import Checker from "@/assets/js/checker/checker.js";
    对字符串：a进行检查判断，检查其是否非空
    let success = new Checker("a", ["no-null"]).check();

    check_methods必须是数组，且一但有判断为false，之后的都不会判断

    check_methods 可以包含
    ignore 不检查 出现这个直接返回true ignore建议唯一使用（这个是我自己用的，一般用不上的）
    no-zh-Hans 没用中文汉字 存在中文汉字返回false
    no-en 没有英文 存在英文返回false
    no-base-symbols 不包含基础符号 存在 < > { } [ ] ~ ` ^ ( ) 返回false
    sql-check 检查sql注入 有sql注入危险返回false
    no-spacing 没有空格 存在空格返回false
    no-number 没有数字 存在数字返回false
    no-null 不能是空 如果是空返回false
    is-email 是合法的邮箱地址 不是合法的邮箱地址返回false
    is-num 是数字(0~9) 含有非数字返回false
    no-only-spacing 不能全是空格，当全是空格返回false
    @length-max=num 字符串长度最大是num num是int数字 例如：@length-max=20
    @length-min=num 字符串长度最小是num num是int数字 例如：@length-min=20
 */
