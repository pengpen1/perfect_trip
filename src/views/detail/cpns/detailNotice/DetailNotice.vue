<template>
  <div class="notice" v-if="noticeData?.cancelRules">
    <DetailSection left-title="预定须知">
      <div class="notice-inner">
        <template v-for="(item, index) in noticeData.orderRules" :key="index">
          <div class="item">
            <span class="title">{{ item.title }}</span>
            <span class="intro">{{ item.introduction }}</span>
            <span class="tip" v-if="item.tips">查看说明</span>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/DetailSection/DetailSection.vue";
import { useDetailStore } from "@/stores/modules/detail.js";
import { computed } from "vue";

const detailStore = useDetailStore();
const noticeData = computed(() => {
  return detailStore.detail_mainPart?.dynamicModule?.rulesModule;
});
</script>

<style lang="less" scoped>
.notice-inner {
  .item {
    display: flex;
    margin: 10px 0 20px;
    font-size: 14px;

    .title {
      width: 64px;
      color: #666;
    }

    .intro {
      flex: 1;
      color: #333;
    }
  }
}
</style>