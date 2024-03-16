const API = {
    host: "http://127.0.0.1",
    port: ":8000/",
    api: {
        register: "sendEmailVerification/",
        login: "login/",
        deleteAccount: "sendEmailVerification/",
        forgetPassword: "sendEmailVerification/",
        changePassword: "updateUserPassword/",
        changeEmail: "sendEmailVerification/",
        updateAvatar: "avatarSubmission/",
        updateUserMsg: "updateAccountInformation/",
        getUserMsg: "getUserMessage/",
        verify: "verifyEmailCode/",
        searchNode: "searchNode/",
        recognizeNode: "recognizeNode/",
        searchRelationship: "searchRelationshipBetween/",
        getGptAnswer: "getGptAnswer/",
        getStockAnswer: "getStockAnswer/",
        getNodeDetail:"getNodeDetail/",
        getOverview:"getOverview/",
        getNodeResume:"getNodeResume/",
        setEncyContent:"setEncyContent/",
        setMapContent:"setMapContent/",
        getStocklistAnswer:"getStocklistAnswer/",
        stockPredict:"stockPredict/"
    },
};
const API_PARA = {
    register: [
        ["email", ""],
        ["type", ""],
        ["msg", ""],
    ],
    login: [
        ["login", ""],
        ["is_id", false],
        ["password", ""],
    ],
    forgetPassword: [
        ["email", ""],
        ["type", ""],
        ["msg", ""],
    ],
    verify: [
        ["email", ""],
        ["vcode", ""],
    ],
    updateAvatar: [
        ["id", ""],
        ["token", ""],
        ["avatar", ""],
    ],
    updateUserMsg: [
        ["id", ""],
        ["name", ""],
        ["token", ""],
        ["sex", ""],
        ["occupation", ""],
        ["born_time", ""],
    ],
    searchNode: [["search_name", ""]],
    recognizeNode: [["content", ""]],
    searchRelationship: [
        ["start_node_name", ""],
        ["end_node_name", ""],
        ["method", ""],
    ],
    getGptAnswer: [["history", ""],["model",""]],
    getStockAnswer: [
        ["stock", ""],
        ["model", ""],
        ["days", ""],
        ["minute", ""]
    ],
    getNodeDetail:[
        ["id", ""]
    ],
    getOverview:[
        ["type", ""],
        ["page", ""]
    ],
    getNodeResume:[
        ["id", ""]
    ],
    setEncyContent:[
        ["id", ""],
        ["encycontent", ""]
    ],
    setMapContent:[
        ["id", ""],
        ["mapcontent", ""]
    ],
    getStocklistAnswer:[["model", ""]],
    stockPredict:[["stock_code", ""]]
};
const API_CHECKER = {
    register: [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    login: [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    forgetPassword: [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    verify: [["ignore"], ["ignore"]],
    updateAvatar: [
        ["num-only", "@length-min=9", "@length-max=9"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    updateUserMsg: [
        ["num-only", "@length-min=9", "@length-max=9"],
        [
            "no-base-symbols",
            "sql-check",
            "no-spacing",
            "no-null",
            "@length-max=100",
            "@length-min=1",
        ],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
        ["ignore"],
        ["ignore"],
        ["ignore"],
    ],
    searchNode: [
        [
            "no-base-symbols",
            "sql-check",
            "no-only-spacing",
            "no-null",
            "@length-max=100",
            "@length-min=1",
        ],
    ],
    recognizeNode: [
        [
            "no-base-symbols",
            "sql-check",
            "no-only-spacing",
            "no-null",
            "@length-max=200",
            "@length-min=1",
        ],
    ],
    searchRelationship: [
        [
            "no-base-symbols",
            "sql-check",
            "no-only-spacing",
            "no-null",
            "@length-max=100",
            "@length-min=1",
        ],
        [
            "no-base-symbols",
            "sql-check",
            "no-only-spacing",
            "no-null",
            "@length-max=100",
            "@length-min=1",
        ],
        ["is-num"],
    ],
    getGptAnswer: [["ignore"],["ignore"]],
    getStockAnswer: [
        ["no-base-symbols", "sql-check", "no-null", "no-only-spacing"],
        ["ignore"],
        ["ignore"],
        ["ignore"]
    ],
    getNodeDetail:[
        ["is-num"]
    ],
    getOverview:[
        ["is-num"],
        ["is-num"]
    ],
    getNodeResume:[
        ["is-num"]
    ],
    setEncyContent:[
        ["is-num"],
        ["no-null"]
    ],
    setMapContent:[
        ["is-num"],
        ["no-null"]
    ],
    getStocklistAnswer:[["ignore"]],
    stockPredict:[["ignore"]]
};
export default {
    API,
    API_PARA,
    API_CHECKER,
};
