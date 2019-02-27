let api = {
  // user
  addUser: '/user/addUser',

  getResTree: '/resTree',
  getResTreeChildren: '/resTree/getResTreeChildren',

  getResColumnData: '/resTableColumn/getResColumnData',

  //资源呈现时表头信息
  getTableColumns: '/resTableColumn/getTableColumn',
  //资源呈现时数据查询
  queryTableData: '/resTable/queryTableData',
  queryDataById: '/resTable/queryDataById',

  addTableRes: '/resTable/addTableRes',
  editTableRes: '/resTable/editTableRes',
  deleteTableRes: '/resTable/deleteTableRes'
}
export default api