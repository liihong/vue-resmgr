<template>
  <Tree :data="data" @on-select-change="selectTree" :load-data="loadData" ></Tree>
</template>
<script>
  export default {
    data () {
      return {
        data: [],
        buttonProps: {
          type: 'ghost',
          size: 'small',
        }
      }
    },
    methods: {
      getResTree() {
        this.$ajax.get(this.$api.getResTree).then((res) => {
           if(res.status === 1)
            this.data = res.data
        })
      },
      loadData (item, callback) {
        let data = []
        setTimeout(() => {
          this.$ajax.get(this.$api.getResTreeChildren, {id: item.id}).then((res) => {
            if(res.status === 1){
              data = res.data
            }
            callback(data);
          })
        }, 500);
      },
      selectTree: function (item) {
        this.$store.commit('title', item[0]['title'])
        this.$router.push({path: '/resConfigList', query: {tableId: item[0]['id']}})
      }
    },
    mounted() {
      this.getResTree()
    }
  }
</script>
