<template>
  <div class="login-container">
    <el-card class="box-card">
      <div class="login-body">
        <div class="login-title" @click="toIndex">北航二手交易平台</div>
        <el-form ref="form" :model="userForm">
          <el-input placeholder="请输入学号..." v-model="userForm.studentNumber" class="'login-input">
            <template slot="prepend">
              <div class="el-icon-user-solid"></div>
            </template>
          </el-input>
          <el-input placeholder="请输入密码..." v-model="userForm.password" class="login-input"
                    @keyup.enter.native="login"  show-password>
            <template slot="prepend">
              <div class="el-icon-lock"></div>
            </template>
          </el-input>
          <div class="login-submit">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </el-form>
      </div>
      <div class="left-bottom">
        <el-link icon="el-icon-bottom-left" @click="toRegister">注册账号</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userForm: {
        studentNumber: 'sy120',
        password: '12121'
      }
    }
  },
  methods: {
    login() {
      if(this.userForm.studentNumber && this.userForm.password) {
        console.log(this.userForm);
        this.$api.userLogin({
          id: this.userForm.studentNumber,
          password: this.userForm.password
        }).then(res => {
          console.log(res);
          if (res.status_code == 1) {
            this.$globalData.userInfo = res.data;
            this.$router.replace({path: '/index'});
          } else {
            this.$message.error(res.message);
          }
        });
      }
      else {
        this.$message.error('请完整填写账号和密码')
      }

    },
    toIndex() {
      this.$router.replace({path:'/index'});
    },
    toRegister() {
      this.$router.push('register')
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f1f1f1;
}

.login-body {
  padding: 30px;
  width: 400px;
  height: 100%;
}

.login-title {
  padding-bottom: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #409EFF;
  cursor: pointer;
}

.login-input {
  margin-top: 20px;
  margin-bottom: 20px;
}

.login-submit {
  display: flex;
  justify-content: center;
}
.left-bottom{
  float: left;
  padding: 10px;
  margin-bottom: 10px;
}

</style>