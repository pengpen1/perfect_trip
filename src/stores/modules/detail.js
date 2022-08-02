import { defineStore } from "pinia";
import { getDetailData } from "@/service/modules/detail";

const useDetailStore = defineStore("detail", {
  state: () => ({
    detailData: {},
  }),
  actions: {
    async fetchDetailData(houseId) {
      const res = await getDetailData(houseId);
      this.detailData = res.data;
    },
  },
});
export { useDetailStore };
