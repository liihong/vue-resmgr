import router from '../router/index'

let util = {}
/**
 * 数组转对象格式
 */
util.hanleFormatObject = function (a, m) {
    let ar = []
    for (var i = 0; i < a[m].length; i++) {
        let o = {}
        for (var it in a) {
            o[it] = a[it][i]
        }
        ar.push(o)
    }
    return ar
}

/**
 * 对字符串进行Unicode编码
 * @param str
 * @returns {string}
 */
util.decodeStr = function (str) {
    let res = []

    for (let i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
    }

    return '\\u' + res.join('\\u')
}

/**
 * 对unicode编码格式的字符串进行解码
 * @param str
 * @returns {string}
 */
util.undecodeStr = function (str) {
    let result = []
    let strArr = str.split('\\u') // 根据 \u 分割
    let len = strArr.length

    for (let i = 0; i < len; i++) {
        if (strArr[i]) {
            result.push(String.fromCharCode(parseInt(strArr[i], 16))) // 16 转 10
        }
    }

    return result.join('')
}
/**
 * 判断传入对象的数据类型,返回对象字符串
 * String
 * Number
 * Array
 * Date
 * Function
 * Function
 * @param {*} obj
 */
util.typeOfObj = function (obj) {
    let objType = Object.prototype.toString.call(obj)
    return objType.replace('[object ', '').replace(']', '')
}
/**
 * 传一个数据根据某个属性进行排序
 */
util.sortArray = function (arr, attr) {
    return arr.sort(function (a, b) {
        let [a1, a2] = [a[attr].replace('%', ''), b[attr].replace('%', '')]
        return a1 - a2
    })
}
/**
 * 格式化数值数据返回中文文本
 * @param {*} arr
 */
util.formatNumArray = function (arr) {
    let newArr = []
    arr.map(item => {
        let temp = item.replace('[', '').replace(']', '').replace('(', '')
        let nums = temp.split(',')
        newArr.push(nums[0] / 10000 + '-' + nums[1] / 10000 + '万')
    })
    return newArr
}
/**
 * 获取当前时间
 */
util.getNowFormatDate = function () {
    var date = new Date()
    var seperator1 = "-"
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
}
util.addDate = function (date, days) {
    var d = new Date(date)
    d.setDate(d.getDate() + days)
    var month = d.getMonth() + 1
    var day = d.getDate()
    if (month < 10) {
        month = "0" + month
    }
    if (day < 10) {
        day = "0" + day
    }
    var val = d.getFullYear() + "-" + month + "-" + day
    return val
}
/**
 * 数组去重
 * @param {*} arr 
 */
util.unique = function (arr) {
    var res = [arr[0]]
    for (var i = 1; i < arr.length; i++) {
        var repeat = false
        for (var j = 0; j < res.length; j++) {
            if (arr[i] == res[j]) {
                repeat = true
                break
            }
        }
        if (!repeat) {
            res.push(arr[i])
        }
    }
    return res
}
util.removeArrayRepElement = function (a, m) {
    let ar = []
    let b = []
    a.map(function (it) {
        if (!b.includes(it[m])) {
            b.push(it[m])
            ar.push(it)
        }
    })
    return ar
}
util.removal = function (a, m) {
    let ar = []
    let b = []
    a.map(function (it) {
        if (!b.includes(it[m])) {
            b.push(it[m])
        }
    })

    b.map(function (item) {
        let o = {}
        o[m] = item
        o['data'] = []
        a.map(function (it) {
            if (item == it.pgc) {
                let os = {}
                for (var ist in it) {
                    os[ist] = it[ist]
                }
                o['data'].push(os)
            }
        })
        ar.push(o)
    })
    return ar
}
/*****************Router 路由操作******************/
util.goBackRouter = function() {
    router.go(-1)
}
util.objToFormData = function(obj) {
    var params = new FormData()
    Object.keys(obj).map(function(item) {
      params.append(item, obj[item])
    })
    return params
  }
export default util