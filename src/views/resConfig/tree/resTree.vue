<template>
  <div>
   <!-- <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="newRes">新增资源</el-button> -->
    <el-tree ref="menuTree" lazy :data="data" node-key="id" :default-expanded-keys="['01']" :props="defaultProps" :load="loadData" @node-click="selectTree"></el-tree>
    <resForm :dialogState="dialogState"></resForm>
  </div>
</template>
<script>

import Tree from 'element-ui'
import resForm from '../components/resForm'
export default {
  extends: Tree,
  components:{
    resForm
  },
  data() {
    return {
      contextMenuTarget: 'menuTree',
      contextMenuVisible: false,
      data: [],
      defaultProps: {
        label: 'title',
        children: 'children',
        isLeaf: 'leaf'
      },
       dialogState: {
        show: false,
        type: 'add',
        formData: {}
      },
    }
  },
  methods: {
    newRes(){
      this.dialogState.show = true
    },
    getResTree() {
      this.$ajax.get(this.$api.getResTree).then(res => {
        if (res.data) this.data = res.data
      })
    },
    loadData(item, callback) {
      let data = []
      setTimeout(() => {
        this.$ajax
          .get(this.$api.getResTreeChildren, { id: item.data.id })
          .then(res => {
            if (res.data) {
              data = res.data
              callback(data)
            }
          })
      }, 500)
    },
    selectTree: function(item) {
      this.$store.commit('title', item['title'])
      this.$store.commit('tableId', item['id'])
      if (this.$store.state.activeMenu === 'resMgr') {
        this.$router.push({
          path: '/resConfigList',
          query: { tableId: item['id'] }
        })
      } else {
        this.$router.push({
          path: '/resDisplay',
          query: { tableId: item['id'] }
        })
      }
    }
  },
  mounted() {
    this.getResTree()
  }
}
</script>
<style lang="less" scoped>
.el-tree {
  height: 100%;
}
.right-menu {
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  display: block;
  font-family: Microsoft Yahei, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  z-index: 999;
  display: none;
  a {
    padding: 2px 15px;

    // width: 120px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    color: #1a1a1a;
  }
  user agent stylesheet a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
  }
  a:hover {
    background: #42b983;
    color: #fff;
  }
}
</style>
