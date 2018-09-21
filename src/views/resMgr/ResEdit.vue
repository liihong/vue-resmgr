<template>
  <div class="resEdit">
    <el-card class='card-content'>
      <div slot='header' class='card-header'>{{optionType == 'add' ? '新增' : '编辑'}}</div>
      <el-form class="form" :inline="true" ref="form" :model="formData" label-width="120px" size="small">
        <el-row v-show="item.property_type !== '10'" v-for="(item,i) in columnData" :key="i" class="item">
          <el-col :span="8" class="title">
            <span>{{item.column_cname}}-{{item.property_type}}</span>
          </el-col>
          <el-col :span="16">
            <template v-if="item.property_type == '10'">
              <span v-show="false">{{formData[(item.column_name).toLowerCase()]}}</span>
            </template>
            <template v-else-if="item.property_type == '2'">
              <!--下拉选择-->

              <el-select remote :remote-method="getSjzdData" v-model="formData[item.column_name]"></el-select>
            </template>
            <template v-else-if="item.property_type == '4'">
              <!--数据字典-->
              <el-select v-model="formData[item.column_name]"></el-select>
            </template>
            <template v-else-if="item.property_type == '5'">
              <!--日期-->
              <el-date-picker v-model="formData[(item.column_name).toLowerCase()]" type="date" placeholder="选择日期">
              </el-date-picker>
            </template>
            <template v-else>
              <el-input width="320" v-model="formData[(item.column_name).toLowerCase()]"></el-input>
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
      dropDownListData: {}
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
    this.getConfig().then(res => {
      this.columnData.forEach(item => {
        console.log(item)
        if (item.property_type == '2') {
          vm.getSjzdData(item.typesql)
        }
      })
    })
    this.getFormData()
  },
  methods: {
    onSubmit() {},
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
    getSjzdData(sql) {
      this.$ajax
        .get(this.$api.queryDropDownListData, {
          typesql: sql
        })
        .then(res => {
          this.formData = res.data
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
