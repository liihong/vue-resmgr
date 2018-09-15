<template>
  <div>
    <res-table></res-table>
  </div>
</template>
<script>
  import resTable from '@/components/res/res-table.vue'

  export default {
    components:{
      resTable
    },
    data(){
      return {
        data:[]
      }
    },
    computed:{
        tableId() {
            return this.$route.query.tableId
        }
    },
    mounted(){
        this.getColumnData()
        // console.log(this.$route)
    },
    methods: {
      getColumnData(){
        this.$ajax.get(this.$api.getResColumnData,{
            tableId: this.tableId
        }).then((res) => {
            console.log(res)
          if(res.status === 1)
            this.data = res.data
        })
      }
    }
  }
</script>
<style>

</style>
