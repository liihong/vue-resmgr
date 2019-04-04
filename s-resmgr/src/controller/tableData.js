const Base = require('./base.js');
import util from '../../utils/util'
const nodeExcel = require("excel-export"); //首先，引入excel模块：

module.exports = class extends Base {
    async indexAction() {
        return 'hahah'
    }

    async queryTableDataByIdAction() {
        try {
            let tableId = this.get('tableId')

            let table = await this.model('resource_table').getTableInfo(tableId)
            let fileds = await this.model('resource_table_column').getColumnList(tableId)
            fileds = fileds.map(item=>{
                return item.COLUMN_NAME
            })
            const data = await this.model(table.table_name).field(fileds).where({
                id: this.get('id')
            }).find()
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }
    // 导出Excel
    async exportExcelAction() {
        const res = this.ctx.res;
        const req = this.ctx.req;
        const tableId = this.get('tableId')
        let queryColumn = this.get('queryColumn')
        let queryKey = this.get('queryKey')
        let whereObj = {}
        if (!!queryColumn) {
            if (queryKey.includes(',')) {
                whereObj[`${queryColumn}`] = ['IN', `${queryKey}`]
            } else {
                whereObj[`${queryColumn}`] = ['like', `%${queryKey}%`]
            }
        }
        var confs = [];
        var conf = {};
        let colArr = []
        let colunms = await this.model('resource_table_column').getColumnList(tableId, 'EXPORT')
        let tables = await this.model('resource_table').getTableInfo(tableId)

        colunms.map(item => {
            colArr.push({
                caption: item.COLUMN_CNAME,
                type: 'string'
            })
        })
        let colunmsQuery = colunms.map(item => {
            return item.COLUMN_NAME
        })
        conf.cols = colArr;
        let tableData = await this.model('tableData').getTableData(tableId, 'EXPORT', whereObj)
        let infos = []
        tableData.map(item => {
            let datas = []
            Object.keys(item).map(el => {
                datas.push(item[el])
            })
            infos.push(datas)
        })

        conf.rows = infos
        conf.name = tables.table_name;
        confs.push(conf);

        var result = nodeExcel.execute(confs);

        var name = encodeURI(tables.resource_name);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
        res.setHeader("Content-Disposition", "filename=" + name + ".xlsx");
        res.end(result, 'binary');
    }
    // 根据配置查询某表的数据
    async queryTableDataAction() {
        try {
            let tableId = this.get('tableId')
            let pageSize = this.get('pageSize')
            let pageNumber = this.get('pageNumber')

            let queryColumn = this.get('queryColumn')
            let queryKey = this.get('queryKey')
            let whereObj = {}
            if (!!queryColumn) {
                if (queryKey.includes(',')) {
                    whereObj[`${queryColumn}`] = ['IN', `${queryKey}`]
                } else {
                    whereObj[`${queryColumn}`] = ['like', `%${queryKey}%`]
                }
            }
            let table = await this.model('resource_table').getTableInfo(tableId);
            let displayColumn = await this.model('resource_table_column').getColumnList(tableId);
            let queryColumns = []
            displayColumn.map(item => {
                switch (item.PROPERTY_TYPE) {
                    case '1': // 文本框形式不需要翻译
                        queryColumns.push(item.COLUMN_NAME)
                        break;
                    case '2': // 有外键关系,需要翻译
                        queryColumns.push(`(SELECT NAME FROM (${item.TYPESQL}) tras WHERE tras.id=${item.COLUMN_NAME}) ${item.COLUMN_NAME}`)
                        break;
                    case '4': //字段数据
                    queryColumns.push(`(SELECT NAME FROM (${item.TYPESQL}) tras WHERE tras.id=${item.COLUMN_NAME}) ${item.COLUMN_NAME}`)
                    break;
                    case '3': // 日期
                    case '5': // 日期时间
                        queryColumns.push(item.COLUMN_NAME)
                        break;
                    default:
                        queryColumns.push(item.COLUMN_NAME)
                        break;
                }
            })
            const data = await this.model(table.table_name)
                .field(queryColumns.join(',')).page(pageNumber, pageSize).where(whereObj).countSelect();
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }

    // 添加资源
    async addAction() {
        try {
            let tableId = this.post('tableId')
            let form = this.post('form')
            // 获取主键
            let primaryKey = await this.model('resource_table_column').getPrimaryKey(tableId)
            
            if(JSON.stringify(primaryKey) != '{}'){
                let sql = 'select ' + primaryKey.typesql + ' Id from dual'
                let primaryKeyValue = ''
                if (!!primaryKey.typesql) {
                    let tData = await this.model('resource_table_column').getTypeSqlData(sql)
                    primaryKeyValue = tData[0].Id
                } else {
                    primaryKeyValue = util.getUUId()
                }
                form[primaryKey.column_name.toLowerCase()] = primaryKeyValue
            }
            
            let table = await this.model('resource_table').getTableInfo(tableId)
            let affectedRows = await this.model(table.table_name).add(form);
            return this.success(affectedRows)
        } catch (ex) {
            return this.fail(ex)
        }
    }

    // 修改资源
    async editAction() {
        try {
            let tableId = this.post('tableId')
            let updateInfo = this.post('form')
            let primaryKey = this.post('primaryKey')
            let table = await this.model('resource_table').getTableInfo(tableId)

            let affectedRows = await this.model(table.table_name).where(
                `${primaryKey.name}=${primaryKey.value}`
            ).update(updateInfo);
            return this.success(affectedRows)
        } catch (ex) {
            return this.fail(ex)
        }

    }

    async deleteAction() {
        try {
            let tableId = this.post('tableId')
            let updateInfo = this.post()
            delete updateInfo.tableId;
            let table = await this.model('resource_table').getTableInfo(tableId)
            let affectedRows = await this.model(table.table_name).where(updateInfo).delete();
            return this.success(affectedRows)
        } catch (ex) {
            return this.fail(ex)
        }
    }
};