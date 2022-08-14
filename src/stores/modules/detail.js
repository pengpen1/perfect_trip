import { defineStore } from "pinia";
import { getDetailData } from "@/service/modules/detail";

const useDetailStore = defineStore("detail", {
  state: () => ({
    detailData: {},
  }),
  getters: {
    detail_mainPart() {
      return this.detailData.mainPart;
    },
    // 轮播图展示数据处理
    detail_swipe() {
      const swipeGroup = {};
      const targetArray =
        this.detail_mainPart?.topModule?.housePicture?.housePics ?? [];
      for (const item of targetArray) {
        // 1.拿分组数组
        let groupArray = swipeGroup[item.enumPictureCategory];
        if (groupArray == undefined) {
          // 2.如果未创建对应的分组数组，就初始化一个
          groupArray = [];
          swipeGroup[item.enumPictureCategory] = groupArray;
        }
        // 3.按照类型分类item
        groupArray.push(item);
      }
      // 4.返回整理好的数据
      return swipeGroup;
    },
  },
  actions: {
    async fetchDetailData(houseId) {
      const res = await getDetailData(houseId);
      this.detailData = res.data;
    },
  },
});
export { useDetailStore };
