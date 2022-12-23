<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div class="order-page">
        <div class="idle-info-container" @click="toDetails(order.idle.id)">
          <el-image
              style="width: 150px; height: 150px;"
              :src="order.idle.picture1"
              fit="cover"></el-image>
          <div class="order-info-title">{{ order.buyer.id == visitor.id ? '买到的' : '卖出的' }}：{{
              order.idle.name
            }}
          </div>
          <div class="idle-info-price">￥{{ order.idle.price }}</div>

        </div>
        <div class="order-info-container">
          <div class="order-info-title">订单信息（{{ orderStatus[order.status] }}）：</div>
          <div class="order-info-item">编号：{{ order.id }}</div>
          <div class="order-info-item">支付状态：{{ order.paymentStatus === 0 ? '未支付' : '已支付' }}</div>
          <div class="order-info-item">创建时间：{{
              order.createTime.substring(0, 10) + ' ' +
              order.createTime.substring(11, 19)
            }}
          </div>
          <div class="order-info-item">支付时间：{{
              order.paymentTime ? order.paymentTime.substring(0, 10) + ' ' +
                  order.paymentTime.substring(11, 19) : ''
            }}
          </div>
        </div>
        <div class="menu">
          <el-button v-if="visitor.id==order.buyer.id&&order.status===0" type="danger" plain
                     @click="changeOrderStatus(3,order)">取消订单
          </el-button>
          <el-button v-if="visitor.id==order.buyer.id&&order.status===0" type="primary" plain
                     @click="changeOrderStatus(2,order)">立即支付
          </el-button>
          <el-button v-if="visitor.id==order.user.id&&order.status===1" type="primary" plain
                     @click="changeOrderStatus(1,order)">确认交付
          </el-button>
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
  name: "order",
  components: {
    'app-head': AppHead,
    'app-body': AppBody,
    'app-foot': AppFoot
  },
  data() {
    return {
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],
      order: {
        id: '1212121',
        paymentStatus: 1,
        paymentTime: '121',
        createTime: '12.12.112',
        status: 1,
        idle: {
          id: '1212',
          name: 'second-hand phone',
          picture1: '',
          price: 1212
        },
        user: {id: '1111'},
        buyer: {
          id: '1111'
        }
      },
      visitor: {
        id: ''
      }
    }
  },
  created() {
    if (this.$store.state.is_login) {
      this.visitor = this.$store.state.user;
      this.getOrderInfo(this.$route.query.id);
    } else {
      this.$router.push('login');
    }
  },
  methods: {
    getOrderInfo(orderId) {
      this.$api.getOrder({id: orderId}).then(res => {
        if (res.status_code == 1) {
          this.order = res.data;
        }
      })
    },
    toDetails(id) {
      this.$router.push({path: '\details', query: {id: id}});
    },
    changeOrderStatus(to, order) {
      this.$api.updateOrder({id: order.id, to: to}).then(res => {
        if (res.status_code == 1) {
          if (to == 1) {
            this.$message.info('交付成功，等待付款');
          } else if (to == 2) {
            this.$message.info('付款成功，交易完成');
          }
        } else {
          if (to == 1) {
            this.$message.error('交付失败，请联系管理员');
          } else if (to == 2) {
            this.$message.error('付款失败，请联系管理员');
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.order-page {
  min-height: 85vh;
}

.idle-info-container {
  width: 100%;
  display: flex;
  border-bottom: 20px solid #f6f6f6;
  padding: 20px;
  cursor: pointer;
}

.order-info-container {
  padding: 20px;
  text-align: left;
}

.order-info-item {
  margin: 10px 0;
  font-size: 14px;
  color: #444444;
}

.menu {
  margin-left: 20px;
}

.order-info-title {
  font-size: 18px;
  font-weight: 600;
  max-width: 750px;
}

</style>