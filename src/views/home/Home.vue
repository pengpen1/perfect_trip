<template>
  <div class="home">
    <NavBar />

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="banner" />
    </div>

    <div class="location">
      <div class="city">成都</div>
      <div class="position">
        <span class="position_text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="location" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./cpns/navbar/NavBar.vue";
</script>

<style lang="less" scoped>
.home {
  .banner img {
    width: 100vw;
  }

  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
    }

    .position {
      width: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .position_text {
        font-size: 14px;
      }

      img {
        width: 18px;
      }
    }
  }
}
</style>