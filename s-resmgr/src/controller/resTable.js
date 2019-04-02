const Base = require('./base.js');
import util from '../../utils/util'
let model = 'resource_table'
module.exports = class extends Base {
    async indexAction() {
        try {
            const data = await this.model(model).select()
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }
    // 获取所有资源信息
    async getResColumnDataAction() {
        try {
            let tableId = this.get('id')
            const model = this.model('resource_table');
            const data = await model.
            field(['table_id,table_name,resource_name'])
                .where({
                    table_id: ['like', `${tableId}__`]
                }).select()
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }
    // 添加资源
    async addTableResAction() {
        try {
            let addInfo = this.post()
            let affectedRows = await this.model('resource_table').add(addInfo);
            return this.success(affectedRows)
        } catch (ex) {
            return this.fail(ex)
        }
    }

    // 修改资源
    async editTableResAction() {
        try {
            let updateInfo = this.post()
            let table_id = updateInfo.TABLE_ID
            let affectedRows = await this.model('resource_table').where({
                table_id
            }).update(updateInfo);
            return this.success(affectedRows)
        } catch (ex) {
            return this.fail(ex)
        }
    }

    async deleteTableResAction() {
        try {
            let updateInfo = this.post()
            let affectedRows = await this.model('resource_table').where(updateInfo).delete();
            return this.success(affectedRows)
        } catch (ex) {
            return this.fail(ex)
        }
    }

    //根据配置创建物理表
    async createTableAction() {
        try {
            let tableId = this.post('tableId')
            let tableInfo = await this.model('resource_table').getTableInfo(tableId)
            let tableColumns = await this.model('resource_table_column').getColumnList(tableId)
            // `FORM_ID` VARCHAR(40) NOT NULL COMMENT '表单id,主键',

            let sql = 'create table ' + tableInfo.table_name + ' (';
            let columns = [],
                pk = ''
            tableColumns.map(item => {
                let infos = `${item.column_name}`
                switch (item.data_type) {
                    case '1': //字符串
                        infos += ' VARCHAR(255) '
                        break
                    case '2': // 数值
                        infos += ' INT(11) '
                        break
                    case '3': //日期
                        infos += ' DATETIME '
                        break
                }
                infos += " COMMENT '" + item.column_cname + "' "
                if (item.property_type == '10') {
                    pk = ', PRIMARY KEY (`' + item.column_name + '`) '
                }
                columns.push(infos)
            })
            sql = sql + columns.join(',') + pk + ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='" + tableInfo.resource_name + "' ;"
            let dropTbale = 'drop table ' + tableInfo.table_name
            let delFlag = await this.model().execute(dropTbale);

            let flag = await this.model().execute(sql);
            return this.success(flag);
        } catch (ex) {
            return this.fail(ex)
        }
    }

    // 根据物理表生成表配置信息
    async loadTableAction() {
        try {
            let tableId = this.post('tableId')

            let tableInfo = await this.model('resource_table').getTableInfo(tableId)

            let tableConfig = await this.model('information_schema.columns ').field('COLUMN_NAME,COLUMN_COMMENT COLUMN_CNAME,DATA_TYPE').
            where({
                table_name: tableInfo.table_name
            }).select()
            let insertData = tableConfig.map((item, i) => {
                item.TABLE_ID = tableId
                item.COLUMN_ID = tableId + '0' + i + 1
                item.QUERY_ORDER = i + 1
                item.UPDATE_ORDER = i + 1
                item.INSERT_ORDER = i + 1
                item.EXPORT_ORDER = i + 1
                item.LIST_ORDER = i + 1
                if (item.COLUMN_CNAME == '') {
                    item.COLUMN_CNAME = item.COLUMN_NAME
                }
                switch (item.DATA_TYPE) {
                    case 'varchar':
                        item.DATA_TYPE = '1';
                        break;
                    case 'int':
                    case 'bigint':
                        item.DATA_TYPE = '2';
                        break;
                    case 'date':
                        item.DATA_TYPE = '3';
                        break;
                    case 'datetime':
                        item.DATA_TYPE = '4';
                        break;
                }
                return item
            })
            // console.log(insertData)
            let deleteInfo = await this.model('resource_table_column').where({table_id: ['=', tableId]}).delete();
            console.log(deleteInfo)
            const data = await this.model('resource_table_column').addMany(insertData,{pk: 'COLUMN_ID',where: `TABLE_ID=${tableId}`});
            return this.success(data)
        } catch (ex) {
            return this.fail(ex)
        }

    }
};