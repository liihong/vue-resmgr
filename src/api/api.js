let api = {
  // user
  addUser: '/user/addUser',

  getResTree: '/resTree',
  getResTreeChildren: '/resTree/getResTreeChildren',

  getResColumnData: '/resTableColumn/getResColumnData',

  //资源呈现时表头信息
  getTableColumns: '/resTableColumn/getTableColumn',
  getDropDownListData: '/resTableColumn/getDropDownListData',
 

  addTableRes: '/resTable/addTableRes',
  editTableRes: '/resTable/editTableRes',
  deleteTableRes: '/resTable/deleteTableRes',

  editTableResColumns: '/resTableColumn/editTableResColumns',

  //对物理表进行操作的接口
  queryTableData: '/tableData/queryTableData',
  queryDataById: '/tableData/queryTableDataById',
  addTableData: '/tableData/add',
  editTableData: '/tableData/edit',
  deleteTableData: '/tableData/delete'
}
export default api