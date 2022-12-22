<!--进入网页后的主页-->

<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div style="min-height: 85vh;">
        <!-- 这是上层显示的一些分类-->
        <el-tabs v-model="labelName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="数码" name="1"></el-tab-pane>
          <el-tab-pane label="家电" name="2"></el-tab-pane>
          <el-tab-pane label="户外" name="3"></el-tab-pane>
          <el-tab-pane label="图书" name="4"></el-tab-pane>
          <el-tab-pane label="其他" name="5"></el-tab-pane>
        </el-tabs>
        <div style="margin: 0 20px;">
          <el-row :gutter="30">
            <el-col :span="6" v-for="(idle,index) in idleList">
              <div class="idle-card" @click="toDetails(idle)">
                <el-image
                    style="width: 100%; height: 160px"
                    :src="idle.imgUrl"
                    fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline">无图</i>
                  </div>
                </el-image>
                <div class="idle-title">
                  {{ idle.name }}
                </div>
                <el-row style="margin: 5px 10px;">
                  <el-col :span="12">
                    <div class="idle-prive">￥{{ idle.price }}</div>
                  </el-col>
                </el-row>
                <div class="idle-time">{{ idle.str }}</div>
                <div class="user-info">
                  <el-image
                      style="width: 30px; height: 30px"
                      :src="idle.user.avatar"
                      fit="contain">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline">无图</i>
                    </div>
                  </el-image>
                  <div class="user-nickname">{{ idle.user.nickname }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="fenye">
          <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="8"
              layout="prev, pager, next, jumper"
              :total="totalItem">
          </el-pagination>
        </div>
      </div>
      <app-foot></app-foot>
    </app-body>
  </div>
</template>

<script>

import AppHead from '../components/AppHeader.vue';
import AppBody from '../components/AppPageBody.vue'
import AppFoot from '../components/AppFoot.vue'

export default {
  name: "index",
  components: {
    'app-head': AppHead,
    'app-body': AppBody,
    'app-foot': AppFoot
  },
  data() {
    return {
      labelName: 0,
      idleList: [{
        id: 0,
        imgUrl: null,
        name: 'second-hand phone',
        price: '1100',
        str: 'this is amazing',
        user: {
          avatar: null,
          nickname: 'danny',
        }
      }],
      currentPage: 1,
      totalItem: 1
    };
  },
  created() {
    if (this.$router.query.page) {
      this.currentPage = this.$router.query.page;
      this.labelName = this.$router.query.labelName;
    }
    this.findIdle(1)
  },

  methods: {
    findIdle(page) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '加载数据中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0)'
      // });
      // loading.lock=false;
      this.$api.findIdleByLabel({
        idleLabel: this.labelName,
        page: page,
        nums: 8
      }).then(res => {
        console.log(res);
        this.idleList = res.data.list;
        this.totalItem = res.data.count;
        console.log(this.totalItem);
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        //loading.close();
      })

    },
    handleClick(tab, event) {
      console.log(this.labelName);
      this.$router.replace({query: {page: 1, labelName: this.labelName}});
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$router.replace({query: {page: val, labelName: this.labelName}});
    },
    toDetails(idle) {
      this.$router.push({path: '/detail', query: {id: idle.id}});
    }
  }
}
</script>

<style scoped>
.idle-card {
  height: 300px;
  border: #eeeeee solid 1px;
  margin-bottom: 15px;
  cursor: pointer;
}

.fenye {
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
}

.idle-title {
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 10px;
}

.idle-prive {
  font-size: 16px;
  color: red;
}

.idle-place {
  font-size: 13px;
  color: #666666;
  float: right;
  padding-right: 20px;

}

.idle-time {
  color: #666666;
  font-size: 12px;
  margin: 0 10px;
}

.user-nickname {
  color: #999999;
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 10px;
}

.user-info {
  padding: 5px 10px;
  height: 30px;
  display: flex;
}
</style>