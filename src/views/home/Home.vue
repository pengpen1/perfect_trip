<template>
  <div class="home">
    <NavBar />
    <Banner />
    <Search />
    <Categories />
    <div v-if="isShowSearch" class="search-bar-wrap">
      <SearchBar
        :start-date="mainStore.startDateStr('MM.DD')"
        :end-date="mainStore.endDateStr('MM.DD')"
        :search-icon="true"
        :cancel-icon="true"
      />
    </div>
    <Content />
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>
<script setup>
import NavBar from "./cpns/navbar/NavBar.vue";
import Banner from "./cpns/banner/Banner.vue";
import Search from "./cpns/search/Search.vue";
import Categories from "./cpns/categories/Categories.vue";
import Content from "./cpns/content/Content.vue";
import SearchBar from "@/components/SearchBar/SearchBar.vue";

import { useHomeStore } from "@/stores/modules/home";
import { useListenerScroll } from "@/hooks/useListenerScroll";
import { watch, computed, onActivated, onDeactivated } from "@vue/runtime-core";
import { useMainStore } from "@/stores/modules/main";

// 1.发生网络请求_热门城市推荐
const homeStore = useHomeStore();
homeStore.fetchCitySuggest();

// 2.发生网络请求_推荐类别
homeStore.fetchCategories();

// 3.发生网络请求_房屋列表
homeStore.fetchHouseList();

// 4.监听窗口滚动,hook_V1用法
// useListenerScroll(() => {
//   homeStore.fetchHouseList();
// });

// 4.监听窗口滚动,hook_V2用法
const { isReachBottom, scrollTop } = useListenerScroll();
watch(isReachBottom, (newValue) => {
  if (newValue) {
    // 发送网络请求，并将数据存储在store后将ref值改为false
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false;
    });
  }
});

const isShowSearch = computed(() => {
  return scrollTop.value >= 400;
});

// 5.获取mainStore里的时间数据
const mainStore = useMainStore();

// 6.保存滚动位置
onActivated(() => {
  window.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style lang="less" scoped>
.search-bar-wrap {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  padding: 16px 16px 10px 16px;
  height: 45px;
  background-color: rgb(255, 255, 255);
}
</style>