<template>
  <div class="login-container">
    <el-from ref="loginForm"
     :model="loginForm"
     :rules="loginRules"
     class="login-form"
     auto-complete="on"
     label-position="left">
    </el-from>
  </div>
</template>

<script>
export default {

}
</script>
