
<template>
  <div class="layout">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="'logo-width'">
        <img class="logoImg" :src="logo" height="35">
        <h1>{{title}}</h1>
      </el-col>
      <el-col :span="10">
        <el-menu router :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#232f3f" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item v-for="(item,index) in $router.options.routes[0].children" :key="index" :index="item.path" v-if="!item.hidden">{{item.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="userinfo">
        <img :src="this.userAvatar" />
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            {{userName}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <div class="main">
      <aside class="tree">
        <resTree></resTree>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{item.name}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{$store.state.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view class="router-view"></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import resTree from '../components/res/res-tree'
import logo from '../assets/img/logo.svg'
import userAvatar from '../assets/img/user.png'
export default {
  components: {
    resTree
  },
  data() {
    return {
      logo: logo,
      title: 'Res Manager',
      userName: '我来也',
      userAvatar: userAvatar,
      collapsed: false,
      menuData: [],
      activeIndex: '/resMgr'
    }
  },
  mounted() {},
  methods: {
    handleSelect(key) {
      this.$store.commit('activeMenu', key.replace('/', ''))
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #232f3f;
}
.layout {
  height: 100%;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background-color: #232f3f;
    .logo {
      display: flex;
      padding-left: 30 * @base;
      align-items: center;
    }
    h1 {
      color: #fff;
      font-size: 32px;
      margin-left: 10px;
    }
    .userinfo {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20 * @base;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        margin-left: 16 * @base;
        font-weight: 900;
      }
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    width: 100%;
    .tree {
      width: 200px;
      .el-tree {
        padding: 20px;
        background-color: #eef1f6;
      }
    }
  }
  .breadcrumb-container {
    padding: 20px;
    border-bottom: 1px solid #eeeeee;
  }
  .router-view {
    height: 100%;
    padding: 22px 20px;
    overflow-y: auto;
  }
}

.content-container {
  flex: 1;
  overflow-y: scroll;
  .breadcrumb-container {
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: right;
    }
  }
  .content-wrapper {
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
