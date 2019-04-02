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

    //根据配置创建物理表
    async createTableAction() {
        try {
            let tableId = this.post('tableId')
            console.log(tableId)
            let tableInfo = await this.model('resource_table').getTableInfo(tableId)
            let tableColumns = await  this.model('resource_table_column').getColumnList(tableId)
            // `FORM_ID` VARCHAR(40) NOT NULL COMMENT '表单id,主键',

            let sql = 'create table ' + tableInfo.table_name + ' (';
            let columns = [],pk = ''
            tableColumns.map(item=>{
                let infos = `${item.column_name}`
                switch(item.data_type){
                    case '1' ://字符串
                        infos += ' VARCHAR(255) '
                        break
                    case '2' :// 数值
                        infos += ' INT(11) '
                        break
                    case '3' ://日期
                        infos += ' DATETIME '
                        break
                }
                infos += " COMMENT '"+ item.column_cname +"' "
                if(item.property_type == '10') {
                    pk = ', PRIMARY KEY (`'+ item.column_name +'`) '
                }
                columns.push(infos)
            })
            sql = sql + columns.join(',') + pk + ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='" + tableInfo.resource_name +"' ;"
            let dropTbale = 'drop table ' + tableInfo.table_name 
            let delFlag = await this.model().execute(dropTbale);

            let flag = await this.model().execute(sql);
            return this.success(flag);
        }catch(ex) {
            return this.fail(ex)
        }
    }
};