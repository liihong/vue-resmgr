<template>
  <div class="resEdit">
    <el-card class='card-content'>
      <div slot='header' class='card-header'>{{optionType == 'add' ? '新增' : '编辑'}}</div>
      <el-form class="form" :inline="true" ref="form" :model="formData" label-width="120px" size="small">
        <el-row v-show="item.PROPERTY_TYPE !== '10'" v-for="(item,i) in columnData" :key="i" class="item">
          <el-col :span="8" class="title">
            <span>{{item.COLUMN_CNAME}}</span>
          </el-col>
          <el-col :span="16">
            <!--主键-->
            <template v-if="item.PROPERTY_TYPE == '10'">
              <span v-show="false">{{formData[item.COLUMN_NAME]}}</span>
            </template>
            <template v-else-if="item.PROPERTY_TYPE == '2'">
              <!--下拉选择-->
              {{formData[item.COLUMN_NAME]}}
              <el-select style="width:100%" remote :remote-method="getSjzdData" v-model="formData[item.COLUMN_NAME.toLowerCase()]">
                <el-option v-for="(item,key) in dropDownListData[item.COLUMN_NAME.toLowerCase()]" :key="key" :label="item.NAME" :value="item.id"></el-option>
              </el-select>
            </template>

            <template v-else-if="item.PROPERTY_TYPE == '4'">
              <!--数据字典-->
              <el-select  style="width:100%" v-model="formData[item.COLUMN_NAME]">
                <el-option v-for="(item,key) in dropDownListData[item.COLUMN_NAME.toLowerCase()]" :key="key" :label="item.NAME" :value="item.id"></el-option>
              </el-select>
            </template>

            <template v-else-if="item.PROPERTY_TYPE == '5'">
              <!--日期-->
              <el-date-picker value-format="yyyy-MM-DD"  style="width:100%" v-model="formData[(item.COLUMN_NAME).toLowerCase()]" type="date" placeholder="选择日期">
              </el-date-picker>
            </template>
            <template v-else>
              <el-input width="320" v-model="formData[(item.COLUMN_NAME).toLowerCase()]"></el-input>
            </template>
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
  name: 'resEdit',
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
        if (item.PROPERTY_TYPE == '2' || item.PROPERTY_TYPE == '4') {
          vm.getSjzdData(item.COLUMN_NAME.toLowerCase(), item.TYPESQL)
        }
        if(item.PROPERTY_TYPE == '10'){
          this.primaryKey.name = item.COLUMN_NAME
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
        this.$ajax.post(this.$api.editTableData, params).then(res => {
          if (res && res.data && res.data.data == 1) {
            this.$message.editSuccess()
            this.$router.go(-1)
          }else{
            this.$message.editError(res.data.errmsg)
          }
        })
      } else {
        this.$ajax.post(this.$api.addTableData, params).then(res => {
          if (res && res.data && res.data.data == 0) {
           this.$message.addSuccess()
            this.$router.go(-1)
          }else{
            this.$message.addError(res.data.errmsg)
          }
        })
      }
    },
    //获取表单属性配置信息
    getConfig() {
      return this.$ajax
        .get(this.$api.getTableColumns, {
          flag: 'UPDATE',
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
