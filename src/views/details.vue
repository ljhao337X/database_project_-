<template>
<div>
  <app-head></app-head>
  <app-body>
    <div class="details-header">
      <div class="details-header-user-info">
        <el-image
            style="width: 80px; height: 80px;border-radius: 5px;"
            :src="idle.user.avatar" fit="contain"></el-image>
        <div style="margin-left: 10px;">
          <div class="details-header-nickname">{{idle.user.nickname}}</div>
        </div>
      </div>
      <div class="details-header-buy" :style="'width:'+(isMaster?'150px;':'280px;')">
        <div style="color: red;font-size: 18px;font-weight: 600;">￥{{idle.price}}</div>
        <div v-if="!isMaster&&idle.status!==1" style="color: red;font-size: 16px;">闲置已下架或删除</div>
        <el-button v-if="!isMaster&&idle.status===1" type="danger" plain @click="buyButton(idle)">立即购买</el-button>
        <el-button v-if="isMaster&&idle.status===1" type="danger" @click="changeStatus(idle,2)" plain>下架</el-button>
        <el-button v-if="isMaster&&idle.status===3" type="primary" @click="changeStatus(idle,1)" plain>重新上架</el-button>
      </div>
    </div>
    <div class="details-info">
      <div class="details-info-title">{{idle.name}}</div>
      <div class="details-info-main" v-html="idle.details">
        {{idle.details}}
      </div>
      <div class="details-picture">
        <el-image v-for="(imgUrl,i) in idle.picList"
                  style="width: 90%;margin-bottom: 2px;"
                  :src=imgUrl
                  fit="contain"></el-image>
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
  name: "details",
  components: {
    'app-head':AppHead,
    'app-body':AppBody,
    'app-foot':AppFoot
  },
  data() { return {
    isMaster:false,
    idle:{
      id: '1',
      price: '9999',
      name: 'second-hand-phone',
      status: 1,
      details: 'this is amazing',
      picList : [],
      user:{
        id: '1',
        avatar: '',
        nickname: 'Danny'
      }
    }
  }},
  created(){
    let idleId=this.$route.query.idleId;
    this.$api.getIdle({
      id:idleId
    }).then(res=>{
      console.log(res);
      if(res.data){
        let list=res.data.details.split(/\r?\n/);
        let str='';
        for(let i=0;i<list.length;i++){
          str+='<p>'+list[i]+'</p>';
        }
        res.data.details=str;
        res.data.picList=JSON.parse(res.data.pictureList);
        this.idle=res.data;
        console.log(this.idle);
        let userId=this.$globalData.userInfo.id;
        console.log('userid',userId)
        if(userId == this.idle.user.id){
          console.log('isMaster');
          this.isMaster=true;
        }
      }
      // $('html,body').animate({
      //   scrollTop: 0
      // }, {duration: 500, easing: "swing"});
    });
  },
  methods: {
    buyButton(idle) {
      this.$api.addOrder({
        idleId:idle.id,
        buyerId: this.$globalData.userInfo.id
      }).then(res=>{
        console.log(res);
        if(res.status_code===1){
          this.$router.push({path: '/order', query: {id: res.data.orderId}});
        }else {
          this.$message.error(res.msg)
        }
      }).catch(e=>{

      })
    },
    changeStatus(idle, to) {
      this.$api.updateIdle({
        id:idle.id,
        idleStatus:to
      }).then(res=>{
        console.log(res);
        if(res.status_code===1){
          this.idle.status=to;
        }else {
          this.$message.error(res.msg)
        }
      });
    }
  }
}
</script>

<style scoped>
.details-header {
  height: 80px;
  border-bottom: 10px solid #f6f6f6;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
}

.details-header-user-info {
  display: flex;
}

.details-header-nickname {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
}

.details-header-buy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 280px;
}

.details-info {
  padding: 20px 50px;
}

.details-info-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: left;
}

.details-info-main {
  font-size: 17px;
  color: #121212;
  line-height: 160%;
}

.details-picture {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>