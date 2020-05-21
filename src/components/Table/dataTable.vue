<!--公用组件：数据表格
   /**
   * hb-table
   * @module common/dataTable
   * @desc 数据表格
   * @author lihong
   * @date 2017年12月05日17:22:43
   * @param {Object} [title]    - 标题名称 title.name title.unit
   * @param {string} [columns] - 列名数组对象
   * @param {Object} [tableData]  - 表数据
   * @param {Boolean} [noFootBold]  - 是否最后一行加粗，true不加粗
   * @param {Boolean} [noFormate]  - 是否格式化数字
   * @example
   *  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
   */
-->
<template>
  <div class="mytable">
    <div class="hb-table">
      <el-table :row-class-name="rowClass" fit :data="tableData" stripe border header-cell-class-name="table_th" v-if="tableData && tableData.length>0">
        <el-table-column type="index" width="40" v-if='index'>
        </el-table-column>
        <el-table-column prop="indexx" label="序号" width="80" v-if='tableData && tableData[0] && tableData[0].indexx' align="center">
        </el-table-column>
        <el-table-column :align="row.align==undefined?(row.id=='name'?'center':'right'):row.align" v-for="(row,resConfig) in columns" :key="resConfig" :prop="row.id" :type="row.type" :label="row.name" :min-width="row.length">
          <template slot-scope="scope">
            <div v-if="row.id == 'orgName'">
              <router-link style="color:#606266;font-size:16px;" :to="{path: '/orgDetail', query: { orgName: scope.row[row.id] } }">{{scope.row[row.id]}}<img width="16" v-show="scope.row['id'] == 0" src="../assets/imgs/xingxing.svg"></router-link>
            </div>
            <div v-if="row.id == 'orgId'">
              <router-link style="color:#606266;font-size:16px;" :to="{path: '/orgDetail', query: { id: scope.row[row.id] } }">{{scope.row['orgName']}}<img width="16" v-show="scope.row['id'] == 0" src="../assets/imgs/xingxing.svg"></router-link>
            </div>
            <slot v-else-if="row.slot" :row="scope.row" :index="scope.$index" :name="row.slot"></slot>
            <div v-else>{{scope.row[row.id]}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div v-else="">
        <p class="noNum">{{noNum}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hbTable',
  props: {
    noNum: {
      type: String,
      default: '暂无数据'
    },
    index: {
      type: Boolean,
      default: false
    },
    columns: {},
    tableData: {},
  },
  data() {
    return {
      newTableData: []
    }
  },
  methods: {
    rowClass(row) {
      if (!this.noFootBold) {
        if (row.rowIndex == this.tableData.length - 1) return 'total'
      }
      if (this.noBodyStyle) {
        return 'dk-row'
      }
      if (this.columnStyle) {
        return 'red-row'
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
.mytable {
  .hb-table {
    .table_th {
      text-align: center;
      vertical-align: middle !important;
      height: 38 * @base;
      opacity: 0.7;
      background: #f8f4f4;
      div {
        text-align: center;
        font-weight: 600;
        padding: 0;
      }
    }

    .table_th:nth-child(2) {
      .cell {
        padding-right: 1px;
      }
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #f6f6f6 !important;
  }
  .noFootBold {
    td {
      background: transparent !important;
    }
    div {
      font-weight: inherit !important;
    }
  }
  .noNum{
    height: 100px;
    margin: 0 auto;
    text-align: center;
    line-height: 100px;
  }
}
</style>
