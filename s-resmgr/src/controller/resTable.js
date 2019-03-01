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
            let affectedRows = await this.model(table.table_name).where().update(updateInfo);
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
            let affectedRows = await this.model(table.table_name).where(updateInfo).delete();
            return this.success(affectedRows)
        }catch(ex) {
            return this.fail(ex)
        }
    }
};