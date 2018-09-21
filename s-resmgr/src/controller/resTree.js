const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        const model = this.model('resource_table');
        const data = await model
        .field(['table_id id,table_name,resource_name title,false leaf,\'\' children'])
        .where({table_id: ['like', '__']}).select()
        return this.success(data)
    }
    async getResTreeChildrenAction() {
        let tableId = this.get('id')
        const model = this.model('resource_table');
        const data = await model.
        field(['table_id id,table_name,resource_name title,true leaf,\'\' children'])
        .where({table_id: ['like', `${tableId}__`]}).select()
        return this.success(data)
    }
};