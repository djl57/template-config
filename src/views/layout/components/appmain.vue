<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 
        过渡模式 mode 
        in-out：新元素先进行过渡，完成之后当前元素过渡离开
        out-in：当前元素先进行过渡，完成之后新元素过渡进入
        -->
      <!-- <router-view></router-view> -->
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'appmain',
  computed: {
    cachedViews() {
      // return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
