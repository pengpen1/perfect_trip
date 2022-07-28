<template>
  <div class="tabbar">
    <div class="tabbar_wrap">
      <template v-for="(data, index) in tabbarData" :key="data.id">
        <router-link :to="data.path" @click="handleClikLink(index)">
          <img
            :src="getAssetURl(data.image)"
            :alt="data.text"
            v-if="currentIndex !== index"
          />
          <img :src="getAssetURl(data.iamgeActive)" :alt="data.text" v-else />
          <span class="tabbar_text">{{ data.text }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { tabbarData } from "./config";
import { getAssetURl } from "@/utils/load_assets";
import { ref } from "vue";

const currentIndex = ref(0);
const handleClikLink = (index) => {
  currentIndex.value = index;
};
</script>

<style lang="less" scoped>
.tabbar_wrap {
  width: 100vw;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;

  border-top: 1px solid #e5e3e3;
  padding-top: 8px;
  a {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    img {
      width: 32px;
    }
    .tabbar_text {
      font-size: 14px;
    }
  }

  .router-link-active .tabbar_text {
    color: var(--primary-color);
  }
}
</style>