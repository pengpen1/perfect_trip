<template>
  <div class="comment" v-if="commentData?.overall">
    <DetailSection
      left-title="租客点评"
      :tail="`查看全部${commentData.totalCount}条评论`"
    >
      <div class="comment-inner">
        <div class="header">
          <div class="left">
            <div class="score">
              <span class="text">{{ commentData.overall }}</span>
              <div class="line"></div>
            </div>
            <div class="info">
              <div class="title">{{ commentData.scoreTitle }}</div>
              <div class="count">{{ commentData.totalCount }}条评论</div>
              <div class="star">
                <van-rate
                  v-model="commentData.overall"
                  color="#ff9645"
                  size="12"
                  readonly
                  allow-half
                />
              </div>
            </div>
          </div>
          <div class="right">
            <template
              v-for="(item, index) in commentData.subScores"
              :key="index"
            >
              <span class="item">{{ item }}</span>
            </template>
          </div>
        </div>

        <div class="tags">
          <template
            v-for="(item, index) in commentData.commentTagVo"
            :key="index"
          >
            <span
              class="item"
              :style="{ color: item.color, background: item.backgroundColor }"
            >
              {{ item.text }}
            </span>
          </template>
        </div>

        <div class="content">
          <div class="user">
            <div class="avatar">
              <img :src="commentData.comment.userAvatars" alt="" />
            </div>
            <div class="profile">
              <div class="name">{{ commentData.comment.userName }}</div>
              <div class="date">{{ commentData.comment.checkInDate }}</div>
            </div>
          </div>
          <div class="text">
            {{ commentData.comment.commentDetail }}
          </div>
        </div>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/DetailSection/DetailSection.vue";
import { useDetailStore } from "@/stores/modules/detail";
import { computed } from "@vue/runtime-core";

const detailStore = useDetailStore();
const commentData = computed(() => {
  return detailStore.detail_mainPart?.dynamicModule?.commentModule;
});
</script>

<style lang="less" scoped>
.comment-inner {
  padding: 10px 0;

  .header {
    display: flex;

    .left {
      display: flex;
      align-items: center;

      .score {
        width: 65px;
        height: 100%;
        font-size: 48px;
        color: #333;
        position: relative;
        font-weight: 600;

        .text {
          position: relative;
          z-index: 9;
          font-size: 50px;
        }

        .line {
          width: 66px;
          height: 6px;
          background: var(--theme-linear-gradient);
          border-radius: 3px;
          position: absolute;
          bottom: 6px;
          z-index: 5;
        }
      }

      .info {
        margin-left: 19px;
        font-size: 12px;
        color: #333;
        .title {
          font-size: 13px;
        }
        .count {
          margin: 3px 0;
          color: #999;
        }
      }
    }

    .right {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      justify-content: flex-end;

      .item {
        margin-left: 5px;
        font-size: 13px;
        color: #666;
      }
    }
  }

  .tags {
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;

    .item {
      padding: 3px 5px;
      margin-right: 8px;
      margin-top: 5px;
      border-radius: 8px;
      font-size: 13px;
    }
  }

  .content {
    padding: 10px;
    border-radius: 6px;
    background-color: #f7f9fb;

    .user {
      display: flex;

      .avatar {
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }

      .profile {
        margin-left: 8px;
        .date {
          margin-top: 3px;
          font-size: 12px;
          color: #999;
        }
      }
    }

    .text {
      font-size: 13px;
      line-height: 16px;
      color: #333;
      margin-top: 16px;
    }
  }
}
</style>