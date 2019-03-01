module.exports = class extends think.Model {
    async getTableInfo(tableId){
        let table = await this.field(['table_id,table_name,where_sql']).where({
            table_id: ['=', tableId]
        }).find();
        return table
    }
};
