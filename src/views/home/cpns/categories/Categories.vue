<template>
  <div class="categories">
    <template v-for="item in categories" :key="item.id">
      <div class="category">
        <img :src="item.pictureUrl" alt="category" />
        <span>{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 80px;
  padding: 0px 8px;
  margin-top: 8px;
  &::-webkit-scrollbar {
    display: none;
  }

  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    flex-shrink: 0;

    img {
      width: 32px;
      height: 32px;
    }
    span {
      font-size: 13px;
      margin-top: 8px;
    }
  }
}
</style>