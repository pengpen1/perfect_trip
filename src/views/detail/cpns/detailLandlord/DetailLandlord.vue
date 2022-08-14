<template>
  <div class="landlord" v-if="landlordData?.hotelName">
    <DetailSection left-title="房东介绍" tail="查看房东主页">
      <div class="intro">
        <div class="topImg" v-if="landlordData?.topScroll">
          <img :src="landlordData?.topScroll" alt="" />
        </div>

        <!-- 房东信息 -->
        <div class="header">
          <div class="left">
            <div class="hotelLogo">
              <img :src="landlordData?.hotelLogo" alt="" />
            </div>
            <div class="hotelInfo">
              <div class="name">
                {{ landlordData?.hotelName }}
              </div>
              <div class="tags">
                <template
                  v-for="(item, index) in landlordData?.hotelTags"
                  :key="index"
                >
                  <div class="tag" :style="{ color: item.tagText.color }">
                    <span>{{ item.tagText.text }}</span>
                    <!-- 最后一个标签没有分隔符 -->
                    <span
                      v-if="landlordData.hotelTags.length - 1 !== index"
                      class="delimiter"
                      >|</span
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="right">
            <div class="contact">联系房东</div>
          </div>
        </div>

        <!-- 底部Summary -->
        <div class="bottom" v-if="landlordData?.hotelSummary">
          <template
            v-for="(item, index) in landlordData?.hotelSummary"
            :key="index"
          >
            <div class="item">
              <div class="title">{{ item.title }}</div>
              <div class="score">{{ item.introduction }}</div>
              <div class="desc">{{ item.tip }}</div>
            </div>
          </template>
        </div>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/DetailSection/DetailSection.vue";
import { useDetailStore } from "@/stores/modules/detail.js";
import { computed } from "vue";

const detailStore = useDetailStore();
const landlordData = computed(() => {
  return detailStore.detail_mainPart?.dynamicModule?.landlordModule;
});
</script>

<style lang="less" scoped>
.landlord {
  .intro {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    .topImg {
      img {
        width: 100%;
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      row-gap: 5px;
      align-items: center;
      // flex-wrap: wrap;
      .left {
        display: flex;
        justify-content: space-between;
        column-gap: 5px;
        .hotelLogo {
          img {
            width: 54px;
            height: 54px;
          }
        }
        .hotelInfo {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          row-gap: 5px;
          .name {
            font-size: 16px;
            font-weight: 700;
          }
          .tags {
            display: flex;
            justify-content: start;
            font-size: 13px;

            .delimiter {
              margin: 0 4px;
            }
          }
        }
      }
      .right {
        .contact {
          min-width: 48px;
          height: 24px;
          line-height: 24px;
          border-radius: 5px;
          padding: 0 8px;
          font-size: 12px;
          color: #fff;
          margin-top: 5px;
          background-image: var(--theme-linear-gradient);
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .item {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: rgb(155, 155, 155);

        .score {
          font-size: 20px;
          font-weight: 700;
          color: rgb(0, 0, 0);
          margin: 5px 0;
        }
      }
    }
  }
}
</style>