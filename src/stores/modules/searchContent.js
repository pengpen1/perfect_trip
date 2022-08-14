import { defineStore } from "pinia";
import {
  getSearchConditions,
  getSearchHouse,
} from "@/service/modules/searchContent";

const useSearchContentStore = defineStore("searchContent", {
  state: () => ({
    searchHistorys: [],
    searchConditions: [],
    searchHouse: [],
  }),
  getters: {
    // 1.获取保存搜索历史并转化为对象数组
    getSearchHistorys: (state) => {
      let historys = state.searchHistorys || [];
      if (historys.length) {
        // 本地读取
        historys = localCache.getCache(CACHE_SERACH_HISTORY) || [];
      }
      historys = historys.reverse();
      return historys.map((item) => {
        return {
          itemType: "搜索历史",
          name: item,
        };
      });
    },
  },
  actions: {
    // 1.增加搜索历史
    addSearchHistory(keyWorld) {
      if (!this.searchHistorys.includes(keyWorld)) {
        this.searchHistorys.push(keyWorld);
      }
      // 只缓存10个历史记录
      let len = this.searchHistorys.length;
      if (len >= 10) {
        this.searchHistorys = this.searchHistorys.slice(len - 10, len);
      }
      // 本地读取
      localCache.setCache(CACHE_SERACH_HISTORY, this.searchHistorys);
    },
    // 2.加载缓存的searchHistorys
    initSearchHistory() {
      this.searchHistorys = localCache.getCache(CACHE_SERACH_HISTORY) || [];
    },
    // 3.清除缓存是搜索历史
    clearSearchHistory() {
      this.searchHistorys = [];
      localCache.deleteCache(CACHE_SERACH_HISTORY);
    },
    // 4.网络请求_环境
    async fetchSearchConditions() {
      const res = await getSearchConditions();
      this.searchConditions = res.data.data.allConditions;
    },
    //5.网络请求_房子
    async fetchSearchHouse() {
      const res = await getSearchHouse();
      this.searchHouse = res?.data.data;
    },
  },
});
export { useSearchContentStore };
