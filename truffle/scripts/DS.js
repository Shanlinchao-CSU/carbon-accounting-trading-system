// const Web3 = require('web3');
// const web3 = new Web3();
//
// /**
//  * 数字签名
//  * @type {string}
//  */
//
// // 随机生成私钥
// // const privateKey = web3.utils.randomHex(32);
// const privateKey = "014ed341d23d1ecddb22369ff8a40b0f6c8948b28704129b40f83a34fefeb921"
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//
// // 要签名的消息
// const message = "数字签名";
//
// // 对消息进行哈希
// const messageHash = web3.utils.sha3(message);
//
// // 使用私钥对消息哈希进行签名
// const signature = web3.eth.accounts.sign(messageHash, privateKey);
//
// // 输出签名信息
// console.log("R: ", signature.r);
// console.log("S: ", signature.s);
// console.log("V: ", signature.v);
//
// // 验证签名
// // const publicKey = web3.eth.accounts.recover(messageHash, signature.v, signature.r, signature.s);
// const publicKey = "0xBF1c740663F2f2ec301898a0d34339520247D189"
// const valid = publicKey.toLowerCase() === account.address.toLowerCase();
// console.log("Signature is valid: ", valid);

// 显示要签名的消息给用户
// const messageElement = document.getElementById('message');
// messageElement.textContent = message;

// 目前限制——只能使用英文
const message = "Confirmation will bind your account to your account on this website, and your public key will be stored in our database for future transactions";

// 提供一个确认按钮
const confirmButton = document.getElementById('confirm-button');
confirmButton.addEventListener('click', async () => {
    try {
        // 请求 MetaMask 进行签名
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const signature = await ethereum.request({
            method: 'personal_sign',
            params: [message, account]
        });

        // 获取地址
        const address = await ethereum.request({ method: 'eth_accounts' });

        console.log(signature);
        console.log(message);
        console.log(address);

        // 将签名数据发送给后端进行验证或处理
        const response = await fetch('http://127.0.0.1:8080/general/signature', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                signature: signature.toString(),
                message: message.toString(),
                address: address.toString(),
            })
        }).then(response => response.json())   //TODO 此处返回404，why？
            .then(data => {
                console.log(data);
                if (data.valid) {
                    alert('签名有效！');
                } else {
                    alert('签名无效！');
                }
            })

        console.log(response);

        // 处理后端的响应
        // const result = await response.json();
        // if (result.valid) {
        //     alert('签名有效！');
        // } else {
        //     alert('签名无效！');
        // }
    } catch (error) {
        console.error(error);
        alert('签名过程出现错误，请检查您的 MetaMask 插件是否正确安装和配置。');
    }
});
