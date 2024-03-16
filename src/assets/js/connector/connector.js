"use strict";
import MsgProcessing from "./msgProcessing.js";
import XML from "./xmlConnector.js";

/**
 *
 * @param {Array} msg
 * @param {string} api
 * @param {Function} func_callback
 * @param {Function} func_wating
 * @param {Function} func_timeout
 * @param {int} time_out
 * @returns false:字符串不符合规则
 */
const send = (msg, api, func_callback, func_wating, func_timeout, time_out) => {
    // console.log(msg);
    // let c = MsgProcessing.processing(msg, api);
    // if (!c) return c;
    // XML.send(
    //     c.api_name,
    //     c.api_para,
    //     func_callback,
    //     func_wating,
    //     func_timeout,
    //     time_out
    // );
    // return true;
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
    // XML.sendByUrl(
    //     url,
    //     method,
    //     msg,
    //     func_callback,
    //     func_wating,
    //     func_timeout,
    //     time_out
    // );
};
const test = (
    func_callback,
    func_wating,
    func_timeout,
    time_out,
    success,
    success_waiting,
    success_msg
) => {
    // func_wating(true);
    // if (success) {
    //     if (success_waiting) {
    //         setTimeout(() => {
    //             func_wating(false);
    //             func_callback(success_msg);
    //         }, success_waiting);
    //     } else {
    //         setTimeout(() => {
    //             func_wating(false);
    //             func_callback(success_msg);
    //         }, 1000);
    //     }
    // } else {
    //     setTimeout(() => {
    //         func_wating(false);
    //         func_timeout();
    //     }, time_out);
    // }
};
export default {
    send,
    test,
    sendByUrl
};
