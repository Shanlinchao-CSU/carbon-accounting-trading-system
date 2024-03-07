const crypto = require('crypto');

/**
 * 加密函数
 * @param {string} text 要加密的数据
 * @param {Buffer} key 密钥
 * @returns {string} 返回加密后的数据
 */
function encrypt(text, key) {
    // const iv = crypto.randomBytes(16); // 生成一个随机的初始化向量
    // 根据密钥生成初始化向量 32位
    let iv = Buffer.from(key, 'hex');
    iv = iv.subarray(0, 16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
}

/**
 * 解密函数
 * @param {string} encryptedText 加密后的数据
 * @param {Buffer} key 密钥
 * @returns {string} 返回解密后的数据
 */
function decrypt(encryptedText, key) {
    let iv  = Buffer.from(key, 'hex');
    iv = iv.subarray(0, 16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


/**
 * 生成密钥
 * @param {string} address 地址(公钥)
 * @returns {Buffer} 返回生成的密钥
 */
function generateKey(address) {
    const keyA = crypto.createHash('sha256').update(address).digest('hex');
    return Buffer.from(keyA, 'hex');
}


function demo() {
//
    const address = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

// 使用address生成密匙
    const key = generateKey(address);

    console.log('密钥:', key.toString('hex')); // 密钥根据地址来计算——区块链的公钥
// 要加密的数据
    const originalText = 'Hello World!Where are you?I am here!';


// 加密数据
    const encryptedText = encrypt(originalText, key);
    console.log('加密后的数据:', encryptedText);
    console.log('加密数据长度:', encryptedText.length); // 加密数据长度不固定，根据原始数据长度变化

// 解密数据
    const decryptedText = decrypt(encryptedText, key);
    console.log('解密后的数据:', decryptedText);

}

demo();