<template>
  <div class="order-item-title">
    <div class="name ellipsis-text-1">
      {{ itemData.unitName }}
    </div>
    <div class="status-name" :style="{ color: itemData.orderStatusDescColor }">
      支付状态：
      {{ itemData.orderStatusDesc }}
      <span class="sub-name">{{ itemData.cancelReasonDesc }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped>
.order-item-title {
  padding: 20px 0px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .name {
    font-size: 16px;
    color: rgb(0, 0, 0);
    font-weight: 600;
    line-height: 18px;
  }
  .status-name {
    margin-top: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #ea2737;
    letter-spacing: 0;
    align-self: end;
  }

  .sub-name {
    position: relative;
    left: -5px;
    font-size: 18px;
    font-weight: 600;
    color: #b2b2b2;
  }
}
</style>
