<template>
  <div>
    <app-head></app-head>
    <app-body>
      <div class="order-page">
        <div class="idle-info-container" @click="toDetails(idle.id)">
          <el-image
              style="width: 150px; height: 150px;"
              :src="idle.picture1"
              fit="cover"></el-image>
          <div class="order-info">
            <div class="order-info-title">{{ order.buyer_id == visitor.id ? '买到的' : '卖出的' }}：{{
                idle.name
              }}
            </div>
            <div class="idle-info-price">￥{{ idle.price }}</div>
          </div>


        </div>
        <div class="order-info-container">
          <div class="order-info-title">订单信息（{{ order.status }}）：</div>
          <div class="order-info-item">卖家：{{
              order.seller_id
            }}
          </div>
          <div class="order-info-item">买家：{{
              order.buyer_id
            }}
          </div>
          <div class="order-info-item">编号：{{ order.id }}</div>
          <div class="order-info-item">买家评论：{{
              order.comment? order.comment:'买家还未留下评论'
            }}
          </div>
          <div v-if="visitor.id===order.buyer_id&&order.status==='待付款'">
            <p>添加个评语吧：</p>
            <el-input class="release-idle-detiles-text"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="卖家态度怎么样？加上你的评论吧！"
                      v-model="comment"
                      maxlength="1500"
                      show-word-limit>
            </el-input>
            <p>为卖家的态度和商品打个分吧：</p>
            <el-rate
                style="padding: 10px;"
                v-model="new_credit"
                :texts="texts"
                show-text>
            </el-rate>
          </div>

        </div>
      </div>
      <div class="menu">
        <el-button v-if="visitor.id===order.buyer_id&&order.status==='待确认'" type="danger" plain
                   @click="changeOrderStatus('已取消',order)">取消订单
        </el-button>
        <el-button v-else-if="visitor.id===order.buyer_id&&order.status==='待付款'" type="primary" plain
                   @click="changeOrderStatus('已完成',order)">立即支付
        </el-button>
        <el-button v-else-if="(visitor.id===order.seller_id)&&(order.status==='待确认')" type="primary" plain
                   @click="changeOrderStatus('待付款',order)">确认交付
        </el-button>
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
      //待确认，待付款，已完成，已取消
      orderStatus: ['待确认', '待付款', '已完成', '已取消'],
      new_credit: 1,
      texts: ['极差','失望', '一般', '满意', '非常棒'],
      idle: {
        id: '1212',
        name: 'second-hand phone',
        picture1: '',
        price: 1212
      },
      order: {
        id: '1212121',
        comment: '',
        createTime: '12.12.112',
        status: '待付款',
        buyer_id: '',
        seller_id: ''
      },
      visitor: {
        id: ''
      },
      comment: ''
    }
  },
  created() {
    if (this.$store.state.is_login) {
      this.visitor = this.$store.state.user;
      console.log('visitor', this.visitor)
      //console.log(this.$route.query);
      this.getOrderInfo(this.$route.query.id);
    } else {
      this.$router.push('login');
    }
  },
  methods: {
    getOrderInfo(orderId) {
      //console.log(orderId);
      this.$api.getOrder({id: orderId}).then(res => {
        console.log(res);
        if (res.status_code == 1) {
          this.order = res.data.order;
          this.idle = res.data.idle;
        }
      })
    },
    toDetails(id) {
      this.$router.push({path: '\details', query: {id: id}});
    },
    changeOrderStatus(to, order) {
      this.$api.updateOrderStatus({id: order.id, status: to}).then(res => {
        if (res.status_code == 1) {
          if (to == '待付款') {
            this.$message.info('交付成功，等待付款');
            this.$router.go(0);
          } else if (to == '已完成') {
            //添加评论
            this.$api.updateOrderComment({
              id: order.id,
              comment: this.comment,
              credit: this.new_credit
            }).then(res => {
              if (res.status_code == 1) {
                //更改商品状态
                console.log(this.new_credit);
                this.$api.updateIdle({
                  id: this.idle.id,
                  idleStatus: 1//已出售
                }).then(res => {
                  if (res.status_code == 1) {
                    this.$message.info('付款成功，交易完成');
                    this.$router.go(0);
                  }
                })
              }
            })

          } else if (to == '已取消') {
            //恢复商品状态
            this.$api.updateIdle({
              id: this.idle.id,
              idleStatus: 0 //恢复未出售状态
            }).then(res => {
              if (res.status_code == 1) {
                this.$message.info('订单已取消');
                this.$router.push('index');
              }
            })
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
  width: 100%;
}

.idle-info-container {
  display: flex;
  border-bottom: 20px solid #f6f6f6;
  padding: 20px;
  cursor: pointer;
  background-color: #FFFFFF;
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

.order-info{

}

.order-info-title {
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  max-width: 750px;
}
.idle-info-price{
  padding: 10px;
  text-align: left;
  font-size: 28px;
  font-weight: 1200;
}

</style>