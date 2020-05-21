const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        return 'hahah'
    }
    // 编辑字段配置统一保存
    async addTableResColumnsAction() {
        let tableId = this.post('tableId')
        let updateInfos = this.post('form')

        let deleteInfo = await this.model('resource_table_column').where({
            table_id: ['=', tableId]
        }).delete();
        console.log(deleteInfo)
        const data = await this.model('resource_table_column').addMany(updateInfos, {
            pk: 'COLUMN_ID',
            where: `TABLE_ID=${tableId}`
        });
        return this.success(data)
    }
    // 编辑字段配置统一保存
    async editTableResColumnsAction() {
        let tableId = this.post('tableId')
        let updateInfos = this.post('form')
        console.log(updateInfos)
        const data = await this.model('resource_table_column').updateMany(updateInfos, {
            pk: 'COLUMN_ID',
            where: `TABLE_ID=${tableId}`
        });
        return this.success(data)
    }


    // 获取配置表的字段属性
    async getResColumnDataAction() {
        let tableId = this.get('tableId')
        const model = this.model('resource_table_column');
        const data = await model.order('QUERY_ORDER ASC').where({
            table_id: ['=', tableId]
        }).select()
        return this.success(data)
    }
    async getTableColumnAction() {
        try {
            let tableId = this.get('tableId')

            let displayColumn = await this.model('resource_table_column').getColumnList(tableId, this.get('flag'))

            return this.success(displayColumn)
        } catch (err) {
            return this.fail(err)
        }
    }

    async getDropDownListDataAction() {
        try {
            let sql = this.get('typesql')

            let data = await this.model('resource_table_column').getTypeSqlData(sql)
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }

    //根据外键配置查询数据
    async getForeingKeyListDataAction() {
        try {
            let tableId = this.get('tableId')
            let column_name = this.get('column_name')
            let query = this.get('query')

            let columnData = await this.model('resource_table_column').where({
                table_id: tableId,
                column_name: column_name
            }).find()

            let whereObj = {}
            whereObj[columnData.FOREIGNKEY_TABLE_COLUMN] = query
            let data = await this.model(columnData.FOREIGNKEY_TABLENAME).where(whereObj).select()
            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }

    //删除外键表数据根据ID
    async DeleteForeingDataByIdAction() {
        const {tableId,column_name,id} = this.post()
        let whereObj = {}

        let columnData = await this.model('resource_table_column').where({
            table_id: tableId,
            column_name: column_name
        }).find()

        // whereObj[columnData.FOREIGNKEY_TABLE_COLUMN] = query
        whereObj['id'] = id
        let data = await this.model(columnData.FOREIGNKEY_TABLENAME).where(whereObj).delete()
        return this.success(data)
    }
};