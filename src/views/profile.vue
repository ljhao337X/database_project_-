<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div class="user-info-container">
        <div class="user-info-details">
          <el-upload
              action="http://localhost:8080/file/"
              :on-success="fileHandleSuccess"
              :file-list="imgFileList"
              accept="image/*"
          >
            <el-image
                style="width: 120px; height: 120px;border-radius: 10px;"
                :src="user.avatar"
                fit="contain"></el-image>
          </el-upload>
          <div class="user-info-details-text">
            <div class="user-info-details-text-nickname">{{ user.nickname }}</div>
          </div>
        </div>
      </div>
      <div class="idle-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我发布的" name="post"></el-tab-pane>
          <el-tab-pane label="我卖出的" name="sold"></el-tab-pane>
        </el-tabs>
        <div class="idle-container-list">
          <div v-for="item in idleList" class="idle-container-list-item">
            <div class="idle-container-list-item-detail" @click="toDetails(activeName,item)">
              <!--              依次是图片、价格（状态）、介绍、和下架按钮。-->
              <el-image
                  style="width: 100px; height: 100px;"
                  :src="item.imgUrl"
                  fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline">无图</i>
                </div>
              </el-image>
              <div class="idle-container-list-item-text">
                <div class="idle-container-list-title">
                  {{ item.name }}
                </div>
                <div class="idle-container-list-idle-details" v-html="item.details">
                  {{ item.details }}
                </div>
                <div class="idle-item-foot">
                  <div class="idle-prive">￥{{ item.price }}
                    {{ (activeName === 'post') ? '待出售' : (activeName === 'sold') ? '已出售' : '已下架' }}
                  </div>
                  <el-button v-if="activeName==='post'" type="danger" size="mini" slot="reference"
                             plain @click.stop="handle(activeName,item,index)">
                    举报
                  </el-button>
                  <el-button v-else-if="activeName==='sold'" type="primary" size="mini" slot="reference"
                             plain @click.stop="handle(activeName,item,index)">
                    查看订单
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-foot></app-foot>
    </app-body>
  </div>
</template>

<script>
import AppFoot from "@/components/AppFoot";
import AppHead from "@/components/AppHeader";
import AppBody from "@/components/AppPageBody";

export default {
  name: "MyProfile",
  components: {
    'app-head': AppHead,
    'app-body': AppBody,
    'app-foot': AppFoot
  },
  data() {
    return {
      imgFileList: [],
      activeName: 'post',
      handleName: ['下架', '删除', '取消收藏', '', ''],
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],

      selectedOptions: [],//存放默认值
      user: {
        id: '2037924',
        nickname: 'Danny',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      idleList: [{
        id: '121',
        imgUrl: null,
        name: 'second-hand phone',
        price: '1100',
        details: 'this is amazing',
        user: {
          avatar: null,
          nickname: 'danny',
        }
      }],
    };
  },
  created() {
    if (!this.$globalData.userInfo.nickname) {
      this.$api.getUserInfo({
        id: this.$router.query.userId
      }).then(res => {
        if (res.status_code === 1) {
          this.$globalData.userInfo = res.data;
          this.userInfo = this.$globalData.userInfo;
        }
      })
    } else {
      this.userInfo = this.$globalData.userInfo;
      console.log(this.userInfo);
    }
    this.getMyIdle();
  },
  methods: {
    fileHandleSuccess(response, file, fileList) {

    },
    toDetails(activeName, item) {
      if (activeName == 'post') {
        this.$router.push({path: '/detail', query: {id: item.id}});
      } else if (activeName == 'sold' || activeName == 'order') {
        this.$router.push({path: '/order', query: {id: item.id}});
      }
    },
    handleClick(tab, event) {
      //null
    },
    getMySoldIdle() {
      for (let i = 0; i <= 2; i++) {
        this.$api.getMyIdle({id: this.user.id, status: i}).then(res => {
          if (res.status_code === 1) {
            console.log('getMySoldIdle', res.data);
            this.idleList[i] = res.data;
          }
        })
      }

    },
  }
}
</script>

<style scoped>
.user-info-container {
  width: 100%;
  height: 200px;
  border-bottom: 15px solid #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info-details {
  display: flex;
  height: 140px;
  align-items: center;
  margin: 20px 40px;
}

.user-info-details-text {
  margin-left: 20px;
}

.user-info-details-text-nickname {
  font-size: 26px;
  font-weight: 600;
  margin: 10px 0;
}

.user-info-details-text-time {
  font-size: 14px;
  margin-bottom: 10px;
}

.user-info-splace {
  margin-right: 90px;
}

.idle-container {
  padding: 0 20px;
}

.idle-container-list {
  min-height: 55vh;
}

.idle-container-list-item {
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
}

.idle-container-list-item:last-child {
  border-bottom: none;
}

.idle-container-list-item-detail {
  height: 120px;
  display: flex;
  align-items: center;
}

.idle-container-list-item-text {
  margin-left: 10px;
  height: 100px;
  max-width: 800px;
}

.idle-container-list-title {
  font-weight: 600;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.idle-container-list-idle-details {
  font-size: 14px;
  color: #555555;
  padding-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.idle-container-list-idle-time {
  font-size: 13px;
  padding-top: 5px;
}

.idle-prive {
  font-size: 15px;
  padding-top: 5px;
  color: red;
}

.edit-tip {
  font-size: 14px;
  margin: 10px 5px;
}

.address-container {
  padding: 10px 20px;
}

.address-container-back {
  margin-bottom: 10px;
}

.address-container-add-title {
  font-size: 15px;
  color: #409EFF;
  padding: 10px;
}

.address-container-add-item {
  margin-bottom: 20px;
}

.demonstration {
  color: #666666;
  font-size: 14px;
  padding: 10px;
}

.address-container-add {
  padding: 0 200px;
}

.address-container-list {
  padding: 30px 100px;
}

.idle-item-foot {
  width: 800px;
  display: flex;
  justify-content: space-between;
}

.foot-button {
  margin-top: 20px;
}
</style>