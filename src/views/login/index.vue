<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form"
      :model="loginForm"
      :rules="loginRules">
      <!-- 
        model：表单数据对象
        rules：表单验证规则
        label-position="left"
        label-position：表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
        autocomplete="on"
        autocomplete：自动补全
       -->
      <h3 class="title">{{ loginInfo[0] }}</h3>
      <el-form-item prop="username">
        <!-- 
          prop：表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
         -->
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input v-model="loginForm.username"
          name="username"
          type="text"
          placeholder="输入用户名" />
          <!-- autocomplete="on" -->
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.password"
          name="password"
          :type="pwdType"
          placeholder="输入密码"
          @keyup.enter.native="handleLogin" />
          <!-- autocomplete="on" -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'passward' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" 
          type="primary" 
          style="width:100%;"
          @click.native.prevent="handleLogin">
          <span style="letter-spacing: 12px;">{{ loginInfo[0] }}</span>
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">测试用户名: djlun</span>
        <span> 测试密码: djlun</span>
        <div class="register" @click="toggleOperate">
          <i class="el-icon-back arrow"></i>
          <span>{{ loginInfo[1] }}</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // console.log(rule)
      // console.log(value) // djlun
      // console.log(callback)
      if (value !== 'djlun') {
        callback(new Error('请使用测试用户名登录'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      // console.log('value', value)
      if (value !== 'djlun') {
        callback(new Error('测试密码错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: { 
        username: 'djlun', 
        password: 'djlun' 
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePass
          }
        ],
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      loginInfo: [ '登录', '注册' ],
      loginType: 'login' // or register
    }
  },
  methods: {
    showPwd() {
      this.pwdType === 'password' ? this.pwdType = 'text' : this.pwdType = 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log('valid', valid) // true
        if (valid) {
          this.loading = true
          // setTimeout(() => {
          //   this.loading = false
          //   this.$router.push({ path: '/' })
          // }, 2000)
          console.log('点击登录')
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toggleOperate() {
      const info = {
        'login': [ '登录', '注册' ],
        'register': [ '注册', '登录' ]
      }
      this.loginType === 'login' ? this.loginType = 'register' : this.loginType = 'login'
      this.loginInfo = info[this.loginType]
    }
  }
}
</script>

<style lang="scss">
@import 'src/styles/variables';

// element样式重置
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
@import 'src/styles/variables';
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px;
    margin: 120px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 32px; 
    color: $light_gray;
    margin: 0 auto 40px;
    text-align: center;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      // 指定首个元素
      &:first-of-type {
        margin-right: 16px;
      }
    }
    .register {
      float: right;
      display: inline-block;
      cursor: pointer;
    }
    .arrow {
      transform: rotate(180deg);
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
