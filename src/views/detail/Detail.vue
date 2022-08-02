<template>
  <div class="detail">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickBack"
    />

    <h2>{{ detailStore.detailData.debugInfo }}</h2>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useDetailStore } from "@/stores/modules/detail";

const route = useRoute();
const router = useRouter();
const detailStore = useDetailStore();
// 1.返回上一页逻辑
const onClickBack = () => {
  router.back();
};
// 网络请求
detailStore.fetchDetailData(route.params.id);
</script>

<style lang="less" scoped>
</style>