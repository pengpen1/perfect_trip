<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="content_list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <HouseItemV9
          v-if="item.discoveryContentType === 9"
          :type9_Data="item.data"
          @click="houseItemClickHandle(item.data)"
        />
        <HouseItemV3
          v-else-if="item.discoveryContentType === 3"
          :type3_Data="item.data"
          @click="houseItemClickHandle(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import HouseItemV9 from "@/components/HouseItemV9/HouseItemV9.vue";
import HouseItemV3 from "@/components/HouseItemV3/HouseItemV3.vue";
import { useRouter } from "vue-router";

// 从homeStore中拿推荐房子的列表
const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);

// 监听两种类型的item的点击
const router = useRouter();
const houseItemClickHandle = (houseData) => {
  router.push({
    // path: `/detail/${houseData.houseId}`,//用name更安全
    name: "detail",
    params: {
      id: houseData.houseId,
    },
  });
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 6px;
  margin-bottom: 60px;
  .title {
    font-size: 22px;
    padding: 0 18px;
  }
  .content_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>