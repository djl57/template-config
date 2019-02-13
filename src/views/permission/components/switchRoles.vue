<template>
  <div>
    <div class="padding-content">你的权限：{{ roles }}</div>
    <div class="padding-content">
      切换权限：
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="djlun"></el-radio-button>
        <el-radio-button label="admin"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'roles'
    ]),
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        // if(this.roles[0] !== 'admin') {
        //   return this.$message({
        //     showClose: true,
        //     message: '只有 admin 可以切换权限',
        //     type: 'error'
        //   })
        // }
        this.$store.dispatch('ChangeRoles', val)
        .then(() => {
          this.$emit('change', val)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
