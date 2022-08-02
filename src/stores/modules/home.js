import { defineStore } from "pinia";
import { getHotCitySuggests, getCategories, getHouseList } from "@/service";

const useHomeStore = defineStore("home", {
  state: () => {
    return {
      citySuggest: [],
      categories: [],
      houseList: [],
      listPage: 1,
    };
  },
  actions: {
    async fetchCitySuggest() {
      const res = await getHotCitySuggests();
      this.citySuggest = res.data;
    },
    async fetchCategories() {
      const res = await getCategories();
      this.categories = res.data;
    },
    async fetchHouseList() {
      const res = await getHouseList(this.listPage++);
      this.houseList = [...this.houseList, ...res.data];
    },
  },
});

export { useHomeStore };
