<template>
  <div style="background-color: #f6f6f6;min-height:100vh;">
    <el-container>

      <el-header>
        <div class="header">
          <div class="app-name">
            <router-link to="/admin">后台管理</router-link>
          </div>
          <!-- 输出管理员+管理员的名字 -->
          <span class="app-title">管理员：{{ admin.nickname }}</span>
          <div class="app-logOut">
            <el-button style="margin-right: 100px" type="primary" @click="logout">退出登录</el-button>
          </div>
          <div class="app-logOut">
            <el-button style="margin-right: 100px" type="primary" @click="jumpToMyProfile">个人主页</el-button>
          </div>
        </div>
      </el-header>

      <el-container>
        <div class="mainBody">
          <el-aside>
            <el-col :span="24">
              <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @select="handleSelect"
                  background-color="#ffffff"
                  text-color="#303133"
                  active-text-color="#409EFF">

                <el-menu-item index="1">
                  <i class="el-icon-goods"></i>
                  <span>闲置管理</span>
                </el-menu-item>

                <el-menu-item index="2">
                  <i class="el-icon-s-goods"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>

                <el-menu-item index="3">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>

          <el-main>
            <idleList v-if="mode == 1"></idleList>
            <orderList v-if="mode == 2"></orderList>
            <userList v-if="mode == 3"></userList>
          </el-main>
        </div>
      </el-container>
    </el-container>
    <div class="foot">
      <app-foot></app-foot>
    </div>
  </div>
</template>

<script>
import AppFoot from "@/components/AppFoot";
import idleList from "@/components/idleList";
import orderList from "@/components/orderList";
import userList from "@/components/userList";

export default {
  name: "admin",
  components: {
    'app-foot': AppFoot,
    'idleList': idleList,
    'orderList': orderList,
    'userList': userList
  },
  data() {
    return {
      admin: {
        nickname: 'i am default'
      },
      mode: 1
    }
  },
  created() {
    // 似乎是刷新一下sta的值都会变化，换成$store中的值
    this.admin.nickname = this.$store.state.admin.nickname;
  },
  methods: {
    logout() {
      // 登出的函数
      this.$store.commit('set_admin_is_login', false);
      this.$store.commit('set_admin_nickname', "");
      this.$store.commit('admin_logout');
      // 如果登出，会跳转到index界面
      this.$router.push({path: '/index'});
    },

    jumpToMyProfile() {
      // 跳转到个人主页
      this.$router.push({path: '/myProfile'});
    },

    handleSelect(val) {
      console.log("尝试更换mode")
      if (this.mode !== val) {
        this.mode = val
      }
    },
  },
}

</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: 100vw;
  height: 60px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: #eeeeee solid 2px;
  z-index: 1000;
}

.app-name {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10vw;
  flex: 1;
  height: 100%;
  border-right: 1px solid #e5e5e5;
}

.app-name a {
  color: #409EFF;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  padding: 0 20px;
}

.app-title {
  display: flex;
  justify-content: center;
  flex: 8;
}

.app-logOut {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}

.mainBody {
  display: flex;
  width: 100%;
}

aside {
  flex: 1;
  box-sizing: content-box;
  min-width: 10vw;
  min-height: calc(100vh - 120px);
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}

main {
  flex: 9;
}

.foot {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 58px;
  background-color: #ffffff;
}
</style>