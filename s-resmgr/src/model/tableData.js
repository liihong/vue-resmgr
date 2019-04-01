module.exports = class extends think.Model {
    async getTableData(tableId, flag, whereObj){
      
        let table = await this.model('resource_table').getTableInfo(tableId);
        let displayColumn = await this.model('resource_table_column').getColumnList(tableId, flag)
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
        const data = await this.model(table.table_name)
            .field(queryColumns.join(',')).where(whereObj).select();

        return data
    }
};
