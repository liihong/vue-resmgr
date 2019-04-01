<template>
    <div class="userForm">
        <el-dialog size="small" title="资源管理" :visible.sync="dialogState.show" :close-on-click-modal="false">
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
  name: 'userForm',
  components: {},
  props: {
    dialogState: Object,
    groups: Array
  },
  data() {
    return {
      roleData: [],
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur'},
          { max: 20, message: '用户名最多输入20个字符', trigger: 'blur'},
        ],
        roleName: [
          { required: true, message: '请选择角色', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { max: 20, message: '真实姓名最多输入20个字符', trigger: 'blur'},
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    initData() {
      this.$ajax.post(this.$adminApi.getRole).then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data
          this.roleData = data
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogState.formData.status = this.dialogState.formData.status
            ? '1'
            : '0'
          let params = this.$util.objToFormData(this.dialogState.formData)

          if (this.dialogState.type == 'edit') {
            this.$ajax.post(this.$adminApi.editUserInfo, params).then(res => {
              if (res && res.data && res.data.data == 1) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('initData')

                this.dialogState.show = false
              }
            })
          } else {
            this.$ajax.post(this.$adminApi.addUserInfo, params).then(res => {
              if (res && res.data && res.data.data == 1) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$emit('initData')

                this.dialogState.show = false
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
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
