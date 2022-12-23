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
          prop="idleName"
          label="闲置名称"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="orderPrice"
          label="金额"
          show-overflow-tooltip
          min-width="100"
          width="100">
      </el-table-column>
      <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="100"
          show-overflow-tooltip>
      </el-table-column>

      <!--删除订单的操作-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="deleteOrder(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--更换页面的操作-->
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="nowPage"
          :page-size="1"
          background
          layout="prev, pager, next,jumper"
          :total="totalPageNum">
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
      totalPageNum: 8,
      order: []
    }
  },

  created() {
    this.getOrder();
  },

  methods: {
    // 获取所有的订单信息
    getOrder() {
      this.$api.findOrder({
        page: this.nowPage,
        nums: 8
      }).then(res => {
        if (res.status_code === 1) {
          console.log("res is")
          console.log(res)
          // 更新总页数
          this.totalPageNum = res.pageNum;
          // 更新订单的信息
          this.order = []
          for (let ii = 0; ii < res.data.length; ii++) {
            this.order[ii] = {
              orderNumber:res.data[ii].order.id,
              idleName:res.data[ii].idle.name,
              orderPrice:res.data[ii].idle.price,
              orderStatus:res.data[ii].order.status
            }
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },

    // 删除订单
    deleteOrder(index) {
      this.$api.deleteAnOrder({
        id:this.order[index].orderNumber
      }).then(res=>{
        if(res.status_code===1){
          this.getOrder();
        }else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },

    // 修改显示页面的函数
    handleCurrentChange(val) {
      this.nowPage = val;
      this.getOrder();
    },
  }
}
</script>

<style scoped>
.main-border {
  background-color: #FFF;
  padding: 10px 30px;
  box-shadow: 0 1px 15px -6px rgba(0, 0, 0, .5);
  border-radius: 5px;
}

.block {
  display: flex;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 100%;
}
</style>