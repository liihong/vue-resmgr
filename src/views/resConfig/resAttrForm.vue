<template>
  <div class="userForm">
    <el-dialog size="small" width="60%" :title="dialogState.name" :visible.sync="dialogState.show" :close-on-click-modal="false">
      <div width="60%">
        <el-steps :active="activeStep" finish-status="success" align-center>
          <el-step title="通用基本配置"></el-step>
          <el-step title="类型特性配置"></el-step>
          <el-step title="函数配置"></el-step>
        </el-steps>
      </div>
      <el-form style="width:90%;" :model="dialogState.formData" ref="ruleForm" label-width="140px" :rules="rules" class="demo-ruleForm">
        <el-row v-if="activeStep == 0">
          <el-col :span="8">
            <el-form-item label="字段ID" prop="COLUMN_ID">
              <el-input size="small" v-model="dialogState.formData.COLUMN_ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="属性名称" prop="COLUMN_NAME">
              <el-input size="small" v-model="dialogState.formData.COLUMN_NAME"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="属性中文名" prop="COLUMN_CNAME">
              <el-input size="small" v-model="dialogState.formData.COLUMN_CNAME"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="默认值" prop="DEFAULT_VALUE">
              <el-input size="small" v-model="dialogState.formData.DEFAULT_VALUE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否验证唯一性" prop="ISUNIQUE">
              <el-switch v-model.number="dialogState.formData.ISUNIQUE" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="验证类型" prop="VALIDDATATYPE">
              <el-input size="small" v-model.number="dialogState.formData.VALIDDATATYPE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文本框最大输入长度" prop="INPUTLENGTH">
              <el-input size="small" v-model.number="dialogState.formData.INPUTLENGTH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注" prop="REMARK">
              <el-input size="small" v-model.number="dialogState.formData.REMARK"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else-if="activeStep == 1">
          <!--下拉列表-->
          <dropDown :dialogState="dialogState" v-if="dialogState.formData.PROPERTY_TYPE == 2"></dropDown>
        </el-row>
        <el-row>
          <el-col :span="24" :offset=16>
            <el-form-item>
              <el-button size="medium"  v-if="activeStep !== 0" type="primary" @click="activeStep--">上一步</el-button>
              <el-button size="medium" type="primary" @click="activeStep++">下一步</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset=16 v-if="activeStep == 3">
            <el-form-item>
              <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.type == 'edit' ? '修改' : '保存'}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import dropDown from './components/dropDown.vue'
export default {
  name: 'resForm',
  components: {
    dropDown
  },
  props: {
    dialogState: Object
  },
  data() {
    return {
      activeStep: 0,
      roleData: [],
      rules: {
        TABLE_ID: [{ required: true, message: '请输入表ID', trigger: 'blur' }],
        TABLE_NAME: [
          { required: true, message: '请输入表名', trigger: 'blur' }
        ],
        RESOURCE_NAME: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log(this.dialogState.formData)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogState.type == 'edit') {
            this.$ajax
              .post(this.$api.editTableRes, this.dialogState.formData)
              .then(res => {
                if (res && res.data && res.data.errno == 0) {
                  this.$message.editSuccess()
                  this.$emit('initData')
                  this.dialogState.show = false
                } else {
                  this.$message.editError(res.data.errmsg)
                }
              })
          } else {
            this.$ajax
              .post(this.$api.addTableRes, this.dialogState.formData)
              .then(res => {
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
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
