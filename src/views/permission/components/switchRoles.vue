<template>
  <div>
    <div style="padding-bottom: 15px;">你的权限：{{ roles }}</div>
    切换权限：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="djlun"></el-radio-button>
      <el-radio-button label="admin"></el-radio-button>
    </el-radio-group>
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
        this.$store.dispatch('ChangeRoles', val)
        .then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
