<template>
  <div class="detailSwipe">
    <van-swipe
      :autoplay="2000"
      indicator-color="white"
      lazy-render
      class="swipe-list"
    >
      <!-- 填入轮播图 -->
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="swipe-item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <!-- 自定义指示器 -->
      <template #indicator="{ active }">
        <div class="swipe-indicator">
          <template
            v-for="(value, key, index) in detailStore.detail_swipe"
            :key="index"
          >
            <span
              :class="{
                'swipe-indicator-active':
                  swipeData[active]?.enumPictureCategory == key,
              }"
              class="swipe-indicator-item"
            >
              <!-- 指示器title -->
              <span>{{ getTitle(value[0].title) }}</span>
              <!-- 指示器数字指针 -->
              <span v-if="swipeData[active]?.enumPictureCategory == key"
                >{{ getItemIndex(swipeData[active]) }}/{{ value.length }}</span
              >
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDetailStore } from "@/stores/modules/detail";

const detailStore = useDetailStore();
// 1.获取数据
const swipeData = computed(() => {
  return detailStore.detail_mainPart?.topModule?.housePicture?.housePics;
});
// 2.处理title
const nameReg = /【(.*?)】/i;
const getTitle = (targetStr) => {
  // 方法1：replace
  //   return targetStr.replace("：", "").replace("【", "").replace("】", "");
  const result = nameReg.exec(targetStr);
  return result[1];
};
// 3.根据item从分组数组中找到对应的索引并+1
const getItemIndex = (targetItem) => {
  const groupArray = detailStore.detail_swipe[targetItem.enumPictureCategory];
  return groupArray.findIndex((item) => item === targetItem) + 1;
};
</script>

<style lang="less" scoped>
.swipe-list {
  position: relative;
  .swipe-item {
    img {
      width: 100%;
    }
  }
  .swipe-indicator {
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: rgb(255, 255, 255);
    background-color: rgb(20, 20, 20);
    padding: 2px 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    line-height: 1;
    .swipe-indicator-item {
      margin: 0 5px;
    }
    .swipe-indicator-active {
      color: rgb(0, 0, 0);
      background-color: #fff;
      padding: 2px 5px;
      border-radius: 5px;
    }
  }
}
</style>