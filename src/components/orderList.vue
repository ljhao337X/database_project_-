<template>
  <div class="main-border">
    <el-table
        :data="order"
        stripe
        style="width: 100%;color: #5a5c61;">
      <el-table-column
          prop="orderNumber"
          label="订单号"
          show-overflow-tooltip
          width="200">
      </el-table-column>
      <el-table-column
          prop="idleItem.idleName"
          label="闲置名称"
          show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
          prop="orderPrice"
          label="金额"
          show-overflow-tooltip
          min-width="100"
          width="100">
      </el-table-column>
      <el-table-column
          label="订单状态"
          width="100"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{orderStatus[scope.row.orderStatus]}}</div>
        </template>
      </el-table-column>
      <el-table-column
          prop="paymentTime"
          label="支付时间"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="deleteOrder(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="nowPage"
          :page-size="8"
          background
          layout="prev, pager, next,jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data() {
    return {
      mode: 1,
      nowPage: 1,
      total: 8,
      orderStatus: ['待付款', '待卖家确认', '已完成', '已取消'],
      order: []
    }
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {

    },
    deleteOrder(index) {

    },
    handleCurrentChange(val) {
      this.nowPage = val;
      this.getOrder();
    },
  }
}
</script>

<style scoped>
.main-border{
  background-color: #FFF;
  padding: 10px 30px;
  box-shadow: 0 1px 15px -6px rgba(0,0,0,.5);
  border-radius: 5px;
}
.block {
  display: flex;
  justify-content:center;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 100%;
}
</style>