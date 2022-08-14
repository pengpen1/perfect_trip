<template>
  <div class="order">
    <!-- 导航栏 -->
    <NavBar left-text="返回">
      <template #title>
        <span class="title">订单列表</span>
      </template>
    </NavBar>
    <!-- 吸顶标签页 -->
    <van-sticky>
      <van-tabs
        v-model:active="currentOrder"
        title-active-color="#ff9854"
        :line-height="2"
      >
        <template v-for="(item, index) in orderTitles" :key="item">
          <van-tab
            :title="item"
            :name="index"
            :title-style="{ fontSize: '15px', fontWeight: 500 }"
          ></van-tab>
        </template>
      </van-tabs>
    </van-sticky>

    <!-- 内容 -->
    <div class="content">
      <div v-if="orderStore.orderList.length">
        <template v-for="(item, index) in orderStore.orderList" :key="index">
          <OrderItem :item-data="item"></OrderItem>
        </template>
      </div>
      <div v-else class="tip">
        <img src="@/assets/img/order/icon-order.png" alt="" />
        <p>近期暂无订单</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from "@/stores/modules/order";
import NavBar from "@/components/NavBar/NavBar.vue";
import { ref, watch } from "vue";
import OrderItem from "./cpns/order-item/index.vue";

// 1.网络请求
const orderStore = useOrderStore();
orderStore.fetchOrderList();

// 2.变量
const currentOrder = ref(0);
const orderTitles = ["全部订单", "近期订单", "待支付"];
const orderTitleType = ["all", "recent", "pend"];

// 3.切换标签逻辑
watch(currentOrder, (newValue) => {
  const type = orderTitleType[newValue];
  orderStore.fetchOrderList(type);
});
</script>

<style lang="less" scoped>
.order {
  .title {
    font-size: 15px;
    font-weight: 700;
  }

  .content {
    .tip {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-top: 8px;
        width: 100%;
      }
      p {
        margin-top: 16px;
      }
    }
  }
}
</style>