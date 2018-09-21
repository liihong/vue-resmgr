var express = require('express');
var router = express.Router();
var $sql = require('../config/sqlMap');
var dbHelper = require('../utils/dbHelper')


// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  dbHelper.execSql(sql, [params.username, params.age], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      dbHelper.writeJson(res, result);
    }
  })
});


module.exports = router;
