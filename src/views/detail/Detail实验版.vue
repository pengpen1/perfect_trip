<template>
  <div class="detail">
    <TabControl
      :titles="['描述', '设施', '房东', '评论', '须知', '地图']"
      class="tabControl"
      @tabItemClick="tabItemClickHandle($event)"
      v-if="isShow"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickBack"
    />
    <DetailSwipe />

    <!-- 需要跳转的组件 -->
    <div class="tabControl_content" ref="getSectionRef">
      <DetailInfos />
      <DetailFacility />
      <DetailLandlord />
      <DetailComment />
      <DetailNotice />
      <DetailMap />
    </div>

    <DetailIntro />
    <DetailFooter />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useDetailStore } from "@/stores/modules/detail";

import DetailSwipe from "./cpns/detailSwipe/DetailSwipe.vue";
import DetailInfos from "./cpns/detailInfos/DetailInfos.vue";
import DetailFacility from "./cpns/detailFacility/DetailFacility.vue";
import DetailLandlord from "./cpns/detailLandlord/DetailLandlord.vue";
import DetailComment from "./cpns/detailComment/DetailComment.vue";
import DetailNotice from "./cpns/detailNotice/DetailNotice.vue";
import DetailMap from "./cpns/detailMap/DetailMap.vue";
import DetailIntro from "./cpns/detailIntro/DetailIntro.vue";
import DetailFooter from "./cpns/detailFooter/DetailFooter.vue";
import TabControl from "@/components/tab-control/tab-control.vue";
import { useListenerScroll } from "@/hooks/useListenerScroll";
import { computed, nextTick, onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();
const detailStore = useDetailStore();
// 1.返回上一页逻辑
const onClickBack = () => {
  router.back();
};
// 2.网络请求
detailStore.fetchDetailData(route.params.id);

// 3.TabControl的隐藏控制
const { scrollTop } = useListenerScroll();
const isShow = computed(() => {
  return scrollTop.value >= 300;
});

// 4.点击tabControl的跳转逻辑
const distanceArr = [];
const getSectionRef = ref();
onMounted(() => {
  const array = [...getSectionRef.value.children];
  for (const item of array) {
    distanceArr.push(item.offsetTop);
  }
  console.log(distanceArr);
});
const tabItemClickHandle = (index) => {
  let distance = distanceArr[index] - 44;
  if (index === 0) distance += 44;
  window.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};
</script>

<style lang="less" scoped>
.tabControl {
  width: 100%;
  position: fixed;
  z-index: 9;
}
</style>