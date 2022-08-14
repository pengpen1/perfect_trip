import { defineStore } from "pinia";
import { getCityAll } from "../../service/modules/city";

const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {},
    // 初始化一个城市，方便查询携带
    currentCity: {
      cityId: 10,
      cityName: "成都",
      gangAoTai: false,
      hot: false,
      latitude: "30.6571",
      longitude: "104.082",
      pinYin: "chengdu",
    },
  }),
  actions: {
    async fetchAllCities() {
      const res = await getCityAll();
      // 这里是res.data,是根据后端返回的数据来决定的
      this.allCities = res.data;
    },
  },
});

export { useCityStore };
