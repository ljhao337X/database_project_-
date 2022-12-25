<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div class="user-info-container">
        <div class="user-info-details">

          <el-upload
              action=""
              :http-request="uploadAvatar"
              :before-upload="beforeAvatarUpload"
          >
            <el-image
                style="width: 120px; height: 120px;border-radius: 10px;"
                :src="user.avatar"
                fit="contain"></el-image>
          </el-upload>
          <div class="user-info-details-text">
            <div class="user-info-details-text-nickname">{{ user.nickname }}</div>
            <el-rate
                style="padding: 10px;"
                v-model="user.credit"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
            <div class="user-info-details-text-edit">
              <el-button type="primary" @click="editUserInfoDialogVisible = true">编辑个人信息</el-button>
            </div>
            <el-dialog
                title="编辑个人信息"
                :visible.sync="editUserInfoDialogVisible"
                width="400px">
              <div class="edit-tip">昵称</div>
              <el-input
                  v-model="user_new.nickname"
                  :disabled="notUserNicknameEdit">
                <el-button slot="append" type="warning" icon="el-icon-edit"
                           @click="notUserNicknameEdit = false">编辑
                </el-button>
              </el-input>
              <div v-if="userPasswordEdit">
                <div class="edit-tip">原密码</div>
                <el-input v-model="userPassword1" show-password></el-input>
                <div class="edit-tip">新密码</div>
                <el-input v-model="userPassword2" show-password></el-input>
                <div class="edit-tip">确认新密码</div>
                <el-input v-model="userPassword3" show-password></el-input>
              </div>
              <div v-else>
                <div class="edit-tip">密码</div>
                <el-input
                    value="1212121"
                    :disabled="true"
                    show-password>
                  <el-button slot="append" type="warning" icon="el-icon-edit"
                             @click="userPasswordEdit = true">编辑
                  </el-button>
                </el-input>
              </div>
              <div class="foot-button">
                <el-button @click="finishAllEditing">完成</el-button>
                <el-button @click="cancelAllEditing">取消</el-button>
              </div>
            </el-dialog>
          </div>

        </div>
      </div>
      <div class="idle-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我发布的" name="0"></el-tab-pane>
          <el-tab-pane label="我卖出的" name="1"></el-tab-pane>
          <el-tab-pane label="已下架的" name="2"></el-tab-pane>
          <el-tab-pane label="我的订单" name="3"></el-tab-pane>
        </el-tabs>
        <div class="idle-container-list">
          <div v-for="item in idleList[activeName]" class="idle-container-list-item">
            <div class="idle-container-list-item-detile" @click="toDetails(activeName,item)">
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
                    {{(item.idle.status=='已出售')? '已结束':idleStatus[activeName]}}
                  </div>
                  <el-button v-if="activeName==='0'" type="danger" size="mini" slot="reference"
                             plain @click.stop="handle(activeName,item,index)">
                    下架
                  </el-button>
                  <el-button v-else-if="activeName==='4'" type="success" size="mini" slot="reference"
                             :disabled="false">恢复上架
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
import {client, put, remove} from '../utils/zjkalioss.js';

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
      statusName: ['我发布的', '我卖出的', '已下架的', '正在进行'],
      statusToInt: {'我发布的': 0, '我卖出的': 1, '已下架的': 2, '正在进行': 3},
      handleName: ['下架', '删除', '取消收藏', '', ''],
      idleStatus: ['出售中', '已出售', '已下架', '进行中'],
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],

      editUserInfoDialogVisible: false,
      notUserNicknameEdit: true,
      userPasswordEdit: false,

      userPassword1: '',
      userPassword2: '',
      userPassword3: '',
      selectedOptions: [],//存放默认值
      user: {
        id: '',
        nickname: 'dd',
        avatar: '',
        password: '',
        credit: 3.7,
        sellCount: 1,
      },
      user_new: {
        nickname: '',
        avatar: ''
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
      }], [], [], []]
    };
  },
  created() {

    if (this.$store.state.is_login) {
      //console.log(this.$store.state);
      let userId = this.$store.state.user.id;
      this.$api.getUserInfo({id: userId})
          .then(res => {
            this.user = res.data;
            console.log('已经登录');
            //console.log(this.user)
            this.user_new.nickname = this.user.nickname;
            this.getMyIdle();
          })
    } else {
      console.log(this.user);
    }

  },
  methods: {
    finishAllEditing() {
      if (!this.notUserNicknameEdit) {
        this.$api.userRename({
          nickname: this.user_new.nickname,
          id: this.user.id
        }).then(res => {
          this.$store.commit("set_nickname", this.user_new.nickname);
          this.user.nickname = this.user_new.nickname;
          this.$router.go(0);
        })
      }
      if (this.userPasswordEdit) {
        if (!this.userPassword1 || !this.userPassword2) {
          this.$message.error('密码为空！');
        } else if (this.userPassword2 === this.userPassword3) {
          this.$api.updatePassword({
            id: this.user.id,
            oldPassword: this.userPassword1,
            newPassword: this.userPassword2
          }).then(res => {
            if (res.status_code === 1) {
              this.user.password = this.userPassword2;
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.userPassword1 = '';
              this.userPassword2 = '';
              this.userPassword3 = '';
            } else {
              this.$message.error('旧密码错误，修改失败！');
            }
          })
        } else {
          this.$message.error('两次输入的密码不一致！');
        }
      }
      this.notUserNicknameEdit = true;
      this.editUserInfoDialogVisible = false;
      this.userPasswordEdit = false;
    },
    cancelAllEditing() {
      this.notUserNicknameEdit = true;
      this.editUserInfoDialogVisible = false;
      this.userPasswordEdit = false;
    },
    fileHandleSuccess(response, file, fileList) {

    },
    uploadAvatar(item) {
      let fileName = item.file.name  // 当前本地上传的这张图片的名称(没有时间日期)
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = (month < 10 ? '0' + month : month)
      let mydate = date.getDate()
      mydate = (mydate < 10 ? '0' + mydate : mydate)
      this.baseurl = 'img/' + year + '/' + year + month + '/' + year + month + mydate + '/'
      // 这里是把时间+图片名称拼接起来形成一个新的图片上传至oss，目的是区别于本地图片的名称，避免名称相同会误删，同时便于查看oss上最新上传图片的时间点
      let filePath = this.baseurl + new Date().getTime() + '-' + fileName

      let file = item.file // 当前本地上传的这张图片
      put(filePath, file).then(result => {  // 调oss api 上传图片
        console.log(result)
        this.user.avatar = result.url;
        this.$store.commit('set_user', this.user);
        this.$api.uploadAvatar({
          id: this.user.id,
          avatar: this.user.avatar
        }).then(res => {
          if (res.status_code === 1) {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          } else {
            this.$message.error('修改失败！');
          }
        })
        // 文件上传成功后，获取返回值中的文件名name，并把其放入fileList数组中，表示当前已上传的文件
        //this.fileList.push(result.name)
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    toDetails(activeName, item) {
      this.$router.push({path: '/details', query: {id: item.idle.id}});
    },
    handleClick(tab, event) {
      //null
    },
    getMyIdle() {
      //console.log('准备找idle');
      //console.log(this.user);
      const loading = this.$loading({
        lock: true,
        text: '加载数据中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      });
      loading.lock = false;
      for (let index = 0; index <= 3; index++) {
        this.$api.getMyIdle({
          id: this.user.id,
          status: index
        }).then(res => {
          console.log(res);
          if (res.status_code === 1) {
            this.idleList[index] = res.data;
          }
          console.log('已经找到idle');
        })
      }
      this.activeName = '2';
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

.idle-container-list-item-detile {
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