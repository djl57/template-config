<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- separator：分隔符（默认 / ） -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index === levelList.length-1" 
              class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
// import pathToRegexp from 'path-to-regexp'

export default {
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // console.log(this.$route.path) // /dashboard
      // console.log(this.$route.params) // {}
      // console.log(this.$route.query) // {}
      // console.log(this.$route.router) // undefined
      // console.log(this.$route.matched) // (2) [{…}, {…}]
      // console.log(this.$route.name) // undefined
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{
          path: '/dashboard',
          meta: {
            title: '首页'/* title: 'Dashboard' */
          }
        }].concat(matched)
      }
      // !== 的优先级 高于 &&
      this.levelList = matched.filter(item => item.meta && item.meta.title)
      console.log('面包屑导航栏列表：', this.levelList)
    },
    handleLink(item) {
      const { redirect, psth } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      // this.$router.push(this.pathCompile(path))
      this.$router.push(path)
    },
    // pathCompile(path) {
    //   const { params } = this.$route
    //   let toPath = pathToRegexp.compile(psth)
    //   return toPath(params)
    // }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
