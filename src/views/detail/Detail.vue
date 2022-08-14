<template>
  <div class="detail">
    <TabControl
      :titles="names"
      class="tabControl"
      ref="topControlRef"
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
    <div
      class="tabControl_content"
      v-if="detailStore.detail_mainPart?.dynamicModule"
      v-memo="[detailStore.detail_mainPart?.dynamicModule]"
    >
      <DetailInfos :ref="getSectionRef" name="描述" />
      <DetailFacility :ref="getSectionRef" name="设施" />
      <DetailLandlord :ref="getSectionRef" name="房东" />
      <DetailComment :ref="getSectionRef" name="评论" />
      <DetailNotice :ref="getSectionRef" name="须知" />
      <DetailMap :ref="getSectionRef" name="地图" />
    </div>

    <DetailIntro />
    <DetailFooter />
    <DetailActionBar />
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
import DetailActionBar from "./cpns/detailActionBar/DetailActionBar.vue";
import { useListenerScroll } from "@/hooks/useListenerScroll";
import { computed, ref, watch } from "vue";

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
  return scrollTop.value >= 350;
});

// 4.点击tabControl的跳转逻辑
let isClick = false;
let finishScrollDistance = -1; //担心没有点击topControl却刚好匹配上，出bug
const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  if (!value) return;
  // 将那些组件的根元素的引用放入对象sectionEls里，key为name对应的值
  sectionEls.value[value.$el.getAttribute("name")] = value.$el;
};
const tabItemClickHandle = (index) => {
  const el = sectionEls.value[names.value[index]];
  let distance = el.offsetTop;
  if (index !== 0) distance -= 44;

  isClick = true;
  finishScrollDistance = distance;
  window.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

// 5.双向绑定tabControl和scrollTop
const topControlRef = ref();
let offsetTopOfEls = null;
watch(scrollTop, (newValue) => {
  if (finishScrollDistance === newValue) isClick = false;
  if (isClick) return;
  // 1.获取区间
  const elsArr = Object.values(sectionEls.value);
  if (!offsetTopOfEls) offsetTopOfEls = elsArr.map((el) => el.offsetTop);

  // 2.匹配区间
  let index = offsetTopOfEls.length - 1;
  for (let i = 0; i < offsetTopOfEls.length; i++) {
    if (newValue + 44 <= offsetTopOfEls[i]) {
      index = i - 1;
      break;
    }
  }
  // 3.赋值currentIndex
  topControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.tabControl {
  width: 100%;
  position: fixed;
  z-index: 999;
}
</style>