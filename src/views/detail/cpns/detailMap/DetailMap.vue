<template>
  <div class="map">
    <DetailSection left-title="位置周边" tail="查看更多周边信息">
      <div class="baidu">
        <div id="container" ref="container"></div>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/DetailSection/DetailSection.vue";
import { useDetailStore } from "@/stores/modules/detail";
import { computed, onMounted, ref } from "vue";

// 获取经纬度
const detailStore = useDetailStore();
const longitude = computed(() => {
  return detailStore.detail_mainPart?.dynamicModule?.positionModule?.longitude;
});

const latitude = computed(() => {
  return detailStore.detail_mainPart?.dynamicModule?.positionModule?.latitude;
});
//  2.创建地图实例并初始化
const container = ref();
onMounted(() => {
  const map = new BMap.Map(container.value); //创建地图实例
  const point = new BMap.Point(longitude.value, latitude.value); //设置中心点坐标
  const marker = new BMap.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
  map.centerAndZoom(point, 15); //地图初始化，同时设置地图展示级别
});
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 300px;
}
</style>