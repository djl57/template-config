<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">admin</el-tag>
          can see this :
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['djlun']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">djlun</el-tag>
          can see this :
        </span>
        <el-tag v-permission="['djlun']" class="permission-sourceCode" type="info">
          v-permission="['djlun']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin','djlun']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">djlun</el-tag>
          can see this :
        </span>
        <el-tag v-permission="['admin','djlun']" class="permission-sourceCode" type="info">
          v-permission="['admin','djlun']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission'+key">
      <code style="margin-top:20px;">
        在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 组件或 el-table-column 以及其它动态渲染 dom 的场景。只能通过手动设置 v-if 来实现。
        <br> e.g.
      </code>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          Admin can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['djlun'])" label="Djlun">
          Djlun can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['djlun'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['admin','djlun'])" label="Admin-OR-Djlun">
          Both admin or djlun can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index'
import SwitchRoles from './components/SwitchRoles'
import checkPermission from '@/utils/permission'

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .permission-alert {
    display: inline-block;
    width: 320px;
    margin-top: 15px;
    background-color: #ffffff;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
  }
  .permission-sourceCode {
    margin: 10px 0 0 15px;
  }
  .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>
