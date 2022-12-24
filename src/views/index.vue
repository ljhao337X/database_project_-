<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div style="background-color: #FFFFFF">
        <!-- 这是上层显示的一些分类-->
        <el-tabs v-model="labelName" type="border-card" @tab-click="handleClick">
<!--          options: ['户外', '数码', '居家', '图书', '服装', '饰品', '化妆品'],-->
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="户外" name="1"></el-tab-pane>
          <el-tab-pane label="数码" name="2"></el-tab-pane>
          <el-tab-pane label="居家" name="3"></el-tab-pane>
          <el-tab-pane label="图书" name="4"></el-tab-pane>
          <el-tab-pane label="服装" name="5"></el-tab-pane>
          <el-tab-pane label="饰品" name="6"></el-tab-pane>
          <el-tab-pane label="化妆品" name="7"></el-tab-pane>
          <div style="margin: 0 20px;">
            <el-row :gutter="30">
              <el-col :span="6" v-for="(item,index) in idleList">
                <div class="idle-card" @click="toDetails(item.idle)">
                  <el-image
                      style="width: 100%; height: 160px; border-radius:10px"
                      :src="item.idle.picture1"
                      fit="contain">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline">无图</i>
                    </div>
                  </el-image>
                  <div class="idle-title">
                    {{ item.idle.name }}
                  </div>
                  <el-row style="margin: 5px 10px;">
                    <el-col :span="12">
                      <div class="idle-prive">￥{{ item.idle.price }}</div>
                    </el-col>
                  </el-row>
                  <div class="idle-time">{{ item.idle.details }}</div>
                  <div class="user-info">
                    <el-image
                        style="width: 30px; height: 30px"
                        :src="item.user.avatar"
                        fit="contain">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline">无图</i>
                      </div>
                    </el-image>
                    <div class="user-nickname">{{ item.user.nickname }}</div>
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
        </el-tabs>

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
        idle: {
          id: 0,
          imgUrl: null,
          name: 'second-hand phone',
          price: '1100',
          details: 'this is amazing',
          picture1: '',
        },
        user: {
          id: '',
          avatar: null,
          nickname: 'danny',
        }
      }],
      currentPage: 1,
      totalItem: 8
    };
  },
  created() {
    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page;
      this.labelName = this.$route.query.labelName;
    }
    console.log(this.currentPage)
    this.findIdle()
  },

  methods: {
    findIdle() {
      //抄的别人的加载方法
      const loading = this.$loading({
        lock: true,
        text: '加载数据中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      });
      loading.lock = false;
      this.$api.findIdleByLabel({
        idleLabel: this.labelName,
        page: this.currentPage,
        nums: 8
      }).then(res => {
        console.log(res);
        this.idleList = res.data;
        this.totalItem = res.data.count;
        console.log(this.totalItem);
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        loading.close();
      })

    },
    handleClick(tab, event) {
      console.log(this.labelName);
      //强制回到第一页
      this.currentPage = 1;
      this.findIdle();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.findIdle();
    },
    toDetails(idle) {
      this.$router.push({path: '/details', query: {id: idle.id}});
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
  border-radius: 10px;
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