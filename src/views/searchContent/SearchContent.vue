<template>
  <div class="search-content">
    <div class="search-nav-bar">
      <NavBar
        class=""
        :border="false"
        @arrowIconClick="arrowIconClick"
        @menuIconClick="menuIconClick"
      >
        <template #title>
          <SearchBar
            :title="$route.query.address"
            :start-date="$route.query.startDate"
            :end-date="$route.query.endDate"
            :key-word="keyWord"
            :cancel-icon="showCancelIcon"
            @cancel-click="handleCancelClick"
            @searchClick="handleSearchClick"
          ></SearchBar>
        </template>
      </NavBar>

      <!-- 位置 - 欢迎度排序 - 筛选 -->
      <dropdown-select
        :items-data="searchContentStore.searchConditions"
      ></dropdown-select>

      <!-- 优惠 - 多人入驻 -->
      <div class="tab-wrapper">
        <tab-select
          :items-data="searchContentStore.searchHouse?.hotFilters"
        ></tab-select>
      </div>
    </div>

    <div class="list">
      <template
        v-for="(item, index) in searchContentStore.searchHouse?.items"
        :key="index"
      >
        <SearchListItem :item-data="item"> </SearchListItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSearchContentStore } from "@/stores/modules/searchContent";
import NavBar from "@/components/NavBar/NavBar.vue";
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import dropdownSelect from "@/components/dropdown-select/index.vue";
import tabSelect from "@/components/tab-select/index.vue";
import SearchListItem from "../../components/search-list-item/index.vue";

// 1.变量
const PLACEHOLDER = "搜索景点、地标、房源";
const showSearchPanel = ref(true);
const keyWord = ref(PLACEHOLDER);
const showCancelIcon = ref(false);
const images = [
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
];

// 2.网络请求
const searchContentStore = useSearchContentStore();
searchContentStore.fetchSearchConditions();
searchContentStore.fetchSearchHouse();

// 3.事件
const arrowIconClick = () => {
  router.go(-1);
};
const menuIconClick = () => {
  console.log("menuIconClick");
};
const handleSearchClick = () => {
  showSearchPanel.value = true;
};
const handleCancelClick = () => {
  keyWord.value = PLACEHOLDER;
  showCancelIcon.value = false;
};
</script>

<style lang="less" scoped>
:deep(.van-sticky--fixed .guide-login) {
  margin-left: 0;
  margin-right: 0;
}
:deep(.van-nav-bar__title) {
  margin: 0;
}
:deep(.van-nav-bar__content) {
  justify-content: center;
}
.search-content {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .search-nav-bar {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .search-conditions {
    padding-top: 46px;
  }
  .tab-wrapper {
    padding: 12px 0 10px 20px;
    background-color: #f7f8fb;
  }
  .list {
    padding: 141px 20px 0 20px;
    z-index: -1;
    position: relative;
  }
}
</style>