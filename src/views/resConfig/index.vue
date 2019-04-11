<template>
  <div class="resConfig">
    <aside class="tree">
      <resTree></resTree>
    </aside>
    <section class="resConfigContent">
      <el-row>
        <el-col :span="24" class="breadcrumb-container">
         <Breadcrumb/>
        </el-col>
      </el-row>
      <router-view/>
    </section>
  </div>
</template>

<script>
import resTree from './tree/resTree'
import Breadcrumb from '@/components/Breadcrumb/index'
export default {
  components: {
    resTree,
    Breadcrumb
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
  }
}
</script>
<style lang="less" scoped>
.resConfig {
  display: flex;
  .tree {
    width: 200px;
    flex: 0.15;
    .el-tree {
      padding: 20px;
      background-color: #eef1f6;
    }
  }
  .resConfigContent {
    flex: 1;
    overflow: auto;
    .breadcrumb-container {
    border-bottom: 1px solid #eeeeee;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: right;
    }
  }
  }
  .ivu-btn {
    margin-left: 10px;
  }
}
</style>
