<template>
    <div class="userForm">
        <el-dialog size="small" :title="dialogState.name" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form  :inline="true" :model="dialogState.formData" ref="ruleForm" label-width="120px" :rules="rules" class="demo-ruleForm">
                 <el-form-item label="资源ID" prop="TABLE_ID">
                    <el-input size="small" v-model="dialogState.formData.TABLE_ID"></el-input>
                </el-form-item>
                <el-form-item label="资源表名" prop="TABLE_NAME">
                    <el-input size="small" v-model="dialogState.formData.TABLE_NAME"></el-input>
                </el-form-item>
                <el-form-item label="中文表名" prop="RESOURCE_NAME">
                    <el-input size="small" v-model="dialogState.formData.RESOURCE_NAME"></el-input>
                </el-form-item>
               <el-form-item label="表别名" prop="ALIAS_NAME">
                    <el-input size="small" v-model="dialogState.formData.ALIAS_NAME"></el-input>
                </el-form-item>
                <el-row>
                <el-col :span="24">
                <el-form-item label="查询条件sql" prop="WHERE_SQL">
                    <el-input size="small" v-model.number="dialogState.formData.WHERE_SQL"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-col :span="24">
                <el-form-item label="排序条件sql" prop="ORDERBY_SQL">
                    <el-input size="small" v-model.number="dialogState.formData.ORDERBY_SQL"></el-input>
                </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.type == 'edit' ? '修改' : '保存'}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'resForm',
  components: {},
  props: {
    dialogState: Object,
    groups: Array
  },
  data() {
    return {
      roleData: [],
      rules: {
        TABLE_ID: [
          { required: true, message: '请输入表ID', trigger: 'blur'},
        ],
        TABLE_NAME: [
          { required: true, message: '请输入表名', trigger: 'blur' },
        ],
        RESOURCE_NAME: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogState.type == 'edit') {
            this.$ajax.post(this.$api.editTableRes, this.dialogState.formData).then(res => {
              if (res && res.data && res.data.errno == 0) {
                this.$message.editSuccess()
                this.$emit('initData')
                this.dialogState.show = false
              }else{
                this.$message.editError(res.data.errmsg)
              }
            })
          } else {
            this.$ajax.post(this.$api.addTableRes, this.dialogState.formData).then(res => {
              if (res && res.data && res.data.errno == 0) {
                this.$message.addSuccess()
                this.$emit('initData')
                this.dialogState.show = false
              } else {
                this.$message.addError(res.data.errmsg)
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
