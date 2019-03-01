/**
 * 工具类
 */
let crypto = require("crypto")

module.exports = {

    encrypt: function (data, key) { // 密码加密
        let cipher = crypto.createCipher("bf", key);
        let newPsd = "";
        newPsd += cipher.update(data, "utf8", "hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },

    decrypt: function (data, key) { //密码解密
        let decipher = crypto.createDecipher("bf", key);
        let oldPsd = "";
        oldPsd += decipher.update(data, "hex", "utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    },
    // 根据日期获取id
    getUUId: function(){
        let uuid="";  //订单号
        for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
        {
            uuid += Math.floor(Math.random()*10);
        }
        uuid = new Date().getTime() + uuid;  //时间戳，用来生成订单号。
        return uuid
    }
}