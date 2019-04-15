<template>
  <div class="dropDown">
    <el-row>
          <el-col :span="24">
            <el-form-item label="数据源SQL" prop="TYPESQL">
              <el-input size="small" v-model="dialogState.formData.TYPESQL"></el-input>
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
        </el-row>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    dialogState: Object
  },
  data() {
    return {
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.dropDown {
}
</style>
