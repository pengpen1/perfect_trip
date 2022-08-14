import { getOrderList } from "@/service/modules/order";
import { defineStore } from "pinia";

const useOrderStore = defineStore("order", {
  state: () => ({
    orderList: [],
  }),
  actions: {
    async fetchOrderList(type = "all") {
      const res = await getOrderList(type);
      this.orderList = res.data.data.orders ?? [];
    },
  },
});

export { useOrderStore };
