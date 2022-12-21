<template>
<div class="main-border">
  <el-menu default-activate="1" class="el-menu-demo" mode="horizontal" @select="selectUserType">
    <el-menu-item index="1">正常用户</el-menu-item>
    <el-menu-item index="2">违规用户</el-menu-item>
  </el-menu>
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
    <el-table-column
        prop="signInTime"
        label="注册时间"
        show-overflow-tooltip
        width="200">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="danger"
            @click="sealUser(scope.$index)">封号</el-button>
      </template>
    </el-table-column>
  </el-table>
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
        width="150"
    >
    </el-table-column>
    <el-table-column
        prop="signInTime"
        label="注册时间"
        show-overflow-tooltip
        width="200">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="success"
            @click="unsealUser(scope.$index)">解封</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="nowPage"
        :page-size="7"
        background
        layout="prev, pager, next,jumper"
        :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "userList",
  data () {
    return {
      mode: 1,
      nowPage: 1,
      total: 52,
      adminRegVisible: false,
      adminAccount:'',
      adminPassword:'',
      adminRePassword:'',
      adminName:'',
      userData: [],
      badUserData:[],
      userManage:[]
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.nowPage = val;
      if (this.mode == 1){
        this.getUserData();
      }
      if (this.mode == 2) {
        this.getBadUserData();
      }
    },
    selectUserType(val) {
      if (this.mode !== val) {
        this.mode = val;
        this.handleCurrentChange(val);
      }
    },
    getUserData() {

    },
    getBadUserData() {

    },
    sealUser(i) {

    },
    unsealUser(i) {

    },
    regAdmin() {

    }
  }
}
</script>

<style scoped>
.main-border{
  background-color: #FFF;
  padding: 10px 30px;
  box-shadow: 0 1px 15px -6px rgba(0,0,0,.5);
  border-radius: 5px;
}

</style>