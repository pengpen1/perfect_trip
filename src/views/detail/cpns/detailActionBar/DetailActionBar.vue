<template>
  <div class="action-bar">
    <div class="chat">
      <i class="detail_icon_chat"></i>
      <span class="text">聊天</span>
    </div>
    <div class="price">
      <span class="final">{{ "¥" + priceData?.finalPrice }}</span>
      <span class="unit">{{ priceData?.priceMark }}</span>
      <span class="old">{{ priceData?.productPrice }}</span>
    </div>
    <div class="order">
      <i class="detail_icon_order"></i>
      <span class="text">预订当前房源</span>
    </div>
  </div>
</template>

<script setup>
import { useDetailStore } from "@/stores/modules/detail.js";
import { computed } from "vue";

const detailStore = useDetailStore();
const priceData = computed(() => {
  return detailStore.detailData?.pricePart?.priceModule?.product;
});
</script>

<style lang="less" scoped>
.action-bar {
  position: fixed;
  z-index: 19;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border-top: 1px solid #f7f9fb;
  background-color: #fff;

  .chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;
    width: 50px;
    margin: 6px 0;
    border-right: 1px solid #ddd;

    .text {
      margin-top: 5px;
      margin-left: 3px;
      font-size: 12px;
    }
  }

  .price {
    flex: 1;
    padding: 0 20px;
    font-size: 12px;
    color: #666;

    .final {
      font-size: 16px;
      font-weight: 700;
      color: #ff9645;
    }

    .unit {
      margin: 0 6px;
    }

    .old {
      text-decoration: line-through;
    }
  }

  .order {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
    background: linear-gradient(90deg, #fa8c1d, #fcaf3f);

    .text {
      font-size: 18px;
      color: #fff;
      margin-left: 5px;
    }
  }
}
</style>