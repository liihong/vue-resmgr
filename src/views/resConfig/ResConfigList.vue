<template>
  <div>
    <div style="margin: 10px">
      <el-button size="small" type="primary" icon="el-icon-circle-plus">新增</el-button>
      <el-button size="small" type="danger" icon="el-icon-remove">批量删除</el-button>
      <el-button @click="saveClick" size="small" type="success"  icon="el-icon-check">保存</el-button>
      <el-button size="small" type="warning" icon="el-icon-document">加载表</el-button>
      <el-button size="small" type="danger" icon="el-icon-refresh">创建表</el-button>
    </div>
    <div class="table">
      <el-table @row-dblclick="rowDblClick" ref="columnConfig" height="600" stripe border size="small" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="40"></el-table-column>
          <el-table-column type="selection" width="45">
          </el-table-column>
        <el-table-column label="字段类型" prop="DATA_TYPE" width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.DATA_TYPE" placeholder="请选择">
              <el-option v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="字段名称" prop="COLUMN_NAME" min-width="100">
          <template slot-scope="scope">
           <el-input v-model="scope.row.COLUMN_NAME" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="字段中文名称" prop="COLUMN_CNAME" min-width="150">
           <template slot-scope="scope">
           <el-input v-model="scope.row.COLUMN_CNAME" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
         <el-table-column label="是否必填" prop="ISLIST">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ISMUST" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否视图展示" prop="ISLIST">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ISLIST" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否可排序" prop="IS_SORT">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IS_SORT" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否可编辑" prop="IS_EDIT">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ISUPDATE" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否可插入" prop="ISINSERT">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ISINSERT" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否可导出" prop="ISEXPORT">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ISEXPORT" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否可导入" prop="ISINPORT">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ISINPORT" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [],
      dataType: [
        {
          value: '1',
          label: '字符串'
        },
        {
          value: '2',
          label: '数值'
        },
        {
          value: '3',
          label: '日期时间'
        }
      ]
    }
  },
  computed: {
    tableId() {
      return this.$route.query.tableId
    }
  },
  mounted() {
    this.getColumnData()
  },
  methods: {
    // 双击行的时候进入某个字段的详细设置
    rowDblClick(row){
      this.$store.commit('selectAttrData', row)
      this.$router.push({
        path: '/resAttrEdit',
        query: { tableId: this.tableId, id: row.COLUMN_ID, type: 'edit' }
      })
    },
    // 点击保存
    saveClick(){
      let params = {}
      this.tableData = this.tableData.map((item,i)=>{
        item.id = i
        return item
      })
      params.form =  this.tableData
      params.tableId = this.tableId
      this.$ajax
        .post(this.$api.editTableResColumns, params)
        .then(res => {
          if (res.data){
            console.log(res.data)
          }
        })
    },
    getColumnData() {
      this.$ajax
        .get(this.$api.getResColumnData, {
          tableId: this.tableId
        })
        .then(res => {
          if (res.data.length > 0) this.tableData = res.data
        })
    }
  },
  watch: {
    $route() {
      this.getColumnData()
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-btn {
  margin-left: 10px;
}
</style>
