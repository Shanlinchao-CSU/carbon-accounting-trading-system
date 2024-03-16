import API from "./api.js";
class XMLConnector {
    /* 
                url: API 的 url
                    必填
                method: 调用方法 "GET" 或者 "POST"
                    必填
                msg:传入的数据 建议key值应该为字符串 格式为 [[key0, value0], [key1, value1]]
                    如GET方法想传递信息 ../url?name=lihua&sex=0 则msg为: [["name", "lihua"], ["sex", 0]]
                    不需要填null
                func_callback:获取数据之后的回调函数 回调函数格式应该为 func_callback(result_msg) 会返回获取到的信息
                    result_msg 类型为回调信息的类型
                    不需要填null
                func_wating:发送请求、接收到结果、超时，都会调用此函数 一次发送请求中 超时和接收到结果只会调用一次
                    func_wating函数格式应该为 func_wating(is_wating) is_wating 类型为bool
                    发送请求会调用func_wating(true) 接收到结果、超时会调用func_wating(false)
                    不需要填null
                func_timeout:超时会调用此函数 调用方式为:func_timeout() 没有入参
                    不需要填null
                可用方法:
                    send()  发出请求
                    setTimeOut(time_out)  设置超时时间 单位为ms 默认为500ms
            */
    time_out = 5000; // ms
    is_wating = false;
    timer = null;
    constructor(url, method, msg, func_callback, func_wating, func_timeout) {
        this.url = url;
        this.method = method;
        this.msg = msg; // [[key0, value0], [key1, value1]]
        this.func_callback = func_callback;
        this.func_wating = func_wating;
        this.func_timeout = func_timeout;
        this.xml_http = new XMLHttpRequest();
    }
    setTimeout(time_out) {
        this.time_out = time_out;
    }
    send() {
        let this_ = this;
        this.xml_http.onreadystatechange = (function (this_) {
            return function () {
                if (
                    this_.xml_http.readyState === 4 &&
                    this_.xml_http.status === 200
                ) {
                    if (!this_.is_wating) return; // 已经超时
                    this_.is_wating = false;
                    if (
                        this_.func_wating != null &&
                        this_.func_wating !== undefined
                    ) {
                        this_.func_wating(false); // 传入false 代表结束
                    }
                    if (
                        this_.func_callback != null &&
                        this_.func_callback !== undefined
                    ) {
                        console.log(this_.xml_http.responseText);
                        let temp = this_.xml_http.responseText;
                        this_.func_callback(JSON.parse(temp));
                    }
                }
            };
        })(this_);
        if (this.method === "POST") {
            this.xml_http.open("POST", this.url, true);
            this.xml_http.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded;charset=utf-8"
            );
            if (this.msg != null && this.msg !== undefined)
                this.xml_http.send(this.msgToStr());
            else this.xml_http.send();
        } else if (this.method === "GET") {
            if (this.msg != null && this.msg !== undefined)
                this.xml_http.open(
                    "GET",
                    this.url + "?" + this.msgToStr(),
                    true
                );
            else this.xml_http.open("GET", this.url, true);
            this.xml_http.send();
        }
        this.is_wating = true;
        if (this_.func_wating != null && this_.func_wating !== undefined) {
            this_.func_wating(true); // 传入true 代表开始
        }
        this.setTimer(); // 设置超时计时器
    }
    msgToStr() {
        let str = "";
        for (let i = 0; i < this.msg.length; i++) {
            if (i !== 0) str += "&";
            str += this.msg[i][0].toString() + "=" + this.msg[i][1].toString();
        }
        return str;
    }
    setTimer() {
        let this_ = this;
        this.timer = setTimeout(
            (function (this_) {
                return function () {
                    if (!this_.is_wating) return;
                    else {
                        this_.is_wating = false;
                        if (
                            this_.func_wating != null &&
                            this_.func_wating !== undefined
                        ) {
                            this_.func_wating(false); // 传入false 代表结束
                        }
                        if (
                            this_.func_timeout != null &&
                            this_.func_timeout !== undefined
                        ) {
                            this_.func_timeout(); // 超时
                        }
                    }
                };
            })(this_),
            this.time_out
        );
    }
}

const send = (
    api_name,
    msg,
    func_callback,
    func_wating,
    func_timeout,
    time_out
) => {
    let xml = new XMLConnector(
        API.API.host + API.API.port + api_name,
        "POST",
        msg,
        func_callback,
        func_wating,
        func_timeout,
        time_out
    );
    if (time_out != null && time_out !== undefined) xml.setTimeout(time_out);
    xml.send();
};

const sendByUrl = (
    url,
    method,
    msg,
    func_callback,
    func_wating,
    func_timeout,
    time_out
) => {
    let xml = new XMLConnector(
        url,
        method,
        msg,
        func_callback,
        func_wating,
        func_timeout,
        time_out
    );
    if (time_out != null && time_out !== undefined) xml.setTimeout(time_out);
    xml.send();
};

export default {
    send,
    sendByUrl
};