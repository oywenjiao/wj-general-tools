const crypto = require('crypto');
const ToolsError = require('../errors');

/**
 * 使用示例
 *
    const d = 'Hello, this is a secret message aa!';
    const key = '9vApxLk5G3PAsJrM';
    let iv = '1234567891234567';
    let encrypted = aes.aesEncrypt(d, key, iv);
    let decrypted = aes.aesDecrypt(encrypted, key, iv);

    console.log('Plain text: ' + d);
    console.log('Encrypted text: ' + encrypted);
    console.log('Decrypted text: ' + decrypted);
 *
 */

class Aes {

    constructor() {
    }


    /**
     * 对数据进行加密
     * @param data
     * @param key
     * @param iv
     * @returns {*}
     */
    static aesEncrypt(data, key, iv) {
        let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }

    /**
     * 解密数据
     * @param crypted
     * @param key
     * @param iv
     * @returns {*}
     */
    static aesDecrypt(crypted, key, iv) {
        let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        return decipher.update(crypted, 'hex', 'utf8') + decipher.final('utf8');
    }
}

module.exports = Aes;

