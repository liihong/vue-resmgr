var mysql = require('mysql')
var config = require('../config/setting')

var dbHelper = {}


// sql语句执行
dbHelper.execSql = function (sqls, values, after) {
  var connection = mysql.createConnection(config.MYSQL)

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
    }
    console.log('connected as id ' + connection.threadId)

    connection.query(sqls || '', values || [], function (err, rows) {
      after(err, rows)
    })
    // 关闭数据库连接
    connection.end()
  })
  connection.on('error', function (err) {
    if (err.errno !== 'ECONNRESET') {
      after('err01', false)
      throw err
    } else {
      after('err02', false)
    }
  })
}

// 事务连接
dbHelper.getConnection = function (callback) {
  var connection = mysql.createConnection(config.MYSQL)
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
    }
    callback(err, connection)
  })
}

dbHelper.writeJson = function (res, ret) {
  let result = {}
  if (typeof ret === 'undefined') {
    result.status = 2
    result.desc = '操作失败'
    result.data = null
  } else {
    result.status = 1
    result.desc = '成功'
    result.data = ret
  }
  res.send(result)
}

module.exports = dbHelper