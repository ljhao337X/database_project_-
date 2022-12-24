<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div class="details-header">
        <div class="details-header-user-info" @click="toProfile">
          <el-image
              style="width: 80px; height: 80px;border-radius: 5px;"
              :src="user.avatar" fit="contain"></el-image>
          <div style="margin-left: 10px;">
            <div class="details-header-nickname">{{ user.nickname }}</div>
          </div>
        </div>
        <div class="details-header-buy" :style="'width:310px;'">
          <div style="color: red;font-size: 18px;font-weight: 600;margin:10px;">￥{{ idle.price }}</div>
          <!--  所有人都可以查看订单的状态 -->
          <div v-if="(idle.status==='2'||idle.status==='4')" style="margin:10px;color: red;font-size: 16px;">
            闲置已下架或删除
          </div>
          <div v-if="(idle.status==='1'||idle.status==='3')" style="margin:10px;color: red;font-size: 16px;">
            闲置正在交易或已经出售
          </div>
          <el-button v-if="!isMaster&&idle.status==='0'" type="danger" plain @click="buyButton(idle)">立即购买
          </el-button>
          <!--  所有人都可以查看正在正在进行中、已经完成订单 -->
          <el-button v-if="(idle.status==='1'||idle.status==='3')" type="primary" plain @click="toOrder(idle)">查看订单</el-button>
          <!--  卖家都可以下架售卖中的商品 -->
          <el-button v-if="isMaster&&idle.status==='0'" type="danger" @click="changeStatus(idle,2)" plain>下架
          </el-button>
        </div>
      </div>
      <div class="details-info">
        <div class="details-info-title">{{ idle.name }}</div>
        <div class="details-info-main" v-html="idle.details">
          {{ idle.details }}
        </div>
        <div class="details-picture">
          <el-image v-if="idle.picture1!=='picture1'"
                    style="width: 90%;margin-bottom: 2px;"
                    :src=idle.picture1
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
import idleList from "@/components/idleList";

export default {
  name: "details",
  components: {
    'app-head': AppHead,
    'app-body': AppBody,
    'app-foot': AppFoot
  },
  data() {
    return {
      isMaster: false,
      idle: {
        id: '',
        price: '',
        name: '',
        status: 0,
        details: '',
        picture1: '',
        picture2: '',
        picture3: '',
      },
      user: {
        id: '',
        avatar: '',
        nickname: ''
      },
      visitor: {
        id: ''
      },
      isBuyer: false,
      orderId: ''
    }
  },
  created() {
    this.visitor = this.$store.state.user;
    this.$api.getIdle({id: this.$route.query.id}).then(res => {
      console.log(res);
      if (res.data.idle.details) {
        //get idle info
        let list = res.data.idle.details.split(/\r?\n/);
        let str = '';
        for (let i = 0; i < list.length; i++) {
          str += '<p>' + list[i] + '</p>';
        }
        res.data.idle.details = str;
        this.idle = res.data.idle;
        this.user = res.data.user;
        //console.log(this.idle);

        //check isMaster
        let userId = this.visitor.id;
        console.log('userid', userId)
        if (this.visitor.id && userId == this.user.id) {
          console.log('isMaster');
          this.isMaster = true;
        }
      }
      // $('html,body').animate({
      //   scrollTop: 0
      // }, {duration: 500, easing: "swing"});
      this.$api.getMyBuying({
        userId: this.visitor.id,
        idleId: this.idle.id
      }).then(res => {
        if (res.status_code == 1) {
          console.log('isBuyer')
          this.isBuyer = true;
        }
      }).catch(e => {
      })
    });
  },
  methods: {
    buyButton(idle) {
      this.$api.addOrder({
        idleId: this.idle.id,
        buyerId: this.visitor.id
      }).then(res => {
        console.log(res);
        if (res.status_code === 1) {
          this.$router.push({path: '/order', query: {id: res.data.id}});
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {

      })
    },
    changeStatus(idle, to) {
      this.$api.updateIdle({
        id: idle.id,
        idleStatus: to
      }).then(res => {
        console.log(res);
        if (res.status_code === 1) {
          this.idle.status = to;
        } else {
          this.$message.error(res.message)
        }
      });
    },
    toProfile() {
      this.$router.push({path: '/profile', query: {userId: this.user.id}});
    },
    toOrder(idle) {
      console.log('idle', idle)
      this.$api.getOrderByIdle({
        idleId: idle.id,
      }).then(res => {
        //console.log(res);
        if (res.status_code === 1) {
          //console.log(res);
          this.$router.push({path: '/order', query: {id: res.data}});
        } else {
          this.$message.error(res.message)
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