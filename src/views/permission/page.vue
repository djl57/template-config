<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange"></switch-roles>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import checkPermission from '@/utils/permission'

export default {
  name: 'pagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange(val) {
      if (val !== 'admin') {
        this.$message({
          showClose: true,
          message: '你没有访问此页面的权限，已跳转至首页。',
          type: 'warning'
        })
        this.$router.push({
          path: '/dashboard'
        })
      }
      // this.$router.push({
      //   path: '/permission/index?' + +new Date()
      // })
    }
  }
}
</script>
