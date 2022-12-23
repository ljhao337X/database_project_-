<template>
  <div>
    <app-head :searchInput="searchValue"></app-head>
    <app-body>
      <div style="min-height: 85vh;">
        <div style="margin: 0 20px;padding-top: 20px;">
          <div style="text-align: center;color: #555555;padding: 20px;" v-if="idleList.length===0">暂无匹配的闲置物品</div>
          <el-row :gutter="30">
            <el-col :span="6" v-for="(item,index) in idleList">
              <div class="idle-card" @click="toDetails(item.idle)">
                <el-image
                    style="width: 100%; height: 160px"
                    :src="item.idle.picture1"
                    fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline">无图</i>
                  </div>
                </el-image>
                <div class="idle-title">
                  {{item.idle.name}}
                </div>
                <el-row style="margin: 5px 10px;">
                  <el-col :span="12">
                    <div class="idle-prive">￥{{item.idle.price}}</div>
                  </el-col>
                </el-row>
                <div class="idle-time">{{item.idle.details}}</div>
                <div class="user-info">
                  <el-image
                      style="width: 30px; height: 30px"
                      :src="item.user.avatar"
                      fit="contain">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline">无图</i>
                    </div>
                  </el-image>
                  <div class="user-nickname">{{item.user.nickname}}</div>
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
import AppHead from "@/components/AppHeader";
import AppBody from "@/components/AppPageBody";
import AppFoot from "@/components/AppFoot";

export default {
  name: "search",
  components: {
    'app-head': AppHead,
    'app-body': AppBody,
    'app-foot': AppFoot
  },
  data() {
    return {
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
    }
  },
  created() {
    let searchStr = this.$route.query.str;
    this.$api.findIdleByLabel({
      str: searchStr,
      page: this.currentPage,
      num: 8
    }).then(res => {
      //console.log(res);
      this.idleList = res.data;
      this.totalItem = res.data.count;
      //console.log(this.totalItem);
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    toDetails(idle) {
      this.$router.push({path: '/details', query: {id:idle.id}});
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.findIdle();
    },
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