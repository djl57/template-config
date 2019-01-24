<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="decice === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    NavBar,
    SideBar,
    AppMain
  },
  computed: {
    classObj() {
      return {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  @include relative;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
