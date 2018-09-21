const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        return 'hahah'
    }
    // 获取配置表的字段属性
    async getResColumnDataAction() {
        let tableId = this.get('tableId')
        const model = this.model('resource_table_column');
        const data = await model.order('QUERY_ORDER ASC').where({table_id: ['=', tableId]}).select()
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
};