<template>
    <div>
        <div style="margin: 10px">
            <el-button size="small" type="primary" @click="addRes" icon="el-icon-circle-plus">新增</el-button>
            <el-button size="small" type="primary" icon="el-icon-remove">批量删除</el-button>
        </div>
        <div class="table">
            <el-table @row-dblclick="rowDblClick" ref="columnConfig" height="600" stripe border size="small" :data="tableData" style="width: 100%">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column type="selection" width="45">
                </el-table-column>
                <el-table-column label="资源操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" circle icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)"></el-button>
                        <el-button size="mini" circle icon="el-icon-setting" type="warning" @click="handleEditAttr(scope.row)"></el-button>
                        <el-button size="mini" circle icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="资源ID" prop="TABLE_ID" width="130">
                </el-table-column>
                <el-table-column label="资源表名" prop="TABLE_NAME" min-width="100">
                </el-table-column>
                <el-table-column label="资源名称" prop="RESOURCE_NAME" min-width="150">
                </el-table-column>
                <el-table-column label="排序SQL" prop="ORDERBY_SQL">
                </el-table-column>
                <el-table-column label="查询SQL" prop="WHERE_SQL" min-width="150">
                </el-table-column>
            </el-table>
        </div>
        <resForm :dialogState="dialogState" @initData="initData"></resForm>
    </div>
</template>

<script>
import resForm from './components/resForm'
export default {
  components: {
    resForm
  },
  data() {
    return {
      tableData: [],
      dialogState: {
        show: false,
        type: 'add',
        name: '新增资源',
        formData: {}
      }
    }
  },
  computed: {},
  mounted() {
    this.initData()
  },
  methods: {
    addRes() {
      this.dialogState.show = !this.dialogState.show
      this.dialogState.type = 'add'
      this.dialogState.name = '新增资源'
      this.dialogState.formData = {}
    },
    handleEdit(row) {
      this.dialogState.show = !this.dialogState.show
      this.dialogState.type = 'edit'
      this.dialogState.name = '编辑资源'
      this.dialogState.formData = row
    },
    handleEditAttr(row) {
      this.$router.push({
        path: '/resConfigList',
        query: { tableId: row['TABLE_ID'] }
      })
    },
    handleDelete(row) {
      this.$message.confirmDelete(() => {
        this.$ajax.post(this.$api.deleteTableRes, row).then(res => {
          if (res.data && res.data.errno == 0) {
            this.$message.deleteSuccess()
            this.initData()
          } else {
            this.$message.deleteError(res.data.errmsg)
          }
        })
      })
    },
    // 双击行的时候进入某个字段的详细设置
    rowDblClick(row) {
      this.$store.commit('selectAttrData', row)
      this.$router.push({
        path: '/resAttrEdit',
        query: { tableId: this.tableId, id: row.COLUMN_ID, type: 'edit' }
      })
    },
    // 点击保存
    saveClick() {
      let params = {}
      this.tableData = this.tableData.map((item, i) => {
        item.id = i
        return item
      })
      params.form = this.tableData
      params.tableId = this.tableId
      this.$ajax.post(this.$api.editTableResColumns, params).then(res => {
        if (res.data) {
          console.log(res.data)
        }
      })
    },
    // 加载数据
    initData() {
      this.$ajax.get(this.$api.getTableRes).then(res => {
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
