<template>
  <div class="main-border">
    <!--顶层页面选择，可选正常用户or违规用户-->
    <el-menu default-activate="1" class="el-menu-demo" mode="horizontal" @select="selectUserType">
      <el-menu-item index="1">正常用户</el-menu-item>
      <el-menu-item index="2">违规用户</el-menu-item>
    </el-menu>

    <!--正常用户的显示界面-->
    <el-table v-show="this.mode == 1"
              :data="userData"
              stripe
              style="width: 100%;color: #5a5c61;">
      <el-table-column label="头像" width="50">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="23" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
          prop="accountNumber"
          label="用户账号"
          show-overflow-tooltip
          min-width="150"
          width="150">
      </el-table-column>

      <el-table-column
          prop="nickname"
          label="用户昵称"
          show-overflow-tooltip
          min-width="150"
          width="150">
      </el-table-column>

      <!--给用户封号的操作-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="sealUser(scope.$index)">封号
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--违规用户的界面-->
    <el-table v-show="this.mode == 2"
              :data="badUserData"
              stripe
              style="width: 100%;color: #5a5c61;">
      <el-table-column
          label="头像"
          width="50">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="23" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
          prop="accountNumber"
          label="用户账号"
          show-overflow-tooltip
          min-width="150"
          width="150">
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="用户昵称"
          show-overflow-tooltip
          width="150">
      </el-table-column>

      <!--解封用户账号-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="unsealUser(scope.$index)">解封
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--切换页码-->
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="nowPage"
          :page-size="1"
          background
          layout="prev, pager, next,jumper"
          :total="totalPageNum">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import login from "@/views/login.vue";

export default {
  name: "userList",
  data() {
    return {
      mode: 1,
      nowPage: 1,
      totalPageNum: 1,
      // adminRegVisible: false,
      // adminAccount: '',
      // adminPassword: '',
      // adminRePassword: '',
      // adminName: '',
      userData: [],
      badUserData: [],
      userManage: []
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    // 切换页面
    handleCurrentChange(val) {
      console.log("现在开始刷新界面，旧界面: " + this.nowPage)
      console.log("即将跳转新界面: " + val)
      console.log(typeof(val))
      this.nowPage = Number(val);
      if (this.mode == 1) {
        this.getUserData();
      }
      if (this.mode == 2) {
        this.getBadUserData();
      }
    },
    // 选择是正常or违规用户
    selectUserType(val) {
      console.log("切换mode，mode=" + val)
      if (this.mode !== val) {
        this.mode = Number(val);
        this.nowPage = 1;
        if (val == 1) {
          this.getUserData();
        } else {
          this.getBadUserData();
        }
      }
    },
    // 获取正常用户的信息
    getUserData() {
      console.log("现在是usrlist接收到的信息")
      this.$api.findUser({
        page: this.nowPage,
        nums: 8,
        status: 0  // 约定，0表示正常，1表示被封禁。目前所有的管理员都是正常的，只有一般用户的号会被封
      }).then(res => {
        if (res.status_code === 1) {
          // 获取总的页数
          this.totalPageNum = Number(res.pageNum);
          console.log("正常用户的总页数: " + this.totalPageNum)
          // 获取用户信息
          this.userData = []
          for (let ii = 0; ii < res.data.length; ii++) {
            this.userData[ii] = {
              accountNumber:res.data[ii].id,
              nickname:res.data[ii].nickname
            }
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 获取违规用户的信息
    getBadUserData() {
      console.log("开始获取违规用户")
      this.$api.findUser({
        page: this.nowPage,
        nums: 8,
        status: 1  // 约定，0表示正常，1表示被封禁。目前所有的管理员都是正常的，只有一般用户的号会被封
      }).then(res => {
        console.log(res)
        if (res.status_code === 1) {
          // 获取总的页数
          console.log("正确获取了违规用户的信息，总页数: " + res.pageNum)
          this.totalPageNum = Number(res.pageNum);
          // 获取用户信息
          this.badUserData = []
          for (let ii = 0; ii < res.data.length; ii++) {
            this.badUserData[ii] = {
              accountNumber:res.data[ii].id,
              nickname:res.data[ii].nickname
            }
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 给用户封号
    sealUser(i) {
      console.log("开始封号")
      this.$api.updateUserStatus({
        id: this.userData[i].accountNumber,
        status: 1  // 1表示被封号
      }).then(res => {
        if (res.status_code === 1) {
          // 重新刷新界面
          this.getUserData();
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 解封用户账号
    unsealUser(i) {
      this.$api.updateUserStatus({
        id: this.badUserData[i].accountNumber,
        status: 0  // 0表示被解封，是正常的账号
      }).then(res => {
        if (res.status_code === 1) {
          // 重新刷新界面
          this.getBadUserData();
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.main-border {
  background-color: #FFF;
  padding: 10px 30px;
  box-shadow: 0 1px 15px -6px rgba(0, 0, 0, .5);
  border-radius: 5px;
}

</style>