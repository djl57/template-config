<template>
  <div class="app-container">
    此页面只有 admin 能看见
    <!-- <switch-roles @change="handleRolesChange"></switch-roles> -->
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'pagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({
        path: '/permission/index?' + +new Date()
      })
    }
  }
}
</script>
