<template>
  <div class="register-container">
    <el-card class="box-card">
      <div class="register-body">
        <div class="register-text">注册账号</div>
        <el-input placeholder="请输入学号" v-model="studentNumber" class="register-input" clearable>
          <template slot="prepend">
            <div class="el-icon-user-solid"></div>
          </template>
        </el-input>
        <el-input placeholder="请输入密码..." show-password maxlength="16" v-model="password" class="register-input" clearable>
          <template slot="prepend">
            <div class="el-icon-lock"></div>
          </template>
        </el-input>
        <el-input placeholder="请确认密码..." maxlength="16" v-model="checkPassword" class="register-input" clearable>
          <template slot="prepend">
            <div class="el-icon-lock"></div>
          </template>
        </el-input>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
      <div class="left-bottom">
        <el-link icon="el-icon-top-left" @click="toLogin">已有账号？</el-link>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: "Register",
  data() {
    return{
      studentNumber: '',
      password: '',
      checkPassword: ''
    }
  },
  methods: {
    toLogin() {
      this.$router.push('login')
    },
    register() {

    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f1f1f1;
}

.register-input {
  margin-bottom: 20px;
}

.register-text {
  color: #409EFF;
  font-size: 16px;
  text-decoration: none;
  line-height:28px;
}

.register-body {
  padding: 30px;
  width: 400px;
  height: 100%;
}
.left-bottom{
  float: left;
  padding: 10px;
  margin-bottom: 10px;
}


.login-container{
  padding: 0 10px;
}

</style>