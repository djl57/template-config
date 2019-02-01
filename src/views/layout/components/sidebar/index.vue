<template>
  <el-menu class="sidebar-menu"
    :show-timeout="200"
    :default-active="$route.path"
    :collapse="isCollapse"
    mode="vertical"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF">
  <!-- 
    show-timeout：展开 sub-menu 的延时 
    default-active：当前激活菜单的 index
    collapse：是否水平折叠收起菜单
    background-color：菜单的背景色（仅支持 hex 格式）
    text-color：菜单的文字颜色（仅支持 hex 格式）
    active-text-color：当前激活菜单的文字颜色（仅支持 hex 格式）
  -->
    <sidebar-item 
      v-for="route in routes" 
      :key="route.path" 
      :item="route" 
      :base-path="route.path"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    console.log('定义的constRouters', this.$router.options.routes)
  }
}
</script>
