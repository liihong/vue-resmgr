<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>模糊查询:</el-form-item>
        <el-form-item item-width="300px">
          <el-select v-model="selColumns" multiple filterable placeholder="请选择">
            <el-option v-for="item in resRows" :key="item.column_cname" :label="item.column_cname" :value="item.column_name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getResList" type="primary" size="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleAdd" type="primary" size="small" icon="el-icon-circle-plus">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleExport" type="primary" size="small" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="resDatas" v-loading="listLoading" header-cell-class-name="table_th" stripe border :max-height="tableHeight" style="width: 100%;">
      <el-table-column fixed="left" type="selection" width="50" align="center">
      </el-table-column>
      <el-table-column fixed="left" type="index" width="50" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+(pageNumber - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.ID)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.ID)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="row.isunique != '1'" v-for="(row,index) in resRows" :key="index" :prop="row.column_name" :fixed="(row.is_frozen == 1?'left':false)" :label="row.column_cname" :min-width="(row.columnlength != '')?row.columnlength:150" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination background style="float: right" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[30, 60, 100, 150]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
export default {
  name: 'resList',
  data() {
    return {
      filters: {
        columns: '',
        name: ''
      },
      resRows: [],
      resDatas: [],
      total: 0,
      pageNumber: 1,
      pageSize: 30,
      listLoading: false,
      sels: [], //列表选中列
      selColumns: [],
      tableHeight: 600
    }
  },
  computed: {
    tableId() {
      if (this.$store.state.tableId) {
        return this.$store.state.tableId
      } else {
        return this.$route.query.tableId
      }
    }
  },
  methods: {
    //获取表格配置信息
    getConfig() {
      this.$ajax.get(this.$api.getTableColumns, {
        flag: 'list',
        tableId: this.tableId
      }).then(res => {
        this.resRows = res.data
        this.listLoading = false
      })
    },
    //获取表格数据
    getResList: function() {
      let params = {
        tableId: this.tableId,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      if (this.filters.name != '') {
        params.querytype = '1'
        params.queryColumn = this.selColumns.join('|')
        params.queryKey =  this.filters.name
      }
      this.$ajax.get(this.$api.queryTableData, params).then(res => {
        if (res.data) {
          this.resDatas = res.data.data
          this.total = parseInt(res.data.count)
          this.listLoading = false
        }
      })
    },
    //导出
    handleExport() {
      window.location.href = this.$api.exportData + '?tableId=' + this.tableId
    },
    //新增按钮
    handleAdd() {
      this.$router.push({
        path: '/resEdit',
        query: { tableId: this.tableId, type: 'add' }
      })
    },
    // 编辑按钮事件处理
    handleEdit(index, id) {
      this.$router.push({
        path: '/resEdit',
        query: { tableId: this.tableId, id: id, type: 'edit' }
      })
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getResList()
    },
    selsChange: function(sels) {
      this.sels = sels
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          let para = { ids: ids }
          this.batchRemoveUser(para).then(res => {
            this.listLoading = false
            if (res.data) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getUsers()
            }
          })
        })
        .catch(() => {})
    },
    batchRemoveUser(params) {
      console.log(params)
    }
  },
  mounted() {
    this.getConfig()
    this.getResList()
    var offsetHeight = window.innerHeight
    this.tableHeight = offsetHeight - 220
  },
  watch: {
    tableId() {
      this.getConfig()
      this.getResList()
    }
  }
}
</script>
<style lang="less" scoped>
.toolbar {
     padding: 10px;
    margin: 10px 0;
  background: #f2f2f2;
  .el-form-item {
    margin-bottom: 0px;
}
}
</style>