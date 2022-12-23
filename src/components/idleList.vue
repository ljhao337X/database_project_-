<!--200880  QT1Fgcukwm-->

<template>
  <div class="main-border">
    <!-- 切换上架-闲置 两张表-->
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">上线的闲置</el-menu-item>
      <el-menu-item index="2">下架的闲置</el-menu-item>
    </el-menu>

    <el-table v-if="this.mode == 1"
              :data="onlineIdles"
              stripe
              style="width: 100%;color: #5a5c61;">

      <el-table-column
          prop="idleName"
          label="闲置名称"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="user_nickname"
          label="发布用户"
          show-overflow-tooltip
          min-width="100"
          width="100">
      </el-table-column>

      <el-table-column
          prop="idlePrice"
          label="价格"
          show-overflow-tooltip
          min-width="100"
          width="100">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="setIdleOffline(scope.$index)">违规下架
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 此处是下架的产品界面   -->
    <el-table v-show="this.mode == 2"
              :data="offlineIdles"
              stripe
              style="width: 100%;color: #5a5c61;">
      <el-table-column
          prop="idleName"
          label="闲置名称"
          show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
          prop="user_nickname"
          label="发布用户"
          show-overflow-tooltip
          min-width="100"
          width="100">
      </el-table-column>

      <el-table-column
          prop="idlePrice"
          label="价格"
          show-overflow-tooltip
          min-width="100"
          width="100">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="deleteIdle(scope.$index)">永久删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--处理的是翻页-->
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="nowPage"
          :page-size="1"
          background
          layout="prev, pager, next,jumper"
          :total="pageNum">
      </el-pagination>
    </div>
  </div>

</template>


<script>
export default {
  name: "idleList",
  data() {
    return {
      mode: 1,
      nowPage: 1,       // 当前所处的页面编号
      pageNum: 1,         // 总的页数
      onlineIdles: [],  // 上架的商品的信息
      offlineIdles: [],
    }
  },

  created() {
    this.getOnlineIdle()
  },

  methods: {
    getOnlineIdle() {
      // 获得当前上架的商品的信息
      this.$api.findIdleByState({
        status: 0,  // 找上架的信息，即正在出售的信息
        page: this.nowPage,
        nums: 8
      }).then(res => {
        console.log(res)
        if (res.status_code === 1) {
          // 正确返回了状态
          // 已经通过Array.isArray(res.data)检测了res.data是一个数组
          this.pageNum = res.pageNum; // 通过length获取长度
          // 获取需要的信息
          this.onlineIdles = []
          for (let ii = 0; ii < res.data.length; ii++) {
            this.onlineIdles[ii] = {
              "idleName": res.data[ii].idle.name,
              "user_nickname": res.data[ii].user.nickname,
              "idlePrice": res.data[ii].idle.price,
              "idleId":res.data[ii].idle.id
            }
          }
        } else {
          this.$message.error("访问错误，后端返回state_code为0")
        }
      }).catch(e => {
        console.log(e)
      })

    },

    getOfflineIdle() {
      console.log("开始getOfflineIdle")
      // 获得当前下架的产品的信息
      this.$api.findIdleByState({
        status: 2,  // 找下架的信息
        page: this.nowPage,
        nums: 8
      }).then(res => {
        if (res.status_code === 1) {
          this.pageNum = res.pageNum;
          // 获取需要的信息
          this.offlineIdles = []
          for (let ii = 0; ii < res.data.length; ii++) {
            this.offlineIdles[ii] = {
              "idleName": res.data[ii].idle.name,
              "user_nickname": res.data[ii].user.nickname,
              "idlePrice": res.data[ii].idle.price,
              "idleId":res.data[ii].idle.id
            }
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },

    // 修改切换页面的时候
    handleCurrentChange(val) {
      this.nowPage = val;
      if (this.mode == 1) {
        this.getOnlineIdle();
      }
      if (this.mode == 2) {
        this.getOfflineIdle();
      }
    },

    handleSelect(val) {
      // 用于修改当前显示的是上架的还是闲置的界面
      console.log("start handleSelect, val = " + val)
      console.log("now mode = " + this.mode)
      if (this.mode !== val) {
        this.mode = val;
        if (val == 1) { // val和1的类型不一致，这里需要使用==而不是===
          this.nowPage = 1;
          this.getOnlineIdle();
        }
        if (val == 2) {
          this.nowPage = 1;
          this.getOfflineIdle();
        }
      }
    },

    setIdleOffline(i) {
      // 将某一个商品下架
      this.$api.updateIdle({
        id: this.onlineIdles[i].idleId,
        idleStatus: 2 // 下架商品
      }).then(res => {
        if (res.status_code === 1) {
          this.getOnlineIdle();
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },

    deleteIdle(i) {
      // 删除掉某一个商品
      this.$api.updateIdle({
        id: this.offlineIdles[i].idleId,
        idleStatus: 4 // 0出售中、1已经出售、2已经下架、3正在进行中、4删除商品
      }).then(res => {
        if (res.status_code === 1) {
          // 成功删除之后，重新获取最新的下架的商品
          this.getOfflineIdle();
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    }
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