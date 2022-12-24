<template>
  <div class="header">
    <div class="app-name">
      <router-link to="/">BHT北航二手交易网站</router-link>
    </div>
    <div class="search-container">
      <el-input placeholder="我想搜..." v-model="searchStr">
        <el-button icon="el-icon-search" slot="append" @click="searchItems"></el-button>
      </el-input>
    </div>
    <el-button type="success" @click="postAnItem"><i class="el-icon-plus"></i>发布闲置</el-button>

    <router-link v-if="!isLogin" class="user-name-text" to="/login">登录</router-link>
    <el-dropdown v-else trigger="click">
      <div style="display: flex; align-items: center;
      border-left-style:solid; border-right-style: solid; border-color:#409EFF;
      ">
        <div style="font-style: oblique; font-size: 16px;color: #303133;padding: 15px;">{{ nickname }}
        </div>
        <div class="block" style="padding: 10px">
          <el-avatar :size="40" :src="avatar"></el-avatar>
        </div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div @click="toProfile">个人中心</div>
        </el-dropdown-item>
        <el-dropdown-item divided style="color: red;">
          <div @click="loginOut">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>

export default {
  name: "AppHeader",
  props: ['searchInput', 'nicknameValue', 'avatarValue'],
  data() {
    return {
      searchStr: '',
      nickname: '游客',
      avatar: '',
      isLogin: false
    }
  },
  created() {
    // console.log("header");
    if (!this.$store.state.is_login) {
      this.isLogin = false;
    } else {
      //console.log('header');
      //console.log(this.$store.state.user);
      this.nickname = this.$store.state.user.nickname;
      this.avatar = this.$store.state.user.avatar;
      this.isLogin = true;
    }
  },
  methods: {
    searchItems() {
      this.$router.push({path: '/search', query: {str: this.searchStr}});
    },
    postAnItem() {
      this.$router.push('newpost')
    },
    toProfile() {
      this.$router.push({path: '/myProfile'});
    },
    loginOut() {
      this.$store.commit('logout');
      this.$router.go(0);
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 58px;
  background: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: #eeeeee solid 2px;
  z-index: 1000;

}

.header-container {
  width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-name a {
  color: #409EFF;
  font-size: 24px;
  text-decoration: none;
}

.search-container {
  width: 300px;
}

.user-name-text {
  font-size: 16px;
  font-weight: 600;
  color: #409EFF;
  cursor: pointer;
  text-decoration: none;
}

</style>