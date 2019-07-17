<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- horizontal水平 / vertical竖直（默认） -->
    <ham-burger :toggle-click="toggleSideBar" 
                :is-active="sidebar.opened" 
                class="hamburger-container"></ham-burger>
    <bread-crumb></bread-crumb>
    <el-dropdown class="avatar-container">
      <!--  trigger="click" hover(默认) / click -->
      <div class="avatar-wrapper">
        <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <a href="https://github.com/djl57/template-config" target="_blank">
          <el-dropdown-item>
            github
          </el-dropdown-item>
        </a>
        <el-dropdown-item divided>
          <span @click="logout">
            退出登录
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumb from '@/components/breadCrumb'
import HamBurger from '@/components/hamBurger'

export default {
  components: {
    BreadCrumb,
    HamBurger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      // this.$router.push({
      //   path: '/login'
      // })
      this.$store.dispatch('LogOut')
      .then(() => location.reload() /* location.reload实现页面刷新 */)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  margin: 6px 8px 8px;
  background-color: #ffffff;
  // box-shadow: 0 1px 4px 0 rgba(238, 238, 238, 0.5);
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  // .screenful {
  //   position: absolute;
  //   right: 90px;
  //   top: 16px;
  //   color: red;
  // }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial; // css initial 关键词（最初的）
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background-color: #eeeeee;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
