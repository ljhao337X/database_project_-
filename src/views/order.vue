<template>
<div>
  <app-head></app-head>
  <app-body>
    <div class="order-page">
      <div class="idle-info-container" @click="toDetails(order.idle.id)">
        <el-image
            style="width: 150px; height: 150px;"
            :src="order.idle.imgUrl"
            fit="cover"></el-image>
        <div class="order-info-title">{{order.user.id==user.id?'买到的':'卖出的'}}：{{order.idle.name}}</div>
        <div class="idle-info-price">￥{{order.idle.price}}</div>

      </div>
      <div class="order-info-container">
        <div class="order-info-title">订单信息（{{orderStatus[order.status]}}）：</div>
        <div class="order-info-item">编号：{{order.id}}</div>
        <div class="order-info-item">支付状态：{{order.paymentStatus===0?'未支付':'已支付'}}</div>
        <div class="order-info-item">创建时间：{{order.createTime.substring(0, 10) + ' ' +
        order.createTime.substring(11, 19)}}
        </div>
        <div class="order-info-item">支付时间：{{order.paymentTime?order.paymentTime.substring(0, 10) + ' ' +
            order.paymentTime.substring(11, 19):''}}
        </div>
      </div>
      <div class="menu">
        <el-button v-if="user.id==order.user.id&&order.status===0" type="danger" plain @click="changeOrderStatus(4,order)">取消订单</el-button>
        <el-button v-if="user.id==order.user.id&&order.status===0" type="primary" plain @click="changeOrderStatus(1,order)">立即支付</el-button>
        <el-button v-if="user.id==order.idle.user.id&&order.status===1" type="primary" plain @click="changeOrderStatus(2,order)">发货</el-button>
        <el-button v-if="user.id==order.user.id&&order.status===2" type="primary" plain @click="changeOrderStatus(3,order)">确认收货</el-button>
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
    'app-head':AppHead,
    'app-body':AppBody,
    'app-foot':AppFoot
  },
  data() {
    return {
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],
      order: {
        id: '1212121',
        paymentStatus: 1,
        paymentTime: '121',
        createTime : '12.12.112',
        status: 1,
        user: {
          id:'1212'
        },
        idle : {
          id: '1212',
          name: 'second-hand phone',
          imgUrl: '',
          price: 1212,
          user: {id: '1111'}
        }
      },
      user: {
        id: '1111'
      }
    }
  },
  methods: {
    toDetails(id){

    },
    changeOrderStatus(to, order) {

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

.order-info-title{
  font-size: 18px;
  font-weight: 600;
  max-width: 750px;
}

</style>