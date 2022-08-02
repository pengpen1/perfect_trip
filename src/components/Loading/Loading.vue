<template>
  <div class="loading" v-if="mainStore.isLoading" @click="handleClickLoading">
    <div class="gif-wrap">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "@/stores/modules/main";

const mainStore = useMainStore();
const handleClickLoading = () => {
  mainStore.isLoading = false;
};
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
  color: black;

  .gif-wrap {
    background-color: #fff;
    border-radius: 20px;
    width: 88px;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 70px;
    height: 70px;
  }
}
</style>