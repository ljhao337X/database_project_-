<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div class="release-idle-container">
        <el-card class="box-card">
          <div>
            <div class="release-idle-container-title">发布闲置</div>
            <el-form :label-position="'right'" label-width="120px">
              <el-form-item label="闲置名称">
                <el-input placeholder="为你的闲置取个名字吧" v-model="idle.name"
                          maxlength="30"
                          show-word-limt>
                </el-input>
              </el-form-item>
              <el-form-item label="详细信息">
                <el-input class="release-idle-detiles-text"
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="为你的闲置写下详细介绍吧，越详细越容易受到平台的推荐哦!"
                          v-model="idle.details"
                          maxlength="1500"
                          show-word-limit>
                </el-input>
              </el-form-item>
              <div style="display: flex; justify-content: space-evenly;">
                <el-form-item label="类别">
                  <el-radio-group v-model="idle.label">
                    <el-radio v-for="i in option_index" :label="i">{{ options[i] }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input-number v-model="idle.price" :precision="2" :step="10" :max="100000">
                    <div slot="prepend">价格</div>
                  </el-input-number>
                </el-form-item>
              </div>
              <el-form-item label="上传照片">
                <el-upload
                    action="http://localhost:8080/file/"
                    :on-preview="fileHandlePreview"
                    :on-remove="fileHandleRemove"
                    :on-success="fileHandleSuccess"
                    :show-file-list="showFileList"
                    :limit="10"
                    :on-exceed="handleExceed"
                    accept="image/*"
                    drag
                    multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <div class="picture-list">
                  <el-image style="width: 600px;margin-bottom: 2px;" fit="contain"
                            v-for="(img,index) in imgList" :src="img"
                            :preview-src-list="imgList"></el-image>
                </div>
                <el-dialog :visible.sync="imgDialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <div style="display: flex;justify-content: center;margin-top: 30px;margin-bottom: 30px;">
                <el-button type="success" plain @click="postButton">发布</el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </div>
      <app-foot></app-foot>
    </app-body>

  </div>


</template>

<script>
import AppFoot from "@/components/AppFoot";
import AppHead from "@/components/AppHeader";
import AppBody from "@/components/AppPageBody";
import idleList from "@/components/idleList";

export default {
  name: "newpost",
  components: {
    'app-head': AppHead,
    'app-body': AppBody,
    'app-foot': AppFoot
  },
  data() {
    return {
      idle: {
        name: '',
        details: '',
        picture1: '',
        picture2: '',
        picture3: '',
        id: '',
        price: 0,
        label: '', //这里存一个int即可
      },
      //使用index访问类别
      //todo
      //index为1的话会出现错误
      option_index: [0, 1, 2, 3, 4, 5, 6, 7],
      options: ['户外', '数码', '家具', '图书', '服装', '饰品', '化妆品', '家居'],
      imgList: [],
      dialogImageUrl: '',
      imgDialogVisible: false
    }
  },
  created() {
    if (this.$store.state.is_login) {
      this.idle.id = this.$store.state.user.id;
    }
  },
  methods: {
    postButton() {
      if (this.idle.name &&
          this.idle.details &&
          this.idle.label &&
          this.idle.price) {
        console.log(this.idle);
        this.$api.addIdle(this.idle).then(res => {
          if (res.status_code === 1) {
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
            this.$router.push({path: '/details', query: {id: res.data}});
            console.log(res.data.id);
          } else {
            this.$message.error('发布失败！' + res.message);
          }
        }).catch(e => {
          this.$message.error('请填写完整信息');
        })
      } else {
        console.log(this.idle);
        this.$message.error('请填写完整信息！');
      }

    }
  }
}
</script>

<style scoped>
.release-idle-container {
  min-height: 85vh;
  padding: 30px;
}

.release-idle-container-title {
  font-size: 18px;
  padding: 30px 0;
  font-weight: 600;
  width: 100%;
  text-align: center;
}

.release-idle-container-form {
  padding: 0 180px;
}

.release-idle-detiles-text {
  margin: 20px 0;
}

.release-idle-place {
  margin-bottom: 15px;
}

.release-tip {
  color: #555555;
  float: left;
  padding-right: 5px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}

.release-idle-container-picture {
  margin: 20px 0;

}

.release-idle-container-picture-title {
  margin: 10px 0;
  color: #555555;
  font-size: 14px;
}

.picture-list {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>