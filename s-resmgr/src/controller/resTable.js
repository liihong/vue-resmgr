const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        return 'hahah'
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

    async queryDataByIdAction() {
        try {
            let tableId = this.get('tableId')

            let table = await this.model('resource_table').getTableInfo(tableId)
            const data = await this.model(table[0].table_name).where({
                id: this.get('id')
            }).find()
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
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
                whereObj[`${queryColumn}`] = ['like', `%${queryKey}%`]
            }

            let table = await this.model('resource_table').getTableInfo(tableId);
            let displayColumn = await this.model('resource_table_column').getColumnList(tableId);
            let queryColumns = []
            displayColumn.map(item => {
                switch (item.property_type) {
                    case '1': // 文本框形式不需要翻译
                        queryColumns.push(item.column_name)
                        break;
                    case '2': // 有外键关系,需要翻译
                        queryColumns.push(`(SELECT NAME FROM (${item.typesql}) tras WHERE tras.id=${item.column_name}) ${item.column_name}`)
                        break;
                    case '4':
                        queryColumns.push(item.column_name)
                        break;
                    case '3': // 日期
                    case '5':
                        queryColumns.push(item.column_name)
                        break;
                    default:
                        queryColumns.push(item.column_name)
                        break;
                }
            })
            const data = await this.model(table[0].table_name)
                .field(queryColumns.join(',')).page(pageNumber, pageSize).countSelect();
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }

    // 添加资源
    async addTableResAction() {

    }

    // 修改资源
    async editTableResAction() {
        try {
            let tableId = this.post('tableId')
            let updateInfo = this.post()
            delete updateInfo.tableId;
            let table = await this.model('resource_table').getTableInfo(tableId)
            let affectedRows = await this.model(table[0].table_name).where().update(updateInfo);
            return this.success(affectedRows)
        }catch(ex) {
            return this.fail(ex)
        }

    }

    async deleteTableResAction() {
        try {
            let tableId = this.post('tableId')
            let updateInfo = this.post()
            delete updateInfo.tableId;
            let table = await this.model('resource_table').getTableInfo(tableId)
            let affectedRows = await this.model(table[0].table_name).where(updateInfo).delete();
            return this.success(affectedRows)
        }catch(ex) {
            return this.fail(ex)
        }
    }
};