<template>
  <div class="resEdit">
    <el-card class='card-content'>
      <div slot='header' class='card-header'>{{optionType == 'add' ? '新增' : '编辑'}}</div>
      <el-form class="form" :inline="true" ref="form" :model="formData" label-width="120px" size="small">
        <el-row v-show="item.property_type !== '10'" v-for="(item,i) in columnData" :key="i" class="item">
          <el-col :span="8" class="title">
            <span>{{item.column_cname}}</span>
          </el-col>
          <el-col :span="16">
          </el-col>
        </el-row>
        <el-col :span='24' :offset="9" class="footer">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="$util.goBackRouter">取消</el-button>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'resAttrEdit',
  data() {
    return {
      columnData: [],
      formData: {},
      dropDownListData: {},
      primaryKey: {}
    }
  },
  computed: {
    optionType() {
      return this.$route.query.type
    },
    tableId() {
      return this.$route.query.tableId
    },
    resId() {
      return this.$route.query.id
    }
  },
  mounted() {
    const vm = this
    this.getConfig().then(() => {
      this.columnData.forEach(item => {
        if (item.property_type == '2' || item.property_type == '4') {
          vm.getSjzdData(item.column_name.toLowerCase(), item.typesql)
        }
        if(item.property_type == '10'){
          this.primaryKey.name = item.column_name
        }
      })
    })
    if (this.optionType == 'edit') this.getFormData()
  },
  methods: {
    onSubmit() {
      let params = {}
      params.form =  this.$refs['form'].model
      params.tableId = this.tableId
      if (this.optionType == 'edit') {
        params.primaryKey = this.primaryKey
        this.$ajax.post(this.$api.editTableRes, params).then(res => {
          if (res && res.data && res.data.data == 1) {
            this.$message('修改成功')
            this.$router.go(-1)
          }
        })
      } else {
        this.$ajax.post(this.$api.editTableRes, params).then(res => {
          if (res && res.data && res.data.data == 0) {
            this.$message('添加成功')
            this.$router.go(-1)
          }
        })
      }
    },
    //获取表单属性配置信息
    getConfig() {
      return this.$ajax
        .get(this.$api.getTableColumns, {
          flag: 'edit',
          tableId: this.tableId
        })
        .then(res => {
          if (res.data.length && res.data.length > 0) {
            this.columnData = res.data
          }
        })
    },
    // 获取表单数据，如果是编辑进行数据回填
    getFormData() {
      this.primaryKey.value  = this.resId
      this.$ajax
        .get(this.$api.queryDataById, {
          tableId: this.tableId,
          id: this.resId
        })
        .then(res => {
          this.formData = res.data
        })
    },
    // 获取数据字典数据
    getSjzdData(attr, sql) {
      this.$ajax
        .get(this.$api.getDropDownListData, {
          typesql: sql
        })
        .then(res => {
          this.$set(this.dropDownListData, attr, res.data)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
  background: #f6f6f6;
  padding: 8px 13px;
}
.form {
  .item {
    width: 45%;
    float: left;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      text-align: right;
      padding-right: 30px;
    }
  }
  .footer {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
