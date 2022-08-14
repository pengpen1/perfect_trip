<template>
  <div class="detail-infos" v-if="infoData?.houseName">
    <div class="name">
      {{ infoData.houseName }}
    </div>

    <div class="tags">
      <!-- v-if 是判读改数据是否为空，空则不展示 -->
      <template v-for="(item, index) in infoData.houseTags" :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            backgroundColor: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>

    <div class="comment">
      <div class="comment-left">
        <span class="overall">{{ infoData?.commentBrief?.overall }}</span>
        <span class="scoreTitle">{{ infoData?.commentBrief?.scoreTitle }}</span>
        <span class="commentBrief"
          >"{{ infoData?.commentBrief?.commentBrief }}"</span
        >
      </div>
      <div class="comment-right">
        <span class="totalCountStr">
          {{ infoData?.commentBrief?.totalCountStr }} 条评论
          <van-icon name="arrow" />
        </span>
      </div>
    </div>

    <div class="location">
      <div class="left">
        {{ infoData?.nearByPosition?.address }}
      </div>
      <div class="right">地图.周边<van-icon name="arrow" /></div>
    </div>
  </div>
</template>

<script setup>
import { useDetailStore } from "@/stores/modules/detail.js";
import { computed } from "vue";

const detailStore = useDetailStore();
const infoData = computed(() => {
  return detailStore.detail_mainPart?.topModule;
});
</script>

<style lang="less" scoped>
.detail-infos {
  margin-top: 2px;
  padding-top: 8px;
  .name {
    font-size: 20px;
    font-weight: 700;
    margin: 8px 18px;
  }
  .tags {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    row-gap: 5px;
    align-items: center;
    margin: 8px 18px;
    line-height: 1;
    span {
      padding: 2px 5px;
      font-size: 15px;
      margin-right: 5px;
    }
    // .item {
    //   row-gap: 5px;
    // }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 16px;
    .comment-left {
      display: flex;
      margin-left: 20px;
      span {
        margin-left: 6px;
        line-height: 1;
        display: flex;
        align-items: flex-end;
      }
      .overall {
        font-size: 20px;
        font-weight: 700;
      }
      .scoreTitle {
        font-size: 15px;
        font-weight: 600;
      }
      .commentBrief {
        font-size: 15px;
        color: rgb(46, 45, 45);
      }
    }
    .comment-right {
      display: flex;
      margin-right: 20px;
      .totalCountStr {
        font-size: 15px;
        color: var(--primary-color);
        display: flex;
        align-items: flex-end;
        line-height: 1;
      }
    }
  }

  .location {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 5px;
    line-height: 1;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 8px;
    margin: 8px 20px 10px;

    .right {
      color: var(--primary-color);
    }
  }
}
</style>