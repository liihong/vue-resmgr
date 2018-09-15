/**
 * Created by lihong on 2017/12/5.
 */
// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, name, age) values (0, ?, ?)'
  },
  resmgr: {
    getResTree: 'select table_id id,table_name,resource_name title,false loading,\'\' children  from resource_table where length(table_id)=2',
    getResTreeChildren: 'select table_id id,table_name,resource_name title,false loading,\'\' children  from resource_table where table_id like ?',

    getResColumnData: `SELECT t.TABLE_ID,t.RESOURCE_NAME,LOWER(c.COLUMN_NAME) COLUMN_NAME,c.COLUMN_CNAME,c.PROPERTY_TYPE,c.DATA_TYPE,c.ISUNIQUE,
                      c.COLUMNLENGTH,c.IS_FROZEN FROM resource_table t,resource_table_column c WHERE t.TABLE_ID=c.TABLE_ID ";`
  }
}
module.exports = sqlMap