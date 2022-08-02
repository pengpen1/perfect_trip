<template>
  <div class="house-item-v9">
    <div class="inner-item">
      <div class="cover">
        <img :src="type9_Data.image.url" alt="" />
      </div>

      <div class="info">
        <div class="summary">
          {{ type9_Data.summaryText }}
        </div>
        <div class="houseName">
          {{ type9_Data.houseName }}
        </div>
        <div class="rate-price">
          <van-rate
            size="12"
            gutter="0"
            color="#fff"
            :model-value="5"
            allow-half
            readonly
          />
          <span class="finalPrice"> {{ "￥" + type9_Data.finalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  type9_Data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.house-item-v9 {
  display: flex;
  flex-wrap: wrap;
  width: 50%;

  .inner-item {
    position: relative;
    margin: 5px;

    .cover {
      img {
        object-fit: cover;
        width: 100%;
        border-radius: 6px;
      }
    }
    .info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      color: aliceblue;
      font-weight: 500;
      font-size: 14px;
      display: flex;
      flex-direction: column;

      .summary {
        text-align: center;
        font-size: 12px;
      }
      .houseName {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 10px 5px 0 5px;
      }
      .rate-price {
        display: flex;
        justify-content: space-between;
        margin: 10px;
      }
    }
  }
}
</style>