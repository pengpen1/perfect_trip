<template>
  <div class="city">
    <div class="top">
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="城市/区域/位置"
        show-action
        @cancel="$router.back()"
      />

      <van-tabs v-model:active="tabActiveName" color="#ff9854">
        <template v-for="(item, key) in allCities" :key="key">
          <van-tab :title="item.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="index">
        <CityGroup
          :current-group="value"
          v-show="key === tabActiveName"
        ></CityGroup>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCityStore } from "../../stores/modules/city";
import { storeToRefs } from "pinia";
import CityGroup from "./cpns/cityGroup/CityGroup.vue";

// 1.搜索逻辑
const searchValue = ref("");

// 2.tab切换
const tabActiveName = ref("");

// 3.网络请求 并获取state
const cityStore = useCityStore();
cityStore.fetchAllCities();
// 解构出来不是响应式的，要包裹一层storeToRefs
const { allCities } = storeToRefs(cityStore);

// 4.根据选中的标签获取city数据
// 直接用.valve拿不是响应式的
const currentGroup = computed(() => allCities.value[tabActiveName.value]);
</script>

<style lang="less" scoped>
.city {
  font-size: 14px;
  .top {
    position: relative;
    z-index: 10;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>