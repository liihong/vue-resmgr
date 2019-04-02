module.exports = class extends think.Model {

    async getColumnList(tableId, flag) {
        let whereObj = {
            table_id: tableId
        }
        let order = ''
        if (!!flag) {
            let complex = {
                _logic: 'or'
            }
            complex[`is${flag}`] = '1'
            complex.ISUNIQUE = '1'
            complex.PROPERTY_TYPE = '10'
            whereObj._complex = complex
            order = `${flag}_ORDER ASC`
        }
        let data = await this.field()
            .where(whereObj).order(order).select()
        return data
    }
    async getPrimaryKey(tableId){
        let whereObj = {
            table_id: tableId,
            property_type: '10'
        }
        let data = await this.field(['column_name,column_cname,data_type,isunique,property_type,typesql'])
            .where(whereObj).find()
        return data
    }
    async getTypeSqlData(typesql){
        let table = await this.query(typesql);
        return table
    }
};