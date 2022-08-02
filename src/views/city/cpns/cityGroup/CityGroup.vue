<template>
  <div class="cityGroup">
    <van-index-bar :index-list="cityIndexList">
      <van-index-anchor index="热门" />
      <div class="hotCityList">
        <template v-for="(item, index) in currentGroup.hotCities" :key="index">
          <p class="hotCityItem" @click="handleCityClick(item)">
            {{ item.cityName }}
          </p>
        </template>
      </div>

      <template v-for="(item, index) in currentGroup.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(cityobj, indey) in item.cities" :key="indey">
          <van-cell
            :title="cityobj.cityName"
            @click="handleCityClick(cityobj)"
          />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { useCityStore } from "@/stores/modules/city";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const props = defineProps({
  currentGroup: {
    type: Object,
    default: () => ({}),
  },
});

// 动态确定索引列表
const cityIndexList = computed(() => {
  const cityList = props.currentGroup.cities.map((item) => item.group);
  cityList.unshift("#");
  return cityList;
});

// 监听hotCity点击和普通城市点击
const router = useRouter();
const cityStore = useCityStore();
const handleCityClick = (cityObj) => {
  // 1.回退到上一页
  router.back();
  // 2.储存当前选中的city对象
  cityStore.currentCity = cityObj;
};
</script>

<style lang="less" scoped>
.hotCityList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .hotCityItem {
    margin: 12px;
    width: 60px;
    height: 28px;
    border-radius: 14px;
    font-size: 13px;
    color: #000;
    background-color: #fffaf7;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>