<template>
  <div class="facility">
    <DetailSection left-title="房屋设施" tail="查看全部设施">
      <div class="items">
        <template
          v-for="(item, index) in facilityData?.houseFacilitys"
          :key="index"
        >
          <!-- 这里是否显示依据facilitySort的索引列表决定 -->
          <div class="item" v-if="facilityData?.facilitySort?.includes(index)">
            <div class="head">
              <img :src="item.icon" alt="" />
              <p class="text">{{ item.groupName }}</p>
            </div>

            <div class="list">
              <template
                v-for="(value, index) in item.facilitys.slice(0, 4)"
                :key="index"
              >
                <div class="detailedValue">
                  <van-icon name="checked" class="icon_checked" />
                  <span>{{ value.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSectionVue from "@/components/DetailSection/DetailSection.vue";
import { useDetailStore } from "@/stores/modules/detail.js";
import { computed } from "vue";

const detailStore = useDetailStore();
const facilityData = computed(() => {
  return detailStore.detail_mainPart?.dynamicModule?.facilityModule
    ?.houseFacility;
});
</script>

<style lang="less" scoped>
.facility {
  .items {
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .head {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 26px;
        }
        .text {
          font-size: 15px;
          text-align: center;
          line-height: 1;
          margin: 10px 0;
        }
      }
      .list {
        width: 70%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        row-gap: 8px;
        column-gap: 10px;
        .detailedValue {
          .icon_checked {
            color: var(--primary-color);
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>