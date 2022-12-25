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
          <el-rate
              style="padding: 10px;"
              v-model="user.credit"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
        </div>
      </div>
      <div class="idle-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我发布的" name="0"></el-tab-pane>
          <el-tab-pane label="我卖出的" name="1"></el-tab-pane>
        </el-tabs>
        <div class="idle-container-list">
          <div v-for="item in idleList[activeName]" class="idle-container-list-item">
            <div class="idle-container-list-item-detail" @click="toDetails(activeName,item)">
              <!--              依次是图片、价格（状态）、介绍、和下架按钮。-->
              <el-image
                  style="width: 100px; height: 100px;"
                  :src="item.idle.picture1"
                  fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline">无图</i>
                </div>
              </el-image>
              <div class="idle-container-list-item-text">
                <div class="idle-container-list-title">
                  {{ item.idle.name }}
                </div>
                <div class="idle-container-list-idle-details" v-html="item.idle.details">
                  {{ item.idle.details }}
                </div>
                <div class="idle-item-foot">
                  <div class="idle-prive">￥{{ item.idle.price }}
                    {{ (activeName === '0') ? '待出售' : (activeName === '1') ? '已出售' : '已下架' }}
                  </div>
                  <el-button v-if="activeName==='0'" type="danger" size="mini" slot="reference"
                             plain @click.stop="handle(activeName,item,index)">
                    举报
                  </el-button>
                  <el-button v-else-if="activeName==='1'" type="primary" size="mini" slot="reference"
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
      activeName: '0',
      handleName: ['下架', '删除', '取消收藏', '', ''],
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],

      selectedOptions: [],//存放默认值
      user: {
        id: '',
        nickname: 'ff',
        avatar: '',
        credit: 3.8,
        sellCount: 1
      },
      idleList: [[{
        idle: {
          id: '',
          picture1: '',
          name: '',
          price: '',
          details: '',
        },
        user: {
          avatar: '',
          nickname: '',
        }
      }], [],],

      visitor: {
        id: ''
      }
    };
  },
  created() {
    if (this.$store.state.is_login) {
      this.$api.getUserInfo({
        id: this.$route.query.userId
      }).then(res => {
        if (res.status_code === 1) {
          //返回当前查询的主页用户的信息
          this.user = res.data;
          console.log('找到用户');
          console.log(res.data);
          this.activeName = '2';
          this.getMyIdle();

        }
      })
    } else {
      this.$message.error('请先登录');
      this.$router.push('login');
    }
  },
  methods: {
    fileHandleSuccess(response, file, fileList) {

    },
    toDetails(activeName, item) {
      this.$router.push({path: '/details', query: {id: item.idle.id}});
    },
    handleClick(tab, event) {
      //null
    },
    getMyIdle() {
      const loading = this.$loading({
        lock: true,
        text: '加载数据中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      });
      //console.log('用户', this.user)
      for (let index = 0; index <= 1; index++) {
        this.$api.getMyIdle({
          id: this.user.id,
          status: index
        }).then(res => {
          //console.log(res);
          if (res.status_code === 1) {
            this.idleList[index] = res.data;
          }
          //console.log('已经找到idle');
        })
      }
      this.activeName = '1';
      loading.close();
      //console.log(this.idleList);

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
  background-color: #FFFFFF;
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