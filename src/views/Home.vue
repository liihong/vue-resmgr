
<template>
  <div class="layout">
      <div class="header">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="../assets/img/logo.svg" height="35">
            Res Manager
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              资源管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              资源测试
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              资源统计
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              系统管理
            </MenuItem>
          </div>
        </Menu>
      </div>
      <Layout>
        <Sider class="left" hide-trigger>
          <res-tree></res-tree>
        </Sider>
        <Layout class="main">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>{{$store.state.title}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
  </div>
</template>
<script>
  import resTree from '../components/res/res-tree'
  export default {
    components:{
      resTree
    },
    data(){
      return {
      }
    },
    mounted(){
      console.log(this.$store.state.title)
    }
  }
</script>
<style lang="less" scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    height:100%;
    overflow: hidden;
    .left{
      background: #ffffff;
    }
    .main{
      padding: 0 24px 24px;
    }
    .ivu-menu-horizontal{
      height: 70px;
      line-height: 70px;
    }
  }
  .layout-logo{
    font-size: 32px;
    line-height: 70px;
    color: #ffffff;
    border-radius: 3px;
    float: left;
    position: relative;
    left: 20px;
  }
  .layout-nav{
    width: 500px;
    margin: 0 auto;
  }
</style>
