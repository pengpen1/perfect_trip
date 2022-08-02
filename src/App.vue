<template>
  <div>
    <RouterView />
    <Loading />

    <!-- 方案一：meta+v-if -->
    <TabBar v-if="!$route.meta.hideTabbar"></TabBar>
    <!-- 方案二:z-index -->
    <!-- <TabBar></TabBar> -->
  </div>
</template>

<script setup>
import TabBar from "./components/TabBar/TabBar.vue";
import Loading from "./components/Loading/Loading.vue";
</script>


<style scoped>
</style>
