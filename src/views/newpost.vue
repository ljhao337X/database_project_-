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
                    <el-radio v-for="i in option_index" :label="i">{{ options[i-1] }}</el-radio>
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
                    action="#"
                    list-type="picture-card"
                    :http-request="upload"
                    :before-upload="beforeUpload"
                    :auto-upload="true">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)">
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                    </span>
                      <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
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
import {put} from "@/utils/zjkalioss";

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
      option_index: [1, 2, 3, 4, 5, 6, 7, 8],
      options: ['户外', '数码', '家具', '图书', '服装', '饰品', '化妆品', '家居'],
      imgDialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    upload(item) {
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
        console.log('上传成功');
        console.log(result);
        this.idle.picture1 = result.url;
        })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
      }
      return isJPG && isLt2M;
    },
    handleChange(file, fileList) {
      this.imgList = fileList;
    },
    handleRemove(file, fileList) {
      this.imgList = fileList
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