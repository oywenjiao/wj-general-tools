'use strict';

class Helper {
    constructor() {

    }

    /**
     * 将url参数拆分成数组
     * @param url
     */
    static parseQueryString(url) {
        let params = {};
        let cuttingArr = url.split("?");
        let lists = cuttingArr[1].split("&");
        for (let i = 0; i < lists.length; i++) {
            let queryArr = lists[i].split('=');
            if (!queryArr[1]) {
                params[queryArr[0]] = 'true';
            } else if (params[queryArr[0]]) {
                let arr = [params[queryArr[0]]];
                arr.push(queryArr[1]);
                params[queryArr[0]] = arr;
            } else {
                params[queryArr[0]] = decodeURI(queryArr[1]);
            }
        }
        return params;
    }

    /**
     * 数组去重
     * @param array
     * @returns {unknown[]}
     */
    static arrayUnique(array){
        return Array.from(new Set(array))
    }

    /**
     * 克隆对象
     * @param obj
     * @returns {null|[]}
     */
    static cloneFun(obj){
        if (!obj || "object" != typeof obj) {
            return null;
        }
        var result = (obj instanceof Array) ? [] : {};
        for (var i in obj) {
            result[i] = ("object" != typeof obj[i]) ? obj[i] : this.cloneFun(obj[i]);
        }
        return result;
    }

    /**
     * 按对象键名升序排列
     * @param value
     * @returns {[string, *]}
     */
    static objectKeySort(value){
        var keys = Object.keys(value);
        keys.sort();
        var newValue = {};
        var objectStr = "";
        for (var key in keys) {
            newValue[keys[key]] = value[keys[key]];
            objectStr += keys[key] + "=" + value[keys[key]];
            if(key < keys.length - 1) {
                objectStr += "&";
            }
        }
        return [objectStr, newValue];
    }

    /**
     * 订单编号生成
     * @param prefix 前缀
     * @param len 字符长度
     * @returns {string}
     */
    static makePaySn(prefix, len) {
        var now = new Date().toLocaleString();
        var nowArr = now.split(" ");
        var dateArr = nowArr[0].split("-");
        var timeArr = nowArr[1].split(":");
        var timeStr = dateArr[0] + dateArr[1] + dateArr[2] + timeArr[0] + timeArr[1] + timeArr[2];
        var str = prefix + timeStr;
        var strLen = len - str.length;
        var rand = "";
        for (var i = 0; i < strLen; i++) {
            var r = Math.floor(Math.random() * 10);
            rand += r;
        }
        return str + rand;
    }

    /**
     * 时间戳转化成日期格式
     * @param time
     * @returns {string}
     */
    static formatDate(time) {
        var date = new Date(parseInt(time) * 1000);
        var dateStr = date.getFullYear() + "-";
        dateStr += checkDate( date.getMonth() + 1 )+ "-";
        dateStr += checkDate( date.getDate() ) + " ";
        dateStr += checkDate( date.getHours() ) + ":";
        dateStr += checkDate( date.getMinutes() ) + ":";
        dateStr += checkDate( date.getSeconds() );
        return dateStr;
        function checkDate(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    }

    /**
     * 验证手机号是否正确
     * @param phone
     * @returns {boolean}
     */
    static isMobile(phone) {
        var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!reg.test(phone)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 密码难易验证
     * @param pwd
     * @returns {string|boolean}
     */
    static checkPassword(pwd){
        var numasc = 0;
        var charasc = 0;
        var otherasc = 0;
        if (0 == pwd.length) {
            return "密码不能为空";
        } else if (pwd.length < 6) {
            return "密码至少6个字符";
        } else {
            for (var i = 0; i < pwd.length; i++) {
                var asciiNumber = pwd.substr(i, 1).charCodeAt();
                // 验证是否包含数字
                if (asciiNumber >= 48 && asciiNumber <= 57) {
                    numasc += 1;
                }
                // 验证是否包含字母
                if ( (asciiNumber >= 65 && asciiNumber <= 90)
                    || (asciiNumber >= 97 && asciiNumber <= 122) ) {
                    charasc += 1;
                }
                // 验证是否包含特殊字符
                if ( (asciiNumber >= 33 && asciiNumber <= 47)
                    || (asciiNumber >= 58 && asciiNumber <= 64)
                    || (asciiNumber >= 91 && asciiNumber <= 96)
                    || (asciiNumber >= 123 && asciiNumber <= 126) ) {
                    otherasc += 1;
                }
            }
            /*if (0 == numasc) {
                return "密码必须含有数字";
            } else if (0 == charasc && 0 == otherasc) {
                return "密码必须包含有字母或特殊字符";
            } else {
                return true;
            }*/
            if (0== numasc && 0 == charasc){
                return "密码必须含有数字或字母!";
            }
            return true;
        }
    }

    /**
     * 去除字符串指定字符
     * @param str 需要操作的字符串
     * @param char 需要去除的字符
     * @param type 需要去除的字符串位置
     * @returns {void | string}
     */
    static trim(str, char, type){
        if (char) {
            if (type == 'left') {
                return str.replace(new RegExp('^\\'+char+'+', 'g'), '');
            } else if (type == 'right') {
                return str.replace(new RegExp('\\'+char+'+$', 'g'), '');
            }
            return str.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
        }
        return str.replace(/^\s+|\s+$/g, '');
    }
}

module.exports = Helper;
