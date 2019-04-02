let api = {
  // user
  addUser: '/user/addUser',

  getResTree: '/resTree',
  getResTreeChildren: '/resTree/getResTreeChildren',

  getResColumnData: '/resTableColumn/getResColumnData',

  //资源呈现时表头信息
  getTableColumns: '/resTableColumn/getTableColumn',
  getDropDownListData: '/resTableColumn/getDropDownListData',
 
  getTableRes: '/resTable',
  addTableRes: '/resTable/addTableRes',
  editTableRes: '/resTable/editTableRes',
  deleteTableRes: '/resTable/deleteTableRes',
  
  //根据配置创建物理表
  createTable: '/resTable/createTable',
  loadTable: '/resTable/loadTable',

  // 资源属性的操作
  addTableResColumns: '/resTableColumn/addTableResColumns',
  editTableResColumns: '/resTableColumn/editTableResColumns',
  //对物理表进行操作的接口
  queryTableData: '/tableData/queryTableData',
  queryDataById: '/tableData/queryTableDataById',
  addTableData: '/tableData/add',
  editTableData: '/tableData/edit',
  deleteTableData: '/tableData/delete',
  exportExcel: '/tableData/exportExcel'
}
export default api