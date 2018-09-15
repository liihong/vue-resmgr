var express = require('express');
var router = express.Router();
var $sql = require('../config/sqlMap');
var dbHelper = require('../modules/dbHelper')

let resMgrSql = $sql.resmgr
// 获取资源树
router.get('/getResTree', (req, res) => {
  var sql = 'select table_id id,table_name,resource_name title,false loading,\'\' children  from resource_table where length(table_id)=2'
  dbHelper.execSql(resMgrSql.getResTree, {}, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      dbHelper.writeJson(res, result);
    }
  })
});
// 获取某一资源树的子节点
router.get('/getResTreeChildren', (req, res) => {
  var params = req.query;
  var sql = 'select table_id id,table_name,resource_name title,false loading,\'\' children  from resource_table where table_id like ?'
  dbHelper.execSql(resMgrSql.getResTreeChildren, [params.id + '__'], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      dbHelper.writeJson(res, result);
    }
  })
});

// 获取某一表格的字段数据
router.get('/getResColumnData', (req, res) => {
  var params = req.query;
  var sql = 'SELECT t.TABLE_ID,t.RESOURCE_NAME,LOWER(c.COLUMN_NAME) COLUMN_NAME,c.COLUMN_CNAME,c.PROPERTY_TYPE,c.DATA_TYPE,c.ISUNIQUE,\
  c.COLUMNLENGTH,c.IS_FROZEN FROM resource_table t,resource_table_column c WHERE t.TABLE_ID=c.TABLE_ID ";'

  dbHelper.execSql(resMgrSql.getResColumnData, [params.tableId + '__'], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      dbHelper.writeJson(res, result);
    }
  })
});


module.exports = router;