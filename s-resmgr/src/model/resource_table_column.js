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
            whereObj._complex = complex
            order = `${flag}_ORDER ASC`
        }
        let data = await this.field(['column_name,columnlength,column_cname,data_type,isunique,property_type,typesql'])
            .where(whereObj).order(order).select()
        return data
    }
};