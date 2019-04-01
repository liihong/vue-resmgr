const Base = require('./base.js');

let model = 'resource_table'
module.exports = class extends Base {
    async indexAction() {
        try{
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
        }catch(ex) {
            return this.fail(ex)
        }
    }

    // 修改资源
    async editTableResAction() {
        try {
            let updateInfo = this.post()
            let table_id = updateInfo.TABLE_ID
            let affectedRows = await this.model('resource_table').where({table_id}).update(updateInfo);
            return this.success(affectedRows)
        }catch(ex) {
            return this.fail(ex)
        }
    }

    async deleteTableResAction() {
        try {
            let updateInfo = this.post()
            let affectedRows = await this.model('resource_table').where(updateInfo).delete();
            return this.success(affectedRows)
        }catch(ex) {
            return this.fail(ex)
        }
    }
};