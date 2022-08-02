<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="type3_Data.image?.url" alt="" />
      </div>

      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span class="text">{{ type3_Data.location }}</span>
        </div>
        <div class="name">{{ type3_Data.houseName }}</div>
        <div class="summary">{{ type3_Data.summaryText }}</div>
        <div class="price">
          <span class="new">{{ "¥" + type3_Data.finalPrice }}</span>
          <span class="old">{{ "¥" + type3_Data.productPrice }}</span>
          <span class="tip" v-if="type3_Data.priceTipBadge">{{
            type3_Data.priceTipBadge?.text
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type3_Data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }

    .info {
      padding: 8px 10px;
      color: #666;
      font-size: 12px;
    }

    .location {
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
      }

      .text {
        margin-left: 2px;
        font-size: 12px;
        color: #666;
      }
    }

    .name {
      margin: 5px 0;
      font-size: 14px;
      color: #333;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      display: flex;
      align-items: flex-start;

      margin: 8px 0;
      .new {
        color: #ff9645;
        font-size: 14px;
      }

      .old {
        margin: 0 3px;
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }

      .tip {
        background-image: linear-gradient(270deg, #f66, #ff9f9f);
        color: #fff;
        padding: 2px 6px;
        border-radius: 8px;
        line-height: 1;
      }
    }
  }
}
</style>