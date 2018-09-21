<template>
  <!-- <Tree :data="data" @on-select-change="selectTree" :load-data="loadData" ></Tree> -->
  <el-tree lazy :data="data" node-key="id" :default-expanded-keys="['01']" :props="defaultProps" :load="loadData" @node-click="selectTree"></el-tree>

</template>
<script>
import Tree from 'element-ui'
  export default {
    extends: Tree,
    data () {
      return {
        data: [],
         defaultProps: {
          label: 'title',
          children: 'children',
          isLeaf: 'leaf'
        }
      }
    },
    methods: {
      getResTree() {
        this.$ajax.get(this.$api.getResTree).then((res) => {
           if(res.data)
            this.data = res.data
        })
      },
      loadData (item, callback) {
        let data = []
        setTimeout(() => {
          this.$ajax.get(this.$api.getResTreeChildren, {id: item.data.id}).then((res) => {
            if(res.data){
              data = res.data
              callback(data);
            }
          })
        }, 500);
      },
      selectTree: function (item) {
        this.$store.commit('title', item['title'])
        this.$store.commit('tableId', item['id'])
        if(this.$store.state.activeMenu === 'resMgr'){
          this.$router.push({path: '/resConfigList', query: {tableId: item['id']}})
        }else{
          this.$router.push({path: '/resDisplay', query: {tableId: item['id']}})
        }
      }
    },
    mounted() {
      this.getResTree()
    }
  }
</script>
<style lang="less" scoped>
.el-tree{
  height: 100%;
}
</style>
