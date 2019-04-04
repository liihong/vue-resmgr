<template>
  <div>
    <div style="margin: 10px">
      <el-button size="small" type="primary" @click="addResAttr" icon="el-icon-circle-plus">新增</el-button>
      <el-button size="small" type="danger" icon="el-icon-remove">批量删除</el-button>
      <el-button @click="saveClick" size="small" type="success" icon="el-icon-check">保存</el-button>
      <el-button size="small" type="warning" @click="loadTable" icon="el-icon-document">加载表</el-button>
      <el-button size="small" type="danger" @click="createTable" icon="el-icon-refresh">创建表</el-button>
    </div>
    <div class="table">
      <el-table @row-dblclick="rowDblClick" ref="columnConfig" height="600" stripe border size="small" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="40"></el-table-column>
        <el-table-column type="selection" width="45">
        </el-table-column>
         <el-table-column label="操作" width="50" align="center">
          <template slot-scope="scope">
            <el-button size="mini" circle icon="el-icon-edit-outline" type="primary" @click="handleEdit(scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="字段属性" prop="ATTRIBUTE_TYPE" width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ATTRIBUTE_TYPE" placeholder="请选择">
              <el-option v-for="item in attrType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="字段名称" prop="COLUMN_NAME" min-width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.COLUMN_NAME" placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="字段中文名称" prop="COLUMN_CNAME" min-width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.COLUMN_CNAME" placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="字段类型" prop="DATA_TYPE" width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.DATA_TYPE" placeholder="请选择">
              <el-option v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="输入框类型" prop="PROPERTY_TYPE" min-width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.PROPERTY_TYPE" placeholder="请选择">
              <el-option v-for="item in propertyType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
    <resAttrForm :dialogState="dialogState" @initData="getColumnData"></resAttrForm>
  </div>
</template>
<script>
import resAttrForm from './components/resAttrForm'
export default {
  components: {
    resAttrForm
  },
  data() {
    return {
      tableData: [],
      attrType: [
        {
          value: '1',
          label: '数据库'
        },
        {
          value: '2',
          label: '自定义'
        }
      ],
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
      ],
      //包括文本框、下拉列表、复选框、单选框、日期/时间、隐藏域、自动填充、弹出树、文本域、自增序列、密码、按钮、单张图片、单个附件。
      propertyType: [
        {
          value: '1',
          label: '文本框'
        },
        {
          value: '2',
          label: '下拉列表'
        },
        {
          value: '3',
          label: '复选框'
        },
        {
          value: '4',
          label: '单选框'
        },
        {
          value: '5',
          label: '日期'
        },
        {
          value: '6',
          label: '文本域'
        },
        {
          value: '7',
          label: '自动填充'
        },
        {
          value: '8',
          label: '隐藏域'
        },
        {
          value: '9',
          label: '弹出树'
        },
        {
          value: '10',
          label: '自增序列'
        },
        {
          value: '11',
          label: '密码'
        },
        {
          value: '12',
          label: '按钮'
        },
        {
          value: '13',
          label: '图片上传'
        },
        {
          value: '14',
          label: '附件上传'
        }
      ],
      dialogState: {
        show: false,
        type: 'add',
        name: '新增资源',
        formData: {}
      }
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
    rowDblClick(row) {
      this.$store.commit('selectAttrData', row)
      this.dialogState.show = !this.dialogState.show
      this.dialogState.type = 'edit'
      this.dialogState.name = '编辑字段'
      this.dialogState.formData = row
    },
    addResAttr() {
      this.tableData.push({
        ATTRIBUTE_TYPE: '1',
        PROPERTY_TYPE: '1',
        DATA_TYPE: '1'
      })
    },
    handleEdit(row) {
      this.dialogState.show = !this.dialogState.show
      this.dialogState.type = 'edit'
      this.dialogState.name = '编辑字段'
      this.dialogState.formData = row
    },
    // 点击保存
    saveClick() {
      let params = {}
      this.tableData = this.tableData.map((item, i) => {
        item.COLUMN_ID = this.tableId + i+1
        item.QUERY_ORDER = i+1
        item.UPDATE_ORDER = i+1
        item.INSERT_ORDER = i+1
        item.EXPORT_ORDER = i+1
        item.LIST_ORDER = i+1
        item.TABLE_ID = this.tableId
        return item
      })
      params.form = this.tableData
      params.tableId = this.tableId
      this.$ajax.post(this.$api.addTableResColumns, params).then(res => {
        if (res && res.data && res.data.errno == 0) {
          this.$message.success()
          this.getColumnData()
          this.dialogState.show = false
        } else {
          this.$message.error(res.data.errmsg)
        }
      })
    },
    createTable() {
      this.$message.confirm('是否确定删掉原有表重新创建表？', () => {
        this.$ajax
          .post(this.$api.createTable, {
            tableId: this.tableId
          })
          .then(res => {
            if (res && res.data && res.data.errno == 0) {
              this.$message.success()
              this.getColumnData()
            } else {
              this.$message.error(res.data.errmsg)
            }
          })
      })
    },
    loadTable() {
      this.$message.confirm('根据数据库信息加载表配置？', () => {
        this.$ajax
          .post(this.$api.loadTable, {
            tableId: this.tableId
          })
          .then(res => {
            if (res && res.data && res.data.errno == 0) {
              this.$message.success()
              this.getColumnData()
            } else {
              this.$message.error(res.data.errmsg)
            }
          })
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
